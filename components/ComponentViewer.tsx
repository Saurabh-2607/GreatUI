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

export default function ComponentViewer({
  component,
  components,
}: ComponentViewerProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDocsOpen, setIsDocsOpen] = useState(true);

  return (
    <div className="relative flex h-screen flex-col overflow-hidden bg-[#0d0d0d] text-white p-6">
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
          className="rounded-full bg-white/[0.04] px-4 py-1.5 text-xs font-medium text-zinc-300 border border-white/[0.05] hover:bg-white/[0.08] hover:text-white cursor-pointer"
        >
          Browse Components
        </button>

        <button
          onClick={() => setIsDocsOpen(!isDocsOpen)}
          className={`rounded-full px-4 py-1.5 text-xs font-medium border cursor-pointer ${isDocsOpen
            ? "bg-[#e0731a] hover:bg-[#c96213] border-[#e0731a] text-white shadow-lg shadow-orange-500/10"
            : "bg-white/[0.04] hover:bg-white/[0.08] border-white/[0.05] text-zinc-300 hover:text-white"
            }`}
        >
          {isDocsOpen ? "Hide Docs" : "Show Docs"}
        </button>
      </div>

      <div
        className={`absolute inset-0 z-40 ${isSidebarOpen
          ? "pointer-events-auto"
          : "pointer-events-none hidden"
          }`}
      >
        <div
          onClick={() => setIsSidebarOpen(false)}
          className="absolute inset-0 bg-black/60 cursor-pointer rounded-2xl"
        />

        <div
          className={`absolute top-6 bottom-6 left-6 z-50 w-72 bg-[#141414] shadow-2xl border border-white/[0.06] rounded-2xl overflow-hidden ${isSidebarOpen
            ? "block"
            : "hidden"
            }`}
        >
          <Sidebar
            activeSlug={component.slug}
            onClose={() => setIsSidebarOpen(false)}
          />
        </div>
      </div>

      <div className={`flex flex-1 overflow-hidden relative z-10 ${isDocsOpen ? "gap-6" : "gap-0"
        }`}>
        <div
          className={`h-full flex flex-col shrink-0 ${isDocsOpen
            ? "w-full lg:w-1/2"
            : "w-0 overflow-hidden pointer-events-none"
            }`}
        >
          <div className="h-full w-full overflow-hidden rounded-2xl border border-white/[0.06] bg-[#141414] shadow-xl">
            <PropsPanel component={component} />
          </div>
        </div>

        <section className="flex-1 h-full rounded-2xl border border-white/[0.06] bg-[#141414] shadow-xl flex flex-col items-center justify-center p-8 overflow-hidden relative">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff01_1px,transparent_1px),linear-gradient(to_bottom,#ffffff01_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

          <div className="text-center select-none relative z-10 max-w-sm">
            <p className="text-[10px] font-semibold uppercase tracking-widest text-zinc-500 mb-3">
              Preview Panel
            </p>
            <h2 className="text-2xl font-bold tracking-tight text-white mb-2">
              {component.name}
            </h2>
            <p className="text-sm text-zinc-400 leading-relaxed">
              Interactive preview loads here. Check documentation on the left to see available states and props.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
