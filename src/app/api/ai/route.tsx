import { NextResponse } from "next/server";
import OpenAI from "openai";
import { Pinecone } from "@pinecone-database/pinecone";
import db from "@/lib/db";
import { users } from "@/lib/db/schema/user";
import { eq } from "drizzle-orm";

const openai = new OpenAI({
	apiKey: process.env.OPENAI_API_KEY,
});

const pinecone = new Pinecone({ apiKey: process.env.PINECONE_API_KEY || "" });

type Hold = {
	x: number;
	y: number;
	w: number;
	h: number;
	type: string;
	limb?: string;
};

function assignLimbs(route: Hold[]): Hold[] {
	const assigned: Hold[] = [];

	// Ensure the first two holds are feet: left then right.
	if (route.length > 0) {
		assigned.push({ ...route[0], limb: "leftFoot" });
	}
	if (route.length > 1) {
		assigned.push({ ...route[1], limb: "rightFoot" });
	}

	// For the following holds, alternate starting with hands.
	let nextHand = "leftHand";
	let nextFoot = "leftFoot"; // fallback in case needed.

	for (let i = 2; i < route.length; i++) {
		const hold = { ...route[i] };

		// A simple rule: if the hold is only a small vertical step from the previous,
		// we assign it to a hand; otherwise, if it's a larger step, optionally use a foot.
		if (i === 2 || Math.abs(hold.y - route[i - 1].y) < 0.05) {
			hold.limb = nextHand;
			// Alternate hand: left -> right, right -> left.
			nextHand = nextHand === "leftHand" ? "rightHand" : "leftHand";
		} else {
			hold.limb = nextFoot;
			// Alternate foot: left -> right, right -> left.
			nextFoot = nextFoot === "leftFoot" ? "rightFoot" : "leftFoot";
		}
		assigned.push(hold);
	}

	return assigned;
}

function weightedDistance(a: Hold, b: Hold) {
	const sizeA = a.w * a.h;
	const sizeB = b.w * b.h;
	const avgSize = (sizeA + sizeB) / 2;
	const dx = a.x - b.x;
	const dy = a.y - b.y;
	const verticalFactor = 2;
	const lateralPenalty = Math.abs(dx) < 0.05 ? 5 : 1;
	const dist = dx ** 2 + verticalFactor * dy ** 2;
	const sizeWeight = 1 / (avgSize + 0.01);
	return dist * sizeWeight * lateralPenalty;
}

function heuristic(a: Hold, b: Hold) {
	return Math.abs(a.y - b.y) + 0.5 * Math.abs(a.x - b.x);
}

