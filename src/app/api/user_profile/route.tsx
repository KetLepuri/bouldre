import db from "@/lib/db";
import { users } from "@/lib/db/schema/user";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
	try {
		const { name, email, password, sex, apeIndex, height, legRatio } =
			await req.json();

		const newUser = await db
			.insert(users)
			.values({
				name,
				// age, // Removed as it is not declared or initialized
				email,
				password,
				sex,
				apeIndex: Number.parseFloat(apeIndex),
				height: Number.parseFloat(height),
				legRatio: Number.parseFloat(legRatio),
			})
			.returning({ id: users.id });

		return NextResponse.json({ id: newUser[0].id }, { status: 201 });
	} catch (error) {
		console.error("POST Error:", error);
		return NextResponse.json(
			{ error: "Internal Server Error" },
			{ status: 500 },
		);
	}
}

export async function GET(req: Request) {
	try {
		const url = new URL(req.url);
		const userId = url.searchParams.get("id");

		if (!userId)
			return NextResponse.json({ error: "Missing user ID" }, { status: 400 });

		const result = await db.select().from(users).where(eq(users.id, userId));
		return NextResponse.json(result[0] || {}, { status: 200 });
	} catch (error) {
		console.error("GET Error:", error);
		return NextResponse.json(
			{ error: "Internal Server Error" },
			{ status: 500 },
		);
	}
}
