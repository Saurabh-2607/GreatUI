"use client";
/* eslint-disable react-hooks/set-state-in-effect */

import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { useTheme } from "@/components/site/ThemeProvider";
import { cn } from "@/lib/utils";

const UserIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const BarChartIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <line x1="18" y1="20" x2="18" y2="10" />
    <line x1="12" y1="20" x2="12" y2="4" />
    <line x1="6" y1="20" x2="6" y2="14" />
  </svg>
);

const BellIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
    <path d="M13.73 21a2 2 0 0 1-3.46 0" />
  </svg>
);

const KeyIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3M15.5 7.5L14 6" />
  </svg>
);

const LogOutIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
    <polyline points="16 17 21 12 16 7" />
    <line x1="21" y1="12" x2="9" y2="12" />
  </svg>
);

const ChevronIcon = ({
  isOpen,
  isDarkMode,
}: {
  isOpen: boolean;
  isDarkMode: boolean;
}) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={cn(
      "h-4 w-4 transition-colors duration-300",
      isDarkMode ? "text-neutral-400" : "text-neutral-500",
    )}
  >
    <motion.path
      animate={{
        d: isOpen ? "M 6 6 L 18 18" : "M 6 10 L 12 16",
      }}
      transition={{ type: "spring", stiffness: 260, damping: 22 }}
    />
    <motion.path
      animate={{
        d: isOpen ? "M 6 18 L 18 6" : "M 12 16 L 18 10",
      }}
      transition={{ type: "spring", stiffness: 260, damping: 22 }}
    />
  </svg>
);

export interface DropdownOption {
  id: string;
  label: string;
  icon: (props: React.SVGProps<SVGSVGElement>) => React.JSX.Element;
  danger?: boolean;
}

const defaultOptions: DropdownOption[] = [
  { id: "profile", label: "Profile Settings", icon: UserIcon },
  { id: "analytics", label: "Analytics Dashboard", icon: BarChartIcon },
  { id: "notifications", label: "Notifications", icon: BellIcon },
  { id: "security", label: "Security & Keys", icon: KeyIcon },
  { id: "logout", label: "Log Out", icon: LogOutIcon, danger: true },
];

export interface AnimatedSelectProps {
  placeholder?: string;
  options?: DropdownOption[];
  className?: string;
  width?: number;
  itemHeight?: number;
  itemGap?: number;
  triggerHeight?: number;
  onSelect?: (option: DropdownOption) => void;
}

export default function AnimatedSelect({
  placeholder = "Select Action",
  options = defaultOptions,
  className,
  width = 192,
  itemHeight = 40,
  itemGap = 4,
  triggerHeight = 44,
  onSelect,
}: AnimatedSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<DropdownOption | null>(null);
  const [mounted, setMounted] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDarkMode = mounted ? theme === "dark" : true;

  const toggle = () => setIsOpen(!isOpen);

  const handleSelect = (opt: DropdownOption) => {
    setSelected(opt);
    setIsOpen(false);
    if (onSelect) {
      onSelect(opt);
    }
  };

  return (
    <div
      className={cn(
        "animate-fade-in relative flex flex-col items-center select-none",
        className,
      )}
      style={{ width }}
    >
      <motion.div
        className={cn(
          "pointer-events-none absolute left-0 rounded-b-xl border-x border-b transition-colors duration-300",
          isDarkMode
            ? "border-neutral-800 bg-neutral-900 shadow-2xl"
            : "border-neutral-200 bg-white shadow-sm",
        )}
        style={{ top: triggerHeight, width }}
        initial={false}
        animate={{
          height: isOpen
            ? (itemHeight + itemGap) * options.length + itemGap
            : 0,
          opacity: isOpen ? 1 : 0,
        }}
        transition={{
          type: "spring",
          stiffness: 220,
          damping: 28,
        }}
      />

      <div className="relative flex w-full flex-col items-center">
        {options.map((opt, i) => {
          const yPos = triggerHeight + itemGap + i * (itemHeight + itemGap);
          return (
            <motion.button
              key={opt.id}
              onClick={() => handleSelect(opt)}
              initial={false}
              animate={{
                y: isOpen ? yPos : 0,
                scale: isOpen ? 1 : 0.8,
                opacity: isOpen ? 1 : 0,
              }}
              transition={{
                type: "spring",
                stiffness: 220,
                damping: 26,
                delay: isOpen ? i * 0.045 : (options.length - 1 - i) * 0.02,
              }}
              style={{
                height: itemHeight,
                width: width - 8,
                pointerEvents: isOpen ? "auto" : "none",
              }}
              className={cn(
                "absolute top-0 left-1/2 flex -translate-x-1/2 cursor-pointer items-center gap-3 overflow-hidden rounded-xl bg-transparent px-3 transition-colors active:scale-95",
                isDarkMode
                  ? opt.danger
                    ? "text-red-400 hover:bg-red-950/40 hover:text-red-300"
                    : "text-neutral-200 hover:bg-neutral-800"
                  : opt.danger
                    ? "text-red-500 hover:bg-red-50 hover:text-red-600"
                    : "text-neutral-800 hover:bg-neutral-100",
              )}
            >
              <opt.icon className="h-4 w-4 shrink-0" />
              <span className="truncate text-[13px] font-semibold tracking-wide">
                {opt.label}
              </span>
            </motion.button>
          );
        })}

        <motion.button
          onClick={toggle}
          style={{ width, height: triggerHeight }}
          className={cn(
            "relative z-10 flex cursor-pointer items-center justify-between border px-4 text-[13px] font-semibold tracking-wide transition-all duration-200 active:scale-95",
            isOpen ? "rounded-t-xl rounded-b-none" : "rounded-xl",
            isDarkMode
              ? "hover:bg-neutral-850 border-neutral-800 bg-neutral-900 text-neutral-100"
              : "border-neutral-200 bg-white text-neutral-800 hover:bg-neutral-50",
          )}
        >
          <span className="flex items-center gap-2 truncate">
            {selected ? (
              <>
                <selected.icon
                  className={cn(
                    "h-4 w-4 shrink-0",
                    isDarkMode ? "text-neutral-400" : "text-neutral-500",
                  )}
                />
                <span>{selected.label}</span>
              </>
            ) : (
              <span
                className={cn(
                  "font-medium",
                  isDarkMode ? "text-neutral-500" : "text-neutral-400",
                )}
              >
                {placeholder}
              </span>
            )}
          </span>
          <ChevronIcon isOpen={isOpen} isDarkMode={isDarkMode} />
        </motion.button>
      </div>
    </div>
  );
}
