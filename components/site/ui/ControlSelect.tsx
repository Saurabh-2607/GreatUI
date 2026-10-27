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
    options.length <= 4 && options.every((o) => String(o.label).length <= 10);

  return (
    <div
      className={cn(
        "relative rounded-lg border border-neutral-200/70 bg-neutral-100/70 p-1 dark:border-neutral-800/70 dark:bg-neutral-900/60",
        isCompact
          ? "grid auto-cols-fr grid-flow-col gap-1"
          : "flex w-full flex-col gap-0.5",
      )}
    >
      {options.map((opt) => {
        const isSelected = value === opt.value;
        const displayLabel =
          typeof opt.label === "string"
            ? opt.label.charAt(0).toUpperCase() + opt.label.slice(1)
            : opt.label;

        return (
          <button
            key={String(opt.value)}
            type="button"
            onClick={() => onChange(opt.value)}
            className={cn(
              "relative flex h-7.5 cursor-pointer items-center rounded-md px-2.5 text-xs font-medium transition-colors",
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
                className="absolute inset-0 rounded-md bg-white shadow-xs dark:bg-neutral-800"
                transition={{ type: "spring", stiffness: 450, damping: 35 }}
              />
            )}
            <span className="relative z-10 min-w-0 truncate">
              {displayLabel}
            </span>
          </button>
        );
      })}
    </div>
  );
}
