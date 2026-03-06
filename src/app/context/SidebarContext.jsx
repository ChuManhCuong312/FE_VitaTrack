import React, { createContext, useContext, useState, useEffect } from "react";
const SidebarContext = createContext(void 0);
function SidebarProvider({ children }) {
  const [isOpen, setIsOpen] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("sidebar-open");
      return saved !== null ? saved === "true" : true;
    }
    return true;
  });
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  useEffect(() => {
    localStorage.setItem("sidebar-open", isOpen.toString());
  }, [isOpen]);
  const toggleSidebar = () => setIsOpen((prev) => !prev);
  const toggleMobileSidebar = () => setIsMobileOpen((prev) => !prev);
  const closeMobileSidebar = () => setIsMobileOpen(false);
  return /* @__PURE__ */ React.createElement(
    SidebarContext.Provider,
    {
      value: {
        isOpen,
        isMobileOpen,
        toggleSidebar,
        toggleMobileSidebar,
        closeMobileSidebar
      }
    },
    children
  );
}
function useSidebar() {
  const ctx = useContext(SidebarContext);
  if (!ctx) throw new Error("useSidebar must be used within SidebarProvider");
  return ctx;
}
export {
  SidebarProvider,
  useSidebar
};
