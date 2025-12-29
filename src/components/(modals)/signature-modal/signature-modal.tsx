import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Spacer from "@/components/spacer/spacer";
import {
  ERR_INVALID_WEBHOOK_SIGNATURE,
  ERR_WEBHOOK_OUTDATED,
  ERR_WEBHOOK_SECRET_NOT_DEFINED,
  ValidateWebhookSignature,
} from "@/service/webhook.service";
import DotBanner from "@/components/dot-banner/dot-banner";
import { format } from "date-fns";

interface ISignatureModalProps {
  text: string;
  timestamp: number;
  signature: string;
  payload: string;
  secret: string;
}

const SignatureModal = ({
  text,
  timestamp,
  signature,
  payload,
  secret,
}: ISignatureModalProps) => {
  const err = ValidateWebhookSignature(
    signature,
    payload,
    timestamp,
    60 * 5,
    secret
  );
  const stepConfig = (() => {
    switch (err) {
      case ERR_WEBHOOK_SECRET_NOT_DEFINED:
        return {
          1: { color: "red", disabled: false },
          2: { color: "gray", disabled: true },
          3: { color: "gray", disabled: true },
        };
      case ERR_WEBHOOK_OUTDATED:
        return {
          1: { color: "green", disabled: false },
          2: { color: "red", disabled: false },
          3: { color: "gray", disabled: true },
        };
      case ERR_INVALID_WEBHOOK_SIGNATURE:
        return {
          1: { color: "green", disabled: false },
          2: { color: "green", disabled: false },
          3: { color: "red", disabled: false },
        };
      case null:
        return {
          1: { color: "green", disabled: false },
          2: { color: "green", disabled: false },
          3: { color: "green", disabled: false },
        };
      default:
        return {
          1: { color: "gray", disabled: true },
          2: { color: "gray", disabled: true },
          3: { color: "gray", disabled: true },
        };
    }
  })();

  const formattedTimestamp = format(
    new Date(timestamp * 1000),
    "yyyy-MM-dd HH:mm"
  );
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="flex items-center gap-2 text-xs px-2 py-1 hover:bg-gray-100 rounded-md border">
          <div className="rounded-full bg-orange-400 size-2" />
          <p className="text-xs font-medium">{text}</p>
        </button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Validate Signature</DialogTitle>
        </DialogHeader>
        <div className="w-full">
          <p className="text-xs">Signature:</p>
          <Spacer size="xsmall" />
          <div className="w-full bg-gray-100 rounded-md px-3 py-2 overflow-x-auto">
            <code className="text-sm font-medium break-all">{signature}</code>
          </div>
        </div>
        <DotBanner
          color={stepConfig[1].color}
          text={<p className="text-sm">Webhook Secret configured</p>}
          disabled={stepConfig[1].disabled}
        />
        <DotBanner
          color={stepConfig[2].color}
          text={
            <p className="text-sm">
              Timestamp is valid{" "}
              <span className="text-muted-foreground">
                ({formattedTimestamp})
              </span>
            </p>
          }
          disabled={stepConfig[2].disabled}
        />
        <DotBanner
          color={stepConfig[3].color}
          text={
            <p className="text-sm">
              Signature is valid{" "}
              <span className="text-muted-foreground">(using HMAC-SHA256)</span>
            </p>
          }
          disabled={stepConfig[3].disabled}
        />
      </DialogContent>
    </Dialog>
  );
};

export default SignatureModal;
