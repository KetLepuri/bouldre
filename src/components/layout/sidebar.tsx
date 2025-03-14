"use client";

import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarSeparator,
} from "@/components/ui/sidebar";
import { Heart, Home } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
const applicationItems = [
	{
		title: "Home",
		url: "/home",
		icon: Home,
	},
	{
		title: "Gallery",
		url: "/home/gallery",
		icon: Heart,
	},
];

export function AppSidebar() {
	const pathname = usePathname();
	
	const isActive = (url: string) => {
		return pathname === url;
	};

	return (
		<Sidebar>
			<SidebarHeader className="relative rounded-tr-lg">
				<div className="relative w-full h-full p-9 ">
					<div className="flex z-20 gap-4">
						<div className="flex items-center space-x-3 text-foreground relative z-10">
							<h1 className="text-xl font-semibold text-primary-foreground">
								Bouldre Portal
							</h1>
						</div>
					</div>
				</div>
			</SidebarHeader>
			<SidebarSeparator />
			<SidebarGroup>
				<SidebarGroupLabel className="text-mystical/65 text-xs px-4 py-2 mb-2 font-semibold dark:text-white/40">
					Application
				</SidebarGroupLabel>
				<SidebarGroupContent>
				<SidebarMenu>
						{applicationItems.map((item) => (
									<SidebarMenuItem key={item.title}>
										<SidebarMenuButton asChild>
											<Link
												href={item.url}
												className={`group/item flex items-center space-x-3 px-4 py-2 cursor-pointer w-full rounded-lg ${
													isActive(item.url)
														? "text-royal-purple dark:text-creamy"
														: "text-mystical dark:text-creamy hover:bg-creamy dark:hover:text-primary"
												}`}
												
											>
												<span
													className={`${
														isActive(item.url)
															? "text-royal-purple dark:text-primary"
															: "text-mystical dark:text-creamy group-hover/item:text-royal-purple dark:group-hover/item:text-primary"
													}`}
												>
													<item.icon className="w-5 h-5" />
												</span>
												
											</Link>
										</SidebarMenuButton>
									</SidebarMenuItem>
								))}
							</SidebarMenu>
					<SidebarMenu>
						<SidebarMenuItem>Dashboard</SidebarMenuItem>
						<SidebarMenuItem>Gallery</SidebarMenuItem>
					</SidebarMenu>
				</SidebarGroupContent>
			</SidebarGroup>
			<SidebarGroup className="mt-20">
				<SidebarGroupLabel className="text-mystical/65 text-xs px-4 py-2 mb-2 font-semibold dark:text-white/40">
					Settings
				</SidebarGroupLabel>
				<SidebarGroupContent>
					<SidebarMenu>
						<SidebarMenuItem>FAQ</SidebarMenuItem>
						<SidebarMenuItem>About</SidebarMenuItem>
						<SidebarMenuItem>Prefences</SidebarMenuItem>
					</SidebarMenu>
				</SidebarGroupContent>
			</SidebarGroup>
			<div className="py-3 px-3">
				<SidebarSeparator />
			</div>
			<SidebarFooter className="p-6 mb-4">
				<SidebarGroupLabel className="text-mystical/65 text-xs px-2 py-2 font-semibold dark:text-white/40">
					Profile
				</SidebarGroupLabel>
			</SidebarFooter>
		</Sidebar>
	);
}
