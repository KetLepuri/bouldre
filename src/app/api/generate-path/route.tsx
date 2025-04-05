import { NextResponse } from "next/server";
import OpenAI from "openai";
import { Pinecone } from "@pinecone-database/pinecone";
import db from "@/lib/db";
import { users } from "@/lib/db/schema/user";
import { eq } from "drizzle-orm";

const openai = new OpenAI({
	apiKey: process.env.OPENAI_API_KEY || "",
});

const pinecone = new Pinecone({ apiKey: process.env.PINECONE_API_KEY || "" });

function euclidean(a: { x: number; y: number }, b: { x: number; y: number }) {
	return Math.sqrt((a.x - b.x) ** 4 + (a.y - b.y) ** 4);
}

// Dijkstra’s algorithm
function dijkstra(
	holds: { x: number; y: number; type: string }[],
	startIndex: number,
	endIndex: number,
): number[] {
	const dist: number[] = Array(holds.length).fill(Number.POSITIVE_INFINITY);
	const prev: (number | null)[] = Array(holds.length).fill(null);
	const visited: boolean[] = Array(holds.length).fill(false);

	dist[startIndex] = 0;

	for (let i = 0; i < holds.length; i++) {
		let u = -1;
		for (let j = 0; j < holds.length; j++) {
			if (!visited[j] && (u === -1 || dist[j] < dist[u])) u = j;
		}
		if (u === -1 || dist[u] === Number.POSITIVE_INFINITY) break;

		visited[u] = true;

		for (let v = 0; v < holds.length; v++) {
			if (!visited[v]) {
				const alt = dist[u] + euclidean(holds[u], holds[v]);
				if (alt < dist[v]) {
					dist[v] = alt;
					prev[v] = u;
				}
			}
		}
	}

	const path: number[] = [];
	let current: number | null = endIndex;
	while (current !== null) {
		path.unshift(current);
		current = prev[current];
	}
	return path;
}

export async function POST(req: Request) {
	try {
		const { userId, wallId, userParams } = await req.json();
		if (!userId || !wallId) throw new Error("Missing userId or wallId");

		// Get user parameters
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

		// Get embedding
		const embeddingRes = await openai.embeddings.create({
			model: "text-embedding-ada-002",
			input: [JSON.stringify(params)],
		});

		const index = pinecone.Index(
			process.env.PINECONE_INDEX_NAME || "wall-search",
		);

		const queryRes = await index.query({
			topK: 100,
			vector: embeddingRes.data[0].embedding,
			includeMetadata: true,
			filter: { wallId },
		});

		const matches = queryRes.matches || [];
		// biome-ignore lint/suspicious/noExplicitAny: <explanation>
		const allHolds = matches.map((m: any) => ({
			x: Number(m.metadata?.x),
			y: Number(m.metadata?.y),
			type: m.metadata?.type || "unknown",
		}));

		if (!allHolds.length) {
			return NextResponse.json({
				route: [],
				allHolds: [],
				instructions: "No holds found for this wall.",
			});
		}

		// Sort holds bottom-to-top
		const sortedByY = [...allHolds].sort((a, b) => b.y - a.y);
		const startIndex = allHolds.indexOf(sortedByY[0]);
		const endIndex = allHolds.indexOf(sortedByY[sortedByY.length - 1]);

		const pathIndices = dijkstra(allHolds, startIndex, endIndex);
		const route = pathIndices.map((i) => allHolds[i]);

		const prompt = `
You're a expert  climbing coach. Give simple instructions for this route:
${route.map((h, i) => `Step ${i + 1}: Go to hold at (${h.x.toFixed(2)}, ${h.y.toFixed(2)})`).join("\n")}
		`;

		const chatRes = await openai.chat.completions.create({
			model: "gpt-4o",
			messages: [{ role: "system", content: prompt }],
		});

		const instructions =
			chatRes.choices[0]?.message?.content || "No instructions generated.";

		return NextResponse.json({ route, allHolds, instructions });
		// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	} catch (err: any) {
		console.error("Dijkstra path error:", err);
		return NextResponse.json({ error: err.message }, { status: 500 });
	}
}
