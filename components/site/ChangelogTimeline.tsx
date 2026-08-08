import React from "react";
import Link from "next/link";
import { changelogData } from "@/lib/changelog";

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
    <div className="relative ml-3 md:ml-6">
      {changelogData.map((log, index) => (
        <div
          key={index}
          className="group relative pb-16 pl-8 last:pb-0 md:pl-16"
        >
          {index !== changelogData.length - 1 && (
            <div className="absolute top-2 bottom-[-8px] left-0 w-px -translate-x-1/2 bg-neutral-200 dark:bg-neutral-800" />
          )}

          {index === 0 ? (
            <span className="absolute top-1.5 left-0 flex h-4 w-4 -translate-x-1/2 items-center justify-center overflow-hidden rounded-full bg-white ring-4 ring-white dark:bg-[#0a0a0a] dark:ring-[#0a0a0a]">
              <img
                src="/Great-UI.png"
                alt="Great UI Release"
                className="h-full w-full scale-[1.5] object-cover"
              />
            </span>
          ) : (
            <span className="absolute top-2 left-0 flex h-4 w-4 -translate-x-1/2 items-center justify-center rounded-full bg-white ring-4 ring-white dark:bg-[#0a0a0a] dark:ring-[#0a0a0a]">
              <div className="h-2 w-2 rounded-full bg-neutral-400 dark:bg-neutral-600" />
            </span>
          )}

          <div className="flex flex-col gap-4">
            <div className="w-full">
              <h2 className="text-2xl font-bold tracking-tight text-neutral-900 sm:text-3xl dark:text-white">
                {log.date}
              </h2>
            </div>

            <div className="mt-2 flex flex-1 flex-col pl-4 md:pl-8">
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
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
