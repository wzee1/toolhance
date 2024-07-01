"use client"

import * as React from "react"

import lightDarkSrc from "@/public/lightdark.svg"
import Image from "next/image"

import { useTheme } from "next-themes"
import { cn } from "@/lib/utils"

const themes = ["light", "dark", "system"]

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [ isOpen, setIsOpen ] = React.useState(false)

  const toggleTheme = (newTheme: any) => {
    setTheme(newTheme)
    setIsOpen(false)
  }

  const [mounted, setMounted] = React.useState(false)
  React.useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <div className="relative">
          <button
            className="p-[0.625rem] rounded-md transition-all bg-primary hover:bg-blue-500 text-black hover:text-white"
            onClick={() => setIsOpen(!isOpen)}
          >
            {
              mounted ?
                <Image
                  className={cn("w-5 h-5",
                    theme === "light" ? "light-svg" : ""
                  )}
                  src={lightDarkSrc}
                  alt="theme toggle"
                />
              :
              <Image
                className="w-5 h-5"
                src={lightDarkSrc}
                alt="theme toggle"
              />
            }     

          </button>
      {isOpen && (
        <div className={cn("absolute top-full left-0 mt-2 w-24 shadow-lg rounded-md z-50 text-md", 
          theme === "light"
          ? "bg-black text-white"
          : "bg-white text-black"
        )}>
          {themes.map((themeOption) => (
            <button
              key={themeOption}
              className="w-full p-2 rounded-md hover:bg-blue-500 hover:text-white text-base"
              onClick={() => toggleTheme(themeOption)}
            >
              {`${themeOption[0].toUpperCase()}${themeOption.slice(1, themeOption.length)}`}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
