"use client";

import React from "react";
import { cn } from "@/lib/utils";

export interface ControlButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg" | "icon";
  fullWidth?: boolean;
}

export function ControlButton({
  children,
  variant = "primary",
  size = "md",
  fullWidth = false,
  className,
  type = "button",
  ...props
}: ControlButtonProps) {
  const variantClasses = {
    primary:
      "bg-neutral-900 text-white shadow-xs hover:bg-neutral-800 dark:bg-white dark:text-neutral-950 dark:hover:bg-neutral-200 font-semibold",
    secondary:
      "bg-neutral-100 text-neutral-700 hover:bg-neutral-200 hover:text-neutral-950 dark:bg-neutral-900 dark:text-neutral-300 dark:hover:bg-neutral-800 dark:hover:text-white font-semibold",
    outline:
      "border border-neutral-200/90 bg-neutral-50/80 text-neutral-900 hover:border-neutral-400 dark:border-neutral-800/90 dark:bg-neutral-900/50 dark:text-white dark:hover:border-neutral-600 font-semibold",
    ghost:
      "text-neutral-600 hover:bg-neutral-200/60 hover:text-neutral-950 dark:text-neutral-400 dark:hover:bg-neutral-800/60 dark:hover:text-white font-semibold",
  };

  const sizeClasses = {
    sm: "h-7.5 px-2.5 text-xs rounded-lg",
    md: "h-8.5 px-3 text-xs rounded-lg",
    lg: "h-9 px-3.5 text-xs rounded-lg",
    icon: "h-7.5 w-7.5 p-0 rounded-lg shrink-0 justify-center",
  };

  return (
    <button
      type={type}
      className={cn(
        "inline-flex cursor-pointer items-center justify-center gap-2 transition-all active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50",
        variantClasses[variant],
        sizeClasses[size],
        fullWidth && "w-full",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
