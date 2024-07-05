import { findUserByUserId } from "@/actions/database.actions"
import { Button } from "@/components/ui/button"
import { validateRequest } from "@/lib/lucia"

import Link from "next/link"
import { redirect } from "next/navigation"

// Customer portal link
const customerPortalLink =
  "https://billing.stripe.com/p/login/test_aEU29e7Gv3eZ6rK3cc"

export default async function ButtonCustomerPortal() {
  const { user } = await validateRequest()
  if (!user) return redirect("/sign-in")

  const userInfo = await findUserByUserId(user.id)
  const userEmail = userInfo?.email
    
  return (
    <Link href={
      customerPortalLink + "?prefilled_email=" + userEmail
    }>
      <Button>Customer Portal</Button>
    </Link>
  )
}
