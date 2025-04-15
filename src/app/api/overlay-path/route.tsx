import { NextResponse } from "next/server";

export async function POST(req: Request) {
	try {
		const { route, instructions, layout } = await req.json();

		if (!Array.isArray(route) || route.length === 0) {
			throw new Error("Missing route data");
		}
		if (!layout?.gridCols || !layout?.gridRows) {
			throw new Error("Missing layout dimensions");
		}

		const gridCols = layout.gridCols;
		const gridRows = layout.gridRows;

		const referencedIndices = instructions?.matchAll
			? [...instructions.matchAll(/Hold (\d+)/g)].map(
					(m) => Number.parseInt(m[1]) - 1,
			  )
			: route.map((_, i) => i);

		const safeRoute = route
			// biome-ignore lint/suspicious/noExplicitAny: <explanation>
			.map((hold: any, i: number) => ({
				...hold,
				index: i,
			}))
			.filter((_, i) => referencedIndices.includes(i));

		const getColor = (limb: string) => {
			switch (limb) {
				case "leftFoot":
					return "#f28916"; // orange
				case "rightFoot":
					return "#04c217"; 
				case "leftHand":
					return "#f7c245"; 
				case "rightHand":
					return "#00e1ed"; // cyan
				default:
					return "#AAAAAA"; // fallback
			}
		};

		const overlaySvg = `
<svg 
	viewBox="0 0 ${gridCols} ${gridRows}" 
	width="100%" 
	height="100%" 
	preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg"
>
	<desc>AI-generated climbing route</desc>
	  <defs>
    <filter id="shadow">
      <feDropShadow dx="0.05" dy="0.05" stdDeviation="0.1" flood-color="#000" flood-opacity="0.4"/>
    </filter>
  </defs>
	<style>
    circle {
      transform-origin: center;
      transform: scale(0.9);
      opacity: 0;
      animation: fadeIn 0.4s ease-out forwards;
    }
    @keyframes fadeIn {
      from { opacity: 0; transform: scale(0.5); }
      to { opacity: 0.9; transform: scale(1); }
    }
    ${safeRoute.map((_, i) => `
      circle.step-${i} {
        animation-delay: ${i * 0.1}s;
      }
    `).join("")}
  </style>

  ${// biome-ignore lint/suspicious/noExplicitAny: <explanation>
safeRoute.map((hold: any, i: number) => {
    const x = hold.x + 0.5;
    const y = hold.y + 0.5;
    const color =
       i === safeRoute.length - 1
        ? "#C03EFF" // start & end
        : getColor(hold.limb);
    return `
      <circle
        class="step-${i}"
        cx="${x}"
        cy="${y}"
        r="1.2"
        fill="none"
        stroke="${color}"
        stroke-width="0.25"
        filter="url(#shadow)"
      />
    `;
  }).join("")}
</svg>
`;

		return NextResponse.json({ overlaySvg }, { status: 200 });
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	} catch (err: any) {
		console.error("Overlay generation error:", err);
		return NextResponse.json(
			{ error: "Failed to generate overlay", details: err.message },
			{ status: 500 },
		);
	}
}