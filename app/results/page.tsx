"use client"
import { useSearchParams } from 'next/navigation';

export default async function Results() { 
	const query = useSearchParams().get('search') || '';

	const getResponse = async (query: string) => {
		try {
			const response = await fetch(`/api/search-query?query=${query}`, {
				method: "GET"
			});
			const data = await response.json();
			return data.result;
		} catch(err) {
			console.log("Error fetching search results:", err)
		}
	}

	return <p>{getResponse(query)}. Also, your bebra u were looking for is {query} </p>
}