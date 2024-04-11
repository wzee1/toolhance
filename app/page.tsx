import Hero from "@/components/shared/landing/Hero"
import Bento from "@/components/shared/landing/Bento"
import CTASection from "@/components/shared/landing/CTASection"
import FAQ from "@/components/shared/landing/FAQ"

export default function Home() {
  return (
    <main>
      <Hero />
      <Bento />
      <CTASection />
      <FAQ />
    </main>
  )
}

