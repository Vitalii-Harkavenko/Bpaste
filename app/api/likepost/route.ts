import { likePost } from "@/database/db";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
	const {user, post: { owner, title }} = await req.json();
	const result = await likePost({user: user, post: { owner: owner, title: title }});
	return new Response(JSON.stringify(result))
}