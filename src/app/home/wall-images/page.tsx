"use client";

import { useEffect, useState } from "react";
import supabase from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Loader2, MoreVertical, ArrowLeft, Trash2 } from "lucide-react";
import Image from "next/image";

export default function WallImagesPage() {
	const router = useRouter();
	const [image, setImage] = useState<{ url: string; name: string } | null>(
		null,
	);
	const [loading, setLoading] = useState(true);
	const [menuOpen, setMenuOpen] = useState(false);
	const [generating, setGenerating] = useState(false);

	const fetchLatestImage = async () => {
		const { data, error } = await supabase.storage
			.from("image-uploads")
			.list("uploads", { limit: 100 });
		if (error) {
			console.error("Error fetching images:", error);
			setLoading(false);
			return;
		}
		const validFiles = data.filter(
			(file) => file.name && !file.name.includes(".emptyFolderPlaceholder"),
		);
		if (validFiles.length > 0) {
			const latestFile = validFiles[validFiles.length - 1];
			const publicUrl = supabase.storage
				.from("image-uploads")
				.getPublicUrl(`uploads/${latestFile.name}`);
			setImage({ url: publicUrl.data.publicUrl, name: latestFile.name });
		} else {
			setImage(null);
		}
		setLoading(false);
	};

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		fetchLatestImage();
	}, []);

	const handleDelete = async () => {
		if (!image) return;
		const { error } = await supabase.storage
			.from("image-uploads")
			.remove([`uploads/${image.name}`]);
		if (error) {
			console.error("Error deleting image:", error);
			return;
		}
		setImage(null);
		setMenuOpen(false);
	};

	const handleGeneratePath = async () => {
		if (!image) return;
		setGenerating(true);
		try {
			const userId = localStorage.getItem("userId");
			const wallId = `wall-${crypto.randomUUID()}`;
			localStorage.setItem("wallId", wallId);
			if (!userId || !wallId) {
				alert("User ID or Wall ID not found. Please complete all steps.");
				setGenerating(false);
				return;
			}
			const formData = new FormData();
			formData.append("image_url", image.url);
			formData.append("wall_id", wallId);
			formData.append("user_id", userId);
			const detectRes = await fetch("http://localhost:8000/detect/", {
				method: "POST",
				body: formData,
			});
			const { holds, meta, message, error } = await detectRes.json();
			if (!detectRes.ok || !holds?.length) {
				console.error("Detection error:", error || message);
				alert("Hold detection failed. Make sure the image is clear.");
				setGenerating(false);
				return;
			}
			const formattedMeta = {
				id: wallId,
				name: `Auto Wall ${wallId.slice(-4)}`,
				width: Number(meta.width),
				height: Number(meta.height),
				holdHandNumber: Number(meta.handholds),
				holdFootNumber: Number(meta.footholds),
				holdType: "auto-detected",
				wallInclination: meta.wallInclination || "unknown",
				image_url: meta.image_url,
				user_id: userId,
				created_at: new Date(),
			};
			const saveWallRes = await fetch("/api/wall-details", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(formattedMeta),
			});
			if (!saveWallRes.ok) {
				const errData = await saveWallRes.json();
				console.error("Wall save failed:", errData.error);
				alert("Wall metadata save failed.");
				setGenerating(false);
				return;
			}
			const userParams = JSON.parse(localStorage.getItem("userParams") || "{}");
			const generateRes = await fetch("/api/generate-path", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ userId, wallId, userParams }),
			});
			const pathData = await generateRes.json();
			if (!generateRes.ok || !pathData.route?.length) {
				alert(pathData.error || "Failed to generate climbing path.");
				setGenerating(false);
				return;
			}
			localStorage.setItem("aiGeneratedPath", JSON.stringify(pathData));
			router.push(
				`/home/path-images?imageUrl=${encodeURIComponent(image.url)}`,
			);
		} catch (error) {
			console.error("Error generating path:", error);
			alert("Something went wrong. Please try again.");
		} finally {
			setGenerating(false);
		}
	};

	return (
		<div className="flex flex-col items-center min-h-screen bg-[#F3EDE9] p-4 sm:p-6 md:p-8">
			<Button
				onClick={() => router.back()}
				className="absolute top-4 left-4 text-[#FA8420]"
			>
				<ArrowLeft className="w-6 h-6" />
			</Button>
			<h1 className="text-lg sm:text-xl font-bold text-[#7888A3] text-center mt-10">
				Uploaded Climbing Wall
			</h1>
			{loading ? (
				<div className="flex items-center justify-center mt-6">
					<Loader2 className="animate-spin w-6 h-6 text-[#93C7E7]" />
				</div>
			) : image ? (
				<div className="mt-6 flex flex-col items-center w-full max-w-md bg-white p-4 rounded-lg shadow-lg">
					<div className="relative w-full flex justify-between items-center">
						<p className="text-[#7888A3] font-semibold text-sm sm:text-base">
							{image.name}
						</p>
						<Button
							onClick={() => setMenuOpen(!menuOpen)}
							className="text-[#FA8420]"
						>
							<MoreVertical className="w-5 h-5" />
						</Button>
						{menuOpen && (
							<div className="absolute right-0 mt-2 w-24 bg-white shadow-md rounded-lg text-sm z-10">
								<Button
									onClick={handleDelete}
									className="w-full flex items-center justify-center px-3 py-1 text-red-500 hover:bg-gray-200"
								>
									<Trash2 className="w-5 h-5" />
								</Button>
							</div>
						)}
					</div>
					<Image
						src={image.url}
						alt="Climbing Wall"
						width={900}
						height={800}
						className="rounded-lg shadow-md w-full max-w-[300px] sm:max-w-[400px]"
						priority
					/>
					<Button
						size="lg"
						variant="default"
						className="w-full bg-[#93C7E7] hover:bg-[#7db4db] text-white mt-4"
						onClick={handleGeneratePath}
						disabled={generating}
					>
						{generating ? "Generating Path..." : "Generate your path"}
					</Button>
				</div>
			) : (
				<p className="text-[#7888A3] mt-6">No uploaded images found.</p>
			)}
		</div>
	);
}
