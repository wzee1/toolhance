import { validateRequest } from "@/lib/lucia"
import NavbarMobileContent from "./NavbarMobileContent"

export default async function NavbarMobile() {
  const { user } = await validateRequest()

  let signedIn = false
  if (user)
    signedIn = true

  return (
    <NavbarMobileContent signedIn={signedIn}/>
  )
}
