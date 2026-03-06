import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { useNavigate } from "react-router";

const users = [
  { id: 1, name: "Nguyễn Văn An", age: 27, bmi: 23.4, calo: 1450, caloBudget: 2000, goal: "Giảm cân", riskLevel: "safe" as const, lastActivity: "2 giờ trước", weight: 73.1, targetWeight: 68 },
  { id: 2, name: "Lê Thị Mai", age: 32, bmi: 28.2, calo: 2480, caloBudget: 1800, goal: "Giảm cân", riskLevel: "danger" as const, lastActivity: "1 giờ trước", weight: 82, targetWeight: 70 },
  { id: 3, name: "Phạm Minh Tuấn", age: 24, bmi: 19.1, calo: 2200, caloBudget: 2800, goal: "Tăng cân", riskLevel: "safe" as const, lastActivity: "5 phút trước", weight: 58, targetWeight: 65 },
  { id: 4, name: "Trần Thị Hương", age: 45, bmi: 31.5, calo: 2100, caloBudget: 1600, goal: "Giảm cân", riskLevel: "warning" as const, lastActivity: "3 giờ trước", weight: 90, targetWeight: 75 },
  { id: 5, name: "Hoàng Minh Đức", age: 35, bmi: 22.8, calo: 1920, caloBudget: 2200, goal: "Duy trì", riskLevel: "safe" as const, lastActivity: "30 phút trước", weight: 72, targetWeight: 72 },
];

const weightChartData = [
  { week: "T1", an: 75.5, mai: 83, tuan: 58.5, huong: 91 },
  { week: "T2", an: 75.1, mai: 82.8, tuan: 59, huong: 90.5 },
  { week: "T3", an: 74.3, mai: 82.3, tuan: 59.2, huong: 90.2 },
  { week: "T4", an: 73.9, mai: 82, tuan: 59.5, huong: 90 },
];

const riskConfig = {
  safe: { label: "An toàn", bg: "#D1FAE5", color: "#065F46" },
  warning: { label: "Cảnh báo", bg: "#FEF3C7", color: "#B45309" },
  danger: { label: "Nguy hiểm", bg: "#FEE2E2", color: "#991B1B" },
};

function Card({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <div style={{ background: "#FFFFFF", borderRadius: 16, padding: 24, boxShadow: "0 1px 3px rgba(0,0,0,0.06), 0 4px 12px rgba(0,0,0,0.04)", ...style }}>
      {children}
    </div>
  );
}

