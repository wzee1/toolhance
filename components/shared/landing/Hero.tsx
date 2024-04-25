import { HeroScrollDemo } from "./HeroScrollDemo"

import Image from "next/image"
import blobSrc from "@/public/blobs/blob2.svg"

export default function Hero() {
  return <section>
    <div className="w-full dark:bg-[#111115] bg-white  dark:bg-dot-white/[0.3] bg-dot-black/[0.3] relative flex items-center justify-center">
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-[#111115] bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />

      <HeroScrollDemo />
    </div>

    <Image
      src={blobSrc}
      alt="background blur blob"
      className="blur-[8rem] absolute top-[27.5rem] left-[5rem] sm:top-[20rem] sm:left-[5rem] lg:top-[40rem] lg:left-[5rem] xl:left-[10rem] 2xl:left-[20rem] pointer-events-none"
      height={250}
    />

  </section>
}