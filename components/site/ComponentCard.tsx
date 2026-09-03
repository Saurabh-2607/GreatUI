"use client";

import React, { useState, useRef, useEffect } from "react";
import posthog from "posthog-js";
import { motion } from "motion/react";
import ComponentPreviewRenderer from "./ComponentPreviewRenderer";
import { type Component } from "@/lib/registry";
import { ViewerProvider } from "@/lib/viewer-context";

interface ComponentCardProps {
  component: Component;
  isFeatured?: boolean;
}

export default function ComponentCard({
  component,
  isFeatured,
}: ComponentCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

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
  }, [isHovered]);

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
      className="group flex h-full w-full flex-col bg-transparent select-none"
    >
      <motion.div
        animate={{
          paddingTop: isHovered ? "0rem" : "0.875rem",
          paddingLeft: isHovered ? "0rem" : "0.875rem",
          paddingRight: isHovered ? "0rem" : "0.875rem",
        }}
        transition={{ duration: 0.3, ease: [0.25, 1, 0.5, 1] }}
        className="relative flex h-56 w-full items-center justify-center overflow-hidden bg-neutral-100/50 pb-0 dark:bg-neutral-900/20"
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.12] dark:opacity-[0.08]"
          style={{
            backgroundImage: `
              repeating-linear-gradient(
                -45deg,
                #f6821f 0,
                #f6821f 1px,
                transparent 1px,
                transparent 10px
              )
            `,
          }}
        />

        {component.preview ? (
          <motion.div
            animate={{
              borderTopLeftRadius: isHovered ? "0px" : "16px",
              borderTopRightRadius: isHovered ? "0px" : "16px",
            }}
            transition={{ duration: 0.3, ease: [0.25, 1, 0.5, 1] }}
            className="relative z-10 flex h-full w-full items-center justify-center overflow-hidden bg-neutral-50 transition-colors duration-300 group-hover:border-transparent dark:bg-neutral-950/80"
          >
            {component.preview.endsWith(".mp4") ? (
              <video
                ref={videoRef}
                src={component.preview}
                loop
                muted
                playsInline
                className="relative z-10 h-full w-full object-cover"
              />
            ) : (
              <img
                src={component.preview}
                alt={component.name}
                className="relative z-10 h-full w-full scale-120 object-cover"
              />
            )}
          </motion.div>
        ) : (
          <div className="pointer-events-none relative z-10 flex w-full items-center justify-center">
            <ViewerProvider>
              <ComponentPreviewRenderer slug={component.slug} />
            </ViewerProvider>
          </div>
        )}
      </motion.div>

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