export default function ExpertDashboard() {
  const navigate = useNavigate();
  const dangerCount = users.filter((u) => u.riskLevel === "danger").length;
  const warningCount = users.filter((u) => u.riskLevel === "warning").length;
  const safeCount = users.filter((u) => u.riskLevel === "safe").length;

  const recentAlerts = users.filter((u) => u.riskLevel !== "safe").slice(0, 3);

  return (
    <div style={{ fontFamily: "Inter, sans-serif", color: "#1F2937" }}>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: 24, fontWeight: 600, color: "#1F2937", marginBottom: 4 }}>Dashboard Chuyên gia</h1>
        <p style={{ fontSize: 14, color: "#6B7280" }}>Xin chào! Dưới đây là tổng quan hoạt động hôm nay.</p>
      </div>

      {/* Risk alerts banner */}
      {(dangerCount > 0 || warningCount > 0) && (
        <div style={{ marginBottom: 24, display: "flex", flexDirection: "column", gap: 10 }}>
          {dangerCount > 0 && (
            <div style={{ background: "#FEE2E2", borderLeft: "4px solid #EF4444", borderRadius: 8, padding: "12px 16px", fontSize: 14, color: "#991B1B", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <strong>Cảnh báo khẩn:</strong> {dangerCount} người dùng vượt ngưỡng an toàn – cần can thiệp ngay.
              </div>
              <button
                onClick={() => navigate("/expert/alerts")}
                style={{ padding: "6px 14px", borderRadius: 6, border: "1.5px solid #EF4444", background: "transparent", color: "#EF4444", fontSize: 12, fontWeight: 600, cursor: "pointer", whiteSpace: "nowrap" }}
              >
                Xem cảnh báo
              </button>
            </div>
          )}
          {warningCount > 0 && (
            <div style={{ background: "#FEF3C7", borderLeft: "4px solid #F59E0B", borderRadius: 8, padding: "12px 16px", fontSize: 14, color: "#92400E", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <strong>Lưu ý:</strong> {warningCount} người dùng đang ở mức cảnh báo. Hãy kiểm tra thực đơn.
              </div>
              <button
                onClick={() => navigate("/expert/alerts")}
                style={{ padding: "6px 14px", borderRadius: 6, border: "1.5px solid #F59E0B", background: "transparent", color: "#B45309", fontSize: 12, fontWeight: 600, cursor: "pointer", whiteSpace: "nowrap" }}
              >
                Xem chi tiết
              </button>
            </div>
          )}
        </div>
      )}

      {/* Summary cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: 16, marginBottom: 24 }}>
        {[
          { label: "Tổng người dùng", value: users.length, color: "#2563EB", path: "/expert/users" },
          { label: "An toàn", value: safeCount, color: "#22C55E", path: "/expert/users" },
          { label: "Cảnh báo", value: warningCount, color: "#F59E0B", path: "/expert/alerts" },
          { label: "Nguy hiểm", value: dangerCount, color: "#EF4444", path: "/expert/alerts" },
        ].map((s) => (
          <Card key={s.label} style={{ cursor: "pointer" }} onClick={() => navigate(s.path)}>
            <div style={{ fontSize: 12, color: "#6B7280", marginBottom: 4 }}>{s.label}</div>
            <div style={{ fontSize: 32, fontWeight: 700, color: s.color }}>{s.value}</div>
            <div style={{ fontSize: 12, color: "#9CA3AF", marginTop: 4 }}>Nhấn để xem →</div>
          </Card>
        ))}
      </div>

      {/* Quick action buttons */}
      <div style={{ display: "flex", gap: 12, marginBottom: 24, flexWrap: "wrap" }}>
        <button
          onClick={() => navigate("/expert/users")}
          style={{ height: 44, padding: "0 20px", borderRadius: 10, border: "1.5px solid #2563EB", background: "#DBEAFE", color: "#1D4ED8", fontSize: 14, fontWeight: 600, cursor: "pointer" }}
        >
          Danh sách người dùng
        </button>
        <button
          onClick={() => navigate("/expert/create-menu")}
          style={{ height: 44, padding: "0 20px", borderRadius: 10, border: "none", background: "#2563EB", color: "#fff", fontSize: 14, fontWeight: 600, cursor: "pointer" }}
        >
          + Tạo thực đơn mới
        </button>
        <button
          onClick={() => navigate("/expert/alerts")}
          style={{ height: 44, padding: "0 20px", borderRadius: 10, border: "1.5px solid #EF4444", background: dangerCount > 0 ? "#FEE2E2" : "transparent", color: "#EF4444", fontSize: 14, fontWeight: 600, cursor: "pointer" }}
        >
          Cảnh báo rủi ro {dangerCount > 0 && `(${dangerCount})`}
        </button>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 20 }}>
        {/* Weight trend chart */}
        <Card style={{ gridColumn: "span 2" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
            <h3 style={{ fontSize: 15, fontWeight: 600, color: "#1F2937" }}>Xu hướng cân nặng người dùng (4 tuần)</h3>
            <button onClick={() => navigate("/expert/users")} style={{ fontSize: 13, color: "#2563EB", background: "none", border: "none", cursor: "pointer", fontWeight: 500 }}>
              Xem tất cả →
            </button>
          </div>
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={weightChartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" />
              <XAxis dataKey="week" tick={{ fontSize: 12, fill: "#6B7280" }} />
              <YAxis tick={{ fontSize: 12, fill: "#6B7280" }} />
              <Tooltip contentStyle={{ borderRadius: 8, border: "1px solid #E5E7EB", fontSize: 12 }} formatter={(v: any) => [`${v} kg`]} />
              <Line key="an" type="monotone" dataKey="an" stroke="#22C55E" strokeWidth={2} name="Nguyễn V.An" dot={{ r: 4 }} />
              <Line key="mai" type="monotone" dataKey="mai" stroke="#EF4444" strokeWidth={2} name="Lê T.Mai" dot={{ r: 4 }} />
              <Line key="tuan" type="monotone" dataKey="tuan" stroke="#2563EB" strokeWidth={2} name="P.M.Tuấn" dot={{ r: 4 }} />
              <Line key="huong" type="monotone" dataKey="huong" stroke="#F59E0B" strokeWidth={2} name="T.T.Hương" dot={{ r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
          {/* Legend */}
          <div style={{ display: "flex", gap: 16, marginTop: 12, flexWrap: "wrap" }}>
            {[{ name: "Nguyễn V.An", color: "#22C55E" }, { name: "Lê T.Mai", color: "#EF4444" }, { name: "P.M.Tuấn", color: "#2563EB" }, { name: "T.T.Hương", color: "#F59E0B" }].map((l) => (
              <div key={l.name} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <div style={{ width: 12, height: 3, borderRadius: 2, background: l.color }} />
                <span style={{ fontSize: 12, color: "#6B7280" }}>{l.name}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* Recent alerts */}
        <Card>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
            <h3 style={{ fontSize: 15, fontWeight: 600, color: "#1F2937" }}>Người dùng cần theo dõi</h3>
            <button onClick={() => navigate("/expert/alerts")} style={{ fontSize: 13, color: "#2563EB", background: "none", border: "none", cursor: "pointer", fontWeight: 500 }}>
              Xem tất cả →
            </button>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {recentAlerts.length > 0 ? recentAlerts.map((u) => {
              const rc = riskConfig[u.riskLevel];
              const caloPct = Math.round((u.calo / u.caloBudget) * 100);
              return (
                <div key={u.id} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 12px", background: "#F9FAFB", borderRadius: 10 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <div style={{ width: 36, height: 36, borderRadius: "50%", background: rc.bg, color: rc.color, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700 }}>
                      {u.name.charAt(0)}
                    </div>
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 600, color: "#1F2937" }}>{u.name}</div>
                      <div style={{ fontSize: 12, color: "#6B7280" }}>{caloPct}% ngân sách calo · {u.lastActivity}</div>
                    </div>
                  </div>
                  <span style={{ padding: "3px 8px", borderRadius: 6, fontSize: 11, fontWeight: 600, background: rc.bg, color: rc.color }}>
                    {rc.label}
                  </span>
                </div>
              );
            }) : (
              <div style={{ textAlign: "center", padding: "20px 0", color: "#9CA3AF", fontSize: 14 }}>
                Tất cả người dùng đang an toàn
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}
