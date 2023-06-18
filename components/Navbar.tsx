import Image from "next/image";

export default function Navbar () {

  return (
	<nav className="w-full h-full grid grid-cols-[1fr,50vw,1fr] gap-8">
		<div className="w-10 h-10 relative">
			<Image src="/assets/logo.png" alt="logo" fill/>
		</div>
		<div className="w-full h-full bg-[#1D2C2F] text-text-color rounded-md flex items-center justify-between px-6">
			<input className="bg-transparent outline-none" placeholder="Search for anything"></input>
			<button>BEBERA</button>
		</div>
		<ul className="flex items-center gap-4 ml-auto">
			<li><p>Posts</p></li>
			<li><p>Create a snippet</p></li>
			<li><div className="rounded-full bg-slate-400 w-10 h-10 flex items-center justify-center">A</div></li>
		</ul>
	</nav>
  )
}