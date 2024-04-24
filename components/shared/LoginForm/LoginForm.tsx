"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import Login from "@/app/(auth)/login/page"

const formSchema = z.object({
  email: z.string().min(5, "This is not a valid email!").email("This is not a valid email!"),
  password: z.string().min(5, "Your password should be at least 5 characters long!").max(50, "You cannot enter more than 50 characters!")
})

export default function LoginForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: ""
    },
  })
 
  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
  }

  return (
    <div className="bg-gradient-to-b from-blue-300 to-blue-700 rounded-3xl p-1 mx-auto lg:mx-0 w-[25rem] lg:w-[30rem]">
    <div className="bg-gray-900 text-white dark:text-white p-[3rem] rounded-[1.25rem]">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email address</FormLabel>
                <FormControl>
                  <Input placeholder="e.g. john@smith.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="mb-[10rem]">
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your password..." {...field} type="password" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex items-center justify-center w-fit gap-6">
            <Button type="submit" className="bg-white text-black">
              Login
            </Button>
            <>or</>
            <Button variant="outline" className="bg-black border-1">
              <Link href="/sign-up">Sign up</Link>
            </Button>
          </div>
        </form>
      </Form>
    </div>
    </div>
  )
}
