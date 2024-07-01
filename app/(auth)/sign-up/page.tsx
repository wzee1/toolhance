import { SignUpForm } from "@/components/shared/auth/SignUpForm"
import { validateRequest } from "@/lib/lucia"
import { redirect } from "next/navigation"

import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Toolhance | Sign Up",
  description: "Join Toolhance now via Google or Facebook or email address and password!",
}

export default async function SignUpPage() {
  const { user } = await validateRequest()

  if (user) return redirect("/account")

  return (
    <section className="mx-auto flex flex-col items-center justify-center px-6 py-[8rem] lg:py-[26.5rem] md:h-screen">
      <div className="w-full max-w-xl space-y-8 rounded-lg bg-white p-6 shadow dark:bg-gray-800 sm:p-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Create an Account
        </h2>
        <SignUpForm />
      </div>
    </section>
  )
}