import Link from 'next/link'
import SiteHeader from '../../components/SiteHeader'
import SiteFooter from '../../components/SiteFooter'
import { C, FONT, container, card } from '../../lib/theme'

// Change this to your payment link (Stripe etc.) when it is ready.
const CHECKOUT_URL = '/auth'

const FREE_FEATURES = [
  'Instant price estimates',
  'List items on the marketplace',
  'Basic earnings overview',
  'Standard 5% platform fee',
]

const PRO_FEATURES = [
  'Everything in Free',
  'Priority placement for your listings',
  'Advanced earnings and CO2 reports',
  'Unlimited active listings',
  'Priority support',
]

const FAQ = [
  {
    q: 'Can I cancel anytime?',
    a: 'Yes. You can cancel whenever you like and keep Pro until the end of your billing period.',
  },
  {
    q: 'Do I need Pro to sell?',
    a: 'No. Selling, fixing, and donating are free. Pro is for sellers who want more reach and better insights.',
  },
  {
    q: 'Which countries does ReHome cover?',
    a: 'ReHome is built for the United States and Europe, with state-level pricing for every US state.',
  },
]

function Check({ color }: { color: string }) {
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '22px',
        height: '22px',
        borderRadius: '50%',
        backgroundColor: color,
        color: C.white,
        fontSize: '13px',
        fontWeight: 800,
        flexShrink: 0,
      }}
    >
      ✓
    </span>
  )
}

export default function ProPage() {
  return (
    <div style={{ fontFamily: FONT, backgroundColor: C.bg, color: C.text, minHeight: '100vh' }}>
      <SiteHeader />

      <div style={{ ...container, paddingTop: '56px', paddingBottom: '72px' }}>
        <div style={{ textAlign: 'center', marginBottom: '44px' }}>
          <div
            style={{
              display: 'inline-block',
              backgroundColor: C.greenSoft,
              color: C.greenDeep,
              padding: '7px 16px',
              borderRadius: '999px',
              fontSize: '14px',
              fontWeight: 700,
              marginBottom: '18px',
            }}
          >
            ✨ ReHome Pro
          </div>
          <h1
            style={{
              margin: '0 0 12px 0',
              fontSize: 'clamp(32px, 5vw, 48px)',
              fontWeight: 800,
              letterSpacing: '-1.2px',
            }}
          >
            Sell more. Earn more.
          </h1>
          <p style={{ margin: '0 auto', maxWidth: '560px', fontSize: '18px', color: C.muted, lineHeight: 1.55 }}>
            Start free. Upgrade to Pro when you want your items to be seen first.
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '24px',
            maxWidth: '860px',
            margin: '0 auto 56px auto',
          }}
        >
          {/* FREE */}
          <div style={{ ...card, padding: '36px 32px' }}>
            <div style={{ fontSize: '18px', fontWeight: 800, marginBottom: '8px' }}>Free</div>
            <div style={{ marginBottom: '6px' }}>
              <span style={{ fontSize: '48px', fontWeight: 800, letterSpacing: '-2px' }}>$0</span>
            </div>
            <p style={{ margin: '0 0 24px 0', fontSize: '15px', color: C.muted }}>
              Everything you need to get started.
            </p>
            <Link
              href="/auth"
              style={{
                display: 'block',
                textAlign: 'center',
                padding: '14px 20px',
                fontSize: '16px',
                fontWeight: 700,
                color: C.text,
                backgroundColor: C.white,
                border: `1.5px solid ${C.border}`,
                borderRadius: '14px',
                textDecoration: 'none',
                marginBottom: '26px',
                boxSizing: 'border-box',
              }}
            >
              Get started free
            </Link>
            {FREE_FEATURES.map((f) => (
              <div key={f} style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '14px' }}>
                <Check color="#9CA3AF" />
                <span style={{ fontSize: '15px' }}>{f}</span>
              </div>
            ))}
          </div>

          {/* PRO */}
          <div
            style={{
              ...card,
              padding: '36px 32px',
              border: `2px solid ${C.green}`,
              boxShadow: '0 16px 48px rgba(0,200,83,0.18)',
              position: 'relative',
            }}
          >
            <span
              style={{
                position: 'absolute',
                top: '-14px',
                right: '24px',
                backgroundColor: C.green,
                color: C.white,
                fontSize: '12px',
                fontWeight: 800,
                padding: '6px 14px',
                borderRadius: '999px',
              }}
            >
              MOST POPULAR
            </span>
            <div style={{ fontSize: '18px', fontWeight: 800, marginBottom: '8px', color: C.greenDeep }}>Pro</div>
            <div style={{ marginBottom: '6px' }}>
              <span style={{ fontSize: '48px', fontWeight: 800, letterSpacing: '-2px' }}>$19</span>
              <span style={{ fontSize: '16px', color: C.muted, fontWeight: 600 }}> / month</span>
            </div>
            <p style={{ margin: '0 0 24px 0', fontSize: '15px', color: C.muted }}>
              For serious sellers who want more reach.
            </p>
            <Link
              href={CHECKOUT_URL}
              style={{
                display: 'block',
                textAlign: 'center',
                padding: '14px 20px',
                fontSize: '16px',
                fontWeight: 800,
                color: C.white,
                backgroundColor: C.green,
                borderRadius: '14px',
                textDecoration: 'none',
                marginBottom: '26px',
                boxSizing: 'border-box',
              }}
            >
              Upgrade to Pro
            </Link>
            {PRO_FEATURES.map((f) => (
              <div key={f} style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '14px' }}>
                <Check color={C.green} />
                <span style={{ fontSize: '15px' }}>{f}</span>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ */}
        <div style={{ maxWidth: '760px', margin: '0 auto' }}>
          <h2
            style={{
              margin: '0 0 24px 0',
              fontSize: '28px',
              fontWeight: 800,
              letterSpacing: '-0.6px',
              textAlign: 'center',
            }}
          >
            Questions, answered
          </h2>
          {FAQ.map((f) => (
            <div key={f.q} style={{ ...card, padding: '22px 26px', marginBottom: '14px' }}>
              <div style={{ fontSize: '16px', fontWeight: 800, marginBottom: '6px' }}>{f.q}</div>
              <div style={{ fontSize: '15px', color: C.muted, lineHeight: 1.6 }}>{f.a}</div>
            </div>
          ))}
        </div>
      </div>

      <SiteFooter />
    </div>
  )
}
