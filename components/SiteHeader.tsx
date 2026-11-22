'use client'

import Link from 'next/link'

const GREEN = '#00C853'

export default function SiteHeader() {
  return (
    <header style={{ backgroundColor: '#FFFFFF', borderBottom: '1px solid #E5E7EB', position: 'sticky', top: 0, zIndex: 50 }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '14px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px' }}>
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}>
          <span style={{ width: '36px', height: '36px', borderRadius: '10px', backgroundColor: GREEN, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '20px', fontWeight: 800 }}>R</span>
          <span style={{ fontSize: '20px', fontWeight: 800, color: '#111111' }}>ReHome</span>
        </Link>
        <nav style={{ display: 'flex', alignItems: 'center', gap: '18px', fontSize: '14px', fontWeight: 600 }}>
          <Link href="/marketplace" style={{ color: '#374151', textDecoration: 'none' }}>Marketplace</Link>
          <Link href="/scan" style={{ color: '#374151', textDecoration: 'none' }}>Scan</Link>
          <Link href="/earnings" style={{ color: '#374151', textDecoration: 'none' }}>Earnings</Link>
          <Link href="/pro" style={{ color: '#374151', textDecoration: 'none' }}>Pro</Link>
          <Link href="/auth" style={{ backgroundColor: GREEN, color: '#fff', padding: '9px 16px', borderRadius: '10px', textDecoration: 'none' }}>Sign in</Link>
        </nav>
      </div>
    </header>
  )
}
