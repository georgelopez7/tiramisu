import Spacer from "@/components/spacer/spacer";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { IRequestHeader } from "@/domain/request";

interface IWebhookModalProps {
  text: string;
  header: IRequestHeader;
}

const WebhookModal = ({ text, header }: IWebhookModalProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="flex items-center gap-2 text-xs px-2 py-1 hover:bg-gray-100 rounded-md border">
          <div className="rounded-full bg-purple-400 size-2" />
          {text}
        </button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Validate Webhook Signature</DialogTitle>
        </DialogHeader>
        <p>Header</p>
        <Spacer size="small" />
        <p>{header.key}</p>
        <Spacer size="small" />
        <p>Value</p>
        <Spacer size="small" />
        <p>{header.value}</p>
        <Spacer size="small" />
      </DialogContent>
    </Dialog>
  );
};

export default WebhookModal;
