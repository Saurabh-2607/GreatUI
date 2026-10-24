"use client";

import React, { useId } from "react";
import { type ControlOption } from "@/lib/propsRegistry";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";

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
  const groupId = useId();
  const isCompact =
    options.length <= 5 && options.every((o) => String(o.label).length <= 5);

  return (
    <div
      className={cn(
        "relative rounded-xl border border-neutral-200/80 bg-neutral-100/80 p-1 dark:border-neutral-800/80 dark:bg-[#141414]",
        isCompact
          ? "grid auto-cols-fr grid-flow-col gap-0.5"
          : "flex w-full flex-col gap-0.5",
      )}
    >
      {options.map((opt) => {
        const isSelected = value === opt.value;
        return (
          <button
            key={String(opt.value)}
            type="button"
            onClick={() => onChange(opt.value)}
            className={cn(
              "relative flex h-7.5 cursor-pointer items-center rounded-lg px-2.5 text-xs font-medium transition-colors",
              isCompact
                ? "justify-center text-center"
                : "w-full justify-start text-left",
              isSelected
                ? "text-neutral-950 dark:text-white"
                : "text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white",
            )}
          >
            {isSelected && (
              <motion.div
                layoutId={`select-pill-${groupId}`}
                className="absolute inset-0 rounded-lg bg-white shadow-xs dark:bg-neutral-800"
                transition={{ type: "spring", stiffness: 450, damping: 35 }}
              />
            )}
            <span className="relative z-10 min-w-0 truncate">{opt.label}</span>
          </button>
        );
      })}
    </div>
  );
}
