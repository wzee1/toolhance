import {footerLinks, footerSocialLinks} from "./footerLinks"
import Link from "next/link"
import Image from "next/image"

export default function Footer() {
  return (
    <footer className="bg-white dark:bg-[#111115]">
      <div className="max-w-screen-xl px-4 py-12 mx-auto space-y-8 overflow-hidden sm:px-6 lg:px-8">
        <nav className="flex flex-wrap justify-center -mx-5 -my-2">
          {footerLinks.map(currentLink => (
            <div className="px-5 py-2" key={currentLink.href}>
              <Link href={currentLink.href} className="text-base leading-6 text-gray-500 hover:text-gray-900 dark:text-white dark:hover:underline transition-all">{currentLink.name}</Link>
            </div>
          ))}
        </nav>

        <div className="flex justify-center mt-8 space-x-6">
          {footerSocialLinks.map(currentLink => (
            <Link
              key={currentLink.href}
              href={currentLink.href}
              className="text-gray-400 hover:text-gray-500 dark:hover:text-white transition-all"
            >
              <span className="sr-only">{currentLink.name}</span>
              {currentLink.svg}
            </Link>
          ))}
        </div>
        
        <p className="mt-8 text-base leading-6 text-center text-gray-400">
            © {new Date().getFullYear()} <Link href="/" className="font-semibold">Toolhance</Link>. All rights reserved.
        </p>
      </div>
    </footer>
)}