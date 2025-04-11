import { NextResponse } from "next/server";
import db from "@/lib/db";
import { boulderWall } from "@/lib/db/schema/boulder_wall";
import { z } from "zod";

// ✅ Define schema
const WallSchema = z.object({
	id: z.string(),
	user_id: z.string(),
	image_url: z.string().url(),
	name: z.string().optional(),
	imageWidth: z.number(),
	imageHeight: z.number(),
	holdType: z.string().optional(),
});

export async function POST(req: Request) {
	try {
		const raw = await req.json();

		// ✅ Sanitize & parse values safely
		const parsed = WallSchema.parse({
			id: raw.id,
			user_id: raw.user_id ?? "", // force string fallback
			image_url: raw.image_url,
			name: raw.name,
			imageWidth: Number(raw.imageWidth),
			imageHeight: Number(raw.imageHeight),
			holdType: raw.holdType,
		});

		const payload = {
			...parsed,
			created_at: new Date(),
			name: parsed.name || "Auto-detected wall",
			holdType: parsed.holdType || "auto",
		};

		await db.insert(boulderWall).values(payload);

		return NextResponse.json({ message: "Wall details saved!" }, { status: 201 });

	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	} catch (error: any) {
		console.error("Zod validation or DB insert error:", error);
		return NextResponse.json(
			{ error: error.message || "Internal Server Error" },
			{ status: 500 },
		);
	}
}
