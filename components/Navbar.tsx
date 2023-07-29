"use client"
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import SearchBar from "./SearchBar";
import { checkUser, checkAndReturnUser } from "@/app/utils";

export default function Navbar ({filters}: {filters?: {tags: string[], owners: string[]}}) {

	const [loggedIn, setLoggedIn] = useState<boolean>(false);

	const getFirstLetterOfName = () => {
		const storedUser = checkAndReturnUser();
		if (!storedUser) {
			setLoggedIn(false);
			console.error('Invalid user object');
			return;
		} else {
			const { name } = storedUser;
			return name[0];
		}
	};

	useEffect(() => {
		if (checkUser()) setLoggedIn(true);
	}, []);

  	return (
		<nav className="sticky top-0 left-0 w-screen h-20 py-5 px-8 backdrop-blur-xl backdrop-brightness-[.85] grid grid-cols-[1fr,50vw,1fr] gap-8 z-20">
			<div className="w-10 h-10 relative">
				<Image src="/assets/logo.png" alt="logo" fill/>
			</div>
			<SearchBar filters={filters}/>
			<ul className="flex items-center gap-4 ml-auto">
				{loggedIn ?
  					<>
						<li><Link href='/posts'><p>Posts</p></Link></li>
						<li><Link href='/new-post'><p>New post</p></Link></li>
						<li><div className="rounded-full bg-slate-400 w-10 h-10 flex items-center justify-center">{getFirstLetterOfName()}</div></li>
					</>
				:
					<>
					    <li><Link href='/auth/login' className="empty-button">Log in</Link></li>
    					<li><Link href='/auth/signup' className="filled-button">Sign up</Link></li>
					</>
				}
			</ul>
		</nav>
  	)
}