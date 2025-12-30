import type { Meta, StoryObj } from "@storybook/nextjs";
import CopyToClipboard from "./copy-to-clipboard";

const meta: Meta<typeof CopyToClipboard> = {
  title: "Components/Buttons/Copy To Clipboard",
  component: CopyToClipboard,
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof CopyToClipboard>;

export const Default: Story = {
  render: () => {
    return <CopyToClipboard text={"This has been copied"} />;
  },
};
