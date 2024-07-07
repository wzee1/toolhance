"use client"

import { useEffect, useState } from "react"
import Cookies from "js-cookie"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"


export default function CookieConsentBanner() {
  const [cookieConsent, setCookieConsent] = useState<string | null>(null)
  const [showModal, setShowModal] = useState<boolean>(false)
  const [cookieTypes, setCookieTypes] = useState<{
    [key: string]: boolean
  }>({
    necessary: true,
    analytics: false,
    marketing: false
  })

  useEffect(() => {
    const consent = Cookies.get("cookieConsent")

    if (!consent) setShowModal(true)

    const preferences = getCookiePreferences()
    
    if (consent === "denied") {
      setCookieConsent("denied")
      setCookieTypes({
        necessary: false,
        analytics: false,
        marketing: false
      })
    } else if (preferences) {
      const allDisabled = Object.values(preferences).every(value => !value)

      if (allDisabled) setCookieConsent("denied")
      else setCookieConsent("accepted")
    }
  }, [])

  const handleAccept = () => {
    Cookies.set("cookieConsent", "accepted")
    setCookieConsent("accepted")
  }

  const handleDeny = () => {
    Cookies.set("cookieConsent", "denied")
    setCookieConsent("denied")

    // clear cookiePreferences cookie
    Cookies.remove("cookiePreferences")

    setCookieTypes({
      necessary: false,
      analytics: false,
      marketing: false,
    })
  }

  const handleCookieTypeChange = (type: string) => {
    setCookieTypes(prevState => ({
      ...prevState, [type] : !prevState[type]
    }))
    console.log(cookieTypes)
  }

  const handleSavePreferences = () => {
    // save cookie pref to a cookie
    const preferences = JSON.stringify(cookieTypes)
    Cookies.set("cookiePreferences", preferences)

    // check if all cookie types are disabled
    const allDisabled = Object.values(cookieTypes).every(value => !value)
    
    if (allDisabled) {
      Cookies.set("cookieConsent", "denied")
      setCookieConsent("denied")
    } else {
      Cookies.set("cookieConsent", "accepted")
      setCookieConsent("accepted")
    }
  }

  const getCookiePreferences = () => {
    const preferencesStr = Cookies.get("cookiePreferences")

    if (preferencesStr)
      return JSON.parse(preferencesStr)
    
    return null
  }

  if (
    cookieConsent === "accepted" ||
    cookieConsent === "denied"
  )
    return null

  return showModal && (
    <div
      className="w-full flex flex-col items-center fixed bottom-0 left-0 right bg-gray-900 text-white p-4"
    >
      <p>
        Toolhance uses cookies to enhance your experience. Learn more:{" "}
        <Link href="/privacy-policy" className="underline">Privacy Policy</Link>
      </p>

      <div className="mt-4 flex gap-5">
        <Button
          onClick={handleAccept}
          className="bg-green-700 text-white hover:bg-green-800"
        >Accept</Button>
        <Button
          onClick={handleDeny}
          className="bg-red-500 text-white hover:bg-red-700"
        >Deny</Button>
        
        <Dialog>
          <DialogTrigger>
            <Button className="border bg-transparent text-white">Manage</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Manage Cookie Preferences</DialogTitle>
              <DialogDescription></DialogDescription>

              <div className="!mt-5">
                {["necessary", "analytics", "marketing"].map(cookieType => {
                  let checked = cookieTypes.necessary
                  if (cookieType === "analytics") checked = cookieTypes.analytics
                  else if (cookieType === "marketing") checked = cookieTypes.marketing

                  return <div className="flex items-center mb-2" key={cookieType}>
                    <Checkbox
                      id={cookieType}
                      checked={checked}
                      onCheckedChange={() => handleCookieTypeChange(cookieType)}
                      className="mr-2"
                    />

                    <label htmlFor={cookieType}>
                      {cookieType[0].toUpperCase()}
                      {cookieType.slice(1, cookieType.length)} cookies
                    </label>
                  </div>
                })}

                <Button
                  onClick={handleSavePreferences}
                  className="mt-5"
                >Save Preferences</Button>
              </div>

            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
