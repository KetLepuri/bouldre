import { type NextRequest, NextResponse } from "next/server";
import supabase from "@/lib/supabase";

export async function GET() {
	try {
		const { data: files, error } = await supabase.storage
			.from("image-uploads")
			.list("uploads", { limit: 100 });

		if (error) {
			console.error("Supabase list error:", error.message);
			return NextResponse.json({ error: error.message }, { status: 500 });
		}

		// Return array of { name, url }
		const images = files
			.filter(
				(file) => file.name && file.metadata?.mimetype?.startsWith("image"),
			)
			.map((file) => {
				const url = supabase.storage
					.from("image-uploads")
					.getPublicUrl(`uploads/${file.name}`).data.publicUrl;

				return {
					name: file.name,
					url,
				};
			});

		return NextResponse.json(images, { status: 200 });
	} catch (err) {
		console.error("Gallery fetch failed:", err);
		return NextResponse.json(
			{ error: "Internal Server Error" },
			{ status: 500 },
		);
	}
}



