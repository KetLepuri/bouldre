"use client";

import { useState, useEffect } from "react";
import StepUpload from "./stepUpload";
import StepGenerate from "./stepGenerate";
import StepDisplay from "./stepDisplay";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/layout/navbar";
import { ArrowLeft } from "lucide-react";
import ConfirmModal from "@/components/layout/popUp-box";
import InfoModal from "../layout/info-box";

export default function ClimbFlow() {
	const [step, setStep] = useState(0);
	const [imageUrl, setImageUrl] = useState("");
	const [hideStepBar, setHideStepBar] = useState(false);
	const [infoModal, setInfoModal] = useState<{
		title: string;
		message: string;
	} | null>(null);
	const [confirmModal, setConfirmModal] = useState<{
		title: string;
		message: string;
		onConfirm: () => void;
	} | null>(null);

	const goNext = () => setStep((prev) => Math.min(prev + 1, 2));
	const goBack = () => setStep((prev) => Math.max(prev - 1, 0));
	const handleRestart = () => {
		setStep(0);
		setImageUrl("");
	};

	useEffect(() => {
		if (step !== 2) return;

		const handleScroll = () => {
			const currentScrollY = window.scrollY;
			const topReached = currentScrollY <= 10;
			const bottomReached =
				window.innerHeight + currentScrollY >= document.body.scrollHeight - 50;

			if (bottomReached) {
				setHideStepBar(true);
			} else if (topReached) {
				setHideStepBar(false);
			}
		};

		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, [step]);

	return (
		<div className="min-h-screen bg-white flex flex-col items-center p-4 pt-32 space-y-6 relative">
			<Navbar />

			{/* Step Indicator */}
			<div
				className={`fixed top-16 z-30 bg-white w-full max-w-md flex justify-between items-center px-4 py-2 mt-3.5 transition-opacity duration-700 ease-in-out ${
					step === 2 && hideStepBar
						? "opacity-0 pointer-events-none"
						: "opacity-100"
				}`}
			>
				<div className="absolute top-1/2 left-0 right-0 h-0.5 border-t border-dashed border-[#FA8420] z-0" />
				{"Upload,Generate,Preview".split(",").map((label, i) => {
					const isCompleted = i < step;
					const isActive = i === step;
					return (
						<div
							// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
							key={i}
							className={`relative z-5 pl-2.5 pr-2.5 mx-3 text-center text-sm font-medium border rounded-3xl transition-all ${
								isCompleted || isActive
									? "bg-[#FA8420] text-white border-[#FA8420]"
									: "bg-white text-[#5f6b80] border-dashed border-[#FA8420]"
							}`}
						>
							{label}
						</div>
					);
				})}
			</div>

			{/* Step Content */}
			<div className="w-full max-w-xl">
				{step === 0 && (
					<StepUpload
						onUploadComplete={(url) => {
							setImageUrl(url);
							goNext();
						}}
						showModal={(title, message) => setInfoModal({ title, message })}
					/>
				)}
				{step === 1 && (
					<StepGenerate
						imageUrl={imageUrl}
						onNext={goNext}
						onBack={goBack}
						showModal={(title, message, onConfirm) => {
							if (onConfirm) {
								setConfirmModal({ title, message, onConfirm });
							} else {
								setInfoModal({ title, message });
							}
						}}
					/>
				)}
				{step === 2 && (
					<StepDisplay
						imageUrl={imageUrl}
						onRestart={handleRestart}
						showModal={(title, message) => setInfoModal({ title, message })}
					/>
				)}
			</div>

			{/* Navigation Buttons */}
			{step < 2 && (
				<div className="flex gap-4 mt-6">
					{step > 0 && (
						<Button
							onClick={goBack}
							variant="outline"
							className="text-[#FA8420] border-[#FA8420]"
						>
							<ArrowLeft className="mr-2 h-4 w-4" />
							Back
						</Button>
					)}
				</div>
			)}

			{infoModal && (
				<InfoModal
					title={infoModal.title}
					message={infoModal.message}
					onClose={() => setInfoModal(null)}
				/>
			)}

			{confirmModal && (
				<ConfirmModal
					title={confirmModal.title}
					message={confirmModal.message}
					onConfirm={() => {
						confirmModal.onConfirm();
						setConfirmModal(null);
					}}
					onCancel={() => setConfirmModal(null)}
				/>
			)}
		</div>
	);
}
