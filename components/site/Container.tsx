"use client";

import React from "react";

import { cn } from "@/lib/utils";

export type ContainerProps = React.HTMLAttributes<HTMLDivElement> & {
  children?: React.ReactNode;
  className?: string;
};

export function Container({ children, className, ...props }: ContainerProps) {
  const containerClasses = cn(
    "relative mx-auto w-[calc(100%-2rem)] max-w-[1280px] sm:w-[calc(100%-3rem)] md:w-[calc(100%-4rem)] lg:w-[calc(100%-6rem)] xl:w-full",
    className,
  );

  return (
    <div className={containerClasses} {...props}>
      <div
        className="pointer-events-none absolute top-0 bottom-0 left-0 w-px select-none"
        style={{
          backgroundImage:
            "linear-gradient(to bottom, var(--color-border-100) 50%, transparent 50%)",
          backgroundSize: "1px 32px",
          backgroundRepeat: "repeat-y",
        }}
      />
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
