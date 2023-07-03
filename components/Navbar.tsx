"use client"
import { useState } from "react";
import Image from "next/image";
import SearchBar from "./SearchBar";
import Link from "next/link";

export default function Navbar () {
	const [loggedIn, setLoggedIn] = useState<boolean>(false);

  	return (
		<nav className="sticky top-0 left-0 w-screen h-20 py-5 px-8 backdrop-blur-xl backdrop-opacity-50 bg-main grid grid-cols-[1fr,50vw,1fr] gap-8">
			<div className="w-10 h-10 relative">
				<Image src="/assets/logo.png" alt="logo" fill/>
			</div>
			<SearchBar />
			<ul className="flex items-center gap-4 ml-auto">
				{ loggedIn === false &&
					<>
						<li><div className="main-button text-white bg-transparent hover:border-brand hover:text-brand">Log in</div></li>
						<li><div className="main-button text-black bg-white hover:bg-brand hover:border-brand hover:text-white">Sign in</div></li>
					</>
				}
				{ loggedIn === true &&
					<>
						<li><p>Posts</p></li>
						<li><Link href='/new-post'><p>New post</p></Link></li>
						<li><div className="rounded-full bg-slate-400 w-10 h-10 flex items-center justify-center">A</div></li>
					</>
				}
			</ul>
		</nav>
  )
}