import React from "react";
import Spacer from "@/components/spacer/spacer";

interface RequestPayloadBlockProps {
  payload: string;
}

const RequestPayloadBlock = ({ payload }: RequestPayloadBlockProps) => {
  let formattedPayload;
  try {
    const parsed = JSON.parse(payload);
    formattedPayload = JSON.stringify(parsed, null, 2);
  } catch {
    formattedPayload = payload;
  }

  return (
    <div className="p-4 border rounded-md">
      <p className="text-md font-medium">Payload</p>
      <Spacer size="xsmall" />
      <div className="relative">
        <pre className="bg-muted rounded-lg p-4 overflow-x-auto text-sm">
          <code className="font-mono text-foreground">{formattedPayload}</code>
        </pre>
      </div>
    </div>
  );
};

export default RequestPayloadBlock;
