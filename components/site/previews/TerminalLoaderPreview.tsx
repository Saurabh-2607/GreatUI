"use client";

import React from "react";
import TerminalLoader from "@/components/ui/TerminalLoader";

export default function TerminalLoaderPreview() {
  return (
    <div className="flex w-full items-center justify-center p-12 select-none">
      <TerminalLoader
        rows={5}
        cols={40}
        blockWidth={3}
        speed={50}
        color="text-rose-500"
        bgColor="bg-rose-500"
      />
    </div>
  );
}
