"use client";

import React, {
  useState,
  useRef,
  useEffect,
  createContext,
  useContext,
} from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useTransform,
  useSpring,
} from "motion/react";
import { cn } from "@/lib/utils";

export interface FluidAppDockItem {
  id?: string | number;
  title: string;
  icon?: React.ReactNode;
  image?: string;
  badge?: string | number;
  isActive?: boolean;
  divider?: boolean;
  onClick?: () => void;
  href?: string;
}

export interface FluidAppDockProps {
  /** Array of dock items containing icons, images, labels, badges, and action handlers */
  items?: FluidAppDockItem[];
  /** Default width and height of an unhovered dock icon in pixels */
  baseSize?: number;
  /** Maximum width and height of a magnified dock icon at peak hover */
  magnifiedSize?: number;
  /** Maximum upward lift distance in pixels along the bell curve on hover */
  maxLift?: number;
  /** Distance in pixels around the cursor that triggers magnification */
  distance?: number;
  /** Scale multiplier applied to the active or hovered thumbnail icon */
  hoverScale?: number;
  /** Whether to render floating app name tooltips on hover */
  showLabels?: boolean;
  /** Distance in pixels between the dock icon and the floating label tooltip */
  labelOffset?: number;
  /** Whether to display running indicator dots beneath active apps */
  showIndicator?: boolean;
  /** Whether to enable playful bounce animation when an app is clicked */
  enableBounce?: boolean;
  /** Whether the dock is fixed to the screen viewport edge */
  isFixed?: boolean;
  /** Additional CSS class names for the outer wrapper container */
  className?: string;
  /** Additional CSS class names for the inner dock shelf */
  dockClassName?: string;
  /** Additional CSS class names applied to each dock icon item */
  itemClassName?: string;
}

const DEFAULT_DOCK_ITEMS: FluidAppDockItem[] = [
  {
    id: "apple",
    title: "Apple",
    image: "https://svgl.app/library/apple.svg",
    isActive: true,
  },
  {
    id: "vscode",
    title: "VS Code",
    image: "https://svgl.app/library/vscode.svg",
    isActive: true,
  },
  {
    id: "figma",
    title: "Figma",
    image: "https://svgl.app/library/figma.svg",
    isActive: true,
  },
  {
    id: "slack",
    title: "Slack",
    image: "https://svgl.app/library/slack.svg",
  },
  {
    id: "discord",
    title: "Discord",
    image: "https://svgl.app/library/discord.svg",
  },
  {
    id: "linear",
    title: "Linear",
    image: "https://svgl.app/library/linear.svg",
    isActive: true,
  },
  {
    id: "raycast",
    title: "Raycast",
    image: "https://svgl.app/library/raycast.svg",
  },
  {
    id: "notion",
    title: "Notion",
    image: "https://svgl.app/library/notion.svg",
  },
  {
    id: "spotify",
    title: "Spotify",
    image: "https://svgl.app/library/spotify.svg",
    isActive: true,
  },
  {
    id: "separator-1",
    title: "",
    divider: true,
  },
  {
    id: "arc",
    title: "Arc",
    image: "https://svgl.app/library/arc.svg",
  },
  {
    id: "docker",
    title: "Docker",
    image: "https://svgl.app/library/docker.svg",
  },
];

