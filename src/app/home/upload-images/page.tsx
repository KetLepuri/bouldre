"use client";

import { useState } from "react";
import { uploadImage } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { Camera, UploadCloud, Loader2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Sidebar from "@/components/layout/sidebar";
import UserProfile from "../profile/page";

export default function UploadPage() {
	const router = useRouter();
	const [uploading, setUploading] = useState(false);
	const [imageUrl, setImageUrl] = useState<string | null>(null);

	const handleFileChange = async (file: File | null) => {
		if (!file) return;
		setUploading(true);
		try {
			const { url } = await uploadImage(file, "wall-images");
			setImageUrl(url);
		} catch (error) {
			console.error("Upload Error:", error);
			alert("Upload failed. Please try again.");
		}
		setUploading(false);
	};

	return (
		<div className="flex min-h-screen items-center justify-center bg-[#F3EDE9] px-4 py-8">
			<div className="absolute top-4 left-4 z-50">
				<Sidebar />
			</div>
			<div className="absolute top-4 right-4">
				<UserProfile />
			</div>

			<div className="bg-white rounded-2xl shadow-lg p-15 w-full max-w-md text-center">
				<h1 className="text-2xl font-bold text-[#7888A3] mb-2">
					Upload or take a photo of the wall you wanna climb 🧗‍♀️
				</h1>
				<p className="text-[#7888A3] mb-4 text-sm">
					Just one clear shot of the climbing wall, please.
				</p>

				<div className="relative w-full h-48 border-2 border-dashed border-[#93C7E7] rounded-xl flex items-center justify-center mb-4">
					{uploading ? (
						<Loader2 className="w-8 h-8 text-[#93C7E7] animate-spin" />
					) : imageUrl ? (
						<Image
							src={imageUrl}
							alt="Uploaded Image"
							fill
							className="object-cover rounded-xl"
							priority
						/>
					) : (
						<div className="text-center text-[#93C7E7]">
							<UploadCloud className="w-8 h-8 mx-auto mb-2" />
							<p>Select a file</p>
						</div>
					)}
					<label className="absolute inset-0 cursor-pointer">
						<input
							type="file"
							accept="image/*"
							onChange={(e) => handleFileChange(e.target.files?.[0] || null)}
							className="hidden"
						/>
					</label>
				</div>

				<p className="text-[#7888A3] mb-4">or</p>

				<label className="block w-full mb-4 cursor-pointer">
					<input
						type="file"
						accept="image/*"
						capture="environment"
						onChange={(e) => handleFileChange(e.target.files?.[0] || null)}
						className="hidden"
					/>
					<div className="w-full flex items-center justify-center bg-[#93C7E7] hover:bg-[#7db4db] text-white p-3 rounded-lg font-medium shadow-md">
						<Camera className="w-5 h-5 mr-2" />
						Take Photo
					</div>
				</label>

				<Button
					onClick={() => router.push("/home/wall-images")}
					disabled={!imageUrl || uploading}
					className={`w-full mt-2 p-3 font-semibold rounded-lg flex items-center justify-center shadow-md ${
						imageUrl && !uploading
							? "bg-[#FA8420] hover:bg-[#e26e12] text-white"
							: "bg-gray-300 text-white cursor-not-allowed"
					}`}
				>
					<span>Continue</span>
					<ArrowRight className="w-5 h-5 ml-2" />
				</Button>
			</div>
		</div>
	);
}
