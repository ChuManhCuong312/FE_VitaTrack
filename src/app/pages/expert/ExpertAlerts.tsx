import React, { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

interface AlertUser {
  id: number;
  name: string;
  age: number;
  bmi: number;
  calo: number;
  caloBudget: number;
  weight: number;
  targetWeight: number;
  riskLevel: "warning" | "danger";
  riskReason: string;
  lastActivity: string;
  trend: "up" | "down" | "stable";
  history: { day: string; calo: number; budget: number }[];
}

const alertUsers: AlertUser[] = [
  {
    id: 2,
    name: "Lê Thị Mai",
    age: 32,
    bmi: 28.2,
    calo: 2480,
    caloBudget: 1800,
    weight: 82,
    targetWeight: 70,
    riskLevel: "danger",
    riskReason: "Vượt 137% ngân sách calo liên tục 3 ngày, BMI ở mức thừa cân",
    lastActivity: "1 giờ trước",
    trend: "up",
    history: [
      { day: "T2", calo: 2100, budget: 1800 },
      { day: "T3", calo: 2250, budget: 1800 },
      { day: "T4", calo: 2320, budget: 1800 },
      { day: "T5", calo: 2480, budget: 1800 },
      { day: "T6", calo: 2480, budget: 1800 },
      { day: "T7", calo: 2300, budget: 1800 },
      { day: "CN", calo: 2480, budget: 1800 },
    ],
  },
  {
    id: 4,
    name: "Trần Thị Hương",
    age: 45,
    bmi: 31.5,
    calo: 2100,
    caloBudget: 1600,
    weight: 90,
    targetWeight: 75,
    riskLevel: "warning",
    riskReason: "BMI 31.5 ở mức béo phì độ I, tiêu thụ 131% ngân sách calo",
    lastActivity: "3 giờ trước",
    trend: "stable",
    history: [
      { day: "T2", calo: 1950, budget: 1600 },
      { day: "T3", calo: 2000, budget: 1600 },
      { day: "T4", calo: 1900, budget: 1600 },
      { day: "T5", calo: 2100, budget: 1600 },
      { day: "T6", calo: 2050, budget: 1600 },
      { day: "T7", calo: 1980, budget: 1600 },
      { day: "CN", calo: 2100, budget: 1600 },
    ],
  },
];

const riskConfig = {
  warning: { label: "Cảnh báo", bg: "#FEF3C7", color: "#B45309", border: "#F59E0B" },
  danger: { label: "Nguy hiểm", bg: "#FEE2E2", color: "#991B1B", border: "#EF4444" },
};

function Card({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <div style={{ background: "#FFFFFF", borderRadius: 16, padding: 24, boxShadow: "0 1px 3px rgba(0,0,0,0.06), 0 4px 12px rgba(0,0,0,0.04)", ...style }}>
      {children}
    </div>
  );
}

export default function ExpertAlerts() {
  const [expandedId, setExpandedId] = useState<number | null>(alertUsers[0]?.id || null);
  const [interventions, setInterventions] = useState<Record<number, string>>({});
  const [sentInterventions, setSentInterventions] = useState<Set<number>>(new Set());

  const handleSendIntervention = (userId: number) => {
    if (!interventions[userId]?.trim()) return;
    setSentInterventions((p) => new Set([...p, userId]));
    setTimeout(() => {
      setSentInterventions((p) => {
        const next = new Set(p);
        next.delete(userId);
        return next;
      });
      setInterventions((p) => ({ ...p, [userId]: "" }));
    }, 3000);
  };

  return (
    <div style={{ fontFamily: "Inter, sans-serif", color: "#1F2937" }}>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: 24, fontWeight: 600, color: "#1F2937", marginBottom: 4 }}>Cảnh báo rủi ro</h1>
        <p style={{ fontSize: 14, color: "#6B7280" }}>Theo dõi và can thiệp kịp thời cho người dùng có rủi ro sức khỏe.</p>
      </div>

      {/* Summary */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 16, marginBottom: 24 }}>
        {[
          { label: "Tổng cảnh báo", value: alertUsers.length, color: "#F59E0B", bg: "#FEF3C7" },
          { label: "Mức nguy hiểm", value: alertUsers.filter((u) => u.riskLevel === "danger").length, color: "#EF4444", bg: "#FEE2E2" },
          { label: "Mức cảnh báo", value: alertUsers.filter((u) => u.riskLevel === "warning").length, color: "#F59E0B", bg: "#FEF3C7" },
          { label: "Cần can thiệp ngay", value: alertUsers.filter((u) => u.riskLevel === "danger").length, color: "#DC2626", bg: "#FEE2E2" },
        ].map((s) => (
          <Card key={s.label} style={{ background: s.bg }}>
            <div style={{ fontSize: 12, color: s.color, fontWeight: 600 }}>{s.label}</div>
            <div style={{ fontSize: 36, fontWeight: 700, color: s.color, lineHeight: 1.2, marginTop: 4 }}>{s.value}</div>
          </Card>
        ))}
      </div>

      {/* General recommendation */}
      <div style={{ background: "#EFF6FF", borderLeft: "4px solid #2563EB", borderRadius: 8, padding: "12px 16px", marginBottom: 24, fontSize: 14, color: "#1E3A8A" }}>
        <strong>Hướng dẫn xử lý:</strong> Với người dùng ở mức nguy hiểm, hãy liên hệ trong vòng 24 giờ và điều chỉnh thực đơn ngay.
        Với mức cảnh báo, theo dõi thêm 48 giờ và gửi lời khuyên dinh dưỡng phù hợp.
      </div>

      {/* Alert cards */}
      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        {alertUsers.map((user) => {
          const rc = riskConfig[user.riskLevel];
          const caloPct = Math.round((user.calo / user.caloBudget) * 100);
          const isExpanded = expandedId === user.id;
          const isSent = sentInterventions.has(user.id);

          return (
            <Card key={user.id} style={{ borderLeft: `4px solid ${rc.border}` }}>
              {/* Header */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 12, marginBottom: 16 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                  <div style={{ width: 52, height: 52, borderRadius: "50%", background: rc.bg, color: rc.color, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, fontWeight: 700 }}>
                    {user.name.charAt(0)}
                  </div>
                  <div>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <h3 style={{ fontSize: 16, fontWeight: 600, color: "#1F2937" }}>{user.name}</h3>
                      <span style={{ padding: "3px 10px", borderRadius: 6, fontSize: 12, fontWeight: 700, background: rc.bg, color: rc.color }}>
                        {rc.label}
                      </span>
                    </div>
                    <div style={{ fontSize: 13, color: "#6B7280", marginTop: 3 }}>{user.age} tuổi · Hoạt động: {user.lastActivity}</div>
                  </div>
                </div>
                <button
                  onClick={() => setExpandedId(isExpanded ? null : user.id)}
                  style={{ height: 38, padding: "0 16px", borderRadius: 8, border: "1.5px solid #E5E7EB", background: "#fff", color: "#374151", fontSize: 13, cursor: "pointer" }}
                >
                  {isExpanded ? "Thu gọn ▲" : "Xem chi tiết ▼"}
                </button>
              </div>

              {/* Risk reason */}
              <div style={{ background: rc.bg, borderRadius: 8, padding: "10px 14px", marginBottom: 16, fontSize: 13, color: rc.color }}>
                <strong>Lý do cảnh báo:</strong> {user.riskReason}
              </div>

              {/* Quick stats */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))", gap: 10, marginBottom: isExpanded ? 20 : 0 }}>
                {[
                  { label: "BMI", value: user.bmi, unit: "", color: user.bmi >= 30 ? "#EF4444" : "#F59E0B" },
                  { label: "Cân nặng", value: user.weight, unit: " kg", color: "#1F2937" },
                  { label: "Mục tiêu", value: user.targetWeight, unit: " kg", color: "#22C55E" },
                  { label: "Calo hôm nay", value: `${caloPct}%`, unit: " ngân sách", color: caloPct > 130 ? "#EF4444" : "#F59E0B" },
                ].map((s) => (
                  <div key={s.label} style={{ background: "#F9FAFB", borderRadius: 10, padding: "10px 14px" }}>
                    <div style={{ fontSize: 12, color: "#6B7280" }}>{s.label}</div>
                    <div style={{ fontSize: 16, fontWeight: 700, color: s.color, marginTop: 2 }}>{s.value}{s.unit}</div>
                  </div>
                ))}
              </div>

              {/* Expanded detail */}
              {isExpanded && (
                <div>
                  {/* Calorie chart */}
                  <h4 style={{ fontSize: 13, fontWeight: 600, color: "#6B7280", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 12 }}>
                    Calo 7 ngày qua
                  </h4>
                  <ResponsiveContainer width="100%" height={200}>
                    <BarChart data={user.history} barGap={2}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" vertical={false} />
                      <XAxis dataKey="day" tick={{ fontSize: 12, fill: "#6B7280" }} />
                      <YAxis tick={{ fontSize: 12, fill: "#6B7280" }} />
                      <Tooltip
                        contentStyle={{ borderRadius: 8, border: "1px solid #E5E7EB", fontSize: 12 }}
                        formatter={(v: any, name: string) => [`${v} kcal`, name === "calo" ? "Calo nạp" : "Ngân sách"]}
                      />
                      <Bar key={`calo-${user.id}`} dataKey="calo" fill={user.riskLevel === "danger" ? "#EF4444" : "#F59E0B"} radius={[4, 4, 0, 0]} name="calo" />
                      <Bar key={`budget-${user.id}`} dataKey="budget" fill="#D1FAE5" radius={[4, 4, 0, 0]} name="budget" />
                    </BarChart>
                  </ResponsiveContainer>

                  {/* Intervention */}
                  <div style={{ marginTop: 20, padding: 16, background: "#F9FAFB", borderRadius: 12 }}>
                    <h4 style={{ fontSize: 14, fontWeight: 600, color: "#1F2937", marginBottom: 12 }}>Gửi tư vấn / can thiệp</h4>
                    {isSent ? (
                      <div style={{ background: "#D1FAE5", borderLeft: "4px solid #10B981", borderRadius: 8, padding: "12px 14px", fontSize: 13, color: "#065F46" }}>
                        Đã gửi tư vấn đến {user.name} thành công!
                      </div>
                    ) : (
                      <>
                        <div style={{ display: "flex", gap: 8, marginBottom: 10, flexWrap: "wrap" }}>
                          {[
                            "Hãy giảm khẩu phần cơm và tăng rau xanh trong bữa ăn",
                            "Tập thể dục ít nhất 30 phút mỗi ngày để cải thiện sức khỏe",
                            "Uống đủ 2-2.5L nước mỗi ngày và hạn chế đồ uống có đường",
                          ].map((suggestion) => (
                            <button key={suggestion}
                              onClick={() => setInterventions((p) => ({ ...p, [user.id]: suggestion }))}
                              style={{ padding: "6px 12px", borderRadius: 8, border: "1px solid #E5E7EB", background: "#fff", color: "#374151", fontSize: 12, cursor: "pointer", textAlign: "left" }}
                            >
                              {suggestion}
                            </button>
                          ))}
                        </div>
                        <div style={{ display: "flex", gap: 8 }}>
                          <textarea
                            value={interventions[user.id] || ""}
                            onChange={(e) => setInterventions((p) => ({ ...p, [user.id]: e.target.value }))}
                            placeholder="Nhập lời khuyên dinh dưỡng cho người dùng..."
                            rows={3}
                            style={{ flex: 1, padding: "10px 12px", borderRadius: 8, border: "1px solid #E5E7EB", fontSize: 14, outline: "none", resize: "none" }}
                          />
                          <button
                            onClick={() => handleSendIntervention(user.id)}
                            style={{ padding: "0 20px", borderRadius: 8, border: "none", background: user.riskLevel === "danger" ? "#EF4444" : "#F59E0B", color: "#fff", fontSize: 14, fontWeight: 600, cursor: "pointer" }}
                          >
                            Gửi ngay
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              )}
            </Card>
          );
        })}

        {alertUsers.length === 0 && (
          <Card>
            <div style={{ textAlign: "center", padding: "40px 0" }}>
              <div style={{ fontSize: 48, marginBottom: 16 }}>✓</div>
              <h3 style={{ fontSize: 18, fontWeight: 600, color: "#22C55E", marginBottom: 8 }}>Tất cả đang an toàn!</h3>
              <p style={{ fontSize: 14, color: "#6B7280" }}>Không có người dùng nào cần cảnh báo hiện tại.</p>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}
