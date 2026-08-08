"use client";

import { useState, useEffect } from "react";
import { type Component } from "@/lib/registry";
import { CopyIcon, CheckIcon, CodeIcon } from "./Icons";
import ShikiHighlight from "./ShikiHighlight";

type PkgManager = "npm" | "pnpm" | "yarn" | "bun";

function getInstallCommand(pm: PkgManager, url: string): string {
  switch (pm) {
    case "pnpm":
      return `pnpm dlx shadcn@latest add ${url}`;
    case "yarn":
      return `yarn dlx shadcn@latest add ${url}`;
    case "bun":
      return `bunx shadcn@latest add ${url}`;
    case "npm":
    default:
      return `npx shadcn@latest add ${url}`;
  }
}

export default function DocsPanel({ component }: { component: Component }) {
  const [copiedInstall, setCopiedInstall] = useState(false);
  const [copiedUsage, setCopiedUsage] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [pkgManager, setPkgManager] = useState<PkgManager>("pnpm");

  useEffect(() => {
    const frame = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  const origin = mounted ? window.location.origin : "https://great-ui.com";
  const registryUrl = `${origin}/r/${component.slug}.json`;

  const installCommand = getInstallCommand(pkgManager, registryUrl);

  const handleCopyInstall = () => {
    navigator.clipboard.writeText(installCommand);
    setCopiedInstall(true);
    setTimeout(() => setCopiedInstall(false), 2000);
  };

  const handleCopyUsage = () => {
    navigator.clipboard.writeText(component.usageCode || "");
    setCopiedUsage(true);
    setTimeout(() => setCopiedUsage(false), 2000);
  };

  return (
    <aside className="flex flex-col space-y-20 text-neutral-900 dark:text-white">
      <div>
        <h2 className="text-4xl font-semibold tracking-tight text-neutral-900 dark:text-white">
          {component.name}
        </h2>
        <p className="leading-tighter mt-5 text-2xl text-neutral-700 dark:text-neutral-300">
          {component.description}
        </p>
      </div>

      {component.dependencies.length > 0 && (
        <div className="flex flex-col gap-2">
          <p className="text-md text-neutral-450 font-semibold uppercase dark:text-neutral-500">
            Dependencies
          </p>
          <div className="flex flex-wrap gap-2.5">
            {component.dependencies.map((dep) => (
              <span
                key={dep}
                className="inline-flex items-center rounded-xl border border-neutral-200 bg-neutral-100 px-4 py-2.5 font-mono text-lg font-medium text-neutral-800 dark:border-neutral-800 dark:bg-neutral-900/40 dark:text-neutral-200"
              >
                {dep}
              </span>
            ))}
          </div>
          {component.dependencyNotes && (
            <p className="mt-3 text-xl leading-snug text-neutral-600 dark:text-neutral-400">
              {component.dependencyNotes
                .split(/(https?:\/\/[^\s\)]+)/g)
                .map((part, idx) => {
                  if (/(https?:\/\/[^\s\)]+)/.test(part)) {
                    return (
                      <a
                        key={idx}
                        href={part}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-semibold text-neutral-600 underline underline-offset-4 transition-colors hover:text-neutral-950 dark:text-neutral-400 dark:hover:text-white"
                      >
                        {part}
                      </a>
                    );
                  }
                  return part;
                })}
            </p>
          )}
        </div>
      )}

      <div className="flex flex-col gap-2">
        <p className="text-md text-neutral-450 font-semibold uppercase dark:text-neutral-500">
          Interaction
        </p>
        <p className="text-2xl leading-relaxed text-neutral-700 dark:text-neutral-300">
          {component.interactionType}
        </p>
      </div>

      <div className="flex flex-col gap-2">
        <p className="text-md text-neutral-450 font-semibold uppercase dark:text-neutral-500">
          Installation
        </p>
        <div className="overflow-hidden rounded-xl bg-neutral-100 dark:bg-[#141414]">
          <div className="flex h-11 items-center justify-between border-b border-neutral-200/60 bg-neutral-200/30 px-4 select-none dark:border-neutral-800/60 dark:bg-[#0a0a0a]/30">
            <div className="flex items-center gap-3">
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
              <div className="flex items-center gap-1">
                {(["pnpm", "npm", "yarn", "bun"] as PkgManager[]).map((pm) => (
                  <button
                    key={pm}
                    type="button"
                    onClick={() => setPkgManager(pm)}
                    className={`cursor-pointer px-2.5 py-0.5 text-xs font-semibold transition-colors ${
                      pkgManager === pm
                        ? "rounded-md border border-neutral-200 bg-white text-neutral-900 shadow-sm dark:border-neutral-800/60 dark:bg-neutral-900 dark:text-white"
                        : "text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white"
                    }`}
                  >
                    {pm}
                  </button>
                ))}
              </div>
            </div>
            <button
              type="button"
              onClick={handleCopyInstall}
              className="cursor-pointer p-1 text-neutral-400 hover:text-neutral-900 dark:text-neutral-500 dark:hover:text-white"
              title="Copy installation command"
            >
              {copiedInstall ? (
                <CheckIcon className="h-4 w-4 text-green-500" />
              ) : (
                <CopyIcon className="h-4 w-4" />
              )}
            </button>
          </div>
          <div className="px-6 py-5 font-mono text-sm leading-[1.6] text-neutral-800 select-all dark:text-neutral-200">
            <code>{installCommand}</code>
          </div>
        </div>
      </div>

      {component.usageCode && (
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <p className="text-md text-neutral-450 font-semibold uppercase dark:text-neutral-500">
              How to use
            </p>
            <button
              type="button"
              onClick={handleCopyUsage}
              className="cursor-pointer p-1 text-neutral-400 hover:text-neutral-900 dark:text-neutral-500 dark:hover:text-white"
              title="Copy code"
            >
              {copiedUsage ? (
                <CheckIcon className="h-4 w-4 text-green-500" />
              ) : (
                <CopyIcon className="h-4 w-4" />
              )}
            </button>
          </div>
          <ShikiHighlight
            code={component.usageCode || ""}
            lang="tsx"
            className="relative !m-0 scrollbar-none overflow-auto rounded-xl bg-neutral-100 p-6 text-left !font-mono font-mono text-sm leading-[1.6] select-text selection:bg-[#f6821f]/30 dark:bg-[#141414]"
          />
        </div>
      )}

      <div className="flex flex-col gap-2">
        <p className="text-md text-neutral-450 font-semibold uppercase dark:text-neutral-500">
          Source Code
        </p>
        <p className="flex flex-wrap items-center gap-x-2 gap-y-1.5 text-2xl leading-relaxed text-neutral-700 dark:text-neutral-300">
          <span>Click on the top right</span>
          <span className="text-neutral-750 dark:text-neutral-250 border-neutral-250 inline-flex h-9 w-9 items-center justify-center rounded-xl border bg-neutral-100 shadow-xs dark:border-neutral-800 dark:bg-neutral-900">
            <CodeIcon className="h-4.5 w-4.5" />
          </span>
          <span>button to view the source code.</span>
        </p>
      </div>

      {component.props.length > 0 && (
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-2">
            <p className="text-md text-neutral-450 font-semibold uppercase dark:text-neutral-500">
              Props Details
            </p>
            <p className="text-2xl leading-relaxed text-neutral-500 dark:text-neutral-400">
              Configurable properties for {component.name}.
            </p>
          </div>

          <div className="w-full scrollbar-none overflow-x-auto">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr>
                  <th className="text-md text-neutral-450 py-4 pr-4 font-semibold uppercase dark:text-neutral-500">
                    Prop
                  </th>
                  <th className="text-md text-neutral-450 px-4 py-4 font-semibold uppercase dark:text-neutral-500">
                    Type
                  </th>
                  <th className="text-md text-neutral-450 px-4 py-4 font-semibold uppercase dark:text-neutral-500">
                    Default
                  </th>
                  <th className="text-md text-neutral-450 py-4 pl-4 font-semibold uppercase dark:text-neutral-500">
                    Description
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y-0">
                {component.props.map((prop) => (
                  <tr key={prop.name} className="align-top">
                    <td className="py-4 pr-4">
                      <code className="rounded-lg bg-neutral-100 px-3 py-1 font-mono text-xl font-semibold text-neutral-900 dark:bg-neutral-800 dark:text-neutral-100">
                        {prop.name}
                      </code>
                    </td>
                    <td className="px-4 py-4">
                      <span className="font-mono text-base font-semibold whitespace-pre-wrap text-[#f6821f] dark:text-[#ff9d42]">
                        {prop.type.join(" | ")}
                      </span>
                    </td>
                    <td className="max-w-[220px] px-4 py-4 break-all">
                      {prop.default ? (
                        <code className="font-mono text-base break-all whitespace-pre-wrap text-neutral-500 dark:text-neutral-400">
                          {prop.default}
                        </code>
                      ) : (
                        <span className="text-base text-neutral-400 dark:text-neutral-600">
                          —
                        </span>
                      )}
                    </td>
                    <td className="py-4 pl-4 text-xl leading-relaxed text-neutral-600 dark:text-neutral-300">
                      {prop.description}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </aside>
  );
}
