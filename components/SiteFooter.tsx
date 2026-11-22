import type { CSSProperties } from 'react'
import Link from 'next/link'
import { C, FONT } from '../lib/theme'

const colTitle: CSSProperties = {
  fontSize: '14px',
  fontWeight: 700,
  color: C.text,
  margin: '0 0 12px 0',
}

const colLink: CSSProperties = {
  display: 'block',
  fontSize: '14px',
  color: C.muted,
  textDecoration: 'none',
  marginBottom: '8px',
}

export default function SiteFooter() {
  return (
    <footer
      style={{
        backgroundColor: C.white,
        borderTop: `1px solid ${C.border}`,
        fontFamily: FONT,
      }}
    >
      <div
        style={{
          maxWidth: '1160px',
          margin: '0 auto',
          padding: '48px 24px 32px 24px',
          display: 'flex',
          flexWrap: 'wrap',
          gap: '40px',
          justifyContent: 'space-between',
          boxSizing: 'border-box',
        }}
      >
        <div style={{ maxWidth: '320px' }}>
          <div style={{ fontSize: '22px', fontWeight: 800, color: C.text, marginBottom: '10px' }}>
            <span style={{ color: C.green }}>Re</span>Home
          </div>
          <p style={{ fontSize: '14px', color: C.muted, lineHeight: 1.6, margin: 0 }}>
            {"Don't throw it. ReHome it. Buy and sell pre-loved items across the US and Europe."}
          </p>
        </div>

        <div>
          <p style={colTitle}>Explore</p>
          <Link href="/marketplace" style={colLink}>
            Marketplace
          </Link>
          <Link href="/scan" style={colLink}>
            Scan and sell
          </Link>
          <Link href="/earnings" style={colLink}>
            Earnings
          </Link>
          <Link href="/pro" style={colLink}>
            ReHome Pro
          </Link>
        </div>

        <div>
          <p style={colTitle}>Account</p>
          <Link href="/auth" style={colLink}>
            Sign in
          </Link>
        </div>
      </div>

      <div
        style={{
          borderTop: `1px solid ${C.border}`,
          padding: '18px 24px',
          textAlign: 'center',
          fontSize: '13px',
          color: C.muted,
        }}
      >
        © 2026 ReHome. All rights reserved.
      </div>
    </footer>
  )
}
