"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

function CheckIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function CopyIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
      <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
    </svg>
  );
}

type ScrambleTextProps = {
  children: string;
  className?: string;
  intervalMs?: number;
};

const ENCRYPTED_TEXT_CHARS = "-_~`!@#$%^&*()+=[]{}|;:,.<>?";
const MAX_REVEAL_STEPS = 48;

type ScrambleMode = "random" | "stable";

function getTextSegments(text: string) {
  if (typeof Intl !== "undefined" && "Segmenter" in Intl) {
    const segmenter = new Intl.Segmenter(undefined, {
      granularity: "grapheme",
    });

    return Array.from(segmenter.segment(text), ({ segment }) => segment);
  }

  return Array.from(text);
}

function getRandomEncryptedTextChar() {
  return ENCRYPTED_TEXT_CHARS[
    Math.floor(Math.random() * ENCRYPTED_TEXT_CHARS.length)
  ];
}

function getStableEncryptedTextChar(segment: string, index: number) {
  let hash = index + 1;

  for (const character of segment) {
    hash = (hash * 31 + (character.codePointAt(0) ?? 0)) % 2147483647;
  }

  return ENCRYPTED_TEXT_CHARS[hash % ENCRYPTED_TEXT_CHARS.length];
}

function getEncryptedTextChar(
  segment: string,
  index: number,
  mode: ScrambleMode,
) {
  if (mode === "stable") {
    return getStableEncryptedTextChar(segment, index);
  }

  return getRandomEncryptedTextChar();
}

function shouldPreserveSegment(segment: string) {
  return segment.trim() === "";
}

function scrambleSegments(
  segments: string[],
  revealedCount: number,
  mode: ScrambleMode,
) {
  return segments
    .map((character, index) => {
      if (shouldPreserveSegment(character) || index < revealedCount) {
        return character;
      }

      return getEncryptedTextChar(character, index, mode);
    })
    .join("");
}

function scrambleText(text: string, revealedCount: number, mode: ScrambleMode) {
  return scrambleSegments(getTextSegments(text), revealedCount, mode);
}

function getRevealStep(segmentCount: number) {
  return Math.max(1, Math.ceil(segmentCount / MAX_REVEAL_STEPS));
}

function shouldReduceMotion() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function ScrambleText({
  children,
  className,
  intervalMs = 32,
}: ScrambleTextProps) {
  const [displayText, setDisplayText] = useState(() =>
    scrambleText(children, 0, "stable"),
  );

  useEffect(() => {
    const segments = getTextSegments(children);

    if (segments.length === 0 || intervalMs <= 0 || shouldReduceMotion()) {
      setTimeout(() => setDisplayText(children), 0);
      return;
    }

    let revealedCount = 0;
    const revealStep = getRevealStep(segments.length);
    setTimeout(
      () => setDisplayText(scrambleSegments(segments, revealedCount, "random")),
      0,
    );

    const timer = window.setInterval(() => {
      revealedCount = Math.min(segments.length, revealedCount + revealStep);
      setDisplayText(scrambleSegments(segments, revealedCount, "random"));

      if (revealedCount >= segments.length) {
        window.clearInterval(timer);
      }
    }, intervalMs);

    return () => {
      window.clearInterval(timer);
    };
  }, [children, intervalMs]);

  return (
    <span className={cn("inline-block", className)}>
      <span aria-hidden="true">{displayText}</span>
      <span aria-atomic="true" aria-live="polite" className="sr-only">
        {children}
      </span>
    </span>
  );
}

function computeDiff(oldStr: string, newStr: string) {
  if (oldStr === newStr) return { prefix: "", diff: "", suffix: oldStr };
  let start = 0;
  while (
    start < oldStr.length &&
    start < newStr.length &&
    oldStr[start] === newStr[start]
  ) {
    start++;
  }
  let oldEnd = oldStr.length - 1;
  let newEnd = newStr.length - 1;
  while (
    oldEnd >= start &&
    newEnd >= start &&
    oldStr[oldEnd] === newStr[newEnd]
  ) {
    oldEnd--;
    newEnd--;
  }
  return {
    prefix: newStr.slice(0, start),
    diff: newStr.slice(start, newEnd + 1),
    suffix: newStr.slice(newEnd + 1),
  };
}

