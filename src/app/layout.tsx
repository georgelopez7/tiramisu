import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/lib/theme.utils";
import { poppins } from "@/app/fonts/poppins";

export const metadata: Metadata = {
  title: {
    default:
      "Tiramisu - Inspect, capture, and debug HTTP requests in real time",
    template: "%s | Tiramisu",
  },
  description:
    "Inspect, capture, and debug HTTP requests in real time. Perfect for testing webhooks, APIs, and integrations with ease.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
