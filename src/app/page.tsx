"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

export default function HomePage() {
	return (
		<div className="flex min-h-screen items-center justify-center bg-gray-100 p-6">
			<div className="w-full max-w-md rounded-lg bg-white p-8 shadow-lg">
				<div className="flex flex-col items-center space-y-6 text-center">
					<Image
						src="/images/icon.png"
						alt="Bouldre Logo"
						width={100}
						height={100}
						style={{ width: "auto", height: "auto" }}
					/>

					<h1 className="text-3xl font-bold tracking-tight text-gray-700">
						Welcome to Bouldre, Your AI-Powered Climbing Assistant
					</h1>

					<Button
						size="lg"
						asChild
						variant="default"
						type="button"
						className="w-full bg-gradient-to-b from-orange-100 to-purple-300 text-white"
					>
						<Link href="/home/upload-images">Log in</Link>
					</Button>

					<Button
						size="lg"
						asChild
						variant="outline"
						type="button"
						className="w-full bg-gradient-to-b from-orange-100 to-purple-300 text-white"
					>
						<Link href="/sign-up">Sign Up</Link>
					</Button>
				</div>
			</div>
		</div>
	);
}
