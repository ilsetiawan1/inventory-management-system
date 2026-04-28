'use client';
// components/auth/RegisterForm.tsx

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, Loader2, UserPlus, Check, X } from 'lucide-react';
import { toast } from 'sonner';
import { actionCreateUser } from '@/lib/actions/users';

const MAX_PASSWORD = 64;

// ─── Password strength calculator ─────────────────────────
function calcStrength(password: string) {
  if (password.length === 0) return null;
  const checks = {
    length: password.length >= 8,
    upper: /[A-Z]/.test(password),
    number: /[0-9]/.test(password),
    symbol: /[^A-Za-z0-9]/.test(password),
  };
  const score = Object.values(checks).filter(Boolean).length;

  if (password.length < 6) return { label: 'Terlalu pendek', color: 'bg-red-400', textColor: 'text-red-500', width: 'w-[15%]', checks };
  if (score <= 1) return { label: 'Lemah', color: 'bg-orange-400', textColor: 'text-orange-500', width: 'w-[35%]', checks };
  if (score === 2) return { label: 'Sedang', color: 'bg-yellow-400', textColor: 'text-yellow-600', width: 'w-[60%]', checks };
  if (score === 3) return { label: 'Kuat', color: 'bg-emerald-400', textColor: 'text-emerald-600', width: 'w-[80%]', checks };
  return { label: 'Sangat Kuat', color: 'bg-emerald-500', textColor: 'text-emerald-700', width: 'w-full', checks };
}

// ─── Requirement pill ─────────────────────────────────────
function Req({ ok, label }: { ok: boolean; label: string }) {
  return (
    <span
      className={`inline-flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded-full transition-colors ${
        ok ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-100 text-gray-400'
      }`}
    >
      {ok ? (
        <Check
          size={10}
          strokeWidth={3}
        />
      ) : (
        <X
          size={10}
          strokeWidth={3}
        />
      )}
      {label}
    </span>
  );
}

