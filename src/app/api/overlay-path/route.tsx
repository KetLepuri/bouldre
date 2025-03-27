import { NextResponse } from "next/server";
import sharp from "sharp";

export async function POST(req: Request) {
	try {
		const { imageUrl, route } = await req.json();

		if (!imageUrl || !Array.isArray(route) || !route.length) {
			throw new Error("Missing image or route data");
		}

		// 1. Fetch and load the image
		const response = await fetch(imageUrl);
		const imageBuffer = Buffer.from(await response.arrayBuffer());
		const image = sharp(imageBuffer);

		// 2. Get image dimensions
		const { width, height } = await image.metadata();
		if (!width || !height) throw new Error("Invalid image dimensions");

		// 3. Build polyline path (optional line connecting holds)
		const polylinePoints = route
			// biome-ignore lint/suspicious/noExplicitAny: <explanation>
			.map((hold: any) => {
				const x = Number(hold.x) * width;
				const y = Number(hold.y) * height;
				return `${x},${y}`;
			})
			.join(" ");

		// 4. Build the full SVG
		const overlaySvg = `
      <svg viewBox="0 0 ${width} ${height}" width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
        <desc>AI generated bouldering path</desc>
        <style>
          circle {
            opacity: 0;
            animation: fadeIn 0.5s ease forwards;
          }
          text {
            font-size: 24px;
            font-weight: bold;
            fill: white;
            text-shadow: 1px 1px 2px black;
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
          `,
						)
						.join("\n")}
          @keyframes fadeIn {
            to {
              opacity: 1;
            }
          }
        </style>

        <rect width="100%" height="100%" fill="transparent"/>
        
        <!-- Optional: Connect path with polyline -->
        <polyline 
          points="${polylinePoints}" 
          stroke="yellow" 
          stroke-width="4" 
          fill="none"
        />

        ${route
					.map(
						(hold: { type: string; x: number; y: number }, index: number) => {
							const holdType = hold.type?.toLowerCase() || "unknown";
							const x = Number(hold.x) * width;
							const y = Number(hold.y) * height;

							let color = "green";
							if (index === 0)
								color = "purple"; // Start
							else if (index === route.length - 1)
								color = "black"; // End
							else if (holdType.includes("hand")) color = "cyan";
							else if (holdType.includes("foot")) color = "orange";

							return `
              <circle class="hold-${index}" cx="${x}" cy="${y}" r="15" stroke="${color}" stroke-width="3" fill="none">
                <title>Step ${index + 1}: ${holdType}</title>
              </circle>
              <text class="label-${index}" x="${x}" y="${y + 8}" text-anchor="middle">${index + 1}</text>
            `;
						},
					)
					.join("")}
      </svg>
    `;

		return NextResponse.json({ overlaySvg }, { status: 200 });
		// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	} catch (error: any) {
		console.error("Overlay error:", error);
		return NextResponse.json(
			{ error: "Failed to generate overlay", details: error.message },
			{ status: 500 },
		);
	}
}
