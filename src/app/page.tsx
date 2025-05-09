"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { LoginForm } from "@/components/auth/login-form";
import { SignUpForm } from "@/components/auth/sign-up-form";
import Link from "next/link";

export default function HomePage() {
	const [mode, setMode] = useState<"welcome" | "login" | "signup">("welcome");

	return (
		<div className="flex min-h-screen items-center justify-center bg-[#F3EDE9] p-6">
			<div className="w-full max-w-3xl rounded-lg bg-white p-8 shadow-lg">
				{mode === "welcome" && (
					<div className="flex flex-col items-center space-y-6 text-center">
						<Image
							src="/images/icon.png"
							alt="Bouldre Logo"
							width={100}
							height={100}
							style={{ width: "auto", height: "auto" }}
						/>

						<h1 className="text-3xl font-bold tracking-tight text-[#7888A3]">
							Welcome to Bouldre - Find Your Way to the Top
						</h1>

						{/* <Button
							size="lg"
							type="button"
							className="w-full bg-[#FA8420] text-[#F3EDE9]"
							onClick={() => setMode("login")}
						>
							Log in
						</Button> */}
						<Link
							href="/home/climb"
							className="w-full block text-center bg-[#FA8420] text-white font-medium py-3 px-4 rounded-lg hover:bg-[#e26e12] transition-colors"
						>
							Log in
						</Link>

						<Button
							size="lg"
							variant="outline"
							type="button"
							className="w-full border border-[#FA8420] text-[#FA8420]"
							onClick={() => setMode("signup")}
						>
							Sign Up
						</Button>
					</div>
				)}

				{mode === "login" && (
					<LoginForm
						onBack={() => setMode("welcome")}
						onSwitchToSignup={() => setMode("signup")}
					/>
				)}
				{mode === "signup" && <SignUpForm onBack={() => setMode("welcome")} />}
			</div>
		</div>
	);
}
