"use client";

import React from "react";
import AsciiLoader from "@/components/ui/AsciiLoader";

export default function AsciiLoaderPreview() {
  return (
    <div className="flex w-full items-center justify-center p-12 select-none">
      <AsciiLoader
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
