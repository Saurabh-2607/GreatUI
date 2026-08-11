"use client";

import { useEffect } from "react";
import posthog from "posthog-js";

export default function GlobalError({
  error,
}: Readonly<{
  error: Error & { digest?: string };
}>) {
  useEffect(() => {
    posthog.captureException(error, {
      source: "nextjs_global_error_boundary",
      digest: error.digest,
    });
  }, [error]);

  return (
    <html lang="en">
      <body>
        <main>
          <h1>Something went wrong</h1>
          <p>Please refresh the page and try again.</p>
        </main>
      </body>
    </html>
  );
}
