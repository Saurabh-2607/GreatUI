"use client";

import React, { useState } from "react";
import { useProps } from "@/lib/PropsContext";
import { ControlField } from "./ui/ControlField";
import { ControlSelect } from "./ui/ControlSelect";
import { CopyCheckIcon } from "./Icons";
import { TextMorph } from "torph/react";
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

  const nonBooleanSchemas = effectiveSchemas.filter(
    (s) => s.type !== "boolean",
  );
  const booleanSchemas = effectiveSchemas.filter((s) => s.type === "boolean");

  return (
    <div className="relative flex h-full w-full flex-col overflow-hidden text-neutral-900 select-none dark:text-white">
      <div className="relative flex flex-1 scrollbar-none flex-col gap-3 overflow-y-auto px-2 py-2">
        {presets && presets.length > 0 && (
          <div className="flex flex-col gap-1.5 pb-1">
            <div className="px-2 py-0.5">
              <span className="text-sm font-medium text-neutral-700 select-none dark:text-neutral-300">
                Presets
              </span>
            </div>
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

        {nonBooleanSchemas.length > 0 && (
          <div className="flex flex-col gap-2.5">
            {nonBooleanSchemas.map((schema) => {
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
        )}

        {booleanSchemas.length > 0 && (
          <div className="flex flex-col gap-0.5">
            {booleanSchemas.map((schema) => (
              <ControlField
                key={schema.key}
                schema={schema}
                value={effectiveProps[schema.key]}
                onChange={handlePropChange}
              />
            ))}
          </div>
        )}

        <div className="mt-2 flex flex-col gap-2 pb-2">
          <div className="flex items-center justify-between px-2">
            <span className="text-sm font-medium text-neutral-700 select-none dark:text-neutral-300">
              Generated JSX
            </span>
            <button
              type="button"
              onClick={handleCopyCode}
              className="flex h-7 cursor-pointer items-center justify-start gap-1.5 rounded-lg px-2 text-xs font-medium text-neutral-500 transition-colors hover:bg-neutral-100 hover:text-neutral-950 dark:text-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-white"
              title="Copy code"
            >
              <CopyCheckIcon copied={copiedCode} className="size-3.5" />
              <TextMorph as="span" ease={{ stiffness: 220, damping: 22 }}>
                {copiedCode ? "Copied code" : "Copy code"}
              </TextMorph>
            </button>
          </div>
          <ShikiHighlight
            code={jsxCode}
            lang="tsx"
            className="relative !m-0 scrollbar-none overflow-auto rounded-xl border border-neutral-200/70 bg-neutral-100 p-3 text-left !font-mono font-mono text-[11.5px] leading-relaxed select-text selection:bg-[#f6821f]/30 dark:border-neutral-800/70 dark:bg-[#141414]"
          />
        </div>
      </div>
    </div>
  );
}
