"use client"

import { signOutFromAllDevices } from "@/actions/auth.actions"
import { Button } from "@/components/ui/button"
import { toast } from "@/components/ui/use-toast"

export default function SignOutFromAllDevicesButton() {
  const clickHandler = async () => {
    signOutFromAllDevices()
    toast({
      variant: "default",
      description: "Logged out successfully from all devices except yours!"
    })
  }

  return (
    <Button onClick={clickHandler}>
      Log out from all devices
    </Button>
  )
}
