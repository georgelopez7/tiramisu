import type { Meta, StoryObj } from "@storybook/nextjs";
import BasePathBanner from "./base-path-banner";

const meta: Meta<typeof BasePathBanner> = {
  title: "Components/Base Path Banner",
  component: BasePathBanner,
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof BasePathBanner>;

export const Default: Story = {
  render: () => {
    return <BasePathBanner />;
  },
};
