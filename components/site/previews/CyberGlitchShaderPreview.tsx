"use client";

import {
  WebglTransitionProvider,
  useWebglTransition,
} from "../../ui/PageTransitionShader";

function GlitchControl() {
  const { setShaderMode, triggerTransition } = useWebglTransition();
  return (
    <div className="flex flex-col items-center justify-center gap-6 p-10 select-none">
      <div className="text-center">
        <p className="text-sm font-semibold tracking-wide text-neutral-500 dark:text-neutral-400">
          Cyber Glitch
        </p>
        <p className="mt-1 text-xs text-neutral-400 dark:text-neutral-500">
          RGB-split chromatic aberration glitch effect.
        </p>
      </div>
      <button
        onClick={() => {
          setShaderMode("glitch");
          triggerTransition();
        }}
        className="cursor-pointer rounded-xl bg-neutral-950 px-5 py-2.5 text-xs font-bold text-white shadow-md transition-all hover:bg-neutral-800 active:scale-95 dark:bg-white dark:text-neutral-950 dark:hover:bg-neutral-100"
      >
        Trigger Glitch
      </button>
    </div>
  );
}

export default function CyberGlitchShaderPreview() {
  return (
    <WebglTransitionProvider>
      <GlitchControl />
    </WebglTransitionProvider>
  );
}
