"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function SignUpPage() {
	const router = useRouter();
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		password: "",
		sex: "",
		apeIndex: "",
		height: "",
		legRatio: "",
	});

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
	) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		const res = await fetch("/api/user_profile", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(formData),
		});

		const data = await res.json();
		if (res.ok) {
			localStorage.setItem("userId", data.id); // ✅ Store user ID
			router.push("/home/upload-images");
		} else {
			alert("Failed to sign up");
		}
	};

	return (
		<div className="flex min-h-screen items-center justify-center bg-gray-100 p-6">
            {/* Back Button */}
			<Button
				onClick={() => router.back()}
				className="absolute top-4 left-4 border-gradient-to-b from-orange-100 to-purple-300 text-gray-700"
			>
				<ArrowLeft className="w-6 h-6 border-" />
			</Button>
			<form
				onSubmit={handleSubmit}
				className="bg-white shadow-md rounded-lg p-6 max-w-md w-full"
			>
				<h2 className="text-2xl font-semibold mb-4 text-center">Sign Up</h2>

				<input
					type="text"
					name="name"
					placeholder="Name"
					required
					onChange={handleChange}
					className="w-full p-2  rounded mb-2"
				/>
				<input
					type="email"
					name="email"
					placeholder="Email"
					required
					onChange={handleChange}
					className="w-full p-2  rounded mb-2"
				/>
				<input
					type="password"
					name="password"
					placeholder="Password"
					required
					onChange={handleChange}
					className="w-full p-2  rounded mb-2"
				/>

				<select
					name="sex"
					onChange={handleChange}
					className="w-full p-2  rounded mb-2"
				>
					<option value="">Select Gender</option>
					<option value="Male">Male</option>
					<option value="Female">Female</option>
				</select>

				<input
					type="number"
					name="apeIndex"
					placeholder="Ape Index"
					required
					onChange={handleChange}
					className="w-full p-2  rounded mb-2"
				/>
				<input
					type="number"
					name="height"
					placeholder="Height (cm)"
					required
					onChange={handleChange}
					className="w-full p-2  rounded mb-2"
				/>
				<input
					type="number"
					name="legRatio"
					placeholder="Leg Ratio"
					required
					onChange={handleChange}
					className="w-full p-2  rounded mb-2"
				/>

				<button
					type="submit"
					className="w-full bg-gradient-to-b from-orange-100 to-purple-300 text-white  p-2 rounded"
				>
					Sign Up
				</button>
			</form>
		</div>
	);
}
