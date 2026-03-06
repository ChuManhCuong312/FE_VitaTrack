import React, { useState } from "react";

interface MenuItem {
  meal: string;
  foods: string;
  calories: number;
  time: string;
}

interface Menu {
  id: number;
  title: string;
  targetUser: string;
  calories: number;
  duration: string;
  createdAt: string;
  status: "active" | "draft" | "completed";
  items: MenuItem[];
}

const sampleMenus: Menu[] = [
  {
    id: 1,
    title: "Thực đơn giảm cân tuần 1",
    targetUser: "Lê Thị Mai",
    calories: 1600,
    duration: "7 ngày",
    createdAt: "01/03/2026",
    status: "active",
    items: [
      { meal: "Bữa sáng", foods: "Yến mạch + sữa hạnh nhân + chuối", calories: 320, time: "07:00" },
      { meal: "Bữa trưa", foods: "Cơm gạo lứt + ức gà luộc + rau luộc", calories: 480, time: "12:00" },
      { meal: "Bữa phụ", foods: "Táo + hạt hạnh nhân (10g)", calories: 150, time: "15:30" },
      { meal: "Bữa tối", foods: "Salad cá hồi + dưa leo + dầu olive", calories: 420, time: "18:30" },
    ],
  },
  {
    id: 2,
    title: "Thực đơn tăng cơ – Phạm Minh Tuấn",
    targetUser: "Phạm Minh Tuấn",
    calories: 2800,
    duration: "14 ngày",
    createdAt: "28/02/2026",
    status: "active",
    items: [
      { meal: "Bữa sáng", foods: "Trứng ốp la (3 quả) + bánh mì nguyên cám + sữa tươi", calories: 520, time: "07:00" },
      { meal: "Bữa trưa", foods: "Cơm + thịt bò xào + rau cải xanh", calories: 680, time: "12:00" },
      { meal: "Bữa phụ", foods: "Protein shake + chuối", calories: 380, time: "15:00" },
      { meal: "Bữa tối", foods: "Cơm gạo lứt + cá thu + đậu hũ", calories: 620, time: "18:30" },
    ],
  },
  {
    id: 3,
    title: "Thực đơn duy trì sức khỏe",
    targetUser: "Nguyễn Văn An",
    calories: 2000,
    duration: "30 ngày",
    createdAt: "25/02/2026",
    status: "completed",
    items: [],
  },
];

const users = ["Nguyễn Văn An", "Lê Thị Mai", "Phạm Minh Tuấn", "Trần Thị Hương", "Hoàng Minh Đức"];

const statusConfig = {
  active: { label: "Đang áp dụng", bg: "#D1FAE5", color: "#065F46" },
  draft: { label: "Nháp", bg: "#F3F4F6", color: "#6B7280" },
  completed: { label: "Hoàn thành", bg: "#DBEAFE", color: "#1D4ED8" },
};

function Card({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <div style={{ background: "#FFFFFF", borderRadius: 16, padding: 24, boxShadow: "0 1px 3px rgba(0,0,0,0.06), 0 4px 12px rgba(0,0,0,0.04)", ...style }}>
      {children}
    </div>
  );
}

