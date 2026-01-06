import React from "react";
import Spacer from "@/components/spacer/spacer";
import {
  ERR_INVALID_WEBHOOK_SIGNATURE,
  ERR_WEBHOOK_OUTDATED,
  ERR_WEBHOOK_SECRET_NOT_DEFINED,
  ValidateWebhookSignature,
} from "@/service/webhook.service";
import CopyToClipboard from "@/components/(buttons)/copy-to-clipboard/copy-to-clipboard";
import DotBanner from "@/components/dot-banner/dot-banner";
import { format } from "date-fns";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { GITHUB_URL } from "@/constants/constants";

const MAX_SKEW = 60 * 5; // 5 MINUTES

interface ISignatureModalProps {
  timestamp: number;
  timestampHeader: string;
  signature: string;
  signatureHeader: string;
  payload: string;
  secret: string;
}

const WebhookSignatureBlock = ({
  timestamp,
  timestampHeader,
  signature,
  signatureHeader,
  payload,
  secret,
}: ISignatureModalProps) => {
  if (!secret || !timestampHeader || !signatureHeader) {
    return (
      <div className="min-h-[100px] px-4 py-2 border rounded-md flex flex-col items-center justify-center">
        <div className="text-center">
          <p>Webhook settings have not been configured yet.</p>
          <Spacer size="xsmall" />
          <Link
            className="flex items-center justify-center gap-1 text-sm text-muted-foreground hover:underline"
            href={GITHUB_URL}
            target="_blank"
          >
            See Docs
            <ArrowUpRight className="size-4" />
          </Link>
        </div>
      </div>
    );
  }

  if (!timestamp || !signature) {
    return <></>;
  }

  const formattedTimestamp = format(
    new Date(timestamp * 1000),
    "yyyy-MM-dd HH:mm"
  );

  const defaultState = {
    color: "gray",
    disabled: true,
  };

  const steps = [
    {
      text: "Webhook Secret configured",
      ...defaultState,
    },
    {
      text: (
        <p className="text-sm">
          Timestamp is valid{" "}
          <span className="text-muted-foreground">({formattedTimestamp})</span>
        </p>
      ),
      ...defaultState,
    },
    {
      text: (
        <p className="text-sm">
          Signature is valid{" "}
          <span className="text-muted-foreground">(using HMAC-SHA256)</span>
        </p>
      ),
      ...defaultState,
    },
  ];

  const err = ValidateWebhookSignature(
    signature,
    payload,
    timestamp,
    MAX_SKEW,
    secret
  );

  switch (err) {
    case ERR_WEBHOOK_SECRET_NOT_DEFINED:
      steps[0] = { ...steps[0], color: "red", disabled: false };
      break;
    case ERR_WEBHOOK_OUTDATED:
      steps[0] = { ...steps[0], color: "green", disabled: false };
      steps[1] = { ...steps[1], color: "red", disabled: false };
      break;
    case ERR_INVALID_WEBHOOK_SIGNATURE:
      steps[0] = { ...steps[0], color: "green", disabled: false };
      steps[1] = { ...steps[1], color: "green", disabled: false };
      steps[2] = { ...steps[2], color: "red", disabled: false };
      break;
    case null:
      steps[0] = { ...steps[0], color: "green", disabled: false };
      steps[1] = { ...steps[1], color: "green", disabled: false };
      steps[2] = { ...steps[2], color: "green", disabled: false };
      break;
  }

  return (
    <div className="min-h-[100px] p-4 border rounded-md">
      <p className="text-md font-medium">Webhook Signature</p>
      <Spacer size="medium" />
      <p className="text-xs italic">{signatureHeader}</p>
      <Spacer size="xsmall" />
      <div className="w-full flex items-center justify-between bg-accent rounded-md px-3 py-2 overflow-x-auto">
        <code className="text-sm font-medium break-all text-muted-foreground">
          {signature}
        </code>
        <CopyToClipboard text={signature} />
      </div>
      <Spacer size="medium" />
      <p className="text-xs italic">{timestampHeader}</p>
      <Spacer size="xsmall" />
      <div className="w-full flex items-center justify-between bg-accent rounded-md px-3 py-2 overflow-x-auto">
        <code className="text-sm font-medium break-all text-muted-foreground">
          {timestamp}
        </code>
        <CopyToClipboard text={String(timestamp)} />
      </div>
      <Spacer size="small" />
      <p className="text-xs text-muted-foreground">
        Max Time Skew: {MAX_SKEW} seconds
      </p>
      <Spacer size="medium" />
      <div className="space-y-2">
        {steps.map((step, index) => (
          <DotBanner
            key={index}
            color={step.color}
            text={step.text}
            disabled={step.disabled}
          />
        ))}
      </div>
    </div>
  );
};

export default WebhookSignatureBlock;
