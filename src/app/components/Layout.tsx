import React, { useState, useEffect } from "react";
import { Outlet, useNavigate, useLocation } from "react-router";
import { useApp } from "../context/AppContext";
import { useSidebar } from "../context/SidebarContext";

interface NavItem {
  label: string;
  path: string;
}

const userNav: NavItem[] = [
  { label: "Tổng quan", path: "/dashboard" },
  { label: "Hồ sơ sức khỏe", path: "/dashboard/health-profile" },
  { label: "Nhật ký ăn uống", path: "/dashboard/food-diary" },
  { label: "Theo dõi vận động", path: "/dashboard/exercise" },
  { label: "Trợ lý ảo", path: "/dashboard/ai-assistant" },
  { label: "Chuyên gia", path: "/dashboard/expert" },
  { label: "Cài đặt", path: "/dashboard/settings" },
];

const expertNav: NavItem[] = [
  { label: "Tổng quan", path: "/expert" },
  { label: "Danh sách người dùng", path: "/expert/users" },
  { label: "Tạo thực đơn", path: "/expert/create-menu" },
  { label: "Cảnh báo rủi ro", path: "/expert/alerts" },
  { label: "Cài đặt", path: "/expert/settings" },
];

const adminNav: NavItem[] = [
  { label: "Tổng quan", path: "/admin" },
  { label: "Quản lý người dùng", path: "/admin/users" },
  { label: "Quản lý thực phẩm", path: "/admin/food" },
  { label: "Cấp quyền chuyên gia", path: "/admin/experts" },
  { label: "Cài đặt", path: "/admin/settings" },
];

export function Layout() {
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

  const roleBadge: Record<string, string> = {
    user: "Người dùng",
    expert: "Chuyên gia",
    admin: "Quản trị viên",
  };

  const roleColor: Record<string, string> = {
    user: "#22C55E",
    expert: "#2563EB",
    admin: "#F59E0B",
  };

  const roleActiveBg: Record<string, string> = {
    user: "#DCFCE7",
    expert: "#DBEAFE",
    admin: "#FEF3C7",
  };

  const roleActiveText: Record<string, string> = {
    user: "#16A34A",
    expert: "#1D4ED8",
    admin: "#B45309",
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const isActive = (path: string) => {
    if (path === "/dashboard" || path === "/expert" || path === "/admin") {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  // Calculate margin based on desktop mode and sidebar state
  const contentMargin = isDesktop && isOpen ? 260 : 0;

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#F9FAFB", fontFamily: "Inter, sans-serif" }}>
      {/* Overlay mobile */}
      {isMobileOpen && (
        <div
          style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.4)", zIndex: 40 }}
          onClick={closeMobileSidebar}
        />
      )}

      {/* Desktop Sidebar */}
      <aside
        style={{
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
          overflow: "hidden",
        }}
        className="hidden md:flex"
      >
        {isOpen && (
          <SidebarContent
            navItems={navItems}
            currentUser={currentUser}
            roleBadge={roleBadge}
            roleColor={roleColor}
            roleActiveBg={roleActiveBg}
            roleActiveText={roleActiveText}
            role={role}
            isActive={isActive}
            navigate={navigate}
            handleLogout={handleLogout}
            switchRole={switchRole}
          />
        )}
      </aside>

      {/* Mobile Sidebar */}
      {isMobileOpen && (
        <aside
          style={{
            width: 260,
            background: "#FFFFFF",
            borderRight: "1px solid #E5E7EB",
            display: "flex",
            flexDirection: "column",
            position: "fixed",
            top: 0,
            left: 0,
            bottom: 0,
            zIndex: 50,
          }}
          className="md:hidden"
        >
          <SidebarContent
            navItems={navItems}
            currentUser={currentUser}
            roleBadge={roleBadge}
            roleColor={roleColor}
            roleActiveBg={roleActiveBg}
            roleActiveText={roleActiveText}
            role={role}
            isActive={isActive}
            navigate={navigate}
            handleLogout={handleLogout}
            switchRole={switchRole}
            onClose={closeMobileSidebar}
            isMobile
          />
        </aside>
      )}

      {/* Main content */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          marginLeft: contentMargin,
          transition: "margin-left 0.3s ease-in-out",
        }}
      >
        {/* Topbar */}
        <header
          style={{
            height: 64,
            background: "#FFFFFF",
            borderBottom: "1px solid #E5E7EB",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 24px",
            position: "sticky",
            top: 0,
            zIndex: 30,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            {/* Hamburger Menu - Desktop & Mobile */}
            <button
              onClick={() => {
                if (isDesktop) {
                  toggleSidebar();
                } else {
                  toggleMobileSidebar();
                }
              }}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                display: "flex",
                flexDirection: "column",
                gap: 5,
                padding: 4,
              }}
              aria-label="Toggle menu"
            >
              <span style={{ display: "block", width: 22, height: 2, background: "#374151" }} />
              <span style={{ display: "block", width: 22, height: 2, background: "#374151" }} />
              <span style={{ display: "block", width: 22, height: 2, background: "#374151" }} />
            </button>
            <div>
              <div style={{ fontSize: 14, color: "#6B7280" }}>
                {new Date().toLocaleDateString("vi-VN", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
              </div>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            {/* Demo role switcher */}
            <div style={{ display: "flex", gap: 8 }} className="hidden sm:flex">
              {(["user", "expert", "admin"] as const).map((r) => (
                <button
                  key={r}
                  onClick={() => {
                    switchRole(r);
                    navigate(r === "user" ? "/dashboard" : r === "expert" ? "/expert" : "/admin");
                  }}
                  style={{
                    padding: "4px 10px",
                    borderRadius: 6,
                    border: `1px solid ${roleColor[r]}`,
                    background: role === r ? roleColor[r] : "transparent",
                    color: role === r ? "#fff" : roleColor[r],
                    cursor: "pointer",
                    fontSize: 12,
                    fontWeight: 500,
                  }}
                >
                  {roleBadge[r]}
                </button>
              ))}
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: "50%",
                  background: roleColor[role],
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#fff",
                  fontSize: 14,
                  fontWeight: 600,
                }}
              >
                {currentUser?.name?.charAt(0) ?? "U"}
              </div>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <span style={{ fontSize: 13, fontWeight: 600, color: "#1F2937" }}>{currentUser?.name}</span>
                <span style={{ fontSize: 11, color: "#6B7280" }}>{roleBadge[role]}</span>
              </div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main style={{ flex: 1, padding: "32px 24px", maxWidth: 1400, width: "100%", margin: "0 auto" }}>
          <Outlet />
        </main>
      </div>
    </div>
  );
}

