"use server"

import { validateRequest } from "@/lib/lucia"
import { rateLimitByKey } from "@/lib/rateLimiter/limiter"
import { encrypt } from "@/lib/en-decrypt"

import db from "@/lib/database"
import { eq } from "drizzle-orm"
import { twoFaTable, userTable } from "@/lib/database/schema"

import { authenticator } from "otplib"

export async function generate2FASecret() {
  return authenticator.generateSecret()
}

export async function verifyOTP(
  otp: string, secret: string
) {
  return authenticator.verify({ token: otp, secret })
}

export async function generate2FASecretAction() {
  try {
    const { user } = await validateRequest()
    if (!user) return {
      error: "Unauthorized", status: 401
    }

    try {
      await rateLimitByKey(user.id, 5, 60000)
    } catch {
      return {
        error: "Rate limit exceeded", status: 429
      } 
    }
  
    const secret = await generate2FASecret()

    return {
      message: secret, status: 200
    }
  } catch (error) {
    return {
      error: `Unexpected error: ${error}`, status: 500
    }
  }
}

export async function verifyOTPAction(
  body: { otp: string; secret: string }
) {
  try {
    const { otp, secret } = body
    if (!otp || !secret) return {
      error: "OTP and secret are required", status: 400
    }
    
    const isValid = await verifyOTP(otp, secret)
    if (!isValid) return {
      success: false, status: 400
    }
    
    // If isValid is true, then save it to db:
    const { user } = await validateRequest()
    if (!user) return {
      success: false, status: 401
    }

    try {
      await rateLimitByKey(user.id, 5, 30000)
    } catch {
      return {
        error: "Rate limit exceeded", status: 429
      } 
    }

    const encryptedSecret = await encrypt(secret)

    await db.insert(twoFaTable).values({
      userId: user.id,
      secret: encryptedSecret,
    })

    await db.update(userTable).set({
      is2FAEnabled: true,
    }).where(eq(userTable.id, user.id))

    // return OK
    return {
      success: true, status: 200
    }
  } catch (error) {
    return {
      error: `Unexpected error: ${error}`, status: 500
    }
  }
}