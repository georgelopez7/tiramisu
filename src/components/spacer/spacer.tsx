import { cn } from "@/lib/utils";
import React from "react";

export type ISpace =
  | "xxsmall"
  | "xsmall"
  | "small"
  | "medium"
  | "large"
  | "xlarge"
  | "xxlarge";

export interface ISpacerProps {
  size: ISpace;
}

const Spacer = ({ size }: ISpacerProps) => {
  const CONFIG = {
    xxsmall: "my-5",
    xsmall: "my-1",
    small: "my-2",
    medium: "my-4",
    large: "my-8",
    xlarge: "my-12",
    xxlarge: "my-16",
  };

  return <div className={cn("w-full", CONFIG[size])} />;
};

export default Spacer;
