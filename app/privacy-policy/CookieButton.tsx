"use client"

import Cookies from "js-cookie"
import { Button } from "@/components/ui/button"

export default function CookieButton(
  { className }: { className: string }
) {
  const handleClick = () => {
    Cookies.remove("cookieConsent")
    Cookies.remove("cookiePreferences")
    window.location.reload()
  }
 
  return <Button onClick={handleClick} className={className}>
    Change Cookie Preferences
  </Button>
}
