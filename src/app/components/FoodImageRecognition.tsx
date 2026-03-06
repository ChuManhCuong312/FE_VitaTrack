// Food Image Recognition Component - Version 2
import React, { useState } from "react";
import { aiService, FoodRecognitionResult } from "../services/ai";

interface Props {
  onFoodRecognized: (result: FoodRecognitionResult) => void;
  onClose: () => void;
}

export function FoodImageRecognition({ onFoodRecognized, onClose }: Props) {
  const [dragOver, setDragOver] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [recognitionResult, setRecognitionResult] = useState<FoodRecognitionResult | null>(null);

  const handleFileSelect = async (file: File) => {
    if (!file.type.startsWith("image/")) {
      alert("Vui lòng chọn file ảnh");
      return;
    }

    // Show preview
    const reader = new FileReader();
    reader.onload = (e) => {
      setImagePreview(e.target?.result as string);
    };
    reader.readAsDataURL(file);

    // Recognize food
    try {
      setUploading(true);
      const result = await aiService.recognizeFood(file);
      setRecognitionResult(result);
    } catch (error) {
      alert("Không thể nhận diện món ăn. Vui lòng thử lại.");
    } finally {
      setUploading(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFileSelect(file);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFileSelect(file);
  };

  const handleConfirm = () => {
    if (recognitionResult) {
      onFoodRecognized(recognitionResult);
      onClose();
    }
  };

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: "rgba(0,0,0,0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
        padding: 20,
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: "#fff",
          borderRadius: 16,
          maxWidth: 600,
          width: "100%",
          maxHeight: "90vh",
          overflow: "auto",
          padding: 24,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <h2 style={{ fontSize: 20, fontWeight: 600, marginBottom: 20 }}>
          Nhận diện món ăn bằng AI
        </h2>

        {!imagePreview && (
          <div
            onDrop={handleDrop}
            onDragOver={(e) => {
              e.preventDefault();
              setDragOver(true);
            }}
            onDragLeave={() => setDragOver(false)}
            style={{
              border: `2px dashed ${dragOver ? "#22C55E" : "#E5E7EB"}`,
              borderRadius: 12,
              padding: 40,
              textAlign: "center",
              background: dragOver ? "#F0FDF4" : "#F9FAFB",
              cursor: "pointer",
              transition: "all 0.2s",
            }}
            onClick={() => document.getElementById("file-input")?.click()}
          >
            <div style={{ fontSize: 48, marginBottom: 12 }}>📷</div>
            <div style={{ fontSize: 16, fontWeight: 600, color: "#1F2937", marginBottom: 8 }}>
              Kéo thả ảnh hoặc click để chọn
            </div>
            <div style={{ fontSize: 14, color: "#6B7280" }}>
              Hỗ trợ JPG, PNG (tối đa 10MB)
            </div>
            <input
              id="file-input"
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              onChange={handleFileInput}
            />
          </div>
        )}

        {imagePreview && (
          <div>
            <div style={{ marginBottom: 20 }}>
              <img
                src={imagePreview}
                alt="Preview"
                style={{
                  width: "100%",
                  borderRadius: 12,
                  maxHeight: 300,
                  objectFit: "cover",
                }}
              />
            </div>

            {uploading && (
              <div style={{ textAlign: "center", padding: 20 }}>
                <div style={{ fontSize: 16, color: "#6B7280", marginBottom: 12 }}>
                  Đang nhận diện món ăn...
                </div>
                <div style={{ display: "flex", justifyContent: "center", gap: 8 }}>
                  {[0, 1, 2].map((i) => (
                    <div
                      key={i}
                      style={{
                        width: 12,
                        height: 12,
                        borderRadius: "50%",
                        background: "#22C55E",
                        animation: `pulse 1.4s ease-in-out ${i * 0.2}s infinite`,
                      }}
                    />
                  ))}
                </div>
              </div>
            )}

            {recognitionResult && !uploading && (
              <div>
                <div
                  style={{
                    background: "#F0FDF4",
                    border: "1px solid #22C55E",
                    borderRadius: 12,
                    padding: 16,
                    marginBottom: 16,
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
                    <div style={{ fontSize: 20 }}>✓</div>
                    <div>
                      <div style={{ fontSize: 18, fontWeight: 600, color: "#1F2937" }}>
                        {recognitionResult.foodName}
                      </div>
                      <div style={{ fontSize: 13, color: "#6B7280" }}>
                        Độ chính xác: {Math.round(recognitionResult.confidence * 100)}%
                      </div>
                    </div>
                  </div>

                  <div style={{ fontSize: 14, color: "#6B7280", marginBottom: 12 }}>
                    Khẩu phần: {recognitionResult.servingSize}
                  </div>

                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(4, 1fr)",
                      gap: 12,
                      marginTop: 12,
                    }}
                  >
                    <div>
                      <div style={{ fontSize: 11, color: "#6B7280" }}>Calories</div>
                      <div style={{ fontSize: 16, fontWeight: 600, color: "#1F2937" }}>
                        {recognitionResult.nutritionInfo.calories}
                      </div>
                    </div>
                    <div>
                      <div style={{ fontSize: 11, color: "#6B7280" }}>Protein</div>
                      <div style={{ fontSize: 16, fontWeight: 600, color: "#22C55E" }}>
                        {recognitionResult.nutritionInfo.protein}g
                      </div>
                    </div>
                    <div>
                      <div style={{ fontSize: 11, color: "#6B7280" }}>Carbs</div>
                      <div style={{ fontSize: 16, fontWeight: 600, color: "#2563EB" }}>
                        {recognitionResult.nutritionInfo.carbs}g
                      </div>
                    </div>
                    <div>
                      <div style={{ fontSize: 11, color: "#6B7280" }}>Fat</div>
                      <div style={{ fontSize: 16, fontWeight: 600, color: "#F59E0B" }}>
                        {recognitionResult.nutritionInfo.fat}g
                      </div>
                    </div>
                  </div>
                </div>

                {recognitionResult.alternatives && recognitionResult.alternatives.length > 0 && (
                  <div style={{ marginBottom: 16 }}>
                    <div style={{ fontSize: 13, fontWeight: 600, color: "#6B7280", marginBottom: 8 }}>
                      Có thể là:
                    </div>
                    {recognitionResult.alternatives.map((alt, idx) => (
                      <div
                        key={idx}
                        style={{
                          padding: "8px 12px",
                          background: "#F9FAFB",
                          borderRadius: 8,
                          fontSize: 13,
                          color: "#6B7280",
                          marginBottom: 4,
                        }}
                      >
                        {alt.name} ({Math.round(alt.confidence * 100)}%)
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            <div style={{ display: "flex", gap: 12, marginTop: 20 }}>
              <button
                onClick={() => {
                  setImagePreview(null);
                  setRecognitionResult(null);
                }}
                style={{
                  flex: 1,
                  padding: "12px 24px",
                  border: "1px solid #E5E7EB",
                  borderRadius: 12,
                  background: "#fff",
                  color: "#6B7280",
                  fontSize: 14,
                  fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                Chụp lại
              </button>
              <button
                onClick={handleConfirm}
                disabled={!recognitionResult}
                style={{
                  flex: 1,
                  padding: "12px 24px",
                  border: "none",
                  borderRadius: 12,
                  background: recognitionResult ? "#22C55E" : "#E5E7EB",
                  color: recognitionResult ? "#fff" : "#9CA3AF",
                  fontSize: 14,
                  fontWeight: 600,
                  cursor: recognitionResult ? "pointer" : "not-allowed",
                }}
              >
                Xác nhận
              </button>
            </div>
          </div>
        )}

        <button
          onClick={onClose}
          style={{
            marginTop: 16,
            width: "100%",
            padding: "12px",
            border: "none",
            borderRadius: 12,
            background: "#F9FAFB",
            color: "#6B7280",
            fontSize: 14,
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          Đóng
        </button>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% {
            opacity: 0.4;
            transform: scale(0.8);
          }
          50% {
            opacity: 1;
            transform: scale(1.2);
          }
        }
      `}</style>
    </div>
  );
}
