import { NextResponse } from "next/server";
import OpenAI from "openai";
import { Pinecone } from "@pinecone-database/pinecone";
import db from "@/lib/db";
import { users } from "@/lib/db/schema/user";
import { eq } from "drizzle-orm";

// Initialize OpenAI and Pinecone clients
const openai = new OpenAI({

	apiKey:process.env.OPENAI_API_KEY,
});
const pinecone = new Pinecone({ apiKey: process.env.PINECONE_API_KEY || "" });


export async function POST(req: Request) {
  try {
    const { userId, wallId, userParams } = await req.json();
    if (!userId || !wallId) throw new Error("Missing userId or wallId");

    // Get user parameters from DB if not passed
    let params = userParams;
    if (!params) {
      const [user] = await db.select().from(users).where(eq(users.id, userId));
      if (!user) throw new Error("User not found.");
      params = {
        age: user.age,
        height: user.height,
        apeIndex: user.apeIndex,
        legRatio: user.legRatio,
      };
    }

    // Get vector embedding for user parameters
    const embeddingRes = await openai.embeddings.create({
      model: "text-embedding-ada-002",
      input: [JSON.stringify(params)],
    });

    const index = pinecone.Index(process.env.PINECONE_INDEX_NAME || "wall-search");

    // Query Pinecone (without filter!)
    const queryRes = await index.query({
      topK: 50,
      vector: embeddingRes.data[0].embedding,
      includeMetadata: true,
    });

    // Manual filtering by wallId
    const matches = queryRes.matches?.filter(
      // biome-ignore lint/suspicious/noExplicitAny: <explanation>
      (m: any) => m.metadata?.wallId === wallId
    ) || [];

    console.log("🔍 Retrieved", queryRes.matches?.length, "matches total");
    console.log("🎯 Matches for wallId", wallId, "->", matches.length);

    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    const holdData = matches.map((m: any) => ({
      x: Number(m.metadata?.x) || 0,
      y: Number(m.metadata?.y) || 0,
      type: m.metadata?.type || "unknown",
    }));

    // Sort holds from bottom to top
    holdData.sort((a, b) => a.y - b.y);

    if (holdData.length === 0) {
      return NextResponse.json({
        route: [],
        instructions:
          "❌ No holds found for this wall. Make sure hold detection and storage ran correctly.",
      });
    }

    // Prompt for OpenAI to generate climbing instructions
    const prompt = `You are an expert bouldering coach. Based on the climber's data and these holds, generate beginner-friendly climbing instructions.

Climber:
- Age: ${params.age}
- Height: ${params.height}
- Ape Index: ${params.apeIndex}
- Leg-to-Torso Ratio: ${params.legRatio}

Holds:
${JSON.stringify(holdData, null, 2)}

Respond in this format:
Step 1: Right hand to Hold (x: 230, y: 400)
Step 2: Left foot to Hold (x: 150, y: 200)
`;

    const chatRes = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [{ role: "system", content: prompt }],
    });

    const instructions = chatRes.choices[0]?.message?.content || "No instructions generated.";

    return NextResponse.json({
      route: holdData,
      instructions,
    });
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  } catch (err: any) {
    console.error("⚠️ Path generation error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

