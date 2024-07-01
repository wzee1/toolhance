import { cardInfo } from "./cardInfo"
import Link from "next/link"

import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Toolhance | Pricing",
  description: "Explore Toolhance's services' pricings!",
}

export default function Pricing() {
  return (
    <section className="max-w-[1440px] mx-auto px-[2rem] pt-[10rem]">
      <h1
        className="font-bold bg-clip-text text-transparent  bg-gradient-to-b dark:from-neutral-200 from-neutral-500 dark:to-neutral-500 to-black text-3xl md:text-5xl text-center mb-[6rem]"
      >Pricing
      <span className="bg-clip-text text-transparent bg-gradient-to-b from-blue-200 to-blue-700">.</span></h1>
    
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 mb-[10rem]">
        {cardInfo.map(card => (
          <span
            className="h-full w-full md:w-3/4 lg:w-full mx-auto rounded-lg bg-gradient-to-b from-blue-300 to-blue-700 p-1 hover:-translate-y-1 transition-all"
            key={card.href}
          >
          <div className="flex flex-col justify-between h-full p-8 bg-gray-700 text-white rounded-md">
            <h2 className="text-[1.6rem] lg:text-3xl font-bold mb-4">
              {card.header}
            </h2>
            {card.desc}
  
            <ul className="list-disc space-y-1 mb-8 ml-6">
              {card.perks.map((perk) => (
                <li key={perk} className="text-gray-200">{perk}</li>
              ))}
            </ul>
            
            <p className="text-lg">Price: <b>{card.price}</b></p>
  
            <Link href={card.href} className="mt-4 p-2 rounded-md bg-blue-500 text-white hover:bg-blue-700 focus:outline-none transition-colors text-center">
              Get Started
            </Link>
          </div>
          </span>
        ))}



      </div>
    </section>
  )
}
