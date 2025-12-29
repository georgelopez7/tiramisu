"use client";

import { Check, Copy } from "lucide-react";
import { useState } from "react";

interface ICopyToClipboardProps {
  text: string;
}

const CopyToClipboard = ({ text }: ICopyToClipboardProps) => {
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
      className="bg-transparent disabled:opacity-40"
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
