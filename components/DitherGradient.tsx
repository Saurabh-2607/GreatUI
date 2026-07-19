"use client";

import { useEffect, useRef } from "react";

// --- Color & Utilities ---
export type Rgb = [number, number, number];

// Single brand color #f6821f -> RGB (246, 130, 31)
export const BRAND_COLOR: Rgb = [246, 130, 31];

export function parseColor(color?: Rgb | string): Rgb {
  if (!color) return BRAND_COLOR;
  if (Array.isArray(color)) return color;
  if (typeof color === "string" && color.startsWith("#")) {
    const hex = color.replace("#", "");
    if (hex.length === 6) {
      const r = parseInt(hex.slice(0, 2), 16);
      const g = parseInt(hex.slice(2, 4), 16);
      const b = parseInt(hex.slice(4, 6), 16);
      if (!isNaN(r) && !isNaN(g) && !isNaN(b)) return [r, g, b];
    }
  }
  return BRAND_COLOR;
}

export const rgb = ([r, g, b]: Rgb, k = 1, a = 1) =>
  `rgba(${Math.round(r * k)},${Math.round(g * k)},${Math.round(b * k)},${a})`;

// --- Bayer Dither Matrix & Bloom Utilities ---
export const BAYER4 = [
  [0, 8, 2, 10],
  [12, 4, 14, 6],
  [3, 11, 1, 9],
  [15, 7, 13, 5],
].map((row) => row.map((v) => (v + 0.5) / 16));

export type PixelBloom = "off" | "low" | "high" | "aura";

const BLOOM_PRESET: Record<
  Exclude<PixelBloom, "off">,
  { blur: number; brightness: number; opacity: number; saturate: number }
> = {
  low: { blur: 3, brightness: 1.35, opacity: 0.7, saturate: 1.4 },
  high: { blur: 5, brightness: 1.5, opacity: 0.78, saturate: 1.5 },
  aura: { blur: 15, brightness: 2.9, opacity: 0.1, saturate: 3 },
};

export type PixelBloomStyle = {
  filter: string;
  opacity: number;
  mixBlendMode: "plus-lighter";
  imageRendering: "auto";
};

export function pixelBloomStyle(bloom: PixelBloom): PixelBloomStyle | null {
  if (bloom === "off") return null;
  const cfg = BLOOM_PRESET[bloom];
  return {
    filter: `blur(${cfg.blur}px) brightness(${cfg.brightness}) saturate(${cfg.saturate})`,
    opacity: cfg.opacity,
    mixBlendMode: "plus-lighter",
    imageRendering: "auto",
  };
}

// --- Dither Shader Engine ---
const MAX_COLS = 600;
const MAX_ROWS = 400;

export type GradientDirection = "up" | "down" | "left" | "right" | "radial" | "wave";

export type DitherGradientProps = {
  color?: Rgb | string;
  from?: Rgb | string;
  to?: Rgb | string | "transparent";
  direction?: GradientDirection;
  cell?: number;
  opacity?: number;
  bloom?: PixelBloom;
  speed?: number;
  animated?: boolean;
  className?: string;
};

type PaintSpec = {
  color: Rgb | string;
  to: Rgb | string | "transparent";
  direction: GradientDirection;
  cell: number;
  opacity: number;
};

