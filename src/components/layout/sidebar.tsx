"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Button } from "../ui/button";

export default function AppSidebar() {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<>
			{/* Hamburger Button */}
			<Button
				onClick={() => setIsOpen(!isOpen)}
				className="absolute top-4 left-4 z-50 p-2 rounded-lg bg-gray-200 hover:bg-gray-300"
			>
				{isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
			</Button>

			{/* Sidebar Panel */}
			<div
				className={`fixed left-0 top-0 h-full w-64 bg-gray-900 text-white p-6 transition-transform ${
					isOpen ? "translate-x-0" : "-translate-x-full"
				}`}
			>
				<h2 className="text-xl font-semibold mb-4">Menu</h2>
				<ul className="space-y-4">
					<li>
						<Link
							href="/home/upload-images"
							className="block hover:text-gray-300"
						>
							Upload Image
						</Link>
					</li>
					<li>
						<Link
							href="/home/wall-images"
							className="block hover:text-gray-300"
						>
							My Climbing Walls
						</Link>
					</li>
					<li>
						<Link href="/home/profile" className="block hover:text-gray-300">
							Profile
						</Link>
					</li>
				</ul>
			</div>
		</>
	);
}
