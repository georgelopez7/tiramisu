import { cn } from "@/lib/utils";
import React from "react";

const RequestMethodLabel = ({ method }: { method: string }) => {
  let textColor = "";
  let bgColor = "";
  switch (method) {
    case "GET":
      textColor = "text-green-800";
      bgColor = "bg-green-100";
      break;
    case "POST":
      textColor = "text-blue-800";
      bgColor = "bg-blue-100";
      break;
    case "PUT":
      textColor = "text-yellow-800";
      bgColor = "bg-yellow-100";
      break;
    case "DELETE":
      textColor = "text-red-800";
      bgColor = "bg-red-100";
      break;
    case "PATCH":
      textColor = "text-purple-800";
      bgColor = "bg-purple-100";
      break;
    case "HEAD":
      textColor = "text-gray-800";
      bgColor = "bg-gray-100";
      break;
    case "OPTIONS":
      textColor = "text-gray-800";
      bgColor = "bg-gray-100";
      break;
    default:
      textColor = "text-gray-800";
      bgColor = "bg-gray-100";
      break;
  }

  return (
    <div className={cn("px-2 py-1 rounded-md font-bold", textColor, bgColor)}>
      <p className="text-xs">{method}</p>
    </div>
  );
};

export default RequestMethodLabel;
