"use client"
import Image from "next/image"
import CardHero from "../components/CardHero"
import Navbar from "@/components/Navbar"
import { useState, useEffect } from "react"

export default function Home() {
  const [randomPosts, setRandomPosts] = useState([]);
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
            {randomPosts.map(post => 
              <CardHero post={post}/>
            )}
          </div>
        </main>
      </div>
    </>
  )
}
