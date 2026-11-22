'use client'

import { useEffect, useRef, useState } from 'react'
import type { ChangeEvent, CSSProperties } from 'react'
import SiteHeader from '../../components/SiteHeader'
import SiteFooter from '../../components/SiteFooter'
import { ITEMS, CONDITION_OPTIONS, estimatePrice, getVerdict } from '../../lib/pricing'
import type { Verdict } from '../../lib/pricing'
import { STATES, getStateMultiplier, getStateTax } from '../../lib/states'
import { C, FONT, container, card } from '../../lib/theme'

type CondKey = (typeof CONDITION_OPTIONS)[number]['key']

type Result = {
  low: number
  high: number
  profit: number
  fixCost: number
  verdict: Verdict
  reasoning: string[]
  base: number
  stateName: string
  factor: number
  tax: number
  condLabel: string
}

const CUSTOM = '__custom__'

const VERDICT_STYLE: Record<Verdict, { bg: string; fg: string; emoji: string; label: string }> = {
  SELL: { bg: '#E8F9EE', fg: '#047A30', emoji: '💰', label: 'Sell it' },
  FIX: { bg: '#FFF4D6', fg: '#8A6100', emoji: '🛠️', label: 'Fix it first' },
  DONATE: { bg: '#E6F0FF', fg: '#1D4ED8', emoji: '🎁', label: 'Donate it' },
}

const fieldLabel: CSSProperties = {
  display: 'block',
  fontSize: '14px',
  fontWeight: 700,
  color: '#374151',
  marginBottom: '8px',
}

const fieldStyle: CSSProperties = {
  width: '100%',
  padding: '13px 14px',
  fontSize: '15px',
  color: C.text,
  backgroundColor: C.white,
  border: `1.5px solid ${C.border}`,
  borderRadius: '12px',
  outline: 'none',
  boxSizing: 'border-box',
  fontFamily: FONT,
}

function money(n: number): string {
  return '$' + n.toLocaleString('en-US')
}

