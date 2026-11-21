"use client";

import { useState } from "react";

const E = "#00C853";
const E_DARK = "#00A344";
const E_LIGHT = "#E6F9EE";
const DARK = "#0F172A";

const cardShadow =
  "0 4px 24px rgba(0,0,0,0.06), 0 1px 3px rgba(0,0,0,0.04)";

const styles: Record<string, React.CSSProperties> = {
  page: {
    minHeight: "100vh",
    background:
      "linear-gradient(180deg, #F0FDF4 0%, #F8FAF9 260px, #F8FAF9 100%)",
    fontFamily:
      "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    color: DARK,
  },
  container: {
    maxWidth: 880,
    margin: "0 auto",
    padding: "0 20px 60px",
  },
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "18px 0",
    gap: 12,
    flexWrap: "wrap" as const,
  },
  brand: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    fontSize: 20,
    fontWeight: 800,
    letterSpacing: "-0.4px",
    color: DARK,
    textDecoration: "none",
  },
  brandBadge: {
    width: 32,
    height: 32,
    borderRadius: 10,
    background: E,
    color: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 16,
    fontWeight: 800,
  },
  headerActions: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    flexWrap: "wrap" as const,
  },
  headerBtn: {
    display: "inline-flex",
    alignItems: "center",
    gap: 6,
    borderRadius: 999,
    padding: "9px 16px",
    fontSize: 14,
    fontWeight: 600,
    textDecoration: "none",
    border: "1.5px solid #E5E7EB",
    background: "#fff",
    color: "#374151",
  },
  headerBtnPrimary: {
    display: "inline-flex",
    alignItems: "center",
    gap: 6,
    borderRadius: 999,
    padding: "9px 16px",
    fontSize: 14,
    fontWeight: 700,
    textDecoration: "none",
    border: "none",
    background: E,
    color: "#fff",
  },
  hero: {
    textAlign: "center" as const,
    padding: "20px 0 28px",
  },
  h1: {
    fontSize: "clamp(28px, 5vw, 44px)",
    fontWeight: 900,
    letterSpacing: "-1.2px",
    lineHeight: 1.1,
    margin: "0 0 10px",
    color: DARK,
  },
  accent: { color: E },
  sub: {
    fontSize: "clamp(15px, 2vw, 17px)",
    color: "#4B5563",
    margin: 0,
    lineHeight: 1.5,
  },
  card: {
    background: "#fff",
    borderRadius: 20,
    padding: 22,
    boxShadow: cardShadow,
    border: "1px solid #F1F5F9",
  },
  uploadLabel: {
    display: "flex",
    flexDirection: "column" as const,
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center" as const,
    gap: 12,
    cursor: "pointer",
    borderRadius: 20,
    border: `2px dashed ${E}55`,
    background: "#F6FEFA",
    padding: "56px 24px",
    minHeight: 260,
    transition: "background 0.15s ease, border-color 0.15s ease",
  },
  camCircle: {
    width: 84,
    height: 84,
    borderRadius: "50%",
    background: E_LIGHT,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 40,
  },
  uploadTitle: {
    fontSize: 18,
    fontWeight: 800,
    color: DARK,
    margin: 0,
  },
  uploadHint: {
    fontSize: 14,
    color: "#6B7280",
    margin: 0,
    maxWidth: 320,
  },
  uploadBtn: {
    marginTop: 6,
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    background: E,
    color: "#fff",
    border: "none",
    borderRadius: 999,
    padding: "12px 22px",
    fontSize: 15,
    fontWeight: 700,
    cursor: "pointer",
  },
  hiddenInput: {
    display: "none",
  },
  previewWrap: {
    position: "relative" as const,
    borderRadius: 20,
    overflow: "hidden",
    border: "1px solid #F1F5F9",
    background: "#0F172A",
  },
  previewImg: {
    display: "block",
    width: "100%",
    maxHeight: 420,
    objectFit: "cover" as const,
  },
  retake: {
    position: "absolute" as const,
    top: 12,
    right: 12,
    background: "rgba(15,23,42,0.75)",
    color: "#fff",
    border: "none",
    borderRadius: 999,
    padding: "8px 14px",
    fontSize: 13,
    fontWeight: 600,
    cursor: "pointer",
    backdropFilter: "blur(6px)",
  },
  resultCard: {
    marginTop: 20,
    background: "#fff",
    borderRadius: 20,
    padding: 22,
    boxShadow: cardShadow,
    border: "1px solid #F1F5F9",
  },
  resultHead: {
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: 16,
    flexWrap: "wrap" as const,
  },
  resultLabel: {
    fontSize: 12,
    fontWeight: 700,
    letterSpacing: "0.5px",
    textTransform: "uppercase" as const,
    color: "#6B7280",
    margin: "0 0 4px",
  },
  resultPrice: {
    fontSize: "clamp(26px, 4vw, 36px)",
    fontWeight: 900,
    color: DARK,
    letterSpacing: "-1px",
    margin: 0,
    lineHeight: 1.1,
  },
  verdict: {
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    background: E,
    color: "#fff",
    borderRadius: 999,
    padding: "10px 18px",
    fontSize: 15,
    fontWeight: 800,
    letterSpacing: "0.3px",
  },
  resultNote: {
    marginTop: 14,
    paddingTop: 14,
    borderTop: "1px solid #EEF2F6",
    fontSize: 14,
    color: "#4B5563",
    lineHeight: 1.6,
  },
  actions: {
    display: "flex",
    gap: 12,
    marginTop: 18,
    flexWrap: "wrap" as const,
  },
  primaryAction: {
    flex: "1 1 200px",
    textAlign: "center" as const,
    background: E,
    color: "#fff",
    border: "none",
    borderRadius: 12,
    padding: "13px 20px",
    fontSize: 15,
    fontWeight: 700,
    textDecoration: "none",
    cursor: "pointer",
  },
  secondaryAction: {
    flex: "1 1 200px",
    textAlign: "center" as const,
    background: "#fff",
    color: "#374151",
    border: "1.5px solid #E5E7EB",
    borderRadius: 12,
    padding: "13px 20px",
    fontSize: 15,
    fontWeight: 700,
    textDecoration: "none",
    cursor: "pointer",
  },
  stepsSection: {
    marginTop: 40,
  },
  sectionTitle: {
    fontSize: "clamp(20px, 3vw, 26px)",
    fontWeight: 900,
    letterSpacing: "-0.6px",
    textAlign: "center" as const,
    margin: "0 0 20px",
    color: DARK,
  },
  stepsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: 14,
  },
  stepCard: {
    background: "#fff",
    borderRadius: 16,
    padding: 18,
    boxShadow: cardShadow,
    border: "1px solid #F1F5F9",
    display: "flex",
    alignItems: "center",
    gap: 12,
  },
  stepNum: {
    width: 36,
    height: 36,
    borderRadius: 10,
    background: E_LIGHT,
    color: E_DARK,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 16,
    fontWeight: 900,
    flexShrink: 0,
  },
  stepTitle: {
    fontSize: 15,
    fontWeight: 800,
    color: DARK,
    margin: 0,
  },
  stepText: {
    fontSize: 13,
    color: "#6B7280",
    margin: "2px 0 0",
  },
  whySection: {
    marginTop: 40,
  },
  whyGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: 14,
  },
  whyCard: {
    background: "#fff",
    borderRadius: 18,
    padding: 20,
    boxShadow: cardShadow,
    border: "1px solid #F1F5F9",
  },
  whyIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    background: E_LIGHT,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 22,
    marginBottom: 12,
  },
  whyTitle: {
    fontSize: 16,
    fontWeight: 800,
    color: DARK,
    margin: "0 0 4px",
  },
  whyText: {
    fontSize: 13,
    color: "#6B7280",
    margin: 0,
    lineHeight: 1.55,
  },
  footer: {
    marginTop: 48,
    textAlign: "center" as const,
    fontSize: 12,
    color: "#9CA3AF",
  },
};

