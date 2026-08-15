"use client";

import React, { useEffect, useRef, useState } from "react";
import { useMotionValue, useSpring, useAnimationFrame } from "framer-motion";

export default function PixelToAsciiImage({
  src,
  width = 500,
  height = 500,
  className = "",
  charSize = 10,
  textColor,
}: {
  src: string;
  width?: number;
  height?: number;
  className?: string;
  charSize?: number;
  textColor?: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [imageLoaded, setImageLoaded] = useState(false);
  const imageRef = useRef<HTMLImageElement | null>(null);
  const imageDataRef = useRef<ImageData | null>(null);
  const layoutRef = useRef({ x: 0, y: 0, w: width, h: height });

  const hoverProgress = useMotionValue(0);
  const springProgress = useSpring(hoverProgress, {
    stiffness: 150,
    damping: 20,
    mass: 0.5,
  });

  const chars = ["@", "#", "8", "&", "o", "*", ".", "!", ";"];

  useEffect(() => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = src;
    img.onload = () => {
      imageRef.current = img;

      const scale = Math.min(width / img.width, height / img.height);
      const w = img.width * scale;
      const h = img.height * scale;
      const x = width / 2 - w / 2;
      const y = height / 2 - h / 2;
      layoutRef.current = { x, y, w, h };

      const tmpCanvas = document.createElement("canvas");
      tmpCanvas.width = width;
      tmpCanvas.height = height;
      const tmpCtx = tmpCanvas.getContext("2d", { willReadFrequently: true });
      if (tmpCtx) {
        tmpCtx.drawImage(img, x, y, w, h);
        imageDataRef.current = tmpCtx.getImageData(0, 0, width, height);
      }

      setImageLoaded(true);
    };
  }, [src, width, height]);

  useAnimationFrame(() => {
    if (!imageLoaded || !canvasRef.current || !imageRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let progress = springProgress.get();
    if (progress >= 0.995) progress = 1;
    if (progress <= 0.005) progress = 0;

    ctx.clearRect(0, 0, width, height);

    const layout = layoutRef.current;

    if (progress <= 0.01) {
      ctx.drawImage(imageRef.current, layout.x, layout.y, layout.w, layout.h);
      return;
    }

    ctx.drawImage(imageRef.current, layout.x, layout.y, layout.w, layout.h);

    const pixelProgress = progress < 0.3 ? progress / 0.3 : 1;
    const asciiProgress = progress < 0.7 ? 0 : (progress - 0.7) / 0.3;

    if (pixelProgress > 0) {
      const data = imageDataRef.current?.data;
      if (!data) return;

      ctx.font = `${charSize}px monospace`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      for (let y = 0; y < height; y += charSize) {
        for (let x = 0; x < width; x += charSize) {
          const cx = Math.min(x + Math.floor(charSize / 2), width - 1);
          const cy = Math.min(y + Math.floor(charSize / 2), height - 1);
          const i = (cy * width + cx) * 4;

          const r = data[i];
          const g = data[i + 1];
          const b = data[i + 2];
          const a = data[i + 3];

          const blockHash = Math.sin(x * 12.9898 + y * 78.233) * 43758.5453;
          const blockThreshold = blockHash - Math.floor(blockHash);

          if (pixelProgress > blockThreshold) {
            ctx.globalCompositeOperation = "destination-out";
            ctx.fillStyle = "black";
            ctx.fillRect(x, y, charSize, charSize);
            ctx.globalCompositeOperation = "source-over";

            if (a < 10) continue;

            if (asciiProgress > blockThreshold) {
              let brightness = (r * 0.299 + g * 0.587 + b * 0.114) / 255;

              brightness = Math.pow(brightness, 0.4);
              let charIndex = Math.floor((1 - brightness) * (chars.length - 1));

              const tick = Math.floor(performance.now() / 150);
              const hash =
                Math.sin(x * 12.9898 + y * 78.233 + tick * 43.111) * 43758.5453;
              const randomVal = hash - Math.floor(hash);

              if (randomVal < 0.03) {
                const offsetHash =
                  Math.sin(x * 31.2 + y * 12.4 + tick * 15.6) * 12345.6789;
                const offsetVal = offsetHash - Math.floor(offsetHash);
                const randomOffset = offsetVal > 0.5 ? 1 : -1;
                charIndex = Math.max(
                  0,
                  Math.min(chars.length - 1, charIndex + randomOffset),
                );
              }

              const char = chars[charIndex];
              let renderColor = textColor;
              if (!renderColor) {
                const isDark =
                  document.documentElement.classList.contains("dark");
                renderColor = isDark ? "#ffffff" : "#000000";
              }
              ctx.globalAlpha = a / 255;
              ctx.fillStyle = renderColor;
              ctx.fillText(char, x + charSize / 2, y + charSize / 2);
              ctx.globalAlpha = 1.0;
            } else {
              ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${a / 255})`;
              ctx.fillRect(x, y, charSize, charSize);
            }
          }
        }
      }
    }
  });

  return (
    <div
      ref={containerRef}
      className={`relative inline-block overflow-hidden ${className}`}
      style={{ width, height }}
      onMouseEnter={() => hoverProgress.set(1)}
      onMouseLeave={() => hoverProgress.set(0)}
    >
      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        className="h-full w-full object-contain"
        style={{ imageRendering: "pixelated" }}
      />
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
 * X: https://x.com/srbh_here
 */
