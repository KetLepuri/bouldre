"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

export default function PathDisplayPage() {
	const router = useRouter();
	const searchParams = useSearchParams();
	const imageUrl = searchParams.get("imageUrl");
	const userId = localStorage.getItem("userId");
	const wallId = localStorage.getItem("wallId");

	const [loading, setLoading] = useState(true);
	const [route, setRoute] = useState([]);
	const [overlaySvg, setOverlaySvg] = useState("");
	const [instructions, setInstructions] = useState("");

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		if (!imageUrl || !userId) return;

		const processImage = async () => {
			try {
				setLoading(true);

				// Step 1: Get AI-generated route
				const pathRes = await fetch("/api/generate-path", {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({ userId, wallId, imageUrl }),
				});

				const pathData = await pathRes.json();
				if (!pathRes.ok || !pathData.route?.length) {
					throw new Error(pathData.error || "No route could be generated.");
				}

				console.log("AI-Generated Route:", pathData.route);
				setRoute(pathData.route);
				setInstructions(pathData.instructions);

				// Step 2: Overlay path on image
				const overlayRes = await fetch("/api/overlay-path", {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({ imageUrl, route: pathData.route }),
				});

				const overlayData = await overlayRes.json();
				console.log("Overlay SVG:", overlayData.overlaySvg);
				setOverlaySvg(overlayData.overlaySvg);
			} catch (err) {
				console.error("Error generating path:", err);
				alert(
					"Failed to generate path. Please ensure the wall image was saved and holds detected.",
				);
			} finally {
				setLoading(false);
			}
		};

		processImage();
	}, [imageUrl, userId]);

	return (
		<div className="flex flex-col items-center min-h-screen bg-gray-100 p-6">
			<h1 className="text-2xl font-semibold text-gray-900 text-center">
				Generated Climbing Route 🧷‍♀️
			</h1>

			{loading ? (
				<div className="flex items-center justify-center mt-6">
					<Loader2 className="animate-spin w-10 h-10 text-purple-600" />
				</div>
			) : (
				<>
					{/* Image container with SVG overlay */}
					<div className="relative w-[500px] h-auto">
						{imageUrl && (
							<Image
								src={imageUrl}
								alt="Climbing Route"
								width={500}
								height={500}
								className="rounded-lg shadow-md my-6"
							/>
						)}
						{overlaySvg && (
							<div
								// biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
								dangerouslySetInnerHTML={{ __html: overlaySvg }}
								className="absolute top-0 left-0 w-full h-full pointer-events-none"
							/>
						)}
					</div>

					{/* Climbing Instructions with Scrollable Box */}
					<div className="bg-white p-4 rounded-lg shadow-md w-full max-w-lg max-h-[300px] overflow-y-auto">
						<h2 className="text-lg font-semibold mb-2">
							Climbing Instructions:
						</h2>
						<pre className="text-gray-700 whitespace-pre-wrap">
							{instructions}
						</pre>
					</div>

					<div className="mt-6 flex gap-4">
						<Button
							variant="default"
							className="bg-blue-600 text-white px-4 py-2 rounded-lg"
							onClick={() => router.push("/home/gallery")}
						>
							Save to Gallery
						</Button>

						<Button
							variant="destructive"
							className="bg-red-600 text-white px-4 py-2 rounded-lg"
							onClick={() => router.push("/home/upload-images")}
						>
							Upload New Image
						</Button>
					</div>
				</>
			)}
		</div>
	);
}