export default function ExpertCreateMenu() {
  const [menus, setMenus] = useState<Menu[]>(sampleMenus);
  const [showForm, setShowForm] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState<Menu | null>(null);
  const [saved, setSaved] = useState(false);
  const [form, setForm] = useState({
    title: "",
    targetUser: "",
    calories: "",
    duration: "",
    notes: "",
  });
  const [menuItems, setMenuItems] = useState<MenuItem[]>([
    { meal: "Bữa sáng", foods: "", calories: 0, time: "07:00" },
    { meal: "Bữa trưa", foods: "", calories: 0, time: "12:00" },
    { meal: "Bữa phụ", foods: "", calories: 0, time: "15:30" },
    { meal: "Bữa tối", foods: "", calories: 0, time: "18:30" },
  ]);

  const handleSave = (asDraft = false) => {
    const newMenu: Menu = {
      id: Date.now(),
      title: form.title || "Thực đơn mới",
      targetUser: form.targetUser,
      calories: parseInt(form.calories) || 0,
      duration: form.duration ? `${form.duration} ngày` : "7 ngày",
      createdAt: new Date().toLocaleDateString("vi-VN"),
      status: asDraft ? "draft" : "active",
      items: menuItems.filter((i) => i.foods.trim()),
    };
    setMenus((p) => [newMenu, ...p]);
    setSaved(true);
    setTimeout(() => {
      setSaved(false);
      setShowForm(false);
      setForm({ title: "", targetUser: "", calories: "", duration: "", notes: "" });
      setMenuItems([
        { meal: "Bữa sáng", foods: "", calories: 0, time: "07:00" },
        { meal: "Bữa trưa", foods: "", calories: 0, time: "12:00" },
        { meal: "Bữa phụ", foods: "", calories: 0, time: "15:30" },
        { meal: "Bữa tối", foods: "", calories: 0, time: "18:30" },
      ]);
    }, 2000);
  };

  const totalCalories = menuItems.reduce((s, i) => s + (i.calories || 0), 0);

  return (
    <div style={{ fontFamily: "Inter, sans-serif", color: "#1F2937" }}>
      <div style={{ marginBottom: 24, display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 12 }}>
        <div>
          <h1 style={{ fontSize: 24, fontWeight: 600, color: "#1F2937", marginBottom: 4 }}>Tạo thực đơn</h1>
          <p style={{ fontSize: 14, color: "#6B7280" }}>Xây dựng và quản lý kế hoạch dinh dưỡng cho người dùng.</p>
        </div>
        {!showForm && (
          <button
            onClick={() => setShowForm(true)}
            style={{ height: 44, padding: "0 20px", borderRadius: 10, border: "none", background: "#2563EB", color: "#fff", fontSize: 14, fontWeight: 600, cursor: "pointer" }}
          >
            + Tạo thực đơn mới
          </button>
        )}
      </div>

      {/* Create form */}
      {showForm && (
        <Card style={{ marginBottom: 24 }}>
          <h2 style={{ fontSize: 16, fontWeight: 600, color: "#1F2937", marginBottom: 20 }}>Thực đơn mới</h2>

          {saved && (
            <div style={{ background: "#D1FAE5", borderLeft: "4px solid #10B981", borderRadius: 8, padding: 12, marginBottom: 16, fontSize: 13, color: "#065F46" }}>
              Thực đơn đã được tạo và gửi đến người dùng thành công!
            </div>
          )}

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 14, marginBottom: 20 }}>
            <div>
              <label style={{ fontSize: 14, fontWeight: 500, color: "#374151", display: "block", marginBottom: 6 }}>Tên thực đơn</label>
              <input value={form.title} onChange={(e) => setForm((p) => ({ ...p, title: e.target.value }))}
                placeholder="VD: Thực đơn giảm cân tuần 1"
                style={{ width: "100%", height: 44, padding: "0 12px", borderRadius: 8, border: "1px solid #E5E7EB", fontSize: 14, outline: "none", boxSizing: "border-box" as const }} />
            </div>
            <div>
              <label style={{ fontSize: 14, fontWeight: 500, color: "#374151", display: "block", marginBottom: 6 }}>Người dùng</label>
              <select value={form.targetUser} onChange={(e) => setForm((p) => ({ ...p, targetUser: e.target.value }))}
                style={{ width: "100%", height: 44, padding: "0 12px", borderRadius: 8, border: "1px solid #E5E7EB", fontSize: 14, background: "#fff", outline: "none", boxSizing: "border-box" as const }}>
                <option value="">-- Chọn người dùng --</option>
                {users.map((u) => <option key={u} value={u}>{u}</option>)}
              </select>
            </div>
            <div>
              <label style={{ fontSize: 14, fontWeight: 500, color: "#374151", display: "block", marginBottom: 6 }}>Mục tiêu calo/ngày</label>
              <input type="number" value={form.calories} onChange={(e) => setForm((p) => ({ ...p, calories: e.target.value }))}
                placeholder="1600"
                style={{ width: "100%", height: 44, padding: "0 12px", borderRadius: 8, border: "1px solid #E5E7EB", fontSize: 14, outline: "none", boxSizing: "border-box" as const }} />
            </div>
            <div>
              <label style={{ fontSize: 14, fontWeight: 500, color: "#374151", display: "block", marginBottom: 6 }}>Thời gian (ngày)</label>
              <select value={form.duration} onChange={(e) => setForm((p) => ({ ...p, duration: e.target.value }))}
                style={{ width: "100%", height: 44, padding: "0 12px", borderRadius: 8, border: "1px solid #E5E7EB", fontSize: 14, background: "#fff", outline: "none", boxSizing: "border-box" as const }}>
                <option value="">Chọn thời gian</option>
                <option value="7">7 ngày</option>
                <option value="14">14 ngày</option>
                <option value="30">30 ngày</option>
              </select>
            </div>
          </div>

          {/* Meal items */}
          <h3 style={{ fontSize: 14, fontWeight: 600, color: "#374151", marginBottom: 12 }}>Chi tiết bữa ăn</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 20 }}>
            {menuItems.map((item, i) => (
              <div key={i} style={{ display: "grid", gridTemplateColumns: "100px 1fr 100px 80px", gap: 10, alignItems: "center", padding: "12px 14px", background: "#F9FAFB", borderRadius: 10 }}>
                <div style={{ fontSize: 14, fontWeight: 600, color: "#374151" }}>{item.meal}</div>
                <input
                  value={item.foods}
                  onChange={(e) => setMenuItems((p) => p.map((mi, idx) => idx === i ? { ...mi, foods: e.target.value } : mi))}
                  placeholder="Món ăn, nguyên liệu..."
                  style={{ height: 40, padding: "0 10px", borderRadius: 8, border: "1px solid #E5E7EB", fontSize: 13, outline: "none" }}
                />
                <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                  <input
                    type="number"
                    value={item.calories || ""}
                    onChange={(e) => setMenuItems((p) => p.map((mi, idx) => idx === i ? { ...mi, calories: parseInt(e.target.value) || 0 } : mi))}
                    placeholder="kcal"
                    style={{ width: "100%", height: 40, padding: "0 8px", borderRadius: 8, border: "1px solid #E5E7EB", fontSize: 13, outline: "none" }}
                  />
                </div>
                <input
                  type="time"
                  value={item.time}
                  onChange={(e) => setMenuItems((p) => p.map((mi, idx) => idx === i ? { ...mi, time: e.target.value } : mi))}
                  style={{ height: 40, padding: "0 8px", borderRadius: 8, border: "1px solid #E5E7EB", fontSize: 13, outline: "none" }}
                />
              </div>
            ))}
          </div>

          {/* Total calories */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 14px", background: totalCalories > (parseInt(form.calories) || 99999) ? "#FEE2E2" : "#D1FAE5", borderRadius: 10, marginBottom: 20 }}>
            <span style={{ fontSize: 14, fontWeight: 600, color: "#374151" }}>Tổng calo theo kế hoạch:</span>
            <span style={{ fontSize: 16, fontWeight: 700, color: totalCalories > (parseInt(form.calories) || 99999) ? "#EF4444" : "#22C55E" }}>
              {totalCalories} kcal
              {form.calories && <span style={{ fontSize: 13, fontWeight: 400, color: "#6B7280" }}> / {form.calories} kcal mục tiêu</span>}
            </span>
          </div>

          <div>
            <label style={{ fontSize: 14, fontWeight: 500, color: "#374151", display: "block", marginBottom: 6 }}>Ghi chú / Hướng dẫn thêm</label>
            <textarea value={form.notes} onChange={(e) => setForm((p) => ({ ...p, notes: e.target.value }))}
              placeholder="Lưu ý đặc biệt, hướng dẫn thực hiện..."
              rows={3}
              style={{ width: "100%", padding: "10px 12px", borderRadius: 8, border: "1px solid #E5E7EB", fontSize: 14, outline: "none", resize: "none", boxSizing: "border-box" as const }} />
          </div>

          <div style={{ display: "flex", gap: 10, marginTop: 20 }}>
            <button onClick={() => handleSave(false)}
              style={{ flex: 1, height: 44, borderRadius: 8, border: "none", background: "#2563EB", color: "#fff", fontSize: 14, fontWeight: 600, cursor: "pointer" }}>
              Tạo & Gửi thực đơn
            </button>
            <button onClick={() => handleSave(true)}
              style={{ height: 44, padding: "0 18px", borderRadius: 8, border: "1.5px solid #E5E7EB", background: "#fff", color: "#374151", fontSize: 14, cursor: "pointer" }}>
              Lưu nháp
            </button>
            <button onClick={() => setShowForm(false)}
              style={{ height: 44, padding: "0 18px", borderRadius: 8, border: "1.5px solid #E5E7EB", background: "#fff", color: "#6B7280", fontSize: 14, cursor: "pointer" }}>
              Hủy
            </button>
          </div>
        </Card>
      )}

      {/* Menu list */}
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <h2 style={{ fontSize: 16, fontWeight: 600, color: "#1F2937" }}>Thực đơn đã tạo ({menus.length})</h2>
        {menus.map((menu) => {
          const sc = statusConfig[menu.status];
          return (
            <Card key={menu.id} style={{ cursor: "pointer" }} onClick={() => setSelectedMenu(selectedMenu?.id === menu.id ? null : menu)}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 12 }}>
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
                    <h3 style={{ fontSize: 15, fontWeight: 600, color: "#1F2937" }}>{menu.title}</h3>
                    <span style={{ padding: "3px 8px", borderRadius: 6, fontSize: 12, fontWeight: 500, background: sc.bg, color: sc.color }}>{sc.label}</span>
                  </div>
                  <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
                    <span style={{ fontSize: 13, color: "#6B7280" }}>Người dùng: <strong style={{ color: "#1F2937" }}>{menu.targetUser || "—"}</strong></span>
                    <span style={{ fontSize: 13, color: "#6B7280" }}>Mục tiêu: <strong style={{ color: "#22C55E" }}>{menu.calories} kcal/ngày</strong></span>
                    <span style={{ fontSize: 13, color: "#6B7280" }}>Thời gian: {menu.duration}</span>
                    <span style={{ fontSize: 13, color: "#6B7280" }}>Tạo: {menu.createdAt}</span>
                  </div>
                </div>
                <div style={{ fontSize: 13, color: "#9CA3AF" }}>{selectedMenu?.id === menu.id ? "Thu gọn ▲" : "Xem chi tiết ▼"}</div>
              </div>

              {selectedMenu?.id === menu.id && menu.items.length > 0 && (
                <div style={{ marginTop: 16, borderTop: "1px solid #F3F4F6", paddingTop: 16 }}>
                  <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                    {menu.items.map((item, i) => (
                      <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, padding: "8px 12px", background: "#F9FAFB", borderRadius: 8 }}>
                        <span style={{ fontSize: 12, fontWeight: 600, color: "#2563EB", minWidth: 60 }}>{item.time}</span>
                        <span style={{ fontSize: 13, fontWeight: 600, color: "#374151", minWidth: 80 }}>{item.meal}</span>
                        <span style={{ fontSize: 13, color: "#6B7280", flex: 1 }}>{item.foods}</span>
                        <span style={{ fontSize: 13, fontWeight: 600, color: "#22C55E" }}>{item.calories} kcal</span>
                      </div>
                    ))}
                    <div style={{ padding: "8px 12px", background: "#DCFCE7", borderRadius: 8, display: "flex", justifyContent: "space-between" }}>
                      <span style={{ fontSize: 13, fontWeight: 600, color: "#374151" }}>Tổng cộng</span>
                      <span style={{ fontSize: 13, fontWeight: 700, color: "#22C55E" }}>
                        {menu.items.reduce((s, i) => s + i.calories, 0)} kcal
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </Card>
          );
        })}
      </div>
    </div>
  );
}
