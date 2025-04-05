"use client";

import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export function SignUpForm({ onBack }: { onBack: () => void }) {
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
			localStorage.setItem("userId", data.id);
			router.push("/home/upload-images");
		} else {
			alert("Failed to sign up");
		}
	};

	return (
		<div className="grid md:grid-cols-2 min-h-[600px] bg-[#F3EDE9] rounded-2xl overflow-hidden shadow-lg relative">
			{/* Left side: Form */}
			<div className="flex flex-col justify-center p-8 space-y-4 text-[#333] bg-white">
				<Button
					type="button"
					onClick={onBack}
					size="icon"
					className="absolute rounded-3xl top-4 left-4 bg-[#FA8420] hover:bg-[#e26e12] text-white"
				>
					<ArrowLeft className="w-5 h-5" />
				</Button>

				<h2 className="text-2xl font-bold text-center text-[#333]">Sign Up</h2>

				<form onSubmit={handleSubmit} className="space-y-3">
					<input
						type="text"
						name="name"
						placeholder="Name"
						required
						onChange={handleChange}
						className="w-full p-3 border border-[#DCDCDC] bg-white text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FA8420]"
					/>
					<input
						type="email"
						name="email"
						placeholder="Email"
						required
						onChange={handleChange}
						className="w-full p-3 border border-[#DCDCDC] bg-white text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FA8420]"
					/>
					<input
						type="password"
						name="password"
						placeholder="Password"
						required
						onChange={handleChange}
						className="w-full p-3 border border-[#DCDCDC] bg-white text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FA8420]"
					/>
					<select
						name="sex"
						required
						onChange={handleChange}
						value={formData.sex}
						className="w-full p-3 border border-[#DCDCDC] bg-white text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FA8420]"
					>
						<option value="" disabled hidden>
							Select Gender
						</option>
						<option value="Male">Male</option>
						<option value="Female">Female</option>
					</select>
					<input
						type="number"
						name="age"
						placeholder="Age"
						required
						onChange={handleChange}
						className="w-full p-3 border border-[#DCDCDC] bg-white text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FA8420]"
					/>

					<input
						type="number"
						name="apeIndex"
						placeholder="Ape Index"
						required
						onChange={handleChange}
						className="w-full p-3 border border-[#DCDCDC] bg-white text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FA8420]"
					/>
					<input
						type="number"
						name="height"
						placeholder="Height (cm)"
						required
						onChange={handleChange}
						className="w-full p-3 border border-[#DCDCDC] bg-white text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FA8420]"
					/>
					<input
						type="number"
						name="legRatio"
						placeholder="Leg Ratio"
						required
						onChange={handleChange}
						className="w-full p-3 border border-[#DCDCDC] bg-white text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FA8420]"
					/>

					<Button
						type="submit"
						className="w-full bg-[#FA8420] hover:bg-[#e26e12] text-white font-semibold p-3 rounded-lg transition-colors"
					>
						Sign Up
					</Button>
				</form>
			</div>

			{/* Right side: image_2 */}
			<div className="hidden md:block relative w-[400px] h-auto">
				<Image
					src="/images/image_1.jpg"
					alt="Login Visual"
					fill
					className="object-cover rounded-r-2xl"
				/>
				<div className="absolute inset-0 bg-[#FA8420]/20 rounded-r-2xl" />
			</div>
		</div>
	);
}
