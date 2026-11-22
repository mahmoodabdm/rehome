'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '../../lib/supabase'

const GREEN = '#00C853'
const GREEN_DARK = '#00A844'

export default function AuthPage() {
  const router = useRouter()
  const [mode, setMode] = useState<'signin' | 'signup'>('signin')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [googleLoading, setGoogleLoading] = useState(false)
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) router.replace('/marketplace')
    })
    const { data: listener } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN' && session) router.replace('/marketplace')
    })
    return () => {
      listener.subscription.unsubscribe()
    }
  }, [router])

  async function handleEmailAuth(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError('')
    setMessage('')
    if (!email.trim() || !password) {
      setError('Please enter your email and password.')
      return
    }
    if (mode === 'signup' && password.length < 6) {
      setError('Password must be at least 6 characters.')
      return
    }
    setLoading(true)
    try {
      if (mode === 'signup') {
        const { data, error: signUpError } = await supabase.auth.signUp({
          email: email.trim(),
          password,
          options: { emailRedirectTo: `${window.location.origin}/auth` },
        })
        if (signUpError) {
          setError(signUpError.message)
        } else if (data.session) {
          router.replace('/marketplace')
        } else {
          setMessage('Account created. Check your email to confirm, then sign in.')
          setMode('signin')
          setPassword('')
        }
      } else {
        const { error: signInError } = await supabase.auth.signInWithPassword({
          email: email.trim(),
          password,
        })
        if (signInError) {
          setError(signInError.message)
        } else {
          router.replace('/marketplace')
        }
      }
    } catch (err) {
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  async function handleGoogle() {
    setError('')
    setMessage('')
    setGoogleLoading(true)
    try {
      const { error: oauthError } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: { redirectTo: `${window.location.origin}/auth` },
      })
      if (oauthError) {
        setError(oauthError.message)
        setGoogleLoading(false)
      }
    } catch (err) {
      setError('Could not start Google sign in. Please try again.')
      setGoogleLoading(false)
    }
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#F5F7F6', padding: '24px', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif' }}>
      <div style={{ width: '100%', maxWidth: '420px', backgroundColor: '#FFFFFF', borderRadius: '20px', padding: '40px 32px', boxShadow: '0 10px 40px rgba(0, 0, 0, 0.08)', boxSizing: 'border-box' }}>
        <div style={{ textAlign: 'center', marginBottom: '28px' }}>
          <div style={{ width: '56px', height: '56px', borderRadius: '16px', backgroundColor: GREEN, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', color: '#FFFFFF', fontSize: '28px', fontWeight: 700, marginBottom: '16px' }}>R</div>
          <h1 style={{ margin: 0, fontSize: '26px', fontWeight: 700, color: '#111111' }}>{mode === 'signin' ? 'Welcome back' : 'Create your account'}</h1>
          <p style={{ margin: '8px 0 0 0', fontSize: '15px', color: '#6B7280' }}>{mode === 'signin' ? 'Sign in to continue to ReHome' : 'Join ReHome in less than a minute'}</p>
        </div>

        <button type="button" onClick={handleGoogle} disabled={googleLoading || loading} style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', padding: '14px 16px', fontSize: '15px', fontWeight: 600, color: '#111111', backgroundColor: '#FFFFFF', border: '1.5px solid #E5E7EB', borderRadius: '12px', cursor: 'pointer', opacity: googleLoading || loading ? 0.7 : 1, boxSizing: 'border-box' }}>
          <span style={{ fontSize: '18px', fontWeight: 700 }}>G</span>
          {googleLoading ? 'Redirecting to Google...' : 'Continue with Google'}
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', margin: '24px 0' }}>
          <div style={{ flex: 1, height: '1px', backgroundColor: '#E5E7EB' }} />
          <span style={{ fontSize: '13px', color: '#9CA3AF' }}>or</span>
          <div style={{ flex: 1, height: '1px', backgroundColor: '#E5E7EB' }} />
        </div>

        <form onSubmit={handleEmailAuth} noValidate>
          <label htmlFor="email" style={{ display: 'block', fontSize: '14px', fontWeight: 600, color: '#374151', marginBottom: '6px' }}>Email</label>
          <input id="email" type="email" autoComplete="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} style={{ width: '100%', padding: '13px 14px', fontSize: '15px', color: '#111111', backgroundColor: '#FFFFFF', border: '1.5px solid #E5E7EB', borderRadius: '12px', outline: 'none', marginBottom: '16px', boxSizing: 'border-box' }} />
          <label htmlFor="password" style={{ display: 'block', fontSize: '14px', fontWeight: 600, color: '#374151', marginBottom: '6px' }}>Password</label>
          <input id="password" type="password" autoComplete={mode === 'signin' ? 'current-password' : 'new-password'} placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} style={{ width: '100%', padding: '13px 14px', fontSize: '15px', color: '#111111', backgroundColor: '#FFFFFF', border: '1.5px solid #E5E7EB', borderRadius: '12px', outline: 'none', marginBottom: '20px', boxSizing: 'border-box' }} />

          {error && (<div role="alert" style={{ backgroundColor: '#FEF2F2', border: '1px solid #FECACA', color: '#B91C1C', fontSize: '14px', padding: '12px 14px', borderRadius: '10px', marginBottom: '16px' }}>{error}</div>)}
          {message && (<div role="status" style={{ backgroundColor: '#E8F9EE', border: '1px solid #A7E8C0', color: '#047A30', fontSize: '14px', padding: '12px 14px', borderRadius: '10px', marginBottom: '16px' }}>{message}</div>)}

          <button type="submit" disabled={loading || googleLoading} style={{ width: '100%', padding: '14px 16px', fontSize: '16px', fontWeight: 700, color: '#FFFFFF', backgroundColor: GREEN, border: 'none', borderRadius: '12px', cursor: 'pointer', opacity: loading || googleLoading ? 0.7 : 1, boxSizing: 'border-box' }}>
            {loading ? 'Please wait...' : mode === 'signin' ? 'Sign in' : 'Create account'}
          </button>
        </form>

        <p style={{ textAlign: 'center', fontSize: '14px', color: '#6B7280', margin: '24px 0 0 0' }}>
          {mode === 'signin' ? "Don't have an account? " : 'Already have an account? '}
          <button type="button" onClick={() => { setMode(mode === 'signin' ? 'signup' : 'signin'); setError(''); setMessage('') }} style={{ background: 'none', border: 'none', padding: 0, color: GREEN, fontSize: '14px', fontWeight: 700, cursor: 'pointer' }}>
            {mode === 'signin' ? 'Sign up' : 'Sign in'}
          </button>
        </p>
      </div>
    </div>
  )
}
