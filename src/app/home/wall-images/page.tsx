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
	const [inputText, setInputText] = useState("");

	useEffect(() => {
		async function fetchLatestImage() {
			const { data, error } = await supabase.storage
				.from("image-uploads")
				.list("uploads");

			if (error) {
				console.error("Error fetching images:", error);
				setLoading(false);
				return;
			}

			if (data.length > 0) {
				const latestFile = data[data.length - 1];
				const publicUrl = supabase.storage
					.from("image-uploads")
					.getPublicUrl(`uploads/${latestFile.name}`);

				setImage({
					url: publicUrl.data.publicUrl, // Fixed .data.publicUrl issue
					name: latestFile.name,
				});
			} else {
				setImage(null);
			}

			setLoading(false);
		}
		fetchLatestImage();
	}, []);

	const handleDelete = async () => {
		if (!image) return;
		const { error } = await supabase.storage
			.from("image-uploads")
			.remove([image.name]);

		if (error) {
			console.error("Error deleting image:", error);
			return;
		}

		setImage(null);
		setMenuOpen(false);
	};

	const handleRename = async () => {
		alert("Rename functionality will be implemented later.");
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
									onClick={handleRename}
									className="w-full flex items-center justify-center px-3 py-1 hover:bg-gray-200"
								>
									<Pencil className="w-5 h-5 text-gray-700" />
								</Button>
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
						height={256}
						className="w-full h-64 object-cover rounded-lg mt-2"
					/>

					<textarea
						className="mt-4 w-full border rounded-md p-2 text-gray-700 resize-none"
						rows={3}
						placeholder="Enter any question or additional info..."
						value={inputText}
						onChange={(e) => setInputText(e.target.value)}
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
