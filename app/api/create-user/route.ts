import { createUser } from "@/database/db";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
	const {name, password} = await req.json();
	const result = await createUser({name: name, password: password});
	return new Response(result)
}