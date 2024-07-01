"use client"

import Link from "next/link"

export default function error() {
  return (
    <section className="flex items-center justify-center h-full px-16 py-[15rem]">
      <div className="max-w-fit text-center">
        <h1 className="mb-8 font-extrabold text-5xl md:text-7xl dark:text-gray-400">
          Unexpected error
        </h1>
        
        <h2 className="text-2xl font-semibold md:text-3xl">
          Oops! An unexpected error occurred.
        </h2>

        <p className="mt-4 mb-8 dark:text-gray-500">
          Try reloading the page or head back to the<br />home page by clicking the button!
        </p>

        <Link
          rel="noopener noreferrer" href="/"
          className="px-8 py-3 font-semibold rounded text-white bg-blue-500 hover:bg-blue-700 transition-colors"
        >Back to Home</Link>
      </div>
    </section>
  )
}
