import { validateRequest } from "@/lib/lucia"

import NavbarContent from "./NavbarContent"

export default async function Navbar() {
  const { user } = await validateRequest()

  let signedIn = false
  if (user) signedIn = true

  return (
    <NavbarContent signedIn={signedIn} />
  )
}


