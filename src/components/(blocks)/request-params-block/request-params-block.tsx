"use client";

import { IRequestParam } from "@/domain/request";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import Spacer from "@/components/spacer/spacer";
import CopyToClipboard from "@/components/(buttons)/copy-to-clipboard/copy-to-clipboard";

interface IRequestParamsBlockProps {
  params: IRequestParam[];
}

const RequestParamsBlock = ({ params }: IRequestParamsBlockProps) => {
  const [show, setShow] = useState(false);
  return (
    <div className="px-4 py-2 border rounded-md">
      <div className="flex items-center justify-between">
        <p className="text-md font-medium">Query Params</p>
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
            {params.map((param, index) => (
              <div key={param.key}>
                <div className="flex items-center justify-between">
                  <Badge
                    variant="secondary"
                    className="font-mono text-xs font-medium"
                  >
                    {param.key}
                  </Badge>
                  <CopyToClipboard
                    className="mr-8"
                    text={`${param.key}: ${param.value}`}
                  />
                </div>
                <Spacer size="small" />
                <div className="font-mono text-sm leading-relaxed text-foreground/90">
                  {param.value}
                </div>
                {index !== params.length - 1 && <hr className="my-3" />}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default RequestParamsBlock;
