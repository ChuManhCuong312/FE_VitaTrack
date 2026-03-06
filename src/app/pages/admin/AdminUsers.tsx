import React, { useState } from "react";

interface AppUser {
  id: number;
  name: string;
  email: string;
  role: "user" | "expert" | "admin";
  status: "active" | "locked";
  joinDate: string;
  lastLogin: string;
  bmi?: number;
  goal?: string;
}

const initialUsers: AppUser[] = [
  { id: 1, name: "Nguyễn Văn An", email: "an@email.com", role: "user", status: "active", joinDate: "01/01/2026", lastLogin: "2 giờ trước", bmi: 23.4, goal: "Giảm cân" },
  { id: 2, name: "Lê Thị Mai", email: "mai@email.com", role: "user", status: "active", joinDate: "15/01/2026", lastLogin: "1 giờ trước", bmi: 28.2, goal: "Giảm cân" },
  { id: 3, name: "ThS. Trần Thị Bích", email: "bich@expert.com", role: "expert", status: "active", joinDate: "01/12/2025", lastLogin: "30 phút trước" },
  { id: 4, name: "Phạm Văn Tùng", email: "tung@email.com", role: "user", status: "locked", joinDate: "20/01/2026", lastLogin: "5 ngày trước", bmi: 22.1, goal: "Duy trì" },
  { id: 5, name: "Hoàng Minh Đức", email: "duc@email.com", role: "user", status: "active", joinDate: "10/02/2026", lastLogin: "1 ngày trước", bmi: 22.8, goal: "Duy trì" },
  { id: 6, name: "Trần Thị Hương", email: "huong@email.com", role: "user", status: "active", joinDate: "05/02/2026", lastLogin: "3 giờ trước", bmi: 31.5, goal: "Giảm cân" },
  { id: 7, name: "Nguyễn Thị Lan", email: "lan@email.com", role: "user", status: "active", joinDate: "01/03/2026", lastLogin: "5 phút trước", bmi: 21.3, goal: "Tăng cân" },
  { id: 8, name: "TS. Nguyễn Thành Công", email: "cong@email.com", role: "expert", status: "active", joinDate: "15/02/2026", lastLogin: "2 giờ trước" },
  { id: 9, name: "Admin Hệ Thống", email: "admin@healthapp.vn", role: "admin", status: "active", joinDate: "01/01/2025", lastLogin: "1 phút trước" },
];

const roleConfig = {
  user: { label: "Người dùng", bg: "#DCFCE7", color: "#16A34A" },
  expert: { label: "Chuyên gia", bg: "#DBEAFE", color: "#1D4ED8" },
  admin: { label: "Admin", bg: "#FEF3C7", color: "#B45309" },
};

function Card({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <div style={{ background: "#FFFFFF", borderRadius: 16, padding: 24, boxShadow: "0 1px 3px rgba(0,0,0,0.06), 0 4px 12px rgba(0,0,0,0.04)", ...style }}>
      {children}
    </div>
  );
}

