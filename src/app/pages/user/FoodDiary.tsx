import React, { useState } from "react";

interface FoodItem {
  id: number;
  name: string;
  calo: number;
  protein: number;
  carb: number;
  fat: number;
  hasAllergen?: boolean;
  allergen?: string;
}

const sampleFoods: Record<string, FoodItem[]> = {
  morning: [
    { id: 1, name: "Bánh mì trứng ốp la", calo: 320, protein: 14, carb: 38, fat: 12 },
    { id: 2, name: "Cà phê sữa", calo: 80, protein: 2, carb: 12, fat: 3 },
  ],
  noon: [
    { id: 3, name: "Cơm gà nướng", calo: 580, protein: 38, carb: 65, fat: 16 },
    { id: 4, name: "Canh rau xanh", calo: 45, protein: 3, carb: 6, fat: 1 },
  ],
  evening: [
    { id: 5, name: "Phở bò", calo: 450, protein: 28, carb: 58, fat: 9, hasAllergen: true, allergen: "gluten" },
  ],
  other: [],
};

const TABS = [
  { key: "morning", label: "Sáng" },
  { key: "noon", label: "Trưa" },
  { key: "evening", label: "Tối" },
  { key: "other", label: "Khác" },
];

const FOOD_DB: FoodItem[] = [
  { id: 100, name: "Cơm trắng (1 chén)", calo: 200, protein: 4, carb: 44, fat: 0 },
  { id: 101, name: "Thịt gà luộc (100g)", calo: 165, protein: 31, carb: 0, fat: 4 },
  { id: 102, name: "Trứng luộc", calo: 78, protein: 6, carb: 1, fat: 5 },
  { id: 103, name: "Rau cải xào", calo: 60, protein: 2, carb: 8, fat: 2 },
  { id: 104, name: "Sữa chua", calo: 100, protein: 5, carb: 14, fat: 3 },
  { id: 105, name: "Chuối", calo: 89, protein: 1, carb: 23, fat: 0 },
  { id: 106, name: "Bánh mì sandwich", calo: 265, protein: 9, carb: 49, fat: 4, hasAllergen: true, allergen: "gluten" },
  { id: 107, name: "Cá hồi nướng (100g)", calo: 208, protein: 20, carb: 0, fat: 13 },
];

function Card({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <div style={{ background: "#FFFFFF", borderRadius: 16, padding: 24, boxShadow: "0 1px 3px rgba(0,0,0,0.06), 0 4px 12px rgba(0,0,0,0.04)", ...style }}>
      {children}
    </div>
  );
}

