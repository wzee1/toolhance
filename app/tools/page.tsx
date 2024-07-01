import Content from "./(main)/Content"

import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Toolhance | Tools",
  description: "Browse Toolhance's tools here!",
}

export default function Tools() {
  return (
    <section className="max-w-[1440px] mx-auto px-[2rem] pt-[10rem]">
      <div className="grid xl:grid-cols-5">
        <Content />
      </div>
    </section>
  )
}
