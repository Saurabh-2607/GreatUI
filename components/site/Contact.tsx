"use client";

import React, { useState } from "react";
import posthog from "posthog-js";
import Container from "./Container";

interface ContactCardProps {
  href: string;
  mockup: React.ReactNode;
  title: string;
  description: string;
  isEmail?: boolean;
  handleCopy?: (email: string) => void;
  copiedEmail?: string | null;
  target?: string;
  rel?: string;
}

function ContactCard({
  href,
  mockup,
  title,
  description,
  isEmail,
  handleCopy,
  copiedEmail,
  target,
  rel,
}: ContactCardProps) {
  return (
    <div className="group relative block cursor-pointer overflow-hidden rounded-3xl bg-neutral-100 no-underline dark:bg-neutral-900">
      <div className="relative flex h-56 w-full items-center justify-center overflow-hidden bg-neutral-200/40 px-3.5 pt-3.5 pb-0 dark:bg-neutral-950/40">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.12] dark:opacity-[0.08]"
          style={{
            backgroundImage: `
              repeating-linear-gradient(
                -45deg,
                #f6821f 0,
                #f6821f 1px,
                transparent 1px,
                transparent 10px
              )
            `,
          }}
        />

        <div className="relative z-10 flex h-full w-full items-center justify-center overflow-hidden rounded-t-2xl bg-white dark:bg-neutral-950">
          {mockup}
        </div>
      </div>

      <div className="flex flex-col p-4">
        <div className="flex items-center justify-between gap-2">
          <div className="z-20 flex items-center gap-1.5">
            <a
              href={href}
              target={target}
              rel={rel}
              className="text-lg font-semibold tracking-tight text-neutral-900 before:absolute before:inset-0 before:z-10 dark:text-white"
            >
              {title}
            </a>
            {isEmail && handleCopy && (
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleCopy(title);
                }}
                className="relative z-30 ml-1 rounded-md p-1.5 text-neutral-400 transition-colors hover:bg-neutral-200 hover:text-neutral-900 dark:text-neutral-500 dark:hover:bg-neutral-800 dark:hover:text-white"
                title={`Copy ${title}`}
              >
                {copiedEmail === title ? (
                  <svg
                    className="h-3.5 w-3.5 text-green-500"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2.5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                ) : (
                  <svg
                    className="h-3.5 w-3.5"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2.5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"
                    />
                  </svg>
                )}
              </button>
            )}
          </div>
          <svg
            className="h-5 w-5 text-neutral-400 transition-all duration-300 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[#f6821f] dark:text-neutral-600"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="7" y1="17" x2="17" y2="7" />
            <polyline points="7 7 17 7 17 17" />
          </svg>
        </div>
        <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
          {description}
        </p>
      </div>
    </div>
  );
}

