"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { TextMorph } from "torph/react";
import { cn } from "@/lib/utils";

const clamp = (val: number, min: number, max: number) =>
  Math.min(Math.max(val, min), max);

const stepDecimals = (step: number) => {
  const s = step.toString();
  const dot = s.indexOf(".");
  return dot === -1 ? 0 : s.length - dot - 1;
};

const roundToStep = (val: number, step: number, min: number) => {
  const raw = Math.round((val - min) / step) * step + min;
  const decimals = Math.max(stepDecimals(step), stepDecimals(min));
  return Number(raw.toFixed(decimals));
};

interface ControlSliderProps {
  label?: string;
  value: number;
  min?: number;
  max?: number;
  step?: number;
  onChange: (val: number) => void;
  isDisabled?: boolean;
  displayValue?: (val: number) => string;
  valueUnit?: string;
  showStepper?: boolean;
}

export function ControlSlider({
  label = "",
  value,
  min = 0,
  max = 100,
  step = 1,
  onChange,
  isDisabled = false,
  displayValue,
  valueUnit = "",
}: ControlSliderProps) {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [isHoverDevice, setIsHoverDevice] = useState(() =>
    typeof window !== "undefined"
      ? window.matchMedia("(hover: hover) and (pointer: fine)").matches
      : false,
  );

  const range = max - min;
  const percentage = range > 0 ? ((value - min) / range) * 100 : 0;

  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    const handleChange = (e: MediaQueryListEvent) =>
      setIsHoverDevice(e.matches);
    mq.addEventListener("change", handleChange);
    return () => mq.removeEventListener("change", handleChange);
  }, []);

  const computeValue = useCallback(
    (clientX: number) => {
      const track = trackRef.current;
      if (!track) return value;
      const rect = track.getBoundingClientRect();
      const ratio = clamp((clientX - rect.left) / rect.width, 0, 1);
      const raw = min + ratio * range;
      return clamp(roundToStep(raw, step, min), min, max);
    },
    [min, max, step, range, value],
  );

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (isDisabled) return;
    setIsDragging(true);
    e.currentTarget.setPointerCapture(e.pointerId);
    const newVal = computeValue(e.clientX);
    onChange(newVal);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging || isDisabled) return;
    const newVal = computeValue(e.clientX);
    onChange(newVal);
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (isDragging) {
      setIsDragging(false);
      try {
        e.currentTarget.releasePointerCapture(e.pointerId);
      } catch {}
    }
  };

  const handlePointerCancel = (e: React.PointerEvent<HTMLDivElement>) => {
    if (isDragging) {
      setIsDragging(false);
      try {
        e.currentTarget.releasePointerCapture(e.pointerId);
      } catch {}
    }
  };

  const isActive = isDragging || (isHoverDevice && isHovering);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (isDisabled) return;
      let next: number;
      switch (e.key) {
        case "ArrowRight":
        case "ArrowUp":
          next = value + step;
          break;
        case "ArrowLeft":
        case "ArrowDown":
          next = value - step;
          break;
        case "Home":
          next = min;
          break;
        case "End":
          next = max;
          break;
        default:
          return;
      }
      e.preventDefault();
      onChange(clamp(roundToStep(next, step, min), min, max));
    },
    [value, step, min, max, onChange, isDisabled],
  );

  const decimals = stepDecimals(step);
  const formattedValue = displayValue
    ? displayValue(value)
    : `${Number(value.toFixed(decimals))}${valueUnit}`;

  return (
    <div className="relative w-full select-none">
      <div
        ref={trackRef}
        role="slider"
        aria-label={label}
        aria-valuemin={min}
        aria-valuemax={max}
        aria-valuenow={value}
        aria-disabled={isDisabled}
        tabIndex={isDisabled ? -1 : 0}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerCancel}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        onKeyDown={handleKeyDown}
        className={cn(
          "group relative flex h-8.5 w-full cursor-pointer touch-pan-y items-center justify-between overflow-hidden rounded-lg border border-neutral-200/70 bg-white/90 px-3 shadow-xs transition-colors outline-none select-none dark:border-neutral-800/70 dark:bg-neutral-900/60",
          isDisabled && "pointer-events-none opacity-40",
          isActive && "border-neutral-300 dark:border-neutral-700",
        )}
      >
        <div
          className="pointer-events-none absolute inset-y-0 left-0 bg-neutral-100 transition-colors dark:bg-neutral-800/80"
          style={{ width: `${percentage}%` }}
        />

        <div
          className="pointer-events-none absolute top-1/2 z-[3] -translate-x-1/2 -translate-y-1/2"
          style={{ left: `clamp(4px, ${percentage}%, calc(100% - 4px))` }}
        >
          <div
            className={cn(
              "h-5 w-1 rounded-full transition-all duration-150 ease-out",
              isActive
                ? "scale-y-110 bg-[#f6821f] opacity-100"
                : "bg-neutral-400 opacity-60 dark:bg-neutral-500",
            )}
          />
        </div>

        <span className="pointer-events-none relative z-[4] max-w-[70%] min-w-0 truncate text-sm font-medium text-neutral-700 transition-colors group-hover:text-neutral-950 dark:text-neutral-300 dark:group-hover:text-white">
          {label}
        </span>

        <TextMorph
          as="span"
          className="pointer-events-none relative z-[4] ml-2 shrink-0 font-mono text-xs font-semibold text-neutral-900 tabular-nums dark:text-white"
        >
          {formattedValue}
        </TextMorph>
      </div>
    </div>
  );
}
