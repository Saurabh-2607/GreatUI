import { NextResponse } from "next/server";
import { components } from "@/lib/registry";
import getPostHogClient from "@/lib/posthog-server";

function getComponentFileName(name: string): string {
  if (name.toLowerCase().includes("shader")) {
    return "PageTransitionShader.tsx";
  }
  return `${name.replace(/\s+/g, "")}.tsx`;
}

export async function GET(request: Request) {
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

  const posthog = getPostHogClient();
  const userAgent = request.headers.get("user-agent") || "unknown";
  const distinctId =
    request.headers.get("x-posthog-distinct-id") || crypto.randomUUID();

  posthog.capture({
    distinctId: distinctId,
    event: "cli_registry_fetch",
    properties: {
      user_agent: userAgent,
    },
  });

  await posthog.flush();

  return NextResponse.json(catalog);
}
