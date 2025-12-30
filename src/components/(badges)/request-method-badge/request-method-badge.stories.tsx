import type { Meta, StoryObj } from "@storybook/nextjs";
import RequestMethodBadge from "./request-method-badge";

const meta: Meta<typeof RequestMethodBadge> = {
  title: "Components/Badges/Request Method Badge",
  component: RequestMethodBadge,
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof RequestMethodBadge>;

export const GETMethod: Story = {
  render: () => {
    return <RequestMethodBadge method="GET" />;
  },
};

export const POSTMethod: Story = {
  render: () => {
    return <RequestMethodBadge method="POST" />;
  },
};

export const PUTMethod: Story = {
  render: () => {
    return <RequestMethodBadge method="PUT" />;
  },
};

export const DELETEMethod: Story = {
  render: () => {
    return <RequestMethodBadge method="DELETE" />;
  },
};

export const PATCHMethod: Story = {
  render: () => {
    return <RequestMethodBadge method="PATCH" />;
  },
};

export const HEADMethod: Story = {
  render: () => {
    return <RequestMethodBadge method="HEAD" />;
  },
};

export const OPTIONSMethod: Story = {
  render: () => {
    return <RequestMethodBadge method="OPTIONS" />;
  },
};
