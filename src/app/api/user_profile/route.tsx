import db from "@/lib/db";
import { users } from "@/lib/db/schema/user";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
	try {
		const { name, email, password, sex, apeIndex, height, legRatio, age } =
			await req.json();

		const newUser = await db
			.insert(users)
			.values({
				name,
				email,
				password,
				sex,
				age: Number.parseInt(age),
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

export async function PATCH(req: Request) {
	try {
		const { id, field, value } = await req.json();

		if (!id || !field || value === undefined)
			return NextResponse.json(
				{ error: "Missing required data" },
				{ status: 400 },
			);

		await db
			.update(users)
			.set({
				[field]:
					field === "height" || field === "apeIndex" || field === "legRatio"
						? Number(value)
						: value,
			})
			.where(eq(users.id, id));

		return NextResponse.json({ success: true }, { status: 200 });
	} catch (error) {
		console.error("PATCH Error:", error);
		return NextResponse.json(
			{ error: "Failed to update profile" },
			{ status: 500 },
		);
	}
}

export async function DELETE(req: Request) {
	try {
		const { id } = await req.json();
		if (!id)
			return NextResponse.json({ error: "Missing user ID" }, { status: 400 });

		await db.delete(users).where(eq(users.id, id));
		return NextResponse.json({ success: true }, { status: 200 });
	} catch (error) {
		console.error("DELETE Error:", error);
		return NextResponse.json(
			{ error: "Failed to delete user" },
			{ status: 500 },
		);
	}
}
