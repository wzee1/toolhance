import Hero from "@/components/shared/landing/Hero"
import Bento from "@/components/shared/landing/Bento"
import CTASection from "@/components/shared/landing/CTASection"
import FAQ from "@/components/shared/landing/FAQ"

import Image from "next/image"
import blobSrc from "@/public/blobs/blob3.svg"

import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Toolhance",
  description: "Use Toolhance's tools to elevate your productivity!",
}

export default function Home() {
  return (
    <main>
      <Hero />
      <Bento />
      <CTASection />
      <FAQ />

      <div className="relative" />
      <Image
        src={blobSrc}
        alt="background blur blob"
        className="blur-[10rem] absolute right-[1rem] pointer-events-none"
        height={200}
      />
    </main>
  )
}

