"use client";

import { useEffect } from "react";
import posthog from "posthog-js";

export default function GlobalError({
  error,
  reset,
}: Readonly<{
  error: Error & { digest?: string };
  reset: () => void;
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
        <main className="flex min-h-screen flex-col items-center justify-center p-4 text-center">
          <h1 className="mb-4 text-2xl font-bold tracking-tight text-neutral-900 dark:text-white">
            Something went wrong
          </h1>
          <p className="mb-8 text-neutral-600 dark:text-neutral-400">
            Please refresh the page and try again.
          </p>
          <button
            onClick={() => reset()}
            className="rounded-md bg-neutral-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-neutral-800 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-200"
          >
            Try again
          </button>
        </main>
      </body>
    </html>
  );
}
