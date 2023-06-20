import Image from "next/image"
import CardHero from "../components/CardHero"

export default async function Home() {

  return (
    <>
      <div className="relative w-full h-full overflow-hidden">
        <div className="w-screen h-screen absolute">
          <Image src="/assets/hero.png" alt="coding boilerplates image" fill />
        </div>
        <main className="relative overflow-hidden flex flex-col gap-[5vh] px-8 z-10 w-full h-full bg-gradient-to-t from-black via-violet to-transparent">
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
