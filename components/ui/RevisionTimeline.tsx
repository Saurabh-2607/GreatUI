"use client";

import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";

const ArrowLeft = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="m12 19-7-7 7-7" />
    <path d="M19 12H5" />
  </svg>
);

const ArrowRight = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M5 12h14" />
    <path d="m12 5 7 7-7 7" />
  </svg>
);

const CheckCircle2 = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
    <path d="m9 12 2 2 4-4" />
  </svg>
);

const getDateKey = (dateString: string) => {
  const date = new Date(dateString);
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
};

const getSortedUniqueRevisions = (revisions: TimelineRevision[]) => {
  const uniqueByDate = new Map<string, TimelineRevision>();

  const sorted = [...revisions].sort((a, b) => {
    const aTime = new Date(a.date).getTime();
    const bTime = new Date(b.date).getTime();

    if (aTime !== bTime) return aTime - bTime;
    return a.time.localeCompare(b.time);
  });

  for (const revision of sorted) {
    const key = getDateKey(revision.date);
    const existing = uniqueByDate.get(key);

    if (!existing || revision.time >= existing.time) {
      uniqueByDate.set(key, revision);
    }
  }

  return Array.from(uniqueByDate.values());
};

export type RevisionKind = "major" | "minor";

export type TimelineRevision = {
  id: string;
  date: string;
  time: string;
  title: string;
  author: string;
  kind: RevisionKind;
  content: string;
};

type PaddedRevision = {
  id: string;
  date: string;
  time: string;
  kind: RevisionKind;
  status: "active" | "past-empty" | "future-empty";
  content: string;
};

type DashPreset = {
  base: number;
  bump: number;
  thickness: number;
  className: string;
};

type DashProps = {
  active: boolean;
  index: number;
  activeIndex: number;
  onSelect: (id: string) => void;
  registerDash: (id: string, node: HTMLButtonElement | null) => void;
  revision: PaddedRevision;
  onHover: (index: number | null, date: string | null) => void;
};

const MAX_DASH_HEIGHT = 64;

const DASH_PRESETS: Record<RevisionKind, DashPreset> = {
  major: {
    base: 24,
    bump: 40,
    thickness: 4,
    className: "bg-neutral-300 dark:bg-neutral-700",
  },
  minor: {
    base: 24,
    bump: 40,
    thickness: 4,
    className: "bg-neutral-300 dark:bg-neutral-700",
  },
};

