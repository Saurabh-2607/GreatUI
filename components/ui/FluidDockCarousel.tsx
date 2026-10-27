"use client";

import React, { useState, useEffect, useRef, useId, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";

export interface FluidDockCarouselItem {
  id?: string | number;
  image: string;
  title?: string;
  alt?: string;
}

export interface FluidDockCarouselProps {
  /** Array of gallery items containing image URLs and titles */
  items?: FluidDockCarouselItem[];
  /** Array of image URLs for quick array-based configuration */
  images?: string[];
  /** Array of slide titles corresponding to images */
  titles?: string[];
  /** Controlled active index of the current slide */
  activeIndex?: number;
  /** Initial active index when uncontrolled */
  defaultActiveIndex?: number;
  /** Callback triggered when the active slide changes */
  onActiveChange?: (index: number) => void;
  /** Scrolling orientation of the gallery (horizontal or vertical) */
  orientation?: "horizontal" | "vertical";
  /** Position alignment of the floating dock on screen */
  dockPosition?: "top" | "bottom" | "left" | "right" | "center";
  /** Visual styling variant of the active thumbnail border indicator */
  indicatorVariant?: "contrast" | "glow" | "minimal";
  /** Whether to render the floating navigation thumbnail dock */
  showDock?: boolean;
  /** Whether to render floating next and previous navigation controls */
  showControls?: boolean;
  /** Whether to display the large bold slide titles */
  showTitles?: boolean;
  /** Whether mouse wheel scrolling advances slides */
  enableWheel?: boolean;
  /** Whether mobile swipe gestures advance slides */
  enableTouch?: boolean;
  /** Opacity of the dark gradient overlay over images (0 to 1) */
  overlayOpacity?: number;
  /** Scale multiplier applied to the active dock thumbnail image */
  activeScale?: number;
  /** Primary expanded dimension in pixels of the active dock thumbnail item */
  activeWidth?: number;
  /** Whether to enable the gooey fluid background effect on the dock */
  dockGooey?: boolean;
  /** Additional CSS class names for the root gallery container */
  className?: string;
  /** Additional CSS class names for the floating thumbnail dock */
  dockClassName?: string;
  /** Additional CSS class names for slide title typography */
  titleClassName?: string;
}

const DEFAULT_ITEMS: FluidDockCarouselItem[] = [
  {
    id: 1,
    image:
      "https://ik.imagekit.io/j65jb9u8q/japan_mount_fuji_1792951286679.jpg",
    title: "Japan",
  },
  {
    id: 2,
    image:
      "https://ik.imagekit.io/j65jb9u8q/italy_amalfi_coast_1792951323930.jpg",
    title: "Italy",
  },
  {
    id: 3,
    image:
      "https://ik.imagekit.io/j65jb9u8q/france_eiffel_tower_1792951364018.jpg",
    title: "France",
  },
  {
    id: 4,
    image:
      "https://ik.imagekit.io/j65jb9u8q/iceland_aurora_mountain_1792951406929.jpg",
    title: "Iceland",
  },
  {
    id: 5,
    image:
      "https://ik.imagekit.io/j65jb9u8q/egypt_giza_pyramids_1792951450291.jpg",
    title: "Egypt",
  },
  {
    id: 6,
    image:
      "https://ik.imagekit.io/j65jb9u8q/switzerland_matterhorn_alps_1792951497495.jpg",
    title: "Switzerland",
  },
  {
    id: 7,
    image:
      "https://ik.imagekit.io/j65jb9u8q/brazil_rio_sugarloaf_1792951544409.jpg",
    title: "Brazil",
  },
  {
    id: 8,
    image: "https://ik.imagekit.io/j65jb9u8q/india_taj_mahal_1792951592038.jpg",
    title: "India",
  },
];

const horizontalSlideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? "100%" : "-100%",
  }),
  center: {
    zIndex: 1,
    x: "0%",
  },
  exit: (direction: number) => ({
    zIndex: 0,
    x: direction < 0 ? "100%" : "-100%",
  }),
};

const verticalSlideVariants = {
  enter: (direction: number) => ({
    y: direction > 0 ? "100%" : "-100%",
  }),
  center: {
    zIndex: 1,
    y: "0%",
  },
  exit: (direction: number) => ({
    zIndex: 0,
    y: direction < 0 ? "100%" : "-100%",
  }),
};

