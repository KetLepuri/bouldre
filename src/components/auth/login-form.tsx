"use client";

import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function LoginForm({
	onBack,
	onSwitchToSignup,
}: { onBack: () => void; onSwitchToSignup: () => void }) {
	const [formData, setFormData] = useState({ email: "", password: "" });

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		const res = await fetch("/home/login", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(formData),
		});
		if (!res.ok) alert("Login failed");
	};

	return (
		<div className="grid md:grid-cols-2 min-h-[700px] bg-[#F3EDE9] rounded-2xl overflow-hidden shadow-lg relative">
			{/* Left side: Form */}
			<div className="flex flex-col justify-center p-8 space-y-7 text-[#7888A3] bg-white">
				<Button
					type="button"
					onClick={onBack}
					size="icon"
					className="absolute top-4 left-4 bg-[#FA8420] hover:bg-[#e26e12] text-white"
				>
					<ArrowLeft className="w-5 h-5" />
				</Button>

				<h1 className="text-2xl font-bold">Welcome back</h1>
				<p className="text-muted-foreground">Login to your account</p>

				<form onSubmit={handleSubmit} className="space-y-6">
					<div>
						<Label htmlFor="email">Email</Label>
						<Input
							id="email"
							name="email"
							type="email"
							required
							onChange={handleChange}
							placeholder="you@example.com"
							className="w-full p-3 mt-2 border border-[#DCDCDC] bg-white text-black rounded-lg
             focus:outline-none focus:ring-2 focus:ring-[#FA8420] focus:border-[#FA8420]"
						/>
					</div>

					<div>
						<Label htmlFor="password">Password</Label>
						<Input
							id="password"
							name="password"
							type="password"
							required
							onChange={handleChange}
							className="w-full p-3 mt-2 border border-[#DCDCDC] bg-white text-black rounded-lg
             focus:outline-none focus:ring-2 focus:ring-[#FA8420] focus:border-[#FA8420]"
						/>
					</div>

					<Button
						type="submit"
						className="w-full bg-[#FA8420] hover:bg-[#e26e12] text-white"
					>
						Login
					</Button>
				</form>

				<p className="text-sm text-center">
					Don’t have an account?{" "}
					<Button
						type="button"
						className="underline underline-offset-4 text-[#FA8420]"
						onClick={onSwitchToSignup}
					>
						Sign up
					</Button>
				</p>
			</div>

			{/* Right side: image_1 */}
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
