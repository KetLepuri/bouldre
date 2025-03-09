"use client";

import { useEffect, useState } from "react";

export default function GalleryPage() {
  const [images, setImages] = useState<string[]>([]);

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

  useEffect(() => {
    fetchImages(); 
    const interval = setInterval(fetchImages, 5000); 

    return () => clearInterval(interval); 
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Gallery</h1>
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
