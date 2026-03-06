import React, { useState } from "react";
import { aiService } from "../services/ai";
function FoodImageRecognition({ onFoodRecognized, onClose }) {
  const [dragOver, setDragOver] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [recognitionResult, setRecognitionResult] = useState(null);
  const handleFileSelect = async (file) => {
    if (!file.type.startsWith("image/")) {
      alert("Vui l\xF2ng ch\u1ECDn file \u1EA3nh");
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      setImagePreview(e.target?.result);
    };
    reader.readAsDataURL(file);
    try {
      setUploading(true);
      const result = await aiService.recognizeFood(file);
      setRecognitionResult(result);
    } catch (error) {
      alert("Kh\xF4ng th\u1EC3 nh\u1EADn di\u1EC7n m\xF3n \u0103n. Vui l\xF2ng th\u1EED l\u1EA1i.");
    } finally {
      setUploading(false);
    }
  };
  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFileSelect(file);
  };
  const handleFileInput = (e) => {
    const file = e.target.files?.[0];
    if (file) handleFileSelect(file);
  };
  const handleConfirm = () => {
    if (recognitionResult) {
      onFoodRecognized(recognitionResult);
      onClose();
    }
  };
  return /* @__PURE__ */ React.createElement(
    "div",
    {
      style: {
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: "rgba(0,0,0,0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1e3,
        padding: 20
      },
      onClick: onClose
    },
    /* @__PURE__ */ React.createElement(
      "div",
      {
        style: {
          background: "#fff",
          borderRadius: 16,
          maxWidth: 600,
          width: "100%",
          maxHeight: "90vh",
          overflow: "auto",
          padding: 24
        },
        onClick: (e) => e.stopPropagation()
      },
      /* @__PURE__ */ React.createElement("h2", { style: { fontSize: 20, fontWeight: 600, marginBottom: 20 } }, "Nh\u1EADn di\u1EC7n m\xF3n \u0103n b\u1EB1ng AI"),
      !imagePreview && /* @__PURE__ */ React.createElement(
        "div",
        {
          onDrop: handleDrop,
          onDragOver: (e) => {
            e.preventDefault();
            setDragOver(true);
          },
          onDragLeave: () => setDragOver(false),
          style: {
            border: `2px dashed ${dragOver ? "#22C55E" : "#E5E7EB"}`,
            borderRadius: 12,
            padding: 40,
            textAlign: "center",
            background: dragOver ? "#F0FDF4" : "#F9FAFB",
            cursor: "pointer",
            transition: "all 0.2s"
          },
          onClick: () => document.getElementById("file-input")?.click()
        },
        /* @__PURE__ */ React.createElement("div", { style: { fontSize: 48, marginBottom: 12 } }, "\u{1F4F7}"),
        /* @__PURE__ */ React.createElement("div", { style: { fontSize: 16, fontWeight: 600, color: "#1F2937", marginBottom: 8 } }, "K\xE9o th\u1EA3 \u1EA3nh ho\u1EB7c click \u0111\u1EC3 ch\u1ECDn"),
        /* @__PURE__ */ React.createElement("div", { style: { fontSize: 14, color: "#6B7280" } }, "H\u1ED7 tr\u1EE3 JPG, PNG (t\u1ED1i \u0111a 10MB)"),
        /* @__PURE__ */ React.createElement(
          "input",
          {
            id: "file-input",
            type: "file",
            accept: "image/*",
            style: { display: "none" },
            onChange: handleFileInput
          }
        )
      ),
      imagePreview && /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: { marginBottom: 20 } }, /* @__PURE__ */ React.createElement(
        "img",
        {
          src: imagePreview,
          alt: "Preview",
          style: {
            width: "100%",
            borderRadius: 12,
            maxHeight: 300,
            objectFit: "cover"
          }
        }
      )), uploading && /* @__PURE__ */ React.createElement("div", { style: { textAlign: "center", padding: 20 } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 16, color: "#6B7280", marginBottom: 12 } }, "\u0110ang nh\u1EADn di\u1EC7n m\xF3n \u0103n..."), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", justifyContent: "center", gap: 8 } }, [0, 1, 2].map((i) => /* @__PURE__ */ React.createElement(
        "div",
        {
          key: i,
          style: {
            width: 12,
            height: 12,
            borderRadius: "50%",
            background: "#22C55E",
            animation: `pulse 1.4s ease-in-out ${i * 0.2}s infinite`
          }
        }
      )))), recognitionResult && !uploading && /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement(
        "div",
        {
          style: {
            background: "#F0FDF4",
            border: "1px solid #22C55E",
            borderRadius: 12,
            padding: 16,
            marginBottom: 16
          }
        },
        /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 8, marginBottom: 12 } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 20 } }, "\u2713"), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 18, fontWeight: 600, color: "#1F2937" } }, recognitionResult.foodName), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 13, color: "#6B7280" } }, "\u0110\u1ED9 ch\xEDnh x\xE1c: ", Math.round(recognitionResult.confidence * 100), "%"))),
        /* @__PURE__ */ React.createElement("div", { style: { fontSize: 14, color: "#6B7280", marginBottom: 12 } }, "Kh\u1EA9u ph\u1EA7n: ", recognitionResult.servingSize),
        /* @__PURE__ */ React.createElement(
          "div",
          {
            style: {
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: 12,
              marginTop: 12
            }
          },
          /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, color: "#6B7280" } }, "Calories"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 16, fontWeight: 600, color: "#1F2937" } }, recognitionResult.nutritionInfo.calories)),
          /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, color: "#6B7280" } }, "Protein"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 16, fontWeight: 600, color: "#22C55E" } }, recognitionResult.nutritionInfo.protein, "g")),
          /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, color: "#6B7280" } }, "Carbs"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 16, fontWeight: 600, color: "#2563EB" } }, recognitionResult.nutritionInfo.carbs, "g")),
          /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, color: "#6B7280" } }, "Fat"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 16, fontWeight: 600, color: "#F59E0B" } }, recognitionResult.nutritionInfo.fat, "g"))
        )
      ), recognitionResult.alternatives && recognitionResult.alternatives.length > 0 && /* @__PURE__ */ React.createElement("div", { style: { marginBottom: 16 } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 13, fontWeight: 600, color: "#6B7280", marginBottom: 8 } }, "C\xF3 th\u1EC3 l\xE0:"), recognitionResult.alternatives.map((alt, idx) => /* @__PURE__ */ React.createElement(
        "div",
        {
          key: idx,
          style: {
            padding: "8px 12px",
            background: "#F9FAFB",
            borderRadius: 8,
            fontSize: 13,
            color: "#6B7280",
            marginBottom: 4
          }
        },
        alt.name,
        " (",
        Math.round(alt.confidence * 100),
        "%)"
      )))), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 12, marginTop: 20 } }, /* @__PURE__ */ React.createElement(
        "button",
        {
          onClick: () => {
            setImagePreview(null);
            setRecognitionResult(null);
          },
          style: {
            flex: 1,
            padding: "12px 24px",
            border: "1px solid #E5E7EB",
            borderRadius: 12,
            background: "#fff",
            color: "#6B7280",
            fontSize: 14,
            fontWeight: 600,
            cursor: "pointer"
          }
        },
        "Ch\u1EE5p l\u1EA1i"
      ), /* @__PURE__ */ React.createElement(
        "button",
        {
          onClick: handleConfirm,
          disabled: !recognitionResult,
          style: {
            flex: 1,
            padding: "12px 24px",
            border: "none",
            borderRadius: 12,
            background: recognitionResult ? "#22C55E" : "#E5E7EB",
            color: recognitionResult ? "#fff" : "#9CA3AF",
            fontSize: 14,
            fontWeight: 600,
            cursor: recognitionResult ? "pointer" : "not-allowed"
          }
        },
        "X\xE1c nh\u1EADn"
      ))),
      /* @__PURE__ */ React.createElement(
        "button",
        {
          onClick: onClose,
          style: {
            marginTop: 16,
            width: "100%",
            padding: "12px",
            border: "none",
            borderRadius: 12,
            background: "#F9FAFB",
            color: "#6B7280",
            fontSize: 14,
            fontWeight: 600,
            cursor: "pointer"
          }
        },
        "\u0110\xF3ng"
      )
    ),
    /* @__PURE__ */ React.createElement("style", null, `
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
      `)
  );
}
export {
  FoodImageRecognition
};
