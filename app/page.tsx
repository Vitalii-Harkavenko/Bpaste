import Image from "next/image"
import CardHero from "../components/CardHero"

export default async function Home() {

  return (
    <>
      <div className="relative w-screen h-screen">
        <Image src="/assets/hero.png" alt="coding boilerplates image" fill />
        <main className="relative overflow-hidden flex flex-col gap-[5vh] px-8 z-10 w-screen h-screen bg-gradient-to-t from-black via-violet to-transparent">
          <h1 className="
            bg-gradient-to-br from-pink-300 to-pink-50 bg-clip-text text-transparent
            w-1/2 text-center mx-auto mt-[auto]
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
