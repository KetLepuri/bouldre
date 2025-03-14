import React, { useState } from "react";
import { Progress } from "@/components/ui/progress";
import { Image } from "lucide-react";

const UploadedList = () => {
  const [uploads, setUploads] = useState([
    { name: "Route1.jpg", size: "2.5 MB", progress: 70 },
    { name: "Route2.jpg", size: "3.2 MB", progress: 40 },
  ]);

  return (
    <div>
      <h2 className="text-lg font-semibold mb-4 text-center md:text-left">
        Uploaded Photos
      </h2>
      <div className="space-y-3">
        {uploads.map((file, index) => (
          // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
<div key={index} className="flex items-center space-x-2">
            <Image className="w-8 h-8" />
            <div className="flex-1">
              <p className="text-sm font-medium">{file.name}</p>
              <Progress value={file.progress} className="h-2" />
            </div>
            <span className="text-xs text-gray-500">{file.size}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UploadedList;
