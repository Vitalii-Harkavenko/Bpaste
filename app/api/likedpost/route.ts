import { likedPost } from "@/database/db";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
	const { searchParams } = new URL(req.url);
	const owner = searchParams.get('owner') || "";
	const title = searchParams.get('title') || "";
	const user = searchParams.get('user') || "";
	const result = await likedPost({user: user, owner: owner, title: title });
	return new Response(JSON.stringify(result))
}