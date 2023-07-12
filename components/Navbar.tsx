"use client"
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import SearchBar from "./SearchBar";
import { checkUser, checkAndReturnUser } from "@/app/utils";
import { useRouter } from 'next/navigation';

export default function Navbar () {

	const router = useRouter();
	const [loggedIn] = useState<boolean>(checkUser() || false);

	const getFirstLetterOfName = async () =>  {
		const storedUser = await checkAndReturnUser();
		if (!storedUser) {
			localStorage.removeItem('user');
			router.push('/auth/signup');
			throw new Error('Invalid user object');
		}
		const { name } = storedUser;
		return name[0];
	}

  	return (
		<nav className="sticky top-0 left-0 w-screen h-20 py-5 px-8 backdrop-blur-xl backdrop-opacity-50 bg-main grid grid-cols-[1fr,50vw,1fr] gap-8">
			<div className="w-10 h-10 relative">
				<Image src="/assets/logo.png" alt="logo" fill/>
			</div>
			<SearchBar />
			<ul className="flex items-center gap-4 ml-auto">
				{ loggedIn === false &&
					<>
						<li><Link href='/auth/login' className="empty-button">Log in</Link></li>
						<li><Link href='/auth/signup' className="filled-button">Sign in</Link></li>
					</>
				}
				{ loggedIn === true &&
					<>
						<li><p>Posts</p></li>
						<li><Link href='/new-post'><p>New post</p></Link></li>
						<li><div className="rounded-full bg-slate-400 w-10 h-10 flex items-center justify-center">{getFirstLetterOfName()}</div></li>
					</>
				}
			</ul>
		</nav>
  	)
}