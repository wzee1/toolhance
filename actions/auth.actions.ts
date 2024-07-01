"use server"

import { z } from "zod"
import { SignInSchema, SignUpSchema } from "../types"

import { generateId } from "lucia"
import db from "@/lib/database"
import {
  userTable, oauthAccountTable,
  emailVerificationTable, sessionTable, twoFaTable
} from "@/lib/database/schema"

import { lucia, validateRequest } from "@/lib/lucia"
import { cookies } from "next/headers"
import { eq } from "drizzle-orm"
import * as argon2 from "argon2"
import jwt from "jsonwebtoken"

import { sendEmail } from "@/lib/email"
import { generateCodeVerifier, generateState } from "arctic"
import { facebook, google } from "@/lib/lucia/oauth"
import pasteHTML from "@/components/shared/emailVerification/emailVerification"

import {
  generate2FASecret, verifyOTP
} from "@/actions/2fa.actions"
import { rateLimitByIP } from "@/lib/rateLimiter/limiter"
import { decrypt } from "@/lib/en-decrypt"

export const resendVerificationEmail = async (email: string) => {
  try {
    const existingUser = await db.query.userTable.findFirst({
      where: (table: any) => eq(table.email, email),
    })

    if (!existingUser) return {
      error: "User with these informations is not found!",
    }

    if (existingUser.isEmailVerified === true) {
      return {
        error: "This email is already verified, try to login!",
      }
    }

    const existedCode = await db.query.emailVerificationTable.findFirst({
      where: eq(emailVerificationTable.userId, existingUser.id),
    })

    if (!existedCode) {
      return {
        error: "Code not found, please try again!",
      }
    }

    const sentAt = new Date(existedCode.sentAt)
    const isOneMinuteHasPassed = new Date().getTime() - sentAt.getTime() > 60000 // 1 minute

    if (!isOneMinuteHasPassed) return {
      error:
        "Email already sent, next email in " +
        (60 - Math.floor((new Date().getTime() - sentAt.getTime()) / 1000)) +
        " seconds",
    }
    
    const code = Math.random().toString(36).substring(2, 8)

    await db
      .update(emailVerificationTable)
      .set({
        code,
        sentAt: new Date(),
      })
      .where(eq(emailVerificationTable.userId, existingUser.id))

    const token = jwt.sign(
      { email, userId: existingUser.id, code },
      process.env.JWT_SECRET!,
      {
        expiresIn: "5m",
      }
    )

    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/verify-email?token=${token}`

    await sendEmail({
      html: pasteHTML(url, email),
      subject: "Verify your email",
      to: email,
    })

    return {
      success: "Success, an email has been sent to your inbox!",
    }
  } catch (error: any) {
    return {
      error: error?.message,
    }
  }
}

export const signUp = async (values: z.infer<typeof SignUpSchema>) => {
  const hashedPassword = await argon2.hash(values.password)
  const userId = generateId(15)

  try {
    try {
      await rateLimitByIP(5, 30000)
    } catch {
      return {
        error: "Rate limit exceeded", status: 429
      } 
    }

    await db.insert(userTable).values({
      id: userId,
      email: values.email,
      hashedPassword,
    })

    // generate a random string 6 characters long
    const code = Math.random().toString(36).substring(2, 8)

    await db.insert(emailVerificationTable).values({
      code,
      userId,
      id: generateId(15),
      sentAt: new Date(),
    })

    const token = jwt.sign(
      { email: values.email, userId, code },
      process.env.JWT_SECRET!,
      {
        expiresIn: "5m",
      }
    )

    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/verify-email?token=${token}`

    await sendEmail({
      html: pasteHTML(url, values.email),
      subject: "Verify your email",
      to: values.email,
    })

    return {
      success: true,
      data: {
        userId,
      },
    }
  } catch (error: any) {
    return {
      error: error?.message,
    }
  }
}

