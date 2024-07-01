"use client"

import { ContainerScroll } from "../../ui/container-scroll-animation"

export function HeroScrollDemo() {
  return (
    <div className="flex flex-col">
      <ContainerScroll
        users={users}
        titleComponent={
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold relative z-20 bg-clip-text text-transparent bg-gradient-to-b dark:from-neutral-200 from-neutral-500 dark:to-neutral-500 to-black text-center">
            Maximize Your Productivity<br />
            <span className="text-5xl sm:text-6xl lg:text-8xl">
              with {" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-b from-blue-200 to-blue-700">
                Toolhance
              </span>.
            </span>
          </h1>
        }
      />
    </div>
  )
}

export const users = [
  {
    name: "Manu Arora",
    designation: "Founder, Algochurn",
    image: "https://picsum.photos/id/10/300/300",
    badge: "Mentor",
  },
  {
    name: "Sarah Singh",
    designation: "Founder, Sarah's Kitchen",
    image: "https://picsum.photos/id/11/300/300",
    badge: "Mentor",
  },
  {
    name: "John Doe",
    designation: "Software Engineer, Tech Corp",
    image: "https://picsum.photos/id/12/300/300",
    badge: "Mentor",
  },
]