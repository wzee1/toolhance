"use server"

import db from "@/lib/database"
import {
  userTable
} from "@/lib/database/schema"
import { eq } from "drizzle-orm"

export const findUserByUserId = async (userId: string) => {
  try {
    const user = await db.query.userTable.findFirst({
      where: eq(userTable.id, userId),
    })

    if (!user) return null  // Indicate user not found

    return user
  } catch (error: any) {
    console.error("Error finding user by ID:", error)
    return null  // Handle error and indicate user not found
  }
}

export const findUserByEmail = async (email: string) => {
  try {
    const user = await db.query.userTable.findFirst({
      where: eq(userTable.email, email),
    })

    if (!user) return null  // Indicate user not found

    return user
  } catch (error: any) {
    console.error("Error finding user by ID:", error)
    return null  // Handle error and indicate user not found
  }
}