"use client";

import React from "react";

import { cn } from "@/lib/utils";

export type ContainerProps = React.HTMLAttributes<HTMLDivElement> & {
  children?: React.ReactNode;
  className?: string;
};

export function Container({ children, className, ...props }: ContainerProps) {
  const containerClasses = cn(
    "relative w-full max-w-[1280px] mx-auto px-4 bg-white dark:bg-neutral-950 sm:px-6",
    className,
  );

  return (
    <div className={containerClasses} {...props}>
      {/* Left Dashed Border */}
      <div
        className="pointer-events-none absolute top-0 bottom-0 left-0 w-px select-none"
        style={{
          backgroundImage:
            "linear-gradient(to bottom, var(--color-border-100) 50%, transparent 50%)",
          backgroundSize: "1px 32px",
          backgroundRepeat: "repeat-y",
        }}
      />
      {/* Right Dashed Border */}
      <div
        className="pointer-events-none absolute top-0 right-0 bottom-0 w-px select-none"
        style={{
          backgroundImage:
            "linear-gradient(to bottom, var(--color-border-100) 50%, transparent 50%)",
          backgroundSize: "1px 32px",
          backgroundRepeat: "repeat-y",
        }}
      />
      <div className="relative z-10 w-full">{children}</div>
    </div>
  );
}

export default Container;
