"use client";

import React from "react";
import {
  WebglTransitionProvider,
  useWebglTransition,
} from "@/components/ui/PageTransitionShader";

function TransitionControl() {
  const { setShaderMode, triggerTransition } = useWebglTransition();

  const handleTrigger = (mode: "ripple" | "glitch" | "vortex" | "liquid") => {
    setShaderMode(mode);
    triggerTransition();
  };

  return (
    <div className="flex flex-col items-center justify-center gap-6 p-10 select-none">
      <div className="text-center">
        <p className="text-sm font-semibold tracking-wide text-neutral-500 dark:text-neutral-400">
          WebGL Fullscreen Transition Shader
        </p>
        <p className="mt-1 text-xs text-neutral-400 dark:text-neutral-500">
          Click any button to trigger the fullscreen WebGL effect.
        </p>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-3">
        <button
          onClick={() => handleTrigger("ripple")}
          className="cursor-pointer rounded-xl bg-neutral-950 px-4.5 py-2.5 text-xs font-bold text-white shadow-md transition-all hover:bg-neutral-800 active:scale-95 dark:bg-white dark:text-neutral-950 dark:hover:bg-neutral-100"
        >
          Liquid Ripple
        </button>
        <button
          onClick={() => handleTrigger("glitch")}
          className="cursor-pointer rounded-xl bg-neutral-950 px-4.5 py-2.5 text-xs font-bold text-white shadow-md transition-all hover:bg-neutral-800 active:scale-95 dark:bg-white dark:text-neutral-950 dark:hover:bg-neutral-100"
        >
          Cyber Glitch
        </button>
        <button
          onClick={() => handleTrigger("vortex")}
          className="cursor-pointer rounded-xl bg-neutral-950 px-4.5 py-2.5 text-xs font-bold text-white shadow-md transition-all hover:bg-neutral-800 active:scale-95 dark:bg-white dark:text-neutral-950 dark:hover:bg-neutral-100"
        >
          Vortex Spiral
        </button>
        <button
          onClick={() => handleTrigger("liquid")}
          className="cursor-pointer rounded-xl bg-neutral-950 px-4.5 py-2.5 text-xs font-bold text-white shadow-md transition-all hover:bg-neutral-800 active:scale-95 dark:bg-white dark:text-neutral-950 dark:hover:bg-neutral-100"
        >
          Liquid Dissolve
        </button>
      </div>
    </div>
  );
}

export default function PageTransitionShaderPreview() {
  return (
    <WebglTransitionProvider>
      <TransitionControl />
    </WebglTransitionProvider>
  );
}
