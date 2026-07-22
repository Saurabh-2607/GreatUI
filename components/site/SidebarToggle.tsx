"use client";

import React from "react";
import { SidebarLeftIcon } from "./Icons";

import { cn } from "@/lib/utils";

interface SidebarToggleProps {
  isOpen: boolean;
  onToggle: () => void;
  className?: string;
}

export default function SidebarToggle({
  isOpen,
  onToggle,
  className,
}: SidebarToggleProps) {
  return (
    <button
      onClick={onToggle}
      title={isOpen ? "Collapse sidebar" : "Open sidebar"}
      className={cn(
        "flex h-10 w-10 cursor-pointer items-center justify-center rounded-xl bg-neutral-100 text-neutral-700 shadow-xs transition-all hover:bg-neutral-200 hover:text-neutral-950 dark:bg-neutral-900 dark:text-neutral-300 dark:hover:bg-neutral-800 dark:hover:text-white",
        className,
      )}
      aria-label="Toggle sidebar"
    >
      <SidebarLeftIcon className="h-5 w-5" />
    </button>
  );
}
