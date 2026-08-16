import { PostHog } from "posthog-node";

let posthogClient: PostHog | null = null;

export default function getPostHogClient(): PostHog {
  if (posthogClient) {
    return posthogClient;
  }

  const projectToken = process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN;
  const posthogHost = process.env.NEXT_PUBLIC_POSTHOG_HOST;

  if (!projectToken || !posthogHost || process.env.NODE_ENV === "development") {
    // Return a dummy client if keys are missing or in dev mode to prevent crashing
    return {
      capture: () => {},
      flush: async () => {},
      shutdown: async () => {},
    } as unknown as PostHog;
  }

  posthogClient = new PostHog(projectToken, {
    host: posthogHost,
    flushAt: 1,
    flushInterval: 0,
    enableExceptionAutocapture: true,
  });

  return posthogClient;
}
