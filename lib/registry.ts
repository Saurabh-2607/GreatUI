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
  {
    slug: "mobile-mockup",
    name: "MobileMockup",
    category: "Surfaces",
    description:
      "An interactive mobile device frame mockup with a realistic smartphone chassis, status bar, and WhatsApp mobile chat UI.",
    interactionType:
      "Animated message stream, interactive audio notes, and responsive dark/light mode device chassis.",
    dependencies: ["motion"],
    previewFile: "MobileMockupPreview",
    previewImage: "/previews/MobileMockupPreview.png",
    props: [
      {
        name: "headerTitle",
        type: ["string"],
        description: "Contact or group name shown in the WhatsApp header bar.",
        default: "'Taylor'",
      },
      {
        name: "headerSubtitle",
        type: ["string"],
        description: "Status or subtitle shown under the header title.",
        default: "'online'",
      },
      {
        name: "avatarUrl",
        type: ["string"],
        description: "Optional URL for the user avatar image.",
      },
      {
        name: "avatarFallback",
        type: ["string"],
        description: "Fallback text or initial if no avatar image is supplied.",
        default: "'T'",
      },
      {
        name: "messages",
        type: ["ChatMessage[]"],
        description:
          "List of chat messages to render inside the mobile screen.",
      },
      {
        name: "autoPlay",
        type: ["boolean"],
        description:
          "Whether to animate message streaming and typing indicator automatically.",
        default: "true",
      },
    ],
  },
  {
    slug: "macbook-mockup",
    name: "MacbookMockup",
    category: "Surfaces",
    description:
      "A realistic 3D Macbook Pro device frame mockup with aluminum casing, keyboard base, and dual-pane WhatsApp Web chat UI.",
    interactionType:
      "Interactive dual-pane sidebar & chat stream, voice notes, and desktop laptop frame animations.",
    dependencies: ["motion"],
    previewFile: "MacbookMockupPreview",
    previewImage: "/previews/MacbookMockupPreview.png",
    props: [
      {
        name: "headerTitle",
        type: ["string"],
        description:
          "Active chat contact or group name in WhatsApp Web header.",
        default: "'Alex (Design Lead)'",
      },
      {
        name: "headerSubtitle",
        type: ["string"],
        description: "Status or subtitle text in the chat header.",
        default: "'online'",
      },
      {
        name: "avatarUrl",
        type: ["string"],
        description: "Optional URL for the contact profile avatar.",
      },
      {
        name: "avatarFallback",
        type: ["string"],
        description: "Fallback initial for contact avatar.",
        default: "'A'",
      },
      {
        name: "messages",
        type: ["ChatMessage[]"],
        description: "Array of chat messages for the desktop chat stream.",
      },
      {
        name: "autoPlay",
        type: ["boolean"],
        description: "Toggle automated message sequence and typing state loop.",
        default: "true",
      },
    ],
  },
  {
    slug: "interactive-checklist",
    name: "InteractiveChecklist",
    category: "Feedback",
    description:
      "An interactive CI/CD pipeline protocol checklist depicting git clone, install, build, and deploy stages with custom animated status icons.",
    interactionType:
      "Sequentially executable checklist with running spin state, skipped items, error logs, and detailed step drawer toggling.",
    dependencies: ["motion"],
    previewFile: "InteractiveChecklistPreview",
    previewImage: "/previews/InteractiveChecklistPreview.png",
    props: [
      {
        name: "initialTasks",
        type: ["Task[]"],
        description:
          "Initial list of pipeline tasks containing id, title, subtitle, status, and info log attributes.",
      },
    ],
  },
];
