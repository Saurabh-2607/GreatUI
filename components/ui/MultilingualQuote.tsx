"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";

export interface Quote {
  id: string;
  label: string;
  text: string;
}

export interface MultilingualQuoteProps {
  quotes: Quote[];
  defaultLanguage?: string;
  authorName: string;
  authorLink?: string;
  className?: string;
  quoteClassName?: string;
}

export function MultilingualQuote({
  quotes,
  defaultLanguage,
  authorName,
  authorLink,
  className,
  quoteClassName,
}: MultilingualQuoteProps) {
  const [activeQuoteId, setActiveQuoteId] = useState<string>(
    defaultLanguage || (quotes.length > 0 ? quotes[0].id : ""),
  );

  const activeQuote = quotes.find((q) => q.id === activeQuoteId) || quotes[0];

  return (
    <div
      className={cn(
        "flex w-full flex-col items-center justify-center py-8 text-center md:py-12",
        className,
      )}
    >
      <div className="relative grid w-full max-w-prose place-items-center">
        <AnimatePresence mode="popLayout">
          {activeQuote && (
            <motion.p
              key={activeQuote.id}
              initial={{ opacity: 0, filter: "blur(8px)", y: 5 }}
              animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
              exit={{ opacity: 0, filter: "blur(8px)", y: -5 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className={cn(
                "text-lg leading-relaxed text-neutral-500 italic [grid-area:1/1] md:text-xl dark:text-neutral-400",
                quoteClassName,
              )}
            >
              &quot;{activeQuote.text}&quot;
            </motion.p>
          )}
        </AnimatePresence>
      </div>
      <div className="mt-4 flex items-center gap-3">
        {authorLink ? (
          <a
            href={authorLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-sm font-medium text-neutral-400 transition-colors hover:text-neutral-600 dark:text-neutral-500 dark:hover:text-neutral-300"
          >
            — {authorName}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M7 17L17 7" />
              <path d="M7 7h10v10" />
            </svg>
          </a>
        ) : (
          <span className="text-sm font-medium text-neutral-400 dark:text-neutral-500">
            — {authorName}
          </span>
        )}

        {quotes.length > 1 && (
          <div className="flex items-center gap-1 rounded-md border border-neutral-200 bg-neutral-100 p-1 dark:border-neutral-800 dark:bg-neutral-900">
            {quotes.map((quote) => (
              <button
                key={quote.id}
                onClick={() => setActiveQuoteId(quote.id)}
                className={cn(
                  "rounded-sm px-1 py-1 text-[10px] leading-none font-bold tracking-wider transition-colors",
                  activeQuoteId === quote.id
                    ? "bg-white text-neutral-900 shadow-sm dark:bg-neutral-800 dark:text-white"
                    : "text-neutral-500 hover:text-neutral-700 dark:text-neutral-500 dark:hover:text-neutral-300",
                )}
              >
                {quote.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

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
