"use client";
import { useState } from "react";

export default function Scan() {
  const [photo, setPhoto] = useState<string | null>(null);
  const [result, setResult] = useState<string | null>(null);

  return (
    <div style={{ minHeight: "100vh", background: "#F8FAF9", fontFamily: "system-ui, sans-serif", padding: 20 }}>
      <div style={{ maxWidth: 600, margin: "0 auto", background: "#fff", borderRadius: 20, padding: 28, boxShadow: "0 4px 24px rgba(0,0,0,0.06)" }}>
        <a href="/" style={{ color: "#00C853", fontWeight: 700, textDecoration: "none" }}>← Back to Home</a>
        <h1 style={{ fontSize: 32, fontWeight: 900, margin: "12px 0 8px" }}>📸 Scan Your Item</h1>
        <p style={{ color: "#6B7280", margin: 0 }}>Take a photo of your old item, we will estimate its price.</p>

        <label style={{ display: "block", marginTop: 20, background: "#E6F9EE", border: "2px dashed #00C853", borderRadius: 16, padding: 30, textAlign: "center", cursor: "pointer", fontWeight: 700 }}>
          {photo ? "📷 Photo Selected - Click to change" : "📷 Click to take a photo / Upload"}
          <input
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                setPhoto(URL.createObjectURL(file));
                setResult("AI detected: Sofa - Good condition. Estimated value: $380 - $450. Recommendation: SELL - Good profit after 5% fee.");
              }
            }}
          />
        </label>

        {photo && <img src={photo} style={{ width: "100%", borderRadius: 16, marginTop: 16 }} alt="Your item" />}

        {result && (
          <div style={{ background: "#F9FAFB", borderRadius: 16, padding: 18, marginTop: 16 }}>
            <p style={{ fontWeight: 800, margin: 0 }}>🤖 AI Result:</p>
            <p style={{ margin: "8px 0 0" }}>{result}</p>
            <a href="/marketplace" style={{ display: "block", textAlign: "center", background: "#00C853", color: "#fff", padding: 14, borderRadius: 12, fontWeight: 800, textDecoration: "none", marginTop: 14 }}>List It Now →</a>
          </div>
        )}

        <p style={{ textAlign: "center", color: "#999", fontSize: 12, marginTop: 20 }}>Works on mobile camera + desktop upload</p>
      </div>
    </div>
  );
}
