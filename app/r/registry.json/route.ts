import { NextResponse } from "next/server";
import { components } from "@/lib/registry";

function getComponentFileName(name: string): string {
  if (name.toLowerCase().includes("shader")) {
    return "PageTransitionShader.tsx";
  }
  return `${name.replace(/\s+/g, "")}.tsx`;
}

export async function GET() {
  const items = components.map((c) => {
    const fileName = getComponentFileName(c.name);
    return {
      name: c.slug,
      type: "registry:ui",
      title: c.name,
      description: c.description,
      dependencies: c.dependencies || [],
      files: [
        {
          path: `components/ui/${fileName}`,
          type: "registry:ui",
        },
      ],
    };
  });

  const catalog = {
    $schema: "https://ui.shadcn.com/schema/registry.json",
    name: "great-ui",
    homepage: "https://great-ui.com",
    items,
  };

  return NextResponse.json(catalog);
}
