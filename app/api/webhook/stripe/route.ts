import { NextRequest, NextResponse } from "next/server"
import { headers } from "next/headers"

import Stripe from "stripe"

import { validateRequest } from "@/lib/lucia"
import db from "@/lib/database"
import { userTable } from "@/lib/database/schema"
import { eq } from "drizzle-orm"

import { sendEmail } from "@/lib/email"
import pasteHTML from "@/components/shared/Stripe/paymentEmail"
import { cardInfo } from "@/app/pricing/cardInfo"
import { findUserByUserId } from "@/actions/database.actions"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string)
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET as string

export async function POST(req: NextRequest) {
  const body = await req.text()
  const signature = headers().get("stripe-signature") as string

  let data: Stripe.Event.Data
  let eventType: string
  let event: Stripe.Event

  // verify Stripe event is legit
  try {
    event = stripe.webhooks.constructEvent(
      body, signature, webhookSecret
    )
  } catch (err: any) {
    console.error(`Webhook signature verification failed. ${err.message}`)
    return NextResponse.json({ error: err.message, status: 500 })
  }

  data = event.data
  eventType = event.type

  try {
    switch (eventType) {
      case "checkout.session.completed": {
        const { user } = await validateRequest()
        const userInfo = await findUserByUserId(user?.id as string)

        if (userInfo?.hasPremium)
          return NextResponse.json({
            message: "Account already premium", status: 409
          })

        // First payment is successful and a subscription is created (if mode was set to "subscription" in ButtonCheckout)
        // ✅ Grant access to the product
        const session = await stripe.checkout.sessions.retrieve(
          (data.object as Stripe.Checkout.Session).id,
          {
            expand: ["line_items"]
          }
        )
        
        // if priceId is not the in the cardInfo,
        // then its a fake/mistake call
        const priceId = session?.line_items?.data[0]?.price?.id
        
        if (
          priceId === cardInfo[1].priceId ||
          priceId === cardInfo[2].priceId
        ) {
          const customerEmail = session?.customer_details?.email as string
          
          await db.update(userTable).set({
            hasPremium: true,
          }).where(eq(userTable.email, customerEmail))
          
          // email
          await sendEmail({
            html: pasteHTML(
              process.env.NEXT_PUBLIC_BASE_URL as string
            ),
            subject: "Premium account activited",
            to: customerEmail,
          })
        }
        
        break
      }

      case "customer.subscription.deleted": {
        // ❌ Revoke access to the product
        // Changed plan or canceled
        const subscription = await stripe.subscriptions.retrieve(
          (data.object as Stripe.Subscription).id
        )

        const customer = await stripe.customers.retrieve(
          subscription.customer as string
        )

        const customerEmail = (
          customer as Stripe.Customer
        ).email as string

        await db.update(userTable).set({
          hasPremium: false,
        }).where(eq(userTable.email, customerEmail))

        break
      }

      default:
        console.warn(`Unhandled event type: ${eventType}`)
    }
  } catch (err: any) {
    console.error(
      "Stripe error: " + err.message + " | EVENT TYPE: " + eventType
    )
  }

  return NextResponse.json({ status: 200 })
}