import { components, type Prop } from "./registry";

export type ControlType =
  "text" | "textarea" | "boolean" | "number" | "select" | "color" | "list";

export interface ControlOption {
  label: string;
  value: string | number | boolean;
}

export interface ControlSchema {
  key: string;
  label: string;
  type: ControlType;
  defaultValue: unknown;
  options?: ControlOption[];
  min?: number;
  max?: number;
  step?: number;
  description?: string;
}

export interface ComponentPropsDefinition {
  slug: string;
  name: string;
  schemas: ControlSchema[];
  presets?: {
    name: string;
    values: Record<string, unknown>;
  }[];
  hasTiming?: boolean;
}

export const componentPropsRegistry: Record<string, ComponentPropsDefinition> =
  {
    button: {
      slug: "button",
      name: "Button",
      hasTiming: false,
      schemas: [
        {
          key: "variant",
          label: "Variant",
          type: "select",
          defaultValue: "primary",
          options: [
            { label: "Primary", value: "primary" },
            { label: "Secondary", value: "secondary" },
            { label: "Outline", value: "outline" },
            { label: "Ghost", value: "ghost" },
          ],
        },
        {
          key: "size",
          label: "Size",
          type: "select",
          defaultValue: "md",
          options: [
            { label: "Small", value: "sm" },
            { label: "Medium", value: "md" },
          ],
        },
        {
          key: "children",
          label: "Button Text",
          type: "text",
          defaultValue: "Click Me",
        },
        {
          key: "isLoading",
          label: "Loading State",
          type: "boolean",
          defaultValue: false,
        },
        {
          key: "disabled",
          label: "Disabled",
          type: "boolean",
          defaultValue: false,
        },
      ],
      presets: [
        {
          name: "Default",
          values: {
            variant: "primary",
            size: "md",
            children: "Click Me",
            isLoading: false,
            disabled: false,
          },
        },
        {
          name: "Loading",
          values: {
            variant: "primary",
            size: "md",
            children: "Processing...",
            isLoading: true,
            disabled: false,
          },
        },
        {
          name: "Destructive",
          values: {
            variant: "destructive",
            size: "md",
            children: "Delete Account",
            isLoading: false,
            disabled: false,
          },
        },
      ],
    },
  };

function getSmartNumberScale(
  val: number,
  propName: string,
  description?: string,
): { min: number; max: number; step: number } {
  const name = propName.toLowerCase();
  const desc = (description || "").toLowerCase();

  if (
    name.includes("angle") ||
    name.includes("rotate") ||
    name.includes("rotation") ||
    name.includes("tilt") ||
    desc.includes("deg")
  ) {
    return { min: -180, max: 180, step: 1 };
  }

  if (
    name.includes("opacity") ||
    name.includes("alpha") ||
    name.includes("progress")
  ) {
    return { min: 0, max: 1, step: 0.05 };
  }

  if (name.includes("scale") || name.includes("zoom")) {
    const maxVal = Math.max(2, Math.ceil(val * 2 * 10) / 10);
    return { min: 0.1, max: maxVal, step: 0.05 };
  }

  if (
    desc.includes("millisecond") ||
    desc.includes("(ms)") ||
    (val >= 100 &&
      (name.includes("duration") ||
        name.includes("delay") ||
        name.includes("interval") ||
        name.includes("time") ||
        name.includes("speed")))
  ) {
    const min = Math.max(50, Math.floor((val * 0.2) / 50) * 50);
    const max = Math.max(1000, Math.ceil((val * 2.5) / 100) * 100);
    const step = val >= 1000 ? 50 : 25;
    return { min, max, step };
  }

  if (
    name.includes("duration") ||
    name.includes("delay") ||
    name.includes("interval")
  ) {
    const max = Math.max(5, Math.ceil(val * 2.5 * 10) / 10);
    return { min: 0, max, step: val <= 1 ? 0.05 : 0.1 };
  }

  if (val > 0 && val <= 1) {
    if (val <= 0.1) {
      return { min: 0, max: Math.ceil(val * 3 * 100) / 100, step: 0.01 };
    }
    return { min: 0, max: 1, step: 0.05 };
  }

  if (val > 1 && val <= 10) {
    const isDecimal = val % 1 !== 0;
    const max = Math.max(10, Math.ceil(val * 2.5));
    return { min: 0, max, step: isDecimal ? 0.1 : 0.5 };
  }

  if (val < 0) {
    const absVal = Math.abs(val);
    const min = -Math.ceil(absVal * 2);
    const max = Math.ceil(absVal * 2);
    const step = absVal <= 1 ? 0.05 : absVal <= 10 ? 0.5 : 1;
    return { min, max, step };
  }

  if (val === 0) {
    return { min: 0, max: 100, step: 1 };
  }

  if (val <= 100) {
    const max = Math.max(100, Math.ceil((val * 2) / 10) * 10);
    return { min: 0, max, step: 1 };
  }

  if (val <= 1000) {
    const max = Math.ceil((val * 2) / 50) * 50;
    const step = val >= 500 ? 25 : 10;
    return { min: 0, max, step };
  }

  const max = Math.ceil((val * 2) / 100) * 100;
  return { min: 0, max, step: 50 };
}

