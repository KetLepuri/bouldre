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
	const [formData, setFormData] = useState({
		name: "",
		width: "",
		height: "",
		holdHandNumber: "",
		holdFootNumber: "",
		holdType: "",
		wallInclination: "",
	});
	const [isSubmitted, setIsSubmitted] = useState(false);
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

			setImage({
				url: publicUrl.data.publicUrl,
				name: latestFile.name,
			});
		} else {
			setImage(null);
		}

		setLoading(false);
	};

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		fetchLatestImage();
	}, []);

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
	) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		const userId = localStorage.getItem("userId");
		if (!userId) {
			alert("User ID not found. Please log in again.");
			return;
		}

		const wallId = `wall-${Date.now()}`; // ✅ Create wall ID

		const payload = {
			id: wallId, // ✅ include it
			...formData,
			user_id: userId,
			created_at: new Date(),
		};

		const res = await fetch("/api/wall-details", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(payload),
		});

		if (res.ok) {
			setIsSubmitted(true);
			localStorage.setItem("wallId", wallId); // ✅ store for next step
			alert("Wall details saved successfully!");
		} else {
			const errorData = await res.json();
			alert(
				`Failed to save wall details: ${errorData.error || "Unknown error"}`,
			);
		}
	};

	// 🗑 Handle Delete Image
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
			const wallId = localStorage.getItem("wallId");

			if (!userId || !wallId) {
				alert("User ID or Wall ID not found. Please complete all steps.");
				setGenerating(false);
				return;
			}

			//  1. DOWNLOAD IMAGE FILE AND SEND TO PYTHON
			const imageRes = await fetch(image.url);
			const imageBlob = await imageRes.blob();
			const formData = new FormData();
			formData.append("file", imageBlob, image.name);

			const detectRes = await fetch("http://localhost:8000/detect/", {
				method: "POST",
				body: new URLSearchParams({
				  image_url: image.url,
				}),
			  });

			const holdData = await detectRes.json();
			console.log(" Detected holds from Python:", holdData);

			if (!detectRes.ok || !holdData.holds?.length) {
				throw new Error("No holds detected in the image.");
			}

			//  2. STORE HOLDS IN PINECONE VIA NEXT.JS API
			const storeRes = await fetch("/api/store-holds", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ userId, wallId, holds: holdData.holds }),
			});
			if (!storeRes.ok) {
				throw new Error("Failed to store holds.");
			}

			await new Promise((resolve) => setTimeout(resolve, 1500));

			const userParams = JSON.parse(localStorage.getItem("userParams") || "{}");

			const generateRes = await fetch("/api/generate-path", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ userId, wallId, userParams }),
			});

			const pathData = await generateRes.json();
			console.log(" Generated path:", pathData);

			if (generateRes.ok) {
				localStorage.setItem("aiGeneratedPath", JSON.stringify(pathData));
				router.push(
					`/home/path-images?imageUrl=${encodeURIComponent(image.url)}`,
				);
			} else {
				alert(pathData.error || "Failed to generate path.");
			}
		} catch (error) {
			console.error(" Error generating path:", error);
			alert("Something went wrong. Please try again.");
		} finally {
			setGenerating(false);
		}
	};

	return (
		<div className="flex flex-col items-center min-h-screen bg-gray-100 p-4 sm:p-6 md:p-8">
			{/* Back Button */}
			<Button
				onClick={() => router.back()}
				className="absolute top-4 left-4 text-gray-700"
			>
				<ArrowLeft className="w-6 h-6" />
			</Button>

			<h1 className="text-lg sm:text-xl font-bold text-gray-900 text-center mt-10">
				Uploaded Climbing Wall
			</h1>

			{loading ? (
				<div className="flex items-center justify-center mt-6">
					<Loader2 className="animate-spin w-6 h-6 text-purple-600" />
				</div>
			) : image ? (
				<div className="mt-6 flex flex-col items-center w-full max-w-md bg-white p-4 rounded-lg shadow-lg">
					{/* Image & Menu */}
					<div className="relative w-full flex justify-between items-center">
						<p className="text-gray-600 font-semibold text-sm sm:text-base">
							{image.name}
						</p>
						<Button
							onClick={() => setMenuOpen(!menuOpen)}
							className="text-gray-700"
						>
							<MoreVertical className="w-5 h-5" />
						</Button>
						{menuOpen && (
							<div className="absolute right-0 mt-2 w-24 bg-white shadow-md rounded-lg text-sm">
								<Button
									onClick={handleDelete}
									className="w-full flex items-center justify-center px-3 py-1 text-red-500 hover:bg-gray-200"
								>
									<Trash2 className="w-5 h-5" />
								</Button>
							</div>
						)}
					</div>
					{/* Adjust image width for mobile */}
					<Image
						src={image.url}
						alt="Climbing Wall"
						width={500}
						height={300}
						className="rounded-lg shadow-md w-full max-w-[300px] sm:max-w-[400px]"
						priority
					/>
					Wall Details Form
					{!isSubmitted ? (
						<form onSubmit={handleSubmit} className="mt-4 w-full">
							<input
								type="text"
								name="name"
								placeholder="Wall Name"
								required
								onChange={handleChange}
								className="w-full p-2 border rounded mb-2 text-sm"
							/>
							<input
								type="number"
								name="width"
								placeholder="Width (cm)"
								required
								onChange={handleChange}
								className="w-full p-2 border rounded mb-2 text-sm"
							/>
							<input
								type="number"
								name="height"
								placeholder="Height (cm)"
								required
								onChange={handleChange}
								className="w-full p-2 border rounded mb-2 text-sm"
							/>
							<input
								type="number"
								name="holdHandNumber"
								placeholder="Hand Holds"
								required
								onChange={handleChange}
								className="w-full p-2 border rounded mb-2 text-sm"
							/>
							<input
								type="number"
								name="holdFootNumber"
								placeholder="Foot Holds"
								required
								onChange={handleChange}
								className="w-full p-2 border rounded mb-2 text-sm"
							/>
							<input
								type="text"
								name="holdType"
								placeholder="Hold Types"
								required
								onChange={handleChange}
								className="w-full p-2 border rounded mb-2 text-sm"
							/>
							<input
								type="text"
								name="wallInclination"
								placeholder="Wall Inclination (°)"
								required
								onChange={handleChange}
								className="w-full p-2 border rounded mb-2 text-sm"
							/>
							<Button
								type="submit"
								className="w-full bg-blue-600 text-white p-2 rounded text-sm"
							>
								Save Wall Details
							</Button>
						</form>
					) : (
						<Button
							size="lg"
							variant="default"
							className="w-full bg-green-700 hover:bg-green-500 text-white mt-4"
							onClick={handleGeneratePath}
							disabled={generating}
						>
							{generating ? "Generating Path..." : "Generate your path"}
						</Button>
					)}
				</div>
			) : (
				<p className="text-gray-500 mt-6">No uploaded images found.</p>
			)}
		</div>
	);
}