export default function Scan() {
  const [photo, setPhoto] = useState<string | null>(null);
  const [result, setResult] = useState<{
    priceLow: number;
    priceHigh: number;
    verdict: "SELL" | "FIX" | "DONATE";
  } | null>(null);

  function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setPhoto(typeof reader.result === "string" ? reader.result : null);
      // Simple mock AI result — same values as before, unchanged logic
      setResult({ priceLow: 380, priceHigh: 450, verdict: "SELL" });
    };
    reader.readAsDataURL(file);
  }

  function reset() {
    setPhoto(null);
    setResult(null);
  }

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        {/* HEADER */}
        <header style={styles.header}>
          <a href="/" style={styles.brand}>
            <span style={styles.brandBadge}>R</span>
            ReHome
          </a>
          <div style={styles.headerActions}>
            <a href="/" style={styles.headerBtn}>
              Home
            </a>
            <a href="/marketplace" style={styles.headerBtnPrimary}>
              Marketplace
            </a>
          </div>
        </header>

        {/* HERO */}
        <div style={styles.hero}>
          <h1 style={styles.h1}>
            Scan Your <span style={styles.accent}>Item</span>
          </h1>
          <p style={styles.sub}>
            Take a photo — our AI estimates the resale value instantly.
          </p>
        </div>

        {/* UPLOAD / PREVIEW */}
        <div style={styles.card}>
          {!photo ? (
            <label htmlFor="scan-photo-input" style={styles.uploadLabel}>
              <div style={styles.camCircle}>📷</div>
              <p style={styles.uploadTitle}>Click to take a photo</p>
              <p style={styles.uploadHint}>
                Or choose an image from your device. JPG or PNG, any size.
              </p>
              <span style={styles.uploadBtn}>📷 Upload photo</span>
              <input
                id="scan-photo-input"
                type="file"
                accept="image/*"
                onChange={handleFile}
                style={styles.hiddenInput}
              />
            </label>
          ) : (
            <div style={styles.previewWrap}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={photo} alt="Scanned item" style={styles.previewImg} />
              <button type="button" style={styles.retake} onClick={reset}>
                ✕ Retake
              </button>
            </div>
          )}
        </div>

        {/* RESULT */}
        {photo && result && (
          <div style={styles.resultCard}>
            <div style={styles.resultHead}>
              <div>
                <p style={styles.resultLabel}>AI estimated value</p>
                <p style={styles.resultPrice}>
                  ${result.priceLow} – ${result.priceHigh}
                </p>
              </div>
              <span style={styles.verdict}>✓ {result.verdict}</span>
            </div>

            <p style={styles.resultNote}>
              Based on similar listings in your area, we recommend{" "}
              <strong style={{ color: E_DARK }}>{result.verdict}</strong> — this
              item sells quickly and nets you the most cash after the 5% fee.
            </p>

            <div style={styles.actions}>
              <a href="/marketplace" style={styles.primaryAction}>
                List on Marketplace
              </a>
              <a href="/" style={styles.secondaryAction}>
                ← Back to Home
              </a>
            </div>
          </div>
        )}

        {/* STEPS */}
        <section style={styles.stepsSection}>
          <h2 style={styles.sectionTitle}>How it works</h2>
          <div style={styles.stepsGrid}>
            <div style={styles.stepCard}>
              <div style={styles.stepNum}>1</div>
              <div>
                <p style={styles.stepTitle}>Take Photo</p>
                <p style={styles.stepText}>Snap a clear picture of your item</p>
              </div>
            </div>
            <div style={styles.stepCard}>
              <div style={styles.stepNum}>2</div>
              <div>
                <p style={styles.stepTitle}>AI Estimates</p>
                <p style={styles.stepText}>Get an instant resale value</p>
              </div>
            </div>
            <div style={styles.stepCard}>
              <div style={styles.stepNum}>3</div>
              <div>
                <p style={styles.stepTitle}>List &amp; Sell</p>
                <p style={styles.stepText}>Post it and get paid locally</p>
              </div>
            </div>
          </div>
        </section>

        {/* WHY */}
        <section style={styles.whySection}>
          <h2 style={styles.sectionTitle}>Why Scan with ReHome?</h2>
          <div style={styles.whyGrid}>
            <div style={styles.whyCard}>
              <div style={styles.whyIcon}>💵</div>
              <p style={styles.whyTitle}>Free</p>
              <p style={styles.whyText}>
                Scanning and estimating costs nothing. We only take 5% when you
                sell.
              </p>
            </div>
            <div style={styles.whyCard}>
              <div style={styles.whyIcon}>⚡</div>
              <p style={styles.whyTitle}>Instant</p>
              <p style={styles.whyText}>
                Get a price range and SELL / FIX / DONATE verdict in under a
                second.
              </p>
            </div>
            <div style={styles.whyCard}>
              <div style={styles.whyIcon}>🎯</div>
              <p style={styles.whyTitle}>Accurate</p>
              <p style={styles.whyText}>
                Based on real listings across all 50 states, adjusted for your
                local market.
              </p>
            </div>
          </div>
        </section>

        <p style={styles.footer}>
          © {new Date().getFullYear()} ReHome · Don&apos;t throw it. ReHome it.
        </p>
      </div>
    </div>
  );
}
