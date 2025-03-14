"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function HomePage() {
	return (
		<div className="flex min-h-screen items-center justify-center bg-gray-100 p-6">
			<div className="w-full max-w-md rounded-lg bg-white p-8 shadow-lg">
				<div className="flex flex-col items-center space-y-6 text-center">
					<h1 className="text-3xl font-bold tracking-tight text-gray-900">
						Welcome to Bouldre, Your AI-Powered Climbing Assistant
					</h1>

					<Button
						size="lg"
						asChild
						variant="default"
						type="button"
						className="w-full bg-green-700 hover:bg-green-500 text-white"
					>
						<Link href="/home/upload-images">Log in</Link>
					</Button>
				</div>
			</div>
		</div>
	);
}
