"use client";

import { useState } from "react";
import { uploadImage } from "@/lib/supabase";
import Image from "next/image";
import { UploadCloud, Camera, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

type StepUploadProps = {
	onUploadComplete: (data: { imageUrl: string; wallId: string; layout: string }) => void;
	showModal: (title: string, message: string) => void;
  };

export default function StepUpload({
	onUploadComplete,
	showModal,
}: StepUploadProps) {
	const [uploading, setUploading] = useState(false);
	const [imageUrl, setImageUrl] = useState<string | null>(null);
	const [layout, setLayout] = useState("layout_12x12_gym");
	const userId =
		typeof window !== "undefined" ? localStorage.getItem("userId") : null;
	

	const handleFileChange = async (file: File | null) => {
	
		if (!file || !userId) {
			showModal("Upload Failed", "Missing user or file");
			return;
		}

		setUploading(true);
		try {
			const formData = new FormData();
			formData.append("file", file);
			formData.append("user_id", userId);
			formData.append("layout_id", layout);
			formData.append("name", "My Wall");

			const res = await fetch("/api/uploads", {
				method: "POST",
				body: formData,
			});

			if (!res.ok) {
				throw new Error("Upload failed");
			}

			const data = await res.json();
			const url = data.imageUrl;
			const wallId = data.wall.id;

			setImageUrl(url);
			onUploadComplete({
				imageUrl: url,
				layout,
				wallId,
			  });
		} catch (error) {
			console.error("Upload Error:", error);
			showModal(
				"Upload Failed",
				"There was a problem uploading your wall image. Please try again.",
			);
		}
		setUploading(false);
	};

	return (
		<div className="w-full flex flex-col items-center space-y-4 mt-15">
			<h1 className="text-xl md:text-2xl font-bold text-[#5f6b80] text-center px-4">
				Upload or take a photo of the wall you wanna climb{" "}
				<Image
					src="/images/hold.png"
					alt="Wall Icon"
					width={25}
					height={25}
					className="ml-2 inline-block"
				/>
			</h1>

			<p className="text-[#7888A3] text-sm md:text-base text-center">
				Just one clear shot of the climbing wall, please.
			</p>

			{/* Layout Dropdown */}
			<div className="w-full max-w-md">
				<label
					htmlFor="layout"
					className="block text-sm font-medium text-[#5f6b80] mb-1"
				>
					Select Wall Layout:
				</label>
				<select
					id="layout"
					value={layout}
					onChange={(e) => setLayout(e.target.value)}
					className="w-full border border-gray-300 rounded px-3 py-2 text-[#5f6b80] shadow-sm"
				>
					<option value="layout_12x12_gym">12x12 Original</option>
					<option value="layout_16x12_gym">16x12 Original</option>
					<option value="layout_8x12_home">8x12 Homewall</option>
				</select>
			</div>

			{/* Upload Box */}
			<div className="relative w-full max-w-md h-72 border-2 border-dashed border-[#5f6b80] rounded-xl flex items-center justify-center px-2">
				{uploading ? (
					<Loader2 className="w-8 h-8 text-[#7888A3] animate-spin" />
				) : imageUrl ? (
					<Image
						src={imageUrl}
						alt="Uploaded"
						fill
						className="object-cover rounded-xl"
					/>
				) : (
					<div className="text-[#7888A3] text-center">
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

			<p className="text-[#7888A3] text-center">or</p>

			{/* Take Photo Button */}
			<label className="block w-full max-w-md cursor-pointer">
				<input
					type="file"
					accept="image/*"
					capture="environment"
					onChange={(e) => handleFileChange(e.target.files?.[0] || null)}
					className="hidden"
				/>
				<div className="w-full flex items-center justify-center bg-[#FA8420] hover:bg-[#fa9b20] text-white p-3 rounded-2xl font-medium shadow-md">
					<Camera className="w-5 h-5 mr-2" />
					Take Photo
				</div>
			</label>
		</div>
	);
}
