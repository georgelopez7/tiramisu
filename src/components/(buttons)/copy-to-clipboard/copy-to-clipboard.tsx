"use client";

import { cn } from "@/lib/utils";
import { Check, Copy } from "lucide-react";
import { useState } from "react";

interface ICopyToClipboardProps {
  className?: string;
  text: string;
}

const CopyToClipboard = ({ className, text }: ICopyToClipboardProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 800);
  };

  return (
    <button
      className={cn("bg-transparent disabled:opacity-40", className)}
      onClick={handleCopy}
      disabled={copied}
    >
      {copied ? (
        <Check className="size-4" data-testid="copy-to-clipboard-check" />
      ) : (
        <Copy className="size-4" data-testid="copy-to-clipboard-copy" />
      )}
    </button>
  );
};

export default CopyToClipboard;
