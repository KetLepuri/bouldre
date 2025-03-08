"use client";

import { useEffect, useState } from "react";

export default function GalleryPage() {
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/images")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setImages(data);
        }
        setLoading(false);
      });
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Uploaded Climbing Wall Images</h1>
      {loading ? (
        <p>Loading images...</p>
      ) : images.length > 0 ? (
        <div className="grid grid-cols-3 gap-4 mt-4">
          {images.map((url, index) => (
            // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
<img key={index} src={url} alt="Climbing Wall" className="w-full rounded shadow" />
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No images uploaded yet.</p>
      )}
    </div>
  );
}
