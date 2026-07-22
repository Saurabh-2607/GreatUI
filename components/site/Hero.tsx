"use client";

import posthog from "posthog-js";
import Link from "next/link";
import Container from "./Container";
import Button from "./ui/Button";

export function Hero() {
  return (
    <Container className="py-12">
      <div className="flex min-h-[50vh] flex-col items-center justify-center text-center">
        <h1 className="animate-fade-in max-w-4xl text-4xl leading-[0.9] font-semibold tracking-tight text-balance text-neutral-950 sm:text-5xl md:text-6xl dark:text-white">
          Craft Premium React Interfaces with Absolute Speed
        </h1>
        <p className="leading-tighter mt-4 max-w-[60%] text-lg tracking-normal text-pretty text-neutral-600 sm:text-xl md:text-2xl dark:text-neutral-400">
          Beautiful, accessible, and high-performance React components built
          with Tailwind CSS. Copy, paste, and build premium interfaces
          instantly.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Link href="/components">
            <Button variant="primary" size="md">
              Browse Components
            </Button>
          </Link>
          <a
            href="https://github.com/Saurabh-2607/GreatUI"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() =>
              posthog.capture("github_star_clicked", { location: "hero" })
            }
          >
            <Button variant="secondary" size="md">
              Star on GitHub
            </Button>
          </a>
        </div>
      </div>
    </Container>
  );
}

export default Hero;
