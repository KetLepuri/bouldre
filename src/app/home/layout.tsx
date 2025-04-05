
export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<main className="min-h-screen w-full bg-[#F3EDE9] overflow-x-hidden">
			{children}
		</main>
	);
}
