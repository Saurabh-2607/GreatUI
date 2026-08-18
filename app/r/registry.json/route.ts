import { NextResponse } from "next/server";
import { components } from "@/lib/registry";
import getPostHogClient from "@/lib/posthog-server";

function getComponentFileName(name: string): string {
  if (name.toLowerCase().includes("shader")) {
    return "PageTransitionShader.tsx";
  }
  return `${name.replace(/\s+/g, "")}.tsx`;
}

function getClientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return request.headers.get("x-real-ip") || "unknown";
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

  try {
    const ip = getClientIp(request);
    const posthog = getPostHogClient();
    posthog.capture({
      distinctId: ip,
      event: "cli_registry_fetch",
      properties: {
        user_agent: request.headers.get("user-agent") || "unknown",
        $ip: ip,
      },
    });
    await posthog.flush();
  } catch (e) {
    console.error("Failed to capture cli_registry_fetch event", e);
  }

  return NextResponse.json(catalog);
}
