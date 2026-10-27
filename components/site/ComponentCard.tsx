"use client";

import React, { useState, useRef, useEffect } from "react";
import posthog from "posthog-js";
import { motion } from "motion/react";
import ComponentPreviewRenderer from "./ComponentPreviewRenderer";
import { cn } from "@/lib/utils";
import {
  type Component,
  getPreviewFallback,
  getPreviewPoster,
} from "@/lib/registry";
import { ViewerProvider } from "@/lib/viewer-context";

interface ComponentCardProps {
  component: Component;
  isFeatured?: boolean;
}

function CardMedia({
  component,
  isHovered,
}: {
  component: Component;
  isHovered: boolean;
}) {
  const [currentSrc, setCurrentSrc] = useState(component.preview);
  const [hasError, setHasError] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const fallback = getPreviewFallback(component);
  const poster = getPreviewPoster(component);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observer.disconnect();
          }
        });
      },
      { rootMargin: "300px" },
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (isHovered) {
      video.play().catch((err) => {
        console.error("Autoplay failed:", err);
      });
    } else {
      video.pause();
    }
  }, [isHovered, currentSrc]);

  const handleMediaError = () => {
    if (fallback && currentSrc !== fallback) {
      setCurrentSrc(fallback);
    } else {
      setHasError(true);
    }
  };

  if (!currentSrc || hasError) {
    return (
      <div className="pointer-events-none relative z-10 flex w-full items-center justify-center">
        <ViewerProvider>
          <ComponentPreviewRenderer slug={component.slug} />
        </ViewerProvider>
      </div>
    );
  }

  const isVideo = currentSrc.includes(".mp4") || currentSrc.includes(".webm");
  const shouldLoad = isInView || isHovered;

  return (
    <div
      ref={containerRef}
      className="relative z-10 flex h-full w-full items-center justify-center overflow-hidden bg-neutral-50 dark:bg-neutral-950/80"
    >
      {poster && (
        <img
          src={poster}
          alt={component.name}
          loading="lazy"
          decoding="async"
          className={cn(
            "absolute inset-0 z-10 h-full w-full object-cover transition-opacity duration-300",
            isVideoLoaded && isHovered
              ? "pointer-events-none opacity-0"
              : "opacity-100",
          )}
        />
      )}

      {isVideo && (
        <video
          key={currentSrc}
          ref={videoRef}
          src={shouldLoad ? currentSrc : undefined}
          poster={poster || undefined}
          preload={shouldLoad ? "metadata" : "none"}
          loop
          muted
          playsInline
          disablePictureInPicture
          disableRemotePlayback
          onLoadedData={() => setIsVideoLoaded(true)}
          onPlaying={() => setIsVideoLoaded(true)}
          onError={handleMediaError}
          className={cn(
            "relative z-0 h-full w-full object-cover transition-opacity duration-300",
            poster && !isVideoLoaded ? "opacity-0" : "opacity-100",
          )}
        />
      )}

      {!isVideo && !poster && (
        <img
          key={currentSrc}
          src={shouldLoad ? currentSrc : undefined}
          alt={component.name}
          loading="lazy"
          decoding="async"
          onError={handleMediaError}
          className="relative z-10 h-full w-full object-cover"
        />
      )}
    </div>
  );
}

export default function ComponentCard({
  component,
  isFeatured,
}: ComponentCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = () => {
    posthog.capture("component_card_clicked", {
      component_slug: component.slug,
      component_name: component.name,
    });
  };

  return (
    <div
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group flex h-full w-full flex-col overflow-hidden bg-transparent select-none"
    >
      <div className="relative flex aspect-video w-full items-center justify-center overflow-hidden rounded-t-3xl bg-neutral-100 dark:bg-neutral-900">
        <CardMedia
          key={component.slug}
          component={component}
          isHovered={isHovered}
        />
      </div>

      <div className="flex flex-col px-4 pt-3 pb-2">
        <div className="flex items-center justify-between gap-2">
          <span className="text-base font-semibold tracking-tight text-neutral-900 dark:text-white">
            {component.name}
          </span>
          <div className="flex items-center gap-2">
            {isFeatured ? (
              <div className="flex items-center gap-1 text-[#f6821f]">
                <span className="text-[14px] font-semibold tracking-wide">
                  New
                </span>
                <svg viewBox="0 0 16 16" fill="none" className="h-5 w-5">
                  <motion.path
                    d="M5.2168 11.2812L8.3418 8.15625L11.4668 11.2812"
                    stroke="currentColor"
                    strokeWidth="1.25"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{
                      repeat: Infinity,
                      duration: 1.2,
                      ease: "easeInOut",
                      times: [0, 0.5, 1],
                    }}
                  />
                  <motion.path
                    d="M5.2168 6.90625L8.3418 3.78125L11.4668 6.90625"
                    stroke="currentColor"
                    strokeWidth="1.25"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{
                      repeat: Infinity,
                      duration: 1.2,
                      ease: "easeInOut",
                      times: [0, 0.5, 1],
                      delay: 0.25,
                    }}
                  />
                </svg>
              </div>
            ) : (
              <svg
                className="h-4 w-4 text-neutral-400 transition-all duration-300 ease-out group-hover:translate-x-1 group-hover:text-[#f6821f] dark:text-neutral-600"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="9 18 15 12 9 6" />
              </svg>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
