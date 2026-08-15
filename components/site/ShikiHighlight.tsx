"use client";

import { useEffect, useState } from "react";
import { createHighlighter, type Highlighter } from "shiki";
import { greatUiLight, greatUiDark } from "@/lib/themes";

let highlighterPromise: Promise<Highlighter> | null = null;

function getHighlighter() {
  if (!highlighterPromise) {
    highlighterPromise = createHighlighter({
      themes: [greatUiLight, greatUiDark],
      langs: [
        "typescript",
        "javascript",
        "tsx",
        "jsx",
        "css",
        "json",
        "bash",
        "markdown",
      ],
    });
  }
  return highlighterPromise;
}

interface ShikiHighlightProps {
  code: string;
  lang?: string;
  className?: string;
  style?: React.CSSProperties;
}

export default function ShikiHighlight({
  code,
  lang = "tsx",
  className,
  style,
}: ShikiHighlightProps) {
  const [html, setHtml] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    getHighlighter()
      .then((highlighter) => {
        if (!isMounted) return;
        try {
          const highlighted = highlighter.codeToHtml(code, {
            lang,
            themes: {
              light: "great-ui-light",
              dark: "great-ui-dark",
            },
          });
          setHtml(highlighted);
        } catch (err) {
          console.error("Shiki highlighting error:", err);
        }
      })
      .catch((err) => {
        console.error("Failed to load Shiki highlighter:", err);
      });

    return () => {
      isMounted = false;
    };
  }, [code, lang]);

  if (html) {
    return (
      <div
        className={className}
        style={style}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    );
  }

  // Fallback while loading
  return (
    <pre className={className} style={style}>
      <code className="!font-mono">{code}</code>
    </pre>
  );
}
