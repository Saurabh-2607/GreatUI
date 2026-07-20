export type Prop = {
  name: string;
  type: string[];
  description: string;
  default?: string;
};

export type ComponentCategory =
  "All" | "Inputs" | "Feedback" | "Data Display" | "Navigation" | "Surfaces";

export type Component = {
  slug: string;
  name: string;
  category: ComponentCategory;
  description: string;
  interactionType: string;
  dependencies: string[];
  props: Prop[];
  code: string;
};

export const categories: ComponentCategory[] = [
  "All",
  "Inputs",
  "Feedback",
  "Data Display",
  "Navigation",
  "Surfaces",
];

export const components: Component[] = [];
