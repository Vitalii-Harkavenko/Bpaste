"use client"
import { useSearchParams } from 'next/navigation';
import { useState, useEffect} from "react";

export default function Results() { 
	const [responseData, setResponseData] = useState<any[]>([]);
	const query = useSearchParams().get('search') || '';
	useEffect(() => { getResponse()}, [query]);

	const getResponse = async () => {
		try {
			const response = await fetch(`/api/search-query?query=${query}`, {
				method: "GET"
			});
			const data = await response.json();
			let parsedData;
			if (data.result == undefined) {
				parsedData = data
			} else { parsedData = JSON.parse(data.result) };
      		setResponseData(parsedData);
		} catch(err) {
			console.log("Error fetching search results:", err)
		}
	};

	return (
    <main>
      { typeof responseData === "string"
	  ? <div>
			<p>{responseData}</p>
		</div>
	  : responseData.map(item => (
		<div key={item.id} className="w-full p-8 bg-gradient-to-r from-transparent to-transparent hover:from-[#281E3D]">
			<p>{item.username}</p>
		</div>
	  ))}
    </main>
	)
}