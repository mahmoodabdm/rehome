import type { CSSProperties } from 'react'

export const C = {
  green: '#00C853',
  greenDark: '#00A844',
  greenDeep: '#008F3A',
  greenSoft: '#E8F9EE',
  bg: '#F5F7F6',
  white: '#FFFFFF',
  text: '#111111',
  muted: '#6B7280',
  border: '#E5E7EB',
  danger: '#B91C1C',
  dangerSoft: '#FEF2F2',
}

export const FONT =
  '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif'

export const container: CSSProperties = {
  maxWidth: '1160px',
  margin: '0 auto',
  padding: '0 24px',
  boxSizing: 'border-box',
}

export const card: CSSProperties = {
  backgroundColor: C.white,
  borderRadius: '20px',
  border: `1px solid ${C.border}`,
  boxShadow: '0 4px 24px rgba(0,0,0,0.05)',
  boxSizing: 'border-box',
}
