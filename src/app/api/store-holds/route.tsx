import { NextResponse } from "next/server";
import OpenAI from "openai";
import { Pinecone } from "@pinecone-database/pinecone";

const pinecone = new Pinecone({ apiKey: process.env.PINECONE_API_KEY || "" });
const index = pinecone.Index("wall-search");
const openai = new OpenAI({
	apiKey:process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
	try {
	  const { holds, wallId, userId } = await req.json();
  
	  if (!holds || holds.length === 0) {
		throw new Error("No holds provided.");
	  }
  
	  const descriptions = holds.map(
		// biome-ignore lint/suspicious/noExplicitAny: <explanation>
		(hold: any) =>
		  `Hold at (${hold.x}, ${hold.y}) of type ${hold.type || "hold_hand"}`
	  );
  
	  const embeddingRes = await openai.embeddings.create({
		model: "text-embedding-ada-002",
		input: descriptions,
	  });
  
	  const vectors = embeddingRes.data.map((entry, i) => ({
		// Use deterministic IDs to allow upserting (overwrite)
		id: `${wallId}-${holds[i].x.toFixed(4)}-${holds[i].y.toFixed(4)}`,
		values: entry.embedding,
		metadata: {
		  wallId,
		  userId,
		  x: holds[i].x,
		  y: holds[i].y,
		  type: holds[i].type,
		},
	  }));
  
	  await index.upsert(vectors);
  
	  return NextResponse.json({ message: "Holds stored successfully ✅" });
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	} catch (err: any) {
	  console.error("Storing holds failed:", err);
	  return NextResponse.json({ error: err.message }, { status: 500 });
	}
  }