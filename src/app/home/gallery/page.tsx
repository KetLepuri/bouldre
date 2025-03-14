"use client";

import Image from "next/image";
import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function GalleryPage() {
	const { data: images, error } = useSWR("/api/gallery", fetcher, {
		refreshInterval: 5000, // Auto-refresh every 5s
	});

	if (error)
		return <p className="text-center text-red-500">Failed to load images</p>;
	if (!images) return <p className="text-center text-gray-500">Loading...</p>;

	return (
		<div className="p-6">
			<h1 className="text-2xl font-bold text-gray-900 mb-4 text-center">
				Gallery
			</h1>

			{images.length > 0 ? (
				<div className="grid grid-cols-2 md:grid-cols-3 gap-4">
					{images.map((url: string, index: number) => (
						// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
						<div key={index} className="rounded shadow-lg overflow-hidden">
							<Image
								src={url}
								alt={`Image ${index}`}
								width={300}
								height={300}
								className="w-full h-48 object-cover rounded-lg"
							/>
						</div>
					))}
				</div>
			) : (
				<p className="text-gray-500 text-center mt-6">No images available.</p>
			)}
		</div>
	);
}
