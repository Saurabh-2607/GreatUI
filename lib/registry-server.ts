import fs from "fs";
import path from "path";
import { components as rawComponents, type Component } from "./registry";

export function getRegistryComponent(slug: string): Component | null {
  const component = rawComponents.find((c) => c.slug === slug);
  if (!component) return null;

  let code = "";
  try {
    const filePath = path.join(
      process.cwd(),
      "components",
      "ui",
      `${component.name}.tsx`,
    );
    code = fs.readFileSync(filePath, "utf8");
  } catch (err) {
    console.error(`Error reading component file for ${component.name}:`, err);
  }

  const previewFilename = component.previewFile || `${component.name}Preview`;
  let usageCode = "";
  try {
    const previewPath = path.join(
      process.cwd(),
      "components",
      "site",
      "previews",
      `${previewFilename}.tsx`,
    );
    usageCode = fs.readFileSync(previewPath, "utf8");
  } catch (err) {
    console.error(`Error reading preview file for ${component.name}:`, err);
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
      const filePath = path.join(
        process.cwd(),
        "components",
        "ui",
        `${c.name}.tsx`,
      );
      code = fs.readFileSync(filePath, "utf8");
    } catch (err) {
      console.error(`Error reading component file for ${c.name}:`, err);
    }

    const previewFilename = c.previewFile || `${c.name}Preview`;
    let usageCode = "";
    try {
      const previewPath = path.join(
        process.cwd(),
        "components",
        "site",
        "previews",
        `${previewFilename}.tsx`,
      );
      usageCode = fs.readFileSync(previewPath, "utf8");
    } catch (err) {
      console.error(`Error reading preview file for ${c.name}:`, err);
    }

    return {
      ...c,
      code,
      usageCode,
    };
  });
}
