import React, { useState } from "react";

interface FoodItem {
  id: number;
  name: string;
  calo: number;
  protein: number;
  carb: number;
  fat: number;
  category: string;
  fiber?: number;
  unit: string;
}

const initialFoods: FoodItem[] = [
  { id: 1, name: "Cơm trắng (1 chén)", calo: 200, protein: 4, carb: 44, fat: 0, category: "Tinh bột", fiber: 0.4, unit: "chén (180g)" },
  { id: 2, name: "Thịt gà ức luộc (100g)", calo: 165, protein: 31, carb: 0, fat: 4, category: "Đạm", fiber: 0, unit: "100g" },
  { id: 3, name: "Trứng gà luộc", calo: 78, protein: 6, carb: 1, fat: 5, category: "Đạm", fiber: 0, unit: "quả (50g)" },
  { id: 4, name: "Cà rốt (100g)", calo: 41, protein: 1, carb: 10, fat: 0, category: "Rau củ", fiber: 2.8, unit: "100g" },
  { id: 5, name: "Cá hồi tươi (100g)", calo: 208, protein: 20, carb: 0, fat: 13, category: "Đạm", fiber: 0, unit: "100g" },
  { id: 6, name: "Chuối (1 quả)", calo: 89, protein: 1, carb: 23, fat: 0, category: "Trái cây", fiber: 2.6, unit: "quả (120g)" },
  { id: 7, name: "Sữa chua không đường (100g)", calo: 59, protein: 3.5, carb: 4.7, fat: 3.3, category: "Sữa & Trứng", fiber: 0, unit: "100g" },
  { id: 8, name: "Yến mạch (50g khô)", calo: 190, protein: 6.5, carb: 33, fat: 3.5, category: "Tinh bột", fiber: 4, unit: "50g" },
  { id: 9, name: "Rau cải xanh luộc (100g)", calo: 23, protein: 2, carb: 3.6, fat: 0.3, category: "Rau củ", fiber: 1.8, unit: "100g" },
  { id: 10, name: "Đậu phụ (100g)", calo: 76, protein: 8, carb: 1.9, fat: 4.2, category: "Đạm", fiber: 0.3, unit: "100g" },
];

const categories = ["Tinh bột", "Đạm", "Rau củ", "Trái cây", "Sữa & Trứng", "Đồ uống", "Ăn vặt", "Khác"];

function Card({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <div style={{ background: "#FFFFFF", borderRadius: 16, padding: 24, boxShadow: "0 1px 3px rgba(0,0,0,0.06), 0 4px 12px rgba(0,0,0,0.04)", ...style }}>
      {children}
    </div>
  );
}