export function FluidDockCarousel({
  items = DEFAULT_ITEMS,
  images,
  titles,
  activeIndex: controlledIndex,
  defaultActiveIndex = 0,
  onActiveChange,
  orientation = "horizontal",
  dockPosition,
  indicatorVariant = "contrast",
  showDock = true,
  showControls = true,
  showTitles = true,
  enableWheel = true,
  enableTouch = true,
  overlayOpacity = 0.25,
  activeScale = 1.1,
  activeWidth = 58,
  dockGooey = true,
  className,
  dockClassName,
  titleClassName,
}: FluidDockCarouselProps) {
  const resolvedItems: FluidDockCarouselItem[] = React.useMemo(() => {
    if (images && images.length > 0) {
      return images.map((image, idx) => ({
        id: idx,
        image,
        title: titles?.[idx] ?? "",
      }));
    }
    const baseItems = items && items.length > 0 ? items : DEFAULT_ITEMS;
    return baseItems.map((item, idx) => ({
      ...item,
      title: titles?.[idx] !== undefined ? titles[idx] : item.title,
    }));
  }, [items, images, titles]);

  const [internalIndex, setInternalIndex] = useState(defaultActiveIndex);
  const [direction, setDirection] = useState(0);
  const activeIndex =
    controlledIndex !== undefined ? controlledIndex : internalIndex;
  const activeIndexRef = useRef(activeIndex);
  const cooldownTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const updateSize = () => {
      const containerWidth = containerRef.current?.clientWidth;
      const width =
        containerWidth && containerWidth > 0
          ? containerWidth
          : window.innerWidth;
      setIsMobile(width < 640);
    };

    updateSize();

    let resizeObserver: ResizeObserver | null = null;
    if (typeof ResizeObserver !== "undefined" && containerRef.current) {
      resizeObserver = new ResizeObserver(updateSize);
      resizeObserver.observe(containerRef.current);
    }

    window.addEventListener("resize", updateSize);
    return () => {
      if (resizeObserver) resizeObserver.disconnect();
      window.removeEventListener("resize", updateSize);
    };
  }, []);

  const baseSize = isMobile ? 32 : 40;
  const activeDim = isMobile ? Math.min(activeWidth, 46) : activeWidth;
  const slotSize = baseSize + (isMobile ? 8 : 12);
  const blobOffset = isMobile ? 0 : 1;
  const blobCrossSize = isMobile ? baseSize + 12 : 54;
  const blobExpandedSize = isMobile ? activeDim + 12 : activeWidth + 14;

  const thumbRefs = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    const activeThumb = thumbRefs.current[activeIndex];
    if (activeThumb) {
      activeThumb.scrollIntoView({
        behavior: "smooth",
        inline: orientation === "horizontal" ? "center" : "nearest",
        block: orientation === "horizontal" ? "nearest" : "center",
      });
    }
  }, [activeIndex, orientation]);

  useEffect(() => {
    if (activeIndex !== activeIndexRef.current) {
      let diff = activeIndex - activeIndexRef.current;
      if (diff > resolvedItems.length / 2) diff -= resolvedItems.length;
      if (diff < -resolvedItems.length / 2) diff += resolvedItems.length;
      setDirection(diff >= 0 ? 1 : -1);
      activeIndexRef.current = activeIndex;
    }
  }, [activeIndex, resolvedItems.length]);

  useEffect(() => {
    return () => {
      if (cooldownTimerRef.current) {
        clearTimeout(cooldownTimerRef.current);
      }
    };
  }, []);

  const isHorizontal = orientation === "horizontal";

  const resolvedDockPosition = (() => {
    if (isHorizontal) {
      if (
        dockPosition === "top" ||
        dockPosition === "bottom" ||
        dockPosition === "center"
      ) {
        return dockPosition;
      }
      return "bottom";
    }
    if (
      dockPosition === "left" ||
      dockPosition === "right" ||
      dockPosition === "center"
    ) {
      return dockPosition;
    }
    return "center";
  })();

  const reactId = useId();
  const safeId = reactId.replace(/:/g, "");
  const filterId = `fluid-dock-carousel-goo-${safeId}`;

  const containerRef = useRef<HTMLDivElement>(null);
  const isAnimatingRef = useRef(false);
  const touchStartRef = useRef(0);

  const updateIndex = useCallback(
    (newIndex: number) => {
      if (controlledIndex === undefined) {
        setInternalIndex(newIndex);
      }
      onActiveChange?.(newIndex);
    },
    [controlledIndex, onActiveChange],
  );

  const triggerAnimationCooldown = useCallback(() => {
    isAnimatingRef.current = true;
    if (cooldownTimerRef.current) {
      clearTimeout(cooldownTimerRef.current);
    }
    cooldownTimerRef.current = setTimeout(() => {
      isAnimatingRef.current = false;
    }, 450);
  }, []);

  const paginate = useCallback(
    (newDirection: number) => {
      if (isAnimatingRef.current || resolvedItems.length === 0) return;
      const current = activeIndexRef.current;
      const nextIndex =
        (current + newDirection + resolvedItems.length) % resolvedItems.length;
      setDirection(newDirection);
      activeIndexRef.current = nextIndex;
      updateIndex(nextIndex);
      triggerAnimationCooldown();
    },
    [resolvedItems.length, triggerAnimationCooldown, updateIndex],
  );

  const handleSelectSection = useCallback(
    (targetIndex: number) => {
      if (isAnimatingRef.current || resolvedItems.length === 0) return;
      const current = activeIndexRef.current;
      if (targetIndex === current) return;

      let dir = targetIndex > current ? 1 : -1;
      if (targetIndex - current > resolvedItems.length / 2) {
        dir = -1;
      } else if (current - targetIndex > resolvedItems.length / 2) {
        dir = 1;
      }

      setDirection(dir);
      activeIndexRef.current = targetIndex;
      updateIndex(targetIndex);
      triggerAnimationCooldown();
    },
    [resolvedItems.length, triggerAnimationCooldown, updateIndex],
  );

  const handlePrev = useCallback(() => {
    paginate(-1);
  }, [paginate]);

  const handleNext = useCallback(() => {
    paginate(1);
  }, [paginate]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || !enableWheel) return;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (isAnimatingRef.current) return;

      const delta =
        Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;

      if (Math.abs(delta) < 15) return;

      if (delta > 0) {
        paginate(1);
      } else if (delta < 0) {
        paginate(-1);
      }
    };

    container.addEventListener("wheel", handleWheel, { passive: false });
    return () => {
      container.removeEventListener("wheel", handleWheel);
    };
  }, [enableWheel, paginate]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || !enableTouch) return;

    const handleTouchStart = (e: TouchEvent) => {
      touchStartRef.current = isHorizontal
        ? e.touches[0].clientX
        : e.touches[0].clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (isAnimatingRef.current) return;
      const touchEnd = isHorizontal
        ? e.touches[0].clientX
        : e.touches[0].clientY;
      const diff = touchStartRef.current - touchEnd;

      const swipeThreshold = 40;
      if (Math.abs(diff) > swipeThreshold) {
        touchStartRef.current = touchEnd;
        if (diff > 0) {
          paginate(1);
        } else {
          paginate(-1);
        }
      }
    };

    container.addEventListener("touchstart", handleTouchStart, {
      passive: true,
    });
    container.addEventListener("touchmove", handleTouchMove, { passive: true });

    return () => {
      container.removeEventListener("touchstart", handleTouchStart);
      container.removeEventListener("touchmove", handleTouchMove);
    };
  }, [enableTouch, isHorizontal, paginate]);

  useEffect(() => {
    if (!showControls) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement
      ) {
        return;
      }
      if (isHorizontal) {
        if (e.key === "ArrowLeft") {
          e.preventDefault();
          paginate(-1);
        } else if (e.key === "ArrowRight") {
          e.preventDefault();
          paginate(1);
        }
      } else {
        if (e.key === "ArrowUp") {
          e.preventDefault();
          paginate(-1);
        } else if (e.key === "ArrowDown") {
          e.preventDefault();
          paginate(1);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [showControls, isHorizontal, paginate]);

  const getPositionClasses = () => {
    switch (resolvedDockPosition) {
      case "top":
        return "top-3 sm:top-6 left-1/2 -translate-x-1/2";
      case "bottom":
        return "bottom-3 sm:bottom-6 left-1/2 -translate-x-1/2";
      case "left":
        return "left-2 sm:left-6 top-1/2 -translate-y-1/2";
      case "right":
        return "right-2 sm:right-6 top-1/2 -translate-y-1/2";
      case "center":
      default:
        return "left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2";
    }
  };

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative h-full w-full overflow-hidden bg-neutral-100 text-neutral-900 select-none dark:bg-neutral-950 dark:text-white",
        className,
      )}
    >
      <div className="absolute inset-0 z-0 overflow-hidden">
        <AnimatePresence initial={false} custom={direction}>
          {resolvedItems.map((item, i) =>
            i === activeIndex ? (
              <motion.div
                key={item.id ?? i}
                custom={direction}
                variants={
                  isHorizontal ? horizontalSlideVariants : verticalSlideVariants
                }
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  type: "spring",
                  stiffness: 180,
                  damping: 24,
                }}
                className="absolute inset-0 flex h-full w-full items-center justify-center overflow-hidden"
              >
                <img
                  src={item.image}
                  alt={item.alt ?? item.title ?? `Slide ${i}`}
                  className="pointer-events-none absolute inset-0 h-full w-full object-cover"
                />

                {showTitles && item.title && (
                  <div className="relative z-10 flex max-w-4xl flex-col items-center justify-center px-4 text-center select-none">
                    <h1
                      className={cn(
                        "font-sans text-3xl font-black tracking-tight break-words text-white uppercase opacity-90 sm:text-6xl md:text-8xl lg:text-9xl",
                        titleClassName,
                      )}
                    >
                      {item.title}
                    </h1>
                  </div>
                )}
              </motion.div>
            ) : null,
          )}
        </AnimatePresence>
      </div>

      <div
        className="pointer-events-none absolute inset-0 z-10 bg-black transition-opacity"
        style={{ opacity: overlayOpacity }}
      />

      {showDock && resolvedItems.length > 0 && (
        <div
          className={cn(
            "absolute z-20 flex items-center",
            isHorizontal
              ? "max-w-[calc(100%-1rem)] flex-row gap-2 sm:gap-3"
              : "max-h-[calc(100%-1.5rem)] flex-col gap-2 sm:gap-3",
            getPositionClasses(),
          )}
        >
          {showControls && resolvedItems.length > 1 && (
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Previous slide"
              className="flex size-10 shrink-0 items-center justify-center rounded-[15px] border border-neutral-200/80 bg-white text-neutral-800 shadow-xl drop-shadow-[0_8px_20px_rgba(0,0,0,0.12)] transition-all duration-200 hover:scale-105 hover:bg-neutral-50 hover:text-neutral-950 focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 active:scale-95 sm:size-12 sm:rounded-[18px] dark:border-white/10 dark:bg-black dark:text-neutral-200 dark:drop-shadow-[0_8px_24px_rgba(0,0,0,0.5)] dark:hover:bg-neutral-900 dark:hover:text-white dark:focus-visible:ring-white"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.25"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="size-4 sm:size-5"
                aria-hidden="true"
              >
                {isHorizontal ? (
                  <polyline points="15 18 9 12 15 6" />
                ) : (
                  <polyline points="18 15 12 9 6 15" />
                )}
              </svg>
            </button>
          )}

          <div
            className={cn(
              "relative scrollbar-none",
              isHorizontal
                ? showControls
                  ? "max-w-[calc(100%-6rem)] overflow-x-auto overflow-y-hidden sm:max-w-none"
                  : "max-w-full overflow-x-auto overflow-y-hidden sm:max-w-none"
                : showControls
                  ? "max-h-[calc(100%-6.5rem)] overflow-x-hidden overflow-y-auto sm:max-h-none"
                  : "max-h-full overflow-x-hidden overflow-y-auto sm:max-h-none",
            )}
          >
            {dockGooey && (
              <svg
                className="pointer-events-none absolute -top-[9999px] -left-[9999px] h-0 w-0 opacity-0"
                aria-hidden="true"
              >
                <defs>
                  <filter id={filterId} colorInterpolationFilters="sRGB">
                    <feGaussianBlur
                      in="SourceGraphic"
                      stdDeviation="4.5"
                      result="blur"
                    />
                    <feColorMatrix
                      in="blur"
                      type="matrix"
                      values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 20 -9"
                    />
                  </filter>
                </defs>
              </svg>
            )}

            <div
              className={cn(
                "relative flex items-center",
                isHorizontal
                  ? "flex-row px-1.5 py-4 sm:px-2 sm:py-6"
                  : "flex-col px-4 py-1.5 sm:px-6 sm:py-2",
              )}
            >
              {dockGooey ? (
                <div
                  className="pointer-events-none absolute inset-0 drop-shadow-[0_12px_28px_rgba(0,0,0,0.18)] filter dark:drop-shadow-[0_12px_36px_rgba(0,0,0,0.65)]"
                  style={{ filter: `url(#${filterId})` }}
                >
                  {isHorizontal ? (
                    <>
                      <div className="absolute top-1/2 left-0 h-12 w-full -translate-y-1/2 rounded-[20px] bg-white sm:h-14 sm:rounded-[22px] dark:bg-black" />
                      <motion.div
                        key="horizontal-gooey-blob"
                        className="absolute top-1/2 -translate-y-1/2 rounded-[20px] bg-white sm:rounded-[22px] dark:bg-black"
                        initial={false}
                        animate={{
                          left: blobOffset + activeIndex * slotSize,
                          width: blobCrossSize,
                          height: blobExpandedSize,
                        }}
                        transition={{
                          type: "spring",
                          stiffness: 280,
                          damping: 24,
                        }}
                      />
                    </>
                  ) : (
                    <>
                      <div className="absolute top-0 left-1/2 h-full w-12 -translate-x-1/2 rounded-[20px] bg-white sm:w-14 sm:rounded-[22px] dark:bg-black" />
                      <motion.div
                        key="vertical-gooey-blob"
                        className="absolute left-1/2 -translate-x-1/2 rounded-[20px] bg-white sm:rounded-[22px] dark:bg-black"
                        initial={false}
                        animate={{
                          top: blobOffset + activeIndex * slotSize,
                          width: blobExpandedSize,
                          height: blobCrossSize,
                        }}
                        transition={{
                          type: "spring",
                          stiffness: 280,
                          damping: 24,
                        }}
                      />
                    </>
                  )}
                </div>
              ) : (
                <div
                  className={cn(
                    "pointer-events-none absolute inset-0 rounded-[20px] border border-neutral-200/80 bg-white shadow-xl sm:rounded-[22px] dark:border-white/10 dark:bg-black",
                    isHorizontal
                      ? "top-1/2 left-0 h-12 w-full -translate-y-1/2 sm:h-14"
                      : "top-0 left-1/2 h-full w-12 -translate-x-1/2 sm:w-14",
                  )}
                />
              )}

              <div
                className={cn(
                  "relative z-10 flex items-center gap-2 sm:gap-3",
                  isHorizontal ? "flex-row" : "flex-col",
                  dockClassName,
                )}
                style={
                  isHorizontal ? { height: activeDim } : { width: activeDim }
                }
              >
                {resolvedItems.map((item, i) => {
                  const isActive = activeIndex === i;
                  return (
                    <motion.button
                      key={item.id ?? i}
                      ref={(el) => {
                        thumbRefs.current[i] = el;
                      }}
                      type="button"
                      onClick={() => handleSelectSection(i)}
                      aria-label={item.title || `Select slide ${i + 1}`}
                      className="relative shrink-0 overflow-hidden rounded-[13px] focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 active:scale-95 sm:rounded-[15px] dark:focus-visible:ring-white"
                      initial={false}
                      animate={{
                        width: isHorizontal
                          ? baseSize
                          : isActive
                            ? activeDim
                            : baseSize,
                        height: isHorizontal
                          ? isActive
                            ? activeDim
                            : baseSize
                          : baseSize,
                      }}
                      transition={{
                        type: "spring",
                        stiffness: 350,
                        damping: 26,
                      }}
                    >
                      <motion.img
                        src={item.image}
                        alt={item.alt ?? item.title ?? `Thumbnail ${i + 1}`}
                        className="h-full w-full rounded-[13px] object-cover sm:rounded-[15px]"
                        initial={false}
                        animate={{
                          scale: isActive ? activeScale : 1,
                        }}
                        transition={{
                          type: "spring",
                          stiffness: 350,
                          damping: 26,
                        }}
                      />
                    </motion.button>
                  );
                })}
              </div>
            </div>
          </div>

          {showControls && resolvedItems.length > 1 && (
            <button
              type="button"
              onClick={handleNext}
              aria-label="Next slide"
              className="flex size-10 shrink-0 items-center justify-center rounded-[15px] border border-neutral-200/80 bg-white text-neutral-800 shadow-xl drop-shadow-[0_8px_20px_rgba(0,0,0,0.12)] transition-all duration-200 hover:scale-105 hover:bg-neutral-50 hover:text-neutral-950 focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 active:scale-95 sm:size-12 sm:rounded-[18px] dark:border-white/10 dark:bg-black dark:text-neutral-200 dark:drop-shadow-[0_8px_24px_rgba(0,0,0,0.5)] dark:hover:bg-neutral-900 dark:hover:text-white dark:focus-visible:ring-white"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.25"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="size-4 sm:size-5"
                aria-hidden="true"
              >
                {isHorizontal ? (
                  <polyline points="9 18 15 12 9 6" />
                ) : (
                  <polyline points="6 9 12 15 18 9" />
                )}
              </svg>
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default FluidDockCarousel;

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
 * Released under the Great UI Custom License Agreement.
 * Contributions, issues, and feature requests are always welcome.
 *
 * Author: Saurabh Sharma
 * X: https://x.com/srbh_here
 */