function paintShader(
  canvas: HTMLCanvasElement,
  bloomCanvas: HTMLCanvasElement | null,
  width: number,
  height: number,
  spec: PaintSpec
): void {
  const ctx = canvas.getContext("2d");
  if (!ctx || width <= 0 || height <= 0) return;

  const cols = Math.min(MAX_COLS, Math.max(4, Math.round(width / spec.cell)));
  const rows = Math.min(MAX_ROWS, Math.max(4, Math.round(height / spec.cell)));
  if (canvas.width !== cols || canvas.height !== rows) {
    canvas.width = cols;
    canvas.height = rows;
  }

  ctx.clearRect(0, 0, cols, rows);

  const fromFill = parseColor(spec.color);
  const toFill = spec.to === "transparent" ? null : parseColor(spec.to);
  const o = spec.opacity;

  for (let y = 0; y < rows; y++) {
    const ny = (y / rows) * 2 - 1;
    for (let x = 0; x < cols; x++) {
      const nx = (x / cols) * 2 - 1;

      // Shader wave field equations (static spatial distribution)
      const w1 = Math.sin(nx * 3.2);
      const w2 = Math.cos(ny * 3.2);
      const w3 = Math.sin((nx + ny) * 2.5);
      const radial = Math.sqrt(nx * nx + ny * ny);

      let density = 0.5;
      if (spec.direction === "up") {
        density = (1 - (y / rows)) * 0.6 + 0.4 * (0.5 + 0.5 * w1);
      } else if (spec.direction === "down") {
        density = (y / rows) * 0.6 + 0.4 * (0.5 + 0.5 * w1);
      } else if (spec.direction === "left") {
        density = (1 - (x / cols)) * 0.6 + 0.4 * (0.5 + 0.5 * w2);
      } else if (spec.direction === "right") {
        density = (x / cols) * 0.6 + 0.4 * (0.5 + 0.5 * w2);
      } else if (spec.direction === "radial") {
        density = (1 - Math.min(1, radial)) * 0.5 + 0.5 * (0.5 + 0.5 * w3);
      } else {
        // "wave" shader mode
        density = 0.5 + 0.3 * w1 + 0.2 * w2 + 0.2 * w3;
      }

      // Bayer matrix 4x4 threshold
      const lit = density > BAYER4[y & 3][x & 3];

      if (toFill) {
        ctx.fillStyle = rgb(lit ? fromFill : toFill, 1, o);
        ctx.fillRect(x, y, 1, 1);
      } else {
        const alpha = (lit ? 0.35 + 0.65 * density : 0.12 * density) * o;
        if (alpha <= 0.004) continue;
        ctx.fillStyle = rgb(fromFill, 1, alpha);
        ctx.fillRect(x, y, 1, 1);
      }
    }
  }

  const bloomCtx = bloomCanvas?.getContext("2d") ?? null;
  if (bloomCanvas && bloomCtx) {
    if (bloomCanvas.width !== cols || bloomCanvas.height !== rows) {
      bloomCanvas.width = cols;
      bloomCanvas.height = rows;
    }
    bloomCtx.clearRect(0, 0, cols, rows);
    bloomCtx.drawImage(canvas, 0, 0);
  }
}

export function DitherGradient({
  color,
  from,
  to = "transparent",
  direction = "up",
  cell = 4,
  opacity = 1,
  bloom = "off",
  className = "",
}: DitherGradientProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const bloomRef = useRef<HTMLCanvasElement>(null);

  const activeColor = color ?? from ?? BRAND_COLOR;

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;

    const paint = () => {
      const box = wrap.getBoundingClientRect();
      paintShader(canvas, bloomRef.current, box.width, box.height, {
        color: activeColor,
        to,
        direction,
        cell,
        opacity,
      });
    };

    paint();

    if (typeof ResizeObserver === "undefined") return;
    const ro = new ResizeObserver(paint);
    ro.observe(wrap);

    return () => ro.disconnect();
  }, [activeColor, to, direction, cell, opacity, bloom]);

  const bloomStyle = pixelBloomStyle(bloom);
  const wrapClasses = `pointer-events-none absolute inset-0 overflow-hidden ${className}`.trim();

  return (
    <div ref={wrapRef} aria-hidden className={wrapClasses}>
      <canvas
        ref={canvasRef}
        className="absolute inset-0 h-full w-full"
        style={{ imageRendering: "pixelated" }}
      />
      {bloomStyle && (
        <canvas
          ref={bloomRef}
          className="absolute inset-0 h-full w-full"
          style={bloomStyle}
        />
      )}
    </div>
  );
}

export const DitherShader = DitherGradient;

export default DitherGradient;


