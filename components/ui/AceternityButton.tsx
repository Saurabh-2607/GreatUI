import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export interface AceternityButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  href?: string;
  variant?: "primary" | "secondary" | "outline" | "ghost" | "destructive";
  size?: "sm" | "md" | "lg" | "xl";
  isLoading?: boolean;
  children: React.ReactNode;
}

const Spinner = () => (
  <svg
    className="mr-2 -ml-1 h-4 w-4 animate-spin text-current"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
  >
    <circle
      className="opacity-25"
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="4"
    />
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
    />
  </svg>
);

export default function AceternityButton({
  className,
  variant = "primary",
  size = "md",
  href,
  isLoading = false,
  children,
  disabled,
  ...props
}: AceternityButtonProps) {
  const baseClasses =
    "cursor-pointer inline-flex items-center justify-center rounded-xl font-medium transition-all duration-200 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed select-none outline-none focus:outline-none";

  const sizeClasses = {
    sm: "h-9 px-4 text-xs",
    md: "h-10 px-5 text-sm",
    lg: "h-11 px-6 text-sm",
    xl: "h-16 px-12 text-xl !rounded-2xl",
  };

  const variantClasses = {
    primary:
      "bg-gradient-to-b from-neutral-800 to-neutral-950 text-neutral-50 shadow-[0px_0px_10px_0px_rgba(255,255,255,0.1)_inset] ring ring-white/10 ring-inset ring-offset-2 ring-offset-neutral-950 hover:shadow-[0px_0px_20px_0px_rgba(255,255,255,0.2)_inset] hover:ring-white/20 dark:bg-gradient-to-b dark:from-neutral-50 dark:to-neutral-200 dark:text-neutral-900 dark:shadow-[0px_0px_10px_0px_rgba(0,0,0,0.05)_inset] dark:ring-black/5 dark:ring-inset dark:ring-offset-2 dark:ring-offset-neutral-50 dark:hover:shadow-[0px_0px_20px_0px_rgba(0,0,0,0.1)_inset] dark:hover:ring-black/10",
    secondary:
      "bg-gradient-to-b from-neutral-50 to-neutral-200 text-neutral-900 shadow-[0px_0px_10px_0px_rgba(0,0,0,0.05)_inset] ring ring-black/5 ring-inset ring-offset-2 ring-offset-neutral-50 hover:shadow-[0px_0px_20px_0px_rgba(0,0,0,0.1)_inset] hover:ring-black/10 dark:bg-gradient-to-b dark:from-neutral-800 dark:to-neutral-900 dark:text-neutral-50 dark:shadow-[0px_0px_10px_0px_rgba(255,255,255,0.1)_inset] dark:ring-white/10 dark:ring-inset dark:ring-offset-2 dark:ring-offset-neutral-950 dark:hover:shadow-[0px_0px_20px_0px_rgba(255,255,255,0.2)_inset] dark:hover:ring-white/20",
    outline:
      "bg-gradient-to-b from-transparent to-neutral-100 text-neutral-900 shadow-[0px_0px_6px_0px_rgba(0,0,0,0.03)_inset] hover:shadow-[0px_0px_12px_0px_rgba(0,0,0,0.06)_inset] ring ring-neutral-300 ring-inset ring-offset-2 ring-offset-neutral-50 hover:ring-neutral-400 dark:bg-gradient-to-b dark:from-transparent dark:to-neutral-900 dark:text-neutral-100 dark:shadow-[0px_0px_6px_0px_rgba(255,255,255,0.05)_inset] dark:hover:shadow-[0px_0px_12px_0px_rgba(255,255,255,0.1)_inset] dark:ring-neutral-800 dark:ring-inset dark:ring-offset-2 dark:ring-offset-neutral-950 dark:hover:ring-neutral-700",
    ghost:
      "bg-transparent text-neutral-700 hover:text-neutral-900 hover:bg-gradient-to-b hover:from-neutral-50 hover:to-neutral-200 hover:shadow-[0px_0px_8px_0px_rgba(0,0,0,0.04)_inset] hover:ring hover:ring-black/5 hover:ring-inset hover:ring-offset-2 hover:ring-offset-neutral-50 dark:bg-transparent dark:text-neutral-400 dark:hover:text-neutral-50 dark:hover:bg-gradient-to-b dark:hover:from-neutral-800 dark:hover:to-neutral-900 dark:hover:shadow-[0px_0px_8px_0px_rgba(255,255,255,0.08)_inset] dark:hover:ring dark:hover:ring-white/10 dark:hover:ring-inset dark:hover:ring-offset-2 dark:hover:ring-offset-neutral-950",
    destructive:
      "bg-gradient-to-b from-red-500 to-red-600 text-white shadow-[0px_0px_10px_0px_rgba(255,255,255,0.15)_inset] ring ring-red-700/20 ring-inset ring-offset-2 ring-offset-red-500 hover:shadow-[0px_0px_20px_0px_rgba(255,255,255,0.25)_inset] hover:ring-red-700/30 dark:bg-gradient-to-b dark:from-red-600 dark:to-red-800 dark:text-red-50 dark:shadow-[0px_0px_10px_0px_rgba(255,255,255,0.1)_inset] dark:ring-red-500/20 dark:ring-inset dark:ring-offset-2 dark:ring-offset-red-950 dark:hover:shadow-[0px_0px_20px_0px_rgba(255,255,255,0.2)_inset] dark:hover:ring-red-500/30",
  };

  const combinedClasses = cn(
    baseClasses,
    sizeClasses[size],
    variantClasses[variant],
    className,
  );

  const isButtonDisabled = disabled || isLoading;

  const content = (
    <span className="flex items-center gap-x-2">
      {isLoading ? (
        <>
          <Spinner />
          Processing...
        </>
      ) : (
        children
      )}
    </span>
  );

  if (href && !isLoading) {
    return (
      <Link href={href} className={combinedClasses} translate="no">
        {content}
      </Link>
    );
  }

  return (
    <button
      disabled={isButtonDisabled}
      className={combinedClasses}
      translate="no"
      {...props}
    >
      {content}
    </button>
  );
}

/**
 * Great UI Component
 *
 * Built with React, TypeScript, Tailwind CSS, and Framer Motion.
 * Designed to be accessible, customizable, and production-ready.
 *
 * Website: https://great-ui.com
 * GitHub: https://github.com/Saurabh-2607/GreatUI
 * X (Great UI): https://x.com/GreatUIHQ
 *
 * Released under the MIT License.
 * Contributions, issues, and feature requests are always welcome.
 *
 * Author: Saurabh Sharma
 * X: https://x.com/srbh_s
 */
