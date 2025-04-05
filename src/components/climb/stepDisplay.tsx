"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

interface StepDisplayProps {
  imageUrl: string;
  onRestart: () => void;
  showModal: (title: string, message: string) => void;
}

export default function StepDisplay({ imageUrl, onRestart, showModal }: StepDisplayProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  const [route, setRoute] = useState<any[]>([]);
  const [instructions, setInstructions] = useState("");
  const [overlaySvg, setOverlaySvg] = useState("");
  const [isZoomed, setIsZoomed] = useState(false);

  const userId = typeof window !== "undefined" ? localStorage.getItem("userId") : null;
  const wallId = typeof window !== "undefined" ? localStorage.getItem("wallId") : null;

  useEffect(() => {
    if (!userId || !wallId || !imageUrl) return;

    const generate = async () => {
      try {
        const genRes = await fetch("/api/generate-path", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId, wallId, imageUrl }),
        });

        const pathData = await genRes.json();
        if (!genRes.ok || !pathData.route?.length) {
          throw new Error(pathData.error || "Path generation failed.");
        }

        setRoute(pathData.route);
        setInstructions(pathData.instructions);

        const overlayRes = await fetch("/api/overlay-path", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            imageUrl,
            route: pathData.route,
            allHolds: pathData.allHolds,
          }),
        });

        const overlayData = await overlayRes.json();
        setOverlaySvg(overlayData.overlaySvg);
      } catch (err) {
        showModal("Display Error", "Failed to generate display.");
      } finally {
        setLoading(false);
      }
    };

    generate();
  }, [userId, wallId, imageUrl, showModal]);

  if (loading) {
    return (
      <div className="text-center py-12">
        <Loader2 className="w-6 h-6 animate-spin text-[#FA8420] mx-auto mb-2" />
        Generating your climbing route...
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-col items-center gap-6 mt-3 w-full">
        <h2 className="text-xl md:text-2xl font-bold text-[#5f6b80] text-center px-4">
          Your Path to the Top
        </h2>

        {/* biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
<div
          className="relative w-full max-w-[500px] aspect-[3/4] rounded-xl shadow-md overflow-hidden cursor-zoom-in"
          onClick={() => setIsZoomed(true)}
        >
          <Image
            src={imageUrl}
            alt="Climbing Wall"
            fill
            className="object-cover"
          />
          {overlaySvg && (
            <div
              className="absolute inset-0 pointer-events-none"
              // biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
              dangerouslySetInnerHTML={{ __html: overlaySvg }}
            />
          )}
        </div>

        <div className="bg-white rounded-xl p-4 shadow-md w-full max-w-lg">
          <h2 className="text-lg font-bold text-[#FA8420] mb-2">
            Your Route Instructions
          </h2>
          <pre className="whitespace-pre-wrap text-sm text-[#5f6b80]">
            {instructions}
          </pre>
        </div>

        <div className="flex gap-4 mt-4">
          <Button
            className="bg-[#FA8420] text-white hover:bg-[#e26e12]"
            onClick={onRestart}
          >
            Upload Another
          </Button>
          <Button
            className="bg-blue-500 text-white hover:bg-blue-600"
            onClick={() => router.push("/home/gallery")}
          >
            Save to Gallery
          </Button>
        </div>
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
            {overlaySvg && (
              <div
                className="absolute inset-0 pointer-events-none"
                // biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
                dangerouslySetInnerHTML={{ __html: overlaySvg }}
              />
            )}
          </div>
        </div>
      )}
    </>
  );
}
