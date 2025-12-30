import { cn } from "@/lib/utils";
import React from "react";

interface IRequestMethodBadgeProps {
  method: string;
}

const RequestMethodBadge = ({ method }: IRequestMethodBadgeProps) => {
  const styles = (() => {
    switch (method) {
      case "GET":
        return "bg-green-100 text-green-800";
      case "POST":
        return "bg-yellow-100 text-yellow-800";
      case "PUT":
        return "bg-blue-100 text-blue-800";
      case "DELETE":
        return "bg-red-100 text-red-800";
      case "PATCH":
        return "bg-purple-100 text-purple-800";
      case "HEAD":
        return "bg-gray-100 text-gray-800";
      case "OPTIONS":
        return "bg-pink-100 text-pink-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  })();

  return (
    <div className={cn("px-2 py-1 rounded-md font-bold", styles)}>
      <p className="text-xs">{method}</p>
    </div>
  );
};

export default RequestMethodBadge;
