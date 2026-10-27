"use client";

import React from "react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";
import { CopyIcon, CheckIcon } from "./Icons";

export interface CopyCheckIconProps {
  copied: boolean;
  className?: string;
  checkClassName?: string;
  copyClassName?: string;
}

export function CopyCheckIcon({
  copied,
  className = "size-3.5",
  checkClassName = "text-green-500",
  copyClassName = "",
}: CopyCheckIconProps) {
  return (
    <span
      className={cn(
        "relative inline-flex size-3.5 shrink-0 items-center justify-center select-none",
        className,
      )}
    >
      <AnimatePresence initial={false}>
        {copied ? (
          <motion.span
            key="check"
            initial={{ scale: 0.2, opacity: 0, rotate: -60 }}
            animate={{ scale: 1, opacity: 1, rotate: 0 }}
            exit={{ scale: 0.2, opacity: 0, rotate: 60 }}
            transition={{ type: "spring", stiffness: 450, damping: 24 }}
            className={cn(
              "absolute inset-0 flex items-center justify-center",
              checkClassName,
            )}
          >
            <CheckIcon className="size-full" />
          </motion.span>
        ) : (
          <motion.span
            key="copy"
            initial={{ scale: 0.2, opacity: 0, rotate: 60 }}
            animate={{ scale: 1, opacity: 1, rotate: 0 }}
            exit={{ scale: 0.2, opacity: 0, rotate: -60 }}
            transition={{ type: "spring", stiffness: 450, damping: 24 }}
            className={cn(
              "absolute inset-0 flex items-center justify-center",
              copyClassName,
            )}
          >
            <CopyIcon className="size-full" />
          </motion.span>
        )}
      </AnimatePresence>
    </span>
  );
}

export default CopyCheckIcon;
