"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function HomePage() {
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const res = await fetch("/api/images");
        if (!res.ok) throw new Error("Failed to fetch images");

        const data = await res.json();
        if (Array.isArray(data)) {
          setImages(data.slice(0, 3)); // Show only the latest 3 images
        }
      } catch (err) {
        setError("Error loading images. Please try again.");
        console.error("Image Fetch Error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white p-6">
      <h1 className="text-4xl font-bold mb-6">Welcome Bouldre, AI-Powered Climbing Assistant</h1>
      <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
        Upload and explore AI-recommended climbing routes.
      </p>

      {/* 🔹 Navigation Buttons */}
      <div className="flex gap-4 mb-8">
        <Link
          href="/upload-images"
          className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Upload Image
        </Link>
        <Link
          href="/gallery"
          className="px-6 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          View Gallery
        </Link>
      </div>

      {/* 🔹 Display Latest Uploaded Images */}
      <h2 className="text-2xl font-semibold mb-4">Latest Uploads</h2>
      {loading ? (
        <p>Loading images...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : images.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {images.map((url, index) => (
            // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
            <div key={index} className="rounded shadow-lg overflow-hidden">
              <img
                src={url}
                alt={`Climbing Wall ${index + 1}`}
                className="w-40 h-40 object-cover rounded"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No images uploaded yet.</p>
      )}
    </div>
  );
}