function aStar(
	holds: Hold[],
	startIndex: number,
	endIndex: number,
	reachNorm: number,
): number[] {
	const openSet = new Set<number>([startIndex]);
	const cameFrom: Record<number, number | undefined> = {};
	const gScore = Array(holds.length).fill(Number.POSITIVE_INFINITY);
	const fScore = Array(holds.length).fill(Number.POSITIVE_INFINITY);

	gScore[startIndex] = 0;
	fScore[startIndex] = heuristic(holds[startIndex], holds[endIndex]);

	const maxVerticalReach = reachNorm * 0.25;
	const maxLateralReach = reachNorm * 0.15;

	while (openSet.size > 0) {
		const current = [...openSet].reduce((a, b) =>
			fScore[a] < fScore[b] ? a : b,
		);

		if (current === endIndex) {
			const path: number[] = [];
			let temp: number | undefined = current;
			while (temp !== undefined) {
				path.unshift(temp);
				temp = cameFrom[temp];
			}
			return path;
		}

		openSet.delete(current);

		for (let neighbor = 0; neighbor < holds.length; neighbor++) {
			if (neighbor === current) continue;

			const dx = Math.abs(holds[current].x - holds[neighbor].x);
			const dy = Math.abs(holds[current].y - holds[neighbor].y);
			const rawDist = Math.sqrt(dx ** 2 + dy ** 2);

			if (
				rawDist < 0.02 ||
				dy > maxVerticalReach ||
				dx > maxLateralReach ||
				rawDist > reachNorm + 0.2
			) {
				continue;
			}

			const tentativeGScore =
				gScore[current] + weightedDistance(holds[current], holds[neighbor]);

			if (tentativeGScore < gScore[neighbor]) {
				cameFrom[neighbor] = current;
				gScore[neighbor] = tentativeGScore;
				fScore[neighbor] =
					tentativeGScore + heuristic(holds[neighbor], holds[endIndex]);
				openSet.add(neighbor);
			}
		}
	}

	return [];
}

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

		// biome-ignore lint/suspicious/noExplicitAny: <explanation>
		const allHolds: Hold[] = queryRes.matches.map((m: any) => ({
			x: Number(m.metadata.x),
			y: Number(m.metadata.y),
			w: Number(m.metadata.w),
			h: Number(m.metadata.h),
			type: m.metadata.type || "hold",
		}));

		if (!allHolds.length) {
			return NextResponse.json({ route: [], instructions: "No holds found." });
		}

		const minSize =
			difficulty === "easy" ? 0.002 : difficulty === "hard" ? 0.0005 : 0.001;
		const filtered = allHolds.filter((h) => h.w * h.h >= minSize);

		const height = typeof params.height === "number" ? params.height : 170;
		const apeIndex = typeof params.apeIndex === "number" ? params.apeIndex : 0;
		const reachNorm = (height + apeIndex) / 200;

		const starts = [...filtered].sort((a, b) => b.y - a.y).slice(0, 5);
		const ends = [...filtered].sort((a, b) => a.y - b.y).slice(0, 5);

		const paths: Hold[][] = [];

		for (const start of starts) {
			for (const end of ends) {
				const startIndex = filtered.indexOf(start);
				const endIndex = filtered.indexOf(end);
				if (startIndex === -1 || endIndex === -1) continue;

				const pathIdx = aStar(filtered, startIndex, endIndex, reachNorm);

				if (pathIdx.length >= 3) {
					paths.push(pathIdx.map((i) => filtered[i]));
				}
			}
		}

		if (!paths.length) {
			return NextResponse.json({
				route: [],
				instructions: "No valid paths found.",
			});
		}

		const labeledPaths = paths.map((route) => assignLimbs(route));

		const prompt = `
		You are a professional climbing coach specializing in beginner training on Kilter Boards.
		
		Your task is to evaluate beginner climbing paths for a user with:
		- Height: ${params.height}
		- Ape Index: ${params.apeIndex}
		- Leg Ratio: ${params.legRatio}
		
		The user is a complete beginner. You must guide them safely and effectively. Review the following route candidates and choose the **best one** using these rules:
		
		🏁 **Start Conditions**:
		- Climbers should stand facing the wall.
		- The route must begin with two footholds at the bottom (realistically spaced for shoulder-width stance).
		- The next 1–2 steps should include reachable handholds to establish a stable 3-point contact before moving further.
		
		🚧 **Path Logic**:
		- Do **not** allow excessive reach between holds (respect user’s reach).
		- Prioritize natural progression: hand-foot-hand-foot alternation when possible.
		- Avoid repeating the same limb 3+ times in a row unless justified.
		- Avoid diagonal lunges or vertical jumps.
		- Reward balanced, intuitive, and symmetric flow.
		
		🧠 **Your Output**:
		- Respond only with: **"Path X"**, where X is the best route number.also refer to the number in the picture oex: Hold 1, Hold 2, etc.
		- Do **not** explain or justify. Just choose the optimal one.
		
		${labeledPaths
			.map(
				(p, i) =>
					`Path ${i + 1}:\n${p
						.map(
							(h, j) =>
								`Step ${j + 1}: ${h.limb || "?"} on hold (${h.x.toFixed(2)}, ${h.y.toFixed(2)})`,
						)
						.join("\n")}`,
			)
			.join("\n\n")}
		`;

		const evalRes = await openai.chat.completions.create({
			model: "gpt-4o-mini",
			messages: [{ role: "system", content: prompt }],
		});

		const chosenPathIndex = Number.parseInt(
			evalRes.choices[0].message.content?.match(/Path (\d+)/)?.[1] || "1",
			10,
		);
		const finalRoute = labeledPaths[chosenPathIndex - 1] || labeledPaths[0];

		const instrPrompt = `
		You're a professional climbing coach guiding a complete beginner on a Kilter Board. Imagine you’re right beside the climber as they face the wall. The available holds are labeled as follows:
		${finalRoute
			.map((h, i) => {
				// Map each hold to a friendly label with its number.
				const limbText =
					h.limb === "rightFoot"
						? "Right Foot"
						: h.limb === "leftFoot"
							? "Left Foot"
							: h.limb === "rightHand"
								? "Right Hand"
								: h.limb === "leftHand"
									? "Left Hand"
									: "Unknown Hold";
				return `Hold ${i + 1}: ${limbText}`;
			})
			.join("\n")}
		
		Using these holds, please provide clear, step-by-step climbing instructions that a beginner can easily follow. Your instructions should:
		- Refer to the hold numbers (e.g., "Hold 1", "Hold 2", etc.) when describing the movements.
		- Use simple, everyday language— for example: "Place your left foot on Hold 1, then gently step your right foot onto Hold 2."
		- Encourage a balanced and stable posture with three points of contact where possible.
		- Be calm, motivational, and easy to follow, as if you're guiding them in person.
		- Avoid technical jargon or mentioning coordinates.
		
		Please only provide the numbered step-by-step instructions for the route.
		`;

		const chatRes = await openai.chat.completions.create({
			model: "gpt-4o-mini",
			messages: [{ role: "system", content: instrPrompt }],
		});

		const instructions =
			chatRes.choices[0]?.message?.content || "No instructions.";

		return NextResponse.json({
			route: finalRoute,
			allHolds: filtered,
			instructions,
		});
		// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	} catch (err: any) {
		console.error("AI Route Generation Error:", err);
		return NextResponse.json({ error: err.message }, { status: 500 });
	}
}
