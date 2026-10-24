"use client";

import React from "react";
import { type ControlOption } from "@/lib/propsRegistry";

interface ControlSelectProps {
  value: string | number;
  options: ControlOption[];
  onChange: (value: string | number | boolean) => void;
}

export function ControlSelect({
  value,
  options,
  onChange,
}: ControlSelectProps) {
  return (
    <div className="flex w-full flex-col gap-0.5 rounded-lg bg-neutral-100 p-1 dark:bg-neutral-900/60">
      {options.map((opt) => {
        const isSelected = value === opt.value;
        return (
          <button
            key={String(opt.value)}
            type="button"
            onClick={() => onChange(opt.value)}
            className={`w-full cursor-pointer rounded-lg px-3 py-1.5 text-left font-mono text-xs font-medium transition-all ${
              isSelected
                ? "bg-white text-neutral-900 shadow-sm dark:bg-[#222] dark:text-white"
                : "text-neutral-600 hover:bg-neutral-200/60 hover:text-neutral-900 dark:text-neutral-400 dark:hover:bg-[#1a1a1a] dark:hover:text-white"
            }`}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}
