"use client";

import { useState, useEffect, useSyncExternalStore } from "react";
import posthog from "posthog-js";
import { type Component, components } from "@/lib/registry";
import { CATEGORY_ORDER, componentsByCategory } from "@/lib/categories";
import Link from "next/link";
import {
  CopyIcon,
  CheckIcon,
  CodeIcon,
  dependencyUrls,
  dependencyIcons,
  NpmIcon,
  PnpmIcon,
  YarnIcon,
  BunIcon,
} from "./Icons";
import ShikiHighlight from "./ShikiHighlight";
import ComponentActions from "./ComponentActions";
import { getComponentPropsSchema } from "@/lib/propsRegistry";

type PkgManager = "npm" | "pnpm" | "yarn" | "bun";

function PkgManagerIcon({
  pm,
  className = "h-3.5 w-3.5",
}: {
  pm: PkgManager;
  className?: string;
}) {
  switch (pm) {
    case "pnpm":
      return <PnpmIcon className={className} />;
    case "npm":
      return <NpmIcon className={className} />;
    case "yarn":
      return <YarnIcon className={className} />;
    case "bun":
      return <BunIcon className={className} />;
  }
}

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

function subscribePkgManager(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener("great-ui-pkg-manager-changed", callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener("great-ui-pkg-manager-changed", callback);
  };
}

function getPkgManagerSnapshot(): PkgManager {
  try {
    const saved = localStorage.getItem(
      "great-ui-pkg-manager",
    ) as PkgManager | null;
    if (
      saved &&
      (["pnpm", "npm", "yarn", "bun"] as PkgManager[]).includes(saved)
    ) {
      return saved;
    }
  } catch {}
  return "pnpm";
}

function getPkgManagerServerSnapshot(): PkgManager {
  return "pnpm";
}

