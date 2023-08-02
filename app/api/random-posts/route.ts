import { getRandomPosts } from "@/database/db"

export async function GET() {
	const response = await getRandomPosts();
	return new Response(JSON.stringify(response))
}