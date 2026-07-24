"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "@/components/site/ThemeProvider";
import { cn } from "@/lib/utils";

const XIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const RotateCcwIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
    <polyline points="3 3 3 8 8 8" />
  </svg>
);

const SparklesIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M12 3l2.5 6.5 6.5 2.5-6.5 2.5L12 21l-2.5-6.5-6.5-2.5 6.5-2.5z" />
  </svg>
);

const PlayIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <polygon points="5 3 19 12 5 21 5 3" />
  </svg>
);

const ArrowRightIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
);

interface TaskIconProps {
  id: number;
  status: string;
  isDarkMode: boolean;
}

const TaskIconComponent = ({ id, status, isDarkMode }: TaskIconProps) => {
  const isRunning = status === "running";

  if (id === 1) {
    return (
      <svg
        className="h-4.5 w-4.5 text-current"
        viewBox="0 0 16 16"
        fill="currentColor"
      >
        <circle cx="4" cy="4" r="2.2" />
        <circle cx="4" cy="12" r="2.2" />
        <circle cx="12" cy="7" r="2.2" />
        <rect x="3" y="4" width="2" height="8" rx="0.5" />
        <path
          d="M4 8c2.5 0 4.5-.8 6.5-2"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
        />
        {isRunning && (
          <motion.circle
            cx="4"
            cy="4"
            r="1.8"
            fill="currentColor"
            animate={{
              cx: [4, 4, 12, 12],
              cy: [4, 8, 7, 7],
              opacity: [0.2, 1, 1, 0.2],
            }}
            transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut" }}
          />
        )}
      </svg>
    );
  }
  if (id === 2) {
    return (
      <svg
        className="h-4.5 w-4.5 text-current"
        viewBox="0 0 16 16"
        fill="currentColor"
      >
        <path d="M2.5 9a1 1 0 0 1 1-1h9a1 1 0 0 1 1 1v4a1.5 1.5 0 0 1-1.5 1.5h-8A1.5 1.5 0 0 1 2.5 13V9z" />
        <motion.g
          animate={isRunning ? { y: [-2.5, 2] } : { y: 0 }}
          transition={
            isRunning
              ? { repeat: Infinity, duration: 0.85, ease: "easeInOut" }
              : {}
          }
        >
          <path d="M8 1.5a1 1 0 0 1 1 1V6h1.8a.8.8 0 0 1 .56 1.36l-2.8 2.8a.8.8 0 0 1-1.12 0l-2.8-2.8A.8.8 0 0 1 5.2 6H7V2.5a1 1 0 0 1 1-1z" />
        </motion.g>
      </svg>
    );
  }
  if (id === 3) {
    return (
      <svg
        className="h-4.5 w-4.5 text-current"
        viewBox="0 0 16 16"
        fill="currentColor"
      >
        <rect x="3" y="3" width="10" height="10" rx="2" />
        <rect x="5.5" y="1" width="1.5" height="2" rx="0.5" />
        <rect x="9" y="1" width="1.5" height="2" rx="0.5" />
        <rect x="5.5" y="13" width="1.5" height="2" rx="0.5" />
        <rect x="9" y="13" width="1.5" height="2" rx="0.5" />
        <rect x="1" y="5.5" width="2" height="1.5" rx="0.5" />
        <rect x="1" y="9" width="2" height="1.5" rx="0.5" />
        <rect x="13" y="5.5" width="2" height="1.5" rx="0.5" />
        <rect x="13" y="9" width="2" height="1.5" rx="0.5" />
        <rect
          x="5.5"
          y="5.5"
          width="5"
          height="5"
          rx="1"
          fill={isDarkMode ? "#0a0a0a" : "#ffffff"}
        />
        <motion.rect
          x="6.5"
          y="6.5"
          width="3"
          height="3"
          rx="0.5"
          fill="currentColor"
          animate={
            isRunning ? { scale: [1, 1.2, 1], opacity: [0.6, 1, 0.6] } : {}
          }
          transition={
            isRunning
              ? { repeat: Infinity, duration: 1, ease: "easeInOut" }
              : {}
          }
          style={{ transformOrigin: "8px 8px" }}
        />
      </svg>
    );
  }
  if (id === 4) {
    return (
      <svg
        className="h-4.5 w-4.5 text-current"
        viewBox="0 0 16 16"
        fill="currentColor"
      >
        <path d="M8 1.5L1.5 5 8 8.5 14.5 5 8 1.5z" />
        <path d="M2 7.2l6 3.3 6-3.3v1.8l-6 3.3-6-3.3V7.2z" />
        <path d="M2 10.7l6 3.3 6-3.3v1.8l-6 3.3-6-3.3v-1.8z" />
      </svg>
    );
  }
  if (id === 5) {
    return (
      <svg
        className="h-4.5 w-4.5 text-current"
        viewBox="0 0 16 16"
        fill="currentColor"
      >
        <rect x="2" y="2" width="7" height="9" rx="1.5" opacity="0.5" />
        <rect x="6.5" y="5" width="7" height="9" rx="1.5" />
        {isRunning && (
          <motion.rect
            x="2"
            y="2"
            width="7"
            height="9"
            rx="1.5"
            fill="currentColor"
            animate={{ x: [0, 4.5], y: [0, 3], opacity: [0.9, 0] }}
            transition={{ repeat: Infinity, duration: 1.1, ease: "easeInOut" }}
          />
        )}
      </svg>
    );
  }
  return null;
};