export default function Contact() {
  const [copiedEmail, setCopiedEmail] = useState<string | null>(null);

  const handleCopy = (email: string) => {
    navigator.clipboard.writeText(email);
    setCopiedEmail(email);
    posthog.capture("contact_email_copied");
    setTimeout(() => setCopiedEmail(null), 2000);
  };

  return (
    <div className="relative mx-auto max-w-[1360px]">
      <Container className="relative bg-white px-4 py-10 sm:px-6 md:py-16 dark:bg-neutral-950">
        <div className="flex flex-col items-start text-left">
          <h2 className="mt-2 max-w-4xl text-4xl leading-[1.05] font-semibold tracking-tight text-neutral-950 sm:text-5xl md:text-6xl dark:text-white">
            Get in touch.
          </h2>
          <p className="mt-4 max-w-2xl text-base tracking-normal text-neutral-600 sm:text-lg dark:text-neutral-400">
            Have questions, custom requests, or want to contribute? Connect
            through any of the channels below.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-3">
          <ContactCard
            href="mailto:hi@great-ui.com"
            title="hi@great-ui.com"
            description="For custom work, partnerships, and anything detailed."
            isEmail={true}
            handleCopy={handleCopy}
            copiedEmail={copiedEmail}
            mockup={
              <div className="flex h-full w-full flex-col justify-between bg-white p-4 text-left font-sans text-xs dark:bg-neutral-950">
                <div>
                  <div className="mb-3 flex items-center justify-between border-b border-neutral-100 pb-2.5 dark:border-neutral-900">
                    <div className="flex items-center gap-1.5">
                      <span className="h-3 w-3 rounded-full bg-red-500/80" />
                      <span className="h-3 w-3 rounded-full bg-yellow-500/80" />
                      <span className="h-3 w-3 rounded-full bg-green-500/80" />
                    </div>
                    <span className="text-xs font-medium text-neutral-400">
                      New Message
                    </span>
                  </div>
                  <div className="space-y-2 text-xs text-neutral-500 sm:text-sm">
                    <div className="flex gap-2.5 rounded-xl bg-neutral-100 px-4 py-2.5 dark:bg-neutral-900">
                      <span className="font-medium text-neutral-400">To:</span>{" "}
                      <span className="text-neutral-800 dark:text-neutral-200">
                        hi@great-ui.com
                      </span>
                    </div>
                    <div className="flex gap-2.5 rounded-xl bg-neutral-100 px-4 py-2.5 dark:bg-neutral-900">
                      <span className="font-medium text-neutral-400">
                        Subject:
                      </span>{" "}
                      <span className="text-neutral-800 dark:text-neutral-200">
                        Custom Request
                      </span>
                    </div>
                  </div>
                </div>
                <div className="mt-4 space-y-2.5">
                  <div className="h-2.5 w-[95%] rounded bg-neutral-100 dark:bg-neutral-900" />
                  <div className="h-2.5 w-[80%] rounded bg-neutral-100 dark:bg-neutral-900" />
                  <div className="h-2.5 w-[50%] rounded bg-neutral-100 dark:bg-neutral-900" />
                </div>
              </div>
            }
          />

          <ContactCard
            href="https://x.com/GreatUIHQ"
            target="_blank"
            rel="noopener noreferrer"
            title="@GreatUIHQ"
            description="DMs are best for quick questions and early ideas."
            mockup={
              <div className="flex h-full w-full flex-col bg-white text-left font-sans text-xs select-none dark:bg-[#050505]">
                <div className="relative flex h-24 w-full shrink-0 items-center justify-center overflow-hidden bg-neutral-100 dark:bg-neutral-950">
                  <img
                    src="https://ik.imagekit.io/ybq4azred/banner.png"
                    alt="Great UI Banner"
                    className="h-full w-full object-cover"
                  />
                </div>

                <div className="relative flex flex-col justify-end px-5 pt-12">
                  <img
                    src="https://ik.imagekit.io/ybq4azred/Great-UI.png"
                    alt="Great UI Avatar"
                    className="absolute -top-10 left-4 h-20 w-20 rounded-full border-4 border-white bg-white object-cover shadow transition-transform duration-300 group-hover:scale-[1.02] dark:border-[#050505] dark:bg-[#050505]"
                  />

                  <div className="space-y-0">
                    <div className="text-base leading-5 font-bold tracking-tight text-neutral-900 sm:text-lg dark:text-white">
                      Great UI
                    </div>
                    <div className="text-xs text-neutral-500">@GreatUIHQ</div>
                  </div>
                  <div className="space-y-0 pt-1">
                    <div className="text-sm leading-5 tracking-tight text-neutral-500">
                      Great UI is an open-source React component library focused
                      on beautiful design, smooth animations, and exceptional
                      developer experience by @srbh_here
                    </div>
                  </div>
                </div>
              </div>
            }
          />

          <ContactCard
            href="https://github.com/Saurabh-2607/GreatUI"
            target="_blank"
            rel="noopener noreferrer"
            title="GreatUI"
            description="Report bugs, request features, or view open source code."
            mockup={
              <div className="flex h-full w-full flex-col gap-3 bg-white p-4 text-left font-sans text-xs select-none dark:bg-neutral-950">
                <div className="flex items-center gap-2">
                  <svg
                    className="h-5 w-5 shrink-0 fill-current text-neutral-800 dark:text-white"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                  </svg>
                  <div className="flex items-center gap-1 text-[13px] tracking-tight">
                    <span className="font-medium text-neutral-500 dark:text-neutral-400">
                      Saurabh-2607
                    </span>
                    <span className="text-neutral-300 dark:text-neutral-600">
                      /
                    </span>
                    <span className="font-bold text-neutral-900 dark:text-white">
                      GreatUI
                    </span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <div className="h-2.5 w-12 rounded-full bg-orange-500" />
                  <div className="h-2.5 w-14 rounded-full bg-neutral-100 dark:bg-neutral-900" />
                  <div className="h-2.5 w-16 rounded-full bg-neutral-100 dark:bg-neutral-900" />
                  <div className="h-2.5 w-10 rounded-full bg-neutral-100 dark:bg-neutral-900" />
                </div>

                <div className="flex min-h-0 flex-1 gap-3">
                  <div className="flex flex-1 flex-col justify-center gap-2 rounded-2xl bg-neutral-50 p-2.5 dark:bg-neutral-950">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="h-3 w-4 shrink-0 rounded-sm bg-neutral-200 dark:bg-neutral-800" />
                        <div className="h-2 w-12 rounded-full bg-neutral-200 dark:bg-neutral-800" />
                        <div className="h-2 w-20 rounded-full bg-neutral-100 dark:bg-neutral-900" />
                      </div>
                      <div className="h-2 w-8 rounded-full bg-neutral-100 dark:bg-neutral-900" />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="h-3 w-4 shrink-0 rounded-sm bg-neutral-200 dark:bg-neutral-800" />
                        <div className="h-2 w-8 rounded-full bg-neutral-200 dark:bg-neutral-800" />
                        <div className="h-2 w-24 rounded-full bg-neutral-100 dark:bg-neutral-900" />
                      </div>
                      <div className="h-2 w-6 rounded-full bg-neutral-100 dark:bg-neutral-900" />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="h-3 w-4 shrink-0 rounded-sm bg-neutral-200 dark:bg-neutral-800" />
                        <div className="h-2 w-14 rounded-full bg-neutral-200 dark:bg-neutral-800" />
                        <div className="h-2 w-16 rounded-full bg-neutral-100 dark:bg-neutral-900" />
                      </div>
                      <div className="h-2 w-10 rounded-full bg-neutral-100 dark:bg-neutral-900" />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="h-3 w-5 shrink-0 rounded-sm bg-neutral-200 dark:bg-neutral-800" />
                        <div className="h-2 w-10 rounded-full bg-neutral-200 dark:bg-neutral-800" />
                        <div className="h-2 w-28 rounded-full bg-neutral-100 dark:bg-neutral-900" />
                      </div>
                      <div className="h-2 w-8 rounded-full bg-neutral-100 dark:bg-neutral-900" />
                    </div>
                  </div>

                  <div className="flex w-24 shrink-0 flex-col justify-center gap-2.5">
                    <div className="flex flex-col gap-1.5">
                      <div className="bg-neutral-350 h-2 w-8 rounded-full dark:bg-neutral-700" />
                      <div className="h-1.5 w-20 rounded-full bg-neutral-200 dark:bg-neutral-800" />
                      <div className="h-1.5 w-16 rounded-full bg-neutral-200 dark:bg-neutral-800" />
                      <div className="h-1.5 w-18 rounded-full bg-neutral-100 dark:bg-neutral-900/60" />
                    </div>
                    <div className="mt-1 flex flex-col gap-1.5">
                      <div className="bg-neutral-350 h-2 w-14 rounded-full dark:bg-neutral-700" />
                      <div className="flex h-1.5 w-full overflow-hidden rounded-full bg-neutral-100 dark:bg-neutral-900">
                        <div className="h-full w-[85%] bg-orange-500" />
                        <div className="h-full w-[15%] bg-blue-500" />
                      </div>
                      <div className="flex gap-2">
                        <div className="h-1.5 w-8 rounded-full bg-neutral-200 dark:bg-neutral-800" />
                        <div className="h-1.5 w-6 rounded-full bg-neutral-200 dark:bg-neutral-800" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            }
          />
        </div>
      </Container>
      <div
        className="pointer-events-none absolute right-0 bottom-0 left-0 z-20 h-px select-none"
        style={{
          backgroundImage:
            "linear-gradient(to right, var(--color-border-100) 50%, transparent 50%)",
          backgroundSize: "32px 1px",
          backgroundRepeat: "repeat-x",
        }}
      />
    </div>
  );
}
