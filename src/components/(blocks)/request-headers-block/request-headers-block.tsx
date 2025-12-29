"use client";

import { IRequestHeader } from "@/domain/request";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import Spacer from "@/components/spacer/spacer";
import CopyToClipboard from "@/components/(buttons)/copy-to-clipboard/copy-to-clipboard";

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
          className="border rounded-md p-1 hover:bg-accent"
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
          <Spacer size="small" />
          <div className="max-h-[300px] overflow-y-auto">
            {headers.map((header, index) => (
              <div key={header.key}>
                <div className="flex items-center justify-between">
                  <Badge
                    variant="secondary"
                    className="font-mono text-xs font-medium"
                  >
                    {header.key}
                  </Badge>
                  <CopyToClipboard
                    className="mr-8"
                    text={`${header.key}: ${header.value}`}
                  />
                </div>
                <Spacer size="small" />
                <div className="font-mono text-sm leading-relaxed text-foreground/90">
                  {header.value}
                </div>
                {index !== headers.length - 1 && <hr className="my-3" />}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default RequestHeadersBlock;
