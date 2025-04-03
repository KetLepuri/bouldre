import { NextResponse } from "next/server";

export async function POST(req: Request) {
	try {
		const { imageUrl, route } = await req.json();

		if (!imageUrl || !Array.isArray(route) || !route.length) {
			throw new Error("Missing image or route data");
		}

		// Build SVG with normalized viewBox (0–100)
		const polylinePoints = route
			// biome-ignore lint/suspicious/noExplicitAny: <explanation>
			.map((hold: any) => `${hold.x * 100},${hold.y * 100}`)
			.join(" ");

		const overlaySvg = `
			<svg viewBox="0 0 100 100" width="100%" height="100%" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
				<desc>AI generated climbing route</desc>
				<style>
					circle {
						opacity: 0;
						animation: fadeIn 0.5s ease forwards;
					}
					text {
						font-size: 2.5px;
						font-weight: bold;
						fill: white;
						text-shadow: 0.3px 0.3px 0.6px black;
						opacity: 0;
						animation: fadeIn 0.5s ease forwards;
					}
					${route
						.map(
							// biome-ignore lint/suspicious/noExplicitAny: <explanation>
							(_: any, i: number) => `
						circle.hold-${i} {
							animation-delay: ${i * 0.2}s;
						}
						text.label-${i} {
							animation-delay: ${i * 0.2 + 0.1}s;
						}
					`
						)
						.join("\n")}
					@keyframes fadeIn {
						to {
							opacity: 1;
						}
					}
				</style>

				<polyline 
					points="${polylinePoints}" 
					stroke="yellow" 
					stroke-width="1" 
					fill="none"
				/>

				${route
					// biome-ignore lint/suspicious/noExplicitAny: <explanation>
					.map((hold: any, i: number) => {
						const x = hold.x * 100;
						const y = hold.y * 100;
						const type = hold.type?.toLowerCase() || "unknown";

						let color = "green";
						if (i === 0) color = "purple";
						else if (i === route.length - 1) color = "black";
						else if (type.includes("hand")) color = "cyan";
						else if (type.includes("foot")) color = "orange";

						return `
							<circle class="hold-${i}" cx="${x}" cy="${y}" r="2.5" stroke="${color}" stroke-width="0.5" fill="none" />
							<text class="label-${i}" x="${x}" y="${y + 1.5}" text-anchor="middle">${i + 1}</text>
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
			{ status: 500 }
		);
	}
}
