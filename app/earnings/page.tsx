import Link from 'next/link'
import SiteHeader from '../../components/SiteHeader'
import SiteFooter from '../../components/SiteFooter'
import { C, FONT, container, card } from '../../lib/theme'

// Sample data until real sales are connected to a database.
const MONTHLY = [
  { month: 'Jun', amount: 120 },
  { month: 'Jul', amount: 260 },
  { month: 'Aug', amount: 190 },
  { month: 'Sep', amount: 340 },
  { month: 'Oct', amount: 410 },
  { month: 'Nov', amount: 520 },
]

// co2 = illustrative kg of CO2 avoided by reusing instead of buying new.
const RECENT = [
  { item: 'Gray 3-Seat Sofa', date: 'Nov 18', amount: 380, status: 'Paid', co2: 90 },
  { item: 'iPhone 13 128GB', date: 'Nov 15', amount: 410, status: 'Paid', co2: 60 },
  { item: 'Trek Mountain Bike', date: 'Nov 11', amount: 320, status: 'Pending', co2: 110 },
  { item: 'Oak Dining Table', date: 'Nov 04', amount: 300, status: 'Paid', co2: 75 },
  { item: 'Nike Air Sneakers', date: 'Oct 29', amount: 70, status: 'Paid', co2: 14 },
]

function money(n: number): string {
  return '$' + n.toLocaleString('en-US')
}

export default function EarningsPage() {
  const total = MONTHLY.reduce((sum, m) => sum + m.amount, 0)
  const maxMonth = Math.max(...MONTHLY.map((m) => m.amount))
  const thisMonth = MONTHLY[MONTHLY.length - 1].amount
  const pending = RECENT.filter((r) => r.status === 'Pending').reduce((s, r) => s + r.amount, 0)
  const co2Total = RECENT.reduce((s, r) => s + r.co2, 0)

  const stats = [
    { label: 'Total earned', value: money(total), emoji: '💰' },
    { label: 'This month', value: money(thisMonth), emoji: '📈' },
    { label: 'Pending payout', value: money(pending), emoji: '⏳' },
    { label: 'Items sold', value: String(RECENT.length), emoji: '📦' },
  ]

  return (
    <div style={{ fontFamily: FONT, backgroundColor: C.bg, color: C.text, minHeight: '100vh' }}>
      <SiteHeader />

      <div style={{ ...container, paddingTop: '40px', paddingBottom: '64px' }}>
        <h1 style={{ margin: '0 0 8px 0', fontSize: '36px', fontWeight: 800, letterSpacing: '-1px' }}>
          Your earnings
        </h1>
        <p style={{ margin: '0 0 14px 0', fontSize: '17px', color: C.muted }}>
          See what your pre-loved items earn you and the planet.
        </p>

        <div
          style={{
            backgroundColor: '#FFF8E1',
            border: '1px solid #FFE08A',
            color: '#8A6100',
            fontSize: '13px',
            padding: '10px 14px',
            borderRadius: '12px',
            marginBottom: '28px',
            display: 'inline-block',
          }}
        >
          Sample data. Your real sales and CO2 numbers will appear here once your listings go live.
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))',
            gap: '20px',
            marginBottom: '28px',
          }}
        >
          {stats.map((s) => (
            <div key={s.label} style={{ ...card, padding: '24px' }}>
              <div style={{ fontSize: '28px', marginBottom: '10px' }}>{s.emoji}</div>
              <div style={{ fontSize: '14px', color: C.muted, fontWeight: 600, marginBottom: '4px' }}>
                {s.label}
              </div>
              <div style={{ fontSize: '30px', fontWeight: 800, letterSpacing: '-1px' }}>{s.value}</div>
            </div>
          ))}
        </div>

        {/* CO2 BANNER */}
        <div
          style={{
            background: `linear-gradient(135deg, ${C.green}, ${C.greenDeep})`,
            color: C.white,
            borderRadius: '24px',
            padding: '28px 32px',
            marginBottom: '28px',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '20px',
          }}
        >
          <div>
            <div style={{ fontSize: '14px', fontWeight: 700, opacity: 0.9, marginBottom: '6px' }}>
              🌍 CO2 SAVED BY REUSING
            </div>
            <div style={{ fontSize: '44px', fontWeight: 800, letterSpacing: '-1.5px', lineHeight: 1.1 }}>
              {co2Total} kg
            </div>
            <div style={{ fontSize: '14px', opacity: 0.9, marginTop: '6px' }}>
              Illustrative estimate based on the items below
            </div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '34px', fontWeight: 800 }}>{RECENT.length}</div>
            <div style={{ fontSize: '14px', opacity: 0.9 }}>items kept out of the landfill</div>
          </div>
        </div>

        {/* CHART */}
        <div style={{ ...card, padding: '28px', marginBottom: '28px' }}>
          <div style={{ fontSize: '18px', fontWeight: 800, marginBottom: '24px' }}>Monthly earnings</div>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: '16px', height: '210px' }}>
            {MONTHLY.map((m) => (
              <div
                key={m.month}
                style={{
                  flex: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'flex-end',
                  height: '100%',
                }}
              >
                <div style={{ fontSize: '13px', fontWeight: 700, marginBottom: '6px' }}>{money(m.amount)}</div>
                <div
                  style={{
                    width: '100%',
                    maxWidth: '56px',
                    height: `${Math.round((m.amount / maxMonth) * 140)}px`,
                    backgroundColor: C.green,
                    borderRadius: '10px 10px 4px 4px',
                  }}
                />
                <div style={{ fontSize: '13px', color: C.muted, marginTop: '8px' }}>{m.month}</div>
              </div>
            ))}
          </div>
        </div>

        {/* RECENT SALES */}
        <div style={{ ...card, padding: '28px', marginBottom: '28px' }}>
          <div style={{ fontSize: '18px', fontWeight: 800, marginBottom: '8px' }}>Recent sales</div>
          {RECENT.map((r, i) => (
            <div
              key={r.item}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '8px',
                padding: '16px 0',
                borderTop: i === 0 ? 'none' : `1px solid ${C.border}`,
              }}
            >
              <div>
                <div style={{ fontSize: '15px', fontWeight: 700 }}>{r.item}</div>
                <div style={{ fontSize: '13px', color: C.muted }}>
                  {r.date} · {r.co2} kg CO2 saved
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <span
                  style={{
                    fontSize: '12px',
                    fontWeight: 700,
                    padding: '5px 12px',
                    borderRadius: '999px',
                    backgroundColor: r.status === 'Paid' ? C.greenSoft : '#FFF4D6',
                    color: r.status === 'Paid' ? '#047A30' : '#8A6100',
                  }}
                >
                  {r.status}
                </span>
                <span style={{ fontSize: '17px', fontWeight: 800 }}>{money(r.amount)}</span>
              </div>
            </div>
          ))}
        </div>

        <div style={{ textAlign: 'center' }}>
          <Link
            href="/scan"
            style={{
              display: 'inline-block',
              padding: '14px 28px',
              fontSize: '16px',
              fontWeight: 700,
              color: C.white,
              backgroundColor: C.green,
              borderRadius: '999px',
              textDecoration: 'none',
            }}
          >
            Sell another item
          </Link>
        </div>
      </div>

      <SiteFooter />
    </div>
  )
}
