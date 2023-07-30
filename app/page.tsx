import Image from "next/image"
import CardHero from "../components/CardHero"
import Navbar from "@/components/Navbar"

export default async function Home() {

  return (
    <>
      <div className="relative w-full h-full overflow-hidden">
        <Image src="/assets/hero.png" alt="coding boilerplates image" className="absolute" fill />
        <main className="relative overflow-hidden flex flex-col z-10 bg-gradient-to-t from-black via-[rgba(16,15,66,0.5)] to-transparent">
          <Navbar />
          <h1 className="
            bg-gradient-to-br from-fuchsia-200 to-fuchsia-50 bg-clip-text text-transparent
            w-1/2 text-center mx-auto my-auto
          ">
            Store your reusable stuff and don't write it twice
          </h1>
          <div className="flex gap-12 mb-[10vh]">
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
