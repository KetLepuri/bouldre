import { NextResponse } from "next/server";
import OpenAI from "openai";
import db from "@/lib/db";
import { users } from "@/lib/db/schema/user";
import { layouts } from "@/lib/data/predefinedLayoutsJson";
import { boulderWall } from "@/lib/db/schema/boulder_wall";
import { eq } from "drizzle-orm";

const openai = new OpenAI({
	apiKey: process.env.OPENAI_API_KEY || "",
});

type Hold = {
	x: number;
	y: number;
	type: string;
	row?: number;
	angle?: number | null;
	limb?: string;
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

		// Fallback userParams if not provided
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

		// biome-ignore lint/suspicious/noExplicitAny: <explanation>
		const allHolds: Hold[] = layout.holds.map((h: any) => ({
			x: h.x,
			y: h.y,
			type: h.type || "unknown",
			angle: h.angle ?? undefined,
			row: h.row ?? undefined,
		}));

		const filtered = allHolds.filter((h) => {
			if (difficulty === "easy") return h.type === "foot" || h.type === "hand";
			if (difficulty === "hard") return h.type !== "unknown";
			return h.type !== "unknown" || Math.random() > 0.3;
		});

		const holdListForPrompt = filtered
			.map(
				(h, i) =>
					`Hold ${i + 1}: (${h.x.toFixed(2)}, ${h.y.toFixed(2)}), type: ${h.type}`,
			)
			.join("\n");

		const routePrompt = `
		I am a beginner climber training on a Kilter Board. I want to complete a satisfying beginner-friendly route that allows me to **climb from the bottom to the top of the wall**.
		
		🧍 My info:
		- Height: ${params.height}
		- Ape Index: ${params.apeIndex}
		- Leg Ratio: ${params.legRatio}
		
		🪜 Available climbing holds:
		${holdListForPrompt}
		
		🎯 Goal:
		Design a realistic climbing route that starts near the **kickboard/foot zone** and finishes near the **top of the wall**. The route should simulate an actual beginner’s ascent to the top, following natural vertical progression. I should be able to feel steady and confident moving upward.
		
		🧠 Rules:
		- Choose **6 to 10 holds** total.
		- Start with **2 footholds** in the bottom 2 rows.
		- Use **reachable handholds** within beginner reach based on my height and ape index.
		- The final hold should be near the **top 3 rows** of the wall and reachable with one hand.
		- Alternate hand and foot placements naturally.
		- Do **NOT use dynamic moves** like jumping or lunging.
		- Emphasize **balance, control, and vertical progress**.
		- ONLY select holds from the list above.
		- DO NOT invent hold IDs or coordinates.
		- DO NOT explain your reasoning — just output the result.
		
		📦 Output format:
		Route: Hold 1, Hold 4, Hold 5, ...
		`;

		const routeRes = await openai.chat.completions.create({
			model: "gpt-4",
			messages: [{ role: "user", content: routePrompt }],
		});

		const rawRoute = routeRes.choices[0].message.content || "";
		const holdNumbers = rawRoute.match(/Hold (\d+)/g) || [];

		const finalRoute: Hold[] = holdNumbers
			.map((match) => {
				const index = Number.parseInt(match.replace("Hold ", ""), 10) - 1;
				return filtered[index];
			})
			.filter((h) => h !== undefined);

		if (!finalRoute.length) {
			return NextResponse.json({
				route: [],
				instructions: "No valid route was returned.",
			});
		}

		// Assign limbs (simple rule: feet first, then alternate hands)
		const assignedRoute: Hold[] = finalRoute.map((h, i) => {
			if (i === 0) return { ...h, limb: "leftFoot" };
			if (i === 1) return { ...h, limb: "rightFoot" };
			const limbCycle = ["leftHand", "rightHand", "leftFoot", "rightFoot"];
			const limb = limbCycle[(i - 2) % limbCycle.length];
			return { ...h, limb };
		});

		const instructionPrompt = `
	  I'm a beginner climber trying to follow my route one step at a time. I want clear, friendly instructions so I can feel confident and know exactly what to do next.
	  
	  Here’s my route with limb assignments:
	  ${assignedRoute.map((h, i) => `Hold ${i + 1}: ${h.limb}`).join("\n")}
	  
	  🧗 Instructions:
	  - Number each move.
	  - Use simple language.
	  - Talk to me directly (e.g., “Now reach up…”).
	  - Help me stay balanced and move safely.
	  
	  🎯 Output example:
	  1. Put your left foot on Hold 1.
	  2. Step your right foot on Hold 2.
	  3. Reach your left hand to Hold 3.
	  `;

		const chatRes = await openai.chat.completions.create({
			model: "gpt-4",
			messages: [{ role: "user", content: instructionPrompt }],
		});

		const instructions =
			chatRes.choices[0]?.message?.content || "No instructions.";

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
