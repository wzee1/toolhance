import { SignUpForm } from "@/components/shared/Auth/SignUpForm"
import { validateRequest } from "@/lib/lucia"
import { redirect } from "next/navigation"

export default async function SignUpPage() {
  const { user } = await validateRequest()

  if (user) {
    return redirect("/")
  }

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