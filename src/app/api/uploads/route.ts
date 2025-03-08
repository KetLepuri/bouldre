import { NextResponse } from "next/server";
import supabase from "@/lib/supabase";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    const fileExt = file.name.split(".").pop();
    const filePath = `uploads/${Date.now()}.${fileExt}`;

    // Convert File to Blob (Fixes Possible TypeError)
    const arrayBuffer = await file.arrayBuffer();
    const blob = new Blob([arrayBuffer], { type: file.type });

    // Upload file to Supabase Storage
    const { data, error } = await supabase.storage
      .from("image-uploads") // Ensure bucket name is correct
      .upload(filePath, blob, { contentType: file.type });

    if (error) {
      console.error("Supabase Upload Error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // Generate Public URL
    const { data: publicUrlData } = supabase.storage.from("image-uploads").getPublicUrl(filePath);

    return NextResponse.json({ url: publicUrlData.publicUrl }, { status: 200 });
  } catch (error) {
    console.error("Upload API Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
