import React from "react";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";

const UploadSection = () => {
  return (
    <div className="text-center">
      <h2 className="text-lg font-semibold mb-4">Upload or Capture Image</h2>
      <div className="flex space-x-4 justify-center">
        <Button variant="outline" className="flex items-center">
          <Upload className="mr-2" /> Take a Photo
        </Button>
        <Button variant="outline" className="flex items-center">
          <Upload className="mr-2" /> Upload File
        </Button>
      </div>
    </div>
  );
};

export default UploadSection;
