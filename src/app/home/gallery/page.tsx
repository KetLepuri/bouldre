"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import useSWR from "swr";
import {
	FolderOpen,
	ImageIcon,
	X,
	Trash2,
	Pencil,
	Download,
	ChevronLeft,
	ChevronRight,
	ArrowLeft,
} from "lucide-react";
import supabase from "@/lib/supabase";
import { useRouter } from "next/navigation";
import Link from "next/link";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function GalleryPage() {
	const {
		data: images,
		error,
		mutate,
	} = useSWR("/api/gallery", fetcher, {
		refreshInterval: 5000,
	});

	const [selectedFolder, setSelectedFolder] = useState<string | null>(null);
	const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(
		null,
	);
	const router = useRouter();

	if (error)
		return <p className="text-center text-red-500">Failed to load images</p>;
	if (!images) return <p className="text-center text-gray-500">Loading...</p>;

	const folders = [
		{
			title: "All Uploads",
			items: images,
		},
	];

	const selectedImage =
		typeof selectedImageIndex === "number" && selectedFolder
			? folders.find((f) => f.title === selectedFolder)?.items[
					selectedImageIndex
				] || null
			: null;

	const closeModal = () => {
		setSelectedImageIndex(null);
	};

	const handleDelete = async () => {
		if (!selectedImage) return;
		await supabase.storage
			.from("image-uploads")
			.remove([`uploads/${selectedImage.name}`]);
		mutate();
		closeModal();
	};

	const prevImage = () => {
		if (typeof selectedImageIndex === "number" && selectedImageIndex > 0) {
			setSelectedImageIndex(selectedImageIndex - 1);
		}
	};

	const nextImage = () => {
		const currentFolder = folders.find((f) => f.title === selectedFolder);
		if (
			typeof selectedImageIndex === "number" &&
			currentFolder &&
			selectedImageIndex < currentFolder.items.length - 1
		) {
			setSelectedImageIndex(selectedImageIndex + 1);
		}
	};

	return (
		<div className="p-6 max-w-6xl mx-auto">
			<div className="relative flex justify-between items-center mb-6">
				<Button
					variant="ghost"
					className="w-10 h-10 p-0 flex items-center justify-center rounded-xl bg-[#F3EDE9] text-[#FA8420] shadow-md hover:bg-[#FA8420] hover:text-white"
					onClick={() => router.push("/home/climb")}
				>
					<ArrowLeft className="w-5 h-5" />
				</Button>
				<h1 className="text-2xl font-bold text-[#5f6b80] text-center flex-1">
					 Wall Gallery
				</h1>
				<div className="w-10" />
			</div>

			{!selectedFolder && (
				<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
					{folders.map((folder, idx) => (
						<div
							// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
							key={idx}
							className="bg-white rounded-xl shadow-md overflow-hidden border border-[#e2e8f0]"
						>
							{/* biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
							<div
								className="relative h-40 cursor-pointer"
								onClick={() => setSelectedFolder(folder.title)}
							>
								{folder.items[0]?.url ? (
									<Image
										src={folder.items[0].url}
										alt="Folder preview"
										fill
										className="object-cover w-full h-full"
									/>
								) : (
									<div className="flex items-center justify-center w-full h-full bg-[#F3EDE9]">
										<FolderOpen className="text-gray-400 w-8 h-8" />
									</div>
								)}
							</div>
							<div className="p-4 flex justify-between items-center">
								<div>
									<h2 className="text-md font-semibold text-[#5f6b80]">
										{folder.title}
									</h2>
									<p className="text-xs text-[#94a3b8]">
										{folder.items.length} items
									</p>
								</div>
								<Button
									variant="ghost"
									className="text-[#FA8420] hover:text-[#e26e12]"
									onClick={() => setSelectedFolder(folder.title)}
								>
									<ImageIcon className="w-5 h-5" />
								</Button>
							</div>
						</div>
					))}
				</div>
			)}

			{selectedFolder && (
				<div>
					<div className="flex justify-between items-center mb-4">
						<h2 className="text-lg font-semibold text-[#5f6b80]">
							{selectedFolder}
						</h2>
						<Button
							variant="ghost"
							onClick={() => setSelectedFolder(null)}
							className="text-[#FA8420]"
						/>
					</div>
					<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
						{folders
							.find((f) => f.title === selectedFolder)
							?.items.map((img: { url: string; name: string }, i: number) => (
								// biome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
								<div
									// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
									key={i}
									className="relative aspect-[3/4] rounded-xl overflow-hidden shadow-md cursor-pointer"
									onClick={() => setSelectedImageIndex(i)}
								>
									<Image
										src={img.url}
										alt={`Image ${i}`}
										fill
										className="object-cover hover:scale-105 transition-transform"
									/>
								</div>
							))}
					</div>
				</div>
			)}

			{selectedImage && (
				<div className="fixed inset-0 z-50 bg-[#F3EDE9] flex flex-col justify-between">
					<div className="flex items-center justify-between p-4 text-[#5f6b80]">
						<div className="text-sm">
							{new Date().toLocaleDateString()} –{" "}
							{new Date().toLocaleTimeString([], {
								hour: "2-digit",
								minute: "2-digit",
							})}
						</div>
						<Button variant="ghost" className="text-[#5f6b80]" onClick={closeModal}>
							<X className="w-6 h-6" />
						</Button>
					</div>

					<div className="relative flex-1 flex items-center justify-center overflow-hidden">
						<div className="relative w-full h-full max-h-[90vh]">
							<Image
								src={selectedImage.url}
								alt="Selected"
								fill
								className="object-contain"
							/>
						</div>
						<Button
							variant="ghost"
							className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/50 hover:bg-white/70 text-[#FA8420] p-2 rounded-full shadow-md"
							onClick={prevImage}
						>
							<ChevronLeft className="w-7 h-7" />
						</Button>

						<Button
							variant="ghost"
							className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/50 hover:bg-white/70 text-[#FA8420] p-2 rounded-full shadow-md"
							onClick={nextImage}
						>
							<ChevronRight className="w-7 h-7" />
						</Button>
					</div>

					<div className="flex items-center justify-around bg-[#F3EDE9] py-4 border-t border-gray-300 text-white">
						<Link
							href={selectedImage.url}
							download
							target="_blank"
							rel="noopener noreferrer"
						>
							<Button variant="ghost" className=" text-[#5f6b80] cursor-pointer ml-2 hover:text-[#FA8420]">
								<Download className="w-8 h-8" />
							</Button>
						</Link>
						<Button
							variant="ghost"
							className=" text-[#5f6b80] cursor-pointer ml-2 hover:text-[#FA8420]"
							onClick={handleDelete}
						>
							<Trash2 className="w-8 h-8" />
						</Button>
					</div>
				</div>
			)}
		</div>
	);
}
