"use client"
import Image from "next/image";
import { useState } from "react";
import { useRouter } from 'next/navigation'

export default function SearchBar() {

	const [searchValue, setSearchValue] = useState<string>();
	const router = useRouter();
	
	const handleSubmit = () => {
		router.push(`/results?search=${searchValue}`)
	};

	return (
		<div className="w-full h-full bg-[#1D2C2F] text-text-color rounded-md grid grid-cols-[1fr,2rem] items-center gap-12 px-6">
			<input 
				className="bg-transparent outline-none"
				placeholder="Search for anything"
				type="text"
				value={searchValue}
				onChange={(e) => setSearchValue(e.target.value)}
				onKeyDown={(e) => { if (e.key === "Enter") handleSubmit() }}
			/>
			<button>
				<div className="relative w-8 h-8">
					<Image src="/assets/options.svg" fill alt="optionts"></Image>
				</div>
			</button>
		</div>
	)
}