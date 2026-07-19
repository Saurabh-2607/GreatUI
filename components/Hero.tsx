"use client";

import React from "react";
import Link from "next/link";
import DitherContainer from "./DitherContainer";

export function Hero() {
  return (
    <DitherContainer
      opacity={0.4}
      className="border-b"
    >
      <div className="flex w-full rounded-xl p-4 py-50 flex-col bg-neutral-900 items-center justify-center">
        {/* Hero Title */}
        <h1 className="max-w-4xl text-5xl font-extrabold tracking-tight text-center">
          Not Just another Component Library
        </h1>

        {/* Hero Subtitle */}
        <p className="mt-6 max-w-2xl text-base text-center text-stone-200">
          Great UI is a collection of clean, accessible, and composable React components built with Tailwind CSS. Copy, paste, ship without npm bloat.
        </p>
      </div>
    </DitherContainer>
  );
}

export default Hero;
