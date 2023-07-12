import { createPost } from "@/database/db";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
	const {title, content, tagArray, userCredentials: {name, password}} = await req.json();
	const result = await createPost({title, content, tagArray, userCredentials: {name, password}});
	return new Response(JSON.stringify(result));
}