import { Button } from "@/components/ui/button"
import Link from "next/link"

interface Props {
  name: string,
  desc: string,
  pricing: string,
  tags: Array<string>
}

export default function ToolCard(
  { name, desc, pricing, tags }: Props
) {
  return (
    <div className="p-4 border rounded-md shadow-sm relative">
      <div className="flex justify-between items-center font-bold mb-1">
        <h3 className="text-xl">
          {name.length <= 28
            ? name : name.substring(0, 25) + "..."}
        </h3>
        <p 
          className={`${ pricing === "Premium"
            ? "bg-blue-500 text-white"
            : "border bg-white text-black"
          } transition-all p-3 rounded-se-lg  rounded-es-lg absolute top-0 right-0 translate-x-[1px] translate-y-[-1px] w-fit text-center font-bold`}
        >{pricing}</p>
      </div>
      
      <div className="flex gap-1 mb-5">
        <p className="font-semibold">Tags:</p>
        <div>
          {tags.map(tag => (
            <span
              key={tag}
              className="text-gray-500 ml-1"
            >{tag},</span>
          ))}
        </div>
      </div>

      <p className="text-gray-500 dark:text-gray-300 mb-[4rem]">{desc}</p>

      <Button className="absolute bottom-4">
        <Link href={`/tools/${name}`}>Try it out now</Link>
      </Button>
    </div>
  )
}
