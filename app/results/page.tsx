"use client"
import { useSearchParams, useRouter } from 'next/navigation';
import { useState, useEffect} from "react";
import Image from "next/image";
import Navbar from "@/components/Navbar";

export default function Results() { 

	const rouser = useRouter();
	const [responseData, setResponseData] = useState<any[]>([]);
	const [tag, setTag] = useState<string>('');
	const [tags, setTags] = useState<string[]>(useSearchParams().get('tags')?.split(', ') || []);
	const [owners, setOwners] = useState<string[]>(useSearchParams().get('owners')?.split(', ') || []);
	const [owner, setOwner] = useState<string>('');
	const query = useSearchParams().get('search') || '';
	useEffect(() => { getResponse()}, [query, owners, tags]);

	const getResponse = async () => {
		try {
			const response = await fetch(`/api/search-query?query=${query}&user=${owners.join(', ')}&tags=${tags.join(', ')}`, {
				method: "GET"
			});
			const data = await response.json();
			setResponseData(data.result);
		} catch(err) {
			console.log("Error fetching search results:", err)
		}
	};

	const handleRedirect = (owner: string, title: string) => {
		rouser.push(`/post?user=${owner}&post=${title}`)
	}

	const handleDeleteTag = (tagToDelete: string) => {
		setTags((prevTags) => {
			const updatedTags = prevTags.filter((tag) => tag !== tagToDelete);
			return updatedTags;
		});
	};
	const handleDeleteOwner = (ownerToDelete: string) => {
		setOwners((prevOwners) => {
			const updatedOwners = prevOwners.filter((owner) => owner !== ownerToDelete);
			return updatedOwners;
		});
	};
	
	return (
		<>
			<Navbar filters={{tags: tags, owners: owners}}/>
			<main className="overflow-y-scroll grid grid-cols-[65%,35%]">
				<div>
					{ typeof responseData === "string" ?
						<div className="items-center w-full h-full flex justify-center">
							<h3 className="text-neutral-300">{responseData}</h3>
						</div>
					: 
						responseData.map(item => (
							<div onClick={() => handleRedirect(item.owner, item.title)} key={item.id} className="w-full grid grid-cols-3 items-center py-8 px-16 bg-gradient-to-r from-transparent to-transparent hover:from-[#281E3D]">
								<div>
									<div className="flex gap-4 mb-4">
										<div className="rounded-full bg-slate-400 w-10 h-10 flex items-center justify-center text-black">{item.owner[0]}</div>
										<h3>{item.title}</h3>
									</div>
									<p>{item.content.slice(0, 30)}...</p>
								</div>
								<p>{item.date.split('T')[0].replace(/-/g, '.')}</p>
								<div className="flex gap-2">
									<div className="relative h-6 w-6">
										<Image src="assets/like.svg" alt="like" fill />
									</div>
									<p>{item.likes}</p>
								</div>
							</div>
						))
					}
				</div>
				<div className="flex flex-col gap-4 px-16 py-8">
					<div className="flex justify-between">
						<input 
							placeholder="by tags"
							type="text"
							value={tag}
							onChange={(e) => setTag(e.target.value)}
						/>
						<button 
							className="empty-button"
							onClick={() => {if (tag === '') return; setTags([...tags, tag]); setTag('')}}
						>Add tag</button>
					</div>
					<div className="flex gap-4 flex-wrap w-full">
						{tags.map((tag, index) => (
							<div key={index} className="w-fit h-fit flex items-center gap-2 py-2 px-2 rounded-md text-black bg-violet-200 hover:bg-violet-300 transition-all duration-300">
								{tag}
								<button className="relative w-4 h-4" onClick={() => handleDeleteTag(tag)}><Image src="/assets/delete.svg" alt="delete" fill/></button>
							</div>
						))}
					</div>
					<div className="flex justify-between">
						<input 
							placeholder="by owners"
							type="text"
							value={owner}
							onChange={(e) => setOwner(e.target.value)}
						/>
						<button 
							className="empty-button"
							onClick={() => {if (owner === '') return; setOwners([...owners, owner]); setOwner('')}}
						>Add owner</button>
					</div>
					<div className="flex gap-4 flex-wrap w-full">
						{owners.map((owner, index) => (
							<div key={index} className="w-fit h-fit flex items-center gap-2 py-2 px-2 rounded-md text-black bg-violet-200 hover:bg-violet-300 transition-all duration-300">
								{owner}
								<button className="relative w-4 h-4" onClick={() => handleDeleteOwner(owner)}><Image src="/assets/delete.svg" alt="delete" fill/></button>
							</div>
						))}
					</div>
				</div>
			</main>
		</>
	)
}