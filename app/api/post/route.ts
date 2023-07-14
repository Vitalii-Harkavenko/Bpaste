import { NextRequest } from "next/server"
import { findPost } from "@/database/db"

export async function GET(req: NextRequest) {
	const { searchParams } = new URL(req.url);
	const post = searchParams.get('post') || "";
	const user = searchParams.get('user') || "";
	const response = await findPost({post, user});
	const result = () => {
		return response.length === 0
		? "Nothing found"
		: JSON.stringify(response);
	};
	console.log(result())
	return new Response(result())
}