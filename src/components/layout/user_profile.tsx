"use client";

import { useEffect, useRef, useState } from "react";
import {
	User, X, Mail, Pencil, Trash2, LogOut, Check, Venus, Mars,
} from "lucide-react";
import { LiaUserClockSolid } from "react-icons/lia";
import { PiPersonArmsSpreadThin } from "react-icons/pi";
import { GiBodyHeight, GiLeg } from "react-icons/gi";
import { Button } from "@/components/ui/button";
import ConfirmModal from "./popUp-box";

export default function UserProfile() {
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	const [userData, setUserData] = useState<any>({});
	const [isOpen, setIsOpen] = useState(false);
	const [showFullScreen, setShowFullScreen] = useState(false);
	const [editingField, setEditingField] = useState<string | null>(null);
	const [editValue, setEditValue] = useState<string>("");
	const [showConfirmModal, setShowConfirmModal] = useState(false);
	const modalRef = useRef<HTMLDivElement>(null);

	// Load user profile + sync localStorage
	useEffect(() => {
		const userId = localStorage.getItem("userId");
		if (!userId) return;

		async function fetchUserData() {
			const res = await fetch(`/api/user_profile?id=${userId}`);
			const data = await res.json();
			setUserData(data);

			localStorage.setItem(
				"userParams",
				JSON.stringify({
					age: Number(data.age),
					height: Number(data.height),
					apeIndex: Number(data.apeIndex),
					legRatio: Number(data.legRatio),
					sex: data.sex,
				}),
			);
		}

		fetchUserData();
	}, []);

	// Close modal on outside click
	useEffect(() => {
		const handleClickOutside = (e: MouseEvent) => {
			if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
				setIsOpen(false);
				setEditingField(null);
			}
		};
		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);

	// Handle profile edit save
	const handleSave = async () => {
		if (!editingField || editValue === "") return;

		const userId = localStorage.getItem("userId");
		if (!userId) return;

		const numericFields = ["height", "apeIndex", "legRatio", "age"];
		const parsedValue = numericFields.includes(editingField)
			? Number(editValue)
			: editValue;

		const res = await fetch("/api/user_profile", {
			method: "PATCH",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				id: userId,
				field: editingField,
				value: parsedValue,
			}),
		});

		if (res.ok) {
			const updated = { ...userData, [editingField]: parsedValue };
			setUserData(updated);
			setEditingField(null);
			setEditValue("");

			localStorage.setItem(
				"userParams",
				JSON.stringify({
					age: Number(updated.age),
					height: Number(updated.height),
					apeIndex: Number(updated.apeIndex),
					legRatio: Number(updated.legRatio),
					sex: updated.sex,
				}),
			);
		} else {
			alert("Failed to update field");
		}
	};

	// Log out
	const handleLogout = () => {
		localStorage.removeItem("userId");
		localStorage.removeItem("userParams");
		window.location.href = "/";
	};

	// Delete user
	const handleDelete = async () => {
		const res = await fetch("/api/user_profile", {
			method: "DELETE",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ id: localStorage.getItem("userId") }),
		});

		if (res.ok) {
			localStorage.removeItem("userId");
			localStorage.removeItem("userParams");
			window.location.href = "/";
		} else {
			alert("Failed to delete profile");
		}
	};

	const genderIcon =
		userData.sex?.toLowerCase() === "female" ? (
			<Venus className="w-5 h-5 text-[#FA8420]" />
		) : (
			<Mars className="w-5 h-5 text-[#FA8420]" />
		);

	return (
		<>
			<Button
				onClick={() => {
					setIsOpen(true);
					setShowFullScreen(window.innerWidth < 768);
				}}
				className="w-10 h-10 p-0 flex items-center justify-center rounded-xl bg-[#f7f3f1] text-[#FA8420] shadow-md hover:bg-[#FA8420] hover:text-white transition-colors duration-300"
			>
				<User className="w-5 h-5" strokeWidth={2.5} />
			</Button>

			{isOpen && (
				<div
					className={`${
						showFullScreen
							? "fixed top-16 left-0 right-0"
							: "absolute md:top-14 right-0"
					} z-50 w-full md:w-auto bg-white shadow-xl transition-all`}
				>
					<div
						ref={modalRef}
						className={`${
							showFullScreen
								? "p-6 max-h-[75vh] overflow-y-auto"
								: "rounded-xl p-4 w-80"
						} border border-gray-200`}
					>
						{showFullScreen && (
							<div className="flex justify-end mb-2">
								<Button
									onClick={() => setIsOpen(false)}
									variant="ghost"
									size="icon"
									className="text-[#FA8420] rounded-full"
								>
									<X className="w-4 h-4" />
								</Button>
							</div>
						)}

						<h3 className="text-lg font-semibold text-[#7888A3] mb-4 text-center md:text-left">
							{userData?.name || "User"}&apos;s Profile
						</h3>

						<div className="space-y-2 text-sm text-[#5f6b80]">
							{[
								"name",
								"email",
								"sex",
								"age",
								"apeIndex",
								"height",
								"legRatio",
							].map((field, index) => {
								const labelMap: Record<string, string> = {
									name: userData?.name || "",
									email: userData?.email || "",
									sex: userData?.sex || "",
									age: userData?.age || "",
									apeIndex: `${userData?.apeIndex || ""}`,
									height: `${userData?.height || ""}`,
									legRatio: `${userData?.legRatio || ""}`,
								};

								const iconMap: Record<string, JSX.Element> = {
									name: <User className="text-[#FA8420] w-4 h-4" />,
									email: <Mail className="text-[#FA8420] w-4 h-4" />,
									sex: genderIcon,
									age: <LiaUserClockSolid className="text-[#FA8420] w-4 h-4" />,
									apeIndex: (
										<PiPersonArmsSpreadThin className="text-[#FA8420] w-4 h-4" />
									),
									height: <GiBodyHeight className="text-[#FA8420] w-4 h-4" />,
									legRatio: <GiLeg className="text-[#FA8420] w-4 h-4" />,
								};

								return (
									<div
										// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
										key={index}
										className="flex items-center justify-between bg-white rounded-lg shadow-sm px-4 py-2"
									>
										<div className="flex items-center gap-2 w-full">
											{iconMap[field]}
											{editingField === field ? (
												<input
													type="text"
													value={editValue}
													onChange={(e) => setEditValue(e.target.value)}
													className="ml-2 w-full border border-[#dbdbda] rounded px-2 py-1 text-sm"
												/>
											) : (
												<span className="ml-1">
													{field === "apeIndex"
														? `Ape Index: ${labelMap[field]}`
														: field === "height"
														? `Height: ${labelMap[field]} cm`
														: field === "legRatio"
														? `Leg Ratio: ${labelMap[field]}`
														: labelMap[field]}
												</span>
											)}
										</div>

										{editingField === field ? (
											<Check
												className="w-4 h-4 text-[#FA8420] cursor-pointer ml-2"
												onClick={handleSave}
											/>
										) : (
											<Pencil
												className="w-4 h-4 text-[#5f6b80] cursor-pointer ml-2 hover:text-[#FA8420]"
												onClick={() => {
													setEditingField(field);
													setEditValue(labelMap[field]);
												}}
											/>
										)}
									</div>
								);
							})}
						</div>

						<div className="pt-4 flex gap-2">
							<Button
								onClick={() => setShowConfirmModal(true)}
								variant="destructive"
								className="w-1/2 flex items-center justify-center gap-2 border border-[#FA8420] text-[#FA8420] hover:bg-[#fa842011]"
							>
								<Trash2 className="w-4 h-4" />
								Delete
							</Button>
							<Button
								onClick={handleLogout}
								className="w-1/2 flex items-center justify-center gap-2 bg-[#FA8420] hover:bg-[#e26e12] text-white"
							>
								<LogOut className="w-4 h-4" />
								Log Out
							</Button>
						</div>
					</div>
				</div>
			)}

			{showConfirmModal && (
				<ConfirmModal
					title="Delete Profile"
					message="Are you sure you want to delete your profile?"
					onConfirm={() => {
						setShowConfirmModal(false);
						handleDelete();
					}}
					onCancel={() => setShowConfirmModal(false)}
				/>
			)}
		</>
	);
}
