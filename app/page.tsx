import Image from "next/image"
import CardHero from "../components/CardHero"
import Navbar from "@/components/Navbar"

export default async function Home() {

  return (
    <>
      <div className="relative w-screen h-screen">
        <Image src="/assets/hero.png" alt="coding boilerplates image" fill />
        <main className="relative z-10 w-screen h-screen flex flex-col justify-between bg-gradient-to-t from-black via-violet to-transparent">
          <Navbar />
          <h1 className="
            bg-gradient-to-br from-pink-300 to-pink-50 bg-clip-text text-transparent
            w-1/2 text-center mx-auto mt-[auto] mb-[5vh]
          ">
            Store your reusable stuff and don't write it twice
          </h1>
          <div className="flex gap-12 overflow-hidden mb-[10vh] mx-8">
            <CardHero />
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
