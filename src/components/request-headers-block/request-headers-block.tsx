"use client";

import { IRequestHeader } from "@/domain/request";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import { Badge } from "../ui/badge";
import Spacer from "../spacer/spacer";

interface IRequestHeadersBlockProps {
  headers: IRequestHeader[];
}

const RequestHeadersBlock = ({ headers }: IRequestHeadersBlockProps) => {
  const [show, setShow] = useState(false);
  return (
    <div className="px-4 py-2 border rounded-md">
      <div className="flex items-center justify-between">
        <p className="text-md font-medium">Headers</p>
        <button
          className="border rounded-md p-1 hover:bg-gray-100"
          onClick={() => setShow(!show)}
        >
          {show ? (
            <ChevronDown className="size-4" />
          ) : (
            <ChevronUp className="size-4" />
          )}
        </button>
      </div>
      {show && (
        <div className="flex flex-col">
          <Spacer size="xsmall" />
          <div className="max-h-[300px] overflow-y-auto">
            {headers.map((header) => (
              <div key={header.key}>
                <Badge
                  variant="secondary"
                  className="font-mono text-xs font-medium"
                >
                  {header.key}
                </Badge>
                <Spacer size="small" />
                <div className="font-mono text-sm leading-relaxed text-foreground/90">
                  {header.value}
                </div>
                <hr className="my-3" />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default RequestHeadersBlock;
