import Image from "next/image";
import SearchBar from "./SearchBar";

export default function Navbar () {

  return (
	<nav className="sticky top-0 left-0 w-screen h-20 py-5 px-8 backdrop-blur-xl backdrop-opacity-50 bg-main grid grid-cols-[1fr,50vw,1fr] gap-8">
		<div className="w-10 h-10 relative">
			<Image src="/assets/logo.png" alt="logo" fill/>
		</div>
		<SearchBar />
		<ul className="flex items-center gap-4 ml-auto">
			<li><p>Posts</p></li>
			<li><p>Create a snippet</p></li>
			<li><div className="rounded-full bg-slate-400 w-10 h-10 flex items-center justify-center">A</div></li>
		</ul>
	</nav>
  )
}