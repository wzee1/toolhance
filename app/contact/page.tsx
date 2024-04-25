"use client"

import { useState, useEffect } from "react"

import Image from "next/image"
import { footerSocialLinks } from "@/components/shared/Footer/footerLinks"
import emailSrc from "@/public/email.svg"
import { useTheme } from "next-themes"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

const formSchema = z.object({
  email: z.string().min(5, "This is not a valid email!").email("This is not a valid email!"),
  name: z.string().max(20, "You can only enter 20 characters at max!"),
  message: z.string()
})

const fields = [
  {
    field: "email",
    name: "Email address",
    placeholder: "e.g. john@smith.com",
  },
  {
    field: "name",
    name: "Full name",
    placeholder: "e.g. John Smith",
  },
  {
    field: "message",
    name: "Your message",
    placeholder: "Type in your message here...",
  }
]

export default function Contact() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      name: "",
      message: ""
    },
  })
 
  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
  }

  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <section className="h-full max-w-[1440px] mx-auto px-[2rem] py-[10rem] relative">
      <h1
        className="font-bold bg-clip-text text-transparent  bg-gradient-to-b dark:from-neutral-200 from-neutral-500 dark:to-neutral-500 to-black text-3xl md:text-5xl text-center mb-[5rem]"
      >Contact Us
      <span className="bg-clip-text text-transparent bg-gradient-to-b from-blue-200 to-blue-700">.</span></h1>
      
      <div className="grid items-center md:grid-cols-2">  
        <ul className="grid grid-cols-2 md:grid-cols-1 lg:grid-cols-2 max-w-fit h-fit gap-[3.5rem] mb-10 mx-auto md:order-2">
          <li className="h-fit w-fit">
            <span className="flex items-center gap-2 mb-1">
              {
                mounted ?
                  <Image
                    src={emailSrc}
                    alt="instagram icon"
                    width={24}
                    height={24}
                    className={theme === "light" ? "light-svg" : ""}
                  />
                :
                  <Image
                    src={emailSrc}
                    alt="instagram icon"
                    width={24}
                    height={24}
                  /> 
              }
                
              <h2 className="text-xl font-bold">Email address:</h2>
            </span>

            <a href="mailto:info@toolhance.com" className="text-gray-400">info@toolhance.com</a>
          </li>

          {footerSocialLinks.map(current => (
            <li className="h-fit w-fit" key={current.name}>
              <span className="flex items-center gap-2 mb-1">
                {current.svg}
                <h2 className="text-xl font-bold">Our {current.name}:</h2>
              </span>

              <Link href={current.href} className="text-gray-400">@toolhance</Link>
            </li>
          ))} 
        </ul>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 md:order-1">
            {fields.map(current => (
              <FormField
                control={form.control}
                /*@ts-ignore*/
                name={current.field}
                key={current.field}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{current.name}</FormLabel>
                    <FormControl>
                      {
                        current.field === "message"
                          ?
                        <Textarea className="dark:text-white" placeholder={current.placeholder} {...field} />
                          :
                        <Input className="dark:text-white" placeholder={current.placeholder} {...field} />
                      }
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}

            <Button type="submit" className="bg-primary text-white dark:text-black w-full">
              Send
            </Button>
          </form>
        </Form>
      </div>
    </section>
  )
}
