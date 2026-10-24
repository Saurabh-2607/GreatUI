"use client";

import React from "react";

interface ControlInputProps {
  type?: "text" | "color";
  value: string;
  onChange: (value: string) => void;
}

export function ControlInput({
  type = "text",
  value,
  onChange,
}: ControlInputProps) {
  if (type === "color") {
    return (
      <div className="flex items-center gap-3">
        <input
          type="color"
          value={value || "#000000"}
          onChange={(e) => onChange(e.target.value)}
          className="h-8.5 w-8.5 cursor-pointer rounded-lg border-0 bg-transparent p-0"
        />
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full rounded-lg bg-neutral-100 px-3 py-2 font-mono text-xs font-medium text-neutral-800 transition-colors hover:bg-neutral-200/50 focus:outline-none dark:bg-neutral-900/60 dark:text-neutral-200 dark:hover:bg-neutral-800/60"
        />
      </div>
    );
  }

  return (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full rounded-lg bg-neutral-100 px-3 py-2 font-mono text-xs font-medium text-neutral-800 transition-colors hover:bg-neutral-200/50 focus:outline-none dark:bg-neutral-900/60 dark:text-neutral-200 dark:hover:bg-neutral-800/60"
    />
  );
}
