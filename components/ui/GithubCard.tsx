"use client";

import React, { useState, useEffect, useMemo, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { cn } from "@/lib/utils";
import { useTheme } from "@/components/site/ThemeProvider";

export interface GithubCardProps {
  username: string;
  name?: string;
  avatarUrl?: string;
  year?: number | string;
  text?: string;
  linkText?: string;
  href?: string;
  themeScheme?: "monochrome" | "green" | "blue" | "purple";
  calendarTheme?: {
    light: string[];
    dark: string[];
  };
  contributionsData?: { date: string; count: number; level: number }[];
  totalContributions?: number;
  enableLinkTilt?: boolean;
  linkTiltMaxRotate?: number;
  enableCardTilt?: boolean;
  cardTiltMaxRotate?: number;
  className?: string;
  popoverClassName?: string;
  linkClassName?: string;
  labelClassName?: string;
}

const colorSchemes = {
  monochrome: {
    light: ["#f5f5f5", "#d4d4d4", "#a3a3a3", "#737373", "#404040"],
    dark: ["#262626", "#404040", "#737373", "#a3a3a3", "#d4d4d4"],
  },
  green: {
    light: ["#ebedf0", "#9be9a8", "#40c463", "#30a14e", "#216e39"],
    dark: ["#161b22", "#0e4429", "#006d32", "#26a641", "#39d353"],
  },
  blue: {
    light: ["#f0f9ff", "#bae6fd", "#38bdf8", "#0284c7", "#0369a1"],
    dark: ["#172554", "#1e3a8a", "#1d4ed8", "#3b82f6", "#60a5fa"],
  },
  purple: {
    light: ["#faf5ff", "#e9d5ff", "#c084fc", "#9333ea", "#6b21a8"],
    dark: ["#2e1065", "#3b0764", "#581c87", "#7e22ce", "#a855f7"],
  },
};

const generateEmptyContributions = () => {
  const data = [];
  const today = new Date();
  for (let i = 118; i >= 0; i--) {
    const date = new Date(today.getTime() - i * 24 * 60 * 60 * 1000);
    data.push({
      date: date.toISOString().split("T")[0],
      count: 0,
      level: 0,
    });
  }
  return data;
};

const formatDate = (dateStr: string) => {
  if (!dateStr) return "";
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

export const GithubCard = ({
  username,
  name = "GitHub User",
  avatarUrl,
  year = 2026,
  text = "Follow me on",
  linkText = "GitHub",
  href,
  themeScheme = "monochrome",
  calendarTheme,
  contributionsData,
  totalContributions,
  enableLinkTilt = true,
  linkTiltMaxRotate = 5,
  enableCardTilt = true,
  cardTiltMaxRotate = 5,
  className,
  popoverClassName,
  linkClassName,
  labelClassName,
}: GithubCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [profile, setProfile] = useState<{ name: string; avatarUrl: string }>({
    name,
    avatarUrl: avatarUrl || `https://github.com/${username}.png`,
  });
  const [contributionsList, setContributionsList] = useState<
    { date: string; count: number; level: number }[]
  >(() => generateEmptyContributions());

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);

    fetch(`https://api.github.com/users/${username}`)
      .then((res) => {
        if (res.ok) return res.json();
        throw new Error();
      })
      .then((data) => {
        setProfile({
          name: data.name || data.login || name,
          avatarUrl:
            data.avatar_url ||
            avatarUrl ||
            `https://github.com/${username}.png`,
        });
      })
      .catch(() => {});

    if (contributionsData) {
      setContributionsList(contributionsData);
      return;
    }

    interface APIContribution {
      date: string;
      count: number;
      level: number;
    }

    interface APIData {
      contributions: APIContribution[];
    }

    fetch(`https://github-contributions-api.jogruber.de/v4/${username}`)
      .then((res) => {
        if (res.ok) return res.json();
        throw new Error();
      })
      .then((data: APIData) => {
        if (data.contributions && data.contributions.length > 0) {
          const today = new Date();
          const pastContributions = data.contributions.filter(
            (d) => new Date(d.date) <= today,
          );
          const sorted = pastContributions.sort(
            (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
          );
          setContributionsList(sorted.slice(-119));
        }
      })
      .catch(() => {});
  }, [username, name, avatarUrl, contributionsData]);

  const isDark = mounted ? theme === "dark" : true;
  const activeTheme = calendarTheme || colorSchemes[themeScheme];

  const contributions = useMemo(() => {
    if (!mounted) {
      return Array.from({ length: 119 }, () => ({
        date: "",
        count: 0,
        level: 0,
      }));
    }
    return contributionsList;
  }, [mounted, contributionsList]);

  const linkRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const [hoverType, setHoverType] = useState<"none" | "link" | "card">("none");

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 20 });

  const rotateX = useTransform(mouseYSpring, (val) => {
    const maxRotate =
      hoverType === "link" ? linkTiltMaxRotate : cardTiltMaxRotate;
    const pct = (val + 20) / 40;
    return maxRotate - pct * (2 * maxRotate);
  });
  const rotateY = useTransform(mouseXSpring, (val) => {
    const maxRotate =
      hoverType === "link" ? linkTiltMaxRotate : cardTiltMaxRotate;
    const pct = (val + 20) / 40;
    return -maxRotate + pct * (2 * maxRotate);
  });

  const handleLinkMouseMove = (e: React.MouseEvent) => {
    if (!enableLinkTilt || !linkRef.current) {
      x.set(0);
      y.set(0);
      return;
    }
    const rect = linkRef.current.getBoundingClientRect();
    const nx =
      ((e.clientX - rect.left - rect.width / 2) / (rect.width / 2)) * 20;
    const ny =
      ((e.clientY - rect.top - rect.height / 2) / (rect.height / 2)) * 20;
    x.set(nx);
    y.set(ny);
  };

  const handleCardMouseMove = (e: React.MouseEvent) => {
    if (!enableCardTilt || !cardRef.current) {
      x.set(0);
      y.set(0);
      return;
    }
    const rect = cardRef.current.getBoundingClientRect();
    const nx =
      ((e.clientX - rect.left - rect.width / 2) / (rect.width / 2)) * 20;
    const ny =
      ((e.clientY - rect.top - rect.height / 2) / (rect.height / 2)) * 20;
    x.set(nx);
    y.set(ny);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setHoverType("none");
    x.set(0);
    y.set(0);
  };

  const calculatedTotalCommits = useMemo(() => {
    if (totalContributions !== undefined) return totalContributions;
    return contributions.reduce((acc, curr) => acc + curr.count, 0);
  }, [contributions, totalContributions]);

  const profileUrl = href || `https://github.com/${username}`;

  const popoverStyle = {
    x: mouseXSpring,
    rotateX,
    rotateY,
    transformStyle: "preserve-3d" as const,
  };

  return (
    <div className={cn("flex items-center gap-1.5", className)}>
      <span
        className={cn(
          "text-lg font-medium text-neutral-900/60 transition-colors dark:text-neutral-100/60",
          labelClassName,
        )}
      >
        {text}
      </span>
      <div
        className="relative flex w-max flex-col items-center [perspective:1000px]"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
      >
        <div
          ref={linkRef}
          onMouseEnter={() => {
            setHoverType("link");
            if (!enableLinkTilt) {
              x.set(0);
              y.set(0);
            }
          }}
          onMouseMove={handleLinkMouseMove}
          className="cursor-pointer"
        >
          <a href={profileUrl} target="_blank" rel="noopener noreferrer">
            <span
              className={cn(
                "text-lg font-medium text-neutral-900/60 underline underline-offset-4 transition-all duration-300 hover:text-neutral-900 dark:text-neutral-100/60 dark:hover:text-neutral-100",
                linkClassName,
              )}
            >
              {linkText}
            </span>
          </a>
        </div>

        <motion.div
          ref={cardRef}
          onMouseEnter={() => {
            setHoverType("card");
            if (!enableCardTilt) {
              x.set(0);
              y.set(0);
            }
          }}
          onMouseMove={handleCardMouseMove}
          initial="hidden"
          style={popoverStyle}
          animate={isHovered ? "visible" : "hidden"}
          variants={{
            hidden: {
              opacity: 0,
              y: 6,
              scale: 0.98,
              filter: "blur(2px)",
              pointerEvents: "none",
              transformOrigin: "bottom center",
              transition: {
                duration: 0.15,
                ease: "easeIn",
              },
            },
            visible: {
              opacity: 1,
              y: 0,
              scale: 1,
              filter: "blur(0px)",
              pointerEvents: "auto",
              transformOrigin: "bottom center",
              transition: {
                duration: 0.22,
                ease: [0.16, 1, 0.3, 1],
              },
            },
          }}
          className={cn(
            "absolute bottom-full z-50 mb-4 w-80 rounded-2xl border border-dashed border-neutral-300 bg-white/95 p-6 shadow-xl backdrop-blur-md transition-colors after:absolute after:top-full after:left-0 after:h-4 after:w-full dark:border-neutral-800 dark:bg-neutral-950/80",
            popoverClassName,
          )}
        >
          <div className="mb-4 flex items-center gap-4">
            <img
              src={profile.avatarUrl}
              alt={`${profile.name}'s Avatar`}
              className="h-12 w-12 rounded-full border border-neutral-200 object-cover shadow-sm dark:border-neutral-700 dark:shadow-none"
            />
            <div className="flex flex-col text-left">
              <span className="text-base font-semibold text-neutral-900 transition-colors dark:text-white">
                {profile.name}
              </span>
              <a
                href={profileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-neutral-500 transition-colors hover:text-neutral-800 dark:text-neutral-400 dark:hover:text-neutral-200"
              >
                @{username}
              </a>
            </div>
          </div>

          <div className="mx-auto grid w-max grid-flow-col grid-rows-7 gap-1 select-none">
            {contributions.map((day, index) => {
              const color = isDark
                ? activeTheme.dark[day.level]
                : activeTheme.light[day.level];
              return (
                <div key={day.date || index} className="group/cell relative">
                  <div
                    style={{ backgroundColor: color }}
                    className="h-3 w-3 cursor-pointer rounded-[2.5px] transition-all duration-300 hover:z-10 hover:scale-125"
                  />
                  {mounted && day.date && (
                    <div className="pointer-events-none absolute bottom-full left-1/2 z-[60] mb-2 hidden -translate-x-1/2 rounded bg-neutral-900/95 px-2 py-1 text-[10px] font-semibold whitespace-nowrap text-white shadow-md group-hover/cell:block dark:bg-neutral-100/95 dark:text-neutral-900">
                      <span>{day.count} commits</span> on {formatDate(day.date)}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <span className="mt-3 block text-left font-mono text-xs text-neutral-500 dark:text-neutral-400">
            {mounted
              ? `${calculatedTotalCommits.toLocaleString()} contributions in ${year}`
              : "... contributions"}
          </span>
        </motion.div>
      </div>
    </div>
  );
};

export default GithubCard;

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
