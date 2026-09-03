"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { changelogData, type ChangelogItem } from "@/lib/changelog";
import { components } from "@/lib/registry";
import { ViewerProvider } from "@/lib/viewer-context";
import ComponentPreviewRenderer from "./ComponentPreviewRenderer";

function ChangelogPreviewCard({
  component,
}: {
  component: (typeof components)[0];
}) {
  const [isHovered, setIsHovered] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      if (isHovered) {
        videoRef.current.play().catch(() => {});
      } else {
        videoRef.current.pause();
      }
    }
  }, [isHovered]);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative flex aspect-video w-full items-center justify-center overflow-hidden rounded-none"
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
      <div className="relative z-10 flex h-full w-full items-center justify-center overflow-hidden bg-neutral-50 dark:bg-neutral-950/80">
        {component.preview ? (
          component.preview.endsWith(".mp4") ? (
            <video
              ref={videoRef}
              src={component.preview}
              loop
              muted
              playsInline
              className="h-full w-full object-contain transition-transform duration-700 ease-out group-hover:scale-105"
            />
          ) : (
            <img
              src={component.preview}
              alt={component.name}
              className="h-full w-full object-contain transition-transform duration-700 ease-out group-hover:scale-105"
            />
          )
        ) : (
          <div className="pointer-events-none relative z-10 flex h-full w-full scale-90 items-center justify-center transition-transform duration-700 ease-out group-hover:scale-100">
            <ViewerProvider>
              <ComponentPreviewRenderer slug={component.slug} />
            </ViewerProvider>
          </div>
        )}
      </div>
    </div>
  );
}

function extractSlugsFromLog(log: ChangelogItem): string[] {
  const slugs: string[] = [];
  log.features.forEach((feature) => {
    const regex = /\[.*?\]\(\/components\/(.*?)\)/g;
    let match;
    while ((match = regex.exec(feature)) !== null) {
      if (match[1]) slugs.push(match[1]);
    }
  });
  return slugs;
}

function parseMarkdownLinks(text: string) {
  const parts = text.split(/(\[.*?\]\(.*?\))/g);
  return parts.map((part, i) => {
    const match = part.match(/\[(.*?)\]\((.*?)\)/);
    if (match) {
      return (
        <Link
          key={i}
          href={match[2]}
          className="font-medium text-[#f6821f] underline decoration-[#f6821f]/30 underline-offset-4 transition-colors hover:decoration-[#f6821f]"
        >
          {match[1]}
        </Link>
      );
    }
    return <React.Fragment key={i}>{part}</React.Fragment>;
  });
}

export default function ChangelogTimeline() {
  return (
    <div className="relative ml-3 md:ml-0">
      {changelogData.map((log, index) => (
        <div
          key={index}
          className="group relative flex flex-col pb-16 last:pb-0 md:flex-row"
        >
          <div className="hidden shrink-0 pr-8 text-left md:block md:w-[180px]">
            <h2 className="text-lg font-bold tracking-tight text-neutral-900 dark:text-white">
              {log.date}
            </h2>
          </div>

          {index !== changelogData.length - 1 && (
            <div className="absolute top-1.5 bottom-[-8px] left-0 w-px -translate-x-1/2 bg-neutral-200 md:left-[180px] dark:bg-neutral-800" />
          )}

          {index === 0 ? (
            <span className="absolute top-1.5 left-0 flex h-4 w-4 -translate-x-1/2 items-center justify-center overflow-hidden rounded-full bg-white ring-4 ring-white md:left-[180px] dark:bg-[#0a0a0a] dark:ring-[#0a0a0a]">
              <img
                src="/Great-UI.png"
                alt="Great UI Release"
                className="h-full w-full scale-[1.5] object-cover"
              />
            </span>
          ) : (
            <span className="absolute top-1.5 left-0 flex h-4 w-4 -translate-x-1/2 items-center justify-center rounded-full bg-white ring-4 ring-white md:left-[180px] dark:bg-[#0a0a0a] dark:ring-[#0a0a0a]">
              <div className="h-2 w-2 rounded-full bg-neutral-400 dark:bg-neutral-600" />
            </span>
          )}

          <div className="flex flex-1 flex-col gap-4 pt-0 md:pl-12">
            <div className="w-full md:hidden">
              <h2 className="text-2xl font-bold tracking-tight text-neutral-900 sm:text-3xl dark:text-white">
                {log.date}
              </h2>
            </div>

            <div className="mt-0 flex flex-1 flex-col pl-4 md:pl-0">
              <ul className="flex flex-col gap-3">
                {log.features.map((feature, fIndex) => (
                  <li key={fIndex} className="flex items-start gap-3">
                    <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-neutral-400 dark:bg-neutral-500" />
                    <span className="text-base leading-relaxed text-neutral-700 dark:text-neutral-300">
                      {parseMarkdownLinks(feature)}
                    </span>
                  </li>
                ))}
              </ul>

              {(() => {
                const slugs = extractSlugsFromLog(log);
                const logComponents = components.filter((c) =>
                  slugs.includes(c.slug),
                );
                if (logComponents.length === 0) return null;

                const count = logComponents.length;

                let gridColsClass = "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3";
                let maxWClass = "max-w-full";

                if (count === 1) {
                  gridColsClass = "grid-cols-1";
                  maxWClass = "sm:max-w-[340px]";
                } else if (count === 2) {
                  gridColsClass = "grid-cols-1 sm:grid-cols-2";
                  maxWClass = "lg:max-w-[680px]";
                }

                return (
                  <div
                    className={`mt-4 grid w-full gap-0 overflow-hidden rounded-2xl ${gridColsClass} ${maxWClass}`}
                  >
                    {logComponents.map((c) => (
                      <Link
                        href={`/components/${c.slug}`}
                        key={c.slug}
                        aria-label={`View ${c.name} component`}
                        className="group relative block cursor-pointer no-underline"
                      >
                        <ChangelogPreviewCard component={c} />
                      </Link>
                    ))}
                  </div>
                );
              })()}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
