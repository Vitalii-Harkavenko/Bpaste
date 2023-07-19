import { NextRequest } from "next/server"
import { findPost } from "@/database/db"

export async function GET(req: NextRequest) {
	const { searchParams } = new URL(req.url);
	const post = searchParams.get('post') || "";
	const user = searchParams.get('user') || "";
	const response = await findPost({post, user});
	return new Response(JSON.stringify(response))
}