"use client";

import { useState } from "react";
import Image from "next/image";
import { Loader2, MoreVertical, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import supabase from "@/lib/supabase";

type StepGenerateProps = {
  imageUrl: string;
  onNext: () => void;
  onBack: () => void;
  showModal: (title: string, message: string, onConfirm?: () => void) => void;
};

export default function StepGenerate({
  imageUrl,
  onNext,
  onBack,
  showModal,
}: StepGenerateProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);

  const handleGeneratePath = async () => {
    if (!imageUrl) return;
    setGenerating(true);

    try {
      const userId = localStorage.getItem("userId");
      const wallId = `wall-${crypto.randomUUID()}`;
      localStorage.setItem("wallId", wallId);

      const formData = new FormData();
      formData.append("image_url", imageUrl);
      formData.append("wall_id", wallId);
      formData.append("user_id", userId || "");

      const detectRes = await fetch("http://localhost:8000/detect/", {
        method: "POST",
        body: formData,
      });

      const { holds, meta, message, error } = await detectRes.json();

      if (!detectRes.ok || !holds?.length) {
        showModal("Detection Failed", error || message || "Hold detection failed");
        setGenerating(false);
        return;
      }

      const formattedMeta = {
        id: wallId,
        name: `Auto Wall ${wallId.slice(-4)}`,
        width: Number(meta.width),
        height: Number(meta.height),
        holdHandNumber: Number(meta.handholds),
        holdFootNumber: Number(meta.footholds),
        holdType: "auto-detected",
        wallInclination: meta.wallInclination || "unknown",
        image_url: meta.image_url,
        user_id: userId,
        created_at: new Date(),
      };

      await fetch("/api/wall-details", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formattedMeta),
      });

      const userParams = JSON.parse(localStorage.getItem("userParams") || "{}");

      const genRes = await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, wallId, userParams }),
      });

      const pathData = await genRes.json();

      if (!genRes.ok || !pathData.route?.length) {
        showModal("Path Generation Failed", pathData.error || "No route generated");
        setGenerating(false);
        return;
      }

      localStorage.setItem("aiGeneratedPath", JSON.stringify(pathData));
      onNext();
    } catch (err) {
      console.error(err);
      showModal("Upss...", "Something went wrong during generation! Please try again.");
    } finally {
      setGenerating(false);
    }
  };

  const handleDelete = async () => {
    const name = imageUrl.split("/").pop();
    await supabase.storage.from("image-uploads").remove([`uploads/${name}`]);
    showModal("Image Deleted", "Your image was deleted. Please upload a new one.", onBack);
  };

  return (
    <>
      <div className="w-full flex flex-col items-center space-y-6 mt-6">
        <h2 className="text-xl md:text-2xl font-bold text-[#5f6b80] text-center px-4">
          Review Your Wall
        </h2>

        {/* biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
<div
          className="relative mb-4 w-full max-w-md aspect-[3/4] rounded-lg overflow-hidden shadow-md cursor-zoom-in"
          onClick={() => setIsZoomed(true)}
        >
          <Image
            src={imageUrl}
            alt="Climbing Wall"
            fill
            className="object-contain rounded-lg"
          />

          <Button
            size="icon"
            className="absolute top-3 right-3 bg-white text-[#FA8420] rounded-full shadow-md hover:bg-[#f3ede9] z-10"
            onClick={(e) => {
              e.stopPropagation();
              setMenuOpen((prev) => !prev);
            }}
          >
            <MoreVertical className="w-5 h-5" />
          </Button>

          {menuOpen && (
            <div className="absolute top-12 right-3 bg-white shadow-md rounded-lg z-20">
              <Button
                className="text-red-600 w-full justify-start"
                onClick={handleDelete}
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Delete Image
              </Button>
            </div>
          )}
        </div>

        <Button
          className="w-full bg-[#FA8420] hover:bg-[#e26e12] text-white font-medium py-3 rounded-xl"
          onClick={handleGeneratePath}
          disabled={generating}
        >
          {generating ? (
            <span className="flex items-center gap-2">
              <Loader2 className="w-4 h-4 animate-spin" />
              Generating...
            </span>
          ) : (
            "Generate Path"
          )}
        </Button>
      </div>

      {isZoomed && (
        // biome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
<div
          className="fixed inset-0 z-50 bg-black bg-opacity-80 flex items-center justify-center cursor-zoom-out"
          onClick={() => setIsZoomed(false)}
        >
          <div className="relative max-w-[90%] max-h-[90%]">
            <Image
              src={imageUrl}
              alt="Zoomed Climbing Wall"
              width={900}
              height={1200}
              className="object-contain rounded-lg shadow-lg"
            />
          </div>
        </div>
      )}
    </>
  );
}