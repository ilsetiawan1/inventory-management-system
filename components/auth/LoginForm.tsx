'use client';
// components/auth/LoginForm.tsx
// Form login interaktif — Client Component

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, Loader2, LogIn } from 'lucide-react';
import { toast } from 'sonner';
import { actionLogin } from '@/lib/actions/auth';

export function LoginForm() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
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

  return (
    <div className="login-card">
      <h2 className="login-card-title">Selamat datang</h2>

      <form
        onSubmit={handleSubmit}
        className="login-form"
      >
        {/* Email */}
        <div className="login-field">
          <label
            htmlFor="email"
            className="label"
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            className="input-field"
            placeholder="Silakan masukan email anda"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="email"
            disabled={isPending}
          />
        </div>

        {/* Password */}
        <div className="login-field">
          <label
            htmlFor="password"
            className="label"
          >
            Password
          </label>
          <div className="input-password-wrapper">
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              className="input-field"
              placeholder="••••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
              disabled={isPending}
            />
            <button
              type="button"
              className="input-password-toggle"
              onClick={() => setShowPassword((v) => !v)}
              tabIndex={-1}
              aria-label={showPassword ? 'Sembunyikan password' : 'Tampilkan password'}
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
        </div>

        {/* Remember me + Lupa password */}
        <div className="login-options">
          <label className="login-remember">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              disabled={isPending}
            />
            <span>Remember for 30 days</span>
          </label>
          <button
            type="button"
            className="login-forgot"
          >
            Lupa password?
          </button>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="btn-primary login-submit"
          disabled={isPending || !email || !password}
        >
          {isPending ? (
            <>
              <Loader2
                size={16}
                className="animate-spin"
              />
              Masuk...
            </>
          ) : (
            <>
              <LogIn size={16} />
              Login
            </>
          )}
        </button>
      </form>
    </div>
  );
}
