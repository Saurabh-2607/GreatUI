"use client";

import Image from "next/image";
import Link from "next/link";

export default function TopBar() {
  return (
    <header className="flex h-10 shrink-0 items-center justify-between border-b border-white/[0.06] px-4">
      <Link href="/" className="flex items-center gap-2">
        <Image
          src="/Great-UI-logo.svg"
          alt="Great UI logo"
          width={20}
          height={20}
        />
        <span className="text-sm font-semibold text-white">Great UI</span>
      </Link>

      <div className="flex items-center gap-1">
        <button className="flex h-7 w-7 items-center justify-center rounded text-zinc-500 transition-colors hover:bg-white/[0.06] hover:text-zinc-300">
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.4"
          >
            <path d="M1 4V1h3M10 1h3v3M13 10v3h-3M4 13H1v-3" />
          </svg>
        </button>
        <button className="flex h-7 w-7 items-center justify-center rounded text-zinc-500 transition-colors hover:bg-white/[0.06] hover:text-zinc-300">
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.4"
          >
            <path d="M4.5 3.5L1 7l3.5 3.5M9.5 3.5L13 7l-3.5 3.5" />
          </svg>
        </button>
        <button className="flex h-7 w-7 items-center justify-center rounded text-zinc-500 transition-colors hover:bg-white/[0.06] hover:text-zinc-300">
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.4"
          >
            <circle cx="7" cy="7" r="3" />
            <path d="M7 1v1M7 12v1M1 7h1M12 7h1M3.2 3.2l.7.7M10.1 10.1l.7.7M10.1 3.2l-.7.7M3.2 10.1l.7-.7" />
          </svg>
        </button>
      </div>
    </header>
  );
}
