"use client";

import posthog from "posthog-js";
import Link from "next/link";
import Container from "./Container";
import Button from "./ui/Button";
import { SectionIcon } from "./Icons";

export function Hero() {
  return (
    <div className="relative mx-auto max-w-[1360px]">
      <Container className="max-w-[1360px] bg-white px-4 pt-28 pb-12 sm:px-6 dark:bg-neutral-950">
        <div className="flex flex-col gap-8 py-4 text-left md:flex-row md:items-end md:justify-between">
          <div className="max-w-3xl">
            <h1 className="animate-fade-in text-4xl leading-[1.05] font-semibold tracking-tight text-neutral-950 sm:text-5xl dark:text-white">
              Build Premium React Interfaces
            </h1>
            <p className="mt-2.5 max-w-2xl text-base text-neutral-600 sm:text-lg dark:text-neutral-400">
              Beautiful, accessible, and high-performance Tailwind CSS
              components designed to build stunning web applications instantly.
            </p>
          </div>

          <div className="flex shrink-0 items-center justify-start md:justify-end">
            <Link
              href="/components"
              onClick={() => posthog.capture("components_catalogue_opened")}
            >
              <Button
                variant="primary"
                size="md"
                leftIcon={<SectionIcon className="h-4 w-4" />}
              >
                Browse Components
              </Button>
            </Link>
          </div>
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

export default Hero;
