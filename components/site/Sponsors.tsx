"use client";

import React from "react";
import posthog from "posthog-js";
import Container from "./Container";

export function Sponsors() {
  return (
    <div className="relative mx-auto max-w-[1360px]">
      <Container className="relative bg-white px-4 py-10 sm:px-6 md:py-16 dark:bg-neutral-950">
        <div className="flex flex-col items-start text-left">
          <h2 className="mt-2 max-w-4xl text-4xl leading-[1.05] font-semibold tracking-tight text-neutral-950 sm:text-5xl md:text-6xl dark:text-white">
            Sponsors
          </h2>
          <p className="mt-4 max-w-2xl text-base tracking-normal text-neutral-600 sm:text-lg dark:text-neutral-400">
            Support independent open-source component development and feature
            your logo.
          </p>
        </div>

        <div className="relative z-10 mt-16 grid grid-cols-1 gap-6 md:grid-cols-3">
          <a
            href="https://github.com/sponsors/Saurabh-2607"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => posthog.capture("sponsorship_link_clicked")}
            className="group relative block h-40 cursor-pointer overflow-hidden rounded-3xl bg-neutral-100/70 p-3.5 text-center no-underline transition-all duration-300 hover:bg-neutral-200/50 dark:bg-neutral-900 dark:hover:bg-neutral-800/80"
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
            <div className="relative z-10 flex h-full w-full flex-col items-center justify-center gap-1.5 rounded-2xl bg-white shadow-sm dark:bg-neutral-950">
              <span className="text-neutral-450 text-4xl font-light transition-colors duration-300 group-hover:text-[#f6821f] dark:text-neutral-500">
                +
              </span>
              <span className="text-sm font-semibold tracking-wide text-neutral-500 transition-colors duration-300 group-hover:text-[#f6821f] dark:text-neutral-400">
                Place your logo here
              </span>
            </div>
          </a>

          <a
            href="https://github.com/sponsors/Saurabh-2607"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => posthog.capture("sponsorship_link_clicked")}
            className="group relative hidden h-40 cursor-pointer overflow-hidden rounded-3xl bg-neutral-100/70 p-3.5 text-center no-underline transition-all duration-300 hover:bg-neutral-200/50 md:block dark:bg-neutral-900 dark:hover:bg-neutral-800/80"
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
            <div className="relative z-10 flex h-full w-full flex-col items-center justify-center gap-1.5 rounded-2xl bg-white shadow-sm dark:bg-neutral-950">
              <span className="text-neutral-450 text-4xl font-light transition-colors duration-300 group-hover:text-[#f6821f] dark:text-neutral-500">
                +
              </span>
              <span className="text-sm font-semibold tracking-wide text-neutral-500 transition-colors duration-300 group-hover:text-[#f6821f] dark:text-neutral-400">
                Place your logo here
              </span>
            </div>
          </a>

          <a
            href="https://github.com/sponsors/Saurabh-2607"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => posthog.capture("sponsorship_link_clicked")}
            className="group relative hidden h-40 cursor-pointer overflow-hidden rounded-3xl bg-neutral-100/70 p-3.5 text-center no-underline transition-all duration-300 hover:bg-neutral-200/50 md:block dark:bg-neutral-900 dark:hover:bg-neutral-800/80"
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
            <div className="relative z-10 flex h-full w-full flex-col items-center justify-center gap-1.5 rounded-2xl bg-white shadow-sm dark:bg-neutral-950">
              <span className="text-neutral-450 text-4xl font-light transition-colors duration-300 group-hover:text-[#f6821f] dark:text-neutral-500">
                +
              </span>
              <span className="text-sm font-semibold tracking-wide text-neutral-500 transition-colors duration-300 group-hover:text-[#f6821f] dark:text-neutral-400">
                Place your logo here
              </span>
            </div>
          </a>
        </div>
      </Container>
    </div>
  );
}

export default Sponsors;