export function SmartScrambleText({
  children,
  className,
  intervalMs = 32,
}: {
  children: string;
  className?: string;
  intervalMs?: number;
}) {
  const [current, setCurrent] = useState(children);
  const [diffResult, setDiffResult] = useState(() => computeDiff("", children));

  if (children !== current) {
    setCurrent(children);
    setDiffResult(computeDiff(current, children));
  }

  return (
    <span className={cn(className)}>
      {diffResult.prefix}
      {diffResult.diff ? (
        <ScrambleText intervalMs={intervalMs} key={children}>
          {diffResult.diff}
        </ScrambleText>
      ) : null}
      {diffResult.suffix}
    </span>
  );
}

export type PkgManager = "npm" | "pnpm" | "yarn" | "bun";

export interface ScrambledInstallCommandProps {
  installCommand: string;
  pkgManager: PkgManager;
  setPkgManager: (pm: PkgManager) => void;
  onCopy?: () => void;
  animationVariant?: "full" | "smart";
  className?: string;
  headerClassName?: string;
  codeClassName?: string;
  buttonContainerClassName?: string;
  buttonClassName?: string;
  activeButtonClassName?: string;
  inactiveButtonClassName?: string;
  copyButtonClassName?: string;
  terminalIcon?: React.ReactNode;
  availableManagers?: PkgManager[];
  scrambleIntervalMs?: number;
}

export function ScrambledInstallCommand({
  installCommand,
  pkgManager,
  setPkgManager,
  onCopy,
  animationVariant = "full",
  className,
  headerClassName,
  codeClassName,
  buttonContainerClassName,
  buttonClassName,
  activeButtonClassName,
  inactiveButtonClassName,
  copyButtonClassName,
  terminalIcon,
  availableManagers = ["pnpm", "npm", "yarn", "bun"],
  scrambleIntervalMs = 32,
}: ScrambledInstallCommandProps) {
  const [copiedInstall, setCopiedInstall] = useState(false);

  const handleCopyInstall = () => {
    navigator.clipboard.writeText(installCommand);
    setCopiedInstall(true);
    onCopy?.();
    setTimeout(() => setCopiedInstall(false), 2000);
  };

  return (
    <div
      className={cn(
        "overflow-hidden rounded-xl border border-black/10 bg-neutral-100 dark:border-white/5 dark:bg-[#141414]",
        className,
      )}
    >
      <div
        className={cn(
          "flex h-11 items-center justify-between border-b border-black/10 bg-neutral-200/30 px-4 select-none dark:border-white/5 dark:bg-[#0a0a0a]/30",
          headerClassName,
        )}
      >
        <div className="flex items-center gap-3">
          {terminalIcon || (
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-3.5 w-3.5 text-neutral-400 dark:text-neutral-500"
            >
              <polyline points="4 17 10 11 4 5" />
              <line x1="12" y1="19" x2="20" y2="19" />
            </svg>
          )}
          <div
            className={cn("flex items-center gap-1", buttonContainerClassName)}
          >
            {availableManagers.map((pm) => (
              <button
                key={pm}
                type="button"
                onClick={() => setPkgManager(pm)}
                className={cn(
                  "cursor-pointer px-2.5 py-0.5 text-xs font-semibold transition-colors",
                  buttonClassName,
                  pkgManager === pm
                    ? cn(
                        "rounded-md bg-white text-neutral-900 shadow-sm dark:bg-neutral-800 dark:text-white",
                        activeButtonClassName,
                      )
                    : cn(
                        "text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white",
                        inactiveButtonClassName,
                      ),
                )}
              >
                {pm}
              </button>
            ))}
          </div>
        </div>
        <button
          type="button"
          onClick={handleCopyInstall}
          className={cn(
            "cursor-pointer p-1 text-neutral-400 hover:text-neutral-900 dark:text-neutral-500 dark:hover:text-white",
            copyButtonClassName,
          )}
          title="Copy installation command"
        >
          {copiedInstall ? (
            <CheckIcon className="h-4 w-4 text-green-500" />
          ) : (
            <CopyIcon className="h-4 w-4" />
          )}
        </button>
      </div>
      <div
        className={cn(
          "px-6 py-5 font-mono text-sm leading-[1.6] text-neutral-900 select-all dark:text-neutral-100",
          codeClassName,
        )}
      >
        <code>
          {animationVariant === "smart" ? (
            <SmartScrambleText intervalMs={scrambleIntervalMs}>
              {installCommand}
            </SmartScrambleText>
          ) : (
            <ScrambleText intervalMs={scrambleIntervalMs} key={installCommand}>
              {installCommand}
            </ScrambleText>
          )}
        </code>
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