function parsePropToSchema(prop: Prop): ControlSchema | null {
  const key = prop.name;
  let label = prop.name
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, (str) => str.toUpperCase());
  const unitMatch = prop.description?.match(
    /\((px|vw|vh|em|rem|%|ms|s|deg)\)/i,
  );
  if (unitMatch) {
    label = `${label} (${unitMatch[1]})`;
  }
  const typeStr = prop.type.join(" | ");

  if (
    typeStr.includes("[]") ||
    typeStr.includes("ReactNode") ||
    typeStr.includes("Element")
  ) {
    return null;
  }

  if (
    (typeStr.includes("|") &&
      !typeStr.includes("boolean") &&
      !typeStr.includes("number")) ||
    prop.type.length > 1
  ) {
    const rawOptions = prop.type.length > 1 ? prop.type : typeStr.split("|");
    const options = rawOptions
      .map((s) => s.trim().replace(/^['"]|['"]$/g, ""))
      .filter(Boolean);
    if (options.length > 1) {
      return {
        key,
        label,
        type: "select",
        defaultValue: prop.default
          ? prop.default.replace(/^["']|["']$/g, "")
          : options[0],
        options: options.map((opt) => ({ label: opt, value: opt })),
        description: prop.description,
      };
    }
  }

  if (typeStr.includes("boolean")) {
    return {
      key,
      label,
      type: "boolean",
      defaultValue: prop.default === "true",
      description: prop.description,
    };
  }

  if (typeStr.includes("number")) {
    const val = prop.default ? parseFloat(prop.default) : 0;
    const defaultVal = isNaN(val) ? 0 : val;
    const smart = getSmartNumberScale(defaultVal, key, prop.description);
    return {
      key,
      label,
      type: "number",
      defaultValue: defaultVal,
      min: prop.min ?? smart.min,
      max: prop.max ?? smart.max,
      step: prop.step ?? smart.step,
      description: prop.description,
    };
  }

  return {
    key,
    label,
    type: "text",
    defaultValue: prop.default ? prop.default.replace(/^["']|["']$/g, "") : "",
    description: prop.description,
  };
}

export function getComponentPropsSchema(
  slug: string,
): ComponentPropsDefinition {
  if (componentPropsRegistry[slug]) {
    return componentPropsRegistry[slug];
  }

  const comp = components.find((c) => c.slug === slug);
  if (!comp || !comp.props || comp.props.length === 0) {
    return { slug, name: comp?.name || slug, schemas: [] };
  }

  const schemas = comp.props
    .filter(
      (p) =>
        p.customizable !== false &&
        !p.name.toLowerCase().includes("classname") &&
        p.name !== "children" &&
        p.name !== "paths",
    )
    .map(parsePropToSchema)
    .filter((schema): schema is ControlSchema => schema !== null);

  return {
    slug,
    name: comp.name,
    hasTiming: false,
    schemas,
  };
}
