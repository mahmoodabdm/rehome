'use client'

import { useMemo, useState } from 'react'
import type { CSSProperties } from 'react'
import SiteHeader from '../../components/SiteHeader'
import SiteFooter from '../../components/SiteFooter'
import { CONDITION_OPTIONS } from '../../lib/pricing'
import { STATES } from '../../lib/states'
import { C, FONT, container, card } from '../../lib/theme'

type Listing = {
  id: number
  title: string
  price: number
  city: string
  state: string
  cat: string
  cond: string
  emoji: string
}

const LISTINGS: Listing[] = [
  { id: 1, title: 'Gray 3-Seat Sofa', price: 380, city: 'Houston, TX', state: 'TX', cat: 'Furniture', cond: 'Like New', emoji: '🛋️' },
  { id: 2, title: 'iPhone 13 128GB', price: 410, city: 'Dallas, TX', state: 'TX', cat: 'Electronics', cond: 'Good', emoji: '📱' },
  { id: 3, title: 'PS5 Disc Edition', price: 350, city: 'Austin, TX', state: 'TX', cat: 'Electronics', cond: 'Good', emoji: '🎮' },
  { id: 4, title: 'Stainless Fridge', price: 720, city: 'New York City, NY', state: 'NY', cat: 'Appliances', cond: 'Good', emoji: '🧊' },
  { id: 5, title: 'Front-Load Washer', price: 480, city: 'Los Angeles, CA', state: 'CA', cat: 'Appliances', cond: 'Fair', emoji: '🧺' },
  { id: 6, title: 'Trek Mountain Bike', price: 320, city: 'Denver, CO', state: 'CO', cat: 'Sports', cond: 'Good', emoji: '🚲' },
  { id: 7, title: 'Oak Dining Table', price: 300, city: 'Chicago, IL', state: 'IL', cat: 'Furniture', cond: 'Like New', emoji: '🪑' },
  { id: 8, title: 'MacBook Pro 14', price: 780, city: 'Seattle, WA', state: 'WA', cat: 'Electronics', cond: 'Like New', emoji: '💻' },
  { id: 9, title: '55" 4K TV', price: 400, city: 'Miami, FL', state: 'FL', cat: 'Electronics', cond: 'Good', emoji: '📺' },
]

const CATEGORIES = ['All', 'Furniture', 'Electronics', 'Appliances', 'Sports']

const CATEGORY_TINT: Record<string, string> = {
  Furniture: '#E8F9EE',
  Electronics: '#E6F0FF',
  Appliances: '#FFF1E0',
  Sports: '#E3F7F7',
}

