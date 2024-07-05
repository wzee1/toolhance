import Link from "next/link"
import { validateRequest } from "@/lib/lucia"
import { redirect } from "next/navigation"
import { findUserByUserId } from "@/actions/database.actions"
import { cardInfo } from "@/app/pricing/cardInfo"
import { Button } from "@/components/ui/button"
import ButtonCustomerPortal from "../../Stripe/ButtonCustomerPortal"

export const plans = [
  {
    link: process.env.NODE_ENV === "development"
      ? "https://buy.stripe.com/test_4gwg0MfXb55l6BieUU"
      : "",
    priceId: process.env.NODE_ENV === "development" ? "********" : "",
    price: 19,
    duration: "/month"
  },
  {
    link: process.env.NODE_ENV === "development"
      ? "https://buy.stripe.com/test_00gbKw5ix2XdgbSfYZ"
      : "",
    priceId: process.env.NODE_ENV === "development" ? "********" : "",

    price: 50,
    duration: "one time"
  }
]

export default async function SubscriptionPlan({ plan }: { plan: string }) {
  const { user } = await validateRequest()
  if (!user) return redirect("/sign-in")

  const userInfo = await findUserByUserId(user.id)
  const userEmail = userInfo?.email

  if (plan === "free") return (
    <section id="pricing" className="mb-10">
      <Link href={`${cardInfo[1].href}?prefilled_email=${userEmail}`}>
        <Button>Monthly</Button>
      </Link>
      
      <Link href={`${cardInfo[2].href}?prefilled_email=${userEmail}`}>
        <Button>One-time</Button>
      </Link>
    </section>
  )
  else return (
    <section id="pricing" className="mb-10">
      <h2 className="font-bold text-lg mb-3">You have a premium account!</h2>
      <div className="flex items-center gap-6">
        <p className="text-gray-600 dark:text-gray-300">
          To manage your subscription please visit the customer portal:
        </p>
        <ButtonCustomerPortal />
      </div>
    </section>
  )
}