// returns success: true if credentials matched
export const credentialsMatched = async (
  values: z.infer<typeof SignInSchema>
) => {
  try {
    SignInSchema.parse(values)
  } catch (error: any) {
    return {
      error: error.message,
    }
  }

  const existingUser: any = await db.query.userTable.findFirst({
    where: (table: any) => eq(table.email, values.email),
  })

  if (!existingUser) return {
    error: "User with these informations is not found!",
  }

  if (!existingUser.hashedPassword) return {
    error: "User with these informations is not found!",
  }

  const isValidPassword = await argon2.verify(
    existingUser.hashedPassword,
    values.password
  )

  if (!isValidPassword) return {
    error: "Incorrect email or password, try again!",
  }

  if (existingUser.isEmailVerified === false) return {
    error: "Email is not verified!",
    key: "email_not_verified",
  }

  return { success: true }
}

// signIn with 2FA
export const signIn = async (
  values: z.infer<typeof SignInSchema>, otp: string
) => {
  try {
    SignInSchema.parse(values)
  } catch (error: any) {
    return {
      error: error.message,
    }
  }

  try {
    await rateLimitByIP(10, 30000)
  } catch {
    return {
      error: "Rate limit exceeded", status: 429
    } 
  }

  const existingUser: any = await db.query.userTable.findFirst({
    where: (table: any) => eq(table.email, values.email),
  })

  if (!existingUser) return {
    error: "User with these informations is not found!",
  }

  if (!existingUser.hashedPassword) return {
    error: "User with these informations is not found!",
  }

  const isValidPassword = await argon2.verify(
    existingUser.hashedPassword,
    values.password
  )

  if (!isValidPassword) return {
    error: "Incorrect email or password, try again!",
  }

  if (existingUser.isEmailVerified === false) return {
    error: "Email is not verified!",
    key: "email_not_verified",
  }

  if (existingUser.is2FAEnabled) {
    const isValidOTP = await validateTwoFactorAuth(existingUser.id, otp)

    if (!isValidOTP) return { error: "Invalid OTP" }
  }

  const session = await lucia.createSession(existingUser.id, {
    expiresIn: 60 * 60 * 24 * 30,
  })

  const sessionCookie = lucia.createSessionCookie(session.id)

  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes
  )

  return {
    success: "Logged in successfully!",
  }
}

export const signOut = async () => {
  try {
    const { session } = await validateRequest()

    if (!session) return {
      error: "Unauthorized",
    }
    
    await lucia.invalidateSession(session.id)

    const sessionCookie = lucia.createBlankSessionCookie()

    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes
    )
  } catch (error: any) {
    return {
      error: error?.message,
    }
  }
}

export const createGoogleAuthorizationURL = async () => {
  try {
    const state = generateState()
    const codeVerifier = generateCodeVerifier()

    cookies().set("codeVerifier", codeVerifier, {
      httpOnly: true,
    })

    cookies().set("state", state, {
      httpOnly: true,
    })

    const authorizationURL = await google.createAuthorizationURL(
      state,
      codeVerifier,
      {
        scopes: ["email", "profile"],
      }
    )

    return {
      success: true,
      data: authorizationURL,
    }
  } catch (error: any) {
    return {
      error: error?.message,
    }
  }
}

export const createFacebookAuthorizationURL = async () => {
  try {
    const state = generateState()

    const authorizationURL = await facebook.createAuthorizationURL(state, {
      scopes: ["email", "public_profile"],
    })

    return {
      success: true,
      data: authorizationURL,
    }
  } catch (error: any) {
    return {
      error: error?.message,
    }
  }
}

export const setupTwoFactorAuth = async (userId: string) => {
  try {
    const secret = await generate2FASecret()

    await db.insert(twoFaTable).values({
      userId, secret,
    })

    // Update user record to indicate 2FA is enabled
    await db.update(userTable).set({
      is2FAEnabled: true,
    }).where(eq(userTable.id, userId))

    return secret
  } catch (error: any) {
    console.error('Error setting up 2FA:', error)
    throw error
  }
}

export const validateTwoFactorAuth = async (userId: string, otp: string) => {
  try {
    const result = await db.query.twoFaTable.findFirst({
      where: eq(twoFaTable.userId, userId),
    })

    // user does not have 2fa set up
    if (!result) return false

    const decryptedSecret = await decrypt(result.secret)
    const isValidOTP = await verifyOTP(otp, decryptedSecret)

    return isValidOTP
  } catch (error: any) {
    console.error("Error validating OTP:", error)
    throw error
  }
}