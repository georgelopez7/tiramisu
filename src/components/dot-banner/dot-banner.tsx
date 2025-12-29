import { cn } from "@/lib/utils";
import React from "react";

interface IDotBannerProps {
  color: string;
  text: string | React.ReactElement;
  disabled?: boolean;
}

const DotBanner = ({ color, text, disabled = false }: IDotBannerProps) => {
  const textElement =
    typeof text === "string" ? <p className="text-sm">{text}</p> : text;

  return (
    <div className={cn("flex items-center gap-2", disabled && "opacity-50")}>
      <div className="rounded-full size-2" style={{ backgroundColor: color }} />
      {textElement}
    </div>
  );
};

export default DotBanner;
