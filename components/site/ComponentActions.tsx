"use client";

import { useState, useRef, useEffect } from "react";
import posthog from "posthog-js";
import { type Component } from "@/lib/registry";
import { getComponentMarkdown } from "@/lib/markdown";
import { useViewer } from "@/lib/viewer-context";
import { motion, AnimatePresence } from "motion/react";
import {
  CopyIcon,
  CheckIcon,
  MarkdownIcon,
  V0Icon,
  ChatGPTIcon,
  ClaudeIcon,
} from "./Icons";

export default function ComponentActions({
  component,
}: {
  component: Component;
}) {
  const { setIsMarkdownOpen } = useViewer();
  const [copiedPage, setCopiedPage] = useState(false);
  const [isCopyDropdownOpen, setIsCopyDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsCopyDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleCopyPage = () => {
    navigator.clipboard.writeText(window.location.href);
    posthog.capture("component_page_link_copied", {
      component_slug: component.slug,
    });
    setCopiedPage(true);
    setTimeout(() => setCopiedPage(false), 2000);
  };

  const handleOpenAI = (baseUrl: string) => {
    const md = getComponentMarkdown(component);
    navigator.clipboard.writeText(md); // Fallback

    const url = new URL(baseUrl);
    url.searchParams.set("q", md);

    window.open(url.toString(), "_blank");
    posthog.capture("component_markdown_export_opened", {
      component_slug: component.slug,
      destination: new URL(baseUrl).hostname,
    });
    setIsCopyDropdownOpen(false);
  };

  const handleCopyMarkdown = () => {
    setIsMarkdownOpen(true);
    setIsCopyDropdownOpen(false);
  };

  return (
    <div
      ref={dropdownRef}
      className="relative flex items-stretch rounded-xl bg-neutral-100 dark:bg-[#222]"
    >
      <button
        type="button"
        onClick={handleCopyPage}
        className="flex items-center justify-center gap-2 rounded-l-xl px-3 py-2 text-sm font-medium whitespace-nowrap text-neutral-700 transition-colors hover:bg-neutral-200 dark:text-neutral-200 dark:hover:bg-[#2a2a2a]"
      >
        {copiedPage ? (
          <CheckIcon className="h-4 w-4 text-green-500" />
        ) : (
          <CopyIcon className="h-4 w-4" />
        )}
        {copiedPage ? "Copied" : "Copy Page"}
      </button>
      <div className="my-1.5 w-[1px] bg-neutral-300 dark:bg-neutral-700/50"></div>
      <button
        type="button"
        onClick={() => setIsCopyDropdownOpen(!isCopyDropdownOpen)}
        className="flex items-center justify-center rounded-r-xl px-2 py-2 text-neutral-500 transition-colors hover:bg-neutral-200 hover:text-neutral-700 dark:text-neutral-400 dark:hover:bg-[#2a2a2a] dark:hover:text-neutral-200"
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
      </button>

      <AnimatePresence>
        {isCopyDropdownOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute top-full right-0 z-50 mt-2 flex w-48 flex-col overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-xl dark:border-neutral-800 dark:bg-[#1f1f1f]"
          >
            <div className="flex flex-col p-1.5">
              <button
                type="button"
                onClick={handleCopyMarkdown}
                className="flex items-center gap-2.5 rounded-lg px-2.5 py-1.5 text-sm font-medium text-neutral-700 transition-colors hover:bg-neutral-100 hover:text-neutral-900 dark:text-neutral-300 dark:hover:bg-[#2a2a2a] dark:hover:text-white"
              >
                <MarkdownIcon />
                View as Markdown
              </button>
              <button
                type="button"
                onClick={() => handleOpenAI("https://v0.dev/chat")}
                className="flex items-center gap-2.5 rounded-lg px-2.5 py-1.5 text-sm font-medium text-neutral-700 transition-colors hover:bg-neutral-100 hover:text-neutral-900 dark:text-neutral-300 dark:hover:bg-[#2a2a2a] dark:hover:text-white"
              >
                <V0Icon />
                Open in v0
              </button>
              <button
                type="button"
                onClick={() => handleOpenAI("https://chatgpt.com")}
                className="flex items-center gap-2.5 rounded-lg px-2.5 py-1.5 text-sm font-medium text-neutral-700 transition-colors hover:bg-neutral-100 hover:text-neutral-900 dark:text-neutral-300 dark:hover:bg-[#2a2a2a] dark:hover:text-white"
              >
                <ChatGPTIcon />
                Open in ChatGPT
              </button>
              <button
                type="button"
                onClick={() => handleOpenAI("https://claude.ai/new")}
                className="flex items-center gap-2.5 rounded-lg px-2.5 py-1.5 text-sm font-medium text-neutral-700 transition-colors hover:bg-neutral-100 hover:text-neutral-900 dark:text-neutral-300 dark:hover:bg-[#2a2a2a] dark:hover:text-white"
              >
                <ClaudeIcon />
                Open in Claude
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
