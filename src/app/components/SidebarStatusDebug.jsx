import React from "react";
import { useSidebar } from "../context/SidebarContext";
function SidebarStatusDebug() {
  const { isOpen, isMobileOpen } = useSidebar();
  if (import.meta.env.PROD) {
    return null;
  }
  return /* @__PURE__ */ React.createElement(
    "div",
    {
      style: {
        position: "fixed",
        bottom: 16,
        right: 16,
        background: "#1F2937",
        color: "#fff",
        padding: "8px 12px",
        borderRadius: 8,
        fontSize: 11,
        fontFamily: "monospace",
        zIndex: 9999,
        boxShadow: "0 4px 12px rgba(0,0,0,0.3)"
      }
    },
    /* @__PURE__ */ React.createElement("div", { style: { marginBottom: 4, color: "#22C55E", fontWeight: 600 } }, "Sidebar Debug"),
    /* @__PURE__ */ React.createElement("div", null, "Desktop: ", isOpen ? "\u2705 Open" : "\u274C Closed"),
    /* @__PURE__ */ React.createElement("div", null, "Mobile: ", isMobileOpen ? "\u2705 Open" : "\u274C Closed"),
    /* @__PURE__ */ React.createElement("div", { style: { marginTop: 4, color: "#9CA3AF", fontSize: 10 } }, "localStorage: ", localStorage.getItem("sidebar-open") || "null")
  );
}
export {
  SidebarStatusDebug
};
