"use client";

import { useEffect, useState } from "react";
import CopyToClipboard from "@/components/(buttons)/copy-to-clipboard/copy-to-clipboard";

const BasePathBanner = () => {
  const [path, setPath] = useState<string>("");
  useEffect(() => {
    if (typeof window !== "undefined") {
      const path = window.location.origin;
      setPath(path);
    }
  }, []);

  return (
    <div className="flex items-center justify-between gap-4 border rounded-lg p-2 px-3 text-sm">
      <p className="font-semibold">
        Base Path:
        <span className="ml-2 font-normal">{path}</span>
      </p>
      <CopyToClipboard text={path} />
    </div>
  );
};

export default BasePathBanner;
