"use client";

import React, { useState } from "react";
import Container from "./Container";
import Button from "./ui/Button";

export default function Contact() {
  const [copiedEmail, setCopiedEmail] = useState<string | null>(null);

  const handleCopy = (email: string) => {
    navigator.clipboard.writeText(email);
    setCopiedEmail(email);
    setTimeout(() => setCopiedEmail(null), 2000);
  };

  return (
    <Container className="py-20 md:py-28">
      <div className="flex flex-col items-center justify-center text-center">
        <h2 className="mt-2 max-w-4xl text-4xl leading-[1.0] font-semibold tracking-tight text-balance text-neutral-950 sm:text-5xl md:text-6xl dark:text-white">
          Get in touch.
        </h2>
        <p className="leading-tighter mt-4 max-w-2xl text-lg tracking-normal text-pretty text-neutral-600 sm:text-xl md:text-2xl dark:text-neutral-400">
          Have questions, custom requests, or want to contribute? Connect
          through any of the channels below.
        </p>
      </div>

      <div className="relative z-10 -mx-4 mt-16 grid grid-cols-1 border border-neutral-200 bg-neutral-50/10 sm:-mx-6 md:grid-cols-3 dark:border-neutral-800 dark:bg-neutral-900/5">
        {/* Corner Anchors Overlay */}
        <div
          className="pointer-events-none absolute inset-0 z-20 select-none"
          aria-hidden="true"
        >
          <div className="absolute -top-[7px] -left-[7px] h-3.5 w-3.5 rounded-[3px] border border-neutral-200 bg-white dark:border-neutral-800 dark:bg-[#0a0a0a]" />
          <div className="absolute -top-[7px] left-1/3 hidden h-3.5 w-3.5 -translate-x-1/2 rounded-[3px] border border-neutral-200 bg-white md:block dark:border-neutral-800 dark:bg-[#0a0a0a]" />
          <div className="absolute -top-[7px] left-2/3 hidden h-3.5 w-3.5 -translate-x-1/2 rounded-[3px] border border-neutral-200 bg-white md:block dark:border-neutral-800 dark:bg-[#0a0a0a]" />
          <div className="absolute -top-[7px] -right-[7px] h-3.5 w-3.5 rounded-[3px] border border-neutral-200 bg-white dark:border-neutral-800 dark:bg-[#0a0a0a]" />
          <div className="absolute -bottom-[7px] -left-[7px] h-3.5 w-3.5 rounded-[3px] border border-neutral-200 bg-white dark:border-neutral-800 dark:bg-[#0a0a0a]" />
          <div className="absolute -bottom-[7px] left-1/3 hidden h-3.5 w-3.5 -translate-x-1/2 rounded-[3px] border border-neutral-200 bg-white md:block dark:border-neutral-800 dark:bg-[#0a0a0a]" />
          <div className="absolute -bottom-[7px] left-2/3 hidden h-3.5 w-3.5 -translate-x-1/2 rounded-[3px] border border-neutral-200 bg-white md:block dark:border-neutral-800 dark:bg-[#0a0a0a]" />
          <div className="absolute -right-[7px] -bottom-[7px] h-3.5 w-3.5 rounded-[3px] border border-neutral-200 bg-white dark:border-neutral-800 dark:bg-[#0a0a0a]" />
        </div>

        {/* Email Card */}
        <div className="flex flex-col items-start bg-transparent p-6 text-left transition-colors duration-400 ease-out">
          {/* Header Row: Icon & Buttons */}
          <div className="flex w-full items-center justify-between">
            <span className="inline-flex shrink-0 items-center justify-center text-neutral-900 dark:text-white">
              <svg
                className="h-7 w-7"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </span>
            <div className="flex items-center gap-2">
              <a href="mailto:hi@great-ui.com">
                <Button variant="primary" size="sm" className="shadow-xs">
                  Send email <span className="text-[10px]">↗</span>
                </Button>
              </a>
              <Button
                variant="secondary"
                size="sm"
                className="!h-8 !w-8 !p-0 shadow-xs"
                onClick={() => handleCopy("hi@great-ui.com")}
                title="Copy hi@great-ui.com"
              >
                {copiedEmail === "hi@great-ui.com" ? (
                  <svg
                    className="h-4 w-4 text-green-500"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                ) : (
                  <svg
                    className="h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"
                    />
                  </svg>
                )}
              </Button>
            </div>
          </div>

          <h3 className="mt-4 text-2xl font-semibold tracking-tight text-neutral-950 dark:text-white">
            hi@great-ui.com
          </h3>

          <p className="text-base text-neutral-600 dark:text-neutral-400">
            For custom work, partnerships, and anything detailed.
          </p>
        </div>

        {/* Twitter Card */}
        <div className="flex flex-col items-start border-t border-neutral-200 bg-transparent p-6 text-left transition-colors duration-400 ease-out md:border-t-0 md:border-l dark:border-neutral-800">
          {/* Header Row: Icon & Buttons */}
          <div className="flex w-full items-center justify-between">
            <span className="inline-flex shrink-0 items-center justify-center text-neutral-900 dark:text-white">
              <svg
                className="h-7 w-7 fill-current"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </span>
            <div className="flex items-center gap-2">
              <a
                href="https://x.com/GreatUIHQ"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="primary" size="sm" className="shadow-xs">
                  Profile <span className="text-[10px]">↗</span>
                </Button>
              </a>
            </div>
          </div>

          <h3 className="mt-4 text-2xl font-semibold tracking-tight text-neutral-950 dark:text-white">
            @GreatUIHQ
          </h3>

          <p className="text-base text-neutral-600 dark:text-neutral-400">
            DMs are best for quick questions and early ideas.
          </p>
        </div>

        {/* GitHub Card */}
        <div className="flex flex-col items-start border-t border-neutral-200 bg-transparent p-6 text-left transition-colors duration-400 ease-out md:border-t-0 md:border-l dark:border-neutral-800">
          {/* Header Row: Icon & Buttons */}
          <div className="flex w-full items-center justify-between">
            <span className="inline-flex shrink-0 items-center justify-center text-neutral-900 dark:text-white">
              <svg
                className="h-7 w-7 fill-current"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
              </svg>
            </span>
            <div className="flex items-center gap-2">
              <a
                href="https://github.com/Saurabh-2607/GreatUI"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="primary" size="sm" className="shadow-xs">
                  Repository <span className="text-[10px]">↗</span>
                </Button>
              </a>
            </div>
          </div>

          <h3 className="mt-4 text-2xl font-semibold tracking-tight text-neutral-950 dark:text-white">
            GreatUI
          </h3>

          <p className="text-base text-neutral-600 dark:text-neutral-400">
            Report bugs, request features, or view open source code.
          </p>
        </div>
      </div>
    </Container>
  );
}
