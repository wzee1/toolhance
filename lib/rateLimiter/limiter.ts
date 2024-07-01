import { getIP } from "./getIP"

const trackers: Record<
  string, {
    count: number; expiresAt: number
  }
> = {}

export async function rateLimitByIP(
  limit: number = 1, window = 10000
) {
  const ip = getIP()

  if (!ip) throw new Error("ERROR: IP address not found!")
  
  rateLimitByKey(ip, limit, window)
}

export async function rateLimitByKey(
  key: string, limit: number = 1, window = 10000
) {
  const tracker = trackers[key] || { count: 0, expiresAt: 0 }
  
  if (!trackers[key]) trackers[key] = tracker

  if (tracker.expiresAt < Date.now()) {
    tracker.count = 0
    tracker.expiresAt = Date.now() + window
  }

  tracker.count++
  
  if (tracker.count > limit) throw new Error("ERROR: Rate limit exceeded!")
}