export default function FoodDiary() {
  const [activeTab, setActiveTab] = useState("morning");
  const [diary, setDiary] = useState(sampleFoods);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<FoodItem[]>([]);
  const [showSearch, setShowSearch] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split("T")[0]);
  const [confirmDelete, setConfirmDelete] = useState<number | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [showAIResult, setShowAIResult] = useState(false);

  const currentMeal = diary[activeTab] ?? [];

  const allFoods = Object.values(diary).flat();
  const totalCalo = allFoods.reduce((s, f) => s + f.calo, 0);
  const totalProtein = allFoods.reduce((s, f) => s + f.protein, 0);
  const totalCarb = allFoods.reduce((s, f) => s + f.carb, 0);
  const totalFat = allFoods.reduce((s, f) => s + f.fat, 0);
  const hasAllergen = allFoods.some((f) => f.hasAllergen);

  const handleSearch = (q: string) => {
    setSearchQuery(q);
    if (q.trim().length > 0) {
      setSearchResults(FOOD_DB.filter((f) => f.name.toLowerCase().includes(q.toLowerCase())));
    } else {
      setSearchResults([]);
    }
  };

  const addFood = (food: FoodItem) => {
    const newItem = { ...food, id: Date.now() };
    setDiary((prev) => ({
      ...prev,
      [activeTab]: [...(prev[activeTab] ?? []), newItem],
    }));
    setSearchQuery("");
    setSearchResults([]);
    setShowSearch(false);
  };

  const removeFood = (id: number) => {
    setDiary((prev) => ({
      ...prev,
      [activeTab]: (prev[activeTab] ?? []).filter((f) => f.id !== id),
    }));
    setConfirmDelete(null);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        setUploadedImage(ev.target?.result as string);
        setTimeout(() => setShowAIResult(true), 1200);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div style={{ fontFamily: "Inter, sans-serif", color: "#1F2937" }}>
      <div style={{ marginBottom: 24, display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
        <div>
          <h1 style={{ fontSize: 24, fontWeight: 600, color: "#1F2937", marginBottom: 4 }}>Nhật ký ăn uống</h1>
          <p style={{ fontSize: 14, color: "#6B7280" }}>Ghi lại bữa ăn của bạn để theo dõi dinh dưỡng.</p>
        </div>
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          style={{
            height: 44,
            padding: "0 12px",
            borderRadius: 8,
            border: "1px solid #E5E7EB",
            fontSize: 14,
            color: "#1F2937",
            outline: "none",
            background: "#fff",
          }}
        />
      </div>

      {/* Allergen alert */}
      {hasAllergen && (
        <div style={{ background: "#FEE2E2", borderLeft: "4px solid #EF4444", borderRadius: 8, padding: "12px 16px", marginBottom: 20, fontSize: 14, color: "#991B1B" }}>
          <strong>Cảnh báo dị ứng:</strong> Có thực phẩm chứa <strong>gluten</strong> trong nhật ký hôm nay. Vui lòng kiểm tra lại.
        </div>
      )}

      {/* Summary */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: 12, marginBottom: 24 }}>
        {[
          { label: "Tổng Calo", value: totalCalo, unit: "kcal", color: "#22C55E" },
          { label: "Protein", value: totalProtein, unit: "g", color: "#2563EB" },
          { label: "Carb", value: totalCarb, unit: "g", color: "#F59E0B" },
          { label: "Fat", value: totalFat, unit: "g", color: "#EF4444" },
        ].map((s) => (
          <div key={s.label} style={{ background: s.color + "10", borderRadius: 16, padding: "14px 16px" }}>
            <div style={{ fontSize: 12, color: "#6B7280" }}>{s.label}</div>
            <div style={{ fontSize: 22, fontWeight: 700, color: s.color }}>{s.value}<span style={{ fontSize: 13, fontWeight: 400, color: "#6B7280", marginLeft: 4 }}>{s.unit}</span></div>
          </div>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 24, alignItems: "start" }} className="lg:grid-cols-[1fr_320px]">
        {/* Main diary */}
        <Card>
          {/* Tabs */}
          <div style={{ display: "flex", gap: 4, marginBottom: 20, background: "#F9FAFB", borderRadius: 10, padding: 4 }}>
            {TABS.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                style={{
                  flex: 1,
                  height: 36,
                  borderRadius: 8,
                  border: "none",
                  background: activeTab === tab.key ? "#FFFFFF" : "transparent",
                  color: activeTab === tab.key ? "#22C55E" : "#6B7280",
                  fontSize: 13,
                  fontWeight: activeTab === tab.key ? 600 : 400,
                  cursor: "pointer",
                  boxShadow: activeTab === tab.key ? "0 1px 4px rgba(0,0,0,0.08)" : "none",
                  transition: "all 0.15s",
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Food list */}
          {currentMeal.length === 0 ? (
            <div style={{ textAlign: "center", padding: "32px 0", color: "#6B7280", fontSize: 14 }}>
              Chưa có thực phẩm nào. Thêm bữa ăn của bạn.
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 16 }}>
              {currentMeal.map((food) => (
                <div
                  key={food.id}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "12px 14px",
                    borderRadius: 12,
                    border: food.hasAllergen ? "1.5px solid #FCA5A5" : "1px solid #F3F4F6",
                    background: food.hasAllergen ? "#FFF5F5" : "#F9FAFB",
                  }}
                >
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <span style={{ fontSize: 14, fontWeight: 500, color: "#1F2937" }}>{food.name}</span>
                      {food.hasAllergen && (
                        <span style={{ fontSize: 11, padding: "2px 6px", borderRadius: 4, background: "#FEE2E2", color: "#EF4444", fontWeight: 500 }}>
                          {food.allergen}
                        </span>
                      )}
                    </div>
                    <div style={{ fontSize: 12, color: "#6B7280", marginTop: 2 }}>
                      P: {food.protein}g · C: {food.carb}g · F: {food.fat}g
                    </div>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <span style={{ fontSize: 15, fontWeight: 600, color: "#22C55E" }}>{food.calo} kcal</span>
                    {confirmDelete === food.id ? (
                      <div style={{ display: "flex", gap: 6 }}>
                        <button
                          onClick={() => removeFood(food.id)}
                          style={{ padding: "4px 10px", borderRadius: 6, border: "none", background: "#EF4444", color: "#fff", fontSize: 12, cursor: "pointer" }}
                        >
                          Xóa
                        </button>
                        <button
                          onClick={() => setConfirmDelete(null)}
                          style={{ padding: "4px 10px", borderRadius: 6, border: "1px solid #E5E7EB", background: "#fff", color: "#374151", fontSize: 12, cursor: "pointer" }}
                        >
                          Hủy
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => setConfirmDelete(food.id)}
                        style={{ padding: "4px 10px", borderRadius: 6, border: "1px solid #E5E7EB", background: "transparent", color: "#6B7280", fontSize: 12, cursor: "pointer" }}
                      >
                        Xóa
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Add food */}
          {!showSearch ? (
            <button
              onClick={() => setShowSearch(true)}
              style={{
                width: "100%",
                height: 40,
                borderRadius: 8,
                border: "1.5px dashed #D1D5DB",
                background: "transparent",
                color: "#22C55E",
                fontSize: 14,
                fontWeight: 500,
                cursor: "pointer",
              }}
            >
              + Thêm thực phẩm
            </button>
          ) : (
            <div style={{ marginTop: 8 }}>
              <input
                autoFocus
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                placeholder="Tìm kiếm thực phẩm..."
                style={{
                  width: "100%",
                  height: 44,
                  padding: "0 12px",
                  borderRadius: 8,
                  border: "1.5px solid #22C55E",
                  fontSize: 14,
                  color: "#1F2937",
                  outline: "none",
                  boxSizing: "border-box",
                }}
              />
              {searchResults.length > 0 && (
                <div style={{ border: "1px solid #E5E7EB", borderRadius: 8, marginTop: 4, background: "#fff", overflow: "hidden" }}>
                  {searchResults.map((f) => (
                    <button
                      key={f.id}
                      onClick={() => addFood(f)}
                      style={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "space-between",
                        padding: "10px 14px",
                        border: "none",
                        background: "transparent",
                        borderBottom: "1px solid #F3F4F6",
                        cursor: "pointer",
                        textAlign: "left",
                      }}
                      onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.background = "#F9FAFB")}
                      onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.background = "transparent")}
                    >
                      <div>
                        <span style={{ fontSize: 14, color: "#1F2937", fontWeight: 500 }}>{f.name}</span>
                        {f.hasAllergen && (
                          <span style={{ marginLeft: 8, fontSize: 11, color: "#EF4444" }}>⚠ {f.allergen}</span>
                        )}
                      </div>
                      <span style={{ fontSize: 13, color: "#22C55E", fontWeight: 600 }}>{f.calo} kcal</span>
                    </button>
                  ))}
                </div>
              )}
              <button
                onClick={() => { setShowSearch(false); setSearchQuery(""); setSearchResults([]); }}
                style={{ marginTop: 8, fontSize: 13, color: "#6B7280", background: "none", border: "none", cursor: "pointer" }}
              >
                Hủy tìm kiếm
              </button>
            </div>
          )}
        </Card>

        {/* Upload photo */}
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <Card>
            <h3 style={{ fontSize: 15, fontWeight: 600, color: "#1F2937", marginBottom: 12 }}>Upload ảnh món ăn</h3>
            <p style={{ fontSize: 13, color: "#6B7280", marginBottom: 12 }}>AI sẽ nhận diện và gợi ý thông tin dinh dưỡng.</p>

            {!uploadedImage ? (
              <div
                onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                onDragLeave={() => setDragOver(false)}
                onDrop={handleDrop}
                style={{
                  border: `2px dashed ${dragOver ? "#22C55E" : "#D1D5DB"}`,
                  borderRadius: 16,
                  padding: "32px 16px",
                  textAlign: "center",
                  background: dragOver ? "#DCFCE7" : "#F9FAFB",
                  transition: "all 0.2s",
                  cursor: "pointer",
                }}
              >
                <div style={{ fontSize: 32, marginBottom: 8 }}>📷</div>
                <div style={{ fontSize: 14, color: "#374151", fontWeight: 500 }}>Kéo thả ảnh vào đây</div>
                <div style={{ fontSize: 12, color: "#6B7280", marginTop: 4 }}>hoặc nhấp để chọn ảnh</div>
              </div>
            ) : (
              <div>
                <img src={uploadedImage} alt="Món ăn" style={{ width: "100%", borderRadius: 12, maxHeight: 160, objectFit: "cover" }} />
                {showAIResult ? (
                  <div style={{ marginTop: 12, background: "#DCFCE7", borderRadius: 8, padding: 12 }}>
                    <div style={{ fontSize: 13, fontWeight: 600, color: "#166534", marginBottom: 8 }}>Kết quả AI phân tích:</div>
                    <div style={{ fontSize: 13, color: "#1F2937", marginBottom: 4 }}>Cơm gà chiên nước mắm (~520 kcal)</div>
                    <div style={{ fontSize: 12, color: "#6B7280" }}>P: 32g · C: 58g · F: 18g</div>
                    <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
                      <button onClick={() => addFood({ id: Date.now(), name: "Cơm gà chiên nước mắm", calo: 520, protein: 32, carb: 58, fat: 18 })}
                        style={{ flex: 1, height: 36, borderRadius: 8, border: "none", background: "#22C55E", color: "#fff", fontSize: 13, fontWeight: 600, cursor: "pointer" }}>
                        Xác nhận
                      </button>
                      <button style={{ flex: 1, height: 36, borderRadius: 8, border: "1px solid #E5E7EB", background: "#fff", color: "#374151", fontSize: 13, cursor: "pointer" }}>
                        Chỉnh sửa
                      </button>
                    </div>
                  </div>
                ) : (
                  <div style={{ marginTop: 10, fontSize: 13, color: "#6B7280", textAlign: "center" }}>Đang phân tích ảnh...</div>
                )}
                <button
                  onClick={() => { setUploadedImage(null); setShowAIResult(false); }}
                  style={{ marginTop: 8, width: "100%", height: 34, borderRadius: 8, border: "1px solid #E5E7EB", background: "#fff", color: "#6B7280", fontSize: 13, cursor: "pointer" }}
                >
                  Chọn ảnh khác
                </button>
              </div>
            )}
          </Card>

          <Card>
            <h3 style={{ fontSize: 15, fontWeight: 600, color: "#1F2937", marginBottom: 12 }}>Tiến trình ngân sách calo</h3>
            {[
              { label: "Calo", current: totalCalo, max: 2000, color: "#22C55E" },
              { label: "Protein", current: totalProtein, max: 120, color: "#2563EB" },
              { label: "Carb", current: totalCarb, max: 250, color: "#F59E0B" },
              { label: "Fat", current: totalFat, max: 65, color: "#EF4444" },
            ].map((item) => (
              <div key={item.label} style={{ marginBottom: 12 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                  <span style={{ fontSize: 13, color: "#374151" }}>{item.label}</span>
                  <span style={{ fontSize: 12, color: "#6B7280" }}>{item.current}/{item.max}</span>
                </div>
                <div style={{ background: "#E5E7EB", borderRadius: 99, height: 6 }}>
                  <div style={{ width: `${Math.min((item.current / item.max) * 100, 100)}%`, height: "100%", background: item.color, borderRadius: 99 }} />
                </div>
              </div>
            ))}
          </Card>
        </div>
      </div>
    </div>
  );
}
