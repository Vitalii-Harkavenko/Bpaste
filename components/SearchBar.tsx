"use client"
import { useState } from "react";
import { useRouter } from 'next/navigation'

export default function SearchBar() {

	const [searchValue, setSearchValue] = useState<string>();
	const router = useRouter();
	
	const handleSubmit = () => {
		router.push(`/results?search=${searchValue}`)
	};

	return (
		<div className="w-full h-full bg-[#1D2C2F] text-text-color rounded-md flex items-center justify-between px-6">
			<input 
				className="bg-transparent outline-none"
				placeholder="Search for anything"
				type="text"
				value={searchValue}
				onChange={(e) => setSearchValue(e.target.value)}
				onKeyDown={(e) => { if (e.key === "Enter") handleSubmit() }}
			/>
			<button>BEBERA</button>
		</div>
	)
}