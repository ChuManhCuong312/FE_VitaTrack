import React, { useState } from "react";

interface MenuPlan {
  id: number;
  title: string;
  createdBy: string;
  date: string;
  calories: number;
  duration: string;
  status: "active" | "completed" | "pending";
}

interface Message {
  id: number;
  role: "user" | "expert";
  content: string;
  time: string;
}

const assignedExpert = {
  name: "ThS. Trần Thị Bích",
  specialty: "Dinh dưỡng lâm sàng",
  experience: "8 năm kinh nghiệm",
  university: "Đại học Y Hà Nội",
  patients: 142,
  rating: 4.9,
};

const menuPlans: MenuPlan[] = [
  {
    id: 1,
    title: "Thực đơn giảm cân tuần 1",
    createdBy: "ThS. Trần Thị Bích",
    date: "01/03/2026",
    calories: 1600,
    duration: "7 ngày",
    status: "active",
  },
  {
    id: 2,
    title: "Thực đơn tăng cường protein",
    createdBy: "ThS. Trần Thị Bích",
    date: "15/02/2026",
    calories: 1800,
    duration: "14 ngày",
    status: "completed",
  },
];

const chatMessages: Message[] = [
  { id: 1, role: "expert", content: "Xin chào An! Hôm nay bạn cảm thấy thế nào sau tuần ăn kiêng đầu tiên?", time: "09:00" },
  { id: 2, role: "user", content: "Dạ em cảm thấy ổn, đã giảm được 0.5kg nhưng hay đói buổi tối ạ", time: "09:15" },
  { id: 3, role: "expert", content: "Tốt lắm! Cảm giác đói buổi tối là bình thường. Tôi sẽ điều chỉnh thêm một bữa phụ nhẹ 150 kcal vào 20:00, như sữa chua không đường hoặc táo nhỏ.", time: "09:20" },
  { id: 4, role: "user", content: "Cảm ơn chuyên gia ạ! Em sẽ thử theo cách đó", time: "09:22" },
];

function Card({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <div style={{ background: "#FFFFFF", borderRadius: 16, padding: 24, boxShadow: "0 1px 3px rgba(0,0,0,0.06), 0 4px 12px rgba(0,0,0,0.04)", ...style }}>
      {children}
    </div>
  );
}

const statusConfig = {
  active: { label: "Đang thực hiện", bg: "#DCFCE7", color: "#16A34A" },
  completed: { label: "Đã hoàn thành", bg: "#DBEAFE", color: "#1D4ED8" },
  pending: { label: "Chờ duyệt", bg: "#FEF3C7", color: "#B45309" },
};

