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
      onClick={(e) => {
        e.stopPropagation();
        onChange(!checked);
      }}
      className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full p-0.5 transition-colors duration-200 ease-in-out focus:outline-none ${
        checked ? "bg-[#f6821f]" : "bg-neutral-200 dark:bg-neutral-800"
      }`}
    >
      <span
        className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-xs transition duration-200 ease-in-out ${
          checked ? "translate-x-4" : "translate-x-0"
        }`}
      />
    </button>
  );
}
