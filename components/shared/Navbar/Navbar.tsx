"use client"

import { usePathname } from "next/navigation"

import Link from "next/link"
import Image from "next/image"

import { Button } from "@/components/ui/button"

import { ThemeToggle } from "./toggle"

import logoURL from "../../../public/logo.png"

export default function Navbar() {
  const pathname = usePathname()
  const logo =
    <Image
      src={logoURL}
      alt="Toolhance logo"
      height={50}
    />

  return (
    <nav className="min-[850px]:block hidden fixed z-[1000] h-[5rem] w-full dark:bg-[#111115]/70 bg-white/70 backdrop-blur-[8px] px-[2rem]">
      <div className="flex justify-between items-center h-[5rem] max-w-[1400px] mx-auto">
        {pathname === "/"
          ? <a onClick={() => window.scrollTo({
              top: 0,
              behavior: "smooth"
            })}>{logo}</a>
          : <Link href="/">{logo}</Link>
        }

        <div className="flex justify-center items-center gap-10 text-lg">
          <Link
            href="/"
            className="hover:text-blue-500 transition-all"
          >Home</Link>
          <Link
            href="/tools"
            className="hover:text-blue-500 transition-all"
          >Tools</Link>
          <Link
            href="/tools"
            className="hover:text-blue-500 transition-all"
          >FAQ</Link>

          <ThemeToggle />
          
          <Link href="/login">
            <Button className="text-md hover:bg-blue-500 hover:text-white">
              Login
            </Button>
          </Link>
        </div>       
      </div>
    </nav>
  )
}
