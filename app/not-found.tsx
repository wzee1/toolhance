import Link from "next/link"

import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Toolhance | 404",
  description: "ERROR 404 - The page you were looking for does not exist!",
}

export default function notFound() {
  return (
    <section className="flex items-center justify-center h-full px-16 py-[15rem]">
      <div className="max-w-[30rem] text-center">
        <h1 className="mb-8 font-extrabold text-9xl dark:text-gray-400">
          <span className="sr-only">Error</span>404
        </h1>
        
        <h2 className="text-2xl font-semibold md:text-3xl">
          Oops! You are probably lost.
        </h2>

        <p className="mt-4 mb-8 dark:text-gray-500">
          The page you were looking for does not exist.<br />
          Head back to the home page by clicking the button!
        </p>

        <Link
          rel="noopener noreferrer" href="/"
          className="px-8 py-3 font-semibold rounded text-white bg-blue-500 hover:bg-blue-700 transition-colors"
        >Back to Home</Link>
      </div>
    </section>
  )
}
