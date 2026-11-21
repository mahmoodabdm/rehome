"use client";

import { useState, useMemo } from "react";
import { STATES } from "../lib/states";
import { ITEMS, CONDITIONS, estimatePrice } from "../lib/pricing";

type StateLike = {
  code: string;
  name: string;
  multiplier: number;
  tax: number;
  cities: string[];
};

type ItemLike = {
  name: string;
  base: number;
  emoji: string;
  cat: string;
};

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
      "linear-gradient(180deg, #F0FDF4 0%, #F8FAF9 320px, #F8FAF9 100%)",
    fontFamily:
      "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    color: DARK,
  },
  container: { maxWidth: 1120, margin: "0 auto", padding: "0 20px" },
  nav: { display: "flex", alignItems: "center", justifyContent: "space-between", padding: "20px 0" },
  logo: { display: "flex", alignItems: "center", gap: 10, fontSize: 22, fontWeight: 800, letterSpacing: "-0.5px", color: DARK, textDecoration: "none" },
  logoBadge: { width: 34, height: 34, borderRadius: 10, background: E, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, fontWeight: 800 },
  navLinks: { display: "flex", gap: 16, alignItems: "center" },
  navLink: { fontSize: 14, fontWeight: 600, color: "#374151", textDecoration: "none", cursor: "pointer" },
  navScan: { background: E, color: "#fff", padding: "10px 18px", borderRadius: 999, fontSize: 14, fontWeight: 700, textDecoration: "none", display: "inline-block" },
  navCta: { background: E, color: "#fff", border: "none", borderRadius: 999, padding: "10px 20px", fontSize: 14, fontWeight: 700, cursor: "pointer", textDecoration: "none", display: "inline-block" },
  hero: { textAlign: "center" as const, padding: "48px 0 40px" },
  h1: { fontSize: "clamp(36px, 6vw, 64px)", fontWeight: 900, letterSpacing: "-2px", lineHeight: 1.05, margin: "0 0 16px", color: DARK },
  h1Accent: { color: E },
  subtitle: { fontSize: "clamp(16px, 2vw, 20px)", color: "#4B5563", maxWidth: 560, margin: "0 auto 28px", lineHeight: 1.5 },
  badgeRow: { display: "flex", justifyContent: "center", gap: 12, flexWrap: "wrap" as const, marginBottom: 36 },
  pill: { display: "inline-flex", alignItems: "center", gap: 6, background: E_LIGHT, color: E_DARK, borderRadius: 999, padding: "6px 14px", fontSize: 13, fontWeight: 600 },
  heroBtns: { display: "flex", justifyContent: "center", gap: 12, flexWrap: "wrap" as const, marginBottom: 12 },
  heroScanBtn: { background: E, color: "#fff", padding: "14px 28px", borderRadius: 999, fontSize: 16, fontWeight: 800, textDecoration: "none", display: "inline-block" },
  heroBrowseBtn: { background: "#fff", color: DARK, padding: "14px 28px", borderRadius: 999, fontSize: 16, fontWeight: 700, textDecoration: "none", display: "inline-block", border: "1.5px solid #E5E7EB" },
  estimatorCard: { background: "#fff", borderRadius: 20, padding: 28, boxShadow: cardShadow, border: "1px solid #F1F5F9", maxWidth: 820, margin: "0 auto", textAlign: "left" as const },
  cardTitle: { fontSize: 20, fontWeight: 800, margin: "0 0 4px", color: DARK },
  cardSub: { fontSize: 14, color: "#6B7280", margin: "0 0 20px" },
  grid2: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 16 },
  label: { display: "block", fontSize: 12, fontWeight: 700, textTransform: "uppercase" as const, letterSpacing: "0.5px", color: "#6B7280", marginBottom: 8 },
  select: { width: "100%", padding: "12px 14px", borderRadius: 12, border: "1.5px solid #E5E7EB", fontSize: 15, background: "#fff", color: DARK, cursor: "pointer", outline: "none", boxSizing: "border-box" as const },
  conditionRow: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: 10, marginTop: 8 },
  conditionBtn: { padding: "11px 12px", borderRadius: 12, fontSize: 14, fontWeight: 600, cursor: "pointer", border: "1.5px solid #E5E7EB", background: "#fff", color: "#374151" },
  conditionBtnActive: { padding: "11px 12px", borderRadius: 12, fontSize: 14, fontWeight: 700, cursor: "pointer", border: `1.5px solid ${E}`, background: E_LIGHT, color: E_DARK },
  result: { marginTop: 24, background: "#F9FAFB", borderRadius: 16, padding: 22, border: "1px solid #F1F5F9" },
  priceRow: { display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap" as const, gap: 16 },
  priceLabel: { fontSize: 13, fontWeight: 600, color: "#6B7280", margin: "0 0 4px" },
  priceValue: { fontSize: "clamp(28px, 5vw, 40px)", fontWeight: 900, color: DARK, letterSpacing: "-1px", margin: 0, lineHeight: 1.1 },
  verdict: { display: "inline-flex", alignItems: "center", gap: 8, borderRadius: 999, padding: "10px 20px", fontSize: 16, fontWeight: 800, color: "#fff", letterSpacing: "0.3px" },
  metrics: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: 12, marginTop: 18 },
  metric: { background: "#fff", borderRadius: 12, padding: "14px 16px", border: "1px solid #F1F5F9" },
  metricLabel: { fontSize: 12, fontWeight: 600, color: "#6B7280", margin: "0 0 4px", textTransform: "uppercase" as const, letterSpacing: "0.4px" },
  metricValue: { fontSize: 20, fontWeight: 800, color: DARK, margin: 0 },
  citiesWrap: { marginTop: 16, paddingTop: 16, borderTop: "1px solid #EEF2F6" },
  citiesLabel: { fontSize: 12, fontWeight: 700, color: "#6B7280", margin: "0 0 8px", textTransform: "uppercase" as const, letterSpacing: "0.4px" },
  chips: { display: "flex", flexWrap: "wrap" as const, gap: 8 },
  chip: { background: "#fff", border: "1px solid #E5E7EB", borderRadius: 999, padding: "5px 12px", fontSize: 13, color: "#374151", fontWeight: 500 },
  section: { padding: "64px 0" },
  sectionHead: { textAlign: "center" as const, marginBottom: 40 },
  sectionTitle: { fontSize: "clamp(26px, 4vw, 38px)", fontWeight: 900, letterSpacing: "-1px", margin: "0 0 12px", color: DARK },
  sectionSub: { fontSize: 16, color: "#6B7280", margin: 0, maxWidth: 520, marginLeft: "auto", marginRight: "auto" },
  steps: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 20 },
  stepCard: { background: "#fff", borderRadius: 20, padding: 28, boxShadow: cardShadow, border: "1px solid #F1F5F9" },
  stepNum: { width: 44, height: 44, borderRadius: 12, background: E_LIGHT, color: E_DARK, fontSize: 20, fontWeight: 900, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 16 },
  stepTitle: { fontSize: 18, fontWeight: 800, margin: "0 0 8px", color: DARK },
  stepText: { fontSize: 14, color: "#6B7280", lineHeight: 1.55, margin: 0 },
  trendingGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 20 },
  trendingCard: { background: "#fff", borderRadius: 20, padding: 22, boxShadow: cardShadow, border: "1px solid #F1F5F9", display: "flex", flexDirection: "column" as const, gap: 10 },
  trendingEmoji: { width: 56, height: 56, borderRadius: 14, background: E_LIGHT, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28, marginBottom: 4 },
  trendingTitle: { fontSize: 17, fontWeight: 800, color: DARK, margin: 0 },
  trendingMeta: { fontSize: 13, color: "#6B7280", margin: 0 },
  trendingPrice: { fontSize: 20, fontWeight: 900, color: E_DARK, margin: "6px 0 0" },
  footer: { background: DARK, color: "#94A3B8", padding: "40px 0", marginTop: 40 },
  footerInner: { maxWidth: 1120, margin: "0 auto", padding: "0 20px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap" as const, gap: 16 },
  footerLogo: { fontSize: 20, fontWeight: 800, color: "#fff", display: "flex", alignItems: "center", gap: 8 },
  footerText: { fontSize: 13, color: "#94A3B8", margin: 0 },
};

