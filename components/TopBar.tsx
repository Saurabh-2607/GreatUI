"use client";

import Link from "next/link";

export default function TopBar() {
  return (
    <header className="flex h-10 shrink-0 items-center justify-between border-b border-white/[0.06] px-4">
      <Link
        href="/"
        className="flex h-6 w-6 items-center justify-center rounded border border-white/[0.10] bg-white/[0.04] text-zinc-400 hover:text-zinc-200 transition-colors"
        title="Home"
      >
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
          <rect x="1" y="1" width="4" height="4" rx="0.5" fill="currentColor" opacity="0.7" />
          <rect x="7" y="1" width="4" height="4" rx="0.5" fill="currentColor" opacity="0.7" />
          <rect x="1" y="7" width="4" height="4" rx="0.5" fill="currentColor" opacity="0.4" />
          <rect x="7" y="7" width="4" height="4" rx="0.5" fill="currentColor" opacity="0.4" />
        </svg>
      </Link>

      <div className="flex items-center gap-1">
        <button className="flex h-7 w-7 items-center justify-center rounded text-zinc-500 hover:bg-white/[0.06] hover:text-zinc-300 transition-colors">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.4">
            <path d="M1 4V1h3M10 1h3v3M13 10v3h-3M4 13H1v-3" />
          </svg>
        </button>
        <button className="flex h-7 w-7 items-center justify-center rounded text-zinc-500 hover:bg-white/[0.06] hover:text-zinc-300 transition-colors">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.4">
            <path d="M4.5 3.5L1 7l3.5 3.5M9.5 3.5L13 7l-3.5 3.5" />
          </svg>
        </button>
        <button className="flex h-7 w-7 items-center justify-center rounded text-zinc-500 hover:bg-white/[0.06] hover:text-zinc-300 transition-colors">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.4">
            <circle cx="7" cy="7" r="3" />
            <path d="M7 1v1M7 12v1M1 7h1M12 7h1M3.2 3.2l.7.7M10.1 10.1l.7.7M10.1 3.2l-.7.7M3.2 10.1l.7-.7" />
          </svg>
        </button>
      </div>
    </header>
  );
}
