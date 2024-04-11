import * as React from 'react'
import { MoonIcon, SunIcon } from '@radix-ui/react-icons'
import { useTheme } from 'next-themes'
import { cn } from '@/lib/utils'

const themes = ["light", "dark", "system"];

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [ isOpen, setIsOpen ] = React.useState(false)

  const toggleTheme = (newTheme: any) => {
    setTheme(newTheme)
    setIsOpen(false)
  }

  return (
    <div className="relative">
      <button
        className={cn("p-[0.625rem] rounded-md transition-all hover:bg-blue-500 text-black hover:text-white",
          theme === "light" ? "bg-primary" : "bg-white"
        )}
        onClick={() => setIsOpen(!isOpen)}
      >
        { theme === "light"
          ? <SunIcon className="h-5 w-5 text-white" />
          : <MoonIcon className="h-5 w-5" /> }
      </button>
      {isOpen && (
        <div className={cn("absolute top-full left-0 mt-2 w-24 shadow-lg rounded-md z-50 text-md", 
          theme === "light"
          ? "bg-primary text-white"
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
