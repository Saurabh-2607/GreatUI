"use client";

import { useState } from "react";
import posthog from "posthog-js";
import { type Component } from "@/lib/registry";
import { ChevronLeftIcon, DownloadIcon, CopyIcon, CheckIcon } from "./Icons";
import ShikiHighlight from "./ShikiHighlight";

interface CodePanelProps {
  component: Component;
  onClose: () => void;
}

export default function CodePanel({ component, onClose }: CodePanelProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (!component.code) return;
    navigator.clipboard.writeText(component.code);
    setCopied(true);
    posthog.capture("code_copied", {
      component_slug: component.slug,
      component_name: component.name,
    });
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    if (!component.code) return;
    const blob = new Blob([component.code], {
      type: "text/plain;charset=utf-8",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${component.name}.tsx`;
    link.click();
    URL.revokeObjectURL(url);
    posthog.capture("code_downloaded", {
      component_slug: component.slug,
      component_name: component.name,
    });
  };

  return (
    <div className="relative flex h-full w-full flex-col overflow-hidden bg-neutral-100 font-sans text-neutral-900 dark:bg-[#141414] dark:text-white">
      <div className="flex h-14 shrink-0 items-center justify-between bg-neutral-100 px-4 select-none dark:bg-[#141414]">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg text-neutral-500 transition-colors hover:bg-neutral-200 hover:text-neutral-900 dark:text-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-white"
            title="Close code panel"
          >
            <ChevronLeftIcon className="h-4 w-4" />
          </button>

          <div className="h-4 w-px bg-neutral-300 dark:bg-neutral-800" />

          <span className="text-sm font-semibold tracking-wide text-neutral-800 dark:text-neutral-100">
            {component.name}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleDownload}
            className="flex h-10 cursor-pointer items-center justify-center gap-1.5 rounded-xl bg-neutral-100 px-3.5 text-xs font-semibold text-neutral-700 transition-all hover:bg-neutral-200 hover:text-neutral-950 dark:bg-neutral-900 dark:text-neutral-300 dark:hover:bg-neutral-800 dark:hover:text-white"
            title={`Download ${component.name}.tsx`}
          >
            <DownloadIcon className="h-4 w-4" />
            <span className="font-mono">{component.name}.tsx</span>
          </button>

          <button
            type="button"
            onClick={handleCopy}
            className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-xl bg-neutral-100 text-neutral-700 transition-all hover:bg-neutral-200 hover:text-neutral-950 dark:bg-neutral-900 dark:text-neutral-300 dark:hover:bg-neutral-800 dark:hover:text-white"
            title="Copy code"
          >
            {copied ? (
              <CheckIcon className="h-4 w-4 text-green-500" />
            ) : (
              <CopyIcon className="h-4 w-4" />
            )}
          </button>
        </div>
      </div>

      <ShikiHighlight
        code={component.code || ""}
        lang="tsx"
        style={{
          fontFamily:
            "var(--font-geist-mono), ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
          fontSize: "14px",
          lineHeight: "1.6",
        }}
        className="!m-0 flex-1 scrollbar-none overflow-auto bg-neutral-100 p-6 text-left !font-mono select-text selection:bg-[#f6821f]/30 dark:bg-[#141414]"
      />
    </div>
  );
}
