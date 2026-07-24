"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useTheme } from "@/components/site/ThemeProvider";
import { cn } from "@/lib/utils";

export interface VinylAlbumCardProps {
  title?: string;
  artist?: string;
  releaseType?: string;
  year?: string;
  coverImage?: string;
}

export default function VinylAlbumCard({
  title = "Crashing Worlds",
  artist = "The Bebos",
  releaseType = "Single",
  year = "2057",
  coverImage = "https://ik.imagekit.io/ybq4azred/greatui/album_art.png",
}: VinylAlbumCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  const isDarkMode = mounted ? theme === "dark" : true;

  return (
    <div
      className="group relative flex h-[500px] w-[500px] flex-col items-center justify-center select-none"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative z-10 flex h-72 w-72 items-center justify-center">
        <motion.div
          className={cn(
            "absolute flex h-72 w-72 items-center justify-center overflow-hidden rounded-full border border-neutral-800 transition-colors duration-300",
            isDarkMode
              ? "bg-[#e5e5e5] bg-gradient-to-tr from-cyan-400/10 via-pink-400/10 to-yellow-400/10"
              : "bg-black",
          )}
          initial={{ x: 0, rotate: 0 }}
          animate={{
            x: isHovered ? 140 : 0,
            rotate: isHovered ? 180 : 0,
          }}
          transition={{ type: "spring", stiffness: 80, damping: 15, mass: 1 }}
        >
          <div
            className={cn(
              "absolute inset-1 rounded-full border",
              isDarkMode ? "border-white/20" : "border-[#1a1a1a]",
            )}
          />
          <div
            className={cn(
              "absolute inset-2 rounded-full border",
              isDarkMode ? "border-white/20" : "border-[#111]",
            )}
          />
          <div
            className={cn(
              "absolute inset-4 rounded-full border",
              isDarkMode ? "border-white/20" : "border-[#1a1a1a]",
            )}
          />
          <div
            className={cn(
              "absolute inset-6 rounded-full border",
              isDarkMode ? "border-white/20" : "border-[#111]",
            )}
          />
          <div
            className={cn(
              "absolute inset-8 rounded-full border",
              isDarkMode ? "border-white/20" : "border-[#1a1a1a]",
            )}
          />
          <div
            className={cn(
              "absolute inset-10 rounded-full border",
              isDarkMode ? "border-white/20" : "border-[#111]",
            )}
          />
          <div
            className={cn(
              "absolute inset-12 rounded-full border",
              isDarkMode ? "border-white/20" : "border-[#1a1a1a]",
            )}
          />
          <div
            className={cn(
              "absolute inset-16 rounded-full border",
              isDarkMode ? "border-white/20" : "border-[#111]",
            )}
          />
          <div
            className={cn(
              "absolute inset-20 rounded-full border",
              isDarkMode ? "border-white/20" : "border-[#1a1a1a]",
            )}
          />
          <div
            className={cn(
              "absolute inset-24 rounded-full border",
              isDarkMode ? "border-white/20" : "border-[#111]",
            )}
          />
          <div
            className={cn(
              "absolute inset-28 rounded-full border",
              isDarkMode ? "border-white/20" : "border-[#1a1a1a]",
            )}
          />

          <div className="relative flex h-24 w-24 items-center justify-center overflow-hidden rounded-full bg-white">
            <img
              src={coverImage}
              alt="label"
              className="absolute inset-0 h-full w-full scale-[1.05] object-cover"
            />
            <div className="z-10 h-3 w-3 rounded-full bg-[#0f0f0f] shadow-inner ring-1 ring-black/50" />
            <div className="absolute inset-0 rounded-full ring-2 inset-ring ring-black/20" />
          </div>

          <div
            className={cn(
              "pointer-events-none absolute inset-0 rotate-45 bg-gradient-to-tr mix-blend-overlay",
              isDarkMode
                ? "from-cyan-400/30 via-pink-400/30 to-yellow-400/30"
                : "from-transparent via-white/10 to-transparent",
            )}
          />
          <div
            className={cn(
              "pointer-events-none absolute inset-0 -rotate-45 bg-gradient-to-br mix-blend-overlay",
              isDarkMode
                ? "from-cyan-400/20 via-pink-400/20 to-yellow-400/20"
                : "from-transparent via-white/5 to-transparent",
            )}
          />
        </motion.div>

        <motion.div
          className={cn("absolute z-20 h-72 w-72 overflow-hidden rounded-xl")}
          initial={{ rotate: 0, scale: 1, x: 0 }}
          animate={{
            rotate: isHovered ? -4 : 0,
            scale: isHovered ? 0.98 : 1,
            x: isHovered ? -20 : 0,
          }}
          transition={{ type: "spring", stiffness: 150, damping: 20 }}
        >
          <img
            src={coverImage}
            alt="Album cover"
            className="absolute inset-0 h-full w-full scale-[1.05] object-cover"
          />
        </motion.div>
      </div>

      <div className="z-20 mt-8 flex w-72 flex-col">
        <h3
          className={cn(
            "text-2xl font-bold tracking-tight transition-colors",
            isDarkMode ? "text-white" : "text-neutral-900",
          )}
        >
          {title}
        </h3>
        <p
          className={cn(
            "mt-1 text-lg font-medium transition-colors",
            isDarkMode ? "text-neutral-400" : "text-neutral-500",
          )}
        >
          {artist} &bull; {releaseType} &bull; {year}
        </p>
      </div>
    </div>
  );
}
