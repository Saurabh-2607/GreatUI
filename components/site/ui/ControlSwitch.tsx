"use client";

import React from "react";

interface ControlSwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
}

export function ControlSwitch({ checked, onChange }: ControlSwitchProps) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full p-0.5 transition-colors duration-200 ease-in-out focus:outline-none ${
        checked
          ? "bg-neutral-900 dark:bg-white"
          : "bg-neutral-200 dark:bg-[#222]"
      }`}
    >
      <span
        className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-sm transition duration-200 ease-in-out dark:bg-neutral-950 ${
          checked ? "translate-x-4" : "translate-x-0"
        }`}
      />
    </button>
  );
}
