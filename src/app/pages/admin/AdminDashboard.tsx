import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { useNavigate } from "react-router";

const userStats = [
  { month: "T10", users: 142 },
  { month: "T11", users: 198 },
  { month: "T12", users: 264 },
  { month: "T1", users: 312 },
  { month: "T2", users: 389 },
  { month: "T3", users: 451 },
];

const roleData = [
  { name: "Người dùng", value: 420, color: "#22C55E" },
  { name: "Chuyên gia", value: 28, color: "#2563EB" },
  { name: "Admin", value: 3, color: "#F59E0B" },
];

const recentActivities = [
  { id: 1, action: "Người dùng mới đăng ký", user: "Nguyễn Thị Lan", time: "5 phút trước", type: "user" },
  { id: 2, action: "Yêu cầu phê duyệt chuyên gia", user: "TS. Nguyễn Thành Công", time: "15 phút trước", type: "expert" },
  { id: 3, action: "Người dùng vi phạm bị khóa", user: "Phạm Văn Tùng", time: "1 giờ trước", type: "lock" },
  { id: 4, action: "Thêm 12 thực phẩm mới vào DB", user: "Admin Hệ Thống", time: "2 giờ trước", type: "food" },
  { id: 5, action: "Chuyên gia mới được phê duyệt", user: "BS. Lê Thị Tuyết", time: "3 giờ trước", type: "approve" },
];

function Card({ children, style, onClick }: { children: React.ReactNode; style?: React.CSSProperties; onClick?: () => void }) {
  return (
    <div
      onClick={onClick}
      style={{ background: "#FFFFFF", borderRadius: 16, padding: 24, boxShadow: "0 1px 3px rgba(0,0,0,0.06), 0 4px 12px rgba(0,0,0,0.04)", cursor: onClick ? "pointer" : "default", ...style }}
    >
      {children}
    </div>
  );
}