interface Task {
  id: number;
  title: string;
  subtitle: string;
  status: "pending" | "running" | "success" | "skipped" | "failed";
  info: string | null;
}

export interface InteractiveChecklistProps {
  initialTasks?: Task[];
}

export default function InteractiveChecklist({
  initialTasks,
}: InteractiveChecklistProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(true);
  const [pipelineStatus, setPipelineStatus] = useState<
    "idle" | "running" | "failed"
  >("idle");

  const { theme } = useTheme();

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  const isDarkMode = mounted ? theme === "dark" : true;

  const defaultTasks: Task[] = [
    {
      id: 1,
      title: "Cloning Repository",
      subtitle: "Fetch latest codebase revision from Git source remote.",
      status: "pending",
      info: null,
    },
    {
      id: 2,
      title: "Installing Dependencies",
      subtitle: "Run package setup scripts and verify security signatures.",
      status: "pending",
      info: null,
    },
    {
      id: 3,
      title: "Making Optimized Builds",
      subtitle: "Compile production bundles and minify assets.",
      status: "pending",
      info: null,
    },
    {
      id: 4,
      title: "Generating Shadcn Registry",
      subtitle: "Assemble component configurations and output registry files.",
      status: "pending",
      info: null,
    },
    {
      id: 5,
      title: "Copying Files & Deploying",
      subtitle: "Distribute production bundles to serverless web nodes.",
      status: "pending",
      info: null,
    },
  ];

  const [tasks, setTasks] = useState<Task[]>(initialTasks || defaultTasks);

  const runPipeline = async () => {
    if (pipelineStatus === "running") return;
    setPipelineStatus("running");

    setTasks((prev) =>
      prev.map((t) => ({ ...t, status: "pending", info: null })),
    );
    const delay = (ms: number) =>
      new Promise((resolve) => setTimeout(resolve, ms));

    for (let i = 0; i < tasks.length; i++) {
      const taskId = tasks[i].id;
      setTasks((prev) =>
        prev.map((t) => (t.id === taskId ? { ...t, status: "running" } : t)),
      );
      await delay(2000);

      if (taskId === 4) {
        setTasks((prev) =>
          prev.map((t) =>
            t.id === taskId
              ? {
                  ...t,
                  status: "skipped",
                  info: "Bypassed: components.json configurations match target environment state.",
                }
              : t,
          ),
        );
      } else if (taskId === 5) {
        setTasks((prev) =>
          prev.map((t) =>
            t.id === taskId
              ? {
                  ...t,
                  status: "failed",
                  info: "Error: Connection refused (exit code 11) on production CDN serverless node.",
                }
              : t,
          ),
        );
      } else {
        setTasks((prev) =>
          prev.map((t) => (t.id === taskId ? { ...t, status: "success" } : t)),
        );
      }

      if (i < tasks.length - 1) {
        await delay(800);
      }
    }

    setPipelineStatus("failed");
  };

  const resetChecklist = () => {
    setTasks((prev) =>
      prev.map((t) => ({ ...t, status: "pending", info: null })),
    );
    setPipelineStatus("idle");
  };

  return (
    <div className="relative flex w-full max-w-[420px] flex-col items-center justify-center p-2 font-sans select-none">
      <AnimatePresence mode="wait">
        {isOpen ? (
          <motion.div
            key="checklist-card"
            ref={containerRef}
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ type: "spring", damping: 24, stiffness: 240 }}
            className={cn(
              "relative z-10 w-full overflow-hidden rounded-3xl p-4 transition-colors duration-300",
              isDarkMode ? "bg-neutral-900 shadow-2xl" : "bg-white shadow-xl",
            )}
          >
            <div className="mb-3 flex items-start justify-between">
              <div className="flex flex-col">
                <h2
                  className={cn(
                    "flex items-center gap-1.5 font-sans text-base font-bold transition-colors",
                    isDarkMode ? "text-neutral-100" : "text-neutral-950",
                  )}
                >
                  <SparklesIcon
                    className={cn(
                      "h-4 w-4 transition-colors",
                      isDarkMode ? "text-neutral-400" : "text-neutral-500",
                    )}
                    fill="currentColor"
                  />{" "}
                  CI/CD Pipeline Protocol
                </h2>
                <p
                  className={cn(
                    "mt-0.5 font-sans text-[10px] transition-colors",
                    isDarkMode ? "text-neutral-400" : "text-neutral-500",
                  )}
                >
                  Execute build and deployment stages sequentially.
                </p>
              </div>

              <div className="flex items-center gap-1.5">
                <motion.button
                  whileHover={{
                    scale: 1.1,
                    backgroundColor: "rgba(255,255,255,0.06)",
                  }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "rounded-lg p-1 transition-colors",
                    isDarkMode
                      ? "bg-neutral-950/40 text-neutral-400 hover:text-neutral-200"
                      : "bg-neutral-100 text-neutral-500 hover:text-neutral-900",
                  )}
                >
                  <XIcon className="h-3.5 w-3.5" />
                </motion.button>
              </div>
            </div>

            <div className="flex flex-col gap-2.5">
              {tasks.map((task) => {
                return (
                  <div
                    key={task.id}
                    className="relative flex w-full flex-col items-center"
                  >
                    <div
                      className={cn(
                        "relative z-10 flex w-full items-center justify-between rounded-2xl p-2.5 transition-colors duration-300",
                        isDarkMode
                          ? "bg-neutral-950 text-neutral-200"
                          : "bg-neutral-100/90 text-neutral-800",
                      )}
                    >
                      <div className="flex w-full items-center justify-between">
                        <div className="flex min-w-0 flex-1 items-center gap-3 pr-2">
                          <div
                            className={cn(
                              "flex h-9 w-9 shrink-0 items-center justify-center rounded-xl transition-all duration-300",
                              task.status === "success"
                                ? isDarkMode
                                  ? "bg-neutral-800 text-neutral-300"
                                  : "bg-white text-neutral-600 shadow-sm"
                                : task.status === "running"
                                  ? isDarkMode
                                    ? "bg-neutral-800 text-neutral-100"
                                    : "bg-white text-neutral-900 shadow-sm"
                                  : isDarkMode
                                    ? "bg-neutral-900 text-neutral-400"
                                    : "bg-neutral-200/60 text-neutral-500",
                            )}
                          >
                            <TaskIconComponent
                              id={task.id}
                              status={task.status}
                              isDarkMode={isDarkMode}
                            />
                          </div>

                          <div className="flex min-w-0 flex-col">
                            <span
                              className={cn(
                                "font-sans text-xs font-semibold tracking-wide transition-colors",
                                isDarkMode
                                  ? "text-neutral-200"
                                  : "text-neutral-850",
                              )}
                            >
                              {task.title}
                            </span>
                            <span
                              className={cn(
                                "mt-0.5 truncate font-sans text-[9px] leading-normal transition-colors",
                                isDarkMode
                                  ? "text-neutral-400"
                                  : "text-neutral-500",
                              )}
                            >
                              {task.subtitle}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <div
                            className={cn(
                              "flex h-5.5 w-5.5 items-center justify-center rounded-full transition-all duration-300",
                              task.status === "success"
                                ? isDarkMode
                                  ? "bg-neutral-100 text-neutral-950"
                                  : "bg-neutral-950 text-white"
                                : task.status === "running"
                                  ? isDarkMode
                                    ? "bg-neutral-800 text-neutral-100"
                                    : "bg-white text-neutral-950 shadow-sm"
                                  : task.status === "failed"
                                    ? isDarkMode
                                      ? "bg-red-950/60 text-red-300"
                                      : "bg-red-100 font-bold text-red-950"
                                    : task.status === "skipped"
                                      ? isDarkMode
                                        ? "bg-amber-950/60 text-amber-300"
                                        : "bg-amber-100 font-bold text-amber-950"
                                      : isDarkMode
                                        ? "bg-neutral-800"
                                        : "bg-neutral-200",
                            )}
                          >
                            <AnimatePresence mode="wait">
                              {task.status === "success" ? (
                                <motion.div
                                  key="success-icon"
                                  initial={{ scale: 0, rotate: -45 }}
                                  animate={{ scale: 1, rotate: 0 }}
                                  exit={{ scale: 0 }}
                                  transition={{
                                    type: "spring",
                                    stiffness: 350,
                                    damping: 18,
                                  }}
                                >
                                  <svg
                                    className="h-3 w-3 stroke-current"
                                    viewBox="0 0 16 16"
                                    fill="none"
                                  >
                                    <motion.path
                                      d="M3 8.5L6.5 12L13 4.5"
                                      strokeWidth="3.5"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      initial={{ pathLength: 0 }}
                                      animate={{ pathLength: 1 }}
                                      transition={{
                                        duration: 0.35,
                                        ease: "easeOut",
                                      }}
                                    />
                                  </svg>
                                </motion.div>
                              ) : task.status === "running" ? (
                                <motion.div
                                  key="running-icon"
                                  initial={{ scale: 0 }}
                                  animate={{ scale: 1 }}
                                  exit={{ scale: 0 }}
                                  transition={{ duration: 0.2 }}
                                  className={cn(
                                    "h-2.5 w-2.5 animate-spin rounded-full border-2 border-current border-t-transparent",
                                    isDarkMode
                                      ? "text-neutral-300"
                                      : "text-neutral-700",
                                  )}
                                />
                              ) : task.status === "failed" ? (
                                <motion.div
                                  key="failed-icon"
                                  initial={{ scale: 0, rotate: 45 }}
                                  animate={{ scale: 1, rotate: 0 }}
                                  exit={{ scale: 0 }}
                                  transition={{
                                    type: "spring",
                                    stiffness: 380,
                                    damping: 16,
                                  }}
                                >
                                  <XIcon className="h-3 w-3" strokeWidth="4" />
                                </motion.div>
                              ) : task.status === "skipped" ? (
                                <motion.div
                                  key="skipped-icon"
                                  initial={{ scale: 0, x: -5 }}
                                  animate={{ scale: 1, x: 0 }}
                                  exit={{ scale: 0 }}
                                  transition={{
                                    type: "spring",
                                    stiffness: 300,
                                    damping: 20,
                                  }}
                                >
                                  <ArrowRightIcon
                                    className="h-3 w-3"
                                    strokeWidth="3.5"
                                  />
                                </motion.div>
                              ) : (
                                <motion.div
                                  key="pending-icon"
                                  initial={{ scale: 0 }}
                                  animate={{ scale: 1 }}
                                  exit={{ scale: 0 }}
                                  transition={{ duration: 0.2 }}
                                  className={cn(
                                    "h-1.5 w-1.5 rounded-full",
                                    isDarkMode
                                      ? "bg-neutral-700"
                                      : "bg-neutral-400",
                                  )}
                                />
                              )}
                            </AnimatePresence>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div
                      className={cn(
                        "z-0 grid w-[90%] transition-all duration-300 ease-in-out",
                        task.info
                          ? "-mt-3.5 grid-rows-[1fr] opacity-100"
                          : "pointer-events-none mt-0 grid-rows-[0fr] opacity-0",
                      )}
                    >
                      <div className="min-h-0 overflow-hidden">
                        <div
                          className={cn(
                            "rounded-b-2xl px-3.5 pt-5 pb-2.5 font-mono text-[9.5px] leading-relaxed transition-colors duration-300",
                            isDarkMode
                              ? "bg-neutral-800 text-neutral-200"
                              : "bg-neutral-200/90 text-neutral-800",
                          )}
                        >
                          {task.info}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-3">
              {pipelineStatus === "idle" ? (
                <motion.button
                  layoutId="pipelineBtn"
                  key="idle-btn"
                  onClick={runPipeline}
                  className={cn(
                    "flex w-full items-center justify-center gap-1.5 rounded-2xl py-2.5 font-sans text-xs font-bold transition-colors",
                    isDarkMode
                      ? "bg-neutral-100 text-neutral-950 hover:bg-neutral-200"
                      : "bg-neutral-950 text-white hover:bg-neutral-900",
                  )}
                >
                  <PlayIcon className="h-3.5 w-3.5 fill-current" /> Deploy
                  Pipeline
                </motion.button>
              ) : pipelineStatus === "running" ? (
                <motion.div
                  layoutId="pipelineBtn"
                  key="running-btn"
                  className={cn(
                    "flex w-full items-center justify-center gap-2 rounded-2xl py-2.5 font-sans text-xs font-bold transition-colors duration-300",
                    isDarkMode
                      ? "bg-neutral-800 text-neutral-300"
                      : "bg-neutral-200 text-neutral-700",
                  )}
                >
                  <div
                    className={cn(
                      "h-3.5 w-3.5 animate-spin rounded-full border-2 border-current border-t-transparent",
                      isDarkMode ? "text-neutral-300" : "text-neutral-700",
                    )}
                  />
                  <span>Deploying Pipeline...</span>
                </motion.div>
              ) : (
                <motion.button
                  layoutId="pipelineBtn"
                  key="failed-btn"
                  whileTap={{ scale: 0.98 }}
                  onClick={resetChecklist}
                  className={cn(
                    "flex w-full items-center justify-center gap-1.5 rounded-2xl py-2.5 font-sans text-xs font-bold transition-colors",
                    isDarkMode
                      ? "bg-neutral-800 text-neutral-200 hover:bg-neutral-700"
                      : "bg-neutral-200 text-neutral-800 hover:bg-neutral-300",
                  )}
                >
                  <RotateCcwIcon className="h-3.5 w-3.5" />
                  <span>Deploy Failed (Reset & Retry)</span>
                </motion.button>
              )}
            </div>
          </motion.div>
        ) : (
          <motion.button
            key="restore-trigger"
            initial={{ opacity: 0, scale: 0.9, y: 5 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 5 }}
            onClick={() => setIsOpen(true)}
            className={cn(
              "relative z-10 flex items-center gap-2 rounded-2xl px-4 py-2.5 font-sans text-[10px] font-semibold transition-colors duration-300",
              isDarkMode
                ? "bg-neutral-900 text-neutral-200"
                : "bg-white text-neutral-800 shadow-md",
            )}
          >
            <SparklesIcon
              className={cn(
                "h-3.5 w-3.5",
                isDarkMode ? "text-neutral-300" : "text-neutral-500",
              )}
              fill="currentColor"
            />
            <span>Restore Pipeline Checklist</span>
            <span className="h-1.5 w-1.5 animate-ping rounded-full bg-neutral-400" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
