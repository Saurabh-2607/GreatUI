"use client";

import React, { useState, useEffect, useRef, useId, useCallback } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

export interface FluidDockCarouselItem {
  id?: string | number;
  image: string;
  title: string;
  alt?: string;
}

export interface FluidDockCarouselProps {
  /** Array of gallery items containing image URLs, titles, and optional identifiers */
  items?: FluidDockCarouselItem[];
  /** Controlled active index of the current slide */
  activeIndex?: number;
  /** Initial active index when uncontrolled */
  defaultActiveIndex?: number;
  /** Callback triggered when the active slide changes */
  onActiveChange?: (index: number) => void;
  /** Scrolling orientation of the gallery (vertical or horizontal) */
  orientation?: "vertical" | "horizontal";
  /** Position alignment of the floating dock on screen */
  dockPosition?: "center" | "bottom" | "top" | "left" | "right";
  /** Visual styling variant of the active thumbnail border indicator */
  indicatorVariant?: "glow" | "contrast" | "minimal";
  /** Whether scrolling and navigation strictly snap slide-by-slide */
  enableSnap?: boolean;
  /** Whether to render the floating navigation thumbnail dock */
  showDock?: boolean;
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

export function FluidDockCarousel({
  items = DEFAULT_ITEMS,
  activeIndex: controlledIndex,
  defaultActiveIndex = 0,
  onActiveChange,
  orientation = "vertical",
  dockPosition,
  indicatorVariant = "glow",
  enableSnap = false,
  showDock = true,
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
  const [internalIndex, setInternalIndex] = useState(defaultActiveIndex);
  const activeIndex =
    controlledIndex !== undefined ? controlledIndex : internalIndex;
  const activeIndexRef = useRef(activeIndex);

  useEffect(() => {
    activeIndexRef.current = activeIndex;
  }, [activeIndex]);

  const isHorizontal = orientation === "horizontal";

  const resolvedDockPosition =
    dockPosition || (isHorizontal ? "bottom" : "center");

  const reactId = useId();
  const safeId = reactId.replace(/:/g, "");
  const filterId = `fluid-dock-carousel-goo-${safeId}`;

  const containerRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const isAnimatingRef = useRef(false);
  const touchStartRef = useRef(0);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;
    if (!enableSnap) {
      if (isHorizontal) {
        container.scrollLeft = activeIndexRef.current * container.clientWidth;
      } else {
        container.scrollTop = activeIndexRef.current * container.clientHeight;
      }
    } else {
      if (isHorizontal) {
        container.scrollLeft = 0;
      } else {
        container.scrollTop = 0;
      }
    }
  }, [enableSnap, isHorizontal]);

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
    if (!enableSnap) return;
    isAnimatingRef.current = true;
    setTimeout(() => {
      isAnimatingRef.current = false;
    }, 850);
  }, [enableSnap]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || !enableWheel || !enableSnap) return;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (isAnimatingRef.current) return;

      const delta =
        isHorizontal && Math.abs(e.deltaX) > Math.abs(e.deltaY)
          ? e.deltaX
          : e.deltaY;

      if (delta > 0) {
        if (activeIndexRef.current < items.length - 1) {
          updateIndex(activeIndexRef.current + 1);
          triggerAnimationCooldown();
        }
      } else if (delta < 0) {
        if (activeIndexRef.current > 0) {
          updateIndex(activeIndexRef.current - 1);
          triggerAnimationCooldown();
        }
      }
    };

    container.addEventListener("wheel", handleWheel, { passive: false });
    return () => {
      container.removeEventListener("wheel", handleWheel);
    };
  }, [
    items.length,
    enableWheel,
    enableSnap,
    isHorizontal,
    updateIndex,
    triggerAnimationCooldown,
  ]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || !enableTouch || !enableSnap) return;

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
        if (diff > 0) {
          if (activeIndexRef.current < items.length - 1) {
            updateIndex(activeIndexRef.current + 1);
            triggerAnimationCooldown();
          }
        } else {
          if (activeIndexRef.current > 0) {
            updateIndex(activeIndexRef.current - 1);
            triggerAnimationCooldown();
          }
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
  }, [
    items.length,
    enableTouch,
    enableSnap,
    isHorizontal,
    updateIndex,
    triggerAnimationCooldown,
  ]);

  const handleNativeScroll = (e: React.UIEvent<HTMLDivElement>) => {
    if (enableSnap) return;
    const target = e.currentTarget;
    const size = isHorizontal ? target.clientWidth : target.clientHeight;
    if (size <= 0) return;
    const scrollPos = isHorizontal ? target.scrollLeft : target.scrollTop;
    const newIndex = Math.min(
      items.length - 1,
      Math.max(0, Math.round(scrollPos / size)),
    );
    if (newIndex !== activeIndexRef.current) {
      activeIndexRef.current = newIndex;
      updateIndex(newIndex);
    }
  };

  const handleSelectSection = (index: number) => {
    if (enableSnap) {
      if (isAnimatingRef.current) return;
      updateIndex(index);
      triggerAnimationCooldown();
    } else {
      updateIndex(index);
      const container = scrollContainerRef.current;
      if (container) {
        if (isHorizontal) {
          container.scrollTo({
            left: index * container.clientWidth,
            behavior: "smooth",
          });
        } else {
          container.scrollTo({
            top: index * container.clientHeight,
            behavior: "smooth",
          });
        }
      }
    }
  };

  const getPositionClasses = () => {
    switch (resolvedDockPosition) {
      case "top":
        return "top-6 left-1/2 -translate-x-1/2";
      case "bottom":
        return "bottom-6 left-1/2 -translate-x-1/2";
      case "left":
        return "left-6 top-1/2 -translate-y-1/2";
      case "right":
        return "right-6 top-1/2 -translate-y-1/2";
      case "center":
      default:
        return "left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2";
    }
  };

  const getIndicatorClasses = () => {
    switch (indicatorVariant) {
      case "contrast":
        return "border-2 border-white ring-1 ring-black/60 shadow-md dark:border-neutral-900 dark:ring-white/40";
      case "minimal":
        return "border-[1.5px] border-white/90 shadow-sm dark:border-neutral-200/90";
      case "glow":
      default:
        return "border-2 border-white shadow-[0_0_12px_rgba(255,255,255,0.7),inset_0_0_0_1px_rgba(0,0,0,0.35)] ring-1 ring-white/50 dark:border-white dark:shadow-[0_0_14px_rgba(255,255,255,0.65),inset_0_0_0_1px_rgba(0,0,0,0.45)]";
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
      <div
        ref={scrollContainerRef}
        onScroll={handleNativeScroll}
        className={cn(
          "absolute inset-0 z-0",
          enableSnap
            ? "overflow-hidden"
            : isHorizontal
              ? "[scrollbar-width:none] overflow-x-auto overflow-y-hidden [&::-webkit-scrollbar]:hidden"
              : "[scrollbar-width:none] overflow-x-hidden overflow-y-auto [&::-webkit-scrollbar]:hidden",
        )}
      >
        <motion.div
          className={cn(
            "flex h-full w-full",
            isHorizontal ? "flex-row" : "flex-col",
          )}
          initial={false}
          animate={
            enableSnap
              ? isHorizontal
                ? { x: `-${activeIndex * 100}%` }
                : { y: `-${activeIndex * 100}%` }
              : isHorizontal
                ? { x: 0 }
                : { y: 0 }
          }
          transition={
            enableSnap
              ? { type: "spring", stiffness: 95, damping: 20 }
              : { duration: 0 }
          }
        >
          {items.map((item, i) => (
            <div
              key={item.id ?? i}
              className="relative flex h-full min-h-full w-full min-w-full shrink-0 items-center justify-center overflow-hidden"
            >
              <img
                src={item.image}
                alt={item.alt ?? item.title ?? `Slide ${i}`}
                className="pointer-events-none absolute inset-0 h-full w-full object-cover"
              />

              {showTitles && item.title && (
                <h1
                  className={cn(
                    "relative z-10 px-4 text-center font-sans text-5xl font-black tracking-tight text-white uppercase opacity-90 select-none sm:text-7xl md:text-8xl lg:text-9xl",
                    titleClassName,
                  )}
                >
                  {item.title}
                </h1>
              )}
            </div>
          ))}
        </motion.div>
      </div>

      <div
        className="pointer-events-none absolute inset-0 z-10 bg-black transition-opacity"
        style={{ opacity: overlayOpacity }}
      />

      {showDock && items.length > 0 && (
        <div className={cn("absolute z-20", getPositionClasses())}>
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
              isHorizontal ? "flex-row px-2 py-6" : "flex-col px-6 py-2",
            )}
          >
            {dockGooey ? (
              <div
                className="pointer-events-none absolute inset-0 drop-shadow-[0_12px_28px_rgba(0,0,0,0.18)] filter dark:drop-shadow-[0_12px_36px_rgba(0,0,0,0.65)]"
                style={{ filter: `url(#${filterId})` }}
              >
                {isHorizontal ? (
                  <>
                    <div className="absolute top-1/2 left-0 h-14 w-full -translate-y-1/2 rounded-[22px] bg-white dark:bg-black" />
                    <motion.div
                      className="absolute top-1/2 -translate-y-1/2 rounded-[22px] bg-white dark:bg-black"
                      initial={false}
                      animate={{
                        left: 1 + activeIndex * 52,
                        width: activeWidth + 14,
                        height: 54,
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
                    <div className="absolute top-0 left-1/2 h-full w-14 -translate-x-1/2 rounded-[22px] bg-white dark:bg-black" />
                    <motion.div
                      className="absolute left-1/2 -translate-x-1/2 rounded-[22px] bg-white dark:bg-black"
                      initial={false}
                      animate={{
                        top: 1 + activeIndex * 52,
                        width: activeWidth + 14,
                        height: 54,
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
                  "pointer-events-none absolute inset-0 rounded-[22px] border border-neutral-200/80 bg-white shadow-xl dark:border-white/10 dark:bg-black",
                  isHorizontal
                    ? "top-1/2 left-0 h-14 w-full -translate-y-1/2"
                    : "top-0 left-1/2 h-full w-14 -translate-x-1/2",
                )}
              />
            )}

            <div
              className={cn(
                "relative z-10 flex items-center gap-3",
                isHorizontal ? "flex-row" : "flex-col",
                dockClassName,
              )}
            >
              {items.map((item, i) => {
                const isActive = activeIndex === i;
                return (
                  <motion.button
                    key={item.id ?? i}
                    type="button"
                    onClick={() => handleSelectSection(i)}
                    aria-label={item.title || `Select slide ${i + 1}`}
                    className="relative shrink-0 overflow-hidden rounded-[15px] focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 active:scale-95 dark:focus-visible:ring-white"
                    initial={false}
                    animate={{
                      width: isActive ? activeWidth : 40,
                      height: 40,
                    }}
                    transition={{ type: "spring", stiffness: 350, damping: 26 }}
                  >
                    <motion.img
                      src={item.image}
                      alt={item.alt ?? item.title ?? `Thumbnail ${i + 1}`}
                      className="h-full w-full rounded-[15px] object-cover"
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
                    {isActive && (
                      <motion.div
                        layoutId="active-thumb-indicator"
                        initial={false}
                        className={cn(
                          "pointer-events-none absolute inset-0 rounded-[15px]",
                          getIndicatorClasses(),
                        )}
                        transition={{
                          type: "spring",
                          stiffness: 350,
                          damping: 26,
                        }}
                      />
                    )}
                  </motion.button>
                );
              })}
            </div>
          </div>
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
