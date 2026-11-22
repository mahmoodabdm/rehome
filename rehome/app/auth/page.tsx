'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '../../lib/supabase'

const GREEN = '#00C853'
const GREEN_DARK = '#00A844'
const AFTER_LOGIN_PATH = '/marketplace'

export default function AuthPage() {
  const router = useRouter()

  const [mode, setMode] = useState<'signin' | 'signup'>('signin')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [googleLoading, setGoogleLoading] = useState(false)
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')

  const [submitHover, setSubmitHover] = useState(false)
  const [googleHover, setGoogleHover] = useState(false)
  const [emailFocus, setEmailFocus] = useState(false)
  const [passwordFocus, setPasswordFocus] = useState(false)

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) {
        router.replace(AFTER_LOGIN_PATH)
      }
    })

    const { data: listener } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN' && session) {
        router.replace(AFTER_LOGIN_PATH)
      }
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
          options: {
            emailRedirectTo: `${window.location.origin}/auth`,
          },
        })

        if (signUpError) {
          setError(signUpError.message)
        } else if (data.session) {
          router.replace(AFTER_LOGIN_PATH)
        } else {
          setMessage('Account created. Check your email to confirm your address, then sign in.')
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
          router.replace(AFTER_LOGIN_PATH)
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
        options: {
          redirectTo: `${window.location.origin}/auth`,
        },
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

  function switchMode() {
    setMode(mode === 'signin' ? 'signup' : 'signin')
    setError('')
    setMessage('')
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#F5F7F6',
        padding: '24px',
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '420px',
          backgroundColor: '#FFFFFF',
          borderRadius: '20px',
          padding: '40px 32px',
          boxShadow: '0 10px 40px rgba(0, 0, 0, 0.08)',
          boxSizing: 'border-box',
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: '28px' }}>
          <div
            style={{
              width: '56px',
              height: '56px',
              borderRadius: '16px',
              backgroundColor: GREEN,
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#FFFFFF',
              fontSize: '28px',
              fontWeight: 700,
              marginBottom: '16px',
            }}
          >
            R
          </div>
          <h1
            style={{
              margin: 0,
              fontSize: '26px',
              fontWeight: 700,
              color: '#111111',
            }}
          >
            {mode === 'signin' ? 'Welcome back' : 'Create your account'}
          </h1>
          <p
            style={{
              margin: '8px 0 0 0',
              fontSize: '15px',
              color: '#6B7280',
            }}
          >
            {mode === 'signin'
              ? 'Sign in to continue to ReHome'
              : 'Join ReHome in less than a minute'}
          </p>
        </div>

        <button
          type="button"
          onClick={handleGoogle}
          disabled={googleLoading || loading}
          onMouseEnter={() => setGoogleHover(true)}
          onMouseLeave={() => setGoogleHover(false)}
          style={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '12px',
            padding: '14px 16px',
            fontSize: '15px',
            fontWeight: 600,
            color: '#111111',
            backgroundColor: googleHover ? '#F9FAFB' : '#FFFFFF',
            border: '1.5px solid #E5E7EB',
            borderRadius: '12px',
            cursor: googleLoading || loading ? 'not-allowed' : 'pointer',
            opacity: googleLoading || loading ? 0.7 : 1,
            transition: 'background-color 0.15s ease',
            boxSizing: 'border-box'[STRIPPED 46 bytes]"20" height="20" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
            <path
              fill="#EA4335"
              d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
            />
            <path
              fill="#4285F4"
              d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
            />
            <path
              fill="#FBBC05"
              d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
            />
            <path
              fill="#34A853"
              d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
            />
          </svg>
          {googleLoading ? 'Redirecting to Google...' : 'Continue with Google'}
        </button>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            margin: '24px 0',
          }}
        >
          <div style={{ flex: 1, height: '1px', backgroundColor: '#E5E7EB' }} />
          <span style={{ fontSize: '13px', color: '#9CA3AF' }}>or</span>
          <div style={{ flex: 1, height: '1px', backgroundColor: '#E5E7EB' }} />
        </div>

        <form onSubmit={handleEmailAuth} noValidate>
          <label
            htmlFor="email"
            style={{
              display: 'block',
              fontSize: '14px',
              fontWeight: 600,
              color: '#374151',
              marginBottom: '6px',
            }}
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onFocus={() => setEmailFocus(true)}
            onBlur={() => setEmailFocus(false)}
            style={{
              width: '100%',
              padding: '13px 14px',
              fontSize: '15px',
              color: '#111111',
              backgroundColor: '#FFFFFF',
              border: `1.5px solid ${emailFocus ? GREEN : '#E5E7EB'}`,
              borderRadius: '12px',
              outline: 'none',
              marginBottom: '16px',
              boxSizing: 'border-box',
              transition: 'border-color 0.15s ease',
            }}
          />

          <label
            htmlFor="password"
            style={{
              display: 'block',
              fontSize: '14px',
              fontWeight: 600,
              color: '#374151',
              marginBottom: '6px',
            }}
          >
            Password
          </label>
          <input
            id="password"
            type="password"
            autoComplete={mode === 'signin' ? 'current-password' : 'new-password'}
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onFocus={() => setPasswordFocus(true)}
            onBlur={() => setPasswordFocus(false)}
            style={{
              width: '100%',
              padding: '13px 14px',
              fontSize: '15px',
              color: '#111111',
              backgroundColor: '#FFFFFF',
              border: `1.5px solid ${passwordFocus ? GREEN : '#E5E7EB'}`,
              borderRadius: '12px',
              outline: 'none',
              marginBottom: '20px',
              boxSizing: 'border-box',
              transition: 'border-color 0.15s ease',
            }}
          />

          {error && (
            <div
              role="alert"
              style={{
                backgroundColor: '#FEF2F2',
                border: '1px solid #FECACA',
                color: '#B91C1C',
                fontSize: '14px',
                padding: '12px 14px',
                borderRadius: '10px',
                marginBottom: '16px',
              }}
            >
              {error}
            </div>
          )}

          {message && (
            <div
              role="status"
              style={{
                backgroundColor: '#E8F9EE',
                border: '1px solid #A7E8C0',
                color: '#047A30',
                fontSize: '14px',
                padding: '12px 14px',
                borderRadius: '10px',
                marginBottom: '16px',
              }}
            >
              {message}
            </div>
          )}

          <button
            type="submit"
            disabled={loading || googleLoading}
            onMouseEnter={() => setSubmitHover(true)}
            onMouseLeave={() => setSubmitHover(false)}
            style={{
              width: '100%',
              padding: '14px 16px',
              fontSize: '16px',
              fontWeight: 700,
              color: '#FFFFFF',
              backgroundColor: submitHover ? GREEN_DARK : GREEN,
              border: 'none',
              borderRadius: '12px',
              cursor: loading || googleLoading ? 'not-allowed' : 'pointer',
              opacity: loading || googleLoading ? 0.7 : 1,
              transition: 'background-color 0.15s ease',
              boxSizing: 'border-box',
            }}
          >
            {loading
              ? 'Please wait...'
              : mode === 'signin'
              ? 'Sign in'
              : 'Create account'}
          </button>
        </form>

        <p
          style={{
            textAlign: 'center',
            fontSize: '14px',
            color: '#6B7280',
            margin: '24px 0 0 0',
          }}
        >
          {mode === 'signin' ? "Don't have an account? " : 'Already have an account? '}
          <button
            type="button"
            onClick={switchMode}
            style={{
              background: 'none',
              border: 'none',
              padding: 0,
              color: GREEN,
              fontSize: '14px',
              fontWeight: 700,
              cursor: 'pointer',
            }}
          >
            {mode === 'signin' ? 'Sign up' : 'Sign in'}
          </button>
        </p>
      </div>
    </div>
  )
}
