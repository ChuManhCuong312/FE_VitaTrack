import React, { useState, useEffect } from "react";
import { Outlet, useNavigate, useLocation } from "react-router";
import { useApp } from "../context/AppContext";
import { useSidebar } from "../context/SidebarContext";
const userNav = [
  { label: "T\u1ED5ng quan", path: "/dashboard" },
  { label: "H\u1ED3 s\u01A1 s\u1EE9c kh\u1ECFe", path: "/dashboard/health-profile" },
  { label: "Nh\u1EADt k\xFD \u0103n u\u1ED1ng", path: "/dashboard/food-diary" },
  { label: "Theo d\xF5i v\u1EADn \u0111\u1ED9ng", path: "/dashboard/exercise" },
  { label: "Tr\u1EE3 l\xFD \u1EA3o", path: "/dashboard/ai-assistant" },
  { label: "Chuy\xEAn gia", path: "/dashboard/expert" },
  { label: "C\xE0i \u0111\u1EB7t", path: "/dashboard/settings" }
];
const expertNav = [
  { label: "T\u1ED5ng quan", path: "/expert" },
  { label: "Danh s\xE1ch ng\u01B0\u1EDDi d\xF9ng", path: "/expert/users" },
  { label: "T\u1EA1o th\u1EF1c \u0111\u01A1n", path: "/expert/create-menu" },
  { label: "C\u1EA3nh b\xE1o r\u1EE7i ro", path: "/expert/alerts" },
  { label: "C\xE0i \u0111\u1EB7t", path: "/expert/settings" }
];
const adminNav = [
  { label: "T\u1ED5ng quan", path: "/admin" },
  { label: "Qu\u1EA3n l\xFD ng\u01B0\u1EDDi d\xF9ng", path: "/admin/users" },
  { label: "Qu\u1EA3n l\xFD th\u1EF1c ph\u1EA9m", path: "/admin/food" },
  { label: "C\u1EA5p quy\u1EC1n chuy\xEAn gia", path: "/admin/experts" },
  { label: "C\xE0i \u0111\u1EB7t", path: "/admin/settings" }
];
function Layout() {
  const { currentUser, logout, switchRole } = useApp();
  const { isOpen, isMobileOpen, toggleSidebar, toggleMobileSidebar, closeMobileSidebar } = useSidebar();
  const navigate = useNavigate();
  const location = useLocation();
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 768);
  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  const role = currentUser?.role ?? "user";
  const navItems = role === "admin" ? adminNav : role === "expert" ? expertNav : userNav;
  const roleBadge = {
    user: "Ng\u01B0\u1EDDi d\xF9ng",
    expert: "Chuy\xEAn gia",
    admin: "Qu\u1EA3n tr\u1ECB vi\xEAn"
  };
  const roleColor = {
    user: "#22C55E",
    expert: "#2563EB",
    admin: "#F59E0B"
  };
  const roleActiveBg = {
    user: "#DCFCE7",
    expert: "#DBEAFE",
    admin: "#FEF3C7"
  };
  const roleActiveText = {
    user: "#16A34A",
    expert: "#1D4ED8",
    admin: "#B45309"
  };
  const handleLogout = () => {
    logout();
    navigate("/login");
  };
  const isActive = (path) => {
    if (path === "/dashboard" || path === "/expert" || path === "/admin") {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };
  const contentMargin = isDesktop && isOpen ? 260 : 0;
  return /* @__PURE__ */ React.createElement("div", { style: { display: "flex", minHeight: "100vh", background: "#F9FAFB", fontFamily: "Inter, sans-serif" } }, isMobileOpen && /* @__PURE__ */ React.createElement(
    "div",
    {
      style: { position: "fixed", inset: 0, background: "rgba(0,0,0,0.4)", zIndex: 40 },
      onClick: closeMobileSidebar
    }
  ), /* @__PURE__ */ React.createElement(
    "aside",
    {
      style: {
        width: isOpen ? 260 : 0,
        background: "#FFFFFF",
        borderRight: isOpen ? "1px solid #E5E7EB" : "none",
        display: "flex",
        flexDirection: "column",
        position: "fixed",
        top: 0,
        left: 0,
        bottom: 0,
        zIndex: 50,
        transition: "width 0.3s ease-in-out",
        overflow: "hidden"
      },
      className: "hidden md:flex"
    },
    isOpen && /* @__PURE__ */ React.createElement(
      SidebarContent,
      {
        navItems,
        currentUser,
        roleBadge,
        roleColor,
        roleActiveBg,
        roleActiveText,
        role,
        isActive,
        navigate,
        handleLogout,
        switchRole
      }
    )
  ), isMobileOpen && /* @__PURE__ */ React.createElement(
    "aside",
    {
      style: {
        width: 260,
        background: "#FFFFFF",
        borderRight: "1px solid #E5E7EB",
        display: "flex",
        flexDirection: "column",
        position: "fixed",
        top: 0,
        left: 0,
        bottom: 0,
        zIndex: 50
      },
      className: "md:hidden"
    },
    /* @__PURE__ */ React.createElement(
      SidebarContent,
      {
        navItems,
        currentUser,
        roleBadge,
        roleColor,
        roleActiveBg,
        roleActiveText,
        role,
        isActive,
        navigate,
        handleLogout,
        switchRole,
        onClose: closeMobileSidebar,
        isMobile: true
      }
    )
  ), /* @__PURE__ */ React.createElement(
    "div",
    {
      style: {
        flex: 1,
        display: "flex",
        flexDirection: "column",
        marginLeft: contentMargin,
        transition: "margin-left 0.3s ease-in-out"
      }
    },
    /* @__PURE__ */ React.createElement(
      "header",
      {
        style: {
          height: 64,
          background: "#FFFFFF",
          borderBottom: "1px solid #E5E7EB",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 24px",
          position: "sticky",
          top: 0,
          zIndex: 30
        }
      },
      /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 16 } }, /* @__PURE__ */ React.createElement(
        "button",
        {
          onClick: () => {
            if (isDesktop) {
              toggleSidebar();
            } else {
              toggleMobileSidebar();
            }
          },
          style: {
            background: "none",
            border: "none",
            cursor: "pointer",
            display: "flex",
            flexDirection: "column",
            gap: 5,
            padding: 4
          },
          "aria-label": "Toggle menu"
        },
        /* @__PURE__ */ React.createElement("span", { style: { display: "block", width: 22, height: 2, background: "#374151" } }),
        /* @__PURE__ */ React.createElement("span", { style: { display: "block", width: 22, height: 2, background: "#374151" } }),
        /* @__PURE__ */ React.createElement("span", { style: { display: "block", width: 22, height: 2, background: "#374151" } })
      ), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 14, color: "#6B7280" } }, (/* @__PURE__ */ new Date()).toLocaleDateString("vi-VN", { weekday: "long", year: "numeric", month: "long", day: "numeric" })))),
      /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 16 } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 8 }, className: "hidden sm:flex" }, ["user", "expert", "admin"].map((r) => /* @__PURE__ */ React.createElement(
        "button",
        {
          key: r,
          onClick: () => {
            switchRole(r);
            navigate(r === "user" ? "/dashboard" : r === "expert" ? "/expert" : "/admin");
          },
          style: {
            padding: "4px 10px",
            borderRadius: 6,
            border: `1px solid ${roleColor[r]}`,
            background: role === r ? roleColor[r] : "transparent",
            color: role === r ? "#fff" : roleColor[r],
            cursor: "pointer",
            fontSize: 12,
            fontWeight: 500
          }
        },
        roleBadge[r]
      ))), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 10 } }, /* @__PURE__ */ React.createElement(
        "div",
        {
          style: {
            width: 36,
            height: 36,
            borderRadius: "50%",
            background: roleColor[role],
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#fff",
            fontSize: 14,
            fontWeight: 600
          }
        },
        currentUser?.name?.charAt(0) ?? "U"
      ), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexDirection: "column" } }, /* @__PURE__ */ React.createElement("span", { style: { fontSize: 13, fontWeight: 600, color: "#1F2937" } }, currentUser?.name), /* @__PURE__ */ React.createElement("span", { style: { fontSize: 11, color: "#6B7280" } }, roleBadge[role]))))
    ),
    /* @__PURE__ */ React.createElement("main", { style: { flex: 1, padding: "32px 24px", maxWidth: 1400, width: "100%", margin: "0 auto" } }, /* @__PURE__ */ React.createElement(Outlet, null))
  ));
}
function SidebarContent({
  navItems,
  currentUser,
  roleBadge,
  roleColor,
  roleActiveBg,
  roleActiveText,
  role,
  isActive,
  navigate,
  handleLogout,
  onClose
}) {
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("div", { style: { padding: "24px 24px 16px", borderBottom: "1px solid #E5E7EB" } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", justifyContent: "space-between" } }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 18, fontWeight: 700, color: "#22C55E", letterSpacing: "-0.5px" } }, "VitaTrack"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, color: "#6B7280", marginTop: 2 } }, "Qu\u1EA3n l\xFD s\u1EE9c kh\u1ECFe & dinh d\u01B0\u1EE1ng")), onClose && /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: onClose,
      style: { background: "none", border: "none", cursor: "pointer", color: "#6B7280", fontSize: 18 }
    },
    "\u2715"
  ))), /* @__PURE__ */ React.createElement("div", { style: { padding: "16px 24px", borderBottom: "1px solid #E5E7EB" } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 12 } }, /* @__PURE__ */ React.createElement(
    "div",
    {
      style: {
        width: 40,
        height: 40,
        borderRadius: "50%",
        background: roleColor[role],
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#fff",
        fontSize: 16,
        fontWeight: 600
      }
    },
    currentUser?.name?.charAt(0) ?? "U"
  ), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 13, fontWeight: 600, color: "#1F2937" } }, currentUser?.name), /* @__PURE__ */ React.createElement(
    "div",
    {
      style: {
        fontSize: 11,
        padding: "2px 8px",
        borderRadius: 4,
        background: roleColor[role] + "20",
        color: roleColor[role],
        fontWeight: 500,
        display: "inline-block",
        marginTop: 2
      }
    },
    roleBadge[role]
  )))), /* @__PURE__ */ React.createElement("nav", { style: { flex: 1, padding: "16px 12px", display: "flex", flexDirection: "column", gap: 4, overflowY: "auto" } }, navItems.map((item) => /* @__PURE__ */ React.createElement(
    "button",
    {
      key: item.path,
      onClick: () => {
        navigate(item.path);
        onClose?.();
      },
      style: {
        width: "100%",
        textAlign: "left",
        padding: "10px 12px",
        borderRadius: 8,
        border: "none",
        background: isActive(item.path) ? roleActiveBg[role] : "transparent",
        color: isActive(item.path) ? roleActiveText[role] : "#374151",
        fontSize: 14,
        fontWeight: isActive(item.path) ? 600 : 400,
        cursor: "pointer",
        transition: "background 0.15s"
      },
      onMouseEnter: (e) => {
        if (!isActive(item.path)) {
          e.currentTarget.style.background = "#F3F4F6";
        }
      },
      onMouseLeave: (e) => {
        if (!isActive(item.path)) {
          e.currentTarget.style.background = "transparent";
        }
      }
    },
    item.label
  ))), /* @__PURE__ */ React.createElement("div", { style: { padding: "16px 12px", borderTop: "1px solid #E5E7EB" } }, /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: handleLogout,
      style: {
        width: "100%",
        textAlign: "left",
        padding: "10px 12px",
        borderRadius: 8,
        border: "none",
        background: "transparent",
        color: "#EF4444",
        fontSize: 14,
        fontWeight: 500,
        cursor: "pointer"
      },
      onMouseEnter: (e) => e.currentTarget.style.background = "#FEE2E2",
      onMouseLeave: (e) => e.currentTarget.style.background = "transparent"
    },
    "\u0110\u0103ng xu\u1EA5t"
  )));
}
export {
  Layout
};
