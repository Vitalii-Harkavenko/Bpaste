import Image from "next/image"
import CardHero from "./CardHero"
export default async function Home() {

  return (
    <>
      <div className="relative w-screen h-screen">
        <Image src="/assets/hero.png" alt="coding boilerplates image" fill />
        <main className="relative z-10 w-screen h-screen flex flex-col justify-between bg-gradient-to-t from-black via-violet to-transparent">
          <h1 className="
            bg-gradient-to-br from-pink-200 to-pink-50 bg-clip-text text-transparent
            w-2/3 text-center mx-auto pt-[30vh]
          ">
            Store your reusable stuff and don't write it twice
          </h1>
          <div className="flex gap-12 overflow-hidden mb-[10vh]">
            <CardHero />
            <CardHero />
            <CardHero />
            <CardHero />
          </div>
        </main>
      </div>
    </>
  )
}
