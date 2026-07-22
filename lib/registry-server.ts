import fs from "fs";
import path from "path";
import { components as rawComponents, type Component } from "./registry";

export type ComponentWithCode = Component & { code: string };

export function getRegistryComponent(slug: string): ComponentWithCode | null {
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

  return {
    ...component,
    code,
  };
}

export function getRegistryComponents(): ComponentWithCode[] {
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
    return {
      ...c,
      code,
    };
  });
}
