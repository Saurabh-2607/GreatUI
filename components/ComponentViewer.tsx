"use client";

import { useState } from "react";
import Link from "next/link";
import Sidebar from "@/components/Sidebar";
import PropsPanel from "@/components/PropsPanel";
import { type Component } from "@/lib/registry";

interface ComponentViewerProps {
  component: Component;
  components: Component[];
}

export default function ComponentViewer({ component }: ComponentViewerProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDocsOpen, setIsDocsOpen] = useState(true);

  return (
    <div className="relative flex h-screen flex-col overflow-hidden bg-[#0d0d0d] p-6 text-white">
      <div className="absolute top-6 left-1/2 z-30 flex -translate-x-1/2 items-center gap-4 rounded-full border border-white/[0.08] bg-zinc-950/85 px-5 py-2.5 shadow-2xl backdrop-blur-xl">
        <Link
          href="/"
          className="text-xs font-semibold tracking-wide text-white hover:text-zinc-300"
        >
          Great UI
        </Link>

        <div className="h-4 w-[1px] bg-white/10" />

        <button
          onClick={() => setIsSidebarOpen(true)}
          className="cursor-pointer rounded-full border border-white/[0.05] bg-white/[0.04] px-4 py-1.5 text-xs font-medium text-zinc-300 hover:bg-white/[0.08] hover:text-white"
        >
          Browse Components
        </button>

        <button
          onClick={() => setIsDocsOpen(!isDocsOpen)}
          className={`cursor-pointer rounded-full border px-4 py-1.5 text-xs font-medium ${
            isDocsOpen
              ? "border-[#e0731a] bg-[#e0731a] text-white shadow-lg shadow-orange-500/10 hover:bg-[#c96213]"
              : "border-white/[0.05] bg-white/[0.04] text-zinc-300 hover:bg-white/[0.08] hover:text-white"
          }`}
        >
          {isDocsOpen ? "Hide Docs" : "Show Docs"}
        </button>
      </div>

      <div
        className={`absolute inset-0 z-40 ${
          isSidebarOpen ? "pointer-events-auto" : "pointer-events-none hidden"
        }`}
      >
        <div
          onClick={() => setIsSidebarOpen(false)}
          className="absolute inset-0 cursor-pointer rounded-2xl bg-black/60"
        />

        <div
          className={`absolute top-6 bottom-6 left-6 z-50 w-72 overflow-hidden rounded-2xl border border-white/[0.06] bg-[#141414] shadow-2xl ${
            isSidebarOpen ? "block" : "hidden"
          }`}
        >
          <Sidebar
            activeSlug={component.slug}
            onClose={() => setIsSidebarOpen(false)}
          />
        </div>
      </div>

      <div
        className={`relative z-10 flex flex-1 overflow-hidden ${
          isDocsOpen ? "gap-6" : "gap-0"
        }`}
      >
        <div
          className={`flex h-full shrink-0 flex-col ${
            isDocsOpen
              ? "w-full lg:w-1/2"
              : "pointer-events-none w-0 overflow-hidden"
          }`}
        >
          <div className="h-full w-full overflow-hidden rounded-2xl border border-white/[0.06] bg-[#141414] shadow-xl">
            <PropsPanel component={component} />
          </div>
        </div>

        <section className="relative flex h-full flex-1 flex-col items-center justify-center overflow-hidden rounded-2xl border border-white/[0.06] bg-[#141414] p-8 shadow-xl">
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#ffffff01_1px,transparent_1px),linear-gradient(to_bottom,#ffffff01_1px,transparent_1px)] bg-[size:32px_32px]" />

          <div className="relative z-10 max-w-sm text-center select-none">
            <p className="mb-3 text-[10px] font-semibold tracking-widest text-zinc-500 uppercase">
              Preview Panel
            </p>
            <h2 className="mb-2 text-2xl font-bold tracking-tight text-white">
              {component.name}
            </h2>
            <p className="text-sm leading-relaxed text-zinc-400">
              Interactive preview loads here. Check documentation on the left to
              see available states and props.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
