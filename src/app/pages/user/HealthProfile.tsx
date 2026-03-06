import React, { useState } from "react";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";

const weightHistory = [
  { date: "01/10", weight: 76 },
  { date: "01/11", weight: 75.2 },
  { date: "01/12", weight: 74.8 },
  { date: "01/01", weight: 74.1 },
  { date: "01/02", weight: 73.5 },
  { date: "01/03", weight: 73.1 },
];

function Card({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <div style={{ background: "#FFFFFF", borderRadius: 16, padding: 24, boxShadow: "0 1px 3px rgba(0,0,0,0.06), 0 4px 12px rgba(0,0,0,0.04)", ...style }}>
      {children}
    </div>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return <label style={{ fontSize: 14, fontWeight: 500, color: "#374151", display: "block", marginBottom: 6 }}>{children}</label>;
}

function Input({ value, onChange, type = "text", placeholder }: any) {
  const [focused, setFocused] = useState(false);
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      style={{
        width: "100%",
        height: 44,
        padding: "0 12px",
        borderRadius: 8,
        border: `1px solid ${focused ? "#22C55E" : "#E5E7EB"}`,
        fontSize: 14,
        color: "#1F2937",
        outline: "none",
        boxSizing: "border-box",
        transition: "border-color 0.2s",
      }}
    />
  );
}

function Select({ value, onChange, options }: { value: string; onChange: (v: string) => void; options: { label: string; value: string }[] }) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      style={{
        width: "100%",
        height: 44,
        padding: "0 12px",
        borderRadius: 8,
        border: "1px solid #E5E7EB",
        fontSize: 14,
        color: "#1F2937",
        background: "#fff",
        outline: "none",
        boxSizing: "border-box",
        cursor: "pointer",
      }}
    >
      {options.map((o) => (
        <option key={o.value} value={o.value}>{o.label}</option>
      ))}
    </select>
  );
}

function StatCard({ label, value, unit, color = "#22C55E" }: { label: string; value: string | number; unit: string; color?: string }) {
  return (
    <div style={{ background: color + "10", borderRadius: 16, padding: "16px 20px", flex: 1, minWidth: 120 }}>
      <div style={{ fontSize: 12, color: "#6B7280", marginBottom: 4 }}>{label}</div>
      <div style={{ fontSize: 24, fontWeight: 700, color }}>{value}</div>
      <div style={{ fontSize: 12, color: "#6B7280" }}>{unit}</div>
    </div>
  );
}

