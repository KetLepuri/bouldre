import { NextResponse } from "next/server";
import supabase from "@/lib/supabase";

export async function GET() {
  try {
    const { data, error } = await supabase.storage
      .from("image-uploads")
      .list("uploads", { limit: 100 }); // Ensure all images are retrieved

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    const urls = data
      .filter((file) => file.name) // Ensure valid files
      .map((file) =>
        supabase.storage.from("image-uploads").getPublicUrl(`uploads/${file.name}`).data.publicUrl
      );

    return NextResponse.json(urls, { status: 200 });
  } catch (error) {
    console.error("Gallery API Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
