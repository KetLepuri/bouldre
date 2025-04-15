"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { RefreshCcw } from "lucide-react";

interface StepDisplayProps {
	imageUrl: string;
	onRestart: () => void;
	showModal: (title: string, message: string) => void;
}

export default function StepDisplay({
	imageUrl,
	onRestart,
	showModal,
}: StepDisplayProps) {
	const router = useRouter();
	const [loading, setLoading] = useState(true);
	const [overlaySvg, setOverlaySvg] = useState("");
	const [instructions, setInstructions] = useState("");
	const [isZoomed, setIsZoomed] = useState(false);
	const [error, setError] = useState("");

	useEffect(() => {
		const pathData = JSON.parse(
			localStorage.getItem("aiGeneratedPath") || "{}",
		);

		if (!pathData.route || !pathData.route.length || !pathData.instructions) {
			setError("Missing route data. Please generate a new path.");
			setLoading(false);
			return;
		}

		setInstructions(pathData.instructions || "");

		// Fetch SVG overlay from backend
		const generateOverlay = async () => {
			try {
				const layout = {
					gridCols: 47,
					gridRows: 35,
				};
				const res = await fetch("/api/overlay-path", {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({
						route: pathData.route,
						instructions: pathData.instructions,
						fallback: false,
						layout,
					}),
				});

				const data = await res.json();
				if (!data.overlaySvg) throw new Error("Failed to render SVG");
				setOverlaySvg(data.overlaySvg);
				// biome-ignore lint/suspicious/noExplicitAny: <explanation>
			} catch (err: any) {
				console.error("Overlay Error:", err);
				showModal(
					"Overlay Error",
					err.message || "Could not render route overlay.",
				);
			} finally {
				setLoading(false);
			}
		};

		generateOverlay();
	}, [showModal]);

	const regenerateRoute = async () => {
		setLoading(true);
		try {
			const pathData = JSON.parse(localStorage.getItem("aiGeneratedPath") || "{}");
			const userId = localStorage.getItem("userId");
			const wallId = localStorage.getItem("wallId");
			const userParams = JSON.parse(localStorage.getItem("userParams") || "{}");
	
			if (!userId || !wallId || !userParams) {
				throw new Error("Missing userId, wallId, or user parameters.");
			}
	
			const res = await fetch("/api/ai", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					userId,
					wallId,
					userParams,
				}),
			});
	
			const newPathData = await res.json();
	
			if (!newPathData.route || !newPathData.instructions) {
				throw new Error("Invalid path data from AI.");
			}
	
			localStorage.setItem("aiGeneratedPath", JSON.stringify(newPathData));
			setInstructions(newPathData.instructions);
	
			// Re-generate the overlay
			const layout = {
				gridCols: 47,
				gridRows: 35,
			};
	
			const overlayRes = await fetch("/api/overlay-path", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					route: newPathData.route,
					instructions: newPathData.instructions,
					fallback: false,
					layout,
				}),
			});
	
			const overlayData = await overlayRes.json();
			if (!overlayData.overlaySvg) throw new Error("Overlay generation failed.");
			setOverlaySvg(overlayData.overlaySvg);
		// biome-ignore lint/suspicious/noExplicitAny: <explanation>
		} catch (err: any) {
			console.error("Regenerate Error:", err);
			showModal("Regenerate Error", err.message || "Failed to generate new path.");
		} finally {
			setLoading(false);
		}
	};
	
	if (loading) {
		return (
			<div className="text-center py-12">
				<Loader2 className="w-6 h-6 animate-spin text-[#FA8420] mx-auto mb-2" />
				Generating your climbing route...
			</div>
		);
	}

	if (error) {
		return (
			<div className="text-center py-12">
				<p className="text-red-600 mb-4">{error}</p>
				<Button
					onClick={onRestart}
					className="bg-[#FA8420] text-white hover:bg-[#e26e12]"
				>
					Retry
				</Button>
			</div>
		);
	}

	return (
		<>
			<div className="flex flex-col items-center gap-6 mt-3 w-full">
				<h2 className="text-xl md:text-2xl font-bold text-[#5f6b80] text-center px-4">
					Your Path to the Top
				</h2>

				{/* biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
				<div
					className="relative w-full aspect-[47/50]"
					onClick={() => setIsZoomed(true)}
				>
					<Image
						src={imageUrl}
						alt="Climbing Wall"
						fill
						className=" object-contain rounded-lg"
					/>

					{overlaySvg && (
						<div
							className="absolute top-0 left-0 w-full h-full pointer-events-none"
							// biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
							dangerouslySetInnerHTML={{ __html: overlaySvg }}
						/>
					)}
				</div>
			</div>{" "}
			{/* end of image container */}
			<div className="mt-4">
				<Button
					variant="outline"
					onClick={regenerateRoute}
					className="flex items-center gap-2 text-[#FA8420] border-[#FA8420] hover:bg-[#fff3e8]"
				>
					<RefreshCcw className="w-4 h-4" />
					Generate Another Route
				</Button>
			</div>
			<div className="bg-white rounded-xl p-4 shadow-md w-full max-w-lg">
				<div className="bg-white rounded-xl p-4 shadow-md w-full max-w-lg">
					<h2 className="text-lg font-bold text-[#FA8420] mb-2">
						Climbing Instructions
					</h2>
					<pre className="whitespace-pre-wrap text-sm text-[#5f6b80]">
						{instructions}
					</pre>
				</div>

				<div className="flex flex-col sm:flex-row gap-4 mt-4">
					<Button
						onClick={onRestart}
						className="bg-[#FA8420] text-white hover:bg-[#e26e12]"
					>
						Upload Another
					</Button>
					<Button
						onClick={() => router.push("/home/gallery")}
						className="bg-blue-500 text-white hover:bg-blue-600"
					>
						Save to Gallery
					</Button>
				</div>
			</div>
			{isZoomed && (
				// biome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
				<div
					className="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center cursor-zoom-out overflow-auto"
					onClick={() => setIsZoomed(false)}
				>
					<div className="relative w-[90vw] max-w-[500px] aspect-[3/4]">
						<Image
							src={imageUrl}
							alt="Zoomed Wall"
							fill
							className="object-contain"
						/>
						{overlaySvg && (
							<div
								className="absolute inset-0 pointer-events-none"
								// biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
								dangerouslySetInnerHTML={{ __html: overlaySvg }}
							/>
						)}
					</div>
				</div>
			)}
		</>
	);
}
