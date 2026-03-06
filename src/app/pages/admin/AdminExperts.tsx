import React, { useState } from "react";

interface ExpertRequest {
  id: number;
  name: string;
  email: string;
  phone: string;
  degree: string;
  specialization: string;
  university: string;
  experience: number;
  requestDate: string;
  status: "pending" | "approved" | "rejected";
  license: string;
  bio: string;
}

const initialRequests: ExpertRequest[] = [
  {
    id: 1,
    name: "TS. Nguyễn Thành Công",
    email: "cong@email.com",
    phone: "0901234567",
    degree: "Tiến sĩ Dinh dưỡng học",
    specialization: "Dinh dưỡng lâm sàng",
    university: "Đại học Y Hà Nội",
    experience: 12,
    requestDate: "01/03/2026",
    status: "pending",
    license: "DV-2012-0156",
    bio: "Tiến sĩ Dinh dưỡng học với 12 năm kinh nghiệm trong lĩnh vực dinh dưỡng lâm sàng và nghiên cứu khoa học.",
  },
  {
    id: 2,
    name: "ThS. Trần Minh Khoa",
    email: "khoa@email.com",
    phone: "0912345678",
    degree: "Thạc sĩ Dinh dưỡng lâm sàng",
    specialization: "Dinh dưỡng thể thao & Giảm cân",
    university: "Đại học Y Dược TP.HCM",
    experience: 6,
    requestDate: "02/03/2026",
    status: "pending",
    license: "DV-2018-0892",
    bio: "Chuyên gia dinh dưỡng tập trung vào lĩnh vực thể thao và quản lý cân nặng, đã hỗ trợ hơn 500 khách hàng.",
  },
  {
    id: 3,
    name: "BS. Lê Thị Tuyết",
    email: "tuyet@email.com",
    phone: "0923456789",
    degree: "Bác sĩ chuyên khoa I",
    specialization: "Dinh dưỡng trẻ em",
    university: "Đại học Y Huế",
    experience: 9,
    requestDate: "28/02/2026",
    status: "approved",
    license: "DV-2015-0423",
    bio: "Bác sĩ chuyên khoa dinh dưỡng trẻ em với nhiều năm kinh nghiệm tư vấn cho các gia đình.",
  },
  {
    id: 4,
    name: "PGS.TS. Hoàng Văn Minh",
    email: "minh@email.com",
    phone: "0934567890",
    degree: "Phó giáo sư, Tiến sĩ",
    specialization: "Dinh dưỡng cộng đồng",
    university: "Viện Dinh dưỡng Quốc gia",
    experience: 20,
    requestDate: "27/02/2026",
    status: "rejected",
    license: "DV-2005-0012",
    bio: "Phó giáo sư tại Viện Dinh dưỡng Quốc gia với 20 năm nghiên cứu về dinh dưỡng cộng đồng.",
  },
];

function Card({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <div style={{ background: "#FFFFFF", borderRadius: 16, padding: 24, boxShadow: "0 1px 3px rgba(0,0,0,0.06), 0 4px 12px rgba(0,0,0,0.04)", ...style }}>
      {children}
    </div>
  );
}

