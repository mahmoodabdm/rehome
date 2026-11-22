"use client";

import { useState } from "react";

const E = "#00C853";
const E_DARK = "#00A344";
const E_LIGHT = "#E6F9EE";
const DARK = "#0F172A";

const cardShadow =
  "0 28px 56px -28px rgba(15,23,42,0.24), 0 12px 24px -16px rgba(15,23,42,0.12), 0 1px 2px rgba(15,23,42,0.05)";

const styles: Record<string, React.CSSProperties> = {
  page: {
    minHeight: "100vh",
    background:
      "radial-gradient(760px 380px at 12% -10%, rgba(0,200,83,0.10), transparent 62%), linear-gradient(180deg, #F0FDF4 0%, #F7FDF9 42%, #F8FAF9 100%)",
    fontFamily:
      "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    color: DARK,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "clamp(12px, 4vw, 28px)",
    boxSizing: "border-box",
    WebkitFontSmoothing: "antialiased",
  },
  container: {
    width: "100%",
    maxWidth: 440,
  },
  header: {
    textAlign: "center" as const,
    marginBottom: "clamp(14px, 4vw, 22px)",
  },
  brand: {
    display: "inline-flex",
    alignItems: "center",
    gap: 10,
    fontSize: 22,
    fontWeight: 800,
    letterSpacing: "-0.5px",
    color: DARK,
    textDecoration: "none",
  },
  brandBadge: {
    width: 38,
    height: 38,
    borderRadius: 11,
    background: E,
    color: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 18,
    fontWeight: 800,
    boxShadow: "0 8px 16px -8px rgba(0,200,83,0.85)",
  },
  card: {
    background: "#fff",
    borderRadius: 24,
    padding: "clamp(22px, 5.4vw, 36px)",
    boxShadow: cardShadow,
    border: "1px solid rgba(15,23,42,0.06)",
    boxSizing: "border-box" as const,
  },
  backLink: {
    display: "inline-block",
    color: "#475569",
    fontWeight: 700,
    textDecoration: "none",
    fontSize: 13.5,
    padding: "6px 11px 6px 9px",
    marginLeft: -9,
    borderRadius: 999,
    transition: "background 0.16s ease, color 0.16s ease",
  },
  title: {
    fontSize: "clamp(25px, 6vw, 30px)",
    fontWeight: 900,
    letterSpacing: "-0.8px",
    lineHeight: 1.18,
    margin: "12px 0 7px",
    color: DARK,
  },
  subtitle: {
    color: "#64748B",
    fontSize: 14.5,
    lineHeight: 1.55,
    fontWeight: 500,
    margin: "0 0 22px",
  },
  toggleWrap: {
    display: "flex",
    background: "#F1F5F9",
    borderRadius: 14,
    padding: 5,
    marginBottom: 20,
    gap: 5,
  },
  toggleBtn: {
    flex: 1,
    border: "none",
    borderRadius: 10,
    padding: "11px 12px",
    fontSize: "clamp(13.5px, 3.6vw, 14.5px)",
    fontWeight: 700,
    cursor: "pointer",
    background: "transparent",
    color: "#64748B",
    fontFamily: "inherit",
    transition: "background 0.18s ease, color 0.18s ease",
  },
  toggleBtnActive: {
    flex: 1,
    border: "none",
    borderRadius: 10,
    padding: "11px 12px",
    fontSize: "clamp(13.5px, 3.6vw, 14.5px)",
    fontWeight: 800,
    cursor: "pointer",
    background: DARK,
    color: "#FFFFFF",
    fontFamily: "inherit",
    boxShadow: "0 10px 20px -10px rgba(15,23,42,0.85)",
    transition: "background 0.18s ease, color 0.18s ease",
  },
  socialBtn: {
    width: "100%",
    height: 52,
    padding: "0 16px",
    borderRadius: 14,
    border: "2px solid #E5E7EB",
    background: "#FFFFFF",
    color: DARK,
    fontSize: "clamp(14px, 3.7vw, 15px)",
    fontWeight: 700,
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    marginBottom: 11,
    fontFamily: "inherit",
    boxSizing: "border-box" as const,
    boxShadow:
      "0 1px 2px rgba(15,23,42,0.06), 0 10px 22px -16px rgba(15,23,42,0.55)",
    transition: "transform 0.16s ease, box-shadow 0.16s ease, background 0.16s ease",
  },
  socialBtnFacebook: {
    width: "100%",
    height: 52,
    padding: "0 16px",
    borderRadius: 14,
    border: "2px solid #1877F2",
    background: "#1877F2",
    color: "#fff",
    fontSize: "clamp(14px, 3.7vw, 15px)",
    fontWeight: 700,
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    marginBottom: 20,
    fontFamily: "inherit",
    boxSizing: "border-box" as const,
    boxShadow: "0 10px 22px -14px rgba(24,119,242,0.85)",
    transition: "transform 0.16s ease, box-shadow 0.16s ease, background 0.16s ease",
  },
  divider: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    marginBottom: 20,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    background: "#E9EEF5",
  },
  dividerText: {
    fontSize: 11,
    color: "#94A3B8",
    fontWeight: 800,
    letterSpacing: "1.1px",
    whiteSpace: "nowrap" as const,
  },
  label: {
    display: "block",
    fontSize: 11.5,
    fontWeight: 800,
    textTransform: "uppercase" as const,
    letterSpacing: "0.6px",
    color: "#475569",
    marginBottom: 7,
  },
  input: {
    width: "100%",
    height: 52,
    padding: "0 14px",
    borderRadius: 12,
    border: "1.5px solid #E5E7EB",
    fontSize: 15,
    fontWeight: 500,
    color: DARK,
    background: "#FFFFFF",
    outline: "none",
    boxSizing: "border-box" as const,
    marginBottom: 14,
    fontFamily: "inherit",
    transition: "border-color 0.16s ease, box-shadow 0.16s ease",
    WebkitAppearance: "none" as const,
  },
  passwordWrap: {
    position: "relative" as const,
  },
  showBtn: {
    position: "absolute" as const,
    right: 8,
    top: 26,
    transform: "translateY(-50%)",
    background: "transparent",
    border: "none",
    borderRadius: 8,
    padding: "7px 10px",
    color: E_DARK,
    fontSize: 12.5,
    fontWeight: 800,
    letterSpacing: "0.2px",
    cursor: "pointer",
    fontFamily: "inherit",
    transition: "background 0.16s ease, color 0.16s ease",
  },
  rowBetween: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexWrap: "wrap" as const,
    gap: 10,
    marginBottom: 18,
    fontSize: 13,
  },
  checkboxLabel: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    color: "#475569",
    fontSize: 13.5,
    fontWeight: 600,
    cursor: "pointer",
    userSelect: "none" as const,
  },
  forgot: {
    color: E_DARK,
    fontWeight: 700,
    fontSize: 13.5,
    textDecoration: "none",
    cursor: "pointer",
  },
  submitBtn: {
    width: "100%",
    height: 56,
    padding: "0 16px",
    borderRadius: 14,
    background: E,
    color: "#fff",
    border: "none",
    fontSize: "clamp(15.5px, 4vw, 16.5px)",
    fontWeight: 800,
    letterSpacing: "-0.2px",
    cursor: "pointer",
    fontFamily: "inherit",
    boxSizing: "border-box" as const,
    boxShadow: "0 16px 30px -14px rgba(0,200,83,0.8)",
    transition: "background 0.18s ease, transform 0.18s ease, box-shadow 0.18s ease",
  },
  errorBox: {
    display: "flex",
    alignItems: "flex-start",
    gap: 9,
    background: "#FEF2F2",
    color: "#991B1B",
    border: "1px solid #FCA5A5",
    borderLeft: `4px solid #DC2626`,
    borderRadius: 12,
    padding: "12px 14px",
    fontSize: 13.5,
    fontWeight: 700,
    lineHeight: 1.45,
    marginBottom: 14,
    boxShadow: "0 10px 20px -16px rgba(220,38,38,0.9)",
  },
  successBox: {
    display: "flex",
    alignItems: "flex-start",
    gap: 9,
    background: E_LIGHT,
    color: "#0B6B3A",
    border: "1px solid #A7E8C4",
    borderLeft: `4px solid ${E}`,
    borderRadius: 12,
    padding: "12px 14px",
    fontSize: 13.5,
    fontWeight: 700,
    lineHeight: 1.45,
    marginBottom: 14,
    boxShadow: "0 10px 20px -16px rgba(0,200,83,0.9)",
  },
  switchText: {
    textAlign: "center" as const,
    marginTop: 18,
    marginBottom: 0,
    fontSize: 13.5,
    color: "#64748B",
    fontWeight: 500,
  },
  switchLink: {
    color: DARK,
    fontWeight: 800,
    cursor: "pointer",
    textDecoration: "underline",
    textUnderlineOffset: 3,
  },
  trustRow: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "clamp(7px, 2vw, 10px)",
    marginTop: 20,
    flexWrap: "wrap" as const,
  },
  trustItem: {
    display: "inline-flex",
    alignItems: "center",
    gap: 6,
    fontSize: 12.5,
    color: "#475569",
    fontWeight: 700,
    background: "#F8FAFC",
    border: "1px solid #E8EEF5",
    borderRadius: 999,
    padding: "6px 12px",
    whiteSpace: "nowrap" as const,
  },
  footer: {
    textAlign: "center" as const,
    marginTop: 16,
    marginBottom: 0,
    fontSize: 12,
    color: "#94A3B8",
    fontWeight: 500,
  },
};

