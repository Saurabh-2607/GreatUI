import posthog from "posthog-js";

const projectToken = process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN;
const posthogHost = process.env.NEXT_PUBLIC_POSTHOG_HOST;

if (process.env.NODE_ENV !== "development") {
  if (!projectToken || !posthogHost) {
    console.warn(
      "PostHog project token or host is missing. Tracking is disabled.",
    );
  } else {
    posthog.init(projectToken, {
      api_host: "/ingest",
      defaults: "2026-01-30",
      capture_exceptions: true,
    });
  }
}
