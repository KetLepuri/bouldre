"use client";

import { useState } from "react";
import { uploadImage } from "@/lib/supabase";

export default function UploadPage() {
	const [file, setFile] = useState<File | null>(null);
	const [uploading, setUploading] = useState(false);
	const [latestUploads, setLatestUploads] = useState<string[]>([]);

	const handleUpload = async () => {
		if (!file) {
			alert("Please select or take a photo.");
			return;
		}

		setUploading(true);

		try {
			const { url } = await uploadImage(file);
			setLatestUploads((prev) => [url, ...prev]); // Update latest uploads list
		} catch (error) {
			alert("Upload failed. Check console for details.");
			console.error("Upload Error:", error);
		}

		setUploading(false);
	};

	return (
		<div className="p-6">
			<h1 className="text-2xl font-bold">Upload or Take a Picture</h1>

			{/* Camera & File Upload Input */}
			<input
				type="file"
				accept="image/*"
				capture="environment" // Opens the back camera by default
				onChange={(e) => setFile(e.target.files?.[0] || null)}
				className="mb-4"
			/>

			{/* Upload Button */}
			<button
				onClick={handleUpload}
				disabled={uploading}
				className="mt-2 p-2 bg-blue-500 text-white rounded"
			>
				{uploading ? "Uploading..." : "Upload"}
			</button>

			{/* Latest Uploads */}
			{latestUploads.length > 0 && (
				<div className="mt-6">
					<h2 className="text-xl font-bold mb-2">Latest Uploads</h2>
					<div className="grid grid-cols-3 gap-4">
						{latestUploads.map((url, index) => (
							<img key={index} src={url} alt={`Upload ${index}`} className="w-32 h-32 rounded shadow" />
						))}
					</div>
				</div>
			)}
		</div>
	);
}
