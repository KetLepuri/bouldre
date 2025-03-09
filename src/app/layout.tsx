import type { Metadata } from "next";
import "./globals.css";

import { Toaster } from "@/components/ui/toaster";
import { poppins } from "@/components/ui/fonts";
import { ThemeProvider } from "@/components/theme/theme-provider";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Bouldre",
  description: "Find your way to the top",
  icons: {
    icon: "/favicon.ico", // ✅ Fix: Ensure correct favicon path
    shortcut: "/favicon.ico",
  },
  openGraph: {
    title: "Bouldre - Find Your Way to the Top",
    description: "AI-powered climbing route recommendations and climbing hold detection.",
    url: "https://bouldre.vercel.app",
    siteName: "Bouldre",
    images: [
      {
        url: "/images/og.png", // ✅ Open Graph image for previews
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
    description: "AI-powered climbing route recommendations and climbing hold detection.",
    images: ["/images/og.png"], 
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${poppins.variable}`}>
      <head>
        {/* 🔹 Explicitly set favicon */}
        <link rel="icon" href="/images/og.png" sizes="1200x1200" />
        <link rel="shortcut icon" href="/images/og.png" />
      </head>
      <body className="bg-gray-100 text-gray-900 dark:bg-gray-900 dark:text-white">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          {/* 🔹 Navigation Bar */}
          <nav className="bg-gray-800 text-white p-4 shadow-lg flex justify-between items-center">
            <Link href="/" className="font-bold text-lg flex items-center">
              <img src="/images/og.png" alt="Bouldre Logo" className="w-6 h-6 mr-2" /> 
              Bouldre
            </Link>
            <div className="space-x-4">
              <Link href="/upload-images" className="hover:underline">Upload</Link>
              <Link href="/gallery" className="hover:underline">Gallery</Link>
            </div>
          </nav>

          {/* 🔹 Page Content */}
          <main className="container mx-auto p-4 min-h-screen">
            <Toaster />
            {children}
          </main>

          {/* 🔹 Footer */}
          <footer className="bg-gray-800 text-white text-center p-4">
            <p>© {new Date().getFullYear()} Bouldre. All rights reserved.</p>
          </footer>
        </ThemeProvider>
      </body>
    </html>
  );
}
