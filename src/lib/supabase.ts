import { createClient } from "@supabase/supabase-js";

// Correctly use environment variables for client-side access
// biome-ignore lint/style/noNonNullAssertion: <explanation>
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
// biome-ignore lint/style/noNonNullAssertion: <explanation>
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

const supabase = createClient(supabaseUrl, supabaseKey);

export async function uploadImage(file: File) {
  try {
    const fileExt = file.name.split(".").pop();
    const filePath = `uploads/${Date.now()}.${fileExt}`;

    // Convert File to Blob (Required for browser uploads)
    const arrayBuffer = await file.arrayBuffer();
    const blob = new Blob([arrayBuffer], { type: file.type });

    const { data, error } = await supabase.storage.from("image-uploads").upload(filePath, blob, {
      contentType: file.type,
    });

    if (error) {
      console.error("Supabase Upload Error:", error);
      throw error;
    }

    // Get Public URL of uploaded image
    const { data: publicUrlData } = supabase.storage.from("image-uploads").getPublicUrl(filePath);

    return { url: publicUrlData.publicUrl, path: filePath };
  } catch (error) {
    console.error("Upload Image Error:", error);
    throw error;
  }
}

export default supabase;
