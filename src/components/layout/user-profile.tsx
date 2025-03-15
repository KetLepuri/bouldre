"use client";

import { useState, useEffect } from "react";
import { User } from "lucide-react";
import db from "@/lib/db";
import { users } from "@/lib/db/schema/users";
import { eq } from "drizzle-orm";
import { Button } from "../ui/button";

// Define User Type
interface UserData {
	id: string;
	name: string;
	email: string | null; // Allow `null`
	password: string;
	sex?: string | null;
	apeIndex?: number | null;
	height?: number | null;
	legRatio?: number | null;
	created_at?: Date | null;
	updated_at?: Date | null;
}

export default function UserProfile() {
	const [isOpen, setIsOpen] = useState(false);
	// const [userData, setUserData] = useState<UserData | null>(null);

	// useEffect(() => {
	// 	async function fetchUserData() {
	// 		try {
	// 			const testUserId = "12345"; // 🔴 TEMPORARY HARDCODED USER ID (Replace when adding auth)

	// 			// ✅ Use `db` and `eq()` properly
	// 			const result = await db
	// 				.select()
	// 				.from(users)
	// 				.where(eq(users.id, testUserId));

	// 			if (result.length > 0) {
	// 				setUserData(result[0]);
	// 			}
	// 		} catch (error) {
	// 			console.error("❌ Error fetching user data:", error);
	// 		}
	// 	}

	// 	fetchUserData();
	// }, []);

	return (
		<div className="relative">
			{/* User Icon */}
			<Button
				onClick={() => setIsOpen(!isOpen)}
				className="absolute top-4 right-4 p-2 rounded-lg bg-gray-200 hover:bg-gray-300"
			>
				<User className="w-6 h-6 text-gray-800" />
			</Button>

			{/* Dropdown Menu */}
			{isOpen && (
				<div className="absolute right-0 mt-10 w-56 bg-white shadow-lg rounded-lg p-4">
					<h2 className="text-lg font-semibold">Ketjona</h2>
					<p className="text-sm text-gray-600">Ketjonalepuri@gmail.com</p>
					<hr className="my-2" />
					<p className="text-sm">Height: 173 cm</p>
					<p className="text-sm">Ape Index: 80</p>
					<p className="text-sm">Leg Ratio: 60</p>
				</div>
			)}
		</div>
	);
}
