"use client";

import { useState } from "react";

const colors = [
  { label: "black", bg: "bg-[#1a1a1a]", ring: "ring-zinc-600" },
  { label: "white", bg: "bg-white", ring: "ring-zinc-400" },
  { label: "blue", bg: "bg-sky-500", ring: "ring-sky-400" },
];

type Props = {
  onColorChange?: (color: string) => void;
};

export default function FloatingToolbar({ onColorChange }: Props) {
  const [active, setActive] = useState("black");

  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-8 flex justify-center">
      <div className="pointer-events-auto inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-[#1e1e1e]/90 px-4 py-2 shadow-xl backdrop-blur-md">
        {/* Grid icon */}
        <button className="p-1 text-zinc-500 hover:text-zinc-300 transition-colors">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <rect x="0" y="0" width="6" height="6" rx="1" fill="currentColor" opacity="0.5" />
            <rect x="8" y="0" width="6" height="6" rx="1" fill="currentColor" opacity="0.5" />
            <rect x="0" y="8" width="6" height="6" rx="1" fill="currentColor" opacity="0.5" />
            <rect x="8" y="8" width="6" height="6" rx="1" fill="currentColor" opacity="0.5" />
          </svg>
        </button>

        <div className="mx-1 h-4 w-px bg-white/10" />

        {/* Color swatches */}
        {colors.map((c) => (
          <button
            key={c.label}
            onClick={() => {
              setActive(c.label);
              onColorChange?.(c.label);
            }}
            className={`h-6 w-6 rounded-full ${c.bg} transition-all ${
              active === c.label ? `ring-2 ring-offset-1 ring-offset-[#1e1e1e] ${c.ring}` : ""
            }`}
            aria-label={c.label}
          />
        ))}
      </div>
    </div>
  );
}
