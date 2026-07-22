"use client";

import React from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import { SidebarLeft01Icon } from "@hugeicons/core-free-icons";

interface SidebarToggleProps {
  isOpen: boolean;
  onToggle: () => void;
  className?: string;
}

export default function SidebarToggle({
  isOpen,
  onToggle,
  className = "",
}: SidebarToggleProps) {
  return (
    <button
      onClick={onToggle}
      title={isOpen ? "Collapse sidebar" : "Open sidebar"}
      className={`flex h-10 w-10 cursor-pointer items-center justify-center rounded-xl bg-neutral-950 text-white shadow-xs transition-all hover:bg-neutral-900 dark:bg-neutral-950 dark:text-white dark:hover:bg-neutral-900 ${className}`}
      aria-label="Toggle sidebar"
    >
      <HugeiconsIcon icon={SidebarLeft01Icon} className="h-5 w-5" />
    </button>
  );
}