function buildBellCurvePath(
  W: number,
  H: number,
  r: number,
  cursorPos: number,
  distance: number,
  peakLift: number,
): string {
  if (W <= 0 || H <= 0) return "";
  const radius = Math.max(0, Math.min(r, W / 2, H / 2));
  const K = 0.5522847498;

  const getBellY = (x: number) => {
    if (peakLift <= 0.05) return 0;
    const norm = (x - cursorPos) / distance;
    if (Math.abs(norm) >= 1) return 0;
    const bell = (1 + Math.cos(norm * Math.PI)) / 2;
    return -peakLift * bell;
  };

  const steps = 60;
  if (radius <= 0) {
    let topCurve = "";
    for (let i = 0; i <= steps; i++) {
      const px = (i / steps) * W;
      const py = getBellY(px);
      topCurve += `${i === 0 ? "M" : "L"} ${px.toFixed(2)} ${py.toFixed(2)} `;
    }
    return `${topCurve}L ${W} ${H} L 0 ${H} Z`;
  }

  const y0 = getBellY(0);
  const yR = getBellY(radius);
  const yWR = getBellY(W - radius);
  const yW = getBellY(W);

  let topCurve = "";
  for (let i = 1; i <= steps; i++) {
    const px = radius + (i / steps) * (W - 2 * radius);
    const py = getBellY(px);
    topCurve += `L ${px.toFixed(2)} ${py.toFixed(2)} `;
  }

  const trCp1x = (W - radius + radius * K).toFixed(2);
  const trCp1y = yWR.toFixed(2);
  const trCp2x = W.toFixed(2);
  const trCp2y = (yW + radius * (1 - K)).toFixed(2);
  const trEndX = W.toFixed(2);
  const trEndY = (yW + radius).toFixed(2);

  const tlCp1x = (0).toFixed(2);
  const tlCp1y = (y0 + radius * (1 - K)).toFixed(2);
  const tlCp2x = (radius * (1 - K)).toFixed(2);
  const tlCp2y = yR.toFixed(2);
  const tlEndX = radius.toFixed(2);
  const tlEndY = yR.toFixed(2);

  return `M ${radius} ${yR.toFixed(2)} ${topCurve}C ${trCp1x} ${trCp1y}, ${trCp2x} ${trCp2y}, ${trEndX} ${trEndY} L ${W} ${H - radius} A ${radius} ${radius} 0 0 1 ${W - radius} ${H} L ${radius} ${H} A ${radius} ${radius} 0 0 1 0 ${H - radius} L 0 ${(y0 + radius).toFixed(2)} C ${tlCp1x} ${tlCp1y}, ${tlCp2x} ${tlCp2y}, ${tlEndX} ${tlEndY} Z`;
}

interface DockContextValue {
  cursorCoord: ReturnType<typeof useSpring>;
  hoverIntensity: ReturnType<typeof useSpring>;
  baseSize: number;
  magnifiedSize: number;
  maxLift: number;
  distance: number;
  hoverScale: number;
  showLabels: boolean;
  labelOffset: number;
  showIndicator: boolean;
  enableBounce: boolean;
  itemClassName?: string;
  containerRef: React.RefObject<HTMLDivElement | null>;
}

const DockContext = createContext<DockContextValue | null>(null);

