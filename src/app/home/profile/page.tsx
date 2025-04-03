// components/layout/UserProfileButton.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import {
	Button,
} from "@/components/ui/button";
import {
	User,
	X,
	Mail,
	Ruler,
	Footprints,
	Hand,
	Venus,
	Mars,
} from "lucide-react";

export default function UserProfile() {
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	const [userData, setUserData] = useState<any>(null);
	const [isOpen, setIsOpen] = useState(false);
	const modalRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const userId = localStorage.getItem("userId");
		if (!userId) return;

		async function fetchUserData() {
			const res = await fetch(`/api/user_profile?id=${userId}`);
			const data = await res.json();
			setUserData(data);
		}
		fetchUserData();
	}, []);

	useEffect(() => {
		const handleClickOutside = (e: MouseEvent) => {
			if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
				setIsOpen(false);
			}
		};
		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);

	if (!userData) return null;

	const genderIcon =
		userData.sex?.toLowerCase() === "female" ? (
			<Venus className="w-5 h-5 text-[#FA8420]" />
		) : (
			<Mars className="w-5 h-5 text-[#FA8420]" />
		);

	return (
		<>
			<Button
				onClick={() => setIsOpen(true)}
				className="w-12 h-12 p-0 flex items-center justify-center rounded-lg bg-white text-[#FA8420] shadow-md"
			>
				<User className="w-5 h-5" />
			</Button>

			{isOpen && (
				<div className="fixed inset-0 flex items-center justify-center bg-[#F3EDE9]/90 z-50">
					<div
						ref={modalRef}
						className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-md relative"
					>
						<Button
							onClick={() => setIsOpen(false)}
							className="absolute top-4 right-4 w-10 h-10 p-0 bg-white text-[#FA8420] shadow-md rounded-lg"
						>
							<X className="w-5 h-5" />
						</Button>

						<h2 className="text-xl font-bold text-center text-[#7888A3] mb-4">Your Profile</h2>
						<div className="space-y-3 text-[#7888A3]">
							<div className="flex items-center gap-2"><User className="text-[#FA8420] w-5 h-5" />{userData.name}</div>
							<div className="flex items-center gap-2"><Mail className="text-[#FA8420] w-5 h-5" />{userData.email}</div>
							<div className="flex items-center gap-2">{genderIcon}{userData.sex}</div>
							<div className="flex items-center gap-2"><Hand className="text-[#FA8420] w-5 h-5" />Ape Index: {userData.apeIndex}</div>
							<div className="flex items-center gap-2"><Ruler className="text-[#FA8420] w-5 h-5" />Height: {userData.height} cm</div>
							<div className="flex items-center gap-2"><Footprints className="text-[#FA8420] w-5 h-5" />Leg Ratio: {userData.legRatio}</div>
						</div>
					</div>
				</div>
			)}
		</>
	);
}
