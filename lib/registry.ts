export type Prop = {
  name: string;
  type: string[];
  description: string;
};

export type Component = {
  slug: string;
  name: string;
  description: string;
  interactionType: string;
  dependencies: string[];
  props: Prop[];
};

export const components: Component[] = [
  {
    slug: "folder",
    name: "Folder",
    description: "Your component description here.",
    interactionType: "Describe how users interact with this component.",
    dependencies: [],
    props: [
      {
        name: "prop",
        type: ["string"],
        description: "Prop description here.",
      },
    ],
  },
];
