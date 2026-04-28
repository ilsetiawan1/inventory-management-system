'use client';
// components/auth/LoginForm.tsx

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, ArrowRight, Lock } from 'lucide-react';
import { toast } from 'sonner';
import { actionLogin } from '@/lib/actions/auth';
import { LoadingSpinner } from '@/components/shared/LoadingSpinner';

const MAX_PASSWORD = 12;

export function LoginForm() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [focused, setFocused] = useState<'email' | 'password' | null>(null);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData();
    formData.set('email', email);
    formData.set('password', password);

    startTransition(async () => {
      const result = await actionLogin(formData);
      if (result.success) {
        toast.success(`Selamat datang, ${result.data?.name ?? ''}!`);
        router.push('/dashboard');
        router.refresh();
      } else {
        toast.error(result.message);
      }
    });
  }

  const isValid = email.trim().length > 0 && password.length > 0;
  const isNearLimit = password.length >= MAX_PASSWORD - 2;
  const isAtLimit = password.length >= MAX_PASSWORD;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700&family=DM+Sans:wght@300;400;500&display=swap');

        .lf-wrap * {
          font-family: 'DM Sans', sans-serif;
        }
        .lf-title {
          font-family: 'Sora', sans-serif;
        }

        /* ── Field container ── */
        .lf-field {
          position: relative;
          border-radius: 14px;
          background: #f8f7fc;
          border: 1.5px solid #ede9f8;
          transition: border-color 0.2s ease, background 0.2s ease, box-shadow 0.2s ease;
          overflow: hidden;
        }
        .lf-field:hover {
          border-color: #d8d0f0;
          background: #faf9fd;
        }
        .lf-field.is-focused {
          border-color: #7c3aed;
          background: #fff;
          box-shadow: 0 0 0 4px rgba(124,58,237,0.08);
        }
        .lf-field.is-disabled {
          opacity: 0.55;
        }

        /* ── Label (floating) ── */
        .lf-label {
          position: absolute;
          left: 16px;
          top: 50%;
          transform: translateY(-50%);
          font-size: 14px;
          font-weight: 400;
          color: #b0a8c8;
          pointer-events: none;
          transition: all 0.18s cubic-bezier(0.4, 0, 0.2, 1);
          transform-origin: left center;
          line-height: 1;
        }
        .lf-label.is-active {
          top: 13px;
          transform: translateY(0) scale(0.75);
          color: #7c3aed;
          font-weight: 500;
        }

        /* ── Input ── */
        .lf-input {
          width: 100%;
          height: 58px;
          padding: 22px 16px 8px;
          border: none;
          background: transparent;
          font-size: 14.5px;
          font-family: 'DM Sans', sans-serif;
          font-weight: 500;
          color: #1a1625;
          outline: none;
          -webkit-appearance: none;
          caret-color: #7c3aed;
        }
        .lf-input::placeholder { color: transparent; }
        .lf-input:disabled { cursor: not-allowed; }
        .lf-input-pr { padding-right: 52px; }

        /* ── Password dots ── */
        .lf-input[type='password'] {
          letter-spacing: 0.15em;
          font-size: 16px;
        }

        /* ── Strength dots ── */
        .pw-dots {
          display: flex;
          gap: 4px;
          padding: 0 16px 10px;
        }
        .pw-dot {
          flex: 1;
          height: 2.5px;
          border-radius: 99px;
          background: #ede9f8;
          transition: background 0.25s ease;
        }
        .pw-dot.filled-weak   { background: #f87171; }
        .pw-dot.filled-mid    { background: #fbbf24; }
        .pw-dot.filled-strong { background: #34d399; }

        /* ── Submit button ── */
        .btn-submit {
          position: relative;
          width: 100%;
          height: 54px;
          border-radius: 14px;
          border: none;
          font-family: 'Sora', sans-serif;
          font-size: 14px;
          font-weight: 600;
          color: white;
          letter-spacing: -0.01em;
          cursor: pointer;
          overflow: hidden;
          transition: transform 0.15s ease, box-shadow 0.15s ease, opacity 0.15s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
        }
        .btn-submit:not(:disabled) {
          background: linear-gradient(135deg, #7c3aed 0%, #5b21b6 100%);
          box-shadow: 0 4px 20px rgba(109,40,217,0.35), 0 1px 4px rgba(0,0,0,0.08);
        }
        .btn-submit:disabled {
          background: linear-gradient(135deg, #c4b5fd 0%, #a78bfa 100%);
          cursor: not-allowed;
          box-shadow: none;
        }
        .btn-submit:not(:disabled):hover {
          transform: translateY(-1.5px);
          box-shadow: 0 8px 28px rgba(109,40,217,0.4), 0 2px 6px rgba(0,0,0,0.1);
        }
        .btn-submit:not(:disabled):active {
          transform: scale(0.985) translateY(0);
          box-shadow: 0 2px 10px rgba(109,40,217,0.3);
        }

        /* Shimmer on hover */
        .btn-submit::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(105deg, transparent 35%, rgba(255,255,255,0.18) 50%, transparent 65%);
          background-size: 250% 100%;
          background-position: -100% center;
          transition: background-position 0s;
        }
        .btn-submit:not(:disabled):hover::after {
          background-position: 200% center;
          transition: background-position 0.6s ease;
        }

        /* ── Checkbox custom ── */
        .lf-checkbox {
          width: 18px;
          height: 18px;
          border-radius: 6px;
          border: 1.5px solid;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          transition: all 0.15s ease;
        }

        /* ── Divider ── */
        .lf-divider {
          display: flex;
          align-items: center;
          gap: 12px;
          margin: 20px 0 0;
        }
        .lf-divider-line {
          flex: 1;
          height: 1px;
          background: #f0ecfa;
        }

        /* ── Fade-in animation ── */
        @keyframes lf-fade-up {
          from { opacity: 0; transform: translateY(6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .lf-wrap > * {
          animation: lf-fade-up 0.35s ease both;
        }
        .lf-wrap > *:nth-child(1) { animation-delay: 0.05s; }
        .lf-wrap > *:nth-child(2) { animation-delay: 0.10s; }
        .lf-wrap > *:nth-child(3) { animation-delay: 0.15s; }
        .lf-wrap > *:nth-child(4) { animation-delay: 0.20s; }
        .lf-wrap > *:nth-child(5) { animation-delay: 0.25s; }
        .lf-wrap > *:nth-child(6) { animation-delay: 0.30s; }
      `}</style>

      <div className="lf-wrap">

        {/* ── Header ── */}
        <div style={{ marginBottom: 28 }}>
          <h1
            className="lf-title"
            style={{
              fontSize: 28,
              fontWeight: 700,
              color: '#0f0a1e',
              letterSpacing: '-0.04em',
              lineHeight: 1.1,
              margin: 0,
            }}
          >
            Selamat datang
          </h1>
          <p
            style={{
              fontSize: 13.5,
              color: '#9891b0',
              marginTop: 8,
              fontWeight: 400,
              lineHeight: 1.5,
            }}
          >
            Masuk ke sistem inventaris{' '}
            <span style={{ color: '#5b21b6', fontWeight: 600 }}>
              CV Akurat Sukses Sejati
            </span>
          </p>
        </div>

        {/* ── Form ── */}
        <form onSubmit={handleSubmit} noValidate style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>

          {/* Email */}
          <div>
            <div className={`lf-field${focused === 'email' ? ' is-focused' : ''}${isPending ? ' is-disabled' : ''}`}>
              <label htmlFor="email" className={`lf-label${email || focused === 'email' ? ' is-active' : ''}`}>
                Alamat Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onFocus={() => setFocused('email')}
                onBlur={() => setFocused(null)}
                placeholder="nama@perusahaan.com"
                required
                disabled={isPending}
                autoComplete="email"
                className="lf-input"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <div className={`lf-field${focused === 'password' ? ' is-focused' : ''}${isPending ? ' is-disabled' : ''}`}
              style={{ paddingBottom: password.length > 0 ? 0 : undefined }}
            >
              <label htmlFor="password" className={`lf-label${password || focused === 'password' ? ' is-active' : ''}`}>
                Password
              </label>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={() => setFocused('password')}
                  onBlur={() => setFocused(null)}
                  placeholder="••••••••••••"
                  required
                  disabled={isPending}
                  maxLength={MAX_PASSWORD}
                  autoComplete="current-password"
                  className={`lf-input lf-input-pr`}
                  style={{ flex: 1 }}
                />
                {/* Counter + toggle */}
                <div style={{ position: 'absolute', right: 14, display: 'flex', alignItems: 'center', gap: 6 }}>
                  {password.length > 0 && (
                    <span
                      style={{
                        fontSize: 10.5,
                        fontWeight: 600,
                        fontVariantNumeric: 'tabular-nums',
                        color: isAtLimit ? '#ef4444' : isNearLimit ? '#f59e0b' : '#c4b8e0',
                        letterSpacing: '0.02em',
                        transition: 'color 0.2s',
                        lineHeight: 1,
                      }}
                    >
                      {password.length}/{MAX_PASSWORD}
                    </span>
                  )}
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    tabIndex={-1}
                    aria-label={showPassword ? 'Sembunyikan password' : 'Tampilkan password'}
                    style={{
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      padding: '4px',
                      color: focused === 'password' ? '#7c3aed' : '#c4b8e0',
                      display: 'flex',
                      transition: 'color 0.15s',
                    }}
                  >
                    {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
                  </button>
                </div>
              </div>

              {/* Strength bar */}
              {password.length > 0 && (
                <div className="pw-dots">
                  {Array.from({ length: MAX_PASSWORD }).map((_, i) => {
                    const filled = i < password.length;
                    let cls = '';
                    if (filled) {
                      if (password.length <= 4) cls = 'filled-weak';
                      else if (password.length <= 8) cls = 'filled-mid';
                      else cls = 'filled-strong';
                    }
                    return <div key={i} className={`pw-dot${cls ? ` ${cls}` : ''}`} />;
                  })}
                </div>
              )}
            </div>
          </div>

          {/* Remember + Forgot */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '2px 0' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: 9, cursor: 'pointer', userSelect: 'none' }}>
              <div className="relative">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  disabled={isPending}
                  style={{ position: 'absolute', opacity: 0, width: 0, height: 0 }}
                />
                <div
                  className="lf-checkbox"
                  style={{
                    borderColor: rememberMe ? '#7c3aed' : '#ddd8ee',
                    background: rememberMe ? '#7c3aed' : 'transparent',
                  }}
                >
                  {rememberMe && (
                    <svg width="9" height="7" viewBox="0 0 10 8" fill="none">
                      <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </div>
              </div>
              <span style={{ fontSize: 13, color: '#7a7090', fontWeight: 400 }}>Ingat selama 30 hari</span>
            </label>

            <button
              type="button"
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                fontSize: 13,
                fontWeight: 600,
                color: '#7c3aed',
                padding: 0,
                fontFamily: 'DM Sans, sans-serif',
                transition: 'color 0.15s',
                textDecoration: 'none',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#5b21b6')}
              onMouseLeave={(e) => (e.currentTarget.style.color = '#7c3aed')}
            >
              Lupa password?
            </button>
          </div>

          {/* Submit */}
          <div style={{ marginTop: 4 }}>
            <button
              type="submit"
              disabled={isPending || !isValid}
              className="btn-submit"
            >
              {isPending ? (
                <>
                  <LoadingSpinner size={15} />
                  <span>Masuk...</span>
                </>
              ) : (
                <>
                  <span>Masuk ke Sistem</span>
                  <ArrowRight size={15} strokeWidth={2.5} />
                </>
              )}
            </button>
          </div>
        </form>

        {/* ── Footer ── */}
        <div className="lf-divider">
          <div className="lf-divider-line" />
          <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
            <Lock size={10} style={{ color: '#cdc7e0' }} />
            <span style={{ fontSize: 11, color: '#cdc7e0', whiteSpace: 'nowrap', letterSpacing: '0.01em' }}>
              Akses terbatas — karyawan CV Akurat Sukses Sejati
            </span>
          </div>
          <div className="lf-divider-line" />
        </div>

      </div>
    </>
  );
}