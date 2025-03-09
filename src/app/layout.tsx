import type { Metadata } from "next";
import "./globals.css";

import { Toaster } from "@/components/ui/toaster";

import { poppins } from "@/components/ui/fonts";
import { ThemeProvider } from "@/components/theme/theme-provider";



export const metadata: Metadata = {
  title: "Bouldre",
  description: "Find your way to the top",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
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