export default function ScanPage() {
  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [fileName, setFileName] = useState('')
  const [itemName, setItemName] = useState<string>(ITEMS[0].name)
  const [customBase, setCustomBase] = useState('')
  const [condKey, setCondKey] = useState<CondKey>('good')
  const [stateCode, setStateCode] = useState('TX')
  const [result, setResult] = useState<Result | null>(null)
  const [error, setError] = useState('')

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl)
    }
  }, [previewUrl])

  function openPicker() {
    if (fileInputRef.current) fileInputRef.current.click()
  }

  function handleFile(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files && e.target.files[0]
    if (!file) return
    if (!file.type.startsWith('image/')) {
      setError('Please choose an image file.')
      return
    }
    setError('')
    setResult(null)
    if (previewUrl) URL.revokeObjectURL(previewUrl)
    setPreviewUrl(URL.createObjectURL(file))
    setFileName(file.name)
  }

  function handleEstimate() {
    setError('')

    let base = 0
    if (itemName === CUSTOM) {
      base = parseFloat(customBase)
      if (!Number.isFinite(base) || base <= 0) {
        setError('Enter the original (new) price of your item.')
        return
      }
    } else {
      const found = ITEMS.find((i) => i.name === itemName)
      base = found ? found.base : 0
    }

    const factor = getStateMultiplier(stateCode)
    const est = estimatePrice(base, condKey, factor)
    const v = getVerdict(est, base)
    const stateObj = STATES.find((s) => s.code === stateCode)
    const condObj = CONDITION_OPTIONS.find((c) => c.key === condKey)

    setResult({
      low: est.low,
      high: est.high,
      profit: est.profit,
      fixCost: est.fixCost,
      verdict: v.verdict,
      reasoning: v.reasoning,
      base,
      stateName: stateObj ? stateObj.name : stateCode,
      factor,
      tax: getStateTax(stateCode),
      condLabel: condObj ? condObj.label : '',
    })
  }

  function handleReset() {
    if (previewUrl) URL.revokeObjectURL(previewUrl)
    setPreviewUrl(null)
    setFileName('')
    setResult(null)
    setError('')
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  const vStyle = result ? VERDICT_STYLE[result.verdict] : null

  return (
    <div style={{ fontFamily: FONT, backgroundColor: C.bg, color: C.text, minHeight: '100vh' }}>
      <SiteHeader />

      <div style={{ ...container, paddingTop: '40px', paddingBottom: '64px', maxWidth: '860px' }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <h1 style={{ margin: '0 0 8px 0', fontSize: '36px', fontWeight: 800, letterSpacing: '-1px' }}>
            Scan and price your item
          </h1>
          <p style={{ margin: 0, fontSize: '17px', color: C.muted }}>
            Add a photo, pick the item and its condition, and get an instant estimate.
          </p>
        </div>

        <div style={{ ...card, padding: '32px' }}>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFile}
            style={{ display: 'none' }}
          />

          {previewUrl ? (
            <div style={{ textAlign: 'center', marginBottom: '28px' }}>
              <div
                style={{
                  width: '100%',
                  maxWidth: '420px',
                  height: '300px',
                  margin: '0 auto 12px auto',
                  borderRadius: '20px',
                  backgroundColor: C.bg,
                  backgroundImage: `url(${previewUrl})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  border: `1px solid ${C.border}`,
                }}
              />
              <div style={{ fontSize: '13px', color: C.muted, marginBottom: '10px' }}>{fileName}</div>
              <button
                type="button"
                onClick={openPicker}
                style={{
                  background: 'none',
                  border: 'none',
                  color: C.greenDark,
                  fontWeight: 700,
                  fontSize: '14px',
                  cursor: 'pointer',
                  fontFamily: FONT,
                }}
              >
                Change photo
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={openPicker}
              style={{
                width: '100%',
                padding: '56px 24px',
                marginBottom: '28px',
                backgroundColor: C.greenSoft,
                border: `2px dashed ${C.green}`,
                borderRadius: '22px',
                cursor: 'pointer',
                textAlign: 'center',
                boxSizing: 'border-box',
                fontFamily: FONT,
              }}
            >
              <div
                style={{
                  width: '88px',
                  height: '88px',
                  margin: '0 auto 16px auto',
                  borderRadius: '50%',
                  backgroundColor: C.green,
                  color: C.white,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '40px',
                  boxShadow: '0 10px 28px rgba(0,200,83,0.35)',
                }}
              >
                📸
              </div>
              <div style={{ fontSize: '22px', fontWeight: 800, color: C.text, marginBottom: '6px' }}>
                Tap to scan your item
              </div>
              <div style={{ fontSize: '14px', color: C.muted }}>
                Take a photo or upload one from your device
              </div>
            </button>
          )}

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: '20px',
              marginBottom: '24px',
            }}
          >
            <div>
              <label htmlFor="item" style={fieldLabel}>
                Item
              </label>
              <select
                id="item"
                value={itemName}
                onChange={(e) => {
                  setItemName(e.target.value)
                  setResult(null)
                }}
                style={fieldStyle}
              >
                {ITEMS.map((i) => (
                  <option key={i.name} value={i.name}>
                    {i.emoji} {i.name}
                  </option>
                ))}
                <option value={CUSTOM}>Other item (enter price)</option>
              </select>
            </div>
            <div>
              <label htmlFor="state" style={fieldLabel}>
                Your state
              </label>
              <select
                id="state"
                value={stateCode}
                onChange={(e) => {
                  setStateCode(e.target.value)
                  setResult(null)
                }}
                style={fieldStyle}
              >
                {STATES.map((s) => (
                  <option key={s.code} value={s.code}>
                    {s.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {itemName === CUSTOM && (
            <div style={{ marginBottom: '24px' }}>
              <label htmlFor="custom" style={fieldLabel}>
                Original price when new (USD)
              </label>
              <input
                id="custom"
                type="number"
                min="1"
                placeholder="e.g. 300"
                value={customBase}
                onChange={(e) => {
                  setCustomBase(e.target.value)
                  setResult(null)
                }}
                style={fieldStyle}
              />
            </div>
          )}

          <div style={{ marginBottom: '28px' }}>
            <span style={fieldLabel}>Condition</span>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
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
                      padding: '11px 20px',
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
                    {c.label}
                  </button>
                )
              })}
            </div>
          </div>

          {error && (
            <div
              role="alert"
              style={{
                backgroundColor: C.dangerSoft,
                border: '1px solid #FECACA',
                color: C.danger,
                fontSize: '14px',
                padding: '12px 14px',
                borderRadius: '10px',
                marginBottom: '16px',
              }}
            >
              {error}
            </div>
          )}

          <button
            type="button"
            onClick={handleEstimate}
            style={{
              width: '100%',
              padding: '18px 24px',
              fontSize: '18px',
              fontWeight: 800,
              color: C.white,
              backgroundColor: C.green,
              border: 'none',
              borderRadius: '16px',
              cursor: 'pointer',
              boxSizing: 'border-box',
              fontFamily: FONT,
            }}
          >
            Get estimated price
          </button>
        </div>

        {result && vStyle && (
          <div
            style={{
              ...card,
              padding: '32px',
              marginTop: '24px',
              textAlign: 'center',
              border: `2px solid ${C.green}`,
            }}
          >
            <div style={{ fontSize: '14px', fontWeight: 700, color: C.muted, marginBottom: '6px' }}>
              ESTIMATED RESALE PRICE
            </div>
            <div
              style={{
                fontSize: 'clamp(36px, 8vw, 52px)',
                fontWeight: 800,
                color: C.greenDark,
                letterSpacing: '-2px',
                lineHeight: 1.1,
              }}
            >
              {money(result.low)} to {money(result.high)}
            </div>
            <div style={{ fontSize: '15px', color: C.muted, margin: '10px 0 22px 0' }}>
              You would net about {money(result.profit)} after the 5% platform fee
            </div>

            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                backgroundColor: vStyle.bg,
                color: vStyle.fg,
                padding: '10px 20px',
                borderRadius: '999px',
                fontSize: '16px',
                fontWeight: 800,
                marginBottom: '16px',
              }}
            >
              <span>{vStyle.emoji}</span>
              {vStyle.label}
            </div>

            <div style={{ maxWidth: '520px', margin: '0 auto 22px auto' }}>
              {result.reasoning.map((line) => (
                <p key={line} style={{ margin: '0 0 6px 0', fontSize: '15px', color: C.text, lineHeight: 1.5 }}>
                  {line}
                </p>
              ))}
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', justifyContent: 'center' }}>
              <span
                style={{
                  backgroundColor: C.greenSoft,
                  color: C.greenDeep,
                  padding: '8px 14px',
                  borderRadius: '999px',
                  fontSize: '13px',
                  fontWeight: 700,
                }}
              >
                {result.condLabel}
              </span>
              <span
                style={{
                  backgroundColor: C.bg,
                  color: C.text,
                  padding: '8px 14px',
                  borderRadius: '999px',
                  fontSize: '13px',
                  fontWeight: 700,
                }}
              >
                {result.stateName}: price factor x{result.factor.toFixed(2)}
              </span>
              <span
                style={{
                  backgroundColor: C.bg,
                  color: C.text,
                  padding: '8px 14px',
                  borderRadius: '999px',
                  fontSize: '13px',
                  fontWeight: 700,
                }}
              >
                Est. repair cost {money(result.fixCost)}
              </span>
              <span
                style={{
                  backgroundColor: C.bg,
                  color: C.text,
                  padding: '8px 14px',
                  borderRadius: '999px',
                  fontSize: '13px',
                  fontWeight: 700,
                }}
              >
                Sales tax {result.tax}%
              </span>
            </div>

            <button
              type="button"
              onClick={handleReset}
              style={{
                marginTop: '24px',
                background: 'none',
                border: 'none',
                color: C.greenDark,
                fontWeight: 700,
                fontSize: '14px',
                cursor: 'pointer',
                fontFamily: FONT,
              }}
            >
              Scan another item
            </button>
          </div>
        )}
      </div>

      <SiteFooter />
    </div>
  )
}
