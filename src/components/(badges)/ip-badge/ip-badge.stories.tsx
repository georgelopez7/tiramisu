import type { Meta, StoryObj } from "@storybook/nextjs";
import IPBadge from "./ip-badge";

const meta: Meta<typeof IPBadge> = {
  title: "Components/IPBadge",
  component: IPBadge,
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof IPBadge>;

export const Default: Story = {
  render: () => {
    return (
      <IPBadge
        geolocation={{
          ip: "8.8.8.8",
          city: "Mountain View",
          region: "California",
          country: "US",
        }}
      />
    );
  },
};

export const Localhost: Story = {
  render: () => {
    return (
      <IPBadge
        geolocation={{
          ip: "::1",
          city: "",
          region: "",
          country: "",
        }}
      />
    );
  },
};
