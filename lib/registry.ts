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
  previewFile?: string;
  previewImage?: string;
  code?: string;
  usageCode?: string;
};

export const categories: ComponentCategory[] = [
  "All",
  "Inputs",
  "Feedback",
  "Data Display",
  "Navigation",
  "Surfaces",
];

export const components: Component[] = [
  {
    slug: "button",
    name: "Button",
    category: "Inputs",
    description:
      "A versatile button component supporting multiple variants, sizes, icons, and a loading state.",
    interactionType:
      "Clickable element with hover, active, focus, and loading states.",
    dependencies: [],
    previewFile: "ButtonPreview",
    previewImage: "/previews/button.png",
    props: [
      {
        name: "variant",
        type: [
          "'primary'",
          "'secondary'",
          "'outline'",
          "'ghost'",
          "'destructive'",
        ],
        description: "The visual style variant of the button.",
        default: "'primary'",
      },
      {
        name: "size",
        type: ["'sm'", "'md'", "'lg'", "'icon'"],
        description: "The height and padding size of the button.",
        default: "'md'",
      },
      {
        name: "isLoading",
        type: ["boolean"],
        description: "If true, shows a spinner and disables user interaction.",
        default: "false",
      },
      {
        name: "leftIcon",
        type: ["React.ReactNode"],
        description: "An icon element placed to the left of the button text.",
      },
      {
        name: "rightIcon",
        type: ["React.ReactNode"],
        description: "An icon element placed to the right of the button text.",
      },
      {
        name: "disabled",
        type: ["boolean"],
        description: "Disables the button and prevents click actions.",
        default: "false",
      },
    ],
  },
];
