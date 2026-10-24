"use client";

import { useMemo, useState, useEffect } from "react";
import Link from "next/link";
import type { Component } from "@/lib/registry";
import { getComponentPropsSchema } from "@/lib/propsRegistry";
import { useViewer } from "@/lib/viewer-context";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";

type TOCItem = {
  title: string;
  id: string;
};

function ScopeTrace() {
  const wave = Array.from({ length: 33 }, (_, i) => {
    const x = i * 0.75;
    const y = 5 - Math.sin((i / 16) * Math.PI * 2) * 3.2;
    return `${i ? "L" : "M"}${x.toFixed(2)} ${y.toFixed(2)}`;
  }).join("");
  return (
    <svg
      aria-hidden
      width={14}
      height={10}
      viewBox="0 0 12 10"
      className="shrink-0 overflow-hidden"
    >
      <g className="motion-safe:animate-toc-scope [animation-play-state:paused] group-hover/toc:[animation-play-state:running]">
        <path
          d={wave}
          pathLength={1}
          fill="none"
          stroke="currentColor"
          strokeWidth={1.2}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray={1}
          className="motion-safe:animate-toc-rail"
        />
      </g>
    </svg>
  );
}

export function DocsToc({
  component,
  className,
}: {
  component: Component;
  className?: string;
}) {
  const { setIsPanelOpen, setIsCodeOpen, setIsMarkdownOpen } = useViewer();
  const [active, setActive] = useState(0);

  const propsSchema = getComponentPropsSchema(component.slug);
  const hasCustomizableProps = propsSchema
    ? propsSchema.schemas.length > 0
    : false;

  const items: TOCItem[] = useMemo(() => {
    const list: TOCItem[] = [{ title: "Overview", id: "overview" }];
    if (component.dependencies && component.dependencies.length > 0) {
      list.push({ title: "Dependencies", id: "dependencies" });
    }
    if (component.interactionType) {
      list.push({ title: "Interaction", id: "interaction" });
    }
    list.push({ title: "Installation", id: "installation" });
    if (component.usageCode) {
      list.push({ title: "How to use", id: "how-to-use" });
    }
    list.push({ title: "Source Code", id: "source-code" });
    if (hasCustomizableProps) {
      list.push({ title: "Customization", id: "customization" });
    }
    if (component.props && component.props.length > 0) {
      list.push({ title: "Props Details", id: "props-details" });
    }
    list.push({ title: "Keep in mind", id: "keep-in-mind" });
    if (component.inspiration) {
      list.push({ title: "Inspiration", id: "inspiration" });
    }
    list.push({ title: "License & Usage", id: "license" });
    return list;
  }, [component, hasCustomizableProps]);

  useEffect(() => {
    const scrollContainer = document.getElementById("docs-drawer-scroll");
    if (!scrollContainer) return;

    const handleScroll = () => {
      const containerRect = scrollContainer.getBoundingClientRect();
      const isAtBottom =
        scrollContainer.scrollTop + scrollContainer.clientHeight >=
        scrollContainer.scrollHeight - 25;

      if (isAtBottom) {
        setActive(items.length - 1);
        return;
      }

      let matchedIndex = 0;
      for (let i = 0; i < items.length; i++) {
        const el = document.getElementById(items[i].id);
        if (el) {
          const elRect = el.getBoundingClientRect();
          if (elRect.top - containerRect.top <= 90) {
            matchedIndex = i;
          }
        }
      }
      setActive(matchedIndex);
    };

    handleScroll();
    scrollContainer.addEventListener("scroll", handleScroll, { passive: true });
    return () => scrollContainer.removeEventListener("scroll", handleScroll);
  }, [items]);

  const handleClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    id: string,
    index: number,
  ) => {
    e.preventDefault();
    setActive(index);

    const scrollContainer = document.getElementById("docs-drawer-scroll");
    const element = document.getElementById(id);
    if (scrollContainer && element) {
      const containerRect = scrollContainer.getBoundingClientRect();
      const elementRect = element.getBoundingClientRect();
      const targetTop =
        scrollContainer.scrollTop + (elementRect.top - containerRect.top) - 16;
      scrollContainer.scrollTo({
        top: Math.max(0, targetTop),
        behavior: "smooth",
      });
    }
  };

  return (
    <aside className={cn("flex w-60 flex-col gap-6 select-none", className)}>
      <nav aria-label="On this page" className="group/toc">
        <p className="mb-3 flex items-center gap-2 text-[13px] text-neutral-500 dark:text-neutral-400">
          <ScopeTrace />
          On this page
        </p>

        <div className="relative border-l border-neutral-200 dark:border-neutral-800">
          <ul className="flex flex-col">
            {items.map((item, i) => {
              const isSelected = active === i;
              return (
                <li key={item.id} className="relative">
                  {isSelected && (
                    <motion.div
                      layoutId="active-toc-line"
                      className="absolute top-1 bottom-1 -left-[1.5px] w-[2px] rounded-full bg-[#f6821f]"
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 32,
                      }}
                    />
                  )}
                  <a
                    href={`#${item.id}`}
                    onClick={(e) => handleClick(e, item.id, i)}
                    className={cn(
                      "block cursor-pointer py-1.5 pr-2 pl-3.5 text-[13px] transition-colors duration-150",
                      isSelected
                        ? "font-medium text-neutral-900 dark:text-white"
                        : "text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white",
                    )}
                  >
                    {item.title}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </nav>

      <Link
        href="/sponsor"
        onClick={() => {
          setIsPanelOpen(false);
          setIsCodeOpen(false);
          setIsMarkdownOpen(false);
        }}
        className="group flex cursor-pointer items-start gap-2.5 rounded-xl border border-neutral-200/80 bg-neutral-50/60 p-3 transition-all hover:border-neutral-300 hover:bg-neutral-100/70 hover:shadow-xs dark:border-neutral-800 dark:bg-neutral-900/40 dark:hover:border-neutral-700 dark:hover:bg-neutral-900/70"
      >
        <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-neutral-200/50 text-neutral-500 transition-colors group-hover:bg-red-500/10 group-hover:text-red-500 dark:bg-neutral-800/60 dark:text-neutral-400 dark:group-hover:bg-red-500/15 dark:group-hover:text-red-400">
          <svg className="h-3.5 w-3.5 fill-current" viewBox="0 0 24 24">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </div>
        <div className="flex min-w-0 flex-1 flex-col gap-0.5">
          <span className="text-[13px] font-semibold text-neutral-900 transition-colors group-hover:text-neutral-950 dark:text-neutral-100 dark:group-hover:text-white">
            Sponsor Great UI
          </span>
          <span className="text-[11.5px] leading-snug text-neutral-500 dark:text-neutral-400">
            Your logo and link on great-ui.com/sponsors
          </span>
        </div>
        <svg
          className="mt-0.5 h-3.5 w-3.5 shrink-0 text-neutral-400 opacity-60 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100 dark:text-neutral-500"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M7 17L17 7M17 7H7M17 7V17" />
        </svg>
      </Link>
    </aside>
  );
}
