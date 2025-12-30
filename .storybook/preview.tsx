import "@/app/fonts/poppins.storybook.css";
import "../src/app/globals.css";
import type { Preview } from "@storybook/nextjs";
import { ThemeProvider } from "../src/lib/theme.utils";

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
      <ThemeProvider
        attribute="class"
        defaultTheme="light"
        enableSystem
        disableTransitionOnChange
      >
        <div style={{ fontFamily: "Poppins !important" }}>
          <Story />
        </div>
      </ThemeProvider>
    ),
  ],
};

export default preview;