export default function AdminFood() {
  const [foods, setFoods] = useState<FoodItem[]>(initialFoods);
  const [showForm, setShowForm] = useState(false);
  const [editFood, setEditFood] = useState<FoodItem | null>(null);
  const [search, setSearch] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [confirmDelete, setConfirmDelete] = useState<number | null>(null);
  const [saved, setSaved] = useState(false);
  const [form, setForm] = useState({ name: "", calo: "", protein: "", carb: "", fat: "", category: "", fiber: "", unit: "" });

  const filtered = foods.filter((f) => {
    const matchSearch = f.name.toLowerCase().includes(search.toLowerCase());
    const matchCat = filterCategory === "all" || f.category === filterCategory;
    return matchSearch && matchCat;
  });

  const openAdd = () => {
    setEditFood(null);
    setForm({ name: "", calo: "", protein: "", carb: "", fat: "", category: "", fiber: "", unit: "" });
    setShowForm(true);
  };

  const openEdit = (food: FoodItem) => {
    setEditFood(food);
    setForm({ name: food.name, calo: String(food.calo), protein: String(food.protein), carb: String(food.carb), fat: String(food.fat), category: food.category, fiber: String(food.fiber || 0), unit: food.unit });
    setShowForm(true);
  };

  const saveFood = () => {
    if (!form.name || !form.calo) return;
    const foodData = {
      name: form.name,
      calo: parseFloat(form.calo),
      protein: parseFloat(form.protein) || 0,
      carb: parseFloat(form.carb) || 0,
      fat: parseFloat(form.fat) || 0,
      category: form.category || "Khác",
      fiber: parseFloat(form.fiber) || 0,
      unit: form.unit || "100g",
    };
    if (editFood) {
      setFoods((p) => p.map((f) => f.id === editFood.id ? { ...f, ...foodData } : f));
    } else {
      setFoods((p) => [...p, { id: Date.now(), ...foodData }]);
    }
    setSaved(true);
    setTimeout(() => { setSaved(false); setShowForm(false); setEditFood(null); }, 1800);
  };

  const deleteFood = (id: number) => {
    setFoods((p) => p.filter((f) => f.id !== id));
    setConfirmDelete(null);
  };

  const catCounts: Record<string, number> = {};
  foods.forEach((f) => { catCounts[f.category] = (catCounts[f.category] || 0) + 1; });

  return (
    <div style={{ fontFamily: "Inter, sans-serif", color: "#1F2937" }}>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: 24, fontWeight: 600, color: "#1F2937", marginBottom: 4 }}>Quản lý thực phẩm</h1>
        <p style={{ fontSize: 14, color: "#6B7280" }}>Quản lý cơ sở dữ liệu thực phẩm và thông tin dinh dưỡng.</p>
      </div>

      {/* Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: 14, marginBottom: 20 }}>
        <Card>
          <div style={{ fontSize: 12, color: "#6B7280" }}>Tổng thực phẩm</div>
          <div style={{ fontSize: 28, fontWeight: 700, color: "#22C55E", marginTop: 4 }}>{foods.length}</div>
        </Card>
        {Object.entries(catCounts).slice(0, 3).map(([cat, count]) => (
          <Card key={cat}>
            <div style={{ fontSize: 12, color: "#6B7280" }}>{cat}</div>
            <div style={{ fontSize: 28, fontWeight: 700, color: "#2563EB", marginTop: 4 }}>{count}</div>
          </Card>
        ))}
      </div>

      {/* Filters and actions */}
      <div style={{ display: "flex", gap: 10, marginBottom: 16, flexWrap: "wrap" }}>
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Tìm kiếm thực phẩm..."
          style={{ flex: 1, minWidth: 200, height: 44, padding: "0 14px", borderRadius: 10, border: "1px solid #E5E7EB", fontSize: 14, outline: "none" }}
        />
        <select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
          style={{ height: 44, padding: "0 12px", borderRadius: 10, border: "1px solid #E5E7EB", fontSize: 14, background: "#fff", outline: "none" }}
        >
          <option value="all">Tất cả danh mục</option>
          {categories.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>
        <button
          style={{ height: 44, padding: "0 14px", borderRadius: 10, border: "1.5px solid #2563EB", background: "transparent", color: "#2563EB", fontSize: 13, fontWeight: 500, cursor: "pointer" }}
        >
          Import CSV
        </button>
        <button
          onClick={openAdd}
          style={{ height: 44, padding: "0 16px", borderRadius: 10, border: "none", background: "#22C55E", color: "#fff", fontSize: 14, fontWeight: 600, cursor: "pointer" }}
        >
          + Thêm thực phẩm
        </button>
      </div>

      {/* Table */}
      <Card style={{ padding: 0, overflow: "hidden" }}>
        <div style={{ padding: "14px 20px", borderBottom: "1px solid #E5E7EB" }}>
          <span style={{ fontSize: 13, color: "#6B7280" }}>{filtered.length} thực phẩm</span>
        </div>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 600 }}>
            <thead>
              <tr style={{ background: "#F9FAFB" }}>
                {["Tên thực phẩm", "Đơn vị", "Danh mục", "Calo", "Protein", "Carb", "Fat", "Chất xơ", "Thao tác"].map((h) => (
                  <th key={h} style={{ padding: "12px 14px", textAlign: "left", fontSize: 12, fontWeight: 600, color: "#6B7280", borderBottom: "1px solid #E5E7EB" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((food) => (
                <tr key={food.id} style={{ borderBottom: "1px solid #F3F4F6" }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLTableRowElement).style.background = "#F9FAFB")}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLTableRowElement).style.background = "transparent")}
                >
                  <td style={{ padding: "12px 14px", fontSize: 14, fontWeight: 500, color: "#1F2937" }}>{food.name}</td>
                  <td style={{ padding: "12px 14px", fontSize: 12, color: "#9CA3AF" }}>{food.unit}</td>
                  <td style={{ padding: "12px 14px" }}>
                    <span style={{ fontSize: 12, padding: "3px 8px", borderRadius: 4, background: "#F3F4F6", color: "#374151" }}>{food.category}</span>
                  </td>
                  <td style={{ padding: "12px 14px", fontSize: 14, fontWeight: 700, color: "#22C55E" }}>{food.calo}</td>
                  <td style={{ padding: "12px 14px", fontSize: 13, color: "#374151" }}>{food.protein}g</td>
                  <td style={{ padding: "12px 14px", fontSize: 13, color: "#374151" }}>{food.carb}g</td>
                  <td style={{ padding: "12px 14px", fontSize: 13, color: "#374151" }}>{food.fat}g</td>
                  <td style={{ padding: "12px 14px", fontSize: 13, color: "#374151" }}>{food.fiber || 0}g</td>
                  <td style={{ padding: "12px 14px" }}>
                    <div style={{ display: "flex", gap: 6 }}>
                      <button onClick={() => openEdit(food)}
                        style={{ padding: "5px 10px", borderRadius: 6, border: "1.5px solid #2563EB", background: "transparent", color: "#2563EB", fontSize: 11, cursor: "pointer" }}>
                        Sửa
                      </button>
                      {confirmDelete === food.id ? (
                        <div style={{ display: "flex", gap: 4 }}>
                          <button onClick={() => deleteFood(food.id)} style={{ padding: "5px 8px", borderRadius: 6, border: "none", background: "#EF4444", color: "#fff", fontSize: 11, cursor: "pointer" }}>Xóa</button>
                          <button onClick={() => setConfirmDelete(null)} style={{ padding: "5px 8px", borderRadius: 6, border: "1px solid #E5E7EB", background: "#fff", fontSize: 11, cursor: "pointer" }}>Hủy</button>
                        </div>
                      ) : (
                        <button onClick={() => setConfirmDelete(food.id)}
                          style={{ padding: "5px 10px", borderRadius: 6, border: "1.5px solid #EF4444", background: "transparent", color: "#EF4444", fontSize: 11, cursor: "pointer" }}>
                          Xóa
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Add/Edit modal */}
      {showForm && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center", padding: 16 }}>
          <div style={{ background: "#fff", borderRadius: 16, padding: 32, width: "100%", maxWidth: 520, maxHeight: "90vh", overflowY: "auto" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
              <h3 style={{ fontSize: 18, fontWeight: 600, color: "#1F2937" }}>{editFood ? "Chỉnh sửa thực phẩm" : "Thêm thực phẩm mới"}</h3>
              <button onClick={() => setShowForm(false)} style={{ background: "none", border: "none", fontSize: 20, color: "#6B7280", cursor: "pointer" }}>✕</button>
            </div>
            {saved && (
              <div style={{ background: "#D1FAE5", borderLeft: "4px solid #10B981", borderRadius: 8, padding: 12, marginBottom: 16, fontSize: 13, color: "#065F46" }}>
                Đã lưu thành công!
              </div>
            )}
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <div>
                <label style={{ fontSize: 14, fontWeight: 500, color: "#374151", display: "block", marginBottom: 6 }}>Tên thực phẩm *</label>
                <input value={form.name} onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
                  placeholder="VD: Cơm trắng (1 chén)"
                  style={{ width: "100%", height: 44, padding: "0 12px", borderRadius: 8, border: "1px solid #E5E7EB", fontSize: 14, outline: "none", boxSizing: "border-box" as const }} />
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                <div>
                  <label style={{ fontSize: 14, fontWeight: 500, color: "#374151", display: "block", marginBottom: 6 }}>Danh mục</label>
                  <select value={form.category} onChange={(e) => setForm((p) => ({ ...p, category: e.target.value }))}
                    style={{ width: "100%", height: 44, padding: "0 12px", borderRadius: 8, border: "1px solid #E5E7EB", fontSize: 14, background: "#fff", outline: "none", boxSizing: "border-box" as const }}>
                    <option value="">-- Chọn danh mục --</option>
                    {categories.map((c) => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label style={{ fontSize: 14, fontWeight: 500, color: "#374151", display: "block", marginBottom: 6 }}>Đơn vị</label>
                  <input value={form.unit} onChange={(e) => setForm((p) => ({ ...p, unit: e.target.value }))}
                    placeholder="VD: 100g, 1 chén, 1 quả"
                    style={{ width: "100%", height: 44, padding: "0 12px", borderRadius: 8, border: "1px solid #E5E7EB", fontSize: 14, outline: "none", boxSizing: "border-box" as const }} />
                </div>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                {[
                  { key: "calo", label: "Calo (kcal) *" },
                  { key: "protein", label: "Protein (g)" },
                  { key: "carb", label: "Carb (g)" },
                  { key: "fat", label: "Fat (g)" },
                  { key: "fiber", label: "Chất xơ (g)" },
                ].map(({ key, label }) => (
                  <div key={key}>
                    <label style={{ fontSize: 14, fontWeight: 500, color: "#374151", display: "block", marginBottom: 6 }}>{label}</label>
                    <input type="number" step="0.1" min="0" value={(form as any)[key]} onChange={(e) => setForm((p) => ({ ...p, [key]: e.target.value }))}
                      placeholder="0"
                      style={{ width: "100%", height: 44, padding: "0 12px", borderRadius: 8, border: "1px solid #E5E7EB", fontSize: 14, outline: "none", boxSizing: "border-box" as const }} />
                  </div>
                ))}
              </div>
            </div>
            <div style={{ display: "flex", gap: 12, marginTop: 20 }}>
              <button onClick={saveFood}
                style={{ flex: 1, height: 44, borderRadius: 8, border: "none", background: "#22C55E", color: "#fff", fontSize: 14, fontWeight: 600, cursor: "pointer" }}>
                {editFood ? "Lưu thay đổi" : "Thêm thực phẩm"}
              </button>
              <button onClick={() => setShowForm(false)}
                style={{ flex: 1, height: 44, borderRadius: 8, border: "1.5px solid #E5E7EB", background: "#fff", color: "#374151", fontSize: 14, cursor: "pointer" }}>
                Hủy
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
