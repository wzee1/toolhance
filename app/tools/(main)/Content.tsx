"use client"

import { useState } from "react"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import ToolsAside from "./ToolsAside"
import ToolsMain from "./ToolsMain"

import ToolCard from "@/components/shared/tools/ToolCard"
import { tools } from "./tools"

export default function Content() {
  // For aside
  const FormSchema = z.object({
    free: z.boolean(),
    premium: z.boolean(),
    tag1: z.boolean(),
    tag2: z.boolean(),
    tag3: z.boolean(),
    tag4: z.boolean(),
    tag5: z.boolean(),
    tag6: z.boolean(),
  })

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      free: true,
      premium: true,
      tag1: false,
      tag2: false,
      tag3: false,
      tag4: false,
      tag5: false,
      tag6: false,
    },
  })

  const { watch } = useForm()  

  const pricings = [
    {
      name: "free",
      isToggled: form.watch("free")
    },
    {
      name: "premium",
      isToggled: form.watch("premium")
    }
  ]

  const tags = [
    {
      name: "tag1",
      isToggled: form.watch("tag1")
    },
    {
      name: "tag2",
      isToggled: form.watch("tag2")
    },
    {
      name: "tag3",
      isToggled: form.watch("tag3")
    },
    {
      name: "tag4",
      isToggled: form.watch("tag4")
    },
    {
      name: "tag5",
      isToggled: form.watch("tag5")
    },
    {
      name: "tag6",
      isToggled: form.watch("tag6")
    },
  ]
  // For aside end

  // For main
  const [search, setSearch] = useState("")

  const filteredTools = tools.filter(
    tool => tool.name.toLowerCase().includes(search)
      || tool.desc.toLowerCase().includes(search)
  ).filter(
    tool => {
      const selectedTags = tags.filter(tag => tag.isToggled).map(tag => tag.name)

      if (selectedTags.length === 0) {
        return ((
          tool.pricing === "Free"
            && pricings[0].isToggled
        ) || (
          tool.pricing === "Premium"
            && pricings[1].isToggled
        ))
      } else {
        return ((
          tool.pricing === "Free"
          && pricings[0].isToggled
        ) || (
          tool.pricing === "Premium"
          && pricings[1].isToggled
        )) && (
          tool.tags.some(toolTag => selectedTags.includes(toolTag))
        )
      }
    }
  )

  const toolCards = filteredTools.map(tool => (
    <ToolCard
      key={tool.name}
      name={tool.name}
      desc={tool.desc}
      pricing={tool.pricing}
      tags={tool.tags}
    />
  ))
  // For main end


  return (
    <>
      <ToolsAside
        setSearch={setSearch}
        form={form}
        pricings={pricings}
        tags={tags}
      />

      <ToolsMain 
        search={search}
        setSearch={setSearch}
        toolCards={toolCards}
      />
    </>
  )
}
