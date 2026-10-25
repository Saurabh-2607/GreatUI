"use client";

import React, { createContext, useContext, useState } from "react";
import { type Component } from "@/lib/registry";

interface ViewerContextType {
  isSidebarOpen: boolean;
  setIsSidebarOpen: (open: boolean) => void;
  isPanelOpen: boolean;
  setIsPanelOpen: (open: boolean) => void;
  isCodeOpen: boolean;
  setIsCodeOpen: (open: boolean) => void;
  isMarkdownOpen: boolean;
  setIsMarkdownOpen: (open: boolean) => void;
  isCustomizerOpen: boolean;
  setIsCustomizerOpen: (open: boolean) => void;
  activeComponent: Component | null;
  setActiveComponent: (comp: Component | null) => void;
  previewContainer: HTMLElement | null;
  setPreviewContainer: (el: HTMLElement | null) => void;
}

const ViewerContext = createContext<ViewerContextType | undefined>(undefined);

export function ViewerProvider({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpenState] = useState(() => {
    if (typeof window === "undefined") return true;
    try {
      const saved = localStorage.getItem("great-ui-sidebar-open");
      if (saved !== null) return saved === "true";
    } catch {}
    return window.innerWidth >= 1024;
  });
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [isCodeOpen, setIsCodeOpen] = useState(false);
  const [isMarkdownOpen, setIsMarkdownOpen] = useState(false);
  const [isCustomizerOpen, setIsCustomizerOpenState] = useState(() => {
    if (typeof window === "undefined") return true;
    try {
      const saved = localStorage.getItem("great-ui-customizer-open");
      if (saved !== null) return saved === "true";
    } catch {}
    return window.innerWidth >= 1024;
  });
  const [activeComponent, setActiveComponent] = useState<Component | null>(
    null,
  );
  const [previewContainer, setPreviewContainer] = useState<HTMLElement | null>(
    null,
  );

  const handleSetSidebarOpen = (open: boolean) => {
    setIsSidebarOpenState(open);
    try {
      localStorage.setItem("great-ui-sidebar-open", String(open));
    } catch (e) {
      console.error("Failed to write to localStorage", e);
    }
  };

  const handleSetCustomizerOpen = (open: boolean) => {
    setIsCustomizerOpenState(open);
    try {
      localStorage.setItem("great-ui-customizer-open", String(open));
    } catch (e) {
      console.error("Failed to write to localStorage", e);
    }
  };

  const handleSetPanelOpen = (open: boolean) => {
    setIsPanelOpen(open);
    try {
      localStorage.setItem("great-ui-panel-open", String(open));
    } catch (e) {
      console.error("Failed to write to localStorage", e);
    }
  };

  const handleSetCodeOpen = (open: boolean) => {
    setIsCodeOpen(open);
    if (open) {
      setIsPanelOpen(true);
      setIsMarkdownOpen(false);
    }
  };

  const handleSetMarkdownOpen = (open: boolean) => {
    setIsMarkdownOpen(open);
    if (open) {
      setIsPanelOpen(true);
      setIsCodeOpen(false);
    }
  };

  return (
    <ViewerContext.Provider
      value={{
        isSidebarOpen,
        setIsSidebarOpen: handleSetSidebarOpen,
        isPanelOpen,
        setIsPanelOpen: handleSetPanelOpen,
        isCodeOpen,
        setIsCodeOpen: handleSetCodeOpen,
        isMarkdownOpen,
        setIsMarkdownOpen: handleSetMarkdownOpen,
        isCustomizerOpen,
        setIsCustomizerOpen: handleSetCustomizerOpen,
        activeComponent,
        setActiveComponent,
        previewContainer,
        setPreviewContainer,
      }}
    >
      {children}
    </ViewerContext.Provider>
  );
}

export function useViewer() {
  const context = useContext(ViewerContext);
  if (!context) {
    throw new Error("useViewer must be used within a ViewerProvider");
  }
  return context;
}
