import Image from "next/image";
import SearchBar from "./SearchBar";

export default function Navbar () {

  return (
	<nav className="w-screen h-20 grid grid-cols-[1fr,50vw,1fr] gap-8 items-center px-8 backdrop-blur-xl backdrop-brightness-75">
		<div className="w-10 h-10 relative">
			<Image src="/assets/logo.png" alt="logo" fill/>
		</div>
		<SearchBar />
		<div className="flex items-center gap-4 ml-auto">
			<p>Posts</p>
			<p>Create a snippet</p>
			<div className="rounded-full bg-slate-400 w-10 h-10 flex items-center justify-center">A</div>
		</div>
	</nav>
  )
}