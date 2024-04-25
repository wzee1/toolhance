"use client"

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet"

import { usePathname } from "next/navigation"

import Image from "next/image"
import { Button } from "@/components/ui/button"

import menu from "../../../public/menu.svg"
import logoURL from "../../../public/logo.png"

import { ThemeToggle } from "./toggle"
import { cn } from "@/lib/utils"

export default function NavbarMobile() {

  const pathname = usePathname()
  const logo =
    <Image
      src={logoURL}
      alt="Toolhance logo"
      className="absolute top-5 left-3 z-10"
      height={50}
    />

  return (
    <nav className="min-[850px]:hidden">
      <div className="flex justify-between items-center">
        {logo}
        <div className="rounded-full bg-blue-700/50 backdrop-blur-[8px] w-[55px] h-[55px] fixed top-5 right-3 z-10" />
      </div>

      <Sheet>
        <SheetTrigger>
          <Image
            src={menu}
            alt="Open navigation"
            className="fixed top-6 right-[1.125rem] z-[11]"
            height={45}
          />
        </SheetTrigger>
        <SheetContent>
        <SheetHeader>
          <SheetDescription>
            {pathname === "/"
              ? <a onClick={() => window.scrollTo({
                  top: 0,
                  behavior: "smooth"
                })} className="cursor-pointer">Home</a>
              : <a href="/" className="cursor-pointer">Home</a>
            }

            <a href="/tools" className="cursor-pointer">Tools</a>
            <a href="/#faq" className="cursor-pointer">FAQ</a>

            <a href="/login" className="cursor-pointer">
              <Button className="text-xl hover:bg-blue-500 hover:text-white">
                Login
              </Button>
            </a>

            <ThemeToggle />
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
      </Sheet>
    </nav>
  )
}
