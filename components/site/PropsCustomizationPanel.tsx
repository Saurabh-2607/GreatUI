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
  const { props, schemas, presets, setProp, applyPreset } = useProps();
  const [copiedCode, setCopiedCode] = useState(false);

  const [cached, setCached] = useState(() => ({
    schemas: schemas && schemas.length > 0 ? schemas : null,
    component,
    props,
  }));

  const hasCurrentSchemas = Boolean(schemas && schemas.length > 0);

  if (
    hasCurrentSchemas &&
    (cached.schemas !== schemas ||
      cached.component !== component ||
      cached.props !== props)
  ) {
    setCached({ schemas, component, props });
  }

  const effectiveSchemas = hasCurrentSchemas ? schemas : cached.schemas;
  const effectiveComponent = hasCurrentSchemas ? component : cached.component;
  const effectiveProps = hasCurrentSchemas ? props : cached.props;

  if (!effectiveSchemas || effectiveSchemas.length === 0) {
    return null;
  }

  const jsxCode = generateJsxCode(
    effectiveComponent.name.replace(/\s+/g, ""),
    effectiveSchemas,
    effectiveProps,
  );

  const handleCopyCode = () => {
    navigator.clipboard.writeText(jsxCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handlePropChange = (key: string, value: unknown) => {
    setProp(key, value);
    if (
      effectiveComponent.slug === "fluid-dock-carousel" &&
      key === "orientation"
    ) {
      const currentPos = effectiveProps.dockPosition;
      if (value === "vertical") {
        if (currentPos === "top" || currentPos === "bottom") {
          setProp("dockPosition", "center");
        }
      } else {
        if (currentPos === "left" || currentPos === "right") {
          setProp("dockPosition", "bottom");
        }
      }
    }
  };

  return (
    <div className="relative flex h-full w-full flex-col overflow-hidden text-neutral-900 select-none dark:text-white">
      <div className="relative flex flex-1 scrollbar-none flex-col gap-3.5 overflow-y-auto px-2 py-2">
        {presets && presets.length > 0 && (
          <div className="flex flex-col gap-1">
            <span className="px-2 text-[11px] font-semibold tracking-wider text-neutral-400 uppercase select-none dark:text-neutral-500">
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
          {effectiveSchemas.map((schema) => {
            let filteredSchema = schema;
            if (
              effectiveComponent.slug === "fluid-dock-carousel" &&
              schema.key === "dockPosition" &&
              schema.options
            ) {
              const currentOrientation =
                effectiveProps.orientation || "horizontal";
              const validValues =
                currentOrientation === "vertical"
                  ? ["left", "right", "center"]
                  : ["top", "bottom", "center"];
              filteredSchema = {
                ...schema,
                options: schema.options.filter((opt) =>
                  validValues.includes(String(opt.value)),
                ),
              };
            }
            return (
              <ControlField
                key={schema.key}
                schema={filteredSchema}
                value={effectiveProps[schema.key]}
                onChange={handlePropChange}
              />
            );
          })}
        </div>

        <div className="mt-2 flex flex-col gap-2 pt-1">
          <div className="flex items-center justify-between px-2">
            <span className="text-[11px] font-semibold tracking-wider text-neutral-400 uppercase select-none dark:text-neutral-500">
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
