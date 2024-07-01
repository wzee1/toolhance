"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useCountdown } from "usehooks-ts"
import Link from "next/link"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "@/components/ui/use-toast"

import { SignUpSchema } from "@/types/index"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

import {
  createGoogleAuthorizationURL,
  createFacebookAuthorizationURL,
  resendVerificationEmail,
  signUp,
} from "@/actions/auth.actions"

export function SignUpForm() {
  const router = useRouter()
  const [count, { startCountdown, stopCountdown, resetCountdown }] =
    useCountdown({
      countStart: 60,
      intervalMs: 1000,
    })

  useEffect(() => {
    if (count === 0) {
      stopCountdown()
      resetCountdown()
    }
  //}, [count])
  }, [count, resetCountdown, stopCountdown])

  const [showResendVerificationEmail, setShowResendVerificationEmail] =
    useState(false)

  const form = useForm<z.infer<typeof SignUpSchema>>({
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  })

  async function onSubmit(values: z.infer<typeof SignUpSchema>) {
    const res = await signUp(values)
    startCountdown()
    if (res.error) {
      toast({
        variant: "destructive",
        description: res.error,
      })
    } else if (res.success) {
      toast({
        variant: "default",
        description:
          "We've sent an verification email to your inbox. Please verify your email to continue.",
      })
      setShowResendVerificationEmail(true)
    }
  }

  const onResendVerificationEmail = async () => {
    const res = await resendVerificationEmail(form.getValues("email"))
    if (res.error) {
      toast({
        variant: "destructive",
        description: res.error,
      })
    } else if (res.success) {
      toast({
        variant: "default",
        description: res.success,
      })
      startCountdown()
    }
  }

  const onGoogleSignInClicked = async () => {
    console.debug("Google sign in clicked")
    const res = await createGoogleAuthorizationURL()
    if (res.error) {
      toast({
        variant: "destructive",
        description: res.error,
      })
    } else if (res.success) {
      window.location.href = res.data.toString()
    }
  }

  const onFacebookSignInClicked = async () => {
    console.debug("Facebook sign in clicked")
    const res = await createFacebookAuthorizationURL()
    if (res.error) {
      toast({
        variant: "destructive",
        description: res.error,
      })
    } else if (res.success) {
      window.location.href = res.data.toString()
    }
  }

  return (
    <>
      <div className="w-full flex item-center justify-center">
        <Button
          onClick={onGoogleSignInClicked}
          variant={"outline"}
          className="w-full hover:bg-orange-500 hover:text-white"
        >
          <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 210 210" >
            <path d="M0,105C0,47.103,47.103,0,105,0c23.383,0,45.515,7.523,64.004,21.756l-24.4,31.696C133.172,44.652,119.477,40,105,40
              c-35.841,0-65,29.159-65,65s29.159,65,65,65c28.867,0,53.398-18.913,61.852-45H105V85h105v20c0,57.897-47.103,105-105,105
              S0,162.897,0,105z"/>
          </svg>
          <span>Sign up with Google</span>
        </Button>
      </div>

      <div className="w-full flex item-center justify-center">
        <Button
          onClick={onFacebookSignInClicked}
          variant={"outline"}
          className="w-full hover:bg-blue-500 hover:text-white"
        >
          <svg className="w-6 h-6 mr-2" aria-hidden="true" fill="currentColor" viewBox="0 0 24 24">
            <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd"></path>
          </svg>
          <span>Sign up with Facebook</span>
        </Button>
      </div>

      <div className="w-full flex items-center justify-center gap-2">
        <span className="border-b border-gray-300 w-full"></span>
        <span className="flex-none">Or sign up with your email</span>
        <span className="border-b border-gray-300 w-full"></span>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input className="dark:text-white" placeholder="e.g. john@smith.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />{" "}
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input className="dark:text-white" placeholder="******" type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm password</FormLabel>
                <FormControl>
                  <Input className="dark:text-white" placeholder="******" type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Create an account</Button>
        </form>
      </Form>

      {showResendVerificationEmail && (
        <Button
          disabled={count > 0 && count < 60}
          onClick={onResendVerificationEmail}
          variant={"link"}
          className="px-0"
        >
          Send verification email {count > 0 && count < 60 && `in ${count}s`}
        </Button>
      )}

      <p>Already have an account? <Link href="/sign-in" className="font-bold">Click here to sign in!</Link></p>
    </>
  )
}