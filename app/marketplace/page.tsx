"use client";
import { useState } from "react";
import Link from "next/link";

const ITEMS = [
  { id: 1, title: "Gray 3-Seat Sofa", price: 380, city: "Houston, TX", state: "TX", cat: "Furniture", cond: "Like New", emoji: "🛋️" },
  { id: 2, title: "iPhone 13 128GB", price: 410, city: "Dallas, TX", state: "TX", cat: "Electronics", cond: "Good", emoji: "📱" },
  { id: 3, title: "【entity-PS5¦canonical_name=PS5】 Disc Edition", price: 350, city: "Austin, TX", state: "TX", cat: "Electronics", cond: "Good", emoji: "🎮" },
  { id: 4, title: "Stainless Fridge", price: 720, city: "New York City, NY", state: "NY", cat: "Appliances", cond: "Good", emoji: "🧊" },
  { id: 5, title: "Front-Load Washer", price: 480, city: "Los Angeles, CA", state: "CA", cat: "Appliances", cond: "Fair", emoji: "🧺" },
  { id: 6, title: "Trek Mountain Bike", price: 320, city: "Denver, CO", state: "CO", cat: "Sports", cond: "Good", emoji: "🚲" },
  { id: 7, title: "Oak Dining Table", price: 300, city: "Chicago, IL", state: "IL", cat: "Furniture", cond: "Like New", emoji: "🪑" },
  { id: 8, title: "MacBook Pro 14", price: 780, city: "Seattle, WA", state: "WA", cat: "Electronics", cond: "Like New", emoji: "💻" },
  { id: 9, title: "55 4K TV", price: 400, city: "Miami, FL", state: "FL", cat: "Electronics", cond: "Good", emoji: "📺" },
];

export default function Marketplace() {
  const [cat, setCat] = useState("All");
  const [search, setSearch] = useState("");
  const filtered = ITEMS.filter((it) => {
    if (cat !== "All" && it.cat !== cat) return false;
    if (search && !it.title.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });
  return (
    <main style={{ maxWidth: 1100, margin: "0 auto", padding: 20, fontFamily: "Inter, system-ui, sans-serif" }}>
      <Link href="/" style={{ color: "#00A651", fontWeight: 700 }}>← Back to Home</Link>
      <h1 style={{ fontSize: 32, fontWeight: 800, marginTop: 12 }}>Marketplace</h1>
      <p style={{ color: "#666" }}>Filter by state, city, category. All items are ReHomed, not thrown away.</p>

      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search: sofa, iPhone, 【entity-PS5¦canonical_name=PS5】..."
        style={{ width: "100%", padding: 14, borderRadius: 12, border: "1px solid #ddd", marginTop: 16, fontSize: 16 }}
      />

      <div style={{ display: "flex", gap: 8, marginTop: 12, flexWrap: "wrap" }}>
        {["All", "Furniture", "Electronics", "Appliances", "Sports"].map((c) => (
          <button
            key={c}
            onClick={() => setCat(c)}
            style={{ padding: "8px 16px", borderRadius: 999, border: "1px solid #ddd", background: cat === c ? "#00C853" : "white", color: cat === c ? "white" : "#333", fontWeight: 700, cursor: "pointer" }}
          >
            {c}
          </button>
        ))}
      </div>

      <p style={{ marginTop: 16, color: "#666" }}>{filtered.length} items found</p>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 16, marginTop: 12 }}>
        {filtered.map((it) => (
          <div key={it.id} style={{ background: "white", borderRadius: 20, overflow: "hidden", boxShadow: "0 4px 20px rgba(0,0,0,0.08)", border: "1px solid #eee" }}>
            <div style={{ height: 140, background: "#E8F5E9", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 64 }}>{it.emoji}</div>
            <div style={{ padding: 16 }}>
              <h3 style={{ margin: 0, fontWeight: 800 }}>{it.title}</h3>
              <p style={{ color: "#666", fontSize: 13, margin: "6px 0" }}>{it.city} • {it.cond} • {it.cat}</p>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: 22, fontWeight: 800, color: "#007E33" }}>${it.price}</span>
                <button style={{ background: "#00C853", color: "white", border: "none", padding: "8px 14px", borderRadius: 999, fontWeight: 700, cursor: "pointer" }}>View →</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && <p style={{ textAlign: "center", padding: 40, color: "#888" }}>No items found. Try another search.</p>}
    </main>
  );
}
