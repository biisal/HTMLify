"use client";

import { type HTMLAttributes } from "react";

import { cn } from "@/lib/utils";

export const Loader = ({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "h-full w-full z-50 backdrop-blur-sm flex fixed top-0 left-0 items-center justify-center",
      className,
    )}
    {...props}
  >
    <span className="loader"></span>
  </div>
);