function resolveConditionMultiplier(conditionKey: string): number {
  const raw = CONDITIONS as unknown as Record<string, unknown>;
  const direct = raw?.[conditionKey];
  if (typeof direct === "number") return direct;
  const fallback: Record<string, number> = { likeNew: 0.9, good: 0.7, fair: 0.45, needsRepair: 0.25 };
  return fallback[conditionKey] ?? 0.7;
}

function getVerdict(low: number, fixCost: number, profit: number): "SELL" | "FIX" | "DONATE" {
  if (profit <= 25) return "DONATE";
  if (fixCost < profit * 0.35 && profit > 40) return "FIX";
  return "SELL";
}

export default function HomePage() {
  const states = STATES as unknown as StateLike[];
  const items = ITEMS as unknown as ItemLike[];
  const [stateCode, setStateCode] = useState<string>(states[0]?.code ?? "CA");
  const [itemName, setItemName] = useState<string>(items[0]?.name ?? "");
  const [conditionKey, setConditionKey] = useState<string>("good");

  const conditionOptions = useMemo(
    () => [
      { key: "likeNew", label: "Like New" },
      { key: "good", label: "Good" },
      { key: "fair", label: "Fair" },
      { key: "needsRepair", label: "Needs Repair" },
    ],
    []
  );

  const selectedState = states.find((s) => s.code === stateCode) ?? states[0];
  const selectedItem = items.find((i) => i.name === itemName) ?? items[0];

  const estimate = useMemo(() => {
    if (!selectedState || !selectedItem) return { low: 0, high: 0, profit: 0, fixCost: 0 };
    const condMultiplier = resolveConditionMultiplier(conditionKey);
    try {
      const result = estimatePrice(selectedItem.base, condMultiplier, selectedState.multiplier);
      return { low: Number(result?.low) || 0, high: Number(result?.high) || 0, profit: Number(result?.profit) || 0, fixCost: Number(result?.fixCost) || 0 };
    } catch {
      const value = selectedItem.base * condMultiplier * selectedState.multiplier;
      return { low: value * 0.92, high: value * 1.08, profit: value * 0.95, fixCost: selectedItem.base * 0.18 };
    }
  }, [selectedState, selectedItem, conditionKey]);

  const verdict = getVerdict(estimate.low, estimate.fixCost, estimate.profit);
  const tax = selectedState?.tax ?? 0;
  const verdictColor = verdict === "SELL" ? E : verdict === "FIX" ? "#F59E0B" : "#0284C7";
  const verdictLabel = verdict === "SELL" ? "✓ SELL" : verdict === "FIX" ? "🔧 FIX" : "💝 DONATE";

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <nav style={styles.nav}>
          <a href="/" style={styles.logo}>
            <span style={styles.logoBadge}>R</span>
            ReHome
          </a>
          <div style={styles.navLinks}>
            <a href="/scan" style={styles.navScan}>📸 Scan</a>
            <a href="/marketplace" style={styles.navLink}>Marketplace</a>
            <a href="/earnings" style={styles.navLink}>Earnings</a>
            <a href="/pro" style={styles.navLink}>Pro</a>
            <a href="/auth" style={styles.navCta}>Sign in</a>
          </div>
        </nav>

        <header style={styles.hero}>
          <h1 style={styles.h1}>
            Don&apos;t throw it. <span style={styles.h1Accent}>ReHome it.</span>
          </h1>
          <p style={styles.subtitle}>Turn your old stuff into cash.</p>
          <div style={styles.heroBtns}>
            <a href="/scan" style={styles.heroScanBtn}>📸 Scan My Item</a>
            <a href="/marketplace" style={styles.heroBrowseBtn}>Browse Marketplace</a>
          </div>
          <div style={styles.badgeRow}>
            <span style={styles.pill}>💵 Free to list</span>
            <span style={styles.pill}>♻ Save the planet</span>
            <span style={styles.pill}>🇺🇸 All 50 states</span>
          </div>
        </header>

        <section style={styles.estimatorCard}>
          <h2 style={styles.cardTitle}>Instant resale estimate</h2>
          <p style={styles.cardSub}>Pick your item and condition — we&apos;ll tell you whether to sell, fix, or donate.</p>
          <div style={styles.grid2}>
            <div>
              <label style={styles.label}>State</label>
              <select value={stateCode} onChange={(e) => setStateCode(e.target.value)} style={styles.select}>
                {states.map((s) => (
                  <option key={s.code} value={s.code}>{s.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label style={styles.label}>Item</label>
              <select value={itemName} onChange={(e) => setItemName(e.target.value)} style={styles.select}>
                {items.map((i) => (
                  <option key={i.name} value={i.name}>{i.emoji} {i.name}</option>
                ))}
              </select>
            </div>
          </div>
          <div style={{ marginTop: 20 }}>
            <label style={styles.label}>Condition</label>
            <div style={styles.conditionRow}>
              {conditionOptions.map((c) => (
                <button key={c.key} onClick={() => setConditionKey(c.key)} style={conditionKey === c.key ? styles.conditionBtnActive : styles.conditionBtn} aria-pressed={conditionKey === c.key}>{c.label}</button>
              ))}
            </div>
          </div>
          <div style={styles.result}>
            <div style={styles.priceRow}>
              <div>
                <p style={styles.priceLabel}>Estimated resale value</p>
                <p style={styles.priceValue}>${Math.round(estimate.low)} – ${Math.round(estimate.high)}</p>
              </div>
              <div style={{ ...styles.verdict, background: verdictColor }}>{verdictLabel}</div>
            </div>
            <div style={styles.metrics}>
              <div style={styles.metric}>
                <p style={styles.metricLabel}>Profit after 5% fee</p>
                <p style={styles.metricValue}>${Math.round(estimate.profit)}</p>
              </div>
              <div style={styles.metric}>
                <p style={styles.metricLabel}>Est. fix cost</p>
                <p style={styles.metricValue}>${Math.round(estimate.fixCost)}</p>
              </div>
              <div style={styles.metric}>
                <p style={styles.metricLabel}>State sales tax</p>
                <p style={styles.metricValue}>{tax}%</p>
              </div>
            </div>
            {selectedState?.cities?.length ? (
              <div style={styles.citiesWrap}>
                <p style={styles.citiesLabel}>Popular cities in {selectedState.name}</p>
                <div style={styles.chips}>
                  {selectedState.cities.slice(0, 6).map((city) => (
                    <span key={city} style={styles.chip}>📍 {city}</span>
                  ))}
                </div>
              </div>
            ) : null}
          </div>
        </section>

        <section style={styles.section}>
          <div style={styles.sectionHead}>
            <h2 style={styles.sectionTitle}>How it works</h2>
            <p style={styles.sectionSub}>Three simple steps from closet clutter to cash in hand.</p>
          </div>
          <div style={styles.steps}>
            {[
              { n: 1, title: "Estimate", text: "Pick your item and condition. Get an instant resale value for your state." },
              { n: 2, title: "List", text: "Post it to the ReHome marketplace for free. Reach buyers in your city." },
              { n: 3, title: "Get paid", text: "Sell locally, get paid, and keep 95% — we only take a 5% fee." },
            ].map((s) => (
              <div key={s.n} style={styles.stepCard}>
                <div style={styles.stepNum}>{s.n}</div>
                <h3 style={styles.stepTitle}>{s.title}</h3>
                <p style={styles.stepText}>{s.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section style={styles.section}>
          <div style={styles.sectionHead}>
            <h2 style={styles.sectionTitle}>Trending near you</h2>
            <p style={styles.sectionSub}>Popular items selling fast across the US right now.</p>
          </div>
          <div style={styles.trendingGrid}>
            {[
              { emoji: "🛋", title: "3-Seat Sofa", city: "Los Angeles, CA", price: 380, meta: "Good condition" },
              { emoji: "📱", title: "iPhone 13", city: "New York, NY", price: 410, meta: "Like new" },
              { emoji: "🎮", title: "PS5 Console", city: "Dallas, TX", price: 350, meta: "Good condition" },
            ].map((t) => (
              <div key={t.title} style={styles.trendingCard}>
                <div style={styles.trendingEmoji}>{t.emoji}</div>
                <h3 style={styles.trendingTitle}>{t.title}</h3>
                <p style={styles.trendingMeta}>📍 {t.city} · {t.meta}</p>
                <p style={styles.trendingPrice}>${t.price}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
      <footer style={styles.footer}>
        <div style={styles.footerInner}>
          <div style={styles.footerLogo}>
            <span style={{ width: 28, height: 28, borderRadius: 8, background: E, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 800 }}>R</span>
            ReHome
          </div>
          <p style={styles.footerText}>© {new Date().getFullYear()} ReHome · Don&apos;t throw it. ReHome it.</p>
        </div>
      </footer>
    </div>
  );
}
