"use client";

import React, { useState } from "react";
import { useProps } from "@/lib/PropsContext";
import { ControlField } from "./ui/ControlField";
import { ControlSelect } from "./ui/ControlSelect";
import { CopyIcon, CheckIcon } from "./Icons";
import ShikiHighlight from "./ShikiHighlight";
import { type Component } from "@/lib/registry";
import { type ControlSchema } from "@/lib/propsRegistry";

interface PropsCustomizationPanelProps {
  component: Component;
}

export function generateJsxCode(
  componentName: string,
  schemas: ControlSchema[],
  props: Record<string, unknown>,
): string {
  const propLines: string[] = [];

  schemas.forEach((schema) => {
    const val = props[schema.key] ?? schema.defaultValue;
    if (val === undefined || val === "") return;
    if (schema.key.toLowerCase().includes("classname")) return;

    if (typeof val === "boolean") {
      if (val) propLines.push(`  ${schema.key}`);
      else propLines.push(`  ${schema.key}={false}`);
    } else if (typeof val === "number") {
      propLines.push(`  ${schema.key}={${val}}`);
    } else if (typeof val === "string") {
      propLines.push(`  ${schema.key}="${val}"`);
    } else {
      propLines.push(`  ${schema.key}={${JSON.stringify(val)}}`);
    }
  });

  if (propLines.length === 0) {
    return `<${componentName} />`;
  }

  if (propLines.length <= 2) {
    return `<${componentName} ${propLines.map((l) => l.trim()).join(" ")} />`;
  }

  return `<${componentName}\n${propLines.join("\n")}\n/>`;
}

export default function PropsCustomizationPanel({
  component,
}: PropsCustomizationPanelProps) {
  const { props, schemas, presets, setProp, applyPreset, resetProps } =
    useProps();
  const [copiedCode, setCopiedCode] = useState(false);

  if (!schemas || schemas.length === 0) {
    return null;
  }

  const jsxCode = generateJsxCode(
    component.name.replace(/\s+/g, ""),
    schemas,
    props,
  );

  const handleCopyCode = () => {
    navigator.clipboard.writeText(jsxCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <div className="flex h-full w-full flex-col overflow-hidden text-neutral-900 select-none dark:text-white">
      <div className="sticky top-0 z-10 flex h-12 shrink-0 items-center justify-between bg-transparent px-4">
        <span className="text-[13px] font-medium text-neutral-900 dark:text-white">
          Props
        </span>
        <button
          type="button"
          onClick={resetProps}
          className="cursor-pointer text-[12px] font-medium text-neutral-500 transition-colors hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white"
        >
          Reset
        </button>
      </div>

      <div className="flex flex-1 scrollbar-none flex-col gap-3.5 overflow-y-auto p-4">
        {presets && presets.length > 0 && (
          <div className="flex flex-col gap-1.5">
            <span className="text-[12px] font-medium text-neutral-600 dark:text-neutral-400">
              Presets
            </span>
            <ControlSelect
              options={presets.map((p) => ({
                label: p.name,
                value: p.name,
              }))}
              value={
                presets.find((p) =>
                  Object.entries(p.values).every(([k, v]) => props[k] === v),
                )?.name || ""
              }
              onChange={(val) => {
                const selected = presets?.find((p) => p.name === val);
                if (selected) applyPreset(selected.values);
              }}
            />
          </div>
        )}

        <div className="flex flex-col gap-3">
          {schemas.map((schema) => (
            <ControlField
              key={schema.key}
              schema={schema}
              value={props[schema.key]}
              onChange={setProp}
            />
          ))}
        </div>

        <div className="mt-2 flex flex-col gap-2 pt-1">
          <div className="flex items-center justify-between">
            <span className="text-[12px] font-medium text-neutral-600 dark:text-neutral-400">
              Generated JSX
            </span>
            <button
              type="button"
              onClick={handleCopyCode}
              className="cursor-pointer p-1 text-neutral-400 transition-colors hover:text-neutral-900 dark:hover:text-white"
              title="Copy code"
            >
              {copiedCode ? (
                <CheckIcon className="h-3.5 w-3.5 text-green-500" />
              ) : (
                <CopyIcon className="h-3.5 w-3.5" />
              )}
            </button>
          </div>
          <ShikiHighlight
            code={jsxCode}
            lang="tsx"
            className="relative !m-0 scrollbar-none overflow-auto rounded-xl border border-neutral-200/60 bg-neutral-100/60 p-3 text-left !font-mono font-mono text-[11px] leading-5 select-text dark:border-neutral-800/60 dark:bg-neutral-900/40"
          />
        </div>
      </div>
    </div>
  );
}
