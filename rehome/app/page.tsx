"use client";
import { useState } from "react";
import { STATES } from "../lib/states";
import { ITEMS, estimatePrice } from "../lib/pricing";
import Link from "next/link";

export default function Home(){
  const [stateCode,setStateCode]=useState("TX");
  const [itemIdx,setItemIdx]=useState(0);
  const [cond,setCond]=useState<"likeNew"|"good"|"fair"|"needsRepair">("good");
  const st = STATES.find(s=>s.code===stateCode)!;
  const item = ITEMS[itemIdx];
  const est = estimatePrice(item.base, cond, st.multiplier);
  const condLabel = cond==="likeNew"?"Like New":cond==="good"?"Good":cond==="fair"?"Fair":"Needs Repair";
  const action = cond==="needsRepair"?"FIX":"SELL";
  return (
  <main className="min-h-screen bg-[#F8FAF9]">
    <header className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
      <div className="flex items-center gap-2 font-extrabold text-xl"><span className="text-2xl">♻️</span> ReHome</div>
      <nav className="hidden md:flex gap-6 text-sm text-gray-600"><Link href="/marketplace">Marketplace</Link><Link href="/earnings">Earnings</Link><Link href="/scan">Scan</Link><Link href="/pro">Pro</Link></nav>
      <Link href="/auth" className="bg-emerald-600 text-white px-4 py-2 rounded-full text-sm font-bold">Get Started Free</Link>
    </header>
    <section className="max-w-6xl mx-auto px-4 py-10 grid md:grid-cols-2 gap-10 items-center">
      <div>
        <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-3 py-1 rounded-full">FREE FOR USERS • ALL 50 US STATES</span>
        <h1 className="text-5xl font-extrabold leading-tight mt-4">Don&apos;t throw it.<br/><span className="text-emerald-600">ReHome it.</span></h1>
        <p className="text-gray-600 mt-4 text-lg">Turn your old stuff into cash. Snap a photo, get an AI price in seconds, and sell it in your city.</p>
        <div className="flex gap-3 mt-6"><Link href="/scan" className="bg-emerald-600 text-white px-6 py-3 rounded-full font-bold">📸 Scan My Item</Link><Link href="/marketplace" className="bg-white border px-6 py-3 rounded-full font-bold">Browse Marketplace</Link></div>
        <div className="flex gap-6 mt-8 text-sm"><div><b className="text-xl block">$4,225</b><span className="text-gray-500">Avg. earned / user</span></div><div><b className="text-xl block">12,400+</b><span className="text-gray-500">Items rehomed</span></div><div><b className="text-xl block">276 kg</b><span className="text-gray-500">CO₂ saved</span></div></div>
      </div>
      <div className="bg-white rounded-3xl shadow-xl p-6 border">
        <h2 className="font-bold text-lg">💰 Instant Price Estimator</h2>
        <p className="text-sm text-gray-500">Try it now - no sign up needed</p>
        <label className="block text-xs font-bold mt-4">YOUR STATE</label>
        <select value={stateCode} onChange={e=>setStateCode(e.target.value)} className="w-full border rounded-xl p-3 mt-1">{STATES.map(s=><option key={s.code} value={s.code}>{s.name} ({s.code}) - x{s.multiplier}</option>)}</select>
        <label className="block text-xs font-bold mt-3">WHAT ARE YOU SELLING?</label>
        <select value={itemIdx} onChange={e=>setItemIdx(Number(e.target.value))} className="w-full border rounded-xl p-3 mt-1">{ITEMS.map((it,i)=><option key={i} value={i}>{it.emoji} {it.name} - ${it.base} new</option>)}</select>
        <label className="block text-xs font-bold mt-3">CONDITION</label>
        <div className="grid grid-cols-4 gap-2 mt-1">{(["likeNew","good","fair","needsRepair"] as const).map(c=><button key={c} onClick={()=>setCond(c)} className={`py-2 rounded-xl text-xs font-bold border ${cond===c?"bg-emerald-600 text-white":"bg-white"}`}>{c==="likeNew"?"Like New":c==="good"?"Good":c==="fair"?"Fair":"Needs Repair"}</button>)}</div>
        <div className="bg-emerald-50 rounded-2xl p-4 mt-4">
          <div className="flex justify-between items-center"><span className="text-2xl font-extrabold">${est.low} - ${est.high}</span><span className="bg-emerald-600 text-white px-3 py-1 rounded-full text-sm font-bold">{action}</span></div>
          <p className="text-sm text-emerald-900 mt-1">Good demand in {st.name}. List it now.</p>
          <p className="text-xs text-gray-600 mt-2">Profit after 5% fee: <b>${est.profit}</b> | Fix cost: ${est.fixCost} | Tax in {st.name}: {st.tax}% | Cities: {st.cities.join(", ")}</p>
          <Link href="/marketplace" className="block text-center bg-emerald-600 text-white py-3 rounded-xl font-bold mt-3">List It Now →</Link>
        </div>
        <p className="text-[11px] text-center text-gray-400 mt-2">Pages: /scan /marketplace /earnings /pro /auth - Full code in lib/states.ts + lib/pricing.ts</p>
      </div>
    </section>
    <section className="max-w-6xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-extrabold text-center">How it works</h2>
      <div className="grid md:grid-cols-3 gap-4 mt-6">
        {[["📸","1. Snap a photo","Take a photo of your old item. AI identifies it."],["💲","2. Get AI price","We check your state + condition and give you a real price."],["💰","3. Sell / Fix / Donate","Sell it locally, fix it cheap, or donate it."]].map(([e,t,d])=><div key={t as string} className="bg-white p-6 rounded-2xl shadow"><div className="text-3xl">{e}</div><h3 className="font-bold mt-2">{t}</h3><p className="text-sm text-gray-600">{d}</p></div>)}
      </div>
    </section>
    <section className="max-w-6xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-extrabold">🔥 Trending near you</h2>
      <div className="grid md:grid-cols-3 gap-4 mt-4">
        {[["🛋️","Gray 3-Seat Sofa","$380","Houston, TX","Like New"],["📱","iPhone 13 128GB","$410","Dallas, TX","Good"],["🎮","PS5 Disc Edition","$350","Austin, TX","Good"]].map(([e,t,p,c,co])=><div key={t as string} className="bg-white rounded-2xl overflow-hidden shadow"><div className="h-32 bg-emerald-50 flex items-center justify-center text-6xl">{e}</div><div className="p-4"><h3 className="font-bold">{t}</h3><p className="text-sm text-gray-500">{c} • {co}</p><p className="font-extrabold text-emerald-700 mt-1">{p}</p></div></div>)}
      </div>
    </section>
    <footer className="text-center text-sm text-gray-400 py-8">ReHome © 2026 - Don&apos;t throw it. ReHome it. ♻️</footer>
  </main>)
}
