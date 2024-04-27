"use client"

import { useState, useEffect } from "react"

import {
  Form,
  FormControl,
  FormField,
  FormItem,
} from "@/components/ui/form"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

interface Props {
  setSearch: any,
  form: any,
  pricings: Array<any>,
  tags: Array<any>
}

export default function ToolsAside({
  setSearch, form, pricings, tags
}: Props) {
  const [screenWidth, setScreenWidth] = useState(0)
  
  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth)
    }

    handleResize()
    
    window.addEventListener('resize', handleResize);
    
    return () => window.removeEventListener('resize', handleResize);
  }, [])
    
  const [isModalOpen, setIsModalOpen] = useState(false)
  const handleOpenModal = () => (
    isModalOpen ? setIsModalOpen(false) : setIsModalOpen(true)
  )

  const asideElement =
    <aside className="col-span-1 xl:sticky top-[8rem] w-full xl:w-3/4 h-fit p-4 border rounded-md shadow-sm">
      <h3 className="font-bold text-2xl mb-5">Filter Tools</h3>

      <>
        <h4 className="font-semibold text-xl mb-1">By pricing:</h4>

        <Form {...form}>
        <ul className="ml-2 mb-4">
          {pricings.map(pricing => (
            <li key={pricing.name} className="flex items-center gap-1.5">
              <FormField
                control={form.control} //@ts-ignore
                name={pricing.name}
                render={({ field }) => {
                  return (
                    <FormItem
                    className="flex flex-row items-start space-x-3 space-y-0"
                    >
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          />
                      </FormControl>
                    </FormItem>
                  )}}
                  />
              <p>
                {pricing.name[0].toUpperCase() + pricing.name.substring(
                  1, pricing.name.length
                )}
              </p>
            </li>
          ))}
        </ul>
        </Form>
      </>      

      <>
        <h4 className="font-semibold text-xl mb-1">By tags:</h4>

        <Form {...form}>
        <ul className="ml-2 mb-4">
          {tags.map(tag => (
            <li key={tag.name} className="flex items-center gap-1.5">
              <FormField
                control={form.control} //@ts-ignore
                name={tag.name}
                render={({ field }) => {
                  return (
                    <FormItem
                    className="flex flex-row items-start space-x-3 space-y-0"
                    >
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          />
                      </FormControl>
                    </FormItem>
                  )}}
                  />

              <p>{tag.name}</p>
            </li> 
          ))}
        </ul>
        </Form>
      </>

      <> {screenWidth >= 1280 ? <>
          <h4 className="font-semibold text-xl mb-2">By search:</h4>

          <Input
            placeholder="Search for tools..."
            className="w-full px-4 pb-2 mb-2 text-black dark:text-white rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
            onChange={(e) => setSearch(e.target.value.toLowerCase())}
          />
        </>: null}
      </>
    </aside>

  return (<>
    {screenWidth >= 1280
      ? asideElement
      : <>
        <Button onClick={handleOpenModal} className="absolute top-[11.25rem] min-[850px]:top-[10rem] right-[2rem] mb-5">
          Filters
        </Button>
        {isModalOpen
          ? <div className="fixed right-[3.25rem] top-[50vh] -translate-y-1/2 bg-white rounded-md dark:text-black z-50 scale-[1.25]">
              {asideElement}
              <Button
                onClick={handleOpenModal}
                className="fixed right-[-0.45rem] bottom-[-0.25rem] scale-[0.8] dark:bg-gray-900 dark:text-white dark:hover:bg-blue-500"
              >
                Close
              </Button>
            </div>
          : null
        }</>}
  </>)
}