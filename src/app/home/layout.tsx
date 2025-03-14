import { redirect } from "next/navigation";
import { SidebarProvider } from "@/components/ui/sidebar";
import { SessionProvider } from "next-auth/react";
import { AppSidebar } from "@/components/layout/sidebar";

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<div className="flex h-screen w-screen bg-background">
			<SidebarProvider>
				<AppSidebar />
				<main className="flex-1 flex flex-col m-4 bg-background rounded-lg border border-border">
					{children}
				</main>
			</SidebarProvider>
		</div>
	);
}
