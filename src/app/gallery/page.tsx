"use client";

import { useEffect, useState } from "react";

export default function GalleryPage() {
  const [images, setImages] = useState<string[]>([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const res = await fetch("/api/gallery");
        const data = await res.json();
        if (res.ok) {
          setImages(data);
        } else {
          console.error("Error fetching images:", data.error);
        }
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };

    fetchImages();
  }, []);

  return (
    <div className="p-6">
      <div className="grid grid-cols-3 gap-4">
        {images.map((url, index) => (
          <div key={index} className="rounded shadow-lg overflow-hidden">
            <img src={url} alt={`Image ${index}`} className="w-full h-full object-cover" />
          </div>
        ))}
      </div>
    </div>
  );
}
