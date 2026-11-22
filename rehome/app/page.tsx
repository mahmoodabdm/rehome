"use client";

import { useState } from "react";

const E = "#00C853";
const E_DARK = "#00A344";
const E_LIGHT = "#E6F9EE";
const DARK = "#0F172A";

const cardShadow =
  "0 4px 24px rgba(0,0,0,0.06), 0 1px 3px rgba(0,0,0,0.04)";

const styles: Record<string, React.CSSProperties> = {
  page: {
    minHeight: "100vh",
    background:
      "linear-gradient(180deg, #F0FDF4 0%, #F8FAF9 320px, #F8FAF9 100%)",
    fontFamily:
      "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    color: DARK,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "20px",
  },
  container: {
    width: "100%",
    maxWidth: 440,
  },
  header: {
    textAlign: "center" as const,
    marginBottom: 20,
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
    width: 36,
    height: 36,
    borderRadius: 10,
    background: E,
    color: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 18,
    fontWeight: 800,
  },
  card: {
    background: "#fff",
    borderRadius: 20,
    padding: 28,
    boxShadow: cardShadow,
    border: "1px solid #F1F5F9",
  },
  backLink: {
    color: E_DARK,
    fontWeight: 700,
    textDecoration: "none",
    fontSize: 14,
  },
  title: {
    fontSize: 28,
    fontWeight: 900,
    letterSpacing: "-0.6px",
    margin: "14px 0 6px",
    color: DARK,
  },
  subtitle: {
    color: "#6B7280",
    fontSize: 14,
    lineHeight: 1.5,
    margin: "0 0 20px",
  },
  toggleWrap: {
    display: "flex",
    background: "#F3F4F6",
    borderRadius: 999,
    padding: 4,
    marginBottom: 20,
  },
  toggleBtn: {
    flex: 1,
    border: "none",
    borderRadius: 999,
    padding: "10px 12px",
    fontSize: 14,
    fontWeight: 700,
    cursor: "pointer",
    background: "transparent",
    color: "#6B7280",
  },
  toggleBtnActive: {
    flex: 1,
    border: "none",
    borderRadius: 999,
    padding: "10px 12px",
    fontSize: 14,
    fontWeight: 700,
    cursor: "pointer",
    background: "#fff",
    color: DARK,
    boxShadow: "0 1px 4px rgba(0,0,0,0.08)",
  },
  socialBtn: {
    width: "100%",
    padding: "13px 16px",
    borderRadius: 12,
    border: "1.5px solid #E5E7EB",
    background: "#fff",
    fontSize: 15,
    fontWeight: 700,
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    marginBottom: 10,
  },
  socialBtnFacebook: {
    width: "100%",
    padding: "13px 16px",
    borderRadius: 12,
    border: "none",
    background: "#1877F2",
    color: "#fff",
    fontSize: 15,
    fontWeight: 700,
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    marginBottom: 18,
  },
  divider: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    marginBottom: 18,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    background: "#EEF2F6",
  },
  dividerText: {
    fontSize: 12,
    color: "#9CA3AF",
    fontWeight: 600,
  },
  label: {
    display: "block",
    fontSize: 12,
    fontWeight: 700,
    textTransform: "uppercase" as const,
    letterSpacing: "0.5px",
    color: "#6B7280",
    marginBottom: 7,
  },
  input: {
    width: "100%",
    padding: "13px 14px",
    borderRadius: 12,
    border: "1.5px solid #E5E7EB",
    fontSize: 15,
    color: DARK,
    background: "#fff",
    outline: "none",
    boxSizing: "border-box" as const,
    marginBottom: 14,
  },
  passwordWrap: {
    position: "relative" as const,
  },
  showBtn: {
    position: "absolute" as const,
    right: 10,
    top: 12,
    background: "transparent",
    border: "none",
    color: E_DARK,
    fontSize: 13,
    fontWeight: 700,
    cursor: "pointer",
  },
  rowBetween: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
    fontSize: 13,
  },
  checkboxLabel: {
    display: "flex",
    alignItems: "center",
    gap: 7,
    color: "#374151",
    cursor: "pointer",
  },
  forgot: {
    color: E_DARK,
    fontWeight: 700,
    textDecoration: "none",
    cursor: "pointer",
  },
  submitBtn: {
    width: "100%",
    padding: "14px 16px",
    borderRadius: 12,
    background: E,
    color: "#fff",
    border: "none",
    fontSize: 15,
    fontWeight: 800,
    cursor: "pointer",
  },
  errorBox: {
    background: "#FEF2F2",
    color: "#DC2626",
    border: "1px solid #FECACA",
    borderRadius: 12,
    padding: "10px 12px",
    fontSize: 13,
    marginBottom: 14,
  },
  successBox: {
    background: E_LIGHT,
    color: E_DARK,
    border: `1px solid ${E}33`,
    borderRadius: 12,
    padding: "10px 12px",
    fontSize: 13,
    marginBottom: 14,
  },
  switchText: {
    textAlign: "center" as const,
    marginTop: 18,
    fontSize: 14,
    color: "#4B5563",
  },
  switchLink: {
    color: E_DARK,
    fontWeight: 800,
    cursor: "pointer",
  },
  trustRow: {
    display: "flex",
    justifyContent: "center",
    gap: 14,
    marginTop: 16,
    flexWrap: "wrap" as const,
  },
  trustItem: {
    fontSize: 12,
    color: "#6B7280",
    fontWeight: 600,
  },
  footer: {
    textAlign: "center" as const,
    marginTop: 16,
    fontSize: 12,
    color: "#9CA3AF",
  },
};

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
          <a href="/" style={styles.backLink}>← Back to Home</a>
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

          <button type="button" style={styles.socialBtn}>
            <span style={{ fontSize: 18 }}>G</span> Continue with Google
          </button>
          <button type="button" style={styles.socialBtnFacebook}>
            <span style={{ fontSize: 16 }}>f</span> Continue with Facebook
          </button>

          <div style={styles.divider}>
            <div style={styles.dividerLine} />
            <span style={styles.dividerText}>OR WITH EMAIL</span>
            <div style={styles.dividerLine} />
          </div>

          {error && <div style={styles.errorBox}>{error}</div>}
          {success && <div style={styles.successBox}>{success}</div>}

          {mode === "signup" && (
            <div>
              <label style={styles.label}>Full Name</label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="John Smith"
                style={styles.input}
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
          />

          <label style={styles.label}>Password</label>
          <div style={styles.passwordWrap}>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="At least 6 characters"
              type={showPassword ? "text" : "password"}
              style={{ ...styles.input, paddingRight: 60 }}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              style={styles.showBtn}
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
              />
              Remember me
            </label>
            {mode === "login" && (
              <span style={styles.forgot}>Forgot password?</span>
            )}
          </div>

          <button type="button" onClick={handleSubmit} style={styles.submitBtn}>
            {mode === "login" ? "Log In →" : "Create Account →"}
          </button>

          <p style={styles.switchText}>
            {mode === "login" ? "No account? " : "Already have an account? "}
            <span
              onClick={() => { setMode(mode === "login" ? "signup" : "login"); setError(""); setSuccess(""); }}
              style={styles.switchLink}
            >
              {mode === "login" ? "Sign up free" : "Log in"}
            </span>
          </p>

          <div style={styles.trustRow}>
            <span style={styles.trustItem}>🔒 Secure</span>
            <span style={styles.trustItem}>💵 Free to join</span>
            <span style={styles.trustItem}>🇺🇸 All 50 states</span>
          </div>
        </div>

        <p style={styles.footer}>
          © {new Date().getFullYear()} ReHome · Don&apos;t throw it. ReHome it.
        </p>
      </div>
    </div>
  );
}
