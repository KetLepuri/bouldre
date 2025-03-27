import db from "@/lib/db";
import { boulderWall } from "@/lib/db/schema/boulder_wall";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const data = await req.json();
    if (!data.id || !data.user_id) throw new Error("Wall ID and User ID required.");

    const payload = {
      ...data,
      created_at: new Date(),
    };

    await db.insert(boulderWall).values(payload);

    return NextResponse.json({ message: "Wall details saved!" }, { status: 201 });
  } catch (error) {
    console.error("Error saving wall details:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}