const Dash = ({
  active,
  index,
  activeIndex,
  onSelect,
  registerDash,
  revision,
  onHover,
}: DashProps) => {
  const ref = useRef<HTMLButtonElement>(null);
  const preset = DASH_PRESETS[revision.kind];

  useEffect(() => {
    if (revision.status === "active") {
      registerDash(revision.id, ref.current);
      return () => registerDash(revision.id, null);
    }
  }, [registerDash, revision.id, revision.status]);

  const indexDistance = Math.abs(index - activeIndex);
  const sigma = 4.5;
  const baseScale = preset.base / MAX_DASH_HEIGHT;
  const bumpScale = preset.bump / MAX_DASH_HEIGHT;
  const selectionFactor = Math.exp(
    -(indexDistance * indexDistance) / (2 * sigma * sigma),
  );
  const scaleYTarget = baseScale + bumpScale * selectionFactor;
  const targetHeight = MAX_DASH_HEIGHT * scaleYTarget;
  const isDisabled = revision.status !== "active";

  return (
    <div className="relative flex h-20 w-[10px] shrink-0 flex-col items-center justify-end">
      <button
        ref={ref}
        type="button"
        disabled={isDisabled}
        aria-current={active ? "location" : undefined}
        aria-label={`Go to log for ${revision.date}`}
        title={revision.date}
        className={cn(
          "group flex h-20 w-[10px] shrink-0 items-end justify-center border-0 bg-transparent p-0 outline-none",
          isDisabled ? "pointer-events-none cursor-default" : "cursor-pointer",
        )}
        onClick={() => !isDisabled && onSelect(revision.id)}
        onPointerEnter={() => !isDisabled && onHover(index, revision.date)}
        onPointerLeave={() => !isDisabled && onHover(null, null)}
      >
        {revision.status === "future-empty" ? (
          <motion.span
            className="block border-l-[4px] border-dotted border-neutral-300/40 bg-transparent transition-colors duration-150 ease-out dark:border-neutral-700/30"
            animate={{ height: targetHeight }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            style={{
              width: 0,
            }}
          />
        ) : (
          <motion.span
            className={cn(
              "group-focus-visible:ring-ring block rounded-t-full transition-colors duration-150 ease-out group-focus-visible:ring-2 group-focus-visible:ring-offset-2",
              active
                ? "bg-red-500 font-bold dark:bg-red-400"
                : revision.status === "past-empty"
                  ? "bg-neutral-300/40 dark:bg-neutral-700/30"
                  : "group-hover:bg-neutral-500 dark:group-hover:bg-neutral-400",
              !active && revision.status !== "past-empty" && preset.className,
            )}
            animate={{ height: targetHeight }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            style={{
              width: preset.thickness,
            }}
          />
        )}
      </button>
    </div>
  );
};

const parseInlineMarkdown = (text: string): React.ReactNode => {
  const imageRegex = /!\[([^\]]*)\]\(([^)]+)\)/;
  const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/;
  const boldRegex = /\*\*([^*]+)\*\*/;
  const codeRegex = /`([^`]+)`/;

  const parts: React.ReactNode[] = [];
  let currentText = text;
  let keyIdx = 0;

  while (currentText) {
    const imageMatch = imageRegex.exec(currentText);
    const linkMatch = linkRegex.exec(currentText);
    const boldMatch = boldRegex.exec(currentText);
    const codeMatch = codeRegex.exec(currentText);

    let firstMatch: {
      index: number;
      length: number;
      type: "image" | "link" | "bold" | "code";
      match: RegExpExecArray;
    } | null = null;

    if (imageMatch) {
      firstMatch = {
        index: imageMatch.index,
        length: imageMatch[0].length,
        type: "image",
        match: imageMatch,
      };
    }
    if (linkMatch && (!firstMatch || linkMatch.index < firstMatch.index)) {
      firstMatch = {
        index: linkMatch.index,
        length: linkMatch[0].length,
        type: "link",
        match: linkMatch,
      };
    }
    if (boldMatch && (!firstMatch || boldMatch.index < firstMatch.index)) {
      firstMatch = {
        index: boldMatch.index,
        length: boldMatch[0].length,
        type: "bold",
        match: boldMatch,
      };
    }
    if (codeMatch && (!firstMatch || codeMatch.index < firstMatch.index)) {
      firstMatch = {
        index: codeMatch.index,
        length: codeMatch[0].length,
        type: "code",
        match: codeMatch,
      };
    }

    if (!firstMatch) {
      parts.push(<span key={`text-${keyIdx++}`}>{currentText}</span>);
      break;
    }

    if (firstMatch.index > 0) {
      parts.push(
        <span key={`text-${keyIdx++}`}>
          {currentText.slice(0, firstMatch.index)}
        </span>,
      );
    }

    if (firstMatch.type === "image") {
      const [, alt, src] = firstMatch.match;
      parts.push(
        <img
          key={`image-${keyIdx++}`}
          src={src}
          alt={alt}
          className="mx-auto my-2 w-full max-w-[100%] rounded-2xl border border-neutral-200 bg-neutral-100 object-cover shadow-sm dark:border-neutral-800 dark:bg-neutral-950"
          loading="lazy"
        />,
      );
    } else if (firstMatch.type === "link") {
      const [, label, url] = firstMatch.match;
      parts.push(
        <a
          key={`link-${keyIdx++}`}
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline font-medium text-red-500 hover:text-red-600 hover:underline dark:text-red-400 dark:hover:text-red-300"
        >
          {label}
        </a>,
      );
    } else if (firstMatch.type === "bold") {
      const [, content] = firstMatch.match;
      parts.push(
        <strong
          key={`bold-${keyIdx++}`}
          className="font-semibold text-neutral-900 dark:text-neutral-100"
        >
          {content}
        </strong>,
      );
    } else if (firstMatch.type === "code") {
      const [, code] = firstMatch.match;
      parts.push(
        <code
          key={`code-${keyIdx++}`}
          className="rounded border border-neutral-200 bg-neutral-100 px-1.5 py-0.5 font-mono text-xs text-red-500 dark:border-neutral-800 dark:bg-neutral-800 dark:text-red-400"
        >
          {code}
        </code>,
      );
    }

    currentText = currentText.slice(firstMatch.index + firstMatch.length);
  }

  return <>{parts}</>;
};

const renderMDXContent = (mdxText: string): React.ReactNode => {
  if (!mdxText) return null;

  const lines = mdxText.split("\n");
  const elements: React.ReactNode[] = [];

  lines.forEach((line, idx) => {
    const trimmed = line.trim();
    if (!trimmed) {
      elements.push(<div key={`empty-${idx}`} className="h-2" />);
      return;
    }

    if (trimmed.startsWith("### ")) {
      elements.push(
        <span
          key={`h3-${idx}`}
          className="mt-2.5 mb-1 block text-left font-sans text-sm font-bold tracking-wide text-neutral-900 select-none dark:text-neutral-100"
        >
          {parseInlineMarkdown(trimmed.slice(4))}
        </span>,
      );
      return;
    }

    if (trimmed.startsWith("#### ")) {
      elements.push(
        <span
          key={`h4-${idx}`}
          className="mt-2 mb-0.5 block text-left font-mono text-xs font-bold tracking-wider text-neutral-500 uppercase select-none dark:text-neutral-400"
        >
          {parseInlineMarkdown(trimmed.slice(5))}
        </span>,
      );
      return;
    }

    if (trimmed.startsWith("> ")) {
      elements.push(
        <blockquote
          key={`quote-${idx}`}
          className="my-2 rounded-r-2xl border-l-2 border-neutral-300 bg-neutral-50 px-4 py-3 text-neutral-700 italic dark:border-neutral-700 dark:bg-neutral-950/40 dark:text-neutral-300"
        >
          {parseInlineMarkdown(trimmed.slice(2))}
        </blockquote>,
      );
      return;
    }

    const imageMatch = trimmed.match(/^!\[([^\]]*)\]\(([^)]+)\)$/);
    if (imageMatch) {
      const [, alt, src] = imageMatch;
      elements.push(
        <img
          key={`image-${idx}`}
          src={src}
          alt={alt}
          className="mx-auto w-full max-w-[100%] rounded-2xl border border-neutral-200 bg-neutral-100 object-cover shadow-sm dark:border-neutral-800 dark:bg-neutral-950"
          loading="lazy"
        />,
      );
      return;
    }

    if (trimmed.startsWith("- ")) {
      elements.push(
        <div
          key={`bullet-${idx}`}
          className="flex items-start gap-2.5 pl-0.5 text-left text-sm leading-relaxed text-neutral-700 dark:text-neutral-300"
        >
          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500 dark:text-emerald-400" />
          <span>{parseInlineMarkdown(trimmed.slice(2))}</span>
        </div>,
      );
      return;
    }

    if (trimmed.startsWith("* ")) {
      elements.push(
        <div
          key={`bullet-${idx}`}
          className="flex items-start gap-2.5 pl-0.5 text-left text-sm leading-relaxed text-neutral-700 dark:text-neutral-300"
        >
          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500 dark:text-emerald-400" />
          <span>{parseInlineMarkdown(trimmed.slice(2))}</span>
        </div>,
      );
      return;
    }

    elements.push(
      <span
        key={`p-${idx}`}
        className="block text-left text-sm leading-relaxed text-neutral-600 dark:text-neutral-400"
      >
        {parseInlineMarkdown(trimmed)}
      </span>,
    );
  });

  return <div className="flex flex-col gap-0.5">{elements}</div>;
};

interface RevisionTimelineProps {
  revisions: TimelineRevision[];
  defaultActiveId?: string;
  className?: string;
  showNavigation?: boolean;
  showDateLabel?: boolean;
  pastPaddingDays?: number;
  futurePaddingDays?: number;
  height?: string | number;
  onActiveIdChange?: (activeId: string) => void;
}

export default function RevisionTimeline({
  revisions,
  defaultActiveId,
  className,
  showNavigation = true,
  showDateLabel = true,
  pastPaddingDays = 31,
  futurePaddingDays = 30,
  height = "420px",
  onActiveIdChange,
}: RevisionTimelineProps) {
  const orderedRevisions = useMemo(
    () => getSortedUniqueRevisions(revisions),
    [revisions],
  );

  const isControlled = defaultActiveId !== undefined;
  const [activeIdState, setActiveIdState] = useState<string>(() => {
    return orderedRevisions[orderedRevisions.length - 1]?.id || "";
  });

  const activeId = isControlled ? defaultActiveId! : activeIdState;
  const activeIdOrFallback = useMemo(() => {
    if (orderedRevisions.some((rev) => rev.id === activeId)) {
      return activeId;
    }
    return orderedRevisions[orderedRevisions.length - 1]?.id || "";
  }, [activeId, orderedRevisions]);

  const [, setHoveredDate] = useState<string | null>(null);
  const [isOverflowing, setIsOverflowing] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(0);

  const checkOverflow = useCallback(() => {
    if (contentRef.current) {
      const { scrollHeight, clientHeight } = contentRef.current;
      setIsOverflowing(scrollHeight > clientHeight);
    }
  }, []);

  useEffect(() => {
    checkOverflow();
  }, [activeId, checkOverflow]);

  useEffect(() => {
    if (!contentRef.current) return;
    const observer = new ResizeObserver(() => {
      checkOverflow();
    });
    observer.observe(contentRef.current);
    return () => observer.disconnect();
  }, [checkOverflow]);

  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setContainerWidth(entry.contentRect.width);
      }
    });
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  const dashRefs = useRef(new Map<string, HTMLButtonElement>());
  const registerDash = useCallback(
    (id: string, node: HTMLButtonElement | null) => {
      if (node) {
        dashRefs.current.set(id, node);
        return;
      }
      dashRefs.current.delete(id);
    },
    [],
  );

  const activeIndexInRevisions = useMemo(() => {
    return orderedRevisions.findIndex((r) => r.id === activeIdOrFallback);
  }, [activeIdOrFallback, orderedRevisions]);

  const activeRevision = useMemo(() => {
    return (
      orderedRevisions[activeIndexInRevisions] ||
      orderedRevisions[orderedRevisions.length - 1]
    );
  }, [activeIndexInRevisions, orderedRevisions]);

  const handleActiveIdChange = useCallback(
    (id: string) => {
      if (!isControlled) {
        setActiveIdState(id);
      }
      onActiveIdChange?.(id);
    },
    [isControlled, onActiveIdChange],
  );

  const handlePrev = useCallback(() => {
    if (activeIndexInRevisions > 0) {
      handleActiveIdChange(orderedRevisions[activeIndexInRevisions - 1].id);
    }
  }, [activeIndexInRevisions, orderedRevisions, handleActiveIdChange]);

  const handleNext = useCallback(() => {
    if (activeIndexInRevisions < orderedRevisions.length - 1) {
      handleActiveIdChange(orderedRevisions[activeIndexInRevisions + 1].id);
    }
  }, [activeIndexInRevisions, orderedRevisions, handleActiveIdChange]);

  const paddedRevisions = useMemo(() => {
    const list: PaddedRevision[] = [];

    for (let i = 1; i <= pastPaddingDays; i++) {
      list.push({
        id: `past-${i}`,
        date: `May ${i}, 2026`,
        time: "--:--",
        kind: "minor",
        status: "past-empty",
        content: "",
      });
    }

    if (orderedRevisions.length > 0) {
      const activeRevisionsMap = new Map<string, TimelineRevision>();
      let minTime = Infinity;
      let maxTime = -Infinity;

      orderedRevisions.forEach((rev) => {
        const d = new Date(rev.date);
        if (!isNaN(d.getTime())) {
          const key = getDateKey(rev.date);
          activeRevisionsMap.set(key, rev);
          if (d.getTime() < minTime) minTime = d.getTime();
          if (d.getTime() > maxTime) maxTime = d.getTime();
        }
      });

      const currentDate = new Date(minTime);
      currentDate.setHours(0, 0, 0, 0);
      const end = new Date(maxTime);
      end.setHours(0, 0, 0, 0);

      while (currentDate <= end) {
        const key = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, "0")}-${String(currentDate.getDate()).padStart(2, "0")}`;
        const formattedDate = `${currentDate.toLocaleString("en-US", { month: "long" })} ${currentDate.getDate()}, ${currentDate.getFullYear()}`;

        const existing = activeRevisionsMap.get(key);
        if (existing) {
          list.push({
            ...existing,
            status: "active",
          });
        } else {
          list.push({
            id: `skipped-${key}`,
            date: formattedDate,
            time: "--:--",
            kind: "minor",
            status: "past-empty",
            content: "",
          });
        }

        currentDate.setDate(currentDate.getDate() + 1);
      }
    }

    for (let i = 1; i <= futurePaddingDays; i++) {
      list.push({
        id: `future-${i}`,
        date: `July ${i}, 2026`,
        time: "--:--",
        kind: "minor",
        status: "future-empty",
        content: "",
      });
    }

    return list;
  }, [orderedRevisions, pastPaddingDays, futurePaddingDays]);

  const activeIndex = useMemo(() => {
    return paddedRevisions.findIndex((r) => r.id === activeIdOrFallback);
  }, [activeIdOrFallback, paddedRevisions]);

  const itemWidth = 10;
  const gapWidth = 3;

  const translationX = useMemo(() => {
    if (activeIndex === -1 || containerWidth === 0) return 0;
    const activePos = activeIndex * (itemWidth + gapWidth) + itemWidth / 2;
    return containerWidth / 2 - activePos;
  }, [activeIndex, containerWidth]);

  const handleHoverChange = useCallback(
    (index: number | null, date: string | null) => {
      setHoveredDate(date);
    },
    [],
  );

  if (!activeRevision) return null;

  return (
    <div
      className={cn(
        "flex w-full max-w-lg flex-col overflow-hidden rounded-2xl border border-neutral-200 bg-white font-sans shadow-sm dark:border-neutral-800/85 dark:bg-neutral-900",
        className,
      )}
    >
      <style
        dangerouslySetInnerHTML={{
          __html: `
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `,
        }}
      />

      {/* Logger Content Area */}
      <div className="flex flex-col gap-3 p-7">
        {/* Compact Lists */}
        <div
          ref={contentRef}
          className="no-scrollbar flex flex-col gap-4 overflow-y-auto"
          style={{
            height: typeof height === "number" ? `${height}px` : height,
            WebkitMaskImage: isOverflowing
              ? "linear-gradient(to bottom, black 80%, transparent)"
              : "none",
            maskImage: isOverflowing
              ? "linear-gradient(to bottom, black 80%, transparent)"
              : "none",
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={activeRevision.id + "-logs"}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="flex flex-col gap-3"
            >
              {activeRevision.content && (
                <div className="flex flex-col gap-1.5 pl-0.5">
                  {renderMDXContent(activeRevision.content)}
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Bottom Toolbar: Navigation HUD + Timeline Dial */}
      <div className="flex flex-col gap-0 border-t border-neutral-100/80 bg-neutral-50/50 px-0 pt-5 pb-0 dark:border-neutral-800/50 dark:bg-neutral-900/30">
        {/* Row 1: Nav Arrows + Date centered */}
        {showNavigation && (
          <div className="flex w-full items-center justify-between px-7">
            {/* Prev Button */}
            <button
              onClick={handlePrev}
              disabled={activeIndexInRevisions === 0}
              className="shrink-0 cursor-pointer rounded-lg border border-neutral-200 p-2 text-neutral-500 transition-colors hover:bg-neutral-100 hover:text-neutral-700 disabled:opacity-30 dark:border-neutral-800 dark:text-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-neutral-200"
              title="Previous Day"
            >
              <ArrowLeft className="h-4 w-4" />
            </button>

            {/* Centered Date Display */}
            <div className="flex h-5 items-center justify-center font-mono select-none">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeRevision.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.15 }}
                  className="text-center text-xs font-bold tracking-widest text-neutral-500 uppercase dark:text-neutral-400"
                >
                  {showDateLabel ? activeRevision.date : ""}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Next Button */}
            <button
              onClick={handleNext}
              disabled={activeIndexInRevisions === orderedRevisions.length - 1}
              className="shrink-0 cursor-pointer rounded-lg border border-neutral-200 p-2 text-neutral-500 transition-colors hover:bg-neutral-100 hover:text-neutral-700 disabled:opacity-30 dark:border-neutral-800 dark:text-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-neutral-200"
              title="Next Day"
            >
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        )}
        {/* Row 2: Timeline only */}
        <div className="w-full px-0">
          <div className="flex w-full animate-none flex-col items-center">
            {/* Timeline Controls Container */}
            <div
              ref={containerRef}
              className="relative flex h-20 w-full items-end justify-start overflow-hidden pb-0 select-none"
              style={{
                WebkitMaskImage:
                  "linear-gradient(to right, transparent, black 15%, black 85%, transparent)",
                maskImage:
                  "linear-gradient(to right, transparent, black 15%, black 85%, transparent)",
              }}
            >
              {/* Sliding Inner Pill Row */}
              <motion.div
                animate={{ x: translationX }}
                transition={{ type: "spring", stiffness: 120, damping: 20 }}
                className="absolute left-0 flex items-end"
                style={{
                  gap: gapWidth,
                  width:
                    paddedRevisions.length * (itemWidth + gapWidth) - gapWidth,
                }}
              >
                {paddedRevisions.map((revision, idx) => (
                  <Dash
                    key={revision.id}
                    active={revision.id === activeIdOrFallback}
                    index={idx}
                    activeIndex={activeIndex}
                    onSelect={handleActiveIdChange}
                    registerDash={registerDash}
                    revision={revision}
                    onHover={handleHoverChange}
                  />
                ))}
              </motion.div>
            </div>
          </div>
        </div>
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
 * X: https://x.com/srbh_s
 */