// ─── Component ────────────────────────────────────────────
export function RegisterForm() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');

  const strength = calcStrength(password);
  const passwordCount = password.length;
  const confirmCount = confirm.length;
  const passwordMatch = confirm.length > 0 && password === confirm;
  const passwordMismatch = confirm.length > 0 && password !== confirm;

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (password !== confirm) {
      toast.error('Konfirmasi password tidak cocok');
      return;
    }
    if (password.length < 6) {
      toast.error('Password minimal 6 karakter');
      return;
    }

    startTransition(async () => {
      const formData = new FormData();
      formData.set('name', name);
      formData.set('email', email);
      formData.set('password', password);
      formData.set('role', 'Admin'); // default role, admin yang ubah nanti

      const result = await actionCreateUser(formData);
      if (result.success) {
        toast.success('Akun berhasil dibuat! Silakan login.');
        router.push('/login');
      } else {
        toast.error(result.message);
      }
    });
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4"
    >
      {/* Nama Lengkap */}
      <div className="space-y-1.5">
        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide">Nama Lengkap</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Nama lengkap Anda"
          required
          disabled={isPending}
          className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-sm text-gray-900 placeholder-gray-400 outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-100 transition-all disabled:opacity-50"
        />
      </div>

      {/* Email */}
      <div className="space-y-1.5">
        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide">Email</label>
        <input
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
          <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide">Password</label>
          <span className={`text-xs font-medium tabular-nums ${passwordCount >= MAX_PASSWORD ? 'text-red-500' : 'text-gray-400'}`}>
            {passwordCount}/{MAX_PASSWORD}
          </span>
        </div>

        <div className="relative">
          <input
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Minimal 8 karakter"
            required
            disabled={isPending}
            maxLength={MAX_PASSWORD}
            autoComplete="new-password"
            className="w-full px-4 py-2.5 pr-11 rounded-xl border border-gray-200 bg-gray-50 text-sm text-gray-900 placeholder-gray-400 outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-100 transition-all disabled:opacity-50"
          />
          <button
            type="button"
            onClick={() => setShowPassword((v) => !v)}
            tabIndex={-1}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
          >
            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        </div>

        {/* Strength bar */}
        {passwordCount > 0 && strength && (
          <div className="space-y-2">
            {/* Bar */}
            <div className="h-1.5 w-full bg-gray-200 rounded-full overflow-hidden">
              <div className={`h-full rounded-full transition-all duration-500 ${strength.color} ${strength.width}`} />
            </div>
            {/* Label */}
            <div className="flex items-center justify-between">
              <span className={`text-[11px] font-semibold ${strength.textColor}`}>{strength.label}</span>
              {/* Requirement pills */}
              <div className="flex flex-wrap gap-1 justify-end">
                <Req
                  ok={strength.checks.length}
                  label="8+ karakter"
                />
                <Req
                  ok={strength.checks.upper}
                  label="Huruf besar"
                />
                <Req
                  ok={strength.checks.number}
                  label="Angka"
                />
                <Req
                  ok={strength.checks.symbol}
                  label="Simbol"
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Konfirmasi Password */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between">
          <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide">Konfirmasi Password</label>
          <span className={`text-xs font-medium tabular-nums ${confirmCount >= MAX_PASSWORD ? 'text-red-500' : 'text-gray-400'}`}>
            {confirmCount}/{MAX_PASSWORD}
          </span>
        </div>

        <div className="relative">
          <input
            type={showConfirm ? 'text' : 'password'}
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            placeholder="Ulangi password"
            required
            disabled={isPending}
            maxLength={MAX_PASSWORD}
            autoComplete="new-password"
            className={`w-full px-4 py-2.5 pr-11 rounded-xl border bg-gray-50 text-sm text-gray-900 placeholder-gray-400 outline-none focus:ring-2 transition-all disabled:opacity-50 ${
              passwordMismatch
                ? 'border-red-400 focus:border-red-400 focus:ring-red-100'
                : passwordMatch
                  ? 'border-emerald-400 focus:border-emerald-400 focus:ring-emerald-100'
                  : 'border-gray-200 focus:border-violet-500 focus:ring-violet-100'
            }`}
          />
          <button
            type="button"
            onClick={() => setShowConfirm((v) => !v)}
            tabIndex={-1}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
          >
            {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
          {/* Match indicator icon */}
          {confirmCount > 0 && (
            <div className="absolute right-9 top-1/2 -translate-y-1/2">
              {passwordMatch ? (
                <Check
                  size={15}
                  className="text-emerald-500"
                />
              ) : (
                <X
                  size={15}
                  className="text-red-400"
                />
              )}
            </div>
          )}
        </div>

        {/* Confirm bar */}
        {confirmCount > 0 && (
          <div className="space-y-1">
            <div className="h-1.5 w-full bg-gray-200 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-300 ${passwordMatch ? 'bg-emerald-400' : 'bg-red-400'}`}
                style={{ width: `${Math.min((confirmCount / MAX_PASSWORD) * 100, 100)}%` }}
              />
            </div>
            <p className={`text-[11px] font-semibold ${passwordMatch ? 'text-emerald-600' : 'text-red-500'}`}>{passwordMatch ? 'Password cocok ✓' : 'Password tidak cocok'}</p>
          </div>
        )}
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={isPending || !name || !email || !password || !confirm || !passwordMatch}
        className="w-full flex items-center justify-center gap-2 py-3 px-6 rounded-xl bg-violet-600 hover:bg-violet-700 active:scale-[0.98] text-white font-semibold text-sm transition-all shadow-md shadow-violet-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100 mt-2"
      >
        {isPending ? (
          <>
            <Loader2
              size={16}
              className="animate-spin"
            />
            Membuat akun...
          </>
        ) : (
          <>
            <UserPlus size={16} />
            Buat Akun
          </>
        )}
      </button>
    </form>
  );
}
