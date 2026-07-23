"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { type Component } from "@/lib/registry";

interface ViewerContextType {
  isSidebarOpen: boolean;
  setIsSidebarOpen: (open: boolean) => void;
  isPanelOpen: boolean;
  setIsPanelOpen: (open: boolean) => void;
  isCodeOpen: boolean;
  setIsCodeOpen: (open: boolean) => void;
  activeComponent: Component | null;
  setActiveComponent: (comp: Component | null) => void;
}

const ViewerContext = createContext<ViewerContextType | undefined>(undefined);

export function ViewerProvider({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isPanelOpen, setIsPanelOpen] = useState(true);
  const [isCodeOpen, setIsCodeOpen] = useState(false);
  const [activeComponent, setActiveComponent] = useState<Component | null>(
    null,
  );

  useEffect(() => {
    try {
      const savedPanelOpen = localStorage.getItem("great-ui-panel-open");
      if (savedPanelOpen !== null) {
        const isVal = savedPanelOpen === "true";
        setTimeout(() => {
          setIsPanelOpen(isVal);
        }, 0);
      }
    } catch (e) {
      console.error("Failed to read from localStorage", e);
    }
  }, []);

  const handleSetPanelOpen = (open: boolean) => {
    setIsPanelOpen(open);
    try {
      localStorage.setItem("great-ui-panel-open", String(open));
    } catch (e) {
      console.error("Failed to write to localStorage", e);
    }
  };

  return (
    <ViewerContext.Provider
      value={{
        isSidebarOpen,
        setIsSidebarOpen,
        isPanelOpen,
        setIsPanelOpen: handleSetPanelOpen,
        isCodeOpen,
        setIsCodeOpen,
        activeComponent,
        setActiveComponent,
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
