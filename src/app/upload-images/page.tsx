"use client";

import { useState } from "react";
import { uploadImage } from "@/lib/supabase";

export default function UploadPage() {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [imageUrl, setImageUrl] = useState("");

  const handleUpload = async () => {
    if (!file) {
      alert("Please select or take a photo.");
      return;
    }

    setUploading(true);

    try {
      const { url } = await uploadImage(file);
      setImageUrl(url);
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
        capture="environment"  // Opens the back camera by default
        onChange={(e) => setFile(e.target.files?.[0] || null)}
        className="mb-4"
      />

      {/* biome-ignore lint/a11y/useButtonType: <explanation> */}
<button
        onClick={handleUpload}
        disabled={uploading}
        className="mt-2 p-2 bg-blue-500 text-white rounded"
      >
        {uploading ? "Uploading..." : "Upload"}
      </button>

      {imageUrl && (
        <img src={imageUrl} alt="Uploaded" className="mt-4 w-64 rounded shadow" />
      )}
    </div>
  );
}
