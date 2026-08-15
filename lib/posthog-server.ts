import { PostHog } from "posthog-node";

let posthogClient: PostHog | null = null;

export default function getPostHogClient(): PostHog {
  if (posthogClient) {
    return posthogClient;
  }

  const projectToken = process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN;
  const posthogHost = process.env.NEXT_PUBLIC_POSTHOG_HOST;

  if (!projectToken || !posthogHost) {
    if (process.env.NODE_ENV === "development") {
      const missingVariable = !projectToken
        ? "NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN"
        : "NEXT_PUBLIC_POSTHOG_HOST";

      console.error(
        `${missingVariable} variable required by PostHog is missing or un-configured, this causes events to be silently missed. This error stops appearing once ${missingVariable} is configured`,
      );
    }

    // Return a dummy client if keys are missing to prevent crashing
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
