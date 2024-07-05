"use server"

import db from "@/lib/database"
import {
  sessionTable,
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

export const getSessionsByUserId = async (userId: string) => {
  try {
    const sessions = await db.query.sessionTable.findMany({
      where: eq(sessionTable.userId, userId),
    })

    if (!sessions) return null  // Indicate sessions are not found

    return sessions
  } catch (error: any) {
    console.error("Error getting sessions by user ID:", error)
    return null  // Handle error and indicate user not found
  }
}