const inputBaseBorder = "1.5px solid #E5E7EB";

export default function Auth() {
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  function handleSubmit() {
    setError("");
    setSuccess("");

    if (!email.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    if (mode === "signup" && !name.trim()) {
      setError("Please enter your full name.");
      return;
    }

    if (mode === "login") {
      setSuccess("Welcome back! Logging you in...");
      setTimeout(() => {
        window.location.href = "/marketplace";
      }, 800);
    } else {
      setSuccess("Account created! Check your email to verify, then you can list and sell.");
      setTimeout(() => {
        window.location.href = "/marketplace";
      }, 1200);
    }
  }

  function handleFocus(e: React.FocusEvent<HTMLInputElement>) {
    e.currentTarget.style.borderColor = E;
    e.currentTarget.style.boxShadow = "0 0 0 4px rgba(0,200,83,0.13)";
  }

  function handleBlur(e: React.FocusEvent<HTMLInputElement>) {
    e.currentTarget.style.borderColor = "#E5E7EB";
    e.currentTarget.style.boxShadow = "none";
  }

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <div style={styles.header}>
          <a href="/" style={styles.brand}>
            <span style={styles.brandBadge}>R</span>
            ReHome
          </a>
        </div>

        <div style={styles.card}>
          <a
            href="/"
            style={styles.backLink}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#F1F5F9";
              e.currentTarget.style.color = DARK;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.color = "#475569";
            }}
          >
            ← Back to Home
          </a>
          <h1 style={styles.title}>
            {mode === "login" ? "Welcome back" : "Create your account"}
          </h1>
          <p style={styles.subtitle}>
            {mode === "login"
              ? "Log in to list, sell and get paid."
              : "Free to join. Sell in 2 minutes. No credit card needed."}
          </p>

          <div style={styles.toggleWrap}>
            <button
              type="button"
              onClick={() => { setMode("login"); setError(""); setSuccess(""); }}
              style={mode === "login" ? styles.toggleBtnActive : styles.toggleBtn}
            >
              Log In
            </button>
            <button
              type="button"
              onClick={() => { setMode("signup"); setError(""); setSuccess(""); }}
              style={mode === "signup" ? styles.toggleBtnActive : styles.toggleBtn}
            >
              Sign Up Free
            </button>
          </div>

          <button
            type="button"
            style={styles.socialBtn}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-1px)";
              e.currentTarget.style.background = "#FCFDFF";
              e.currentTarget.style.boxShadow =
                "0 1px 2px rgba(15,23,42,0.08), 0 16px 28px -16px rgba(15,23,42,0.6)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.background = "#FFFFFF";
              e.currentTarget.style.boxShadow =
                "0 1px 2px rgba(15,23,42,0.06), 0 10px 22px -16px rgba(15,23,42,0.55)";
            }}
          >
            <svg width="19" height="19" viewBox="0 0 48 48" aria-hidden="true" style={{ flexShrink: 0 }}>
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
            Continue with Google
          </button>

          <button
            type="button"
            style={styles.socialBtnFacebook}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#166FE5";
              e.currentTarget.style.borderColor = "#166FE5";
              e.currentTarget.style.transform = "translateY(-1px)";
              e.currentTarget.style.boxShadow =
                "0 16px 28px -14px rgba(24,119,242,0.95)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "#1877F2";
              e.currentTarget.style.borderColor = "#1877F2";
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow =
                "0 10px 22px -14px rgba(24,119,242,0.85)";
            }}
          >
            <svg width="19" height="19" viewBox="0 0 24 24" aria-hidden="true" style={{ flexShrink: 0 }}>
              <path
                fill="#FFFFFF"
                d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5.02 3.66 9.18 8.44 9.94v-7.03H7.9v-2.9h2.54V9.85c0-2.51 1.49-3.9 3.77-3.9 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.78-1.63 1.57v1.88h2.78l-.45 2.9h-2.33V22c4.78-.76 8.44-4.92 8.44-9.94z"
              />
            </svg>
            Continue with Facebook
          </button>

          <div style={styles.divider}>
            <div style={styles.dividerLine} />
            <span style={styles.dividerText}>OR WITH EMAIL</span>
            <div style={styles.dividerLine} />
          </div>

          {error && (
            <div style={styles.errorBox} role="alert">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true" style={{ flexShrink: 0, marginTop: 2 }}>
                <circle cx="12" cy="12" r="10" fill="#DC2626" />
                <path d="M12 7.4v5.6" stroke="#FFFFFF" strokeWidth="2.1" strokeLinecap="round" />
                <circle cx="12" cy="16.6" r="1.25" fill="#FFFFFF" />
              </svg>
              <span>{error}</span>
            </div>
          )}
          {success && (
            <div style={styles.successBox} role="status">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true" style={{ flexShrink: 0, marginTop: 2 }}>
                <circle cx="12" cy="12" r="10" fill={E} />
                <path
                  d="M7.8 12.3l2.9 2.9 5.5-5.7"
                  stroke="#FFFFFF"
                  strokeWidth="2.1"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span>{success}</span>
            </div>
          )}

          {mode === "signup" && (
            <div>
              <label style={styles.label}>Full Name</label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="John Smith"
                style={styles.input}
                onFocus={handleFocus}
                onBlur={handleBlur}
              />
            </div>
          )}

          <label style={styles.label}>Email</label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            type="email"
            style={styles.input}
            onFocus={handleFocus}
            onBlur={handleBlur}
          />

          <label style={styles.label}>Password</label>
          <div style={styles.passwordWrap}>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="At least 6 characters"
              type={showPassword ? "text" : "password"}
              style={{ ...styles.input, paddingRight: 68 }}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              style={styles.showBtn}
              aria-label={showPassword ? "Hide password" : "Show password"}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#EEF7F1";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent";
              }}
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>

          <div style={styles.rowBetween}>
            <label style={styles.checkboxLabel}>
              <input
                type="checkbox"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
                style={{ width: 16, height: 16, margin: 0, accentColor: E, cursor: "pointer" }}
              />
              Remember me
            </label>
            {mode === "login" && (
              <span
                style={styles.forgot}
                onMouseEnter={(e) => { e.currentTarget.style.opacity = "0.7"; }}
                onMouseLeave={(e) => { e.currentTarget.style.opacity = "1"; }}
              >
                Forgot password?
              </span>
            )}
          </div>

          <button
            type="button"
            onClick={handleSubmit}
            style={styles.submitBtn}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#00B34A";
              e.currentTarget.style.transform = "translateY(-1px)";
              e.currentTarget.style.boxShadow =
                "0 22px 38px -14px rgba(0,200,83,0.95)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = E;
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow =
                "0 16px 30px -14px rgba(0,200,83,0.8)";
            }}
            onMouseDown={(e) => {
              e.currentTarget.style.transform = "translateY(0) scale(0.995)";
            }}
            onMouseUp={(e) => {
              e.currentTarget.style.transform = "translateY(-1px)";
            }}
          >
            {mode === "login" ? "Log In →" : "Create Account →"}
          </button>

          <p style={styles.switchText}>
            {mode === "login" ? "No account? " : "Already have an account? "}
            <span
              onClick={() => { setMode(mode === "login" ? "signup" : "login"); setError(""); setSuccess(""); }}
              style={styles.switchLink}
              onMouseEnter={(e) => { e.currentTarget.style.color = E_DARK; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = DARK; }}
            >
              {mode === "login" ? "Sign up free" : "Log in"}
            </span>
          </p>

          <div style={styles.trustRow}>
            <span style={styles.trustItem}>
              <svg width="13" height="13" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                <circle cx="10" cy="10" r="10" fill={E_LIGHT} />
                <path
                  d="M6 10.4l2.6 2.6L14 7.6"
                  stroke={E_DARK}
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Secure
            </span>
            <span style={styles.trustItem}>
              <svg width="13" height="13" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                <circle cx="10" cy="10" r="10" fill={E_LIGHT} />
                <path
                  d="M6 10.4l2.6 2.6L14 7.6"
                  stroke={E_DARK}
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Free to join
            </span>
            <span style={styles.trustItem}>
              <svg width="13" height="13" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                <circle cx="10" cy="10" r="10" fill={E_LIGHT} />
                <path
                  d="M6 10.4l2.6 2.6L14 7.6"
                  stroke={E_DARK}
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              All 50 states
            </span>
          </div>
        </div>

        <p style={styles.footer}>
          © {new Date().getFullYear()} ReHome · Don&apos;t throw it. ReHome it.
        </p>
      </div>
    </div>
  );
}
