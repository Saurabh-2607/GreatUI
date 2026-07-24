import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export interface BrowseAllButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  href?: string;
  variant?: "primary" | "secondary" | "outline" | "ghost" | "destructive";
  size?: "default" | "xs" | "sm" | "lg";
  isLoading?: boolean;
  children: React.ReactNode;
}

const Spinner = () => (
  <svg
    className="mr-2 -ml-1 h-4 w-4 animate-spin text-current"
    fill="none"
    viewBox="0 0 24 24"
  >
    <circle
      className="opacity-25"
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="3"
    />
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
    />
  </svg>
);

export default function BrowseAllButton({
  className,
  variant = "primary",
  size = "default",
  href,
  isLoading = false,
  children,
  disabled,
  ...props
}: BrowseAllButtonProps) {
  const baseStyles =
    "group inline-flex items-center justify-center whitespace-nowrap transition duration-200 ease-out outline-none focus:outline-none disabled:pointer-events-none border-x border-b disabled:shadow-none";

  const variantStyles = {
    primary:
      "border-t-2 border-neutral-800/50 border-x-transparent border-b-transparent dark:border-neutral-300/50 bg-neutral-900 text-neutral-50 shadow-[0_1px_2px_rgba(0,0,0,0.2),inset_0_1px_4px_rgba(255,255,255,0.1)] hover:bg-neutral-850 dark:hover:bg-neutral-200 dark:bg-neutral-100 dark:text-neutral-900 dark:shadow-[inset_0_1px_1px_rgba(255,255,255,0.8)] disabled:border-transparent dark:disabled:border-transparent disabled:bg-neutral-100 disabled:text-neutral-400 dark:disabled:bg-neutral-800 dark:disabled:text-neutral-500",
    secondary:
      "border-t-2 border-neutral-300/60 border-x-transparent border-b-transparent dark:border-neutral-700/60 bg-neutral-100 text-neutral-800 hover:bg-neutral-200/80 hover:text-neutral-900 shadow-[inset_0_1px_2px_rgba(255,255,255,0.5)] dark:bg-neutral-800 dark:text-neutral-100 dark:shadow-[inset_0_1px_2px_rgba(255,255,255,0.05)] dark:hover:bg-neutral-700 disabled:border-transparent dark:disabled:border-transparent disabled:bg-neutral-50 disabled:text-neutral-400 dark:disabled:bg-neutral-800/40 dark:disabled:text-neutral-600",
    outline:
      "border border-neutral-300 dark:border-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-800 dark:text-neutral-100 text-neutral-800 shadow-[inset_0_1px_0_rgba(255,255,255,0.6)] dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.15)] disabled:border-neutral-200 disabled:text-neutral-400 dark:disabled:border-neutral-800 dark:disabled:text-neutral-600",
    ghost:
      "border-transparent bg-transparent text-neutral-600 dark:text-neutral-400 hover:bg-neutral-50 hover:text-neutral-900 hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.6)] dark:hover:bg-neutral-800/40 dark:hover:text-neutral-100 dark:hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] disabled:text-neutral-300 dark:disabled:text-neutral-700",
    destructive:
      "border-t-2 border-red-700/50 border-x-transparent border-b-transparent dark:border-red-400/50 bg-red-600 text-white hover:bg-red-650 shadow-[0_1px_2px_rgba(0,0,0,0.15),inset_0_1px_4px_rgba(255,255,255,0.15)] dark:bg-red-500 dark:hover:bg-red-550 disabled:border-transparent dark:disabled:border-transparent disabled:bg-red-50 disabled:text-red-400 dark:disabled:bg-red-950/40 dark:disabled:text-red-500",
  };

  const sizeStyles = {
    default: "h-11 gap-3.5 rounded-[13px] px-[18px] text-sm font-medium",
    xs: "h-6 gap-1 rounded-[10px] px-2 text-xs",
    sm: "h-7 gap-1 rounded-[12px] px-2.5 text-[0.8rem]",
    lg: "h-12 gap-4 rounded-[15px] px-[22px] text-base",
  };

  const combinedClasses = cn(
    baseStyles,
    variantStyles[variant],
    sizeStyles[size],
    className,
  );

  const isButtonDisabled = disabled || isLoading;

  const content = (
    <>
      {isLoading && <Spinner />}
      {children}
    </>
  );

  if (href && !isLoading) {
    return (
      <Link href={href} className={combinedClasses}>
        {content}
      </Link>
    );
  }

  return (
    <button disabled={isButtonDisabled} className={combinedClasses} {...props}>
      {content}
    </button>
  );
}
