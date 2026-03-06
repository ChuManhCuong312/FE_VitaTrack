import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";

interface SidebarContextType {
  isOpen: boolean;
  isMobileOpen: boolean;
  toggleSidebar: () => void;
  toggleMobileSidebar: () => void;
  closeMobileSidebar: () => void;
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export function SidebarProvider({ children }: { children: ReactNode }) {
  // Desktop sidebar state - persistent via localStorage
  const [isOpen, setIsOpen] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("sidebar-open");
      return saved !== null ? saved === "true" : true; // Default open on desktop
    }
    return true;
  });

  // Mobile sidebar state - always starts closed
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  // Save desktop sidebar state to localStorage
  useEffect(() => {
    localStorage.setItem("sidebar-open", isOpen.toString());
  }, [isOpen]);

  const toggleSidebar = () => setIsOpen((prev) => !prev);
  const toggleMobileSidebar = () => setIsMobileOpen((prev) => !prev);
  const closeMobileSidebar = () => setIsMobileOpen(false);

  return (
    <SidebarContext.Provider
      value={{
        isOpen,
        isMobileOpen,
        toggleSidebar,
        toggleMobileSidebar,
        closeMobileSidebar,
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
}

export function useSidebar() {
  const ctx = useContext(SidebarContext);
  if (!ctx) throw new Error("useSidebar must be used within SidebarProvider");
  return ctx;
}
