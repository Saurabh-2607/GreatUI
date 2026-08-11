"use client";

import React from "react";
import Link from "next/link";
import posthog from "posthog-js";
import { components } from "@/lib/registry";
import { GithubIcon, CubeIcon, LaptopIcon } from "./Icons";
import Container from "./Container";

export default function CTASection() {
  const count = components.length;

  return (
    <div className="relative mx-auto max-w-[1360px]">
      <div
        className="pointer-events-none absolute top-0 right-0 left-0 z-20 h-px select-none"
        style={{
          backgroundImage:
            "linear-gradient(to right, var(--color-border-100) 50%, transparent 50%)",
          backgroundSize: "32px 1px",
          backgroundRepeat: "repeat-x",
        }}
      />
      <Container className="relative bg-white px-4 py-20 sm:px-6 md:py-28 dark:bg-neutral-950">
        <div className="flex flex-col items-start text-left">
          <h2 className="mt-2 max-w-4xl text-4xl leading-[1.05] font-semibold tracking-tight text-neutral-950 sm:text-5xl md:text-6xl dark:text-white">
            Ready to build something great?
          </h2>
          <p className="mt-4 max-w-2xl text-base tracking-normal text-neutral-600 sm:text-lg dark:text-neutral-400">
            Join the community and start crafting premium interfaces today.
          </p>

          <div className="relative z-10 mt-12 grid w-full grid-cols-1 gap-6 md:grid-cols-3">
            <Link
              href="/components"
              className="group relative block h-44 cursor-pointer overflow-hidden rounded-3xl bg-neutral-100/70 p-3.5 no-underline transition-all duration-300 hover:bg-neutral-200/50 dark:bg-neutral-900 dark:hover:bg-neutral-800/80"
            >
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
              <div className="relative z-10 flex h-full w-full flex-col justify-between overflow-hidden rounded-2xl bg-white p-6 shadow-sm dark:bg-neutral-950">
                <CubeIcon className="absolute -right-8 -bottom-8 h-48 w-48 text-neutral-900 opacity-[0.03] transition-colors duration-500 group-hover:text-[#f6821f] dark:text-white dark:opacity-[0.02]" />

                <div className="flex w-full justify-start">
                  <span className="text-neutral-450 relative z-10 transition-all duration-500 group-hover:-translate-y-1.5 group-hover:scale-110 group-hover:rotate-12 dark:text-neutral-500">
                    <CubeIcon className="h-8 w-8" />
                  </span>
                </div>

                <div className="relative z-10 flex flex-col items-start gap-0.5 text-left">
                  <span className="text-lg font-semibold tracking-wide text-neutral-900 dark:text-white">
                    Explore Components
                  </span>
                  <span className="text-sm font-medium text-neutral-500 dark:text-neutral-400">
                    {count} production-ready elements
                  </span>
                </div>
              </div>
            </Link>

            <a
              href="https://github.com/Saurabh-2607/GreatUI"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => posthog.capture("github_star_clicked_cta")}
              className="group relative block h-44 cursor-pointer overflow-hidden rounded-3xl bg-neutral-100/70 p-3.5 no-underline transition-all duration-300 hover:bg-neutral-200/50 dark:bg-neutral-900 dark:hover:bg-neutral-800/80"
            >
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
              <div className="relative z-10 flex h-full w-full flex-col justify-between overflow-hidden rounded-2xl bg-white p-6 shadow-sm dark:bg-neutral-950">
                <GithubIcon className="absolute -right-8 -bottom-8 h-48 w-48 text-neutral-900 opacity-[0.03] transition-colors duration-500 group-hover:text-[#f6821f] dark:text-white dark:opacity-[0.02]" />

                <div className="flex w-full justify-start">
                  <span className="text-neutral-450 relative z-10 transition-all duration-500 group-hover:-translate-y-1.5 group-hover:scale-110 group-hover:-rotate-6 dark:text-neutral-500">
                    <GithubIcon className="h-8 w-8" />
                  </span>
                </div>

                <div className="relative z-10 flex flex-col items-start gap-0.5 text-left">
                  <span className="text-lg font-semibold tracking-wide text-neutral-900 dark:text-white">
                    Star it on GitHub
                  </span>
                  <span className="text-sm font-medium text-neutral-500 dark:text-neutral-400">
                    Support the open source project
                  </span>
                </div>
              </div>
            </a>

            <div className="relative block h-44 overflow-hidden rounded-3xl bg-neutral-100/70 p-3.5 no-underline opacity-50 grayscale dark:bg-neutral-900">
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
              <div className="relative z-10 flex h-full w-full flex-col justify-between overflow-hidden rounded-2xl bg-white p-6 shadow-sm dark:bg-neutral-950">
                <LaptopIcon className="absolute -right-8 -bottom-8 h-48 w-48 text-neutral-900 opacity-[0.03] dark:text-white dark:opacity-[0.02]" />

                <div className="flex w-full justify-start">
                  <span className="text-neutral-450 relative z-10 dark:text-neutral-500">
                    <LaptopIcon className="h-8 w-8" />
                  </span>
                </div>

                <div className="relative z-10 flex flex-col items-start gap-0.5 text-left">
                  <span className="text-lg font-semibold tracking-wide text-neutral-900 dark:text-white">
                    Templates
                  </span>
                  <span className="text-sm font-medium text-neutral-500 dark:text-neutral-400">
                    Coming soon
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
