"use client";

import React from "react";
import Container from "./Container";
import { IconPlus } from "@tabler/icons-react";

export function Sponsors() {
  return (
    <div className="relative w-full">
      {/* Horizontal Dashed Top Border */}
      <div
        className="absolute top-0 left-0 right-0 h-px pointer-events-none select-none z-20"
        style={{
          backgroundImage: "linear-gradient(to right, var(--color-border-100) 50%, transparent 50%)",
          backgroundSize: "32px 1px",
          backgroundRepeat: "repeat-x",
        }}
      />

      <Container>
        <div className="grid grid-cols-1 sm:grid-cols-3 w-full">
          {/* Sponsor Slot 1 */}
          <a
            href="https://github.com/sponsors/Saurabh-2607"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col py-8 items-center justify-center gap-2 border-x-[1.5px] border-neutral-800 h-full cursor-pointer"
          >
            <IconPlus className="h-5 w-5 text-neutral-400 group-hover:text-[#f6821f] transition-colors" />
            <span className="text-sm font-semibold tracking-wide">Place your logo here</span>
          </a>
          <a
            href="https://github.com/sponsors/Saurabh-2607"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col py-8 items-center justify-center gap-2 border-x-[1.5px] border-neutral-800 h-full cursor-pointer"
          >
            <IconPlus className="h-5 w-5 text-neutral-400 group-hover:text-[#f6821f] transition-colors" />
            <span className="text-sm font-semibold tracking-wide">Place your logo here</span>
          </a>
          <a
            href="https://github.com/sponsors/Saurabh-2607"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col py-8 items-center justify-center gap-2 border-x-[1.5px] border-neutral-800 h-full cursor-pointer"
          >
            <IconPlus className="h-5 w-5 text-neutral-400 group-hover:text-[#f6821f] transition-colors" />
            <span className="text-sm font-semibold tracking-wide">Place your logo here</span>
          </a>


        </div>
      </Container>
    </div>
  );
}

export default Sponsors;
