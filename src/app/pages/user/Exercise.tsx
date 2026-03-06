import React, { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts";

const weekData = [
  { day: "T2", buoc: 8500, calo: 290 },
  { day: "T3", buoc: 6200, calo: 210 },
  { day: "T4", buoc: 11200, calo: 380 },
  { day: "T5", buoc: 9800, calo: 335 },
  { day: "T6", buoc: 7400, calo: 252 },
  { day: "T7", buoc: 12500, calo: 425 },
  { day: "CN", buoc: 7542, calo: 258 },
];

const ACTIVITIES = [
  { id: 1, name: "Chạy bộ", met: 8, unit: "phút" },
  { id: 2, name: "Đạp xe", met: 6, unit: "phút" },
  { id: 3, name: "Bơi lội", met: 7, unit: "phút" },
  { id: 4, name: "Tập gym", met: 5, unit: "phút" },
  { id: 5, name: "Yoga", met: 3, unit: "phút" },
  { id: 6, name: "Đi bộ", met: 3.5, unit: "phút" },
  { id: 7, name: "Bóng đá", met: 7, unit: "phút" },
  { id: 8, name: "Cầu lông", met: 5.5, unit: "phút" },
];

interface ActivityLog {
  id: number;
  name: string;
  duration: number;
  calo: number;
  time: string;
}

function Card({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <div style={{ background: "#FFFFFF", borderRadius: 16, padding: 24, boxShadow: "0 1px 3px rgba(0,0,0,0.06), 0 4px 12px rgba(0,0,0,0.04)", ...style }}>
      {children}
    </div>
  );
}

export default function Exercise() {
  const [logs, setLogs] = useState<ActivityLog[]>([
    { id: 1, name: "Chạy bộ", duration: 30, calo: 300, time: "07:00" },
    { id: 2, name: "Đi bộ", duration: 15, calo: 60, time: "12:30" },
  ]);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ activity: "0", duration: "", time: "" });
  const [confirmDelete, setConfirmDelete] = useState<number | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const totalCalo = logs.reduce((s, l) => s + l.calo, 0);
  const totalMin = logs.reduce((s, l) => s + l.duration, 0);

  const weight = 73.1;

  const addActivity = () => {
    const errs: Record<string, string> = {};
    if (form.activity === "0") errs.activity = "Vui lòng chọn hoạt động";
    if (!form.duration || parseInt(form.duration) <= 0) errs.duration = "Vui lòng nhập thời gian hợp lệ";
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }

    const actIdx = parseInt(form.activity) - 1;
    const act = ACTIVITIES[actIdx];
    const calo = Math.round((act.met * weight * parseInt(form.duration)) / 60);
    setLogs((p) => [
      ...p,
      { id: Date.now(), name: act.name, duration: parseInt(form.duration), calo, time: form.time || "08:00" },
    ]);
    setForm({ activity: "0", duration: "", time: "" });
    setErrors({});
    setShowModal(false);
  };

  return (
    <div style={{ fontFamily: "Inter, sans-serif", color: "#1F2937" }}>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: 24, fontWeight: 600, color: "#1F2937", marginBottom: 4 }}>Theo dõi vận động</h1>
        <p style={{ fontSize: 14, color: "#6B7280" }}>Ghi lại hoạt động thể chất và theo dõi tiến trình của bạn.</p>
      </div>

      {/* Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 16, marginBottom: 24 }}>
        {[
          { label: "Số bước hôm nay", value: "7,542", unit: "/ 10,000 bước", color: "#2563EB", pct: 75 },
          { label: "Calo tiêu hao", value: totalCalo, unit: "kcal", color: "#22C55E", pct: Math.min((totalCalo / 500) * 100, 100) },
          { label: "Thời gian tập", value: totalMin, unit: "phút", color: "#F59E0B", pct: Math.min((totalMin / 60) * 100, 100) },
          { label: "Quãng đường", value: "5.2", unit: "km", color: "#10B981", pct: 52 },
        ].map((s) => (
          <Card key={s.label}>
            <div style={{ fontSize: 12, color: "#6B7280", marginBottom: 6 }}>{s.label}</div>
            <div style={{ fontSize: 26, fontWeight: 700, color: s.color, lineHeight: 1 }}>{s.value}</div>
            <div style={{ fontSize: 12, color: "#6B7280", marginBottom: 10, marginTop: 2 }}>{s.unit}</div>
            <div style={{ background: "#E5E7EB", borderRadius: 99, height: 6 }}>
              <div style={{ width: `${s.pct}%`, height: "100%", background: s.color, borderRadius: 99 }} />
            </div>
          </Card>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 24, alignItems: "start" }} className="lg:grid-cols-[1fr_340px]">
        {/* Charts */}
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <Card>
            <h3 style={{ fontSize: 15, fontWeight: 600, color: "#1F2937", marginBottom: 16 }}>Số bước – Tuần này</h3>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={weekData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" vertical={false} />
                <XAxis dataKey="day" tick={{ fontSize: 12, fill: "#6B7280" }} />
                <YAxis tick={{ fontSize: 12, fill: "#6B7280" }} />
                <Tooltip
                  contentStyle={{ borderRadius: 8, border: "1px solid #E5E7EB", fontSize: 13 }}
                  formatter={(v: any) => [`${v.toLocaleString()} bước`]}
                />
                <Bar key="buoc" dataKey="buoc" fill="#2563EB" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </Card>

          <Card>
            <h3 style={{ fontSize: 15, fontWeight: 600, color: "#1F2937", marginBottom: 16 }}>Calo tiêu hao – Tuần này</h3>
            <ResponsiveContainer width="100%" height={180}>
              <LineChart data={weekData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" />
                <XAxis dataKey="day" tick={{ fontSize: 12, fill: "#6B7280" }} />
                <YAxis tick={{ fontSize: 12, fill: "#6B7280" }} />
                <Tooltip
                  contentStyle={{ borderRadius: 8, border: "1px solid #E5E7EB", fontSize: 13 }}
                  formatter={(v: any) => [`${v} kcal`]}
                />
                <Line key="calo" type="monotone" dataKey="calo" stroke="#22C55E" strokeWidth={2.5} dot={{ fill: "#22C55E", r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </div>

        {/* Activity logs */}
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <Card>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
              <h3 style={{ fontSize: 15, fontWeight: 600, color: "#1F2937" }}>Hoạt động hôm nay</h3>
              <button
                onClick={() => setShowModal(true)}
                style={{ height: 36, padding: "0 14px", borderRadius: 8, border: "none", background: "#22C55E", color: "#fff", fontSize: 13, fontWeight: 600, cursor: "pointer" }}
              >
                + Thêm
              </button>
            </div>

            {logs.length === 0 ? (
              <div style={{ textAlign: "center", padding: "24px 0", color: "#6B7280", fontSize: 14 }}>Chưa ghi nhận hoạt động nào.</div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {logs.map((log) => (
                  <div
                    key={log.id}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      padding: "10px 12px",
                      borderRadius: 12,
                      background: "#F9FAFB",
                      border: "1px solid #F3F4F6",
                    }}
                  >
                    <div>
                      <div style={{ fontSize: 14, fontWeight: 500, color: "#1F2937" }}>{log.name}</div>
                      <div style={{ fontSize: 12, color: "#6B7280" }}>{log.time} · {log.duration} phút</div>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <span style={{ fontSize: 14, fontWeight: 600, color: "#22C55E" }}>-{log.calo} kcal</span>
                      {confirmDelete === log.id ? (
                        <div style={{ display: "flex", gap: 4 }}>
                          <button onClick={() => { setLogs((p) => p.filter((l) => l.id !== log.id)); setConfirmDelete(null); }}
                            style={{ padding: "4px 8px", borderRadius: 6, border: "none", background: "#EF4444", color: "#fff", fontSize: 11, cursor: "pointer" }}>
                            Xóa
                          </button>
                          <button onClick={() => setConfirmDelete(null)}
                            style={{ padding: "4px 8px", borderRadius: 6, border: "1px solid #E5E7EB", background: "#fff", color: "#374151", fontSize: 11, cursor: "pointer" }}>
                            Hủy
                          </button>
                        </div>
                      ) : (
                        <button onClick={() => setConfirmDelete(log.id)}
                          style={{ padding: "4px 8px", borderRadius: 6, border: "1px solid #E5E7EB", background: "transparent", color: "#6B7280", fontSize: 11, cursor: "pointer" }}>
                          Xóa
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Card>

          <Card>
            <h3 style={{ fontSize: 15, fontWeight: 600, color: "#1F2937", marginBottom: 12 }}>Liên kết thiết bị</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {[
                { name: "Google Fit", status: "Chưa kết nối" },
                { name: "Apple Health", status: "Chưa kết nối" },
                { name: "Garmin Connect", status: "Chưa kết nối" },
              ].map((d) => (
                <div key={d.name} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 12px", borderRadius: 12, border: "1px solid #E5E7EB" }}>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 500, color: "#1F2937" }}>{d.name}</div>
                    <div style={{ fontSize: 12, color: "#6B7280" }}>{d.status}</div>
                  </div>
                  <button style={{ height: 32, padding: "0 12px", borderRadius: 8, border: "1.5px solid #2563EB", background: "transparent", color: "#2563EB", fontSize: 12, fontWeight: 500, cursor: "pointer" }}>
                    Kết nối
                  </button>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>

      {/* Modal add activity */}
      {showModal && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center", padding: 16 }}>
          <div style={{ background: "#fff", borderRadius: 16, padding: 32, width: "100%", maxWidth: 480, boxShadow: "0 20px 60px rgba(0,0,0,0.2)" }}>
            <h3 style={{ fontSize: 18, fontWeight: 600, color: "#1F2937", marginBottom: 20 }}>Thêm hoạt động</h3>
            <div style={{ marginBottom: 16 }}>
              <label style={{ fontSize: 14, fontWeight: 500, color: "#374151", display: "block", marginBottom: 6 }}>Loại hoạt động</label>
              <select
                value={form.activity}
                onChange={(e) => { setForm((p) => ({ ...p, activity: e.target.value })); setErrors((p) => ({ ...p, activity: "" })); }}
                style={{ width: "100%", height: 44, padding: "0 12px", borderRadius: 8, border: `1px solid ${errors.activity ? "#EF4444" : "#E5E7EB"}`, fontSize: 14, background: "#fff", outline: "none", boxSizing: "border-box" as const }}
              >
                <option value="0">-- Chọn hoạt động --</option>
                {ACTIVITIES.map((a) => (
                  <option key={a.id} value={a.id}>{a.name}</option>
                ))}
              </select>
              {errors.activity && <p style={{ fontSize: 12, color: "#EF4444", marginTop: 4 }}>{errors.activity}</p>}
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 20 }}>
              <div>
                <label style={{ fontSize: 14, fontWeight: 500, color: "#374151", display: "block", marginBottom: 6 }}>Thời gian (phút)</label>
                <input
                  type="number"
                  value={form.duration}
                  onChange={(e) => { setForm((p) => ({ ...p, duration: e.target.value })); setErrors((p) => ({ ...p, duration: "" })); }}
                  placeholder="30"
                  style={{ width: "100%", height: 44, padding: "0 12px", borderRadius: 8, border: `1px solid ${errors.duration ? "#EF4444" : "#E5E7EB"}`, fontSize: 14, outline: "none", boxSizing: "border-box" as const }}
                />
                {errors.duration && <p style={{ fontSize: 12, color: "#EF4444", marginTop: 4 }}>{errors.duration}</p>}
              </div>
              <div>
                <label style={{ fontSize: 14, fontWeight: 500, color: "#374151", display: "block", marginBottom: 6 }}>Thời điểm</label>
                <input
                  type="time"
                  value={form.time}
                  onChange={(e) => setForm((p) => ({ ...p, time: e.target.value }))}
                  style={{ width: "100%", height: 44, padding: "0 12px", borderRadius: 8, border: "1px solid #E5E7EB", fontSize: 14, outline: "none", boxSizing: "border-box" as const }}
                />
              </div>
            </div>
            <div style={{ display: "flex", gap: 12 }}>
              <button
                onClick={addActivity}
                style={{ flex: 1, height: 44, borderRadius: 8, border: "none", background: "#22C55E", color: "#fff", fontSize: 14, fontWeight: 600, cursor: "pointer" }}
              >
                Lưu hoạt động
              </button>
              <button
                onClick={() => { setShowModal(false); setErrors({}); }}
                style={{ flex: 1, height: 44, borderRadius: 8, border: "1.5px solid #E5E7EB", background: "#fff", color: "#374151", fontSize: 14, cursor: "pointer" }}
              >
                Hủy
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
