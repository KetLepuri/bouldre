"use client";

import { useEffect, useState } from "react";
import { Menu, X, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
	NavigationMenu,
	NavigationMenuItem,
	NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import UserProfile from "@/components/layout/user_profile";

export default function Navbar() {
	const [menuOpen, setMenuOpen] = useState(false);

	const [userData, setUserData] = useState<UserData | null>(null);

	useEffect(() => {
		const fetchUserData = async () => {
			const userId = localStorage.getItem("userId");
			if (!userId) return;

			const res = await fetch(`/api/user_profile?id=${userId}`);
			const data = await res.json();
			setUserData(data);
		};

		fetchUserData();
	}, []);

	interface UserData {
		name: string;
		email: string;
	}
	return (
		<header className="w-full bg-[#F3EDE9] shadow-md fixed top-0 left-0 z-50">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex justify-between items-center h-16">
					{/* Logo */}
					<div className="flex items-center gap-2">
						<Image
							src="/images/icon.png"
							alt="Bouldre"
							width={30}
							height={30}
						/>
						<span className="text-xl font-bold flex">
							<span className="text-[#FA8420]">Boul</span>
							<span className="text-[#5f6b80]">dre</span>
						</span>
					</div>

					{/* Desktop Navigation */}
					<NavigationMenu className="hidden md:flex gap-6 items-center">
						<NavigationMenuList className="flex items-center gap-6">
							{["upload-images", "wall-images", "gallery"].map(
								(route, index) => (
									// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
									<NavigationMenuItem key={index}>
										<Link
											href={`/home/${route}`}
											className="text-sm text-gray-700 border-b-2 border-transparent hover:border-[#fa842072] hover:text-[#FA8420] transition-all duration-200 pb-1"
										>
											{route === "upload-images"
												? "Upload"
												: route === "wall-images"
													? "Walls"
													: "Gallery"}
										</Link>
									</NavigationMenuItem>
								),
							)}
							<NavigationMenuItem>
								<div className="flex items-center gap-2">
									<UserProfile />
								</div>
							</NavigationMenuItem>
						</NavigationMenuList>
					</NavigationMenu>

					{/* Mobile Menu */}
					<div className="md:hidden">
						<Sheet open={menuOpen} onOpenChange={setMenuOpen}>
							{/* Hamburger Menu Button */}
							<SheetTrigger asChild>
								{!menuOpen && (
									<Button
										variant="ghost"
										size="icon"
										className="w-10 h-10 p-0 flex items-center justify-center rounded-xl bg-[#f7f3f1] text-[#FA8420] shadow-md hover:bg-[#FA8420] hover:text-white transition-colors duration-300 sm:hidden"
									>
										<Menu className="w-5 h-5" strokeWidth={2.5} />
									</Button>
								)}
							</SheetTrigger>

							{/* Mobile Menu Content */}
							<SheetContent
								side="top"
								className="bg-[#F3EDE9] pt-6 pb-10 px-4 shadow-lg space-y-6 [&>button[data-state='open']]:hidden"
							>
								{/* Mobile Header with Close Button */}
								<div className="flex items-center justify-between">
									<div className="flex items-center gap-2">
										<Image
											src="/images/icon.png"
											alt="Bouldre"
											width={28}
											height={28}
										/>
										<span className="text-xl font-bold">
											<span className="text-[#FA8420]">Boul</span>
											<span className="text-[#7888A3]">dre</span>
										</span>
									</div>
									<Button
										variant="ghost"
										size="icon"
										className="rounded-xl bg-[#f7f3f1] text-[#FA8420] shadow-md hover:bg-[#FA8420] hover:text-white transition"
										onClick={() => setMenuOpen(false)}
									>
										<X className="w-5 h-5" strokeWidth={2.5} />
									</Button>
								</div>

								{/* Mobile Navigation Links */}
								<nav className="flex flex-col text-center mt-4">
									{["upload-images", "wall-images", "galley"].map(
										(route, index) => (
											<Link
												// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
												key={index}
												href={`/home/${route}`}
												className="text-sm text-gray-700 py-3 border-b border-[#e4dcd8] hover:text-[#FA8420] hover:border-[#fa842045] transition-all font-medium"
												onClick={() => setMenuOpen(false)}
											>
												{route === "upload-images"
													? "Upload"
													: route === "wall-images"
														? "Walls"
														: "Gallery"}
											</Link>
										),
									)}

									{/* User Profile */}
									{userData && (
										<div className="flex items-center justify-between bg-[#f7f3f1] px-4 py-3 rounded-xl shadow-md">
											<div className="flex items-center gap-3">
												<Image
													src="/images/climb.png"
													alt="User Avatar"
													width={32}
													height={32}
													
												/>
												<div className="flex flex-col text-left">
													<span className="text-sm font-semibold text-[#FA8420]">
														{userData.name}
													</span>
													<span className="text-xs text-[#5f6b80]">
														{userData.email}
													</span>
												</div>
											</div>
											<UserProfile />
										</div>
									)}
								</nav>
							</SheetContent>
						</Sheet>
					</div>
				</div>
			</div>
		</header>
	);
}
