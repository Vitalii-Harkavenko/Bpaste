import { createPost } from "@/database/db";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
	const {title, content, tags, user: {name, password}} = await req.json();
	const result = await createPost({title, content, tags, user: {name, password}});
	return new Response(JSON.stringify(result));
}