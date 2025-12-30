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

interface ISignatureModalProps {
  timestamp: number;
  signature: string;
  payload: string;
  // TODO: ADD TIME SKEW
  secret: string;
}

const WebhookSignatureBlock = ({
  timestamp,
  signature,
  payload,
  secret,
}: ISignatureModalProps) => {
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
    60 * 5,
    secret
  );

  switch (err) {
    case ERR_WEBHOOK_SECRET_NOT_DEFINED:
      steps[0] = { ...steps[0], color: "red", disabled: false };
    case ERR_WEBHOOK_OUTDATED:
      steps[0] = { ...steps[0], color: "green", disabled: false };
      steps[1] = { ...steps[1], color: "red", disabled: false };
    case ERR_INVALID_WEBHOOK_SIGNATURE:
      steps[0] = { ...steps[0], color: "green", disabled: false };
      steps[1] = { ...steps[1], color: "green", disabled: false };
      steps[2] = { ...steps[2], color: "red", disabled: false };
    case null:
      steps[0] = { ...steps[0], color: "green", disabled: false };
      steps[1] = { ...steps[1], color: "green", disabled: false };
      steps[2] = { ...steps[2], color: "green", disabled: false };
  }

  if (!secret) {
    return (
      <div className="min-h-[100px] px-4 py-2 border rounded-md flex flex-col items-center justify-center">
        <div className="text-center">
          <p>Webhook settings have not been configured yet.</p>
          <Spacer size="xsmall" />
          <Link
            className="flex items-center justify-center gap-1 text-sm text-muted-foreground hover:underline"
            href="/"
            target="_blank"
          >
            See Docs
            <ArrowUpRight className="size-4" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[100px] px-4 py-2 border rounded-md">
      <p className="text-md font-medium">Webhook Signature</p>
      <Spacer size="xsmall" />
      <div className="w-full flex items-center justify-between bg-gray-100 rounded-md px-3 py-2 overflow-x-auto">
        <code className="text-sm font-medium break-all">{signature}</code>
        <CopyToClipboard text={signature} />
      </div>
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
