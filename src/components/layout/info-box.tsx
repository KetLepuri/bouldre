import React from "react";
import { Button } from "@/components/ui/button";

type InfoModalProps = {
  title: string;
  message: string;
  onClose: () => void;
};

export default function InfoModal({ title, message, onClose }: InfoModalProps) {
  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
      <div className="bg-white rounded-xl shadow-lg p-6 w-[90%] max-w-sm text-center">
        <h2 className="text-lg font-bold text-[#FA8420] mb-4">{title}</h2>
        <p className="text-sm text-[#5f6b80] mb-6">{message}</p>
        <Button
          onClick={onClose}
          className="w-full bg-[#FA8420] hover:bg-[#e26e12] text-white"
        >
          OK
        </Button>
      </div>
    </div>
  );
}