interface SidebarContentProps {
  navItems: NavItem[];
  currentUser: any;
  roleBadge: Record<string, string>;
  roleColor: Record<string, string>;
  roleActiveBg: Record<string, string>;
  roleActiveText: Record<string, string>;
  role: string;
  isActive: (path: string) => boolean;
  navigate: (path: string) => void;
  handleLogout: () => void;
  switchRole: (role: any) => void;
  onClose?: () => void;
  isMobile?: boolean;
}

function SidebarContent({
  navItems, currentUser, roleBadge, roleColor, roleActiveBg, roleActiveText, role,
  isActive, navigate, handleLogout, onClose,
}: SidebarContentProps) {
  return (
    <>
      {/* Logo */}
      <div style={{ padding: "24px 24px 16px", borderBottom: "1px solid #E5E7EB" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <div style={{ fontSize: 18, fontWeight: 700, color: "#22C55E", letterSpacing: "-0.5px" }}>
              VitaTrack
            </div>
            <div style={{ fontSize: 11, color: "#6B7280", marginTop: 2 }}>Quản lý sức khỏe & dinh dưỡng</div>
          </div>
          {onClose && (
            <button
              onClick={onClose}
              style={{ background: "none", border: "none", cursor: "pointer", color: "#6B7280", fontSize: 18 }}
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* User info */}
      <div style={{ padding: "16px 24px", borderBottom: "1px solid #E5E7EB" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div
            style={{
              width: 40,
              height: 40,
              borderRadius: "50%",
              background: roleColor[role],
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#fff",
              fontSize: 16,
              fontWeight: 600,
            }}
          >
            {currentUser?.name?.charAt(0) ?? "U"}
          </div>
          <div>
            <div style={{ fontSize: 13, fontWeight: 600, color: "#1F2937" }}>{currentUser?.name}</div>
            <div
              style={{
                fontSize: 11,
                padding: "2px 8px",
                borderRadius: 4,
                background: roleColor[role] + "20",
                color: roleColor[role],
                fontWeight: 500,
                display: "inline-block",
                marginTop: 2,
              }}
            >
              {roleBadge[role]}
            </div>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, padding: "16px 12px", display: "flex", flexDirection: "column", gap: 4, overflowY: "auto" }}>
        {navItems.map((item) => (
          <button
            key={item.path}
            onClick={() => {
              navigate(item.path);
              onClose?.();
            }}
            style={{
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
              transition: "background 0.15s",
            }}
            onMouseEnter={(e) => {
              if (!isActive(item.path)) {
                (e.currentTarget as HTMLButtonElement).style.background = "#F3F4F6";
              }
            }}
            onMouseLeave={(e) => {
              if (!isActive(item.path)) {
                (e.currentTarget as HTMLButtonElement).style.background = "transparent";
              }
            }}
          >
            {item.label}
          </button>
        ))}
      </nav>

      {/* Logout */}
      <div style={{ padding: "16px 12px", borderTop: "1px solid #E5E7EB" }}>
        <button
          onClick={handleLogout}
          style={{
            width: "100%",
            textAlign: "left",
            padding: "10px 12px",
            borderRadius: 8,
            border: "none",
            background: "transparent",
            color: "#EF4444",
            fontSize: 14,
            fontWeight: 500,
            cursor: "pointer",
          }}
          onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.background = "#FEE2E2")}
          onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.background = "transparent")}
        >
          Đăng xuất
        </button>
      </div>
    </>
  );
}