export default function AdminDashboard() {
  const navigate = useNavigate();

  const pendingExpertCount = 2;
  const lockedUserCount = 1;

  return (
    <div style={{ fontFamily: "Inter, sans-serif", color: "#1F2937" }}>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: 24, fontWeight: 600, color: "#1F2937", marginBottom: 4 }}>Dashboard Quản trị viên</h1>
        <p style={{ fontSize: 14, color: "#6B7280" }}>Tổng quan hệ thống VitaTrack – {new Date().toLocaleDateString("vi-VN", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}</p>
      </div>

      {/* Pending alerts */}
      {pendingExpertCount > 0 && (
        <div style={{ background: "#FEF3C7", borderLeft: "4px solid #F59E0B", borderRadius: 8, padding: "12px 16px", marginBottom: 24, fontSize: 14, color: "#92400E", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span><strong>Chờ xử lý:</strong> {pendingExpertCount} yêu cầu phê duyệt chuyên gia đang chờ.</span>
          <button onClick={() => navigate("/admin/experts")} style={{ padding: "6px 14px", borderRadius: 6, border: "1.5px solid #F59E0B", background: "transparent", color: "#B45309", fontSize: 12, fontWeight: 600, cursor: "pointer" }}>
            Xem ngay
          </button>
        </div>
      )}

      {/* Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 16, marginBottom: 24 }}>
        {[
          { label: "Tổng người dùng", value: "451", color: "#22C55E", path: "/admin/users" },
          { label: "Chuyên gia xác minh", value: "28", color: "#2563EB", path: "/admin/experts" },
          { label: "Thực phẩm trong DB", value: "1,284", color: "#F59E0B", path: "/admin/food" },
          { label: "Người dùng hoạt động", value: "387", color: "#10B981", path: "/admin/users" },
        ].map((s) => (
          <Card key={s.label} onClick={() => navigate(s.path)}>
            <div style={{ fontSize: 12, color: "#6B7280", marginBottom: 4 }}>{s.label}</div>
            <div style={{ fontSize: 30, fontWeight: 700, color: s.color }}>{s.value}</div>
            <div style={{ fontSize: 12, color: "#9CA3AF", marginTop: 4 }}>Nhấn để quản lý →</div>
          </Card>
        ))}
      </div>

      {/* Quick actions */}
      <div style={{ display: "flex", gap: 12, marginBottom: 24, flexWrap: "wrap" }}>
        <button onClick={() => navigate("/admin/users")}
          style={{ height: 44, padding: "0 18px", borderRadius: 10, border: "1.5px solid #22C55E", background: "#DCFCE7", color: "#16A34A", fontSize: 14, fontWeight: 600, cursor: "pointer" }}>
          Quản lý người dùng
        </button>
        <button onClick={() => navigate("/admin/food")}
          style={{ height: 44, padding: "0 18px", borderRadius: 10, border: "1.5px solid #F59E0B", background: "#FEF3C7", color: "#B45309", fontSize: 14, fontWeight: 600, cursor: "pointer" }}>
          Quản lý thực phẩm
        </button>
        <button onClick={() => navigate("/admin/experts")}
          style={{ height: 44, padding: "0 18px", borderRadius: 10, border: "none", background: "#2563EB", color: "#fff", fontSize: 14, fontWeight: 600, cursor: "pointer" }}>
          Cấp quyền chuyên gia {pendingExpertCount > 0 && `(${pendingExpertCount} chờ)`}
        </button>
      </div>

      {/* Charts */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 20, marginBottom: 24 }}>
        <Card style={{ gridColumn: "span 2" }}>
          <h3 style={{ fontSize: 15, fontWeight: 600, color: "#1F2937", marginBottom: 16 }}>Tăng trưởng người dùng (6 tháng)</h3>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={userStats}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#6B7280" }} />
              <YAxis tick={{ fontSize: 12, fill: "#6B7280" }} />
              <Tooltip contentStyle={{ borderRadius: 8, border: "1px solid #E5E7EB", fontSize: 12 }} formatter={(v: any) => [`${v} người`]} />
              <Bar key="users" dataKey="users" fill="#22C55E" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        <Card>
          <h3 style={{ fontSize: 15, fontWeight: 600, color: "#1F2937", marginBottom: 16 }}>Phân bổ vai trò</h3>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie key="roleData" data={roleData} cx="50%" cy="50%" outerRadius={80} dataKey="value" label={({ name, percent }) => `${(percent * 100).toFixed(0)}%`}>
                {roleData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
              </Pie>
              <Tooltip formatter={(v: any) => [`${v} người`]} />
            </PieChart>
          </ResponsiveContainer>
          <div style={{ display: "flex", flexDirection: "column", gap: 6, marginTop: 8 }}>
            {roleData.map((r) => (
              <div key={r.name} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <div style={{ width: 10, height: 10, borderRadius: 2, background: r.color }} />
                  <span style={{ fontSize: 13, color: "#374151" }}>{r.name}</span>
                </div>
                <span style={{ fontSize: 13, fontWeight: 600, color: "#1F2937" }}>{r.value}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Recent activity */}
      <Card>
        <h3 style={{ fontSize: 15, fontWeight: 600, color: "#1F2937", marginBottom: 16 }}>Hoạt động gần đây</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
          {recentActivities.map((activity, i) => (
            <div key={activity.id} style={{ display: "flex", alignItems: "center", gap: 14, padding: "12px 0", borderBottom: i < recentActivities.length - 1 ? "1px solid #F3F4F6" : "none" }}>
              <div style={{
                width: 36,
                height: 36,
                borderRadius: "50%",
                flexShrink: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 14,
                background: activity.type === "user" ? "#DCFCE7" : activity.type === "expert" ? "#DBEAFE" : activity.type === "lock" ? "#FEE2E2" : activity.type === "food" ? "#FEF3C7" : "#D1FAE5",
                color: activity.type === "user" ? "#16A34A" : activity.type === "expert" ? "#1D4ED8" : activity.type === "lock" ? "#DC2626" : activity.type === "food" ? "#B45309" : "#065F46",
              }}>
                {activity.type === "user" ? "U" : activity.type === "expert" ? "E" : activity.type === "lock" ? "X" : activity.type === "food" ? "F" : "✓"}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, color: "#1F2937" }}>{activity.action}</div>
                <div style={{ fontSize: 12, color: "#9CA3AF" }}>{activity.user}</div>
              </div>
              <div style={{ fontSize: 12, color: "#9CA3AF", whiteSpace: "nowrap" }}>{activity.time}</div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
