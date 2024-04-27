"use client"

import { useState } from "react"

import ToolCard from "@/components/shared/tools/ToolCard"
import { tools } from "./tools"

import { Input } from "@/components/ui/input"

interface Props {
  search: string,
  setSearch: any,
  toolCards: Array<any>
}

export default function ToolsMain({
  search, setSearch, toolCards
}: Props) {
  return (
    <main className="col-span-4 flex flex-col mb-4"> 
      <h1
        className="font-bold bg-clip-text text-transparent  bg-gradient-to-b dark:from-neutral-200 from-neutral-500 dark:to-neutral-500 to-black text-2xl md:text-4xl mb-8"
      >Explore Our Tools
      <span className="bg-clip-text text-transparent bg-gradient-to-b from-blue-200 to-blue-700">.</span></h1>

      <Input
        placeholder="Search for tools..."
        className="w-full px-4 pb-2 mb-10 text-black dark:text-white rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
        onChange={(e) => setSearch(e.target.value.toLowerCase())}
      />

      {
        toolCards.length > 0
          ? <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">{toolCards}</div>
          : <>
            <h3 className="text-lg font-semibold">No tools were found!</h3>
            <p className="text-gray-500">Use the search bar and the filter options to explore Toolhance's tools.</p>
          </>
      }
    </main>
  )
}
