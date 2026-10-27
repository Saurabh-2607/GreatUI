"use client";

import { useState, useRef, useEffect } from "react";
import posthog from "posthog-js";
import { type Component } from "@/lib/registry";
import { getComponentMarkdown } from "@/lib/markdown";
import { useViewer } from "@/lib/viewer-context";
import { motion, AnimatePresence } from "motion/react";
import { TextMorph } from "torph/react";
import { cn } from "@/lib/utils";
import {
  CopyCheckIcon,
  MarkdownIcon,
  V0Icon,
  ChatGPTIcon,
  ClaudeIcon,
} from "./Icons";

export default function ComponentActions({
  component,
  dropdownPosition = "down",
  className,
}: {
  component: Component;
  dropdownPosition?: "up" | "down";
  className?: string;
}) {
  const { setIsMarkdownOpen } = useViewer();
  const [copied, setCopied] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
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

  const handleCopyForAgent = () => {
    const md = getComponentMarkdown(component);
    navigator.clipboard.writeText(md);
    posthog.capture("component_agent_prompt_copied", {
      component_slug: component.slug,
    });
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    posthog.capture("component_page_link_copied", {
      component_slug: component.slug,
    });
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
    setIsCopyDropdownOpen(false);
  };

  const handleOpenAI = (baseUrl: string) => {
    const md = getComponentMarkdown(component);
    navigator.clipboard.writeText(md);

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
      className={cn(
        "relative flex h-8 items-stretch rounded-lg bg-neutral-100 dark:bg-[#222]",
        className,
      )}
    >
      <button
        type="button"
        onClick={handleCopyForAgent}
        className="flex h-full items-center justify-start gap-1.5 rounded-l-lg px-2.5 text-[13px] font-medium whitespace-nowrap text-neutral-700 transition-colors hover:bg-neutral-200 dark:text-neutral-200 dark:hover:bg-[#2a2a2a]"
      >
        <CopyCheckIcon copied={copied} className="size-3.5" />
        <TextMorph as="span" ease={{ stiffness: 220, damping: 22 }}>
          {copied ? "Copied for agent" : "Copy for your agent"}
        </TextMorph>
      </button>
      <div className="my-1.5 w-[1px] bg-neutral-300 dark:bg-neutral-700/50"></div>
      <button
        type="button"
        onClick={() => setIsCopyDropdownOpen(!isCopyDropdownOpen)}
        className="flex h-full items-center justify-center rounded-r-lg px-1.5 text-neutral-500 transition-colors hover:bg-neutral-200 hover:text-neutral-700 dark:text-neutral-400 dark:hover:bg-[#2a2a2a] dark:hover:text-neutral-200"
      >
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`transition-transform duration-200 ${isCopyDropdownOpen ? "rotate-180" : ""}`}
        >
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
      </button>

      <AnimatePresence>
        {isCopyDropdownOpen && (
          <motion.div
            initial={{
              opacity: 0,
              y: dropdownPosition === "up" ? -8 : 10,
              scale: 0.95,
            }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{
              opacity: 0,
              y: dropdownPosition === "up" ? -8 : 10,
              scale: 0.95,
            }}
            transition={{ duration: 0.15 }}
            className={`absolute z-50 flex w-56 flex-col overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-xl sm:w-48 dark:border-neutral-800 dark:bg-[#1f1f1f] ${
              dropdownPosition === "up"
                ? "right-0 bottom-full mb-2"
                : "top-full left-0 mt-2 sm:right-0 sm:left-auto"
            }`}
          >
            <div className="flex flex-col p-1.5">
              <button
                type="button"
                onClick={handleCopyLink}
                className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-base font-medium text-neutral-700 transition-colors hover:bg-neutral-100 hover:text-neutral-900 sm:px-2.5 sm:py-1.5 sm:text-sm dark:text-neutral-300 dark:hover:bg-[#2a2a2a] dark:hover:text-white"
              >
                <CopyCheckIcon copied={copiedLink} className="size-4" />
                <TextMorph as="span" ease={{ stiffness: 220, damping: 22 }}>
                  {copiedLink ? "Copied page link" : "Copy page link"}
                </TextMorph>
              </button>
              <button
                type="button"
                onClick={handleCopyMarkdown}
                className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-base font-medium text-neutral-700 transition-colors hover:bg-neutral-100 hover:text-neutral-900 sm:px-2.5 sm:py-1.5 sm:text-sm dark:text-neutral-300 dark:hover:bg-[#2a2a2a] dark:hover:text-white"
              >
                <MarkdownIcon />
                View as Markdown
              </button>
              <button
                type="button"
                onClick={() => handleOpenAI("https://v0.dev/chat")}
                className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-base font-medium text-neutral-700 transition-colors hover:bg-neutral-100 hover:text-neutral-900 sm:px-2.5 sm:py-1.5 sm:text-sm dark:text-neutral-300 dark:hover:bg-[#2a2a2a] dark:hover:text-white"
              >
                <V0Icon />
                Open in v0
              </button>
              <button
                type="button"
                onClick={() => handleOpenAI("https://chatgpt.com")}
                className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-base font-medium text-neutral-700 transition-colors hover:bg-neutral-100 hover:text-neutral-900 sm:px-2.5 sm:py-1.5 sm:text-sm dark:text-neutral-300 dark:hover:bg-[#2a2a2a] dark:hover:text-white"
              >
                <ChatGPTIcon />
                Open in ChatGPT
              </button>
              <button
                type="button"
                onClick={() => handleOpenAI("https://claude.ai/new")}
                className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-base font-medium text-neutral-700 transition-colors hover:bg-neutral-100 hover:text-neutral-900 sm:px-2.5 sm:py-1.5 sm:text-sm dark:text-neutral-300 dark:hover:bg-[#2a2a2a] dark:hover:text-white"
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