export default function ExpertPage() {
  const [messages, setMessages] = useState<Message[]>(chatMessages);
  const [input, setInput] = useState("");
  const [activeMenu, setActiveMenu] = useState<MenuPlan | null>(null);

  const sendMessage = () => {
    if (!input.trim()) return;
    const msg: Message = { id: Date.now(), role: "user", content: input.trim(), time: new Date().toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" }) };
    setMessages((p) => [...p, msg]);
    setInput("");
    setTimeout(() => {
      setMessages((p) => [...p, {
        id: Date.now() + 1, role: "expert",
        content: "Tôi đã nhận được câu hỏi của bạn. Tôi sẽ phản hồi sớm nhất có thể!",
        time: new Date().toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" }),
      }]);
    }, 1500);
  };

  return (
    <div style={{ fontFamily: "Inter, sans-serif", color: "#1F2937" }}>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: 24, fontWeight: 600, color: "#1F2937", marginBottom: 4 }}>Chuyên gia dinh dưỡng</h1>
        <p style={{ fontSize: 14, color: "#6B7280" }}>Kết nối và nhận tư vấn từ chuyên gia được gán cho bạn.</p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 24, alignItems: "start" }} className="lg:grid-cols-[280px_1fr]">
        {/* Expert profile */}
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <Card>
            <div style={{ textAlign: "center", marginBottom: 16 }}>
              <div style={{
                width: 64, height: 64, borderRadius: "50%", background: "#DBEAFE",
                color: "#1D4ED8", fontSize: 22, fontWeight: 700,
                display: "flex", alignItems: "center", justifyContent: "center",
                margin: "0 auto 12px",
              }}>
                {assignedExpert.name.charAt(4)}
              </div>
              <div style={{ fontSize: 16, fontWeight: 600, color: "#1F2937" }}>{assignedExpert.name}</div>
              <div style={{ fontSize: 13, color: "#2563EB", fontWeight: 500, marginTop: 2 }}>{assignedExpert.specialty}</div>
            </div>
            <div style={{ borderTop: "1px solid #E5E7EB", paddingTop: 16, display: "flex", flexDirection: "column", gap: 8 }}>
              {[
                { label: "Kinh nghiệm", value: assignedExpert.experience },
                { label: "Trường đào tạo", value: assignedExpert.university },
                { label: "Bệnh nhân", value: `${assignedExpert.patients} người` },
                { label: "Đánh giá", value: `★ ${assignedExpert.rating}/5.0` },
              ].map((r) => (
                <div key={r.label} style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ fontSize: 13, color: "#6B7280" }}>{r.label}</span>
                  <span style={{ fontSize: 13, fontWeight: 500, color: "#1F2937" }}>{r.value}</span>
                </div>
              ))}
            </div>
          </Card>

          {/* Menu plans */}
          <Card>
            <h3 style={{ fontSize: 14, fontWeight: 600, color: "#1F2937", marginBottom: 12 }}>Thực đơn của tôi</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {menuPlans.map((plan) => {
                const sc = statusConfig[plan.status];
                return (
                  <button
                    key={plan.id}
                    onClick={() => setActiveMenu(plan)}
                    style={{
                      width: "100%",
                      textAlign: "left",
                      padding: "12px",
                      borderRadius: 12,
                      border: `1.5px solid ${activeMenu?.id === plan.id ? "#2563EB" : "#E5E7EB"}`,
                      background: activeMenu?.id === plan.id ? "#DBEAFE" : "#F9FAFB",
                      cursor: "pointer",
                    }}
                  >
                    <div style={{ fontSize: 13, fontWeight: 600, color: "#1F2937", marginBottom: 4 }}>{plan.title}</div>
                    <div style={{ fontSize: 12, color: "#6B7280", marginBottom: 6 }}>{plan.date} · {plan.duration}</div>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <span style={{ fontSize: 12, color: "#374151" }}>{plan.calories} kcal/ngày</span>
                      <span style={{ fontSize: 11, padding: "2px 8px", borderRadius: 4, background: sc.bg, color: sc.color, fontWeight: 500 }}>
                        {sc.label}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </Card>
        </div>

        {/* Chat */}
        <Card style={{ display: "flex", flexDirection: "column", height: "calc(100vh - 200px)", minHeight: 500, padding: 0, overflow: "hidden" }}>
          <div style={{ padding: "16px 20px", borderBottom: "1px solid #E5E7EB", display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ width: 36, height: 36, borderRadius: "50%", background: "#DBEAFE", color: "#1D4ED8", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 700 }}>T</div>
            <div>
              <div style={{ fontSize: 14, fontWeight: 600, color: "#1F2937" }}>{assignedExpert.name}</div>
              <div style={{ fontSize: 12, color: "#22C55E" }}>Trực tuyến</div>
            </div>
          </div>

          <div style={{ flex: 1, overflowY: "auto", padding: 20, display: "flex", flexDirection: "column", gap: 12 }}>
            {messages.map((msg) => {
              const isUser = msg.role === "user";
              return (
                <div key={msg.id} style={{ display: "flex", justifyContent: isUser ? "flex-end" : "flex-start" }}>
                  <div style={{ maxWidth: "70%" }}>
                    <div style={{
                      background: isUser ? "#22C55E" : "#F9FAFB",
                      color: isUser ? "#fff" : "#1F2937",
                      borderRadius: isUser ? "16px 4px 16px 16px" : "4px 16px 16px 16px",
                      padding: "10px 14px",
                      fontSize: 14,
                      border: isUser ? "none" : "1px solid #E5E7EB",
                    }}>
                      {msg.content}
                    </div>
                    <div style={{ fontSize: 11, color: "#9CA3AF", marginTop: 3, textAlign: isUser ? "right" : "left" }}>{msg.time}</div>
                  </div>
                </div>
              );
            })}
          </div>

          <div style={{ padding: "16px 20px", borderTop: "1px solid #E5E7EB", display: "flex", gap: 8 }}>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              placeholder="Nhắn tin với chuyên gia..."
              style={{
                flex: 1,
                height: 44,
                padding: "0 14px",
                borderRadius: 8,
                border: "1.5px solid #E5E7EB",
                fontSize: 14,
                color: "#1F2937",
                outline: "none",
              }}
            />
            <button
              onClick={sendMessage}
              style={{ height: 44, padding: "0 20px", borderRadius: 8, border: "none", background: "#22C55E", color: "#fff", fontSize: 14, fontWeight: 600, cursor: "pointer" }}
            >
              Gửi
            </button>
          </div>
        </Card>
      </div>

      {/* Menu detail modal */}
      {activeMenu && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center", padding: 16 }}>
          <div style={{ background: "#fff", borderRadius: 16, padding: 32, width: "100%", maxWidth: 560 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
              <div>
                <h3 style={{ fontSize: 18, fontWeight: 600, color: "#1F2937", marginBottom: 4 }}>{activeMenu.title}</h3>
                <span style={{ fontSize: 12, padding: "3px 10px", borderRadius: 4, background: statusConfig[activeMenu.status].bg, color: statusConfig[activeMenu.status].color }}>
                  {statusConfig[activeMenu.status].label}
                </span>
              </div>
              <button onClick={() => setActiveMenu(null)} style={{ background: "none", border: "none", fontSize: 20, color: "#6B7280", cursor: "pointer" }}>✕</button>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 20 }}>
              {[
                { label: "Calo/ngày", value: `${activeMenu.calories} kcal` },
                { label: "Thời gian", value: activeMenu.duration },
                { label: "Ngày tạo", value: activeMenu.date },
                { label: "Chuyên gia", value: activeMenu.createdBy },
              ].map((r) => (
                <div key={r.label} style={{ background: "#F9FAFB", borderRadius: 12, padding: "12px 14px" }}>
                  <div style={{ fontSize: 12, color: "#6B7280" }}>{r.label}</div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: "#1F2937", marginTop: 2 }}>{r.value}</div>
                </div>
              ))}
            </div>
            <h4 style={{ fontSize: 14, fontWeight: 600, color: "#374151", marginBottom: 12 }}>Chi tiết b���a ăn mẫu</h4>
            {[
              { meal: "Sáng (7:00)", items: "Bánh mì nguyên cám + 2 trứng luộc + cà phê đen", kcal: 380 },
              { meal: "Trưa (12:00)", items: "Cơm gạo lứt + ức gà + rau xanh", kcal: 520 },
              { meal: "Phụ (15:00)", items: "1 quả táo + 1 nắm hạnh nhân", kcal: 180 },
              { meal: "Tối (18:30)", items: "Cá hồi hấp + salad + khoai lang", kcal: 520 },
            ].map((m) => (
              <div key={m.meal} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", borderBottom: "1px solid #F3F4F6" }}>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: "#374151" }}>{m.meal}</div>
                  <div style={{ fontSize: 12, color: "#6B7280" }}>{m.items}</div>
                </div>
                <span style={{ fontSize: 13, fontWeight: 600, color: "#22C55E" }}>{m.kcal} kcal</span>
              </div>
            ))}
            <button
              onClick={() => setActiveMenu(null)}
              style={{ marginTop: 20, width: "100%", height: 44, borderRadius: 8, border: "none", background: "#22C55E", color: "#fff", fontSize: 14, fontWeight: 600, cursor: "pointer" }}
            >
              Áp dụng thực đơn này
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
