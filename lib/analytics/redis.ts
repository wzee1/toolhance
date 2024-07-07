import { Redis } from "@upstash/redis"

export const redis = new Redis({
  url: "https://epic-kingfish-52340.upstash.io",
  token: process.env.REDIS_KEY!,
})