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

function getClientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return request.headers.get("x-real-ip") || "unknown";
}

export async function GET(
  request: Request,
  { params }: { params: Promise<{ name: string }> },
) {
  const { name } = await params;

  const slug = name.endsWith(".json") ? name.slice(0, -5) : name;

  const ip = getClientIp(request);
  const userAgent = request.headers.get("user-agent") || "unknown";

  async function captureAndFlush(
    status: "success" | "failure",
    errorMsg?: string,
  ) {
    try {
      const posthog = getPostHogClient();
      posthog.capture({
        distinctId: ip,
        event: "cli_component_download",
        properties: {
          component_slug: slug,
          status,
          user_agent: userAgent,
          $ip: ip,
          ...(errorMsg ? { error: errorMsg } : {}),
        },
      });
      await posthog.flush();
    } catch (e) {
      console.error("Failed to capture CLI download event", e);
    }
  }

  const component = components.find(
    (c) =>
      c.slug === slug ||
      c.name.toLowerCase().replace(/\s+/g, "-") === slug.toLowerCase(),
  );

  if (!component) {
    const errorMsg = `Registry item "${slug}" was not found.`;
    await captureAndFlush("failure", errorMsg);
    return NextResponse.json({ error: errorMsg }, { status: 404 });
  }

  const registryComponent = getRegistryComponent(component.slug);
  if (!registryComponent || !registryComponent.code) {
    const errorMsg = `Failed to load component code for "${slug}".`;
    await captureAndFlush("failure", errorMsg);
    return NextResponse.json({ error: errorMsg }, { status: 500 });
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

  await captureAndFlush("success");

  return NextResponse.json(registryItem);
}
