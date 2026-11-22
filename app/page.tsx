'use client'

import { useState } from 'react'
import type { CSSProperties } from 'react'
import Link from 'next/link'
import SiteHeader from '../components/SiteHeader'
import SiteFooter from '../components/SiteFooter'
import { ITEMS, CONDITION_OPTIONS, estimatePrice, getVerdict } from '../lib/pricing'
import type { Verdict } from '../lib/pricing'
import { STATES, getStateMultiplier } from '../lib/states'
import { C, FONT, container, card } from '../lib/theme'

type CondKey = (typeof CONDITION_OPTIONS)[number]['key']

type QuickResult = {
  low: number
  high: number
  profit: number
  verdict: Verdict
}

const VERDICT_STYLE: Record<Verdict, { bg: string; fg: string; emoji: string; label: string }> = {
  SELL: { bg: '#E8F9EE', fg: '#047A30', emoji: '💰', label: 'Sell it' },
  FIX: { bg: '#FFF4D6', fg: '#8A6100', emoji: '🛠️', label: 'Fix it first' },
  DONATE: { bg: '#E6F0FF', fg: '#1D4ED8', emoji: '🎁', label: 'Donate it' },
}

const STEPS = [
  {
    emoji: '📸',
    title: 'Scan it',
    text: 'Add a photo, pick the item and its condition, and get an instant estimate for your state.',
  },
  {
    emoji: '🏷️',
    title: 'List it',
    text: 'Publish your item to the marketplace in under a minute. Simple and free to start.',
  },
  {
    emoji: '💸',
    title: 'Get paid',
    text: 'Buyers across the US and Europe find your item. Track everything on your earnings page.',
  },
]

const PATHS = [
  {
    emoji: '💰',
    title: 'Sell',
    text: 'Turn things you no longer use into cash. Get a fair price based on condition and location.',
    cta: 'Start selling',
    href: '/scan',
  },
  {
    emoji: '🛠️',
    title: 'Fix',
    text: 'Small repair, big difference. We tell you when fixing first can unlock a better price.',
    cta: 'Check my item',
    href: '/scan',
  },
  {
    emoji: '🎁',
    title: 'Donate',
    text: 'Not worth selling? Give it to someone who needs it instead of sending it to the landfill.',
    cta: 'Browse the marketplace',
    href: '/marketplace',
  },
]

const CATEGORY_CHIPS = [
  { emoji: '🛋️', label: 'Furniture' },
  { emoji: '📱', label: 'Electronics' },
  { emoji: '🧺', label: 'Appliances' },
  { emoji: '🚲', label: 'Sports' },
  { emoji: '👟', label: 'Apparel' },
]

const LATEST = [
  { id: 1, title: 'Gray 3-Seat Sofa', price: 380, city: 'Houston, TX', cond: 'Like New', emoji: '🛋️', tint: '#E8F9EE' },
  { id: 2, title: 'iPhone 13 128GB', price: 410, city: 'Dallas, TX', cond: 'Good', emoji: '📱', tint: '#E6F0FF' },
  { id: 3, title: 'Stainless Fridge', price: 720, city: 'New York City, NY', cond: 'Good', emoji: '🧊', tint: '#FFF1E0' },
  { id: 4, title: 'Trek Mountain Bike', price: 320, city: 'Denver, CO', cond: 'Good', emoji: '🚲', tint: '#E3F7F7' },
]

const COND_BADGE: Record<string, { bg: string; fg: string }> = {
  'Like New': { bg: '#E8F9EE', fg: '#047A30' },
  Good: { bg: '#E6F0FF', fg: '#1D4ED8' },
  Fair: { bg: '#FFF4D6', fg: '#8A6100' },
}

const whiteButton: CSSProperties = {
  display: 'inline-block',
  padding: '14px 28px',
  fontSize: '16px',
  fontWeight: 700,
  color: C.greenDeep,
  backgroundColor: C.white,
  borderRadius: '999px',
  textDecoration: 'none',
  boxSizing: 'border-box',
  fontFamily: FONT,
}

const ghostButton: CSSProperties = {
  display: 'inline-block',
  padding: '12px 26px',
  fontSize: '16px',
  fontWeight: 700,
  color: C.white,
  backgroundColor: 'transparent',
  border: '2px solid rgba(255,255,255,0.7)',
  borderRadius: '999px',
  textDecoration: 'none',
  boxSizing: 'border-box',
  fontFamily: FONT,
}