export default function AdminUsers() {
  const [users, setUsers] = useState<AppUser[]>(initialUsers);
  const [search, setSearch] = useState("");
  const [filterRole, setFilterRole] = useState<"all" | "user" | "expert" | "admin">("all");
  const [filterStatus, setFilterStatus] = useState<"all" | "active" | "locked">("all");
  const [confirmAction, setConfirmAction] = useState<{ type: string; id: number } | null>(null);
  const [selectedUser, setSelectedUser] = useState<AppUser | null>(null);

  const filtered = users.filter((u) => {
    const matchSearch = u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase());
    const matchRole = filterRole === "all" || u.role === filterRole;
    const matchStatus = filterStatus === "all" || u.status === filterStatus;
    return matchSearch && matchRole && matchStatus;
  });

  const toggleStatus = (id: number) => {
    setUsers((p) => p.map((u) => u.id === id ? { ...u, status: u.status === "active" ? "locked" : "active" } : u));
    setConfirmAction(null);
  };

  const changeRole = (id: number, role: AppUser["role"]) => {
    setUsers((p) => p.map((u) => u.id === id ? { ...u, role } : u));
    setSelectedUser(null);
  };

  const totalUsers = users.filter((u) => u.role === "user").length;
  const totalExperts = users.filter((u) => u.role === "expert").length;
  const totalActive = users.filter((u) => u.status === "active").length;
  const totalLocked = users.filter((u) => u.status === "locked").length;

  return (
    <div style={{ fontFamily: "Inter, sans-serif", color: "#1F2937" }}>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: 24, fontWeight: 600, color: "#1F2937", marginBottom: 4 }}>Quản lý người dùng</h1>
        <p style={{ fontSize: 14, color: "#6B7280" }}>Quản lý tài khoản, phân quyền và trạng thái người dùng trong hệ thống.</p>
      </div>

      {/* Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: 14, marginBottom: 20 }}>
        {[
          { label: "Người dùng", value: totalUsers, color: "#22C55E" },
          { label: "Chuyên gia", value: totalExperts, color: "#2563EB" },
          { label: "Đang hoạt động", value: totalActive, color: "#10B981" },
          { label: "Đã khóa", value: totalLocked, color: "#EF4444" },
        ].map((s) => (
          <Card key={s.label}>
            <div style={{ fontSize: 12, color: "#6B7280" }}>{s.label}</div>
            <div style={{ fontSize: 28, fontWeight: 700, color: s.color, marginTop: 4 }}>{s.value}</div>
          </Card>
        ))}
      </div>

      {/* Filters */}
      <div style={{ display: "flex", gap: 10, marginBottom: 16, flexWrap: "wrap" }}>
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Tìm kiếm theo tên, email..."
          style={{ flex: 1, minWidth: 200, height: 44, padding: "0 14px", borderRadius: 10, border: "1px solid #E5E7EB", fontSize: 14, outline: "none" }}
        />
        <select
          value={filterRole}
          onChange={(e) => setFilterRole(e.target.value as any)}
          style={{ height: 44, padding: "0 12px", borderRadius: 10, border: "1px solid #E5E7EB", fontSize: 14, background: "#fff", outline: "none" }}
        >
          <option value="all">Tất cả vai trò</option>
          <option value="user">Người dùng</option>
          <option value="expert">Chuyên gia</option>
          <option value="admin">Admin</option>
        </select>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value as any)}
          style={{ height: 44, padding: "0 12px", borderRadius: 10, border: "1px solid #E5E7EB", fontSize: 14, background: "#fff", outline: "none" }}
        >
          <option value="all">Tất cả trạng thái</option>
          <option value="active">Hoạt động</option>
          <option value="locked">Đã khóa</option>
        </select>
      </div>

      <Card style={{ padding: 0, overflow: "hidden" }}>
        <div style={{ padding: "14px 20px", borderBottom: "1px solid #E5E7EB" }}>
          <span style={{ fontSize: 13, color: "#6B7280" }}>{filtered.length} / {users.length} người dùng</span>
        </div>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 700 }}>
            <thead>
              <tr style={{ background: "#F9FAFB" }}>
                {["Người dùng", "Email", "Vai trò", "Trạng thái", "Ngày tham gia", "Đăng nhập gần nhất", "Thao tác"].map((h) => (
                  <th key={h} style={{ padding: "12px 16px", textAlign: "left", fontSize: 12, fontWeight: 600, color: "#6B7280", borderBottom: "1px solid #E5E7EB" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((u) => {
                const rc = roleConfig[u.role];
                return (
                  <tr key={u.id} style={{ borderBottom: "1px solid #F3F4F6" }}
                    onMouseEnter={(e) => ((e.currentTarget as HTMLTableRowElement).style.background = "#F9FAFB")}
                    onMouseLeave={(e) => ((e.currentTarget as HTMLTableRowElement).style.background = "transparent")}
                  >
                    <td style={{ padding: "14px 16px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <div style={{ width: 36, height: 36, borderRadius: "50%", background: rc.bg, color: rc.color, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700 }}>
                          {u.name.split(" ").pop()?.charAt(0)}
                        </div>
                        <span style={{ fontSize: 14, fontWeight: 500 }}>{u.name}</span>
                      </div>
                    </td>
                    <td style={{ padding: "14px 16px", fontSize: 13, color: "#6B7280" }}>{u.email}</td>
                    <td style={{ padding: "14px 16px" }}>
                      <span style={{ fontSize: 12, padding: "3px 8px", borderRadius: 6, fontWeight: 600, background: rc.bg, color: rc.color }}>
                        {rc.label}
                      </span>
                    </td>
                    <td style={{ padding: "14px 16px" }}>
                      <span style={{ fontSize: 12, padding: "3px 8px", borderRadius: 6, fontWeight: 600, background: u.status === "active" ? "#DCFCE7" : "#FEE2E2", color: u.status === "active" ? "#16A34A" : "#DC2626" }}>
                        {u.status === "active" ? "Hoạt động" : "Đã khóa"}
                      </span>
                    </td>
                    <td style={{ padding: "14px 16px", fontSize: 13, color: "#6B7280" }}>{u.joinDate}</td>
                    <td style={{ padding: "14px 16px", fontSize: 13, color: "#6B7280" }}>{u.lastLogin}</td>
                    <td style={{ padding: "14px 16px" }}>
                      <div style={{ display: "flex", gap: 6 }}>
                        <button onClick={() => setSelectedUser(u)}
                          style={{ padding: "6px 10px", borderRadius: 6, border: "1.5px solid #2563EB", background: "transparent", color: "#2563EB", fontSize: 11, fontWeight: 500, cursor: "pointer" }}>
                          Chi tiết
                        </button>
                        {u.role !== "admin" && (
                          confirmAction?.type === "toggle" && confirmAction.id === u.id ? (
                            <div style={{ display: "flex", gap: 4 }}>
                              <button onClick={() => toggleStatus(u.id)} style={{ padding: "6px 8px", borderRadius: 6, border: "none", background: "#EF4444", color: "#fff", fontSize: 11, cursor: "pointer" }}>Xác nhận</button>
                              <button onClick={() => setConfirmAction(null)} style={{ padding: "6px 8px", borderRadius: 6, border: "1px solid #E5E7EB", background: "#fff", color: "#374151", fontSize: 11, cursor: "pointer" }}>Hủy</button>
                            </div>
                          ) : (
                            <button
                              onClick={() => setConfirmAction({ type: "toggle", id: u.id })}
                              style={{ padding: "6px 10px", borderRadius: 6, border: `1.5px solid ${u.status === "active" ? "#EF4444" : "#22C55E"}`, background: "transparent", color: u.status === "active" ? "#EF4444" : "#22C55E", fontSize: 11, fontWeight: 500, cursor: "pointer" }}
                            >
                              {u.status === "active" ? "Khóa" : "Mở khóa"}
                            </button>
                          )
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>

      {/* User detail modal */}
      {selectedUser && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center", padding: 16 }}>
          <div style={{ background: "#fff", borderRadius: 16, padding: 32, width: "100%", maxWidth: 480 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
              <h3 style={{ fontSize: 18, fontWeight: 600, color: "#1F2937" }}>Chi tiết người dùng</h3>
              <button onClick={() => setSelectedUser(null)} style={{ background: "none", border: "none", fontSize: 20, color: "#6B7280", cursor: "pointer" }}>✕</button>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 20 }}>
              <div style={{ width: 56, height: 56, borderRadius: "50%", background: roleConfig[selectedUser.role].bg, color: roleConfig[selectedUser.role].color, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, fontWeight: 700 }}>
                {selectedUser.name.split(" ").pop()?.charAt(0)}
              </div>
              <div>
                <div style={{ fontSize: 17, fontWeight: 600, color: "#1F2937" }}>{selectedUser.name}</div>
                <div style={{ fontSize: 13, color: "#6B7280" }}>{selectedUser.email}</div>
              </div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 20 }}>
              {[
                { label: "Vai trò", value: roleConfig[selectedUser.role].label },
                { label: "Trạng thái", value: selectedUser.status === "active" ? "Hoạt động" : "Đã khóa" },
                { label: "Ngày tham gia", value: selectedUser.joinDate },
                { label: "Đăng nhập gần nhất", value: selectedUser.lastLogin },
                ...(selectedUser.bmi ? [{ label: "BMI", value: selectedUser.bmi.toString() }] : []),
                ...(selectedUser.goal ? [{ label: "Mục tiêu", value: selectedUser.goal }] : []),
              ].map((r) => (
                <div key={r.label} style={{ background: "#F9FAFB", borderRadius: 10, padding: "10px 14px" }}>
                  <div style={{ fontSize: 12, color: "#6B7280" }}>{r.label}</div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: "#1F2937", marginTop: 2 }}>{r.value}</div>
                </div>
              ))}
            </div>
            {selectedUser.role !== "admin" && (
              <div style={{ marginBottom: 16 }}>
                <div style={{ fontSize: 14, fontWeight: 500, color: "#374151", marginBottom: 8 }}>Thay đổi vai trò</div>
                <div style={{ display: "flex", gap: 8 }}>
                  {(["user", "expert"] as const).filter((r) => r !== selectedUser.role).map((r) => (
                    <button key={r} onClick={() => changeRole(selectedUser.id, r)}
                      style={{ height: 40, padding: "0 16px", borderRadius: 8, border: `1.5px solid ${roleConfig[r].color}`, background: roleConfig[r].bg, color: roleConfig[r].color, fontSize: 13, fontWeight: 600, cursor: "pointer" }}>
                      Đặt làm {roleConfig[r].label}
                    </button>
                  ))}
                </div>
              </div>
            )}
            <div style={{ display: "flex", gap: 10 }}>
              {selectedUser.role !== "admin" && (
                <button
                  onClick={() => { toggleStatus(selectedUser.id); setSelectedUser(null); }}
                  style={{ flex: 1, height: 44, borderRadius: 8, border: `1.5px solid ${selectedUser.status === "active" ? "#EF4444" : "#22C55E"}`, background: "transparent", color: selectedUser.status === "active" ? "#EF4444" : "#22C55E", fontSize: 14, fontWeight: 600, cursor: "pointer" }}
                >
                  {selectedUser.status === "active" ? "Khóa tài khoản" : "Mở khóa tài khoản"}
                </button>
              )}
              <button onClick={() => setSelectedUser(null)}
                style={{ flex: 1, height: 44, borderRadius: 8, border: "1.5px solid #E5E7EB", background: "#fff", color: "#374151", fontSize: 14, cursor: "pointer" }}>
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