export default function DocsPanel({ component }: { component: Component }) {
  const propsSchema = getComponentPropsSchema(component.slug);
  const hasCustomizableProps = propsSchema
    ? propsSchema.schemas.length > 0
    : false;

  const [copiedInstall, setCopiedInstall] = useState(false);
  const [copiedUsage, setCopiedUsage] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pkgManager = useSyncExternalStore(
    subscribePkgManager,
    getPkgManagerSnapshot,
    getPkgManagerServerSnapshot,
  );

  const handleSelectPkgManager = (pm: PkgManager) => {
    try {
      localStorage.setItem("great-ui-pkg-manager", pm);
      window.dispatchEvent(new Event("great-ui-pkg-manager-changed"));
    } catch {}
  };

  const orderedComponents: typeof components = [];
  CATEGORY_ORDER.forEach((catName) => {
    const catComponents = componentsByCategory[catName] || [];
    if (catComponents.length > 0) {
      orderedComponents.push(...[...catComponents].reverse());
    }
  });
  const currentIndex = orderedComponents.findIndex(
    (c) => c.slug === component.slug,
  );
  const prevComponent =
    currentIndex > 0 ? orderedComponents[currentIndex - 1] : null;
  const nextComponent =
    currentIndex < orderedComponents.length - 1
      ? orderedComponents[currentIndex + 1]
      : null;

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
    posthog.capture("documentation_install_command_copied", {
      component_slug: component.slug,
      package_manager: pkgManager,
    });
    setTimeout(() => setCopiedInstall(false), 2000);
  };

  const handleCopyUsage = () => {
    navigator.clipboard.writeText(component.usageCode || "");
    setCopiedUsage(true);
    posthog.capture("documentation_usage_code_copied", {
      component_slug: component.slug,
    });
    setTimeout(() => setCopiedUsage(false), 2000);
  };

  return (
    <aside className="flex flex-col space-y-20 text-neutral-900 dark:text-white">
      <div id="overview" className="flex scroll-mt-6 flex-col gap-8">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <h2 className="text-3xl font-semibold tracking-tight text-neutral-900 sm:text-4xl dark:text-white">
            {component.name}
          </h2>

          <div className="flex items-center gap-2">
            <ComponentActions component={component} />

            <Link
              href={prevComponent ? `/components/${prevComponent.slug}` : "#"}
              className={`flex h-8 w-8 items-center justify-center rounded-lg bg-neutral-100 text-neutral-700 transition-colors dark:bg-[#222] dark:text-neutral-200 ${!prevComponent ? "pointer-events-none cursor-not-allowed opacity-50" : "hover:bg-neutral-200 dark:hover:bg-[#2a2a2a]"}`}
            >
              <svg
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="19" y1="12" x2="5" y2="12"></line>
                <polyline points="12 19 5 12 12 5"></polyline>
              </svg>
            </Link>

            <Link
              href={nextComponent ? `/components/${nextComponent.slug}` : "#"}
              className={`flex h-8 w-8 items-center justify-center rounded-lg bg-neutral-100 text-neutral-700 transition-colors dark:bg-[#222] dark:text-neutral-200 ${!nextComponent ? "pointer-events-none cursor-not-allowed opacity-50" : "hover:bg-neutral-200 dark:hover:bg-[#2a2a2a]"}`}
            >
              <svg
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </Link>
          </div>
        </div>
        <p className="text-[17px] leading-relaxed text-neutral-600 dark:text-neutral-400">
          {component.description}
        </p>
      </div>

      {component.dependencies.length > 0 && (
        <div id="dependencies" className="flex scroll-mt-6 flex-col gap-2">
          <p className="text-xl font-semibold tracking-[-0.015em] text-neutral-900 dark:text-white">
            Dependencies
          </p>
          <div className="flex flex-wrap gap-2.5">
            {component.dependencies.map((dep) => {
              const url =
                dependencyUrls[dep.toLowerCase()] ||
                `https://www.npmjs.com/package/${dep}`;
              return (
                <a
                  key={dep}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl border border-neutral-200 bg-neutral-100 px-3 py-1.5 font-mono text-[13px] font-medium text-neutral-800 transition-all duration-200 hover:bg-neutral-200/50 hover:text-neutral-950 dark:border-neutral-800 dark:bg-neutral-900/40 dark:text-neutral-200 dark:hover:bg-neutral-800/50 dark:hover:text-white"
                >
                  {dependencyIcons[dep.toLowerCase()]}
                  {dep}
                </a>
              );
            })}
          </div>
          {component.dependencyNotes && (
            <p className="mt-3 text-[15px] leading-relaxed text-neutral-600 dark:text-neutral-400">
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

      <div id="interaction" className="flex scroll-mt-6 flex-col gap-2">
        <p className="text-xl font-semibold tracking-[-0.015em] text-neutral-900 dark:text-white">
          Interaction
        </p>
        <p className="text-[16px] leading-[1.7] text-neutral-600 dark:text-neutral-300">
          {component.interactionType}
        </p>
      </div>

      <div id="installation" className="flex scroll-mt-6 flex-col gap-2">
        <p className="text-xl font-semibold tracking-[-0.015em] text-neutral-900 dark:text-white">
          Installation
        </p>
        <div className="overflow-hidden rounded-xl bg-neutral-100 dark:bg-neutral-900">
          <div className="flex h-11 items-center justify-between border-b border-neutral-200/60 bg-neutral-200/30 px-4 select-none dark:border-neutral-800/60 dark:bg-neutral-900/40">
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
                    onClick={() => handleSelectPkgManager(pm)}
                    className={`flex cursor-pointer items-center gap-1.5 px-2.5 py-1 text-xs font-semibold transition-colors ${
                      pkgManager === pm
                        ? "rounded-md border border-neutral-200 bg-white text-neutral-900 shadow-sm dark:border-neutral-800/60 dark:bg-neutral-900 dark:text-white"
                        : "text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white"
                    }`}
                  >
                    <PkgManagerIcon pm={pm} className="h-3 w-3 shrink-0" />
                    <span>{pm}</span>
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
          <div className="px-5 py-4 font-mono text-[13px] leading-6 text-neutral-800 select-all dark:text-neutral-200">
            <code>{installCommand}</code>
          </div>
        </div>
      </div>

      {component.usageCode && (
        <div id="how-to-use" className="flex scroll-mt-6 flex-col gap-2">
          <div className="flex items-center justify-between">
            <p className="text-xl font-semibold tracking-[-0.015em] text-neutral-900 dark:text-white">
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
            className="relative !m-0 scrollbar-none overflow-auto rounded-xl bg-neutral-100 p-5 text-left !font-mono font-mono text-[13px] leading-6 select-text selection:bg-[#f6821f]/30 dark:bg-[#141414]"
          />
        </div>
      )}

      <div id="source-code" className="flex scroll-mt-6 flex-col gap-2">
        <p className="text-xl font-semibold tracking-[-0.015em] text-neutral-900 dark:text-white">
          Source Code
        </p>
        <p className="flex flex-wrap items-center gap-x-2 gap-y-1.5 text-[16px] leading-[1.7] text-neutral-600 dark:text-neutral-300">
          <span>Click on the top right</span>
          <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg border border-neutral-200 bg-neutral-100 text-neutral-700 shadow-xs dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-300">
            <CodeIcon className="h-3.5 w-3.5" />
          </span>
          <span>button to view the source code.</span>
        </p>
      </div>

      {hasCustomizableProps && (
        <div id="customization" className="flex scroll-mt-6 flex-col gap-2">
          <p className="text-xl font-semibold tracking-[-0.015em] text-neutral-900 dark:text-white">
            Customization
          </p>
          <p className="flex flex-wrap items-center gap-x-2 gap-y-1.5 text-[16px] leading-[1.7] text-neutral-600 dark:text-neutral-300">
            <span>Click on the top right</span>
            <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg border border-neutral-200 bg-neutral-100 text-neutral-700 shadow-xs dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-300">
              <svg
                className="h-3.5 w-3.5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                />
              </svg>
            </span>
            <span>button to view the customization panel.</span>
          </p>
        </div>
      )}

      {component.props.length > 0 && (
        <div id="props-details" className="flex scroll-mt-6 flex-col gap-8">
          <div className="flex flex-col gap-2">
            <p className="text-xl font-semibold tracking-[-0.015em] text-neutral-900 dark:text-white">
              Props Details
            </p>
            <p className="text-[15px] leading-relaxed text-neutral-500 dark:text-neutral-400">
              Configurable properties for {component.name}.
            </p>
          </div>

          <div className="flex flex-col gap-6">
            {component.props.map((prop) => (
              <div key={prop.name} className="flex flex-col gap-2">
                <div className="flex flex-wrap items-center justify-between gap-x-3.5 gap-y-1.5">
                  <div className="flex flex-wrap items-center gap-x-3.5 gap-y-1.5">
                    <code className="rounded-md bg-neutral-100 px-2 py-0.5 font-mono text-[13px] font-semibold text-neutral-900 dark:bg-neutral-800 dark:text-neutral-100">
                      {prop.name}
                    </code>
                    <span className="font-mono text-[13px] font-medium text-[#f6821f] dark:text-[#ff9d42]">
                      {prop.type.join(" | ")}
                    </span>
                  </div>
                  {prop.default ? (
                    <span className="font-mono text-xs text-neutral-500 dark:text-neutral-400">
                      default:{" "}
                      <code className="rounded-md bg-neutral-100 px-1.5 py-0.5 text-xs font-medium text-neutral-600 dark:bg-neutral-800 dark:text-neutral-300">
                        {prop.default}
                      </code>
                    </span>
                  ) : (
                    <span className="font-mono text-xs text-neutral-400 dark:text-neutral-600">
                      no default
                    </span>
                  )}
                </div>
                <div className="text-[15px] leading-relaxed text-neutral-600 dark:text-neutral-400">
                  {prop.description}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div id="keep-in-mind" className="flex scroll-mt-6 flex-col gap-2">
        <p className="text-xl font-semibold tracking-[-0.015em] text-neutral-900 dark:text-white">
          Keep in mind
        </p>
        <p className="text-[16px] leading-[1.7] text-neutral-600 dark:text-neutral-300">
          Some of the components here are inspired by or recreated from
          incredible designs across the web. I don&apos;t claim to be the
          original creator these are my attempts to reverse-engineer, replicate,
          and add my own features to them. I&apos;ve done my best to credit the
          original authors, but if I&apos;ve missed anyone, please let me know.
        </p>
      </div>

      {component.inspiration && (
        <div id="inspiration" className="flex scroll-mt-6 flex-col gap-2">
          <p className="text-xl font-semibold tracking-[-0.015em] text-neutral-900 dark:text-white">
            Inspiration / Source
          </p>
          <p className="text-[16px] leading-[1.7] text-neutral-600 dark:text-neutral-300">
            {component.inspiration.startsWith("http") ? (
              <a
                href={component.inspiration}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold break-all text-neutral-600 underline underline-offset-4 transition-colors hover:text-neutral-950 dark:text-neutral-400 dark:hover:text-white"
              >
                {component.inspiration}
              </a>
            ) : (
              component.inspiration
                .split(/(https?:\/\/[^\s\)]+)/g)
                .map((part, idx) => {
                  if (/(https?:\/\/[^\s\)]+)/.test(part)) {
                    return (
                      <a
                        key={idx}
                        href={part}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-semibold break-all text-neutral-600 underline underline-offset-4 transition-colors hover:text-neutral-950 dark:text-neutral-400 dark:hover:text-white"
                      >
                        {part}
                      </a>
                    );
                  }
                  return part;
                })
            )}
          </p>
        </div>
      )}

      <div id="license" className="flex scroll-mt-6 flex-col gap-2">
        <p className="text-xl font-semibold tracking-[-0.015em] text-neutral-900 dark:text-white">
          License & Usage
        </p>
        <div className="flex flex-col gap-2 text-[16px] leading-[1.7] text-neutral-600 dark:text-neutral-300">
          <p className="flex items-start gap-3">
            <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-neutral-400 dark:bg-neutral-600" />
            <span>
              Free to use and modify in both personal and commercial projects.
            </span>
          </p>
          <p className="flex items-start gap-3">
            <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-neutral-400 dark:bg-neutral-600" />
            <span>
              Attribution to Great UI is highly appreciated when using a
              component.
            </span>
          </p>
          <p className="flex items-start gap-3">
            <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-neutral-400 dark:bg-neutral-600" />
            <span>
              Please don&apos;t resell the components as your own kit.
            </span>
          </p>
        </div>
      </div>
    </aside>
  );
}
