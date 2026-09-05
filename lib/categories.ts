import { components } from "./registry";

export const CATEGORY_ORDER = [
  "Shaders",
  "Social Cards",
  "Visuals",
  "Typography",
  "Page Transitions",
  "Theme Transitions",
  "Buttons",
  "Layout & Cards",
];

export const componentsByCategory = components.reduce(
  (acc, c) => {
    if (!acc[c.category]) acc[c.category] = [];
    acc[c.category].push(c);
    return acc;
  },
  {} as Record<string, typeof components>,
);
