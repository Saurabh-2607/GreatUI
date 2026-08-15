import fs from "fs";
import path from "path";
import { components as rawComponents, type Component } from "./registry";

function getComponentFileName(name: string): string {
  if (name.toLowerCase().includes("shader")) {
    return "PageTransitionShader.tsx";
  }
  let cleaned = name.replace(/\s+/g, "");
  if (cleaned.startsWith("ASCII")) {
    cleaned = "Ascii" + cleaned.substring(5);
  }
  return `${cleaned}.tsx`;
}

function getPreviewFileName(previewFile?: string, name?: string): string {
  if (previewFile) {
    return `${previewFile}.tsx`;
  }
  if (!name) return "";
  return `${name.replace(/\s+/g, "")}Preview.tsx`;
}

export function getRegistryComponent(slug: string): Component | null {
  const component = rawComponents.find((c) => c.slug === slug);
  if (!component) return null;

  let code = "";
  try {
    const fileName = getComponentFileName(component.name);
    const filePath = path.join(process.cwd(), "components", "ui", fileName);
    code = fs.readFileSync(filePath, "utf8");
  } catch (err) {
    console.error(`Error reading component file for ${component.name}:`, err);
  }

  const previewFile = getPreviewFileName(component.previewFile, component.name);
  let usageCode = component.usageCode || "";
  if (!usageCode) {
    try {
      const previewPath = path.join(
        process.cwd(),
        "components",
        "site",
        "previews",
        previewFile,
      );
      usageCode = fs.readFileSync(previewPath, "utf8");
    } catch (err) {
      console.error(`Error reading preview file for ${component.name}:`, err);
    }
  }

  return {
    ...component,
    code,
    usageCode,
  };
}

export function getRegistryComponents(): Component[] {
  return rawComponents.map((c) => {
    let code = "";
    try {
      const fileName = getComponentFileName(c.name);
      const filePath = path.join(process.cwd(), "components", "ui", fileName);
      code = fs.readFileSync(filePath, "utf8");
    } catch (err) {
      console.error(`Error reading component file for ${c.name}:`, err);
    }

    const previewFile = getPreviewFileName(c.previewFile, c.name);
    let usageCode = c.usageCode || "";
    if (!usageCode) {
      try {
        const previewPath = path.join(
          process.cwd(),
          "components",
          "site",
          "previews",
          previewFile,
        );
        usageCode = fs.readFileSync(previewPath, "utf8");
      } catch (err) {
        console.error(`Error reading preview file for ${c.name}:`, err);
      }
    }

    return {
      ...c,
      code,
      usageCode,
    };
  });
}
