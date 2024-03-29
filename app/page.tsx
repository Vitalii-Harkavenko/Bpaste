"use client"
import Image from "next/image"
import CardHero from "../components/CardHero"
import Navbar from "@/components/Navbar"
import { useState, useEffect } from "react"
import Link from "next/link"

export default function Home() {
  const [randomPosts, setRandomPosts] = useState<any[]>([]);
  useEffect(() => {getResponse()}, []);

	const getResponse = async () => {
    try {
      const response = await fetch(`api/random-posts`);
			const data = await response.json();
      setRandomPosts(data)
		} catch(err) {
			console.log("Error fetching random posts:", err)
		}
	};

  return (
    <>
      <div className="relative w-full h-full overflow-hidden">
        <div className="absolute -left-[17%] h-full aspect-[16/9]">
          <Image src="/assets/hero.png" alt="coding boilerplates image" className="absolute" fill />
        </div>
        <div className="absolute w-3/4 h-full top-0 right-0 bg-gradient-to-l from-[#042A3F] via-[#111622] to-transparent "></div>
        <main className="relative overflow-hidden flex flex-col z-10 bg-gradient-to-t from-black to-transparent">
          <Navbar />
          <div className="absolute w-1/2 left-16 top-[15%]">
            <h1 className="bg-gradient-to-br from-fuchsia-200 to-fuchsia-100 bg-clip-text text-transparent">
              You don't need to write the same thing twice
            </h1>
            <h2 className="brightness-9 text-fuchsia-200 w-1/2">
              Because you can store the boilerplate here
            </h2>
          </div>
          <div className="relative w-full h-full">
            {
              randomPosts[0] && 
              <>
                <Link href={`/post?user=${randomPosts[0].owner}&post=${randomPosts[0].title}`}>
                  <div className="absolute left-[70%] top-[15%] z-30">
                    <CardHero post={randomPosts[0]}/>
                  </div>
                </Link>
                <Link href={`/post?user=${randomPosts[1].owner}&post=${randomPosts[1].title}`}>
                  <div className="absolute left-[40%] top-[35%] z-20">
                    <CardHero post={randomPosts[1]}/>
                  </div>
                </Link>
                <Link href={`/post?user=${randomPosts[2].owner}&post=${randomPosts[2].title}`}>
                  <div className="absolute left-[10%] top-[55%] z-10">
                    <CardHero post={randomPosts[2]}/>
                  </div>
                </Link>
              </>
            }
          </div>
        </main>
      </div>
    </>
  )
}
