import { components } from "./registry";

export const CATEGORY_ORDER = [
  "Shaders",
  "Page Transitions",
  "Theme Transitions",
  "Typography",
  "Buttons",
  "Layout & Cards",
  "Social Cards",
  "Visuals",
];

export const componentsByCategory = components.reduce(
  (acc, c) => {
    if (!acc[c.category]) acc[c.category] = [];
    acc[c.category].push(c);
    return acc;
  },
  {} as Record<string, typeof components>,
);
