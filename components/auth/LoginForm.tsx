'use client';
// components/auth/LoginForm.tsx

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, Loader2, LogIn } from 'lucide-react';
import { toast } from 'sonner';
import { actionLogin } from '@/lib/actions/auth';

const MAX_PASSWORD = 64;

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
    <form
      onSubmit={handleSubmit}
      className="space-y-5"
    >
      {/* Email */}
      <div className="space-y-1.5">
        <label
          htmlFor="email"
          className="block text-xs font-semibold text-gray-500 uppercase tracking-wide"
        >
          Email
        </label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="contoh@email.com"
          required
          disabled={isPending}
          autoComplete="email"
          className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-sm text-gray-900 placeholder-gray-400 outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-100 transition-all disabled:opacity-50"
        />
      </div>

      {/* Password */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between">
          <label
            htmlFor="password"
            className="block text-xs font-semibold text-gray-500 uppercase tracking-wide"
          >
            Password
          </label>
          {/* Character counter saja — tanpa strength bar */}
          <span className={`text-xs font-medium tabular-nums ${password.length >= MAX_PASSWORD ? 'text-red-500' : 'text-gray-400'}`}>
            {password.length}/{MAX_PASSWORD}
          </span>
        </div>

        <div className="relative">
          <input
            id="password"
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            required
            disabled={isPending}
            maxLength={MAX_PASSWORD}
            autoComplete="current-password"
            className="w-full px-4 py-2.5 pr-11 rounded-xl border border-gray-200 bg-gray-50 text-sm text-gray-900 placeholder-gray-400 outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-100 transition-all disabled:opacity-50"
          />
          <button
            type="button"
            onClick={() => setShowPassword((v) => !v)}
            tabIndex={-1}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
            aria-label={showPassword ? 'Sembunyikan password' : 'Tampilkan password'}
          >
            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        </div>
        {/* ↑ Tidak ada strength bar di sini — hanya di halaman Register */}
      </div>

      {/* Remember me + Lupa password */}
      <div className="flex items-center justify-between">
        <label className="flex items-center gap-2 cursor-pointer select-none">
          <input
            type="checkbox"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
            disabled={isPending}
            className="w-4 h-4 rounded accent-violet-600"
          />
          <span className="text-sm text-gray-500">Remember for 30 days</span>
        </label>
        <button
          type="button"
          className="text-sm text-violet-600 font-semibold hover:underline transition-colors"
        >
          Lupa password?
        </button>
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={isPending || !email || !password}
        className="w-full flex items-center justify-center gap-2 py-3 px-6 rounded-xl bg-violet-600 hover:bg-violet-700 active:scale-[0.98] text-white font-semibold text-sm transition-all shadow-md shadow-violet-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100"
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
  );
}
