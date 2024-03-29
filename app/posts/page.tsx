"use client"
import { useSearchParams, useRouter } from 'next/navigation';
import { useState, useEffect } from "react";
import { returnUser } from "../utils";

export default function Results() { 

	const rouser = useRouter();
	const [responseData, setResponseData] = useState<any[]>([]);
	const tags = useSearchParams().get('tags') || '';
	useEffect(() => { getResponse()}, [tags]);
	
	const getResponse = async () => {
		try {
			const response = await fetch(`/api/search-query?user=${returnUser().name}&tags=${tags}`, {
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

	return (
		<main className="overflow-y-scroll">
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
						<p>{item.likes}</p>
					</div>
				))
			}
		</main>
	)
}