const fieldStyle: CSSProperties = {
  width: '100%',
  padding: '12px 14px',
  fontSize: '15px',
  color: C.text,
  backgroundColor: C.white,
  border: `1.5px solid ${C.border}`,
  borderRadius: '12px',
  outline: 'none',
  boxSizing: 'border-box',
  fontFamily: FONT,
}

const fieldLabel: CSSProperties = {
  display: 'block',
  fontSize: '13px',
  fontWeight: 700,
  color: C.muted,
  marginBottom: '6px',
}

function money(n: number): string {
  return '$' + n.toLocaleString('en-US')
}

export default function HomePage() {
  const [itemName, setItemName] = useState<string>(ITEMS[0].name)
  const [stateCode, setStateCode] = useState('TX')
  const [condKey, setCondKey] = useState<CondKey>('good')
  const [result, setResult] = useState<QuickResult | null>(null)

  function handleEstimate() {
    const found = ITEMS.find((i) => i.name === itemName)
    const base = found ? found.base : 0
    const est = estimatePrice(base, condKey, getStateMultiplier(stateCode))
    const v = getVerdict(est, base)
    setResult({ low: est.low, high: est.high, profit: est.profit, verdict: v.verdict })
  }

  const vStyle = result ? VERDICT_STYLE[result.verdict] : null

  return (
    <div style={{ fontFamily: FONT, backgroundColor: C.bg, color: C.text, minHeight: '100vh' }}>
      <SiteHeader />

      {/* HERO */}
      <section
        style={{
          background: `linear-gradient(135deg, ${C.green} 0%, ${C.greenDark} 55%, ${C.greenDeep} 100%)`,
          color: C.white,
        }}
      >
        <div
          style={{
            ...container,
            paddingTop: '64px',
            paddingBottom: '72px',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            gap: '48px',
          }}
        >
          <div style={{ flex: '1 1 400px' }}>
            <div
              style={{
                display: 'inline-block',
                backgroundColor: 'rgba(255,255,255,0.18)',
                padding: '7px 16px',
                borderRadius: '999px',
                fontSize: '14px',
                fontWeight: 600,
                marginBottom: '22px',
              }}
            >
              ♻️ Pre-loved items for the US and Europe
            </div>
            <h1
              style={{
                margin: '0 0 18px 0',
                fontSize: 'clamp(38px, 6vw, 64px)',
                fontWeight: 800,
                lineHeight: 1.05,
                letterSpacing: '-1.5px',
              }}
            >
              {"Don't throw it."}
              <br />
              ReHome it.
            </h1>
            <p
              style={{
                margin: '0 0 32px 0',
                fontSize: '19px',
                lineHeight: 1.55,
                opacity: 0.95,
                maxWidth: '520px',
              }}
            >
              Find out what your old stuff is worth in seconds, then sell it, fix it, or donate it.
              Simple, local, and good for the planet.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '14px' }}>
              <Link href="/scan" style={whiteButton}>
                Start selling
              </Link>
              <Link href="/marketplace" style={ghostButton}>
                Browse marketplace
              </Link>
            </div>
          </div>

          {/* QUICK ESTIMATOR */}
          <div
            style={{
              flex: '1 1 340px',
              backgroundColor: C.white,
              color: C.text,
              borderRadius: '24px',
              padding: '26px',
              boxShadow: '0 20px 50px rgba(0,0,0,0.2)',
              boxSizing: 'border-box',
            }}
          >
            <div style={{ fontSize: '20px', fontWeight: 800, marginBottom: '4px' }}>
              Instant price estimate
            </div>
            <div style={{ fontSize: '14px', color: C.muted, marginBottom: '18px' }}>
              Pick your item, state, and condition.
            </div>

            <label htmlFor="home-item" style={fieldLabel}>
              Item
            </label>
            <select
              id="home-item"
              value={itemName}
              onChange={(e) => {
                setItemName(e.target.value)
                setResult(null)
              }}
              style={{ ...fieldStyle, marginBottom: '14px' }}
            >
              {ITEMS.map((i) => (
                <option key={i.name} value={i.name}>
                  {i.emoji} {i.name}
                </option>
              ))}
            </select>

            <label htmlFor="home-state" style={fieldLabel}>
              State
            </label>
            <select
              id="home-state"
              value={stateCode}
              onChange={(e) => {
                setStateCode(e.target.value)
                setResult(null)
              }}
              style={{ ...fieldStyle, marginBottom: '14px' }}
            >
              {STATES.map((s) => (
                <option key={s.code} value={s.code}>
                  {s.name}
                </option>
              ))}
            </select>

            <span style={fieldLabel}>Condition</span>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '18px' }}>
              {CONDITION_OPTIONS.map((c) => {
                const active = condKey === c.key
                return (
                  <button
                    key={c.key}
                    type="button"
                    onClick={() => {
                      setCondKey(c.key)
                      setResult(null)
                    }}
                    style={{
                      padding: '9px 14px',
                      fontSize: '13px',
                      fontWeight: 700,
                      borderRadius: '999px',
                      cursor: 'pointer',
                      border: `1.5px solid ${active ? C.green : C.border}`,
                      backgroundColor: active ? C.green : C.white,
                      color: active ? C.white : C.text,
                      fontFamily: FONT,
                    }}
                  >
                    {c.label}
                  </button>
                )
              })}
            </div>

            <button
              type="button"
              onClick={handleEstimate}
              style={{
                width: '100%',
                padding: '15px 20px',
                fontSize: '16px',
                fontWeight: 800,
                color: C.white,
                backgroundColor: C.green,
                border: 'none',
                borderRadius: '14px',
                cursor: 'pointer',
                boxSizing: 'border-box',
                fontFamily: FONT,
              }}
            >
              Get estimated price
            </button>

            {result && vStyle && (
              <div
                style={{
                  marginTop: '18px',
                  padding: '18px',
                  backgroundColor: C.bg,
                  borderRadius: '16px',
                  textAlign: 'center',
                }}
              >
                <div style={{ fontSize: '12px', fontWeight: 700, color: C.muted, marginBottom: '4px' }}>
                  ESTIMATED RESALE PRICE
                </div>
                <div
                  style={{
                    fontSize: '30px',
                    fontWeight: 800,
                    color: C.greenDark,
                    letterSpacing: '-1px',
                  }}
                >
                  {money(result.low)} to {money(result.high)}
                </div>
                <div style={{ fontSize: '13px', color: C.muted, margin: '6px 0 12px 0' }}>
                  About {money(result.profit)} net after the 5% platform fee
                </div>
                <span
                  style={{
                    display: 'inline-block',
                    backgroundColor: vStyle.bg,
                    color: vStyle.fg,
                    padding: '7px 16px',
                    borderRadius: '999px',
                    fontSize: '14px',
                    fontWeight: 800,
                  }}
                >
                  {vStyle.emoji} {vStyle.label}
                </span>
                <div style={{ marginTop: '12px' }}>
                  <Link
                    href="/scan"
                    style={{
                      color: C.greenDark,
                      fontWeight: 700,
                      fontSize: '14px',
                      textDecoration: 'none',
                    }}
                  >
                    Add a photo and list it →
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section style={{ ...container, paddingTop: '48px' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', justifyContent: 'center' }}>
          {CATEGORY_CHIPS.map((c) => (
            <Link
              key={c.label}
              href="/marketplace"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '12px 20px',
                backgroundColor: C.white,
                border: `1px solid ${C.border}`,
                borderRadius: '999px',
                fontSize: '15px',
                fontWeight: 600,
                color: C.text,
                textDecoration: 'none',
              }}
            >
              <span style={{ fontSize: '20px' }}>{c.emoji}</span>
              {c.label}
            </Link>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section style={{ ...container, paddingTop: '72px' }}>
        <div style={{ textAlign: 'center', marginBottom: '36px' }}>
          <h2 style={{ margin: '0 0 10px 0', fontSize: '34px', fontWeight: 800, letterSpacing: '-0.8px' }}>
            How it works
          </h2>
          <p style={{ margin: 0, fontSize: '17px', color: C.muted }}>
            From your home to someone else&apos;s in three simple steps.
          </p>
        </div>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '24px',
          }}
        >
          {STEPS.map((s, i) => (
            <div key={s.title} style={{ ...card, padding: '32px 28px' }}>
              <div
                style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '18px',
                  backgroundColor: C.greenSoft,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '32px',
                  marginBottom: '18px',
                }}
              >
                {s.emoji}
              </div>
              <div style={{ fontSize: '13px', fontWeight: 700, color: C.green, marginBottom: '6px' }}>
                STEP {i + 1}
              </div>
              <div style={{ fontSize: '22px', fontWeight: 800, marginBottom: '8px' }}>{s.title}</div>
              <p style={{ margin: 0, fontSize: '15px', color: C.muted, lineHeight: 1.6 }}>{s.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* LATEST ITEMS */}
      <section style={{ ...container, paddingTop: '72px' }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '12px',
            marginBottom: '28px',
          }}
        >
          <div>
            <h2 style={{ margin: '0 0 6px 0', fontSize: '34px', fontWeight: 800, letterSpacing: '-0.8px' }}>
              Latest items
            </h2>
            <p style={{ margin: 0, fontSize: '16px', color: C.muted }}>Fresh from sellers near you.</p>
          </div>
          <Link
            href="/marketplace"
            style={{ color: C.greenDark, fontWeight: 700, fontSize: '15px', textDecoration: 'none' }}
          >
            View all →
          </Link>
        </div>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
            gap: '22px',
          }}
        >
          {LATEST.map((it) => {
            const badge = COND_BADGE[it.cond] ?? COND_BADGE.Good
            return (
              <Link
                key={it.id}
                href="/marketplace"
                style={{
                  display: 'block',
                  backgroundColor: C.white,
                  borderRadius: '18px',
                  border: `1px solid ${C.border}`,
                  overflow: 'hidden',
                  boxShadow: '0 2px 14px rgba(0,0,0,0.04)',
                  textDecoration: 'none',
                  color: C.text,
                  boxSizing: 'border-box',
                }}
              >
                <div
                  style={{
                    height: '160px',
                    backgroundColor: it.tint,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '60px',
                    position: 'relative',
                  }}
                >
                  {it.emoji}
                  <span
                    style={{
                      position: 'absolute',
                      top: '12px',
                      left: '12px',
                      backgroundColor: badge.bg,
                      color: badge.fg,
                      fontSize: '12px',
                      fontWeight: 700,
                      padding: '5px 10px',
                      borderRadius: '999px',
                    }}
                  >
                    {it.cond}
                  </span>
                </div>
                <div style={{ padding: '16px 18px 18px 18px' }}>
                  <div style={{ fontSize: '16px', fontWeight: 700, marginBottom: '6px' }}>{it.title}</div>
                  <div style={{ fontSize: '13px', color: C.muted, marginBottom: '12px' }}>📍 {it.city}</div>
                  <div style={{ fontSize: '22px', fontWeight: 800 }}>{money(it.price)}</div>
                </div>
              </Link>
            )
          })}
        </div>
      </section>

      {/* SELL / FIX / DONATE */}
      <section style={{ ...container, paddingTop: '72px' }}>
        <div style={{ textAlign: 'center', marginBottom: '36px' }}>
          <h2 style={{ margin: '0 0 10px 0', fontSize: '34px', fontWeight: 800, letterSpacing: '-0.8px' }}>
            Sell. Fix. Donate.
          </h2>
          <p style={{ margin: 0, fontSize: '17px', color: C.muted }}>
            Every item has a next chapter. Pick yours.
          </p>
        </div>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '24px',
          }}
        >
          {PATHS.map((p) => (
            <div key={p.title} style={{ ...card, padding: '32px 28px' }}>
              <div style={{ fontSize: '44px', marginBottom: '12px' }}>{p.emoji}</div>
              <div style={{ fontSize: '24px', fontWeight: 800, marginBottom: '8px' }}>{p.title}</div>
              <p style={{ margin: '0 0 20px 0', fontSize: '15px', color: C.muted, lineHeight: 1.6 }}>
                {p.text}
              </p>
              <Link
                href={p.href}
                style={{ color: C.greenDark, fontWeight: 700, fontSize: '15px', textDecoration: 'none' }}
              >
                {p.cta} →
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* CTA BANNER */}
      <section style={{ ...container, paddingTop: '72px', paddingBottom: '80px' }}>
        <div
          style={{
            background: `linear-gradient(135deg, ${C.green}, ${C.greenDeep})`,
            borderRadius: '28px',
            padding: '56px 32px',
            textAlign: 'center',
            color: C.white,
          }}
        >
          <h2
            style={{
              margin: '0 0 12px 0',
              fontSize: 'clamp(28px, 4vw, 40px)',
              fontWeight: 800,
              letterSpacing: '-1px',
            }}
          >
            Got something sitting in a closet?
          </h2>
          <p style={{ margin: '0 0 28px 0', fontSize: '18px', opacity: 0.95 }}>
            Find out what it&apos;s worth in seconds.
          </p>
          <Link href="/scan" style={whiteButton}>
            Scan an item
          </Link>
        </div>
      </section>

      <SiteFooter />
    </div>
  )
}
