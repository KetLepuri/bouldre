"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Sidebar() {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<>
			{/* Toggle Button */}
			<Button
				onClick={() => setIsOpen(!isOpen)}
				className="w-12 h-12 p-0 flex items-center justify-center rounded-lg bg-white text-[#FA8420] shadow-md"
			>
				{isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
			</Button>

			{/* Sliding Sidebar */}
			<div
				className={`fixed top-0 left-0 h-full w-64 bg-white z-50 shadow-lg transition-transform duration-300 ${
					isOpen ? "translate-x-0" : "-translate-x-full"
				}`}
			>
				<div className="p-6 space-y-4 text-[#7888A3]">
					<h2 className="text-lg font-semibold">Navigation</h2>
					<ul className="space-y-2">
						<li>
							<Link href="/home/upload-images">Upload Image</Link>
						</li>
						<li>
							<Link href="/home/wall-images">My Climbing Walls</Link>
						</li>
						<li>
							<Link href="/home/profile">Profile</Link>
						</li>
					</ul>
				</div>
			</div>
		</>
	);
}
