import { NextResponse } from "next/server";
import { components } from "@/lib/registry";
import { getRegistryComponent } from "@/lib/registry-server";
import getPostHogClient from "@/lib/posthog-server";

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

export async function GET(
  request: Request,
  { params }: { params: Promise<{ name: string }> },
) {
  const { name } = await params;

  const slug = name.endsWith(".json") ? name.slice(0, -5) : name;

  const component = components.find(
    (c) =>
      c.slug === slug ||
      c.name.toLowerCase().replace(/\s+/g, "-") === slug.toLowerCase(),
  );

  if (!component) {
    return NextResponse.json(
      { error: `Registry item "${slug}" was not found.` },
      { status: 404 },
    );
  }

  const registryComponent = getRegistryComponent(component.slug);
  if (!registryComponent || !registryComponent.code) {
    return NextResponse.json(
      { error: `Failed to load component code for "${slug}".` },
      { status: 500 },
    );
  }

  const fileName = getComponentFileName(component.name);

  const registryItem = {
    name: component.slug,
    type: "registry:ui",
    title: component.name,
    description: component.description,
    dependencies: component.dependencies || [],
    registryDependencies: [],
    files: [
      {
        path: `components/ui/${fileName}`,
        type: "registry:ui",
        content: registryComponent.code,
      },
    ],
  };

  const posthog = getPostHogClient();
  const userAgent = request.headers.get("user-agent") || "unknown";
  const distinctId =
    request.headers.get("x-posthog-distinct-id") || crypto.randomUUID();

  posthog.capture({
    distinctId: distinctId,
    event: "cli_component_download",
    properties: {
      component_slug: component.slug,
      component_name: component.name,
      user_agent: userAgent,
    },
  });

  await posthog.flush();

  return NextResponse.json(registryItem);
}
