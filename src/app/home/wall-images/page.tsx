"use client";

import { useEffect, useState } from "react";
import supabase from "@/lib/supabase";
import { Loader2, MoreVertical, ArrowLeft, Pencil, Trash2 } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function WallImagesPage() {
	const router = useRouter();
	const [image, setImage] = useState<{ url: string; name: string } | null>(
		null,
	);
	const [loading, setLoading] = useState(true);
	const [menuOpen, setMenuOpen] = useState(false);

	// 🔥 Fetch latest image with auto-refresh
	const fetchLatestImage = async () => {
		const { data, error } = await supabase.storage
			.from("image-uploads")
			.list("uploads", {
				limit: 100,
			});

		if (error) {
			console.error("Error fetching images:", error);
			setLoading(false);
			return;
		}

		const validFiles = data.filter(
			(file) => file.name && !file.name.includes("emptyFolderPlaceholder"),
		);

		if (validFiles.length > 0) {
			const latestFile = validFiles[validFiles.length - 1]; // Get the most recent image
			const publicUrl = supabase.storage
				.from("image-uploads")
				.getPublicUrl(`uploads/${latestFile.name}`);

			setImage({
				url: publicUrl.data.publicUrl, // ✅ Fixed `.data.publicUrl` issue
				name: latestFile.name,
			});
		} else {
			setImage(null);
		}

		setLoading(false);
	};

	// 🛠 Auto-refresh when Supabase updates
	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		fetchLatestImage();
		const subscription = supabase
			.channel("image-uploads")
			.on(
				"postgres_changes",
				{ event: "*", schema: "public", table: "image-uploads" },
				fetchLatestImage,
			)
			.subscribe();

		return () => {
			supabase.removeChannel(subscription);
		};
	}, []);

	// 🗑 Fix Delete Functionality
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

	return (
		<div className="flex flex-col items-center min-h-screen bg-gray-100 p-6 relative">
			{/* Back Button */}
			<Button
				onClick={() => router.back()}
				className="absolute top-4 left-4 text-gray-700"
			>
				<ArrowLeft className="w-6 h-6" />
			</Button>

			<h1 className="text-xl font-bold text-gray-900 text-center mt-10">
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
						<p className="text-gray-600 font-semibold">{image.name}</p>
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

					<Image
						src={image.url}
						alt="Climbing Wall"
						width={500}
						height={300}
						style={{ width: "auto", height: "auto" }}
						className="rounded-lg shadow-md"
						priority
					/>

					<Button
						size="lg"
						variant="default"
						className="w-full bg-green-700 hover:bg-green-500 text-white mt-4"
					>
						Generate your path
					</Button>
				</div>
			) : (
				<p className="text-gray-500 mt-6">No uploaded images found.</p>
			)}
		</div>
	);
}
