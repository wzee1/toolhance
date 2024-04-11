import { HeroScrollDemo } from "./HeroScrollDemo"

export default function Hero() {
  return <section>
    <div className="w-full dark:bg-[#111115] bg-white  dark:bg-dot-white/[0.3] bg-dot-black/[0.3] relative flex items-center justify-center">
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-[#111115] bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />

      <HeroScrollDemo />
    </div>
  </section>
}