export default function AdminExperts() {
  const [requests, setRequests] = useState<ExpertRequest[]>(initialRequests);
  const [filter, setFilter] = useState<"all" | "pending" | "approved" | "rejected">("all");
  const [selectedReq, setSelectedReq] = useState<ExpertRequest | null>(null);
  const [rejectReason, setRejectReason] = useState("");
  const [showRejectForm, setShowRejectForm] = useState<number | null>(null);
  const [actionDone, setActionDone] = useState<{ id: number; type: string } | null>(null);

  const filtered = requests.filter((r) => filter === "all" || r.status === filter);

  const pendingCount = requests.filter((r) => r.status === "pending").length;
  const approvedCount = requests.filter((r) => r.status === "approved").length;
  const rejectedCount = requests.filter((r) => r.status === "rejected").length;

  const updateStatus = (id: number, status: "approved" | "rejected") => {
    setRequests((p) => p.map((r) => r.id === id ? { ...r, status } : r));
    setActionDone({ id, type: status });
    setShowRejectForm(null);
    setRejectReason("");
    setSelectedReq(null);
    setTimeout(() => setActionDone(null), 3000);
  };

  const statusConfig = {
    pending: { label: "Chờ duyệt", bg: "#FEF3C7", color: "#B45309" },
    approved: { label: "Đã phê duyệt", bg: "#D1FAE5", color: "#065F46" },
    rejected: { label: "Đã từ chối", bg: "#FEE2E2", color: "#991B1B" },
  };

  return (
    <div style={{ fontFamily: "Inter, sans-serif", color: "#1F2937" }}>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: 24, fontWeight: 600, color: "#1F2937", marginBottom: 4 }}>Cấp quyền chuyên gia</h1>
        <p style={{ fontSize: 14, color: "#6B7280" }}>Xem xét hồ sơ và phê duyệt yêu cầu nâng cấp tài khoản chuyên gia.</p>
      </div>

      {/* Summary */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 14, marginBottom: 20 }}>
        {[
          { label: "Chờ xem xét", value: pendingCount, color: "#F59E0B", bg: "#FEF3C7" },
          { label: "Đã phê duyệt", value: approvedCount, color: "#22C55E", bg: "#D1FAE5" },
          { label: "Đã từ chối", value: rejectedCount, color: "#EF4444", bg: "#FEE2E2" },
          { label: "Tổng yêu cầu", value: requests.length, color: "#2563EB", bg: "#DBEAFE" },
        ].map((s) => (
          <Card key={s.label} style={{ background: s.bg }}>
            <div style={{ fontSize: 12, color: s.color, fontWeight: 600 }}>{s.label}</div>
            <div style={{ fontSize: 32, fontWeight: 700, color: s.color, marginTop: 4 }}>{s.value}</div>
          </Card>
        ))}
      </div>

      {/* Pending alert */}
      {pendingCount > 0 && (
        <div style={{ background: "#FEF3C7", borderLeft: "4px solid #F59E0B", borderRadius: 8, padding: "12px 16px", marginBottom: 20, fontSize: 14, color: "#92400E" }}>
          <strong>Cần xử lý:</strong> Có {pendingCount} yêu cầu đang chờ phê duyệt. Hãy xem xét sớm để không ảnh hưởng trải nghiệm của chuyên gia.
        </div>
      )}

      {actionDone && (
        <div style={{ background: "#D1FAE5", borderLeft: "4px solid #10B981", borderRadius: 8, padding: "12px 16px", marginBottom: 20, fontSize: 14, color: "#065F46" }}>
          {actionDone.type === "approved" ? "Đã phê duyệt thành công! Chuyên gia sẽ nhận thông báo qua email." : "Đã từ chối yêu cầu."}
        </div>
      )}

      {/* Filter */}
      <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
        {(["all", "pending", "approved", "rejected"] as const).map((f) => (
          <button key={f} onClick={() => setFilter(f)}
            style={{
              height: 40,
              padding: "0 16px",
              borderRadius: 8,
              border: `1.5px solid ${filter === f ? "#2563EB" : "#E5E7EB"}`,
              background: filter === f ? "#DBEAFE" : "#fff",
              color: filter === f ? "#1D4ED8" : "#6B7280",
              fontSize: 13,
              fontWeight: filter === f ? 600 : 400,
              cursor: "pointer",
            }}
          >
            {f === "all" ? "Tất cả" : statusConfig[f].label}
            {f === "pending" && pendingCount > 0 && (
              <span style={{ marginLeft: 6, background: "#EF4444", color: "#fff", borderRadius: 10, padding: "0 6px", fontSize: 11, fontWeight: 700 }}>
                {pendingCount}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Request cards */}
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {filtered.map((req) => {
          const sc = statusConfig[req.status];
          return (
            <Card key={req.id}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 16 }}>
                {/* Left: Info */}
                <div style={{ display: "flex", gap: 16, flex: 1 }}>
                  <div style={{ width: 52, height: 52, borderRadius: "50%", background: "#DBEAFE", color: "#1D4ED8", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, fontWeight: 700, flexShrink: 0 }}>
                    {req.name.split(" ").pop()?.charAt(0)}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
                      <h3 style={{ fontSize: 16, fontWeight: 600, color: "#1F2937" }}>{req.name}</h3>
                      <span style={{ padding: "3px 8px", borderRadius: 6, fontSize: 12, fontWeight: 600, background: sc.bg, color: sc.color }}>{sc.label}</span>
                    </div>
                    <div style={{ fontSize: 13, color: "#2563EB", marginTop: 3, fontWeight: 500 }}>{req.degree} – {req.specialization}</div>
                    <div style={{ fontSize: 13, color: "#6B7280", marginTop: 1 }}>{req.university} · {req.experience} năm kinh nghiệm</div>
                    <div style={{ fontSize: 12, color: "#9CA3AF", marginTop: 4 }}>
                      {req.email} · {req.phone} · Mã chứng chỉ: {req.license}
                    </div>
                    <div style={{ fontSize: 12, color: "#9CA3AF", marginTop: 2 }}>Ngày đăng ký: {req.requestDate}</div>
                  </div>
                </div>

                {/* Right: Actions */}
                <div style={{ display: "flex", flexDirection: "column", gap: 8, alignItems: "flex-end" }}>
                  <button onClick={() => setSelectedReq(req)}
                    style={{ height: 38, padding: "0 14px", borderRadius: 8, border: "1.5px solid #E5E7EB", background: "#fff", color: "#374151", fontSize: 13, cursor: "pointer" }}>
                    Xem hồ sơ
                  </button>
                  {req.status === "pending" && (
                    <div style={{ display: "flex", gap: 8 }}>
                      <button onClick={() => updateStatus(req.id, "approved")}
                        style={{ height: 38, padding: "0 14px", borderRadius: 8, border: "none", background: "#22C55E", color: "#fff", fontSize: 13, fontWeight: 600, cursor: "pointer" }}>
                        Phê duyệt
                      </button>
                      <button onClick={() => setShowRejectForm(showRejectForm === req.id ? null : req.id)}
                        style={{ height: 38, padding: "0 14px", borderRadius: 8, border: "1.5px solid #EF4444", background: "transparent", color: "#EF4444", fontSize: 13, fontWeight: 500, cursor: "pointer" }}>
                        Từ chối
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Bio preview */}
              <div style={{ marginTop: 12, fontSize: 13, color: "#6B7280", background: "#F9FAFB", borderRadius: 8, padding: "10px 14px" }}>
                {req.bio}
              </div>

              {/* Reject form */}
              {showRejectForm === req.id && (
                <div style={{ marginTop: 12, padding: 14, background: "#FEE2E2", borderRadius: 10 }}>
                  <label style={{ fontSize: 14, fontWeight: 500, color: "#991B1B", display: "block", marginBottom: 8 }}>Lý do từ chối (tùy chọn)</label>
                  <textarea
                    value={rejectReason}
                    onChange={(e) => setRejectReason(e.target.value)}
                    placeholder="Ghi lý do từ chối để thông báo cho ứng viên..."
                    rows={3}
                    style={{ width: "100%", padding: "10px 12px", borderRadius: 8, border: "1px solid #FCA5A5", fontSize: 14, outline: "none", resize: "none", boxSizing: "border-box" as const, background: "#fff" }}
                  />
                  <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
                    <button onClick={() => updateStatus(req.id, "rejected")}
                      style={{ height: 40, padding: "0 16px", borderRadius: 8, border: "none", background: "#EF4444", color: "#fff", fontSize: 13, fontWeight: 600, cursor: "pointer" }}>
                      Xác nhận từ chối
                    </button>
                    <button onClick={() => setShowRejectForm(null)}
                      style={{ height: 40, padding: "0 16px", borderRadius: 8, border: "1px solid #E5E7EB", background: "#fff", fontSize: 13, cursor: "pointer" }}>
                      Hủy
                    </button>
                  </div>
                </div>
              )}
            </Card>
          );
        })}

        {filtered.length === 0 && (
          <Card>
            <div style={{ textAlign: "center", padding: "32px 0", color: "#9CA3AF", fontSize: 14 }}>
              Không có yêu cầu nào trong danh sách này.
            </div>
          </Card>
        )}
      </div>

      {/* Full profile modal */}
      {selectedReq && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center", padding: 16 }}>
          <div style={{ background: "#fff", borderRadius: 16, padding: 32, width: "100%", maxWidth: 560, maxHeight: "90vh", overflowY: "auto" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
              <h3 style={{ fontSize: 18, fontWeight: 600, color: "#1F2937" }}>Hồ sơ chuyên gia</h3>
              <button onClick={() => setSelectedReq(null)} style={{ background: "none", border: "none", fontSize: 20, color: "#6B7280", cursor: "pointer" }}>✕</button>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 20 }}>
              <div style={{ width: 64, height: 64, borderRadius: "50%", background: "#DBEAFE", color: "#1D4ED8", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, fontWeight: 700 }}>
                {selectedReq.name.split(" ").pop()?.charAt(0)}
              </div>
              <div>
                <h3 style={{ fontSize: 18, fontWeight: 600, color: "#1F2937" }}>{selectedReq.name}</h3>
                <div style={{ fontSize: 14, color: "#2563EB", fontWeight: 500 }}>{selectedReq.degree}</div>
                <span style={{ padding: "3px 8px", borderRadius: 6, fontSize: 12, fontWeight: 600, background: statusConfig[selectedReq.status].bg, color: statusConfig[selectedReq.status].color }}>
                  {statusConfig[selectedReq.status].label}
                </span>
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 16 }}>
              {[
                { label: "Chuyên ngành", value: selectedReq.specialization },
                { label: "Cơ sở đào tạo", value: selectedReq.university },
                { label: "Kinh nghiệm", value: `${selectedReq.experience} năm` },
                { label: "Mã chứng chỉ", value: selectedReq.license },
                { label: "Email", value: selectedReq.email },
                { label: "Điện thoại", value: selectedReq.phone },
              ].map((r) => (
                <div key={r.label} style={{ background: "#F9FAFB", borderRadius: 10, padding: "10px 14px" }}>
                  <div style={{ fontSize: 12, color: "#6B7280" }}>{r.label}</div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: "#1F2937", marginTop: 2 }}>{r.value}</div>
                </div>
              ))}
            </div>

            <div style={{ marginBottom: 20 }}>
              <div style={{ fontSize: 14, fontWeight: 500, color: "#374151", marginBottom: 8 }}>Giới thiệu</div>
              <div style={{ fontSize: 14, color: "#6B7280", lineHeight: 1.6, background: "#F9FAFB", borderRadius: 8, padding: 12 }}>
                {selectedReq.bio}
              </div>
            </div>

            {selectedReq.status === "pending" && (
              <div style={{ display: "flex", gap: 10 }}>
                <button onClick={() => updateStatus(selectedReq.id, "approved")}
                  style={{ flex: 1, height: 44, borderRadius: 8, border: "none", background: "#22C55E", color: "#fff", fontSize: 14, fontWeight: 600, cursor: "pointer" }}>
                  Phê duyệt
                </button>
                <button onClick={() => { setSelectedReq(null); setShowRejectForm(selectedReq.id); }}
                  style={{ flex: 1, height: 44, borderRadius: 8, border: "1.5px solid #EF4444", background: "transparent", color: "#EF4444", fontSize: 14, fontWeight: 600, cursor: "pointer" }}>
                  Từ chối
                </button>
              </div>
            )}

            {selectedReq.status !== "pending" && (
              <button onClick={() => setSelectedReq(null)}
                style={{ width: "100%", height: 44, borderRadius: 8, border: "1.5px solid #E5E7EB", background: "#fff", color: "#374151", fontSize: 14, cursor: "pointer" }}>
                Đóng
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
