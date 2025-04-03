import { NextResponse } from "next/server";
import db from "@/lib/db";
import { boulderWall } from "@/lib/db/schema/boulder_wall";
import { z } from "zod";

// ✅ 1. Define Zod Schema
const WallSchema = z.object({
	id: z.string(),
	user_id: z.string(),
	image_url: z.string().url(),
	name: z.string().optional(),
	width: z.number(),
	height: z.number(),
	holdHandNumber: z.number().optional(),
	holdFootNumber: z.number().optional(),
	holdType: z.string().optional(),
	wallInclination: z.string().optional(),
});
export async function POST(req: Request) {
	try {
		const raw = await req.json();

		// ✅ 2. Parse + validate with Zod
		const parsed = WallSchema.parse({
			...raw,
			// biome-ignore lint/style/useNumberNamespace: <explanation>
			width: parseFloat(raw.width),
			// biome-ignore lint/style/useNumberNamespace: <explanation>
			height: parseFloat(raw.height),
			// biome-ignore lint/style/useNumberNamespace: <explanation>
			holdHandNumber: parseInt(raw.holdHandNumber),
			// biome-ignore lint/style/useNumberNamespace: <explanation>
			holdFootNumber: parseInt(raw.holdFootNumber),
		});

		const payload = {
			...parsed,
			created_at: new Date(),
			name: parsed.name || "Auto-detected wall",
			holdType: parsed.holdType || "auto",
			wallInclination: parsed.wallInclination || "unknown",
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
