import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { route, instructions, fallback } = await req.json();

    if (!Array.isArray(route) || route.length === 0) {
      throw new Error("Missing route data");
    }

    // Optional: if you want to only show the holds explicitly referenced by GPT,
    // you can keep the snippet below. But that might omit hand holds if GPT never mentions them!
    // const referencedIndices = instructions?.matchAll
    //   ? [...instructions.matchAll(/Hold (\d+)/g)].map(
    //       (m) => Number.parseInt(m[1]) - 1,
    //     )
    //   : route.map((_, i) => i);

    // If you want to show ALL holds in the route, just do this:
    const referencedIndices = route.map((_, i) => i);

    // Prepare the final route: add an index + fallback
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
        const safeRoute = route.map((hold: any, i: number) => ({
      ...hold,
      limb:  hold.limb,
      index: i,
    }));

    // (Optional) If you DO want to filter out unreferred holds, do:
    // .filter((_, i) => referencedIndices.includes(i))

    // Build polyline (just a simple line connecting holds in sequence).
    const polylinePoints = safeRoute
      // biome-ignore lint/suspicious/noExplicitAny: <explanation>
      .map((hold: any) => `${hold.x * 100},${hold.y * 100}`)
      .join(" ");

    const overlaySvg = `
      <svg viewBox="0 0 100 100" width="100%" height="100%" 
           preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
        <desc>AI-generated climbing route</desc>
        <style>
          circle {
            opacity: 0;
            transform: scale(0.6);
            animation: fadeInScale 0.4s ease-out forwards;
            transform-origin: center;
          }
          text {
            font-size: 3.5px;
            font-weight: bold;
            fill: white;
            text-shadow: 0.3px 0.3px 0.6px black;
            opacity: 0;
            animation: fadeInScale 0.4s ease-out forwards;
          }
          ${safeRoute
            .map(
              // biome-ignore lint/suspicious/noExplicitAny: <explanation>
              (_: any, i: number) => `
              circle.limb-${i} {
                animation-delay: ${i * 0.2}s;
              }
              text.label-${i} {
                animation-delay: ${i * 0.2 + 0.1}s;
              }
            `
            )
            .join("\n")}
          @keyframes fadeInScale {
            from { opacity: 0; transform: scale(0.6); }
            to { opacity: 1; transform: scale(1); }
          }
        </style>

        <!-- Simple polyline to show overall path -->
        <polyline
          points="${polylinePoints}"
          stroke="grey"
          stroke-width="1"
          fill="none"
        />

        ${safeRoute
          // biome-ignore lint/suspicious/noExplicitAny: <explanation>
          .map((hold: any, i: number) => {
            const x = hold.x * 100;
            const y = hold.y * 100;

            // Custom color map
            const limbColorMap: Record<string, string> = {
              leftFoot: "blue",
              rightFoot: "green",
              leftHand: "yellow",
              rightHand: "red",
              
            };

            // Customize start/end holds if desired
            const color =
              i === 0
                ? "purple" // first hold
                : i === safeRoute.length - 1
                ? "black"  // last hold
                : limbColorMap[hold.limb] || "orange"; // default color

            return `
              <circle
                class="limb-${i}"
                cx="${x}"
                cy="${y}"
                r="2.5"
                fill="${color}"
              />
              <text class="label-${i}" x="${x}" y="${y + 2.5}" text-anchor="middle">
                ${i + 1}
              </text>
            `;
          })
          .join("")}
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
