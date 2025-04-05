import React from "react";
import { Button } from "@/components/ui/button";

interface ConfirmModalProps {
	title: string;
	message: string;
	onConfirm: () => void;
	onCancel: () => void;
}

export default function ConfirmModal({
	title,
	message,
	onConfirm,
	onCancel,
}: ConfirmModalProps) {
	return (
		<div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
			<div className="bg-white rounded-xl shadow-lg p-6 w-[90%] max-w-sm text-center">
				<h2 className="text-lg font-bold text-[#FA8420] mb-4">{title}</h2>
				<p className="text-sm text-[#5f6b80] mb-6">{message}</p>
				<div className="flex justify-center gap-4">
					<Button
						onClick={onCancel}
						variant="outline"
						className="w-1/2 border border-[#FA8420] text-[#FA8420] hover:bg-[#fa842011]"
					>
						Cancel
					</Button>
					<Button
						onClick={onConfirm}
						className="w-1/2 bg-[#FA8420] hover:bg-[#e26e12] text-white"
					>
						Confirm
					</Button>
				</div>
			</div>
		</div>
	);
}
