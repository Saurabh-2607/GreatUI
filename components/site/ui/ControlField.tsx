"use client";

import React from "react";
import { type ControlSchema } from "@/lib/propsRegistry";
import { ControlSwitch } from "./ControlSwitch";
import { ControlSelect } from "./ControlSelect";
import { ControlSlider } from "./ControlSlider";
import { ControlInput } from "./ControlInput";

interface ControlFieldProps {
  schema: ControlSchema;
  value: unknown;
  onChange: (key: string, value: unknown) => void;
}

export function ControlField({ schema, value, onChange }: ControlFieldProps) {
  const currentValue = value !== undefined ? value : schema.defaultValue;

  const renderInput = () => {
    switch (schema.type) {
      case "boolean":
        return (
          <ControlSwitch
            checked={Boolean(currentValue)}
            onChange={(val) => onChange(schema.key, val)}
          />
        );
      case "select":
        return (
          <ControlSelect
            value={String(currentValue ?? "")}
            options={schema.options || []}
            onChange={(val) => onChange(schema.key, val)}
          />
        );
      case "number":
        return (
          <ControlSlider
            label={schema.label}
            value={Number(currentValue)}
            min={schema.min}
            max={schema.max}
            step={schema.step}
            onChange={(val) => onChange(schema.key, val)}
          />
        );
      case "color":
        return (
          <ControlInput
            type="color"
            value={String(currentValue || "#000000")}
            onChange={(val) => onChange(schema.key, val)}
          />
        );
      case "text":
      default:
        return (
          <ControlInput
            type="text"
            value={String(currentValue || "")}
            onChange={(val) => onChange(schema.key, val)}
          />
        );
    }
  };

  if (schema.type === "number") {
    return <div className="w-full">{renderInput()}</div>;
  }

  if (schema.type === "boolean") {
    return (
      <div
        onClick={() => onChange(schema.key, !Boolean(currentValue))}
        className="group flex h-8.5 cursor-pointer items-center justify-between rounded-lg px-2 transition-colors hover:bg-neutral-100/70 dark:hover:bg-neutral-900/60"
      >
        <span className="text-sm font-medium text-neutral-600 transition-colors select-none group-hover:text-neutral-950 dark:text-neutral-400 dark:group-hover:text-white">
          {schema.label}
        </span>
        <ControlSwitch
          checked={Boolean(currentValue)}
          onChange={(val) => onChange(schema.key, val)}
        />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-1.5 select-none">
      <div className="px-2 py-0.5">
        <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
          {schema.label}
        </span>
      </div>
      <div>{renderInput()}</div>
    </div>
  );
}
