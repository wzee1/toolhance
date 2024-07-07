import AnalyticsDashboard from "@/components/shared/analytics/AnalyticsDashboard"
import { getDateXDaysAgo } from "@/lib/utils"
import { analytics } from "@/lib/analytics/analytics"

import { validateRequest } from "@/lib/lucia"
import { findUserByUserId } from "@/actions/database.actions"
import { redirect } from "next/navigation"

export default async function Analytics() {
  const { user } = await validateRequest()
  if (!user) return redirect("/")

  const userInfo = await findUserByUserId(user.id)
  if (userInfo?.email !== process.env.admin) return redirect("/")

  // Component start:
  const TRACKING_DAYS = 7

  const pageviews = await analytics.retrieveDays("pageview", TRACKING_DAYS)

  const totalPageviews = pageviews.reduce((acc, curr) => {
    return (
      acc +
      curr.events.reduce((acc, curr) => {
        return acc + Object.values(curr)[0]!
      }, 0)
    )
  }, 0)

  const avgVisitorsPerDay = (totalPageviews / TRACKING_DAYS).toFixed(1)

  const amtVisitorsToday = pageviews
    .filter((ev) => ev.date === getDateXDaysAgo())
    .reduce((acc, curr) => {
      return (
        acc +
        curr.events.reduce((acc, curr) => acc + Object.values(curr)[0]!, 0)
      )
    }, 0)

  const topCountriesMap = new Map<string, number>()

  for (let i = 0; i < pageviews.length; i++) {
    const day = pageviews[i]
    if (!day) continue

    for (let j = 0; j < day.events.length; j++) {
      const event = day.events[j]
      if (!event) continue

      const key = Object.keys(event)[0]!
      const value = Object.values(event)[0]!

      const parsedKey = JSON.parse(key)
      const country = parsedKey?.country

      if (country) {
        if (topCountriesMap.has(country)) {
          const prevValue = topCountriesMap.get(country)!
          topCountriesMap.set(country, prevValue + value)
        } else {
          topCountriesMap.set(country, value)
        }
      }
    }
  }

  // @ts-ignore
  const topCountries = [...topCountriesMap.entries()].sort((a ,b) => {
    if(a[1] > b[1]) return -1
    else return 1
  }).slice(0, 5)

  return (
    <div className="min-h-screen w-full py-12 flex justify-center items-center">
      <div className="relative w-full max-w-6xl mx-auto text-white">
        <AnalyticsDashboard
          // @ts-ignore
          avgVisitorsPerDay={avgVisitorsPerDay}
          amtVisitorsToday={amtVisitorsToday}
          timeseriesPageviews={pageviews}
          topCountries={topCountries}
        />
      </div>
    </div>
  )
}