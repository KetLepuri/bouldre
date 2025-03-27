"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button"; // Ensure correct import path
import {
	X,
	User,
	Mail,
	Ruler,
	Footprints,
	Hand,
	Venus,
	Mars,
} from "lucide-react";

export default function UserProfile() {
	interface UserData {
		name: string;
		email: string;
		sex: string;
		apeIndex: number;
		height: number;
		legRatio: number;
	}

	const [userData, setUserData] = useState<UserData | null>(null);
	const [isOpen, setIsOpen] = useState(false); // Toggle modal

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

	if (!userData) return <p>Loading...</p>;

	// Determine gender icon
	const genderIcon =
		userData.sex.toLowerCase() === "female" ? (
			<Venus className="w-5 h-5bg-gradient-to-b from-orange-100 to-purple-300" />
		) : (
			<Mars className="w-5 h-5bg-gradient-to-b from-orange-100 to-purple-300" />
		);

	return (
		<>
			{/* Profile Icon Button */}
			<Button
				onClick={() => setIsOpen(!isOpen)}
				className="absolute top-4 right-4 z-50 p-2 rounded-lg bg-gradient-to-b from-orange-100 to-purple-300 text-white"
			>
				<User className="w-6 h-6" />
			</Button>

			{/* User Profile Modal */}
			{isOpen && (
				<div className="fixed inset-0 flex items-center justify-center z-50 bg-white bg-opacity-50">
					<div className="bg-white h-full rounded-lg shadow-lg w-96 relative overflow-hidden">
						{/* Header with Orange Gradient */}
						<div className="bg-gradient-to-b from-orange-100 to-purple-300 p-6 text-center">
							<div className="w-20 h-20 bg-white rounded-full mx-auto flex items-center justify-center shadow-lg">
								<User className="w-12 h-12 gradient-to-b from-orange-100 to-purple-300" />
							</div>
							<h1 className="text-xl font-bold text-white mt-3 ">
								{userData.name}
							</h1>
						</div>

						{/* Close Button */}
						<Button
							onClick={() => setIsOpen(false)}
							className="absolute top-4 right-4 text-white"
						>
							<X className="w-6 h-6" />
						</Button>

						{/* User Info List */}
						<div className="p-6 space-y-4">
							<div className="flex items-center space-x-3 border-b pb-2">
								<User className="w-5 h-5 bg-gradient-to-b from-orange-100 to-purple-300" />
								<p className="text-gray-700">{userData.name}</p>
							</div>
							<div className="flex items-center space-x-3 border-b pb-2">
								<Mail className="w-5 h-5 bg-gradient-to-b from-orange-100 to-purple-300" />
								<p className="text-gray-700">{userData.email}</p>
							</div>
							<div className="flex items-center space-x-3 border-b pb-2">
								{genderIcon}
								<p className="text-gray-700">{userData.sex}</p>
							</div>
							<div className="flex items-center space-x-3 border-b pb-2">
								<Hand className="w-5 h-5 bg-gradient-to-b from-orange-100 to-purple-300" />
								<p className="text-gray-700">Ape Index: {userData.apeIndex}</p>
							</div>
							<div className="flex items-center space-x-3 border-b pb-2">
								<Ruler className="w-5 h-5 bg-gradient-to-b from-orange-100 to-purple-300" />
								<p className="text-gray-700">Height: {userData.height} cm</p>
							</div>
							<div className="flex items-center space-x-3">
								<Footprints className="w-5 h-5bg-gradient-to-b from-orange-100 to-purple-300" />
								<p className="text-gray-700">Leg Ratio: {userData.legRatio}</p>
							</div>
						</div>

						{/* Edit Profile Button */}
						<div className="p-4">
							<Button className="w-full bg-gradient-to-b from-orange-100 to-purple-300 text-white text-lg py-2 rounded-lg">
								Edit Profile
							</Button>
						</div>
					</div>
				</div>
			)}
		</>
	);
}
