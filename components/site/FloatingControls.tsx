"use client";

import React from "react";
import {
  MinimizeIcon,
  CircleArrowOutUpRightIcon,
  CodeXmlIcon,
  LockIcon,
  CommandIcon,
  ToggleSidebarIcon,
} from "./Icons";

export function FloatingControls() {
  return (
    <>
      <section className="fc border-foreground/5 bg-muted2 fixed top-[24px] right-[24px] z-[99] gap-1 rounded-2xl border p-1.5 select-none">
        <div className="bg-muted3 flex size-8 items-center justify-center rounded-[16px] lg:hidden">
          <button type="button" className="fc size-full">
            <a
              href="#info"
              className="fc size-full cursor-pointer transition-all ease-in-out active:scale-95"
            >
              <MinimizeIcon className="size-4" />
            </a>
            <span className="sr-only">Show Info</span>
          </button>
        </div>

        <div className="bg-muted3 hidden size-8 items-center justify-center rounded-[16px] lg:flex">
          <button type="button" className="fc size-full rounded-2xl">
            <span className="fc size-full cursor-pointer transition-all ease-in-out active:scale-95">
              <MinimizeIcon className="size-4" />
            </span>
            <span className="sr-only">Show Info</span>
          </button>
        </div>

        <div className="bg-muted3 flex size-8 items-center justify-center rounded-[16px]">
          <button type="button" className="fc size-full rounded-2xl">
            <a
              target="_blank"
              className="fc size-full cursor-pointer rounded-2xl transition-all ease-in-out active:scale-95"
              href="/v1/preview/skiper1"
              rel="noopener noreferrer"
            >
              <CircleArrowOutUpRightIcon className="size-4" />
            </a>
            <span className="sr-only">full page Preview </span>
          </button>
        </div>

        <div className="bg-muted3 relative flex size-8 items-center justify-center rounded-[16px] active:scale-95">
          <button type="button" className="fc size-full rounded-2xl">
            <CodeXmlIcon className="size-4" />
            <p className="absolute -top-2 -right-1 size-5 rounded-full bg-sky-500/10 p-[4px] text-xs text-sky-500">
              <LockIcon className="size-full" />
            </p>
            <span className="sr-only">Pro Login Required</span>
          </button>
        </div>

        <div className="bg-muted3 flex size-8 items-center justify-center rounded-[16px]">
          <button type="button" className="fc size-full rounded-2xl">
            <span className="fc ac size-full cursor-pointer transition-all ease-in-out active:scale-95">
              <CommandIcon className="size-4" />
            </span>
            <span className="sr-only">Command + K</span>
          </button>
          <div
            data-slot="dialog-header"
            className="sr-only flex flex-col gap-2 text-center sm:text-left"
          >
            <h2
              id="radix-_r_a_"
              data-slot="dialog-title"
              className="text-lg leading-none font-semibold"
            >
              Command Palette
            </h2>
            <p
              id="radix-_r_b_"
              data-slot="dialog-description"
              className="text-muted-foreground text-sm"
            >
              Search for a command to run...
            </p>
          </div>
        </div>
      </section>

      <span
        className="fc bg-background fixed top-0 left-4 z-21 mt-[35.5px] rounded-xl"
        style={{
          width: "42px",
          height: "42px",
          transform: "translateX(10px) translateY(-10px)",
        }}
      >
        <button type="button">
          <div className="text-foreground/50 flex size-full cursor-pointer items-center justify-center">
            <div className="relative grid cursor-pointer items-center justify-center">
              <ToggleSidebarIcon className="h-4 w-4" />
              <div
                className="bg-background absolute left-[3px] h-[10px] w-[1.5px] rounded-[1px]"
                style={{ width: "1.5px" }}
              />
            </div>
          </div>
          <span className="sr-only">Toggle Sidebar</span>
        </button>
      </span>
    </>
  );
}

export default FloatingControls;
