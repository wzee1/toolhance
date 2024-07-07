"use server"

import { validateRequest } from "@/lib/lucia"
import { rateLimitByKey } from "@/lib/rateLimiter/limiter"
import { decrypt, encrypt } from "@/lib/en-decrypt"

import db from "@/lib/database"
import { eq } from "drizzle-orm"
import { twoFaTable, userTable } from "@/lib/database/schema"

import { authenticator } from "otplib"
import { revalidatePath } from "next/cache"

export async function generateRandomCode() {
  const characters = "abcdefghijklmnopqrstuvwxyz"
  let code = ""

  for (let i = 0; i < 16; i++) {
    if (i > 0 && i % 4 === 0)
      code += "-"
    
    const randomIndex = Math.floor(Math.random() * characters.length)
    code += characters[randomIndex]
  }

  return code
}

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

    const canProceed = await rateLimitByKey(user.id, 5, 60000)
    if (!canProceed) return {
      error: "Rate limit exceeded", status: 429
    }
  
    const secret = await generate2FASecret()
    const backupCode = await generateRandomCode()

    return {
      message: { secret, backupCode }, status: 200
    }
  } catch (error) {
    return {
      error: `Unexpected error: ${error}`, status: 500
    }
  }
}

export async function verifyOTPAction(
  body: { otp: string; secret: string, backupCode: string }
) {
  try {
    const { otp, secret, backupCode } = body
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
    const encryptedBackupCode = await encrypt(backupCode)

    await db.insert(twoFaTable).values({
      userId: user.id,
      secret: encryptedSecret,
      backupCode: encryptedBackupCode
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

export async function verifyBackupCode(backupCode: string) {
  try {
    const { user } = await validateRequest()
    if (!user) return {
      message: "Unauthorized", status: 401
    }

    const twoFAInfo = await db.query.twoFaTable.findFirst({
      where: eq(twoFaTable.userId, user.id),
    })

    const encryptedBackupCode = twoFAInfo?.backupCode
    const decryptedBackupCode = await decrypt(encryptedBackupCode as string)

    if (decryptedBackupCode === backupCode)
      return { success: true, status: 200 }

    return { success: false, status: 400 }
  } catch (error) {
    return {
      message: "Unknown error occurred",
      status: 500
    }
  }
}

export async function disable2FA() {
  try {
    const { user } = await validateRequest()
    if (!user) return {
      error: "Unauthorized", status: 401
    }

    // Disable 2FA for the user
    await db.update(userTable).set({
      is2FAEnabled: false,
    }).where(eq(userTable.id, user.id))

    // Remove the user's 2FA record
    await db.delete(twoFaTable)
      .where(eq(twoFaTable.userId, user.id))
    
    revalidatePath("/account")

    return {
      success: true, status: 200
    }
  } catch (error: any) {
    console.log("Unexpected error while disabling 2FA", error)
    return {
      success: false, status: 500
    }
  }
}