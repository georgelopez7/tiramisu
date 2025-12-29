import "@/app/fonts/poppins.storybook.css";
import "../src/app/globals.css";
import type { Preview } from "@storybook/nextjs";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [
    (Story) => (
      <div style={{ fontFamily: "Poppins !important" }}>
        <Story />
      </div>
    ),
  ],
};

export default preview;