export default function HealthProfile() {
  const [profile, setProfile] = useState({
    age: "27",
    gender: "male",
    height: "170",
    weight: "73.1",
    activity: "moderate",
    goal: "lose",
    targetWeight: "68",
  });
  const [saved, setSaved] = useState(false);

  const upd = (field: string, val: string) => setProfile((p) => ({ ...p, [field]: val }));

  const h = parseFloat(profile.height) / 100;
  const w = parseFloat(profile.weight);
  const bmi = h && w ? (w / (h * h)).toFixed(1) : "--";

  const activityFactor: Record<string, number> = {
    sedentary: 1.2, light: 1.375, moderate: 1.55, active: 1.725, veryActive: 1.9,
  };

  const age = parseInt(profile.age);
  const isMale = profile.gender === "male";
  const bmr = isMale
    ? Math.round(88.362 + 13.397 * w + 4.799 * parseFloat(profile.height) - 5.677 * age)
    : Math.round(447.593 + 9.247 * w + 3.098 * parseFloat(profile.height) - 4.33 * age);
  const tdee = Math.round(bmr * (activityFactor[profile.activity] ?? 1.55));

  const bmiNum = parseFloat(bmi as string);
  const bmiStatus = isNaN(bmiNum) ? "--" : bmiNum < 18.5 ? "Thiếu cân" : bmiNum < 25 ? "Bình thường" : bmiNum < 30 ? "Thừa cân" : "Béo phì";
  const bmiColor = isNaN(bmiNum) ? "#6B7280" : bmiNum < 18.5 ? "#F59E0B" : bmiNum < 25 ? "#22C55E" : bmiNum < 30 ? "#F59E0B" : "#EF4444";

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div style={{ fontFamily: "Inter, sans-serif", color: "#1F2937" }}>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: 24, fontWeight: 600, color: "#1F2937", marginBottom: 4 }}>Hồ sơ sức khỏe</h1>
        <p style={{ fontSize: 14, color: "#6B7280" }}>Cập nhật thông tin để nhận gợi ý dinh dưỡng chính xác hơn.</p>
      </div>

      {saved && (
        <div style={{ background: "#D1FAE5", borderLeft: "4px solid #10B981", borderRadius: 8, padding: "12px 16px", marginBottom: 20, fontSize: 14, color: "#065F46" }}>
          Hồ sơ đã được lưu thành công!
        </div>
      )}

      <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 24 }} className="lg:grid-cols-2">
        {/* Form */}
        <Card>
          <h2 style={{ fontSize: 16, fontWeight: 600, color: "#1F2937", marginBottom: 20 }}>Thông tin cơ bản</h2>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            <div>
              <Label>Tuổi</Label>
              <Input value={profile.age} onChange={(e: any) => upd("age", e.target.value)} type="number" placeholder="Tuổi" />
            </div>
            <div>
              <Label>Giới tính</Label>
              <Select
                value={profile.gender}
                onChange={(v) => upd("gender", v)}
                options={[{ label: "Nam", value: "male" }, { label: "Nữ", value: "female" }]}
              />
            </div>
            <div>
              <Label>Chiều cao (cm)</Label>
              <Input value={profile.height} onChange={(e: any) => upd("height", e.target.value)} type="number" placeholder="cm" />
            </div>
            <div>
              <Label>Cân nặng hiện tại (kg)</Label>
              <Input value={profile.weight} onChange={(e: any) => upd("weight", e.target.value)} type="number" placeholder="kg" />
            </div>
          </div>

          <div style={{ marginTop: 16 }}>
            <Label>Mức độ vận động</Label>
            <Select
              value={profile.activity}
              onChange={(v) => upd("activity", v)}
              options={[
                { label: "Ít vận động (ngồi nhiều)", value: "sedentary" },
                { label: "Nhẹ (1–3 ngày/tuần)", value: "light" },
                { label: "Vừa phải (3–5 ngày/tuần)", value: "moderate" },
                { label: "Tích cực (6–7 ngày/tuần)", value: "active" },
                { label: "Rất tích cực (2 lần/ngày)", value: "veryActive" },
              ]}
            />
          </div>

          <div style={{ marginTop: 16 }}>
            <Label>Mục tiêu</Label>
            <Select
              value={profile.goal}
              onChange={(v) => upd("goal", v)}
              options={[
                { label: "Giảm cân", value: "lose" },
                { label: "Duy trì cân nặng", value: "maintain" },
                { label: "Tăng cân / tăng cơ", value: "gain" },
              ]}
            />
          </div>

          <div style={{ marginTop: 16 }}>
            <Label>Cân nặng mục tiêu (kg)</Label>
            <Input value={profile.targetWeight} onChange={(e: any) => upd("targetWeight", e.target.value)} type="number" placeholder="kg" />
          </div>

          <button
            onClick={handleSave}
            style={{
              marginTop: 24,
              width: "100%",
              height: 44,
              borderRadius: 8,
              border: "none",
              background: "#22C55E",
              color: "#fff",
              fontSize: 14,
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            Lưu hồ sơ
          </button>
        </Card>

        {/* Stats */}
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <Card>
            <h2 style={{ fontSize: 16, fontWeight: 600, color: "#1F2937", marginBottom: 16 }}>Chỉ số tự động tính</h2>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
              <StatCard label="BMI" value={bmi} unit={bmiStatus} color={bmiColor} />
              <StatCard label="BMR" value={isNaN(bmr) ? "--" : bmr} unit="kcal/ngày" color="#2563EB" />
              <StatCard label="TDEE" value={isNaN(tdee) ? "--" : tdee} unit="kcal/ngày" color="#F59E0B" />
            </div>
            <div style={{ marginTop: 16, fontSize: 13, color: "#6B7280", background: "#F9FAFB", borderRadius: 8, padding: 12 }}>
              <strong style={{ color: "#374151" }}>TDEE</strong> là lượng calo bạn cần mỗi ngày để duy trì cân nặng hiện tại. <br />
              Để <strong>giảm cân</strong> khỏe mạnh: ăn ít hơn TDEE khoảng 300–500 kcal.
            </div>
          </Card>

          <Card>
            <h2 style={{ fontSize: 16, fontWeight: 600, color: "#1F2937", marginBottom: 16 }}>Lịch sử cân nặng</h2>
            <ResponsiveContainer width="100%" height={180}>
              <LineChart data={weightHistory}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" />
                <XAxis dataKey="date" tick={{ fontSize: 11, fill: "#6B7280" }} />
                <YAxis domain={[71, 77]} tick={{ fontSize: 11, fill: "#6B7280" }} />
                <Tooltip
                  contentStyle={{ borderRadius: 8, border: "1px solid #E5E7EB", fontSize: 12 }}
                  formatter={(v: any) => [`${v} kg`, "Cân nặng"]}
                />
                <Line key="weight" type="monotone" dataKey="weight" stroke="#22C55E" strokeWidth={2.5} dot={{ fill: "#22C55E", r: 3 }} />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </div>
      </div>
    </div>
  );
}
