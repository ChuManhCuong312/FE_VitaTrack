import React, { useState } from "react";

interface User {
  id: number;
  name: string;
  age: number;
  bmi: number;
  calo: number;
  caloBudget: number;
  goal: string;
  riskLevel: "safe" | "warning" | "danger";
  lastActivity: string;
  weight: number;
  targetWeight: number;
  phone: string;
  email: string;
  joinDate: string;
}

const initialUsers: User[] = [
  { id: 1, name: "Nguyễn Văn An", age: 27, bmi: 23.4, calo: 1450, caloBudget: 2000, goal: "Giảm cân", riskLevel: "safe", lastActivity: "2 giờ trước", weight: 73.1, targetWeight: 68, phone: "0901234567", email: "an@email.com", joinDate: "01/01/2026" },
  { id: 2, name: "Lê Thị Mai", age: 32, bmi: 28.2, calo: 2480, caloBudget: 1800, goal: "Giảm cân", riskLevel: "danger", lastActivity: "1 giờ trước", weight: 82, targetWeight: 70, phone: "0912345678", email: "mai@email.com", joinDate: "15/01/2026" },
  { id: 3, name: "Phạm Minh Tuấn", age: 24, bmi: 19.1, calo: 2200, caloBudget: 2800, goal: "Tăng cân", riskLevel: "safe", lastActivity: "5 phút trước", weight: 58, targetWeight: 65, phone: "0923456789", email: "tuan@email.com", joinDate: "10/12/2025" },
  { id: 4, name: "Trần Thị Hương", age: 45, bmi: 31.5, calo: 2100, caloBudget: 1600, goal: "Giảm cân", riskLevel: "warning", lastActivity: "3 giờ trước", weight: 90, targetWeight: 75, phone: "0934567890", email: "huong@email.com", joinDate: "05/02/2026" },
  { id: 5, name: "Hoàng Minh Đức", age: 35, bmi: 22.8, calo: 1920, caloBudget: 2200, goal: "Duy trì", riskLevel: "safe", lastActivity: "30 phút trước", weight: 72, targetWeight: 72, phone: "0945678901", email: "duc@email.com", joinDate: "20/01/2026" },
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

export default function ExpertUsers() {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [showCreateMenu, setShowCreateMenu] = useState(false);
  const [menuTargetUser, setMenuTargetUser] = useState<User | null>(null);
  const [menuForm, setMenuForm] = useState({ title: "", calories: "", duration: "", notes: "" });
  const [menuSaved, setMenuSaved] = useState(false);
  const [search, setSearch] = useState("");
  const [filterRisk, setFilterRisk] = useState<"all" | "safe" | "warning" | "danger">("all");
  const [chatUser, setChatUser] = useState<User | null>(null);
  const [chatMessage, setChatMessage] = useState("");
  const [chatMessages, setChatMessages] = useState<{ sender: string; text: string; time: string }[]>([
    { sender: "system", text: "Bắt đầu cuộc trò chuyện với người dùng", time: "09:00" },
  ]);

  const filtered = initialUsers.filter((u) => {
    const matchSearch = u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase());
    const matchRisk = filterRisk === "all" || u.riskLevel === filterRisk;
    return matchSearch && matchRisk;
  });

  const handleSaveMenu = () => {
    setMenuSaved(true);
    setTimeout(() => {
      setMenuSaved(false);
      setShowCreateMenu(false);
      setMenuTargetUser(null);
      setMenuForm({ title: "", calories: "", duration: "", notes: "" });
    }, 2000);
  };

  const handleSendChat = () => {
    if (!chatMessage.trim()) return;
    const now = new Date().toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" });
    setChatMessages((p) => [...p, { sender: "expert", text: chatMessage, time: now }]);
    setChatMessage("");
    setTimeout(() => {
      setChatMessages((p) => [...p, { sender: "user", text: "Cảm ơn chuyên gia, tôi sẽ thực hiện theo hướng dẫn.", time: new Date().toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" }) }]);
    }, 1500);
  };

  return (
    <div style={{ fontFamily: "Inter, sans-serif", color: "#1F2937" }}>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: 24, fontWeight: 600, color: "#1F2937", marginBottom: 4 }}>Danh sách người dùng</h1>
        <p style={{ fontSize: 14, color: "#6B7280" }}>Theo dõi và quản lý tình trạng sức khỏe của từng người dùng.</p>
      </div>

      {/* Filters */}
      <div style={{ display: "flex", gap: 12, marginBottom: 20, flexWrap: "wrap" }}>
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Tìm kiếm theo tên, email..."
          style={{ flex: 1, minWidth: 200, height: 44, padding: "0 14px", borderRadius: 10, border: "1px solid #E5E7EB", fontSize: 14, outline: "none" }}
        />
        <div style={{ display: "flex", gap: 8 }}>
          {(["all", "safe", "warning", "danger"] as const).map((r) => (
            <button
              key={r}
              onClick={() => setFilterRisk(r)}
              style={{
                height: 44,
                padding: "0 14px",
                borderRadius: 10,
                border: `1.5px solid ${filterRisk === r ? (r === "safe" ? "#22C55E" : r === "warning" ? "#F59E0B" : r === "danger" ? "#EF4444" : "#2563EB") : "#E5E7EB"}`,
                background: filterRisk === r ? (r === "all" ? "#DBEAFE" : r === "safe" ? "#D1FAE5" : r === "warning" ? "#FEF3C7" : "#FEE2E2") : "#fff",
                color: filterRisk === r ? (r === "all" ? "#1D4ED8" : r === "safe" ? "#065F46" : r === "warning" ? "#B45309" : "#991B1B") : "#6B7280",
                fontSize: 13,
                fontWeight: filterRisk === r ? 600 : 400,
                cursor: "pointer",
              }}
            >
              {r === "all" ? "Tất cả" : riskConfig[r].label}
            </button>
          ))}
        </div>
        <button
          onClick={() => { setShowCreateMenu(true); setMenuTargetUser(null); }}
          style={{ height: 44, padding: "0 18px", borderRadius: 10, border: "none", background: "#2563EB", color: "#fff", fontSize: 14, fontWeight: 600, cursor: "pointer" }}
        >
          + Tạo thực đơn
        </button>
      </div>

      <Card style={{ padding: 0, overflow: "hidden" }}>
        <div style={{ padding: "14px 20px", borderBottom: "1px solid #E5E7EB" }}>
          <span style={{ fontSize: 13, color: "#6B7280" }}>{filtered.length} người dùng</span>
        </div>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 720 }}>
            <thead>
              <tr style={{ background: "#F9FAFB" }}>
                {["Người dùng", "Tuổi", "BMI", "Calo hôm nay", "Mục tiêu", "Mức độ rủi ro", "Hoạt động gần nhất", "Thao tác"].map((h) => (
                  <th key={h} style={{ padding: "12px 16px", textAlign: "left", fontSize: 12, fontWeight: 600, color: "#6B7280", borderBottom: "1px solid #E5E7EB" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((user) => {
                const rc = riskConfig[user.riskLevel];
                const caloPct = Math.round((user.calo / user.caloBudget) * 100);
                return (
                  <tr key={user.id} style={{ borderBottom: "1px solid #F3F4F6" }}
                    onMouseEnter={(e) => ((e.currentTarget as HTMLTableRowElement).style.background = "#F9FAFB")}
                    onMouseLeave={(e) => ((e.currentTarget as HTMLTableRowElement).style.background = "transparent")}
                  >
                    <td style={{ padding: "14px 16px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <div style={{ width: 36, height: 36, borderRadius: "50%", background: rc.bg, color: rc.color, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700 }}>
                          {user.name.charAt(0)}
                        </div>
                        <div>
                          <div style={{ fontSize: 14, fontWeight: 500, color: "#1F2937" }}>{user.name}</div>
                          <div style={{ fontSize: 12, color: "#9CA3AF" }}>{user.email}</div>
                        </div>
                      </div>
                    </td>
                    <td style={{ padding: "14px 16px", fontSize: 14, color: "#374151" }}>{user.age}</td>
                    <td style={{ padding: "14px 16px" }}>
                      <span style={{ fontSize: 14, fontWeight: 600, color: user.bmi >= 25 ? "#EF4444" : "#22C55E" }}>{user.bmi}</span>
                    </td>
                    <td style={{ padding: "14px 16px" }}>
                      <div style={{ fontSize: 13 }}>
                        <span style={{ fontWeight: 600, color: caloPct > 120 ? "#EF4444" : "#1F2937" }}>{user.calo}</span>
                        <span style={{ color: "#6B7280" }}>/{user.caloBudget}</span>
                      </div>
                      <div style={{ background: "#E5E7EB", borderRadius: 99, height: 4, marginTop: 4, width: 80 }}>
                        <div style={{ width: `${Math.min(caloPct, 100)}%`, height: "100%", background: caloPct > 120 ? "#EF4444" : "#22C55E", borderRadius: 99 }} />
                      </div>
                    </td>
                    <td style={{ padding: "14px 16px", fontSize: 14, color: "#374151" }}>{user.goal}</td>
                    <td style={{ padding: "14px 16px" }}>
                      <span style={{ padding: "4px 10px", borderRadius: 6, fontSize: 12, fontWeight: 600, background: rc.bg, color: rc.color }}>
                        {rc.label}
                      </span>
                    </td>
                    <td style={{ padding: "14px 16px", fontSize: 13, color: "#6B7280" }}>{user.lastActivity}</td>
                    <td style={{ padding: "14px 16px" }}>
                      <div style={{ display: "flex", gap: 6 }}>
                        <button onClick={() => setSelectedUser(user)}
                          style={{ padding: "6px 12px", borderRadius: 6, border: "1.5px solid #2563EB", background: "transparent", color: "#2563EB", fontSize: 12, fontWeight: 500, cursor: "pointer" }}>
                          Xem
                        </button>
                        <button onClick={() => { setMenuTargetUser(user); setShowCreateMenu(true); }}
                          style={{ padding: "6px 12px", borderRadius: 6, border: "none", background: "#DCFCE7", color: "#16A34A", fontSize: 12, fontWeight: 500, cursor: "pointer" }}>
                          Thực đơn
                        </button>
                        <button onClick={() => { setChatUser(user); setChatMessages([{ sender: "system", text: `Bắt đầu trò chuyện với ${user.name}`, time: new Date().toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" }) }]); }}
                          style={{ padding: "6px 12px", borderRadius: 6, border: "1.5px solid #8B5CF6", background: "transparent", color: "#8B5CF6", fontSize: 12, fontWeight: 500, cursor: "pointer" }}>
                          Chat
                        </button>
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
          <div style={{ background: "#fff", borderRadius: 16, padding: 32, width: "100%", maxWidth: 560, maxHeight: "90vh", overflowY: "auto" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{ width: 52, height: 52, borderRadius: "50%", background: riskConfig[selectedUser.riskLevel].bg, color: riskConfig[selectedUser.riskLevel].color, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, fontWeight: 700 }}>
                  {selectedUser.name.charAt(0)}
                </div>
                <div>
                  <h3 style={{ fontSize: 18, fontWeight: 600, color: "#1F2937" }}>{selectedUser.name}</h3>
                  <div style={{ display: "flex", gap: 8, marginTop: 4 }}>
                    <span style={{ fontSize: 12, padding: "2px 8px", borderRadius: 4, background: riskConfig[selectedUser.riskLevel].bg, color: riskConfig[selectedUser.riskLevel].color, fontWeight: 500 }}>
                      {riskConfig[selectedUser.riskLevel].label}
                    </span>
                    <span style={{ fontSize: 12, color: "#6B7280" }}>Tham gia: {selectedUser.joinDate}</span>
                  </div>
                </div>
              </div>
              <button onClick={() => setSelectedUser(null)} style={{ background: "none", border: "none", fontSize: 20, color: "#6B7280", cursor: "pointer" }}>✕</button>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 20 }}>
              {[
                { label: "Tuổi", value: `${selectedUser.age} tuổi` },
                { label: "BMI", value: selectedUser.bmi },
                { label: "Cân nặng hiện tại", value: `${selectedUser.weight} kg` },
                { label: "Mục tiêu cân nặng", value: `${selectedUser.targetWeight} kg` },
                { label: "Calo hôm nay", value: `${selectedUser.calo} kcal` },
                { label: "Ngân sách calo", value: `${selectedUser.caloBudget} kcal` },
                { label: "Email", value: selectedUser.email },
                { label: "Điện thoại", value: selectedUser.phone },
              ].map((r) => (
                <div key={r.label} style={{ background: "#F9FAFB", borderRadius: 10, padding: "10px 14px" }}>
                  <div style={{ fontSize: 12, color: "#6B7280" }}>{r.label}</div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: "#1F2937", marginTop: 2 }}>{r.value}</div>
                </div>
              ))}
            </div>

            {selectedUser.riskLevel !== "safe" && (
              <div style={{ background: "#FEE2E2", borderLeft: "4px solid #EF4444", borderRadius: 8, padding: 14, marginBottom: 16, fontSize: 13, color: "#991B1B" }}>
                <strong>Cảnh báo rủi ro:</strong> {selectedUser.name} đang tiêu thụ {Math.round((selectedUser.calo / selectedUser.caloBudget) * 100)}% ngân sách calo.
                {selectedUser.bmi >= 30 ? " BMI ở mức béo phì, cần điều chỉnh thực đơn gấp." : " Cần tư vấn và điều chỉnh thực đơn."}
              </div>
            )}

            <div style={{ display: "flex", gap: 10 }}>
              <button
                onClick={() => { setSelectedUser(null); setMenuTargetUser(selectedUser); setShowCreateMenu(true); }}
                style={{ flex: 1, height: 44, borderRadius: 8, border: "none", background: "#2563EB", color: "#fff", fontSize: 14, fontWeight: 600, cursor: "pointer" }}
              >
                Tạo thực đơn mới
              </button>
              <button
                onClick={() => { setChatUser(selectedUser); setSelectedUser(null); setChatMessages([{ sender: "system", text: `Bắt đầu trò chuyện với ${selectedUser.name}`, time: new Date().toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" }) }]); }}
                style={{ flex: 1, height: 44, borderRadius: 8, border: "1.5px solid #8B5CF6", background: "transparent", color: "#8B5CF6", fontSize: 14, fontWeight: 600, cursor: "pointer" }}
              >
                Nhắn tin
              </button>
              <button onClick={() => setSelectedUser(null)}
                style={{ height: 44, padding: "0 20px", borderRadius: 8, border: "1.5px solid #E5E7EB", background: "#fff", color: "#374151", fontSize: 14, cursor: "pointer" }}>
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Create menu modal */}
      {showCreateMenu && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center", padding: 16 }}>
          <div style={{ background: "#fff", borderRadius: 16, padding: 32, width: "100%", maxWidth: 540 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
              <div>
                <h3 style={{ fontSize: 18, fontWeight: 600, color: "#1F2937" }}>Tạo thực đơn mới</h3>
                {menuTargetUser && <p style={{ fontSize: 13, color: "#6B7280", marginTop: 2 }}>Cho: {menuTargetUser.name}</p>}
              </div>
              <button onClick={() => { setShowCreateMenu(false); setMenuTargetUser(null); }} style={{ background: "none", border: "none", fontSize: 20, color: "#6B7280", cursor: "pointer" }}>✕</button>
            </div>
            {menuSaved && (
              <div style={{ background: "#D1FAE5", borderLeft: "4px solid #10B981", borderRadius: 8, padding: 12, marginBottom: 16, fontSize: 13, color: "#065F46" }}>
                Thực đơn đã được tạo và gửi đến người dùng thành công!
              </div>
            )}
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {!menuTargetUser && (
                <div>
                  <label style={{ fontSize: 14, fontWeight: 500, color: "#374151", display: "block", marginBottom: 6 }}>Người dùng</label>
                  <select style={{ width: "100%", height: 44, padding: "0 12px", borderRadius: 8, border: "1px solid #E5E7EB", fontSize: 14, background: "#fff", outline: "none", boxSizing: "border-box" }}>
                    <option value="">-- Chọn người dùng --</option>
                    {initialUsers.map((u) => <option key={u.id} value={u.id}>{u.name}</option>)}
                  </select>
                </div>
              )}
              <div>
                <label style={{ fontSize: 14, fontWeight: 500, color: "#374151", display: "block", marginBottom: 6 }}>Tên thực đơn</label>
                <input value={menuForm.title} onChange={(e) => setMenuForm((p) => ({ ...p, title: e.target.value }))}
                  placeholder="VD: Thực đơn giảm cân tuần 1"
                  style={{ width: "100%", height: 44, padding: "0 12px", borderRadius: 8, border: "1px solid #E5E7EB", fontSize: 14, outline: "none", boxSizing: "border-box" as const }} />
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                <div>
                  <label style={{ fontSize: 14, fontWeight: 500, color: "#374151", display: "block", marginBottom: 6 }}>Mục tiêu calo/ngày</label>
                  <input type="number" value={menuForm.calories} onChange={(e) => setMenuForm((p) => ({ ...p, calories: e.target.value }))}
                    placeholder="1600"
                    style={{ width: "100%", height: 44, padding: "0 12px", borderRadius: 8, border: "1px solid #E5E7EB", fontSize: 14, outline: "none", boxSizing: "border-box" as const }} />
                </div>
                <div>
                  <label style={{ fontSize: 14, fontWeight: 500, color: "#374151", display: "block", marginBottom: 6 }}>Thời gian</label>
                  <select value={menuForm.duration} onChange={(e) => setMenuForm((p) => ({ ...p, duration: e.target.value }))}
                    style={{ width: "100%", height: 44, padding: "0 12px", borderRadius: 8, border: "1px solid #E5E7EB", fontSize: 14, background: "#fff", outline: "none", boxSizing: "border-box" as const }}>
                    <option value="">Chọn thời gian</option>
                    <option value="7">7 ngày</option>
                    <option value="14">14 ngày</option>
                    <option value="30">30 ngày</option>
                  </select>
                </div>
              </div>
              <div>
                <label style={{ fontSize: 14, fontWeight: 500, color: "#374151", display: "block", marginBottom: 6 }}>Ghi chú hướng dẫn</label>
                <textarea value={menuForm.notes} onChange={(e) => setMenuForm((p) => ({ ...p, notes: e.target.value }))}
                  placeholder="Hướng dẫn thực hiện, lưu ý đặc biệt..."
                  rows={4}
                  style={{ width: "100%", padding: "10px 12px", borderRadius: 8, border: "1px solid #E5E7EB", fontSize: 14, outline: "none", resize: "none", boxSizing: "border-box" as const }} />
              </div>
            </div>
            <div style={{ display: "flex", gap: 12, marginTop: 20 }}>
              <button onClick={handleSaveMenu}
                style={{ flex: 1, height: 44, borderRadius: 8, border: "none", background: "#2563EB", color: "#fff", fontSize: 14, fontWeight: 600, cursor: "pointer" }}>
                Tạo & Gửi thực đơn
              </button>
              <button onClick={() => { setShowCreateMenu(false); setMenuTargetUser(null); }}
                style={{ flex: 1, height: 44, borderRadius: 8, border: "1.5px solid #E5E7EB", background: "#fff", color: "#374151", fontSize: 14, cursor: "pointer" }}>
                Hủy
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Chat modal */}
      {chatUser && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center", padding: 16 }}>
          <div style={{ background: "#fff", borderRadius: 16, width: "100%", maxWidth: 480, maxHeight: "90vh", display: "flex", flexDirection: "column", overflow: "hidden" }}>
            {/* Chat header */}
            <div style={{ padding: "16px 20px", borderBottom: "1px solid #E5E7EB", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{ width: 40, height: 40, borderRadius: "50%", background: "#DBEAFE", color: "#1D4ED8", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 15, fontWeight: 700 }}>
                  {chatUser.name.charAt(0)}
                </div>
                <div>
                  <div style={{ fontSize: 15, fontWeight: 600, color: "#1F2937" }}>{chatUser.name}</div>
                  <div style={{ fontSize: 12, color: "#22C55E" }}>Đang hoạt động</div>
                </div>
              </div>
              <button onClick={() => setChatUser(null)} style={{ background: "none", border: "none", fontSize: 20, color: "#6B7280", cursor: "pointer" }}>✕</button>
            </div>
            {/* Messages */}
            <div style={{ flex: 1, overflowY: "auto", padding: "16px 20px", display: "flex", flexDirection: "column", gap: 12, minHeight: 300, maxHeight: 400 }}>
              {chatMessages.map((msg, i) => (
                <div key={i} style={{
                  display: "flex",
                  justifyContent: msg.sender === "expert" ? "flex-end" : msg.sender === "system" ? "center" : "flex-start",
                }}>
                  {msg.sender === "system" ? (
                    <span style={{ fontSize: 12, color: "#9CA3AF", background: "#F3F4F6", padding: "4px 12px", borderRadius: 12 }}>{msg.text}</span>
                  ) : (
                    <div style={{ maxWidth: "75%" }}>
                      <div style={{
                        padding: "10px 14px",
                        borderRadius: msg.sender === "expert" ? "16px 16px 4px 16px" : "16px 16px 16px 4px",
                        background: msg.sender === "expert" ? "#2563EB" : "#F3F4F6",
                        color: msg.sender === "expert" ? "#fff" : "#1F2937",
                        fontSize: 14,
                      }}>
                        {msg.text}
                      </div>
                      <div style={{ fontSize: 11, color: "#9CA3AF", marginTop: 4, textAlign: msg.sender === "expert" ? "right" : "left" }}>{msg.time}</div>
                    </div>
                  )}
                </div>
              ))}
            </div>
            {/* Input */}
            <div style={{ padding: "12px 16px", borderTop: "1px solid #E5E7EB", display: "flex", gap: 8 }}>
              <input
                value={chatMessage}
                onChange={(e) => setChatMessage(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSendChat()}
                placeholder="Nhập tin nhắn..."
                style={{ flex: 1, height: 44, padding: "0 14px", borderRadius: 10, border: "1px solid #E5E7EB", fontSize: 14, outline: "none" }}
              />
              <button onClick={handleSendChat}
                style={{ height: 44, padding: "0 18px", borderRadius: 10, border: "none", background: "#2563EB", color: "#fff", fontSize: 14, fontWeight: 600, cursor: "pointer" }}>
                Gửi
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
