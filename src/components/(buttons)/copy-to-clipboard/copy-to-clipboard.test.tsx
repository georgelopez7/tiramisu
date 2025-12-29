/// <reference lib="dom" />

import "@testing-library/jest-dom";
import { test, expect } from "bun:test";
import { render, screen, fireEvent } from "@testing-library/react";
import CopyToClipboard from "./copy-to-clipboard";

test("should render CopyToClipboard", () => {
  render(<CopyToClipboard text="This has been copied" />);
  expect(screen.getByTestId("copy-to-clipboard-copy")).toBeDefined();
});

test("should render Check icon when copied", async () => {
  render(<CopyToClipboard text="This has been copied" />);
  fireEvent.click(screen.getByRole("button"));
  expect(screen.getByTestId("copy-to-clipboard-check")).toBeDefined();
  expect(screen.getByRole("button")).toBeDisabled();
});
