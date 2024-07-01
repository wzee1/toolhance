"use server"

import sharp from "sharp" // For image processing
import db from "@/lib/database"
import { userTable } from "@/lib/database/schema"
import { validateRequest } from "@/lib/lucia"
import { eq } from "drizzle-orm"
import { rateLimitByKey } from "@/lib/rateLimiter/limiter"

export async function uploadImage(formData: FormData) {
  try {
    const { user } = await validateRequest();
    if (!user)
      return {
        error: "Unauthorized", status: 401
      } 

    const userId = user.id
    const cooldownMiliSeconds = parseInt(
      formData.get("cooldown") as string
    ) * 1000

    try {
      await rateLimitByKey(userId, 1, cooldownMiliSeconds)
    } catch {
      return {
        error: "Rate limit exceeded", status: 429
      } 
    }

    const imageData = formData.get("image")
    
    if (!imageData || !(imageData instanceof File))
      return {
        error: "Invalid image file", status: 400
      }    

    const arrayBuffer = await imageData.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)

    // Image conversion and validation
    const resizedImage = await sharp(buffer)
      .resize(64, 64)
      .webp()
      .toBuffer()
      .catch((error) => {
        console.error('Image conversion error:', error)
        return {
          error: "Image conversion failed", status: 5000
        }
      })

    const base64Image = resizedImage.toString('base64')
    await db.update(userTable).set({
      profilePictureUrl: base64Image,
    }).where(eq(userTable.id, userId))
    
    return {
      message: "Image uploaded successfully", status: 200
    }
  } catch (error) {
    console.error('Error:', error);
    return {
      error: "Unexpected error", status: 500
    }
  }
}

export async function getImage() {
  try {
    const { user } = await validateRequest();
    if (!user)
      return {
        error: "Unauthorized", status: 401
      }

    const userId = user.id;

    // Fetch the user's profile picture from the database
    const userData = await db.query.userTable.findFirst({
      where: eq(userTable.id, userId)
    })

    if (!userData || !userData.profilePictureUrl) {
      return {
        error: "No profile picture found", status: 404
      }
    }

    return {
      profilePicture: userData.profilePictureUrl,
      status: 200
    }
  } catch (error) {
    console.error('Unexpected error:', error);
    return {
      error: "Unexpected error", status: 500
    }
  }
}