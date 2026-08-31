"use client";

import React, { useState, useRef, useEffect, useId } from "react";
import { motion, AnimatePresence, LayoutGroup, Transition } from "motion/react";
import { cn } from "@/lib/utils";

export interface MenuItemOption {
  id: string;
  label: string;
  sublabel?: string;
  icon?: React.ReactNode;
  enabled?: boolean;
  type?: "toggle" | "action";
  badge?: string;
  onClick?: () => void;
}

export interface NavTabItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  menuItems: MenuItemOption[];
}

export interface FloatingDockMenuProps {
  tabs?: NavTabItem[];
  defaultActiveIndex?: number | null;
  menuWidth?: number;
  showIcons?: boolean;
  entryEase?: [number, number, number, number] | string;
  entryDuration?: number;
  exitEase?: [number, number, number, number] | string;
  exitDuration?: number;
  onTabChange?: (index: number | null) => void;
  onItemToggle?: (tabId: string, itemId: string, enabled: boolean) => void;
  className?: string;
  isFixed?: boolean;
}

const solidIcons = {
  canvas: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={16}
      height={16}
      viewBox="0 0 24 24"
      fill="currentColor"
      className="size-4 shrink-0"
    >
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c.83 0 1.5-.67 1.5-1.5 0-.39-.15-.74-.39-1.01-.23-.26-.38-.61-.38-.99 0-.83.67-1.5 1.5-1.5H16c3.31 0 6-2.69 6-6 0-4.97-4.48-9-10-9zm-5.5 9c-.83 0-1.5-.67-1.5-1.5S5.67 8 6.5 8s1.5.67 1.5 1.5S7.33 11 6.5 11zm3-4C8.67 7 8 6.33 8 5.5S8.67 4 9.5 4s1.5.67 1.5 1.5S10.33 7 9.5 7zm5 0c-.83 0-1.5-.67-1.5-1.5S13.67 4 14.5 4s1.5.67 1.5 1.5S15.33 7 14.5 7zm3 4c-.83 0-1.5-.67-1.5-1.5S16.67 8 17.5 8s1.5.67 1.5 1.5-.67 1.5-1.5 1.5z" />
    </svg>
  ),
  ai: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={16}
      height={16}
      viewBox="0 0 24 24"
      fill="currentColor"
      className="size-4 shrink-0"
    >
      <path d="M19 9l1.25-2.75L23 5l-2.75-1.25L19 1l-1.25 2.75L15 5l2.75 1.25L19 9zm-7.5.5L9 4 6.5 9.5 1 12l5.5 2.5L9 20l2.5-5.5L17 12l-5.5-2.5zM19 15l-1.25 2.75L15 19l2.75 1.25L19 23l1.25-2.75L23 19l-2.75-1.25L19 15z" />
    </svg>
  ),
  display: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={16}
      height={16}
      viewBox="0 0 24 24"
      fill="currentColor"
      className="size-4 shrink-0"
    >
      <path d="M21 2H3c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h7v2H8v2h8v-2h-2v-2h7c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H3V4h18v12z" />
    </svg>
  ),
  shield: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={16}
      height={16}
      viewBox="0 0 24 24"
      fill="currentColor"
      className="size-4 shrink-0"
    >
      <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z" />
    </svg>
  ),
  magnet: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={16}
      height={16}
      viewBox="0 0 24 24"
      fill="currentColor"
      className="size-4 shrink-0"
    >
      <path d="M3 7v6c0 4.97 4.03 9 9 9s9-4.03 9-9V7h-4v6c0 2.76-2.24 5-5 5s-5-2.24-5-5V7H3zm0-5h4v3H3V2zm14 0h4v3h-4V2z" />
    </svg>
  ),
  grid: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={16}
      height={16}
      viewBox="0 0 24 24"
      fill="currentColor"
      className="size-4 shrink-0"
    >
      <path d="M3 3v8h8V3H3zm6 6H5V5h4v4zm-6 4v8h8v-8H3zm6 6H5v-4h4v4zm4-16v8h8V3h-8zm6 6h-4V5h4v4zm-6 4v8h8v-8h-8zm6 6h-4v-4h4v4z" />
    </svg>
  ),
  box: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={16}
      height={16}
      viewBox="0 0 24 24"
      fill="currentColor"
      className="size-4 shrink-0"
    >
      <path d="M21 16.5l-9 5.2-9-5.2V7.5l9-5.2 9 5.2v9zM12 4.15L5.04 8.18 12 12.2l6.96-4.02L12 4.15zm-7 5.86v6.48L11 20V13.5L5 10.01zm14 0l-6 3.49V20l6-3.48v-6.5z" />
    </svg>
  ),
  download: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={16}
      height={16}
      viewBox="0 0 24 24"
      fill="currentColor"
      className="size-4 shrink-0"
    >
      <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM17 13l-5 5-5-5h3V9h4v4h3z" />
    </svg>
  ),
  sparkle: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={16}
      height={16}
      viewBox="0 0 24 24"
      fill="currentColor"
      className="size-4 shrink-0"
    >
      <path d="M12 2l2.4 7.2L21.6 12l-7.2 2.4L12 21.6l-2.4-7.2L2.4 12l7.2-2.4L12 2z" />
    </svg>
  ),
  cpu: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={16}
      height={16}
      viewBox="0 0 24 24"
      fill="currentColor"
      className="size-4 shrink-0"
    >
      <path d="M22 9V7h-2V5c0-1.1-.9-2-2-2h-2V1h-2v2h-4V1H8v2H6c-1.1 0-2 .9-2 2v2H2v2h2v4H2v2h2v2c0 1.1.9 2 2 2h2v2h2v-2h4v2h2v-2h2c1.1 0 2-.9 2-2v-2h2v-2h-2V9h2zm-4 8H6V7h12v10zm-3-8H9v6h6V9z" />
    </svg>
  ),
  zap: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={16}
      height={16}
      viewBox="0 0 24 24"
      fill="currentColor"
      className="size-4 shrink-0"
    >
      <path d="M7 2v11h3v9l7-12h-4l4-8z" />
    </svg>
  ),
  refresh: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={16}
      height={16}
      viewBox="0 0 24 24"
      fill="currentColor"
      className="size-4 shrink-0"
    >
      <path d="M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z" />
    </svg>
  ),
  moon: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={16}
      height={16}
      viewBox="0 0 24 24"
      fill="currentColor"
      className="size-4 shrink-0"
    >
      <path d="M12.3 2a10 10 0 0 0-.19 20 10 10 0 0 0 8.35-4.5 10 10 0 0 1-11.66-11.66A10 10 0 0 0 12.3 2z" />
    </svg>
  ),
  sun: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={16}
      height={16}
      viewBox="0 0 24 24"
      fill="currentColor"
      className="size-4 shrink-0"
    >
      <path d="M12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm0-5a1 1 0 0 1 1 1v2a1 1 0 0 1-2 0V3a1 1 0 0 1 1-1zm0 18a1 1 0 0 1 1 1v2a1 1 0 0 1-2 0v-2a1 1 0 0 1 1-1zm10-7a1 1 0 0 1-1 1h-2a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1zM5 12a1 1 0 0 1-1 1H2a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1zm14.07-7.07a1 1 0 0 1 0 1.41l-1.41 1.42a1 1 0 1 1-1.42-1.42l1.42-1.41a1 1 0 0 1 1.41 0zM6.34 17.66a1 1 0 0 1 0 1.41L4.93 20.49a1 1 0 1 1-1.41-1.42l1.41-1.41a1 1 0 0 1 1.41 0zm12.73 2.83a1 1 0 0 1-1.41 0l-1.42-1.41a1 1 0 1 1 1.42-1.42l1.41 1.42a1 1 0 0 1 0 1.41zM6.34 6.34a1 1 0 0 1-1.41 0L3.52 4.93a1 1 0 0 1 1.41-1.41l1.41 1.41a1 1 0 0 1 0 1.41z" />
    </svg>
  ),
  gauge: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={16}
      height={16}
      viewBox="0 0 24 24"
      fill="currentColor"
      className="size-4 shrink-0"
    >
      <path d="M12 2C6.48 2 2 6.48 2 12c0 4.14 2.53 7.69 6.13 9.21.36.15.76-.11.76-.51v-.79c0-.28-.18-.52-.45-.62-2.82-1.07-4.44-3.87-4.44-7.29 0-4.41 3.59-8 8-8s8 3.59 8 8c0 3.42-1.62 6.22-4.44 7.29-.27.1-.45.34-.45.62v.79c0 .4.4.66.76.51C19.47 19.69 22 16.14 22 12c0-5.52-4.48-10-10-10zm-1 6v5.59l3.71 3.71 1.41-1.41-3.12-3.12V8h-2z" />
    </svg>
  ),
  lock: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={16}
      height={16}
      viewBox="0 0 24 24"
      fill="currentColor"
      className="size-4 shrink-0"
    >
      <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z" />
    </svg>
  ),
  eyeOff: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={16}
      height={16}
      viewBox="0 0 24 24"
      fill="currentColor"
      className="size-4 shrink-0"
    >
      <path d="M12 7c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.83l2.92 2.92c1.51-1.26 2.7-2.89 3.44-4.75-1.73-4.39-6-7.5-11-7.5-1.4 0-2.74.25-3.98.7l2.16 2.16C10.74 7.13 11.35 7 12 7zM2 4.27l2.28 2.28.46.46C3.08 8.3 1.78 10.02 1 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l.42.42L19.73 22 21 20.73 3.27 3 2 4.27zM7.53 9.8l1.55 1.55c-.05.21-.08.43-.08.65 0 1.66 1.34 3 3 3 .22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53-2.76 0-5-2.24-5-5 0-.79.2-1.53.53-2.2zm4.31-.78l3.15 3.15.02-.16c0-1.66-1.34-3-3-3l-.17.01z" />
    </svg>
  ),
  key: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={16}
      height={16}
      viewBox="0 0 24 24"
      fill="currentColor"
      className="size-4 shrink-0"
    >
      <path d="M12.65 10C11.83 7.67 9.61 6 7 6c-3.31 0-6 2.69-6 6s2.69 6 6 6c2.61 0 4.83-1.67 5.65-4H17v4h4v-4h2v-4H12.65zM7 14c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z" />
    </svg>
  ),
  arrowRight: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={14}
      height={14}
      viewBox="0 0 24 24"
      fill="currentColor"
      className="size-3.5 opacity-40 transition-all group-hover:translate-x-0.5 group-hover:opacity-100"
    >
      <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z" />
    </svg>
  ),
};

