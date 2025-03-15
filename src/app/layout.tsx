import type { Metadata } from "next";
import "./globals.css";

import { Toaster } from "@/components/ui/toaster";
import { poppins } from "@/components/ui/fonts";
import { ThemeProvider } from "@/components/theme/theme-provider";
import Link from "next/link";

export const metadata: Metadata = {
	metadataBase: new URL("https://bouldre.vercel.app"),
	title: "Bouldre",
	description: "Find your way to the top",
	icons: {
		icon: "/favicon.ico",
		shortcut: "/favicon.ico",
	},
	openGraph: {
		title: "Bouldre - Find Your Way to the Top",
		description:
			"AI-powered climbing route recommendations and climbing hold detection.",
		url: "https://bouldre.vercel.app",
		siteName: "Bouldre",
		images: [
			{
				url: "/images/icon.png",
				width: 1200,
				height: 630,
				alt: "Bouldre AI-Powered Climbing Assistant",
			},
		],
		type: "website",
	},
	twitter: {
		card: "summary_large_image",
		title: "Bouldre - Find Your Way to the Top",
		description:
			"AI-powered climbing route recommendations and climbing hold detection.",
		images: ["/images/icon.png"], 
	},
};

export default function RootLayout({
	children,
}: { children: React.ReactNode }) {
	return (
		<html lang="en" suppressHydrationWarning className={`${poppins.variable}`}>
			<body>
				<ThemeProvider
					attribute="class"
					defaultTheme="system"
					enableSystem
					disableTransitionOnChange
				>
					
					<Toaster />
					{children}
				</ThemeProvider>
			</body>
		</html>
	);
}
