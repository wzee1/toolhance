import { NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"

import { rateLimitByIP } from "@/lib/rateLimiter/limiter"
import { analytics } from "@/lib/analytics/analytics"

export default async function middleware(req: NextRequest) {
  // Analytics START
  if (req.nextUrl.pathname === "/") {
    const cookieConsent = cookies().get("cookieConsent")?.value
    const cookiePreferences = cookies().get("cookiePreferences")?.value
    let shouldTrackAnalytics = false
    
    if (cookieConsent)
      shouldTrackAnalytics = cookieConsent === "accepted" ||
    (cookiePreferences && JSON.parse(
      decodeURIComponent(cookiePreferences)).analytics
    )
    
    // Rate limit by IP, only counts 1 visit per 3,6mil ms (1 hour)
    const canProceed = await rateLimitByIP(1, 3600000)
    if (!canProceed) shouldTrackAnalytics = false

    if (shouldTrackAnalytics) {
      try {
        await analytics.track("pageview", {
          page: "/",
          country: req.geo?.country,
        })
      } catch (err) {
        console.error(err)
      }
    }
  } // Analytics END
  
  return NextResponse.next()
}

export const matcher = {
  matcher: "/",
}