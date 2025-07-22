import { NextResponse } from "next/server";
import OpenAI from "openai";
import db from "@/lib/db";
import { users } from "@/lib/db/schema/user";
import { layouts } from "@/lib/data/predefinedLayoutsJson";
import { boulderWall } from "@/lib/db/schema/boulder_wall";
import { eq } from "drizzle-orm";
import { pinecone } from "@/lib/db/pinecone";

const openai = new OpenAI({
	apiKey: process.env.OPENAI_API_KEY,
});

const INDEX_NAME = "wall-search";

type Hold = {
	id: string;
	x: number;
	y: number;
	type: string;
	angle?: number;
	zone?: "bottom" | "middle" | "top";
	limb?: string;
};

const getColorName = (limb: string) => {
	switch (limb) {
		case "leftFoot":
			return "orange";
		case "rightFoot":
			return "green";
		case "leftHand":
			return "purple";
		case "rightHand":
			return "blue";
		default:
			return "gray";
	}
};

export async function POST(req: Request) {
	try {
		const {
			userId,
			wallId,
			userParams,
			difficulty = "medium",
		} = await req.json();
		if (!userId || !wallId) throw new Error("Missing userId or wallId");

		let params = userParams;
		if (!params) {
			const [user] = await db.select().from(users).where(eq(users.id, userId));
			if (!user) throw new Error("User not found.");
			params = {
				height: user.height,
				apeIndex: user.apeIndex,
				legRatio: user.legRatio,
			};
		}

		const [wall] = await db
			.select()
			.from(boulderWall)
			.where(eq(boulderWall.id, wallId));
		if (!wall) throw new Error("Wall not found");

		const layout = layouts[wall.layout_id];
		if (!layout) throw new Error("Layout not found");

		const columnLabels = [
			"A", "B", "C", "D", "E", "F", "G", "H", "I",
			"J", "K", "L", "M", "N", "O", "P", "Q"
		];
		// biome-ignore lint/suspicious/noExplicitAny: <explanation>
		const allHolds: Hold[] = layout.holds.map((h: any) => {

	const colLetter = h.id?.[0];
	// biome-ignore lint/style/useNumberNamespace: <explanation>
	const rowNumber = parseInt(h.id?.slice(1), 10);

	const x = columnLabels.indexOf(colLetter);
	const y = rowNumber - 1;

	const zone = y >= layout.gridRows - 3 ? "top" :
		y <= 2 ? "bottom" : "middle";

	return {
		id: h.id,
		x,
		y,
		type: h.type || "unknown",
		angle: h.angle ?? undefined,
		row: y,
		zone,
	};
});
		const mandatoryFeetIds = new Set([
			// A1–Q1
			...Array.from({ length: 17 }, (_, i) => `${String.fromCharCode(65 + i)}1`),
			// A2–Q2
			...Array.from({ length: 17 }, (_, i) => `${String.fromCharCode(65 + i)}2`),
			// Kicker
			"D6","D1","D5","D4","D16","D13","D2","D11","D3","D14","D15"
		]);
  
  		const bottomHolds = allHolds.filter(h => mandatoryFeetIds.has(h.id)).slice(0, 2);

		
		  const topHandIds = new Set(
			Array.from({ length: 17 }, (_, i) => `${String.fromCharCode(65 + i)}18`)
		  );
		  
		  const topHold = allHolds.find(h => topHandIds.has(h.id) && h.type === "hand");

		const filtered = allHolds.filter((h) => {
			if (h.type === "unknown") return false;
			if (difficulty === "easy") return typeof h.angle === "number" && h.angle >= 100 && h.angle <= 220;
			if (difficulty === "hard") return typeof h.angle === "number" && (h.angle < 100 || h.angle > 260);
			return true; 
		});

		const fullList: Hold[] = [
			...bottomHolds,
			...filtered.filter(h =>
				!bottomHolds.some(b => b.x === h.x && b.y === h.y) &&
				!(topHold && h.x === topHold.x && h.y === topHold.y)
			),
			...(topHold ? [topHold] : [])
		];

		const topHoldIndex = fullList.findIndex(h => topHold && h.x === topHold.x && h.y === topHold.y);

		const holdListForPrompt = fullList
			.map((h, i) => `Hold ${i + 1}: ${h.id}, type: ${h.type}, angle: ${h.angle ?? "unknown"}`)
			.join("\n");

		const index = pinecone.Index(INDEX_NAME);

		const queryText = [
			`User: h=${params.height}, a=${params.apeIndex}, l=${params.legRatio}`,
			"Holds:", holdListForPrompt
		].join("\n");

		const queryEmbRes = await openai.embeddings.create({
			model: "text-embedding-ada-002",
			input: queryText,
		});
		const queryVector = queryEmbRes.data[0].embedding;

		const queryRes = await index.query({
			vector: queryVector,
			topK: 3,
			includeMetadata: true,
		});
		const similarRoutes = (queryRes.matches ?? [])
			.map((m) => m.metadata?.routeText)
			.filter((rt): rt is string => typeof rt === "string");

		const retrievalContext = similarRoutes.length
			? `\n\n Here are a few similar past routes:\n${similarRoutes.join("\n\n")}\n\n`
			: "";

		const routePrompt = `
		I am a beginner climber training on a Kilter Board. I want to complete a satisfying beginner-friendly route that allows me to **climb from the bottom to the top of the wall**.
		
		🧍 My info:
			- Height: ${params.height}
			- Ape Index: ${params.apeIndex}
			- Leg Ratio: ${params.legRatio}

			Important Hold Zones:
			- Start your route using footholds from these IDs (bottom zone): 
			A1–Q1, A2–Q2, D6, D1, D5, D4, D16, D13, D2, D11, D3, D14, D15
			- Finish your route using a handhold from these IDs (top zone): 
			A18–Q18
			
			Available climbing holds:
			${holdListForPrompt}

			${retrievalContext}
			Goal:
			Design a realistic climbing route that starts near the foot zone and finishes near the top of the wall. Simulate an actual beginner’s ascent to the top, following vertical progression and stable movement.

			Rules:
			- Use 6 to 10 total holds.
			- Start with 2 footholds in the bottom 2 rows.
			- Use reachable handholds based on height and ape index.
			- Final hold should be near the top and reachable with one hand.
			- Do NOT invent hold IDs or coordinates.
			- DO NOT explain — just output the result.

			Output format:
			Route: Hold 1, Hold 4, Hold 5, ...
			`;
			const routeRes = await openai.chat.completions.create({
				model: "gpt-4.1-mini",
				messages: [{ role: "user", content: routePrompt }],
			});

			const rawRoute = routeRes.choices[0].message.content || "";
			const holdNumbers = [...rawRoute.matchAll(/Hold (\d+)/g)].map((m) => +m[1] - 1);
			const aiHolds = holdNumbers.map((i) => fullList[i]).filter(Boolean);

			const finalRoute: Hold[] = [
				...bottomHolds,
				...aiHolds.filter(h =>
					!bottomHolds.some(b => b.x === h.x && b.y === h.y) &&
					!(topHold && h.x === topHold.x && h.y === topHold.y)
				),
				...(topHold ? [topHold] : [])
			];


			const assignLimbs = (route: Hold[]): Hold[] => {
				const assigned: Hold[] = [];
				assigned.push({ ...route[0], limb: "leftFoot" });
				assigned.push({ ...route[1], limb: "rightFoot" });

				let lastFoot = "rightFoot";
				let lastHand = "rightHand";
				for (let i = 2; i < route.length - 1; i++) {
					const isEven = i % 2 === 0;
					const limb = isEven
						? lastHand === "leftHand" ? "rightHand" : "leftHand"
						: lastFoot === "leftFoot" ? "rightFoot" : "leftFoot";
					assigned.push({ ...route[i], limb });
					if (limb.includes("Foot")) lastFoot = limb;
					else lastHand = limb;
				}
				const finalLimb = lastHand === "leftHand" ? "rightHand" : "leftHand";
				assigned.push({ ...route[route.length - 1], limb: finalLimb });
				return assigned;
			};

			const assignedRoute = assignLimbs(finalRoute);

			const instructionPrompt = `
			I'm a beginner climber trying to follow my route one step at a time. I want clear, friendly instructions so I can feel confident and know exactly what to do next.

			Here’s my route with limb assignments and color names:
			${assignedRoute.map((h, i) => {
				const limb = h.limb ?? "unknown";
				const colorName = getColorName(limb);
				return `Hold ${i + 1}: ${limb} (${colorName})`;
			}).join("\n")}

			Instructions:
			- Number each move.
			- Use simple language.
			- Talk to me directly.
			- Help me stay balanced and move safely.

			Output example:
			1. Put your left foot on Hold 1 (🟠 orange).
			2. Step your right foot on Hold 2 (🟢 green).
			3. Reach your left hand to Hold 3 (🟣 purple).
			`;

		const chatRes = await openai.chat.completions.create({
			model: "gpt-4.1-mini",
			messages: [{ role: "user", content: instructionPrompt }],
		});

		const instructions = chatRes.choices[0]?.message?.content || "No instructions.";

		return NextResponse.json({
			route: assignedRoute,
			allHolds: filtered,
			instructions,
		});

		// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	} catch (err: any) {
		console.error("AI Route Generation Error:", err);
		return NextResponse.json({ error: err.message }, { status: 500 });
	}
}
