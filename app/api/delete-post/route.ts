import { deletePost } from "@/database/db";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
	const {title, owner, user: {name, password}} = await req.json();
	const result = await deletePost({title, owner, user: {name, password}});
	return new Response(JSON.stringify(result));
}