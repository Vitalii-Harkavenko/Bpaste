"use client"
import Image from "next/image";
import { useState } from "react";
import { useRouter } from 'next/navigation'

export default function SearchBar({filters}: {filters?: {tags: string[], owners: string[]}}) {

	const [searchValue, setSearchValue] = useState<string>();
	const router = useRouter();
	
	const handleSubmit = () => {
		if (searchValue === "") return;
		router.push(`/results?search=${searchValue}${filters?.owners[0] ? "&owners=" + filters.owners : ''}${filters?.tags[0] ? "&tags=" + filters.tags : ''}`)
	};

	return (
		<div className="w-full h-full bg-[#1d1e2a] text-text-color rounded-md px-6 items-center flex">
			<input 
				className="bg-transparent outline-none"
				placeholder="Search for anything"
				type="text"
				value={searchValue}
				onChange={(e) => setSearchValue(e.target.value)}
				onKeyDown={(e) => { if (e.key === "Enter") handleSubmit() }}
			/>
		</div>
	)
}