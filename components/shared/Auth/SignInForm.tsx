"use client"

import { Fragment, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useCountdown } from "usehooks-ts"
import Link from "next/link"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { OTPSchema, SignInSchema } from "@/types/index"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "@/components/ui/use-toast"

import {
  createFacebookAuthorizationURL,
  createGoogleAuthorizationURL,
  credentialsMatched,
  resendVerificationEmail,
  signIn,
} from "@/actions/auth.actions"

import { findUserByEmail } from "@/actions/database.actions"

import {
  Dialog, DialogContent,
  DialogDescription, DialogFooter,
  DialogHeader, DialogTitle
} from "@/components/ui/dialog"

export function SignInForm() {
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
  // }, [count])
  }, [count, resetCountdown, stopCountdown])

  const [showResendVerificationEmail, setShowResendVerificationEmail] =
    useState(false)

  const router = useRouter()

  const form = useForm<z.infer<typeof SignInSchema>>({
    resolver: zodResolver(SignInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const [showOTPInput, setShowOTPInput] = useState(false)
  const formOTP = useForm<z.infer<typeof OTPSchema>>({
    resolver: zodResolver(OTPSchema),
    defaultValues: { otp: "" },
  })

  async function onSubmit(values: z.infer<typeof SignInSchema>) {
    const resMatched = await credentialsMatched(values) 
    if (resMatched.error) {
      toast({
        variant: "destructive",
        description: resMatched.error,
      })

      if (resMatched?.key === "email_not_verified")
        setShowResendVerificationEmail(true)
    } else if (resMatched.success) {
      const user = await findUserByEmail(values.email)
      if (!user?.is2FAEnabled) {
        const res = await signIn(values, "")

        if (res.error)
          toast({
            variant: "destructive",
            description: res.error
          })
        else { 
          toast({
            variant: "default",
            description: "Signed in successfully",
          })
          
          router.push("/")
        }
      } else setShowOTPInput(true)
    }
  }

  async function onSubmitOTP(
    values: z.infer<typeof OTPSchema>
  ) {
    const valuesCredentials = {
      email: form.getValues("email"),
      password: form.getValues("password")
    }

    const res = await signIn(valuesCredentials, values.otp)

    if (res.error)
      toast({
        variant: "destructive",
        description: res.error
      })
    else {
      toast({
        variant: "default",
        description: "Signed in successfully",
      })
      
      setShowOTPInput(false)
      router.push("/")
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
    const res = await createGoogleAuthorizationURL()
    if (res.error)
      toast({
        variant: "destructive",
        description: res.error,
      })
    else if (res.success)
      window.location.href = res.data.toString()
  }

  const onFacebookSignInClicked = async () => {
    const res = await createFacebookAuthorizationURL()
    if (res.error)
      toast({
        variant: "destructive",
        description: res.error,
      })
    else if (res.success)
      window.location.href = res.data.toString()
  }

  return (
    <Fragment>
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
          <span>Sign in with Google</span>
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
          <span>Sign in with Facebook</span>
        </Button>
      </div>

      <div className="w-full flex items-center justify-center gap-2">
        <span className="border-b border-gray-300 w-full"></span>
        <span className="flex-none">Or sign in with your email</span>
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

          <Button type="submit">Login to your account</Button>
        </form>

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
      </Form>

      <p>Don&apos;t have an account? <Link href="/sign-up" className="font-bold">Click here to sign up!</Link></p>

      { showOTPInput &&
        <Dialog open={true}>
          <DialogContent
            className="sm:max-w-[425px]"
            // @ts-ignore
            setShowOTPInput={setShowOTPInput}
          >
            <DialogHeader>
              <DialogTitle>Enter One-Time Password</DialogTitle>
              <DialogDescription>
                It seems you have enabled Two-Factor Authentication.<br />
                To continue, please enter your One-Time Password (OTP)<br />
                found in your authenticator application.
                If you can&apos;t access your OTP, you can use your saved backup code.
              </DialogDescription>
            </DialogHeader>
            
            <Form {...formOTP}>
              <form onSubmit={formOTP.handleSubmit(onSubmitOTP)} className="space-y-4">
                <FormField
                  control={formOTP.control}
                  name="otp"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>One-Time Password</FormLabel>
                      <FormControl>
                        <Input className="dark:text-white" placeholder="123456" type="text" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <DialogFooter>
                  <Button type="submit">Login to your account</Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      }
    </Fragment>
  )
}