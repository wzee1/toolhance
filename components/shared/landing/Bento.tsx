
export default function Bento() {
  return (
    <section className="max-w-[1440px] mx-auto px-[2rem] mb-[15rem]">
      <h2 className="font-bold bg-clip-text text-transparent bg-gradient-to-b dark:from-neutral-200 from-neutral-500 dark:to-neutral-500 to-black text-3xl md:text-5xl text-center mb-[5rem]">
        Why use <span className="bg-clip-text text-transparent bg-gradient-to-b from-blue-200 to-blue-700">Toolhance</span>?
      </h2>

      <div className="lg:grid lg:grid-cols-3 lg:grid-rows-2 flex flex-col gap-6 place-items-center max-w-6xl mx-auto">
        <span className="col-span-2 text-white h-[15rem] lg:h-[18rem] min-[1183px]:h-[15rem] w-full rounded-lg bg-gradient-to-b from-blue-300 to-blue-700 p-1 hover:p-0 transition-all">
          <div className="flex items-center gap-4 p-8 h-full rounded-md bg-[url(../public/laptop.jpg)] bg-cover bg-center">
            <div className="bg-black/70 p-4 rounded-lg w-fit h-fit mx-auto md:mx-0">
              <h3 className="text-2xl font-semibold mb-3">
                Increased Productivity
              </h3>

              <p className="text-base text-slate-300">
                Streamline your workflow and<br />accomplish tasks more efficiently<br />with Toolhance&apos;s productivity tools.
              </p>
            </div>
          </div>
        </span>

        <span className="col-start-3 h-[15rem] lg:h-[18rem] min-[1183px]:h-[15rem] w-full rounded-lg bg-gradient-to-b from-blue-300 to-blue-700 p-1 hover:p-0 transition-all">
          <div className="h-full p-8 bg-gray-700 text-white rounded-md text-center lg:text-left">
            <h3 className="text-2xl font-semibold mb-3">
              Enhanced Collaboration
            </h3>

            <p className="w-[80%] md:w-2/3 lg:w-full mx-auto text-base text-slate-300">
              Foster collaboration and teamwork:<br />share documents, coordinate schedules, and communicate effectively with your team members.
            </p>
          </div>
        </span>
        
        <span className="row-start-2 h-[15rem] lg:h-[18rem] min-[1183px]:h-[15rem] w-full rounded-lg bg-gradient-to-b from-blue-300 to-blue-700 p-1 hover:p-0 transition-all">
          <div className="h-full p-8 bg-gray-700 text-white rounded-md text-center lg:text-left">
            <h3 className="text-2xl font-semibold mb-3">
              Time Management
            </h3>

            <p className="w-[80%] md:w-2/3 lg:w-full mx-auto text-base text-slate-300">
              Take control of your time and make the most of every moment with Toolhance&apos;s time-management tools.<br />
              Empower to prioritaize, schedule and manage effectively.
            </p>
          </div>
        </span>
        
        <span className="col-span-2 h-[15rem] lg:h-[18rem] min-[1183px]:h-[15rem] w-full rounded-lg bg-gradient-to-b from-blue-300 to-blue-700 p-1 hover:p-0 transition-all">
          <div className="h-full flex items-center gap-4 p-8 bg-[url(../public/organize.jpg)] bg-cover bg-center text-white rounded-lg">
            <div className="bg-black/70 p-4 rounded-lg w-fit h-fit mx-auto md:mx-0">
              <h3 className="text-2xl font-semibold mb-3">
                Better Organization
              </h3>

              <p className="text-base text-slate-300">
                Keep your life organized and<br />on track with Toolhance&apos;s<br />organizational tools.
              </p>
            </div>
          </div>
        </span>
      </div>
    </section>
  )
}
