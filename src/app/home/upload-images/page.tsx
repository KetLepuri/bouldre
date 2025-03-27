"use client";

import { useState } from "react";
import { uploadImage } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { Camera, UploadCloud, Loader2, Menu, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Sidebar from "@/components/layout/sidebar";
import AppSidebar from "@/components/layout/sidebar";
import UserProfile from "../profile/page";

export default function UploadPage() {
	const router = useRouter();
	const [file, setFile] = useState<File | null>(null);
	const [uploading, setUploading] = useState(false);
	const [imageUrl, setImageUrl] = useState<string | null>(null);

	const handleUpload = async () => {
		if (!file) {
			alert("Please select or take a photo.");
			return;
		}

		setUploading(true);

		try {
			const { url } = await uploadImage(file, "wall-images");
			setImageUrl(url);
		} catch (error) {
			alert("Upload failed. Check console for details.");
			console.error("Upload Error:", error);
		}

		setUploading(false);
	};

	return (
		<div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
			{/* Header */}
			<div className="absolute top-4 w-full flex justify-between  bg-gray-200">
			<div className="absolute top-2 left-4">
				<AppSidebar />
			</div>
			<div className="absolute top-2 right-4">
				<UserProfile />
			</div>
			</div>

			{/* Title */}
			<h1 className="text-2xl font-semibold text-gray-900 text-center">
				Your Climbing Wall Photo 🧗‍♂️
			</h1>
			<p className="text-gray-600 text-center mt-2">
				Upload or take a photo of the wall you wanna climb.
			</p>

			{/* File Upload Section */}
			<div className="relative w-full max-w-sm border-2 border-gray-300 border-dashed rounded-lg p-6 flex flex-col items-center justify-center mt-6">
				{imageUrl ? (
					<Image
						src={imageUrl}
						alt="Uploaded Image"
						width={300}
						height={300}
						style={{ width: "auto", height: "auto" }}
						className="w-full h-40 object-cover rounded-lg shadow-md"
					/>
				) : (
					<>
						<UploadCloud className="w-10 h-10 text-gray-400" />
						<p className="text-gray-500 mt-2">Select a file</p>
					</>
				)}
				<label className="absolute inset-0 w-full h-full cursor-pointer">
					<input
						type="file"
						accept="image/*"
						onChange={(e) => setFile(e.target.files?.[0] || null)}
						className="hidden"
						style={{ width: "auto", height: "auto" }}
					/>
				</label>
			</div>

			<p className="text-gray-500 my-4">or</p>

			{/* Camera Capture Button */}
			<label className="w-full max-w-sm">
				<input
					type="file"
					accept="image/*"
					capture="environment"
					className="hidden"
					onChange={(e) => setFile(e.target.files?.[0] || null)}
				/>
				<div className="w-full flex items-center justify-center  bg-gradient-to-b from-orange-100 to-purple-300 text-white p-2 rounded-lg cursor-pointer transition">
					<Camera className="w-5 h-5 mr-2" />
					Open Camera & Take Photo
				</div>
			</label>

			{/* Upload Button */}
			<Button
				onClick={handleUpload}
				disabled={!file || uploading}
				className={`w-50 max-w-sm mt-4 p-2 text-white font-bold rounded-lg ${
					file
						? " bg-gradient-to-b from-orange-100 to-purple-300"
						: "bg-gray-300 cursor-not-allowed"
				}`}
			>
				{uploading ? (
					<Loader2 className="animate-spin w-5 h-5 mr-2" />
				) : (
					"Upload"
				)}
			</Button>

			{/* Continue Button */}
			<Button
				onClick={() => router.push("/home/wall-images")}
				disabled={!imageUrl}
				className={`w-40 max-w-sm mt-4 p-2 text-white font-bold rounded-lg ${
					imageUrl
						? "bg-green-700 hover:bg-green-500"
						: "bg-gray-300 cursor-not-allowed"
				}`}
			>
				Continue
			</Button>
		</div>
	);
}
