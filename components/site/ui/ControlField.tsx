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

  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center justify-between gap-3 px-2 py-0.5">
        <span className="text-[11px] font-semibold tracking-wider text-neutral-400 uppercase select-none dark:text-neutral-500">
          {schema.label}
        </span>
        {schema.type === "boolean" && renderInput()}
      </div>
      {schema.type !== "boolean" && <div>{renderInput()}</div>}
    </div>
  );
}
