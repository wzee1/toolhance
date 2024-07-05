export default function PageHeader(
  { text } : { text: string }
) {
  return (
    <h1
      className="font-bold bg-clip-text text-transparent  bg-gradient-to-b dark:from-neutral-200 from-neutral-500 dark:to-neutral-500 to-black text-4xl md:text-5xl text-center mb-[6rem]"
    >
      {text}
      <span className="bg-clip-text text-transparent bg-gradient-to-b from-blue-200 to-blue-700">.</span>
    </h1> 
  )
}
