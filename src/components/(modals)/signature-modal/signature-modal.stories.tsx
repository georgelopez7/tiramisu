import type { Meta, StoryObj } from "@storybook/nextjs";
import SignatureModal from "./signature-modal";
import crypto from "crypto";

const meta: Meta<typeof SignatureModal> = {
  title: "Components/SignatureModal",
  component: SignatureModal,
};

export default meta;
type Story = StoryObj<typeof SignatureModal>;

// CONSTANTS
const secret = "123456789";
const text = "Validate Signature";
const timestamp = Math.floor(new Date().getTime() / 1000);
const payload = JSON.stringify({
  key: "value",
});

const hasher = crypto.createHmac("sha256", secret);
hasher.update(timestamp + "." + payload);
const signature = hasher.digest("hex");

export const Default: Story = {
  render: () => {
    return (
      <SignatureModal
        text={text}
        timestamp={timestamp}
        signature={signature}
        payload={payload}
        secret={secret}
      />
    );
  },
};

export const NoWebhookSecret: Story = {
  render: () => {
    return (
      <SignatureModal
        text={text}
        timestamp={timestamp}
        signature={signature}
        payload={payload}
        secret=""
      />
    );
  },
};

export const InvalidTimestamp: Story = {
  render: () => {
    return (
      <SignatureModal
        text={text}
        timestamp={timestamp - 10000}
        signature={signature}
        payload={payload}
        secret={secret}
      />
    );
  },
};
