import { Lucia } from "lucia"
import adapter from "./adapter"
import { cookies } from "next/headers"
import { cache } from "react"

import db from "../database"
import { twoFaTable } from "../database/schema"
import { eq } from "drizzle-orm"

export const lucia = new Lucia(adapter, {
  sessionCookie: {
    attributes: {
      // set to `true` when using HTTPS
      secure: process.env.NODE_ENV === "production",
    },
  },
  getUserAttributes: async (attributes: any) => {
    const twoFaSetup = await db.query.twoFaTable.findFirst({
      where: eq(twoFaTable.userId, attributes.id),
    });

    return {
      ...attributes,
      is2FAEnabled: !!twoFaSetup,
    }
  },
})

export const validateRequest = cache(async () => {
  const sessionId = cookies().get(lucia.sessionCookieName)?.value ?? null

  if (!sessionId)
    return {
      user: null,
      session: null,
    }

  const { user, session } = await lucia.validateSession(sessionId)
  try {
    if (session && session.fresh) {
      const sessionCookie = lucia.createSessionCookie(session.id)
      cookies().set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes
      )
    }
    if (!session) {
      const sessionCookie = lucia.createBlankSessionCookie()
      cookies().set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes
      )
    }
  } catch {
    // Next.js throws error when attempting to set cookies when rendering page
  }
  return {
    user,
    session,
  }
})

// IMPORTANT!
declare module "lucia" {
  interface Register {
    Lucia: typeof lucia
  }
}