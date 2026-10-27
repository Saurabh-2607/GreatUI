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
      <div className="flex items-center gap-2">
        <input
          type="color"
          value={value || "#000000"}
          onChange={(e) => onChange(e.target.value)}
          className="h-8 w-8 cursor-pointer rounded-lg border border-neutral-200/70 bg-transparent p-0 dark:border-neutral-800/70"
        />
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full rounded-lg border border-neutral-200/70 bg-neutral-100/70 px-2.5 py-1.5 font-mono text-xs font-medium text-neutral-800 transition-colors focus:border-neutral-400 focus:outline-none dark:border-neutral-800/70 dark:bg-neutral-900/60 dark:text-neutral-200 dark:focus:border-neutral-600"
        />
      </div>
    );
  }

  return (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full rounded-lg border border-neutral-200/70 bg-neutral-100/70 px-2.5 py-1.5 font-mono text-xs font-medium text-neutral-800 transition-colors focus:border-neutral-400 focus:outline-none dark:border-neutral-800/70 dark:bg-neutral-900/60 dark:text-neutral-200 dark:focus:border-neutral-600"
    />
  );
}