export const DEFAULT_TABS: NavTabItem[] = [
  {
    id: "canvas",
    label: "Canvas",
    icon: solidIcons.canvas,
    menuItems: [
      {
        id: "smart-snap",
        label: "Smart Snapping",
        sublabel: "Align to geometric nodes",
        icon: solidIcons.magnet,
        enabled: true,
        type: "toggle",
      },
      {
        id: "grid-guides",
        label: "Pixel Grid & Rulers",
        sublabel: "Sub-pixel vector matrix",
        icon: solidIcons.grid,
        enabled: true,
        type: "toggle",
      },
      {
        id: "xray-wireframe",
        label: "X-Ray Wireframe",
        sublabel: "Inspect component contours",
        icon: solidIcons.box,
        enabled: false,
        type: "toggle",
      },
      {
        id: "export-frame",
        label: "Export Snapshot",
        sublabel: "Save high-res PNG / SVG",
        icon: solidIcons.download,
        badge: "SVG",
        type: "action",
      },
    ],
  },
  {
    id: "ai-studio",
    label: "AI Studio",
    icon: solidIcons.ai,
    menuItems: [
      {
        id: "copilot",
        label: "Code Autopilot",
        sublabel: "Real-time context inference",
        icon: solidIcons.sparkle,
        enabled: true,
        type: "toggle",
      },
      {
        id: "vision-inspector",
        label: "Neural Inspector",
        sublabel: "Auto-detect UI layout flaws",
        icon: solidIcons.cpu,
        enabled: true,
        type: "toggle",
      },
      {
        id: "turbo-stream",
        label: "Turbo Stream",
        sublabel: "Ultra-low token latency",
        icon: solidIcons.zap,
        badge: "PRO",
        enabled: false,
        type: "toggle",
      },
      {
        id: "flush-cache",
        label: "Flush Prompt Cache",
        sublabel: "Clear active vector weights",
        icon: solidIcons.refresh,
        type: "action",
      },
    ],
  },
  {
    id: "display",
    label: "Display",
    icon: solidIcons.display,
    menuItems: [
      {
        id: "dark-mode",
        label: "OLED Midnight",
        sublabel: "Pure black contrast ratio",
        icon: solidIcons.moon,
        enabled: false,
        type: "toggle",
      },
      {
        id: "ambient-glow",
        label: "Bloom & Accent Glow",
        sublabel: "Hardware accelerated blurs",
        icon: solidIcons.sun,
        enabled: true,
        type: "toggle",
      },
      {
        id: "fps-meter",
        label: "Frame Rate HUD",
        sublabel: "Display refresh monitor",
        icon: solidIcons.gauge,
        enabled: false,
        type: "toggle",
      },
    ],
  },
  {
    id: "security",
    label: "Security",
    icon: solidIcons.shield,
    menuItems: [
      {
        id: "biometric-lock",
        label: "Biometric Enclave",
        sublabel: "Touch ID session guard",
        icon: solidIcons.lock,
        enabled: true,
        type: "toggle",
      },
      {
        id: "stealth-mode",
        label: "Incognito Vault",
        sublabel: "Ephemeral local storage",
        icon: solidIcons.eyeOff,
        enabled: false,
        type: "toggle",
      },
      {
        id: "rotate-keys",
        label: "Rotate Access Keys",
        sublabel: "Invalidate previous secrets",
        icon: solidIcons.key,
        badge: "ADMIN",
        type: "action",
      },
    ],
  },
];

