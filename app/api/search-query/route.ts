import { NextRequest } from "next/server"
import { searchQuery } from "@/database/db"

export async function GET(req: NextRequest) {
	const { searchParams } = new URL(req.url);
	const query = searchParams.get('query') || "";
	const owner = searchParams.get('user') || "";
	const tags = searchParams.get('tags') || "";
	const response = await searchQuery({query, owner, tags});
	const result = () => {
		if (Array.isArray(response) && response.length === 0)
		return "Nothing found";
		else return response;
	}
	return new Response(JSON.stringify({result: result()}))
}