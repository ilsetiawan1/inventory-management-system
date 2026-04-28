// app/register/page.tsx

import Link from 'next/link';
import { RegisterForm } from '@/components/auth/RegisterForm';

export default function RegisterPage() {
  return (
    <main className="min-h-screen bg-violet-600 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Decorative blobs */}
      <div className="absolute top-6 left-6 w-10 h-10 rounded-full bg-white/20" />
      <div className="absolute top-10 right-1/3 w-3 h-3 rounded-full bg-white/30" />
      <div className="absolute bottom-10 right-8 w-8 h-8 rounded-full bg-white/20" />
      <div className="absolute -bottom-20 -left-20 w-72 h-72 rounded-full bg-violet-500/40 blur-3xl" />
      <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full bg-violet-400/30 blur-3xl" />

      {/* Wavy lines */}
      <svg
        className="absolute inset-0 w-full h-full opacity-10 pointer-events-none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        <path
          d="M-100 200 Q300 80 700 200 Q1100 320 1500 200"
          fill="none"
          stroke="white"
          strokeWidth="1.5"
        />
        <path
          d="M-100 320 Q300 200 700 320 Q1100 440 1500 320"
          fill="none"
          stroke="white"
          strokeWidth="1"
        />
        <path
          d="M-100 440 Q300 320 700 440 Q1100 560 1500 440"
          fill="none"
          stroke="white"
          strokeWidth="1"
        />
        <path
          d="M-100 560 Q300 440 700 560 Q1100 680 1500 560"
          fill="none"
          stroke="white"
          strokeWidth="1.5"
        />
      </svg>

      {/* Main Card */}
      <div className="relative z-10 w-full max-w-4xl rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row bg-white">
        {/* ── Left Panel ── */}
        <div className="hidden md:flex md:w-5/12 bg-gradient-to-b from-violet-500 to-violet-700 p-10 flex-col justify-between relative overflow-hidden">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full bg-white/25 flex items-center justify-center shadow-inner">
              <svg
                width="18"
                height="18"
                viewBox="0 0 40 40"
                fill="none"
              >
                <polygon
                  points="20,4 36,32 4,32"
                  fill="none"
                  stroke="#fbbf24"
                  strokeWidth="3"
                />
                <line
                  x1="20"
                  y1="4"
                  x2="20"
                  y2="32"
                  stroke="#fbbf24"
                  strokeWidth="2"
                />
                <line
                  x1="12"
                  y1="18"
                  x2="28"
                  y2="18"
                  stroke="#fbbf24"
                  strokeWidth="2"
                />
              </svg>
            </div>
            <span className="text-white font-bold text-base tracking-tight">CV Akurat Sukses Sejati</span>
          </div>

          <div className="space-y-3">
            <h2 className="text-white font-extrabold text-[1.75rem] leading-snug">
              Daftar dan mulai <span className="text-yellow-300">kelola</span> inventaris Anda
            </h2>
            <p className="text-white/70 text-sm leading-relaxed">Buat akun baru untuk mengakses sistem informasi persediaan barang secara penuh dan real-time.</p>
          </div>

          {/* Steps */}
          <div className="space-y-3">
            {[
              { step: '1', text: 'Isi data akun dengan lengkap' },
              { step: '2', text: 'Admin akan mengatur hak akses Anda' },
              { step: '3', text: 'Mulai kelola persediaan barang' },
            ].map((item) => (
              <div
                key={item.step}
                className="flex items-center gap-3"
              >
                <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-xs font-bold">{item.step}</span>
                </div>
                <span className="text-white/80 text-sm">{item.text}</span>
              </div>
            ))}
          </div>

          <div className="absolute -bottom-12 -right-12 w-44 h-44 rounded-full bg-white/10" />
          <div className="absolute top-1/2 -left-10 w-28 h-28 rounded-full bg-white/10" />
        </div>

        {/* ── Right Panel ── */}
        <div className="flex-1 flex flex-col justify-center px-7 py-10 sm:px-12 overflow-y-auto max-h-screen">
          {/* Mobile branding */}
          <div className="flex items-center gap-2 mb-5 md:hidden">
            <svg
              width="22"
              height="22"
              viewBox="0 0 40 40"
              fill="none"
            >
              <polygon
                points="20,4 36,32 4,32"
                fill="none"
                stroke="#7c3aed"
                strokeWidth="3"
              />
              <line
                x1="20"
                y1="4"
                x2="20"
                y2="32"
                stroke="#7c3aed"
                strokeWidth="2"
              />
              <line
                x1="12"
                y1="18"
                x2="28"
                y2="18"
                stroke="#7c3aed"
                strokeWidth="2"
              />
            </svg>
            <span className="font-bold text-violet-700 text-sm">CV Akurat Sukses Sejati</span>
          </div>

          <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight">Buat Akun</h1>
          <p className="text-sm text-gray-400 mt-1 mb-7">Isi informasi di bawah untuk mendaftar ke sistem.</p>

          <RegisterForm />

          <p className="text-center text-sm text-gray-400 mt-6">
            Sudah punya akun?{' '}
            <Link
              href="/login"
              className="text-violet-600 font-semibold hover:underline transition-colors"
            >
              Masuk
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
