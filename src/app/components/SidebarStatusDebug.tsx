import React from "react";
import { useSidebar } from "../context/SidebarContext";

/**
 * Developer Debug Component
 * Hiển thị trạng thái sidebar để debug
 * Chỉ hiển thị trong development mode
 */
export function SidebarStatusDebug() {
  const { isOpen, isMobileOpen } = useSidebar();

  // Only show in development
  if (import.meta.env.PROD) {
    return null;
  }

  return (
    <div
      style={{
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
        boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
      }}
    >
      <div style={{ marginBottom: 4, color: "#22C55E", fontWeight: 600 }}>
        Sidebar Debug
      </div>
      <div>Desktop: {isOpen ? "✅ Open" : "❌ Closed"}</div>
      <div>Mobile: {isMobileOpen ? "✅ Open" : "❌ Closed"}</div>
      <div style={{ marginTop: 4, color: "#9CA3AF", fontSize: 10 }}>
        localStorage: {localStorage.getItem("sidebar-open") || "null"}
      </div>
    </div>
  );
}