export function FloatingDockMenu({
  tabs = DEFAULT_TABS,
  defaultActiveIndex = null,
  menuWidth = 310,
  showIcons = true,
  entryEase,
  entryDuration,
  exitEase,
  exitDuration,
  onTabChange,
  onItemToggle,
  className,
  isFixed = true,
}: FloatingDockMenuProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(
    defaultActiveIndex,
  );
  const layoutGroupId = useId();
  const [menuState, setMenuState] = useState<
    Record<string, Record<string, boolean>>
  >(() => {
    const initial: Record<string, Record<string, boolean>> = {};
    tabs.forEach((tab) => {
      initial[tab.id] = {};
      tab.menuItems.forEach((item) => {
        initial[tab.id][item.id] = item.enabled ?? false;
      });
    });
    return initial;
  });

  const containerRef = useRef<HTMLDivElement>(null);

  const defaultSpring: Transition = {
    type: "spring",
    stiffness: 420,
    damping: 30,
  };

  const activeTransition: Transition = entryEase
    ? {
        duration: entryDuration || 0.32,
        ease: entryEase as [number, number, number, number],
      }
    : defaultSpring;

  const exitTransition: Transition = exitEase
    ? {
        duration: exitDuration || 0.22,
        ease: exitEase as [number, number, number, number],
      }
    : defaultSpring;

  const handleTabClick = (index: number) => {
    const nextIndex = activeIndex === index ? null : index;
    setActiveIndex(nextIndex);
    onTabChange?.(nextIndex);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setActiveIndex(null);
        onTabChange?.(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onTabChange]);

  const toggleSwitch = (tabId: string, itemId: string) => {
    const nextState = !menuState[tabId]?.[itemId];
    setMenuState((prev) => ({
      ...prev,
      [tabId]: {
        ...prev[tabId],
        [itemId]: nextState,
      },
    }));
    onItemToggle?.(tabId, itemId, nextState);
  };

  const currentTab = activeIndex !== null ? tabs[activeIndex] : null;
  const isAnyActive = activeIndex !== null;

  return (
    <div
      ref={containerRef}
      className={cn(
        "z-50 flex flex-col items-center justify-end select-none",
        isFixed ? "fixed inset-x-0 bottom-8 mx-auto w-fit" : "relative w-fit",
        className,
      )}
    >
      <LayoutGroup id={`floating-dock-group-${layoutGroupId}`}>
        <motion.div
          layout
          transition={activeTransition}
          style={{
            width: isAnyActive ? menuWidth : "auto",
            transformOrigin: "bottom center",
          }}
          className={cn(
            "relative overflow-hidden rounded-[26px]",
            "bg-neutral-100 text-neutral-900 dark:bg-neutral-900 dark:text-neutral-100",
            "border border-neutral-200 dark:border-neutral-800",
            "flex flex-col justify-end p-1.5",
          )}
        >
          <AnimatePresence initial={false}>
            {currentTab && (
              <motion.div
                key="menu-content-wrapper"
                initial={{
                  opacity: 0,
                  height: 0,
                  marginBottom: 0,
                  filter: "blur(6px)",
                }}
                animate={{
                  opacity: 1,
                  height: "auto",
                  marginBottom: 6,
                  filter: "blur(0px)",
                  transition: {
                    height: activeTransition,
                    marginBottom: activeTransition,
                    opacity: {
                      duration: entryDuration || 0.16,
                      ease: "easeOut",
                    },
                    filter: {
                      duration: entryDuration || 0.16,
                      ease: "easeOut",
                    },
                  },
                }}
                exit={{
                  opacity: 0,
                  height: 0,
                  marginBottom: 0,
                  filter: "blur(6px)",
                  transition: {
                    height: exitTransition,
                    marginBottom: exitTransition,
                    opacity: {
                      duration: exitDuration || 0.12,
                      ease: "easeOut",
                    },
                    filter: {
                      duration: exitDuration || 0.12,
                      ease: "easeOut",
                    },
                  },
                }}
                className="w-full overflow-hidden"
              >
                <div className="w-full rounded-[20px] bg-white p-1.5 dark:bg-neutral-800/90">
                  <div className="mb-1 flex items-center justify-between px-2.5 py-1.5">
                    <span className="font-mono text-[11px] font-medium tracking-wider text-neutral-500 uppercase dark:text-neutral-400">
                      {currentTab.label} Settings
                    </span>
                  </div>

                  <AnimatePresence mode="popLayout" initial={false}>
                    <motion.div
                      key={currentTab.id}
                      initial={{ opacity: 0, filter: "blur(6px)" }}
                      animate={{ opacity: 1, filter: "blur(0px)" }}
                      exit={{ opacity: 0, filter: "blur(6px)" }}
                      transition={{ duration: 0.14, ease: "easeOut" }}
                      className="flex w-full flex-col gap-0.5"
                    >
                      {currentTab.menuItems.map((item) => {
                        const iconNode = item.icon;
                        const isChecked = !!menuState[currentTab.id]?.[item.id];

                        return (
                          <motion.div
                            key={item.id}
                            layout="position"
                            onClick={() => {
                              if (item.type === "action") {
                                item.onClick?.();
                              } else {
                                toggleSwitch(currentTab.id, item.id);
                              }
                            }}
                            className="group flex w-full cursor-pointer items-center justify-between rounded-[14px] px-2.5 py-2 transition-all hover:bg-neutral-100 dark:hover:bg-neutral-700/50"
                          >
                            <div className="flex min-w-0 flex-1 items-center gap-2.5">
                              {showIcons && iconNode && (
                                <div className="flex size-7 shrink-0 items-center justify-center rounded-xl bg-neutral-100 text-neutral-600 transition-colors group-hover:bg-neutral-200 group-hover:text-neutral-900 dark:bg-neutral-700/60 dark:text-neutral-300 dark:group-hover:bg-neutral-700 dark:group-hover:text-white">
                                  {iconNode}
                                </div>
                              )}
                              <div className="flex min-w-0 flex-1 flex-col">
                                <div className="flex items-center gap-1.5">
                                  <span className="truncate text-xs font-semibold tracking-tight text-neutral-800 group-hover:text-neutral-950 dark:text-neutral-100 dark:group-hover:text-white">
                                    {item.label}
                                  </span>
                                  {item.badge && (
                                    <span className="py-0.2 rounded-md bg-neutral-100 px-1.5 font-mono text-[9px] font-bold text-neutral-600 dark:bg-neutral-700 dark:text-neutral-300">
                                      {item.badge}
                                    </span>
                                  )}
                                </div>
                                {item.sublabel && (
                                  <span className="truncate text-[10px] text-neutral-500 group-hover:text-neutral-600 dark:text-neutral-400 dark:group-hover:text-neutral-300">
                                    {item.sublabel}
                                  </span>
                                )}
                              </div>
                            </div>

                            {item.type === "action" ? (
                              <div className="flex items-center pl-2 text-neutral-400 group-hover:text-neutral-800 dark:text-neutral-500 dark:group-hover:text-neutral-200">
                                {solidIcons.arrowRight}
                              </div>
                            ) : (
                              <button
                                type="button"
                                role="switch"
                                aria-checked={isChecked}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  toggleSwitch(currentTab.id, item.id);
                                }}
                                className={cn(
                                  "relative ml-2 inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full p-0.5 transition-colors duration-200 ease-in-out focus:outline-none",
                                  isChecked
                                    ? "bg-neutral-900 dark:bg-white"
                                    : "bg-neutral-300 dark:bg-neutral-700",
                                )}
                              >
                                <motion.span
                                  animate={{
                                    x: isChecked ? 16 : 0,
                                  }}
                                  transition={activeTransition}
                                  className={cn(
                                    "pointer-events-none block size-4 rounded-full ring-0",
                                    isChecked
                                      ? "bg-white dark:bg-neutral-900"
                                      : "bg-white dark:bg-neutral-400",
                                  )}
                                />
                              </button>
                            )}
                          </motion.div>
                        );
                      })}
                    </motion.div>
                  </AnimatePresence>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <motion.div
            layout
            transition={activeTransition}
            className="flex w-full items-center justify-between rounded-[20px] bg-white p-1 dark:bg-neutral-800/90"
          >
            {tabs.map((tab, idx) => {
              const iconNode = tab.icon;
              const isActive = activeIndex === idx;
              const showLabel = isAnyActive ? isActive : true;

              return (
                <motion.button
                  layout
                  key={tab.id}
                  type="button"
                  onClick={() => handleTabClick(idx)}
                  transition={activeTransition}
                  className={cn(
                    "relative flex h-9 shrink-0 cursor-pointer items-center justify-center rounded-[16px] px-3 transition-colors outline-none",
                    isActive
                      ? "font-semibold text-neutral-900 dark:text-white"
                      : "text-neutral-500 hover:text-neutral-800 dark:text-neutral-400 dark:hover:text-neutral-200",
                  )}
                >
                  {isActive && (
                    <motion.div
                      layoutId={`active-dock-pill-${layoutGroupId}`}
                      transition={activeTransition}
                      className="absolute inset-0 rounded-[16px] bg-neutral-100 dark:bg-neutral-700/70"
                    />
                  )}

                  <div className="relative z-10 flex items-center justify-center">
                    {iconNode && (
                      <div className="flex size-4 shrink-0 items-center justify-center">
                        {iconNode}
                      </div>
                    )}
                    <AnimatePresence initial={false}>
                      {showLabel && (
                        <motion.span
                          initial={{
                            opacity: 0,
                            width: 0,
                            marginLeft: 0,
                            filter: "blur(4px)",
                          }}
                          animate={{
                            opacity: 1,
                            width: "auto",
                            marginLeft: iconNode ? 6 : 0,
                            filter: "blur(0px)",
                          }}
                          exit={{
                            opacity: 0,
                            width: 0,
                            marginLeft: 0,
                            filter: "blur(4px)",
                          }}
                          transition={{
                            width: activeTransition,
                            opacity: {
                              duration: entryDuration || 0.14,
                              ease: "easeOut",
                            },
                            filter: {
                              duration: entryDuration || 0.14,
                              ease: "easeOut",
                            },
                          }}
                          className="overflow-hidden text-xs font-semibold tracking-tight whitespace-nowrap"
                        >
                          {tab.label}
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.button>
              );
            })}
          </motion.div>
        </motion.div>
      </LayoutGroup>
    </div>
  );
}

export default FloatingDockMenu;

/**
 * Great UI Component
 *
 * Built with React, TypeScript, Tailwind CSS, and Framer Motion.
 * Designed to be accessible, customizable, and production-ready.
 *
 * Website: https://great-ui.com
 * GitHub: https://github.com/Saurabh-2607/GreatUI
 * X (Great UI): https://x.com/GreatUIHQ
 *
 * Released under the MIT License.
 * Contributions, issues, and feature requests are always welcome.
 *
 * Author: Saurabh Sharma
 * X: https://x.com/srbh_here
 */
