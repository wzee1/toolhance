import { Button } from "@/components/ui/button";
import Link from "next/link";
import LoginForm from "../LoginForm/LoginForm";

export default function CTASection() {
  return (
    <section className="max-w-[1440px] mx-auto px-[2rem] mb-[15rem] flex gap-10 justify-between flex-col lg:flex-row">
      <div className="mt-[2.2rem] max-[768px]:flex flex-col justify-center items-center">
        <h2 className="font-bold bg-clip-text text-transparent bg-gradient-to-b dark:from-neutral-200 from-neutral-500 dark:to-neutral-500 to-black text-3xl md:text-5xl mb-[1rem] md:mb-[3rem] text-center md:text-left">
          Caught your attention?<br />
          Join <span className="bg-clip-text text-transparent bg-gradient-to-b from-blue-200 to-blue-700">Toolhance</span> now!
        </h2>

        <Link href="/tools">
          <Button>Browse Our Free Tools</Button>
        </Link>
      </div>

      <LoginForm />
    </section>      
  )
}
