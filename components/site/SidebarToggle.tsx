"use client";

import React from "react";

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
      <svg
        className="h-5 w-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <rect x="3" y="3" width="18" height="18" rx="4" strokeWidth="2" />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M9 3v18"
        />
      </svg>
    </button>
  );
}
