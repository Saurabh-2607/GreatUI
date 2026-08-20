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

function cleanUsageCode(code: string): string {
  if (!code) return "";

  let cleaned = code;

  // 1. Remove useViewer import
  cleaned = cleaned.replace(
    /import\s+\{\s*useViewer\s*\}\s+from\s+["']@\/lib\/viewer-context["'];?\n?/g,
    "",
  );
  cleaned = cleaned.replace(
    /import\s+\{\s*useViewer\s*\}\s+from\s+["']\.\.\/\.\.\/lib\/viewer-context["'];?\n?/g,
    "",
  );

  // 2. Normalize component relative imports to @/components/ui/
  cleaned = cleaned.replace(
    /from\s+["']\.\.\/\.\.\/ui\/([^"']+)["']/g,
    'from "@/components/ui/$1"',
  );
  cleaned = cleaned.replace(
    /from\s+["']\.\.\/ui\/([^"']+)["']/g,
    'from "@/components/ui/$1"',
  );

  // 3. Remove const { previewContainer } = useViewer();
  cleaned = cleaned.replace(
    /const\s+\{\s*previewContainer\s*\}\s*=\s*useViewer\(\);?\n?/g,
    "",
  );

  // 4. Remove if (!previewContainer) { ... } block
  cleaned = cleaned.replace(
    /if\s*\(\s*!previewContainer\s*\)\s*\{[\s\S]*?\}\n?/g,
    "",
  );

  // 5. Remove ref setups
  cleaned = cleaned.replace(
    /const\s+scrollContainerRef\s*=\s*\{\s*current:\s*previewContainer\s*\};?\n?/g,
    "",
  );
  cleaned = cleaned.replace(
    /const\s+dummyRef\s*=\s*\{\s*current:\s*previewContainer\s*\};?\n?/g,
    "",
  );

  // 6. Remove scrollContainerRef and containerRef props from the JSX call
  cleaned = cleaned.replace(
    /scrollContainerRef\s*=\s*\{\s*(?:scrollContainerRef|dummyRef)[\s\S]*?as\s*unknown\s*as\s*React\.RefObject<[^>]+>\s*\}/g,
    "",
  );
  cleaned = cleaned.replace(
    /containerRef\s*=\s*\{\s*(?:scrollContainerRef|dummyRef)[\s\S]*?as\s*unknown\s*as\s*React\.RefObject<[^>]+>\s*\}/g,
    "",
  );

  // Also match simplified refs if they exist
  cleaned = cleaned.replace(
    /scrollContainerRef\s*=\s*\{\s*(?:scrollContainerRef|dummyRef)\s*\}/g,
    "",
  );
  cleaned = cleaned.replace(
    /containerRef\s*=\s*\{\s*(?:scrollContainerRef|dummyRef)\s*\}/g,
    "",
  );

  // Normalize newlines and filter duplicate empty lines
  const lines = cleaned.split("\n");
  const filteredLines = [];
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trimRight();
    if (line === "") {
      if (
        filteredLines.length > 0 &&
        filteredLines[filteredLines.length - 1] !== ""
      ) {
        filteredLines.push("");
      }
    } else {
      filteredLines.push(line);
    }
  }

  // Remove empty lines right after function declarations or start of blocks
  const resultLines = [];
  for (let i = 0; i < filteredLines.length; i++) {
    const line = filteredLines[i];
    if (line === "" && i > 0 && filteredLines[i - 1].endsWith("{")) {
      continue;
    }
    resultLines.push(line);
  }

  return resultLines.join("\n");
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
    usageCode: cleanUsageCode(usageCode),
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
      usageCode: cleanUsageCode(usageCode),
    };
  });
}