const COND_BADGE: Record<string, { bg: string; fg: string }> = {
  'Like New': { bg: '#E8F9EE', fg: '#047A30' },
  Good: { bg: '#E6F0FF', fg: '#1D4ED8' },
  Fair: { bg: '#FFF4D6', fg: '#8A6100' },
  'Needs Repair': { bg: '#FEE9E9', fg: '#B91C1C' },
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

const labelStyle: CSSProperties = {
  display: 'block',
  fontSize: '13px',
  fontWeight: 700,
  color: C.muted,
  marginBottom: '6px',
}

export default function Marketplace() {
  const [search, setSearch] = useState('')
  const [cat, setCat] = useState('All')
  const [stateCode, setStateCode] = useState('All')
  const [cond, setCond] = useState('All')
  const [sort, setSort] = useState('newest')

  const results = useMemo(() => {
    const q = search.trim().toLowerCase()
    let list = LISTINGS.filter((it) => {
      if (q && !it.title.toLowerCase().includes(q)) return false
      if (cat !== 'All' && it.cat !== cat) return false
      if (stateCode !== 'All' && it.state !== stateCode) return false
      if (cond !== 'All' && it.cond !== cond) return false
      return true
    })
    if (sort === 'low') list = [...list].sort((a, b) => a.price - b.price)
    else if (sort === 'high') list = [...list].sort((a, b) => b.price - a.price)
    else list = [...list].sort((a, b) => b.id - a.id)
    return list
  }, [search, cat, stateCode, cond, sort])

  function resetFilters() {
    setSearch('')
    setCat('All')
    setStateCode('All')
    setCond('All')
    setSort('newest')
  }

  return (
    <div style={{ fontFamily: FONT, backgroundColor: C.bg, color: C.text, minHeight: '100vh' }}>
      <SiteHeader />

      <div style={{ ...container, paddingTop: '40px', paddingBottom: '64px' }}>
        <h1 style={{ margin: '0 0 8px 0', fontSize: '36px', fontWeight: 800, letterSpacing: '-1px' }}>
          Marketplace
        </h1>
        <p style={{ margin: '0 0 28px 0', fontSize: '17px', color: C.muted }}>
          Pre-loved items from sellers near you. Everything here is ReHomed, not thrown away.
        </p>

        <div style={{ ...card, padding: '22px', marginBottom: '24px' }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '16px',
            }}
          >
            <div>
              <label htmlFor="search" style={labelStyle}>
                Search
              </label>
              <input
                id="search"
                type="text"
                placeholder="Sofa, iPhone, PS5..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={fieldStyle}
              />
            </div>
            <div>
              <label htmlFor="state" style={labelStyle}>
                State
              </label>
              <select
                id="state"
                value={stateCode}
                onChange={(e) => setStateCode(e.target.value)}
                style={fieldStyle}
              >
                <option value="All">All states</option>
                {STATES.map((s) => (
                  <option key={s.code} value={s.code}>
                    {s.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="condition" style={labelStyle}>
                Condition
              </label>
              <select
                id="condition"
                value={cond}
                onChange={(e) => setCond(e.target.value)}
                style={fieldStyle}
              >
                <option value="All">Any condition</option>
                {CONDITION_OPTIONS.map((c) => (
                  <option key={c.key} value={c.label}>
                    {c.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="sort" style={labelStyle}>
                Sort by
              </label>
              <select
                id="sort"
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                style={fieldStyle}
              >
                <option value="newest">Newest</option>
                <option value="low">Price: low to high</option>
                <option value="high">Price: high to low</option>
              </select>
            </div>
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginTop: '20px' }}>
            {CATEGORIES.map((c) => {
              const active = cat === c
              return (
                <button
                  key={c}
                  type="button"
                  onClick={() => setCat(c)}
                  style={{
                    padding: '9px 18px',
                    fontSize: '14px',
                    fontWeight: 700,
                    borderRadius: '999px',
                    cursor: 'pointer',
                    border: `1.5px solid ${active ? C.green : C.border}`,
                    backgroundColor: active ? C.green : C.white,
                    color: active ? C.white : C.text,
                    fontFamily: FONT,
                  }}
                >
                  {c}
                </button>
              )
            })}
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '18px',
          }}
        >
          <span style={{ fontSize: '15px', color: C.muted, fontWeight: 600 }}>
            {results.length} {results.length === 1 ? 'item' : 'items'} found
          </span>
          <button
            type="button"
            onClick={resetFilters}
            style={{
              background: 'none',
              border: 'none',
              color: C.greenDark,
              fontSize: '14px',
              fontWeight: 700,
              cursor: 'pointer',
              fontFamily: FONT,
            }}
          >
            Reset filters
          </button>
        </div>

        {results.length === 0 ? (
          <div style={{ ...card, padding: '56px 24px', textAlign: 'center' }}>
            <div style={{ fontSize: '48px', marginBottom: '12px' }}>🔍</div>
            <div style={{ fontSize: '20px', fontWeight: 800, marginBottom: '6px' }}>No items found</div>
            <p style={{ margin: 0, color: C.muted, fontSize: '15px' }}>
              Try a different search, state, or condition.
            </p>
          </div>
        ) : (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
              gap: '22px',
            }}
          >
            {results.map((it) => {
              const badge = COND_BADGE[it.cond] ?? COND_BADGE.Good
              return (
                <div
                  key={it.id}
                  style={{
                    backgroundColor: C.white,
                    borderRadius: '18px',
                    border: `1px solid ${C.border}`,
                    overflow: 'hidden',
                    boxShadow: '0 2px 14px rgba(0,0,0,0.04)',
                    boxSizing: 'border-box',
                  }}
                >
                  <div
                    style={{
                      height: '170px',
                      backgroundColor: CATEGORY_TINT[it.cat] ?? C.greenSoft,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '64px',
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
                    <div style={{ fontSize: '13px', color: C.muted, marginBottom: '4px' }}>{it.cat}</div>
                    <div
                      style={{
                        fontSize: '16px',
                        fontWeight: 700,
                        lineHeight: 1.3,
                        marginBottom: '6px',
                        minHeight: '42px',
                      }}
                    >
                      {it.title}
                    </div>
                    <div style={{ fontSize: '13px', color: C.muted, marginBottom: '14px' }}>
                      📍 {it.city}
                    </div>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: '8px',
                      }}
                    >
                      <span style={{ fontSize: '24px', fontWeight: 800 }}>${it.price}</span>
                      <button
                        type="button"
                        style={{
                          backgroundColor: C.green,
                          color: C.white,
                          border: 'none',
                          padding: '10px 18px',
                          borderRadius: '999px',
                          fontWeight: 700,
                          fontSize: '14px',
                          cursor: 'pointer',
                          fontFamily: FONT,
                        }}
                      >
                        View
                      </button>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>

      <SiteFooter />
    </div>
  )
}
