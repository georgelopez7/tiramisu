import React from "react";
import Spacer from "../spacer/spacer";

interface RequestPayloadBlockProps {
  payload: string;
}

const RequestPayloadBlock = ({ payload }: RequestPayloadBlockProps) => {
  const formattedPayload = JSON.stringify(payload, null, 2);

  return (
    <div className="px-4 py-2 border rounded-md">
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
