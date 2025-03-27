"use client";

import { useState, useEffect, useRef } from "react";
import * as cocoSsd from "@tensorflow-models/coco-ssd";
import "@tensorflow/tfjs";
import { useSearchParams } from "next/navigation";

export default function GeneratedPathPage() {
	const searchParams = useSearchParams();
	const imageUrl = searchParams.get("imageUrl");
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	const [model, setModel] = useState<any>(null);
	const [loading, setLoading] = useState(true);
	const imageRef = useRef<HTMLImageElement>(null);
	const canvasRef = useRef<HTMLCanvasElement>(null);

	// Load the coco-ssd model once on mount
	useEffect(() => {
		async function loadModel() {
			const loadedModel = await cocoSsd.load();
			setModel(loadedModel);
		}
		loadModel();
	}, []);

	// Run detection once the image is loaded and the model is ready
	const handleImageLoad = async () => {
		if (!model || !imageRef.current) return;
		const img = imageRef.current;

		// Ensure the canvas matches the image size
		const canvas = canvasRef.current;
		if (canvas) {
			canvas.width = img.width;
			canvas.height = img.height;
		}

		// Run object detection on the image element
		const predictions = await model.detect(img);
		console.log("Predictions:", predictions);
		drawDetections(predictions);
		setLoading(false);
	};

	// Draw bounding boxes and generate a simple path
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	const drawDetections = (predictions: any[]) => {
		const canvas = canvasRef.current;
		if (!canvas) return;
		const ctx = canvas.getContext("2d");
		if (!ctx) return;

		// Clear any previous drawings
		ctx.clearRect(0, 0, canvas.width, canvas.height);

		// Draw bounding boxes and collect center points
		const centers: { x: number; y: number }[] = [];
		// biome-ignore lint/complexity/noForEach: <explanation>
		predictions.forEach((pred) => {
			const [x, y, width, height] = pred.bbox;
			// Draw a blue rectangle for each detection
			ctx.strokeStyle = "blue";
			ctx.lineWidth = 2;
			ctx.strokeRect(x, y, width, height);

			// Calculate the center of each bounding box
			centers.push({ x: x + width / 2, y: y + height / 2 });
		});

		// Simple route generation: sort centers (e.g., by vertical position)
		centers.sort((a, b) => a.y - b.y);

		// Draw red lines connecting the center points
		if (centers.length > 0) {
			ctx.strokeStyle = "red";
			ctx.lineWidth = 4;
			ctx.beginPath();
			centers.forEach((center, index) => {
				if (index === 0) {
					ctx.moveTo(center.x, center.y);
				} else {
					ctx.lineTo(center.x, center.y);
				}
			});
			ctx.stroke();
		}
	};

	return (
		<div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
			<h1 className="text-2xl font-bold mb-4">Generated Climbing Path</h1>
			{loading && <p>Loading AI path...</p>}
			<div style={{ position: "relative", display: "inline-block" }}>
				{imageUrl && (
					<>
						<img
							ref={imageRef}
							src={imageUrl}
							alt="Climbing Wall"
							onLoad={handleImageLoad}
							style={{ display: "block" }}
						/>
						<canvas
							ref={canvasRef}
							style={{
								position: "absolute",
								top: 0,
								left: 0,
								pointerEvents: "none",
							}}
						/>
					</>
				)}
			</div>
		</div>
	);
}
