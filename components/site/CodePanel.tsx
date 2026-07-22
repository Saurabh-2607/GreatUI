"use client";

import { useState, useEffect } from "react";
import posthog from "posthog-js";
import Prism from "prismjs";
import { type Component } from "@/lib/registry";

import "prismjs/themes/prism-tomorrow.css";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-typescript";
import "prismjs/components/prism-jsx";
import "prismjs/components/prism-tsx";

interface CodePanelProps {
  component: Component;
  onClose: () => void;
}

export default function CodePanel({ component, onClose }: CodePanelProps) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    Prism.highlightAll();
  }, [component.code]);

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
    <div className="relative flex h-full w-full flex-col overflow-hidden bg-[#141414] font-sans text-white">
      <div className="flex h-14 shrink-0 items-center justify-between bg-[#141414] px-4 select-none">
        <div className="flex items-center gap-3">
          <button
            onClick={onClose}
            className="inline-flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg text-neutral-400 transition-colors hover:bg-neutral-800 hover:text-white"
            title="Close code panel"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2.5}
              stroke="currentColor"
              className="h-4 w-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 19.5L8.25 12l7.5-7.5"
              />
            </svg>
          </button>

          <div className="h-4 w-px bg-neutral-800" />

          <span className="text-sm font-semibold tracking-wide text-neutral-100">
            {component.name}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleDownload}
            className="hover:bg-neutral-850 inline-flex h-8 cursor-pointer items-center justify-center gap-1.5 rounded-lg border border-neutral-800 bg-neutral-900/60 px-3 text-xs font-semibold text-neutral-300 transition-colors select-none hover:text-white"
            title="Download TSX file"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="h-3.5 w-3.5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"
              />
            </svg>
            <span>{component.name}.tsx</span>
          </button>

          <button
            onClick={handleCopy}
            className="hover:bg-neutral-850 inline-flex h-8 cursor-pointer items-center justify-center gap-1.5 rounded-lg border border-neutral-800 bg-neutral-900/60 px-3 text-xs font-semibold text-neutral-300 transition-colors select-none hover:text-white"
          >
            {copied ? (
              <>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2.5}
                  stroke="currentColor"
                  className="h-3.5 w-3.5 text-green-500"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.5 12.75l6 6 9-13.5"
                  />
                </svg>
                <span>Copied</span>
              </>
            ) : (
              <>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="h-3.5 w-3.5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H5.25m11.9-3.664A2.251 2.251 0 0015 2.25h-1.5a2.251 2.251 0 00-2.15 1.586m5.8 0c.065.21.1.433.1.664v.75h-6V4.5c0-.231.035-.454.1-.664M6.75 7.5h.75m-.75 3h1.5m-1.5 3h.75m9.75-3h.75m-.75 3h1.5m-1.5 3h.75m-.75 3h1.5"
                  />
                </svg>
                <span>Copy</span>
              </>
            )}
          </button>
        </div>
      </div>

      <pre
        style={{
          fontFamily:
            "var(--font-geist-mono), ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
          fontSize: "14px",
          lineHeight: "1.6",
        }}
        className="!m-0 flex-1 scrollbar-none overflow-auto !bg-transparent p-6 text-left !font-mono select-text selection:bg-[#f6821f]/30"
      >
        <code
          style={{
            fontFamily:
              "var(--font-geist-mono), ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
          }}
          className="language-tsx !font-mono"
        >
          {component.code || ""}
        </code>
      </pre>
    </div>
  );
}
