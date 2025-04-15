import { NextResponse } from "next/server";
import supabase from "@/lib/supabase";
import db from "@/lib/db";
import { boulderWall } from "@/lib/db/schema/boulder_wall";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;
    const user_id = formData.get("user_id")?.toString();
    const layout_id = formData.get("layout_id")?.toString();
    const wall_name = formData.get("name")?.toString() || "My Wall";

    if (!file || !user_id || !layout_id) {
      return NextResponse.json({ error: "Missing file, layout, or user" }, { status: 400 });
    }

    //Supabase
    const fileExt = file.name.split(".").pop();
    const filePath = `uploads/${Date.now()}.${fileExt}`;

    const arrayBuffer = await file.arrayBuffer();
    const blob = new Blob([arrayBuffer], { type: file.type });

    const { data, error } = await supabase.storage
      .from("image-uploads")
      .upload(filePath, blob, { contentType: file.type });

    if (error) {
      console.error("Supabase Upload Error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    const { data: publicUrlData } = supabase.storage.from("image-uploads").getPublicUrl(filePath);

    // PostgreSQL
    const [insertedWall] = await db
    .insert(boulderWall)
    .values({
      user_id,
      image_url: publicUrlData.publicUrl,
      layout_id,
      name: wall_name,
    })
    .returning();

    return NextResponse.json({ imageUrl: publicUrlData.publicUrl, wall: { id: insertedWall.id } }, { status: 201 });

  } catch (error) {
    console.error("Upload API Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
