import { NextRequest } from "next/server"

export async function GET(req: NextRequest) {
	const { searchParams } = new URL(req.url)
	const query = searchParams.get('query')
	return new Response(JSON.stringify({ result: query }))

}