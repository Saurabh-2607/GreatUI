"use client";

import { useEffect } from "react";
import { useViewer } from "@/lib/viewer-context";
import { type Component } from "@/lib/registry";

interface ComponentRegistrarProps {
  component: Component;
}

export default function ComponentRegistrar({
  component,
}: ComponentRegistrarProps) {
  const { setActiveComponent } = useViewer();

  useEffect(() => {
    setActiveComponent(component);
  }, [component, setActiveComponent]);

  return null;
}
