import { cardInfo, accordionData } from "./cardInfo"
import Link from "next/link"

import type { Metadata } from "next"
import { validateRequest } from "@/lib/lucia"

import PageHeader from "@/components/shared/other/PageHeader"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export const metadata: Metadata = {
  title: "Toolhance | Pricing",
  description: "Explore Toolhance's services' pricings!",
}

export default async function Pricing() {
  const { user } = await validateRequest()
  if (!user) {
    cardInfo[1].href = "/sign-up"
    cardInfo[2].href = "/sign-up"
  }

  return (
    <section className="max-w-[1440px] mx-auto px-[2rem] pt-[10rem]">
      <PageHeader text="Pricing" />
    
      <div className="grid grid-cols-1 min-[1175px]:grid-cols-3 gap-10 mb-[10rem]">
        {cardInfo.map(card => (
          <div
            className="mx-auto flex max-w-lg items-start justify-between flex-col rounded-xl border border-gray-300 bg-blue-50 dark:bg-white p-6 text-gray-900 xl:p-8 relative"
            key={card.header}
          >
            <h3 className="mb-2 text-xl lg:text-2xl font-normal">{card.header}</h3>
            <div className="mb-10 flex items-baseline justify-center ">
              <span className="mr-2 text-4xl lg:text-[2.75rem] font-extrabold">
                {card.price}
              </span>
              <span className="text-xl text-gray-600">{card.duration}</span>
            </div>
        
            {card.desc}
        
            <ul role="list" className="mb-8 space-y-4 text-left text-gray-600 text-sm">
              {card.perks.map(perk =>
                <li
                  className="flex items-center space-x-3"
                  key={perk.message}
                >
                  <svg
                    className={
                      `h-5 w-5 flex-shrink-0 rounded-full p-0.5 text-white ${
                        perk.status ? "bg-green-700" : "bg-red-700"
                      }`
                    }
                    fill="currentColor"
                    viewBox={`${perk.status ? "0 0": "-1 1"} 20 20`}
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d={`${ perk.status
                        ? "M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        : "M13.707 6.293a1 1 0 010 1.414L10.414 11l3.293 3.293a1 1 0 01-1.414 1.414L9 12.414l-3.293 3.293a1 1 0 01-1.414-1.414L7.586 11 4.293 7.707a1 1 0 111.414-1.414L9 9.586l3.293-3.293a1 1 0 011.414 0z"
                      }`}
                    ></path>
                  </svg>
          
                  <span>{perk.message}</span>
                </li>
              )}
            </ul>
        
            <Link
              href={card.href}
              className={`mt-4 p-2 rounded-md ${
                !card.popular
                  ? "bg-white border text-black hover:text-white"
                  : "bg-blue-500 text-white"
              } hover:bg-blue-700 focus:outline-none transition-colors text-center w-full`}
            >
              {
                (user && card.href != "/tools")
                  ? "Buy now!" : "Get Started"
              }
            </Link>

            { card.popular && (
              <div 
                className="bg-blue-500 text-white p-3 rounded-se-lg  rounded-es-lg absolute top-0 right-0 translate-x-[1px] translate-y-[-1px] w-[7rem] text-center font-bold"
              >Popular</div> 
            )}
          </div>
        ))}
      </div>

      <h2 className="font-bold bg-clip-text text-transparent bg-gradient-to-b dark:from-neutral-200 from-neutral-500 dark:to-neutral-500 to-black text-2xl md:text-4xl text-center mb-[5rem]">
        Frequently Asked Questions<span className="bg-clip-text text-transparent bg-gradient-to-b from-blue-200 to-blue-700">.</span>
      </h2>

      <div className="mx-auto max-w-[800px] mb-[15rem]">
        {
          accordionData.map(current => (
            <Accordion
              type="single" collapsible className="w-full"
              key={current.question}
            >
              <AccordionItem value="item-1">
                <AccordionTrigger>{current.question}</AccordionTrigger>
                <AccordionContent>{current.answer}</AccordionContent>
              </AccordionItem>
            </Accordion>
          ))
        }
      </div>
    </section>
  )
}