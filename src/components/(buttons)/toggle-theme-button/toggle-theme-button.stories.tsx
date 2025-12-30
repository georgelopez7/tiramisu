import type { Meta, StoryObj } from "@storybook/nextjs";
import ToggleThemeButton from "./toggle-theme-button";

const meta: Meta<typeof ToggleThemeButton> = {
  title: "Components/Buttons/Toggle Theme Button",
  component: ToggleThemeButton,
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof ToggleThemeButton>;

export const Default: Story = {
  render: () => {
    return <ToggleThemeButton />;
  },
};
