import  db  from "@/lib/db";
import { users } from "@/lib/db/schema/users";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

// Get all users
export async function GET() {
	try {
		const result = await db.select().from(users);
		return NextResponse.json(result, { status: 200 });
	} catch (error) {
		console.error("GET Error:", error);
		return NextResponse.json(
			{ error: "Internal Server Error" },
			{ status: 500 },
		);
	}
}

// Create a new user
export async function POST(req: Request) {
	try {
		const { name, email, password } = await req.json();

		const newUser = await db
			.insert(users)
			.values({
				name,
				email,
				password,
			})
			.returning();

		return NextResponse.json(newUser, { status: 201 });
	} catch (error) {
		console.error("POST Error:", error);
		return NextResponse.json(
			{ error: "Internal Server Error" },
			{ status: 500 },
		);
	}
}

// Update an existing user
export async function PUT(req: Request) {
	try {
		const { id, name, email } = await req.json();

		const updatedUser = await db
			.update(users)
			.set({ name, email })
			.where(eq(users.id, id)) // ✅ FIXED: Use `eq(users.id, id)`
			.returning();

		return NextResponse.json(updatedUser, { status: 200 });
	} catch (error) {
		console.error("PUT Error:", error);
		return NextResponse.json(
			{ error: "Internal Server Error" },
			{ status: 500 },
		);
	}
}

// Delete a user
export async function DELETE(req: Request) {
	try {
		const { id } = await req.json();

		await db.delete(users).where(eq(users.id, id)); // ✅ FIXED: Use `eq(users.id, id)`

		return NextResponse.json({ message: "User deleted" }, { status: 200 });
	} catch (error) {
		console.error("DELETE Error:", error);
		return NextResponse.json(
			{ error: "Internal Server Error" },
			{ status: 500 },
		);
	}
}
