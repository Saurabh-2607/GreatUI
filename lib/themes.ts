import { type ThemeRegistration } from "shiki";

export const greatUiLight: ThemeRegistration = {
  name: "great-ui-light",
  displayName: "Great UI Light",
  colors: {
    "editor.background": "#f5f5f5",
    "editor.foreground": "#09090b",
  },
  settings: [
    {
      scope: ["comment", "punctuation.definition.comment"],
      settings: {
        foreground: "#71717a",
        fontStyle: "italic",
      },
    },
    {
      scope: [
        "keyword",
        "storage.type",
        "storage.modifier",
        "keyword.operator.new",
        "keyword.operator.expression",
      ],
      settings: {
        foreground: "#f6821f", // Brand Orange
        fontStyle: "bold",
      },
    },
    {
      scope: [
        "entity.name.function",
        "support.function",
        "variable.function",
        "meta.function-call",
      ],
      settings: {
        foreground: "#0284c7", // Sky Blue
      },
    },
    {
      scope: ["string", "string.template", "punctuation.definition.string"],
      settings: {
        foreground: "#16a34a", // Green
      },
    },
    {
      scope: [
        "constant.numeric",
        "constant.language",
        "variable.other.constant",
        "support.constant",
      ],
      settings: {
        foreground: "#ea580c", // Darker Orange / Rust
      },
    },
    {
      scope: [
        "entity.name.type",
        "support.type",
        "support.class",
        "entity.name.class",
      ],
      settings: {
        foreground: "#b45309", // Amber
      },
    },
    {
      scope: ["entity.name.tag", "meta.tag", "punctuation.definition.tag"],
      settings: {
        foreground: "#2563eb", // Blue
      },
    },
    {
      scope: ["entity.other.attribute-name", "meta.import variable.other"],
      settings: {
        foreground: "#db2777", // Pink
      },
    },
    {
      scope: [
        "punctuation",
        "meta.brace",
        "punctuation.definition.parameters",
        "punctuation.section",
      ],
      settings: {
        foreground: "#3f3f46", // Dark Zinc
      },
    },
    {
      scope: ["variable", "variable.parameter", "variable.other"],
      settings: {
        foreground: "#09090b", // Foreground
      },
    },
  ],
};

export const greatUiDark: ThemeRegistration = {
  name: "great-ui-dark",
  displayName: "Great UI Dark",
  colors: {
    "editor.background": "#141414",
    "editor.foreground": "#ededed",
  },
  settings: [
    {
      scope: ["comment", "punctuation.definition.comment"],
      settings: {
        foreground: "#a1a1aa", // Zinc 400
        fontStyle: "italic",
      },
    },
    {
      scope: [
        "keyword",
        "storage.type",
        "storage.modifier",
        "keyword.operator.new",
        "keyword.operator.expression",
      ],
      settings: {
        foreground: "#ff9d42", // Light Brand Orange
        fontStyle: "bold",
      },
    },
    {
      scope: [
        "entity.name.function",
        "support.function",
        "variable.function",
        "meta.function-call",
      ],
      settings: {
        foreground: "#38bdf8", // Sky Light
      },
    },
    {
      scope: ["string", "string.template", "punctuation.definition.string"],
      settings: {
        foreground: "#4ade80", // Green Light
      },
    },
    {
      scope: [
        "constant.numeric",
        "constant.language",
        "variable.other.constant",
        "support.constant",
      ],
      settings: {
        foreground: "#f97316", // Orange 500
      },
    },
    {
      scope: [
        "entity.name.type",
        "support.type",
        "support.class",
        "entity.name.class",
      ],
      settings: {
        foreground: "#fbbf24", // Amber 400
      },
    },
    {
      scope: ["entity.name.tag", "meta.tag", "punctuation.definition.tag"],
      settings: {
        foreground: "#60a5fa", // Blue Light
      },
    },
    {
      scope: ["entity.other.attribute-name", "meta.import variable.other"],
      settings: {
        foreground: "#f472b6", // Pink Light
      },
    },
    {
      scope: [
        "punctuation",
        "meta.brace",
        "punctuation.definition.parameters",
        "punctuation.section",
      ],
      settings: {
        foreground: "#a1a1aa", // Light Zinc
      },
    },
    {
      scope: ["variable", "variable.parameter", "variable.other"],
      settings: {
        foreground: "#ededed", // Foreground Light
      },
    },
  ],
};
