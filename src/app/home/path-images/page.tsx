import { Suspense } from "react";
import PathDisplayPage from "@/components/path/pathDisplayPage";

export default function PathImagesPage() {
	return (
		<Suspense
			fallback={<div className="p-6 text-center">Loading route...</div>}
		>
			<PathDisplayPage />
		</Suspense>
	);
}