function FluidAppDockIconItem({ item }: { item: FluidAppDockItem }) {
  const ctx = useContext(DockContext);
  if (!ctx) {
    throw new Error("FluidAppDockIconItem must be used within FluidAppDock");
  }

  const {
    cursorCoord,
    hoverIntensity,
    baseSize,
    magnifiedSize,
    maxLift,
    distance,
    hoverScale,
    showLabels,
    labelOffset,
    showIndicator,
    enableBounce,
    itemClassName,
    containerRef,
  } = ctx;

  const itemRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isBouncing, setIsBouncing] = useState(false);

  const targetSize = useTransform(
    [cursorCoord, hoverIntensity],
    ([pos, intensity]) => {
      const p = Number(pos);
      const active = Number(intensity);
      if (p === Infinity || active <= 0.001) return baseSize;

      const el = itemRef.current;
      const parent = containerRef.current;
      if (!el || !parent) return baseSize;

      const elRect = el.getBoundingClientRect();
      const pRect = parent.getBoundingClientRect();
      const center = elRect.left - pRect.left + elRect.width / 2;

      const d = p - center;
      if (Math.abs(d) >= distance) return baseSize;

      const bell = (1 + Math.cos((d / distance) * Math.PI)) / 2;
      return baseSize + (magnifiedSize - baseSize) * bell * active;
    },
  );

  const targetLift = useTransform(
    [cursorCoord, hoverIntensity],
    ([pos, intensity]) => {
      const p = Number(pos);
      const active = Number(intensity);
      if (p === Infinity || active <= 0.001) return 0;

      const el = itemRef.current;
      const parent = containerRef.current;
      if (!el || !parent) return 0;

      const elRect = el.getBoundingClientRect();
      const pRect = parent.getBoundingClientRect();
      const center = elRect.left - pRect.left + elRect.width / 2;

      const d = p - center;
      if (Math.abs(d) >= distance) return 0;

      const bell = (1 + Math.cos((d / distance) * Math.PI)) / 2;
      return -maxLift * bell * active;
    },
  );

  const targetScale = useTransform(
    [cursorCoord, hoverIntensity],
    ([pos, intensity]) => {
      const p = Number(pos);
      const active = Number(intensity);
      if (p === Infinity || active <= 0.001) return 1;

      const el = itemRef.current;
      const parent = containerRef.current;
      if (!el || !parent) return 1;

      const elRect = el.getBoundingClientRect();
      const pRect = parent.getBoundingClientRect();
      const center = elRect.left - pRect.left + elRect.width / 2;

      const d = p - center;
      if (Math.abs(d) >= distance) return 1;

      const bell = (1 + Math.cos((d / distance) * Math.PI)) / 2;
      return 1 + (hoverScale - 1) * bell * active;
    },
  );

  const handleClick = () => {
    if (enableBounce && !isBouncing) {
      setIsBouncing(true);
      setTimeout(() => {
        setIsBouncing(false);
      }, 700);
    }
    item.onClick?.();
  };

  const getBounceKeyframes = () => {
    if (!isBouncing) return { y: 0 };
    return { y: [0, -18, 0, -10, 0, -4, 0] };
  };

  const getTooltipClasses = () => "bottom-full left-1/2 -translate-x-1/2";

  const tooltipLift = useTransform([targetLift, targetSize], ([lift, size]) => {
    const l = Number(lift);
    const s = Number(size);
    const expansion = s - baseSize;
    return l - expansion - labelOffset;
  });

  const tooltipAnimation = {
    initial: { opacity: 0, y: 4, scale: 0.92 },
    animate: { opacity: 1, y: 0, scale: 1 },
    exit: { opacity: 0, y: 4, scale: 0.92 },
  };

  const isMonochrome = item.id === "apple" || item.id === "notion";

  const itemWrapperHeight = showIndicator ? baseSize + 10 : baseSize;
  const itemWrapperWidth = targetSize;

  const content = (
    <motion.div
      ref={itemRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative flex shrink-0 flex-col items-center justify-end select-none"
      style={{
        width: itemWrapperWidth,
        height: itemWrapperHeight,
      }}
    >
      <AnimatePresence>
        {isHovered && showLabels && item.title && (
          <motion.div
            initial={tooltipAnimation.initial}
            animate={tooltipAnimation.animate}
            exit={tooltipAnimation.exit}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className={cn(
              "pointer-events-none absolute z-50 rounded-md px-2.5 py-1 text-xs font-medium tracking-tight whitespace-nowrap shadow-xl backdrop-blur-md",
              "border border-neutral-200/80 bg-white/95 text-neutral-800 shadow-neutral-900/10 dark:border-white/10 dark:bg-neutral-900/95 dark:text-neutral-100 dark:shadow-black/50",
              getTooltipClasses(),
            )}
            style={{
              x: 0,
              y: tooltipLift,
            }}
          >
            {item.title}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        type="button"
        onClick={handleClick}
        aria-label={item.title}
        style={{
          width: targetSize,
          height: targetSize,
          minWidth: targetSize,
          minHeight: targetSize,
          maxWidth: targetSize,
          maxHeight: targetSize,
          x: 0,
          y: targetLift,
        }}
        animate={getBounceKeyframes()}
        transition={
          isBouncing
            ? {
                duration: 0.7,
                ease: "easeInOut",
              }
            : undefined
        }
        className={cn(
          "relative flex aspect-square shrink-0 items-center justify-center overflow-hidden rounded-xl p-2 sm:p-2.5",
          "bg-neutral-200/60 backdrop-blur-md transition-colors dark:bg-neutral-800/90",
          "focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 active:scale-95 dark:focus-visible:ring-white",
          itemClassName,
        )}
      >
        <motion.div
          style={{ scale: targetScale }}
          className="flex aspect-square h-full w-full shrink-0 items-center justify-center"
        >
          {item.image ? (
            <img
              src={item.image}
              alt={item.title}
              className={cn(
                "pointer-events-none aspect-square h-full w-full shrink-0 object-contain",
                isMonochrome && "dark:invert",
              )}
            />
          ) : (
            <div className="flex aspect-square h-full w-full shrink-0 items-center justify-center">
              {item.icon}
            </div>
          )}
        </motion.div>
      </motion.button>

      {showIndicator && (
        <div className="pointer-events-none flex h-2 w-full shrink-0 items-center justify-center pt-1">
          {item.isActive ? (
            <span className="size-1 rounded-full bg-neutral-800/80 shadow-[0_0_4px_rgba(0,0,0,0.3)] dark:bg-white/90 dark:shadow-[0_0_6px_rgba(255,255,255,0.7)]" />
          ) : (
            <span className="size-1 opacity-0" />
          )}
        </div>
      )}
    </motion.div>
  );

  if (item.href) {
    return (
      <a href={item.href} className="flex">
        {content}
      </a>
    );
  }

  return content;
}

function FluidAppDockDivider() {
  return (
    <div
      className="mx-1 h-7 w-[1.5px] shrink-0 self-center bg-neutral-300/80 dark:bg-white/20"
      aria-hidden="true"
    />
  );
}

export function FluidAppDock({
  items = DEFAULT_DOCK_ITEMS,
  baseSize = 48,
  magnifiedSize = 72,
  maxLift = 18,
  distance = 160,
  hoverScale = 1.08,
  showLabels = true,
  labelOffset = 26,
  showIndicator = false,
  enableBounce = true,
  isFixed = false,
  className,
  dockClassName,
  itemClassName,
}: FluidAppDockProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const rawCursor = useMotionValue(0);
  const hoverTarget = useMotionValue(0);

  const springConfig = {
    mass: 0.1,
    stiffness: 280,
    damping: 24,
  };

  const smoothCursor = useSpring(rawCursor, springConfig);
  const hoverIntensity = useSpring(hoverTarget, springConfig);

  const [dockDimensions, setDockDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const updateSize = () => {
      setDockDimensions({ width: el.offsetWidth, height: el.offsetHeight });
    };
    updateSize();
    const observer = new ResizeObserver(updateSize);
    observer.observe(el);
    return () => observer.disconnect();
  }, [items.length, baseSize]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const pos = e.clientX - rect.left;

    if (hoverTarget.get() === 0) {
      rawCursor.set(pos);
      smoothCursor.set(pos);
    } else {
      rawCursor.set(pos);
    }
    hoverTarget.set(1);
  };

  const handleMouseLeave = () => {
    hoverTarget.set(0);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches[0]) {
      const el = containerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const pos = e.touches[0].clientX - rect.left;

      if (hoverTarget.get() === 0) {
        rawCursor.set(pos);
        smoothCursor.set(pos);
      } else {
        rawCursor.set(pos);
      }
      hoverTarget.set(1);
    }
  };

  const handleTouchEnd = () => {
    hoverTarget.set(0);
  };

  const sizeDelta = magnifiedSize - baseSize;
  const totalTopLift = maxLift + sizeDelta;

  const pathD = useTransform(
    [smoothCursor, hoverIntensity],
    ([coord, intensity]) => {
      const { width, height } = dockDimensions;
      if (width <= 0 || height <= 0) return "";
      const effectiveRadius = Math.min(16, width / 2, height / 2);
      const active = Number(intensity);
      const curveDistance = distance * 1.15;
      if (active <= 0.001) {
        return buildBellCurvePath(
          width,
          height,
          effectiveRadius,
          width / 2,
          curveDistance,
          0,
        );
      }
      const p = Number(coord);
      const currentLift = totalTopLift * active;
      return buildBellCurvePath(
        width,
        height,
        effectiveRadius,
        p,
        curveDistance,
        currentLift,
      );
    },
  );

  const getFixedPositionClasses = () => {
    if (!isFixed) return "";
    return "fixed bottom-3 sm:bottom-5 left-1/2 -translate-x-1/2 z-50";
  };

  return (
    <DockContext.Provider
      value={{
        cursorCoord: smoothCursor,
        hoverIntensity,
        baseSize,
        magnifiedSize,
        maxLift,
        distance,
        hoverScale,
        showLabels,
        labelOffset,
        showIndicator,
        enableBounce,
        itemClassName,
        containerRef,
      }}
    >
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        className={cn(
          "relative flex items-center justify-center select-none",
          getFixedPositionClasses(),
          className,
        )}
      >
        {dockDimensions.width > 0 && dockDimensions.height > 0 && (
          <svg
            className="pointer-events-none absolute inset-0 overflow-visible"
            width={dockDimensions.width}
            height={dockDimensions.height}
            viewBox={`0 0 ${dockDimensions.width} ${dockDimensions.height}`}
            aria-hidden="true"
          >
            <motion.path
              d={pathD}
              className={cn(
                "fill-white/85 stroke-black/10 backdrop-blur-2xl dark:fill-neutral-900/80 dark:stroke-white/10",
                dockClassName,
              )}
              strokeWidth="1.2"
            />
          </svg>
        )}

        <div
          className={cn(
            "relative z-10 flex flex-row items-end gap-2.5 p-2.5 sm:gap-3 sm:p-3",
          )}
        >
          {items.map((item, index) =>
            item.divider ? (
              <FluidAppDockDivider key={item.id ?? index} />
            ) : (
              <FluidAppDockIconItem key={item.id ?? index} item={item} />
            ),
          )}
        </div>
      </div>
    </DockContext.Provider>
  );
}

export default FluidAppDock;

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
