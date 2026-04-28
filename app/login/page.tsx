// app/login/page.tsx

import Link from 'next/link';
import { LoginForm } from '@/components/auth/LoginForm';

export default function LoginPage() {
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
              Kelola persediaan <span className="text-yellow-300">barang</span> dengan mudah
            </h2>
            <p className="text-white/70 text-sm leading-relaxed">Sistem informasi persediaan CV Akurat Sukses Sejati — efisien, akurat, dan real-time.</p>
          </div>

          {/* Illustration */}
          <div className="flex justify-center py-4">
            <svg
              viewBox="0 0 220 175"
              className="w-56 drop-shadow-lg"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                x="60"
                y="95"
                width="100"
                height="72"
                rx="8"
                fill="white"
                fillOpacity="0.2"
              />
              <rect
                x="60"
                y="95"
                width="100"
                height="22"
                rx="8"
                fill="white"
                fillOpacity="0.35"
              />
              <rect
                x="98"
                y="83"
                width="24"
                height="18"
                rx="4"
                fill="white"
                fillOpacity="0.4"
              />
              <g transform="rotate(-14, 70, 80)">
                <rect
                  x="18"
                  y="30"
                  width="62"
                  height="82"
                  rx="7"
                  fill="white"
                  fillOpacity="0.3"
                />
                <rect
                  x="26"
                  y="40"
                  width="46"
                  height="9"
                  rx="3"
                  fill="white"
                  fillOpacity="0.6"
                />
                <rect
                  x="26"
                  y="54"
                  width="36"
                  height="5"
                  rx="2"
                  fill="white"
                  fillOpacity="0.4"
                />
                <rect
                  x="26"
                  y="63"
                  width="28"
                  height="5"
                  rx="2"
                  fill="white"
                  fillOpacity="0.3"
                />
                <rect
                  x="26"
                  y="72"
                  width="22"
                  height="5"
                  rx="2"
                  fill="white"
                  fillOpacity="0.25"
                />
              </g>
              <g transform="rotate(12, 155, 75)">
                <rect
                  x="120"
                  y="22"
                  width="62"
                  height="82"
                  rx="7"
                  fill="white"
                  fillOpacity="0.3"
                />
                <rect
                  x="128"
                  y="32"
                  width="14"
                  height="14"
                  rx="4"
                  fill="#fbbf24"
                  fillOpacity="0.85"
                />
                <rect
                  x="147"
                  y="34"
                  width="26"
                  height="5"
                  rx="2"
                  fill="white"
                  fillOpacity="0.6"
                />
                <rect
                  x="128"
                  y="52"
                  width="46"
                  height="5"
                  rx="2"
                  fill="white"
                  fillOpacity="0.4"
                />
                <rect
                  x="128"
                  y="62"
                  width="36"
                  height="5"
                  rx="2"
                  fill="white"
                  fillOpacity="0.3"
                />
                <rect
                  x="128"
                  y="72"
                  width="28"
                  height="5"
                  rx="2"
                  fill="white"
                  fillOpacity="0.25"
                />
              </g>
              <circle
                cx="155"
                cy="135"
                r="18"
                fill="none"
                stroke="white"
                strokeWidth="4.5"
                strokeOpacity="0.65"
              />
              <line
                x1="167"
                y1="147"
                x2="178"
                y2="160"
                stroke="white"
                strokeWidth="5"
                strokeLinecap="round"
                strokeOpacity="0.7"
              />
            </svg>
          </div>

          <div className="absolute -bottom-12 -right-12 w-44 h-44 rounded-full bg-white/10" />
          <div className="absolute top-1/2 -left-10 w-28 h-28 rounded-full bg-white/10" />
        </div>

        {/* ── Right Panel ── */}
        <div className="flex-1 flex flex-col justify-center px-7 py-10 sm:px-12">
          {/* Mobile branding */}
          <div className="flex items-center gap-2 mb-6 md:hidden">
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

          <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight">Login</h1>
          <p className="text-sm text-gray-400 mt-1 mb-8">Selamat datang kembali! Masuk ke sistem inventaris.</p>

          <LoginForm />

          <p className="text-center text-sm text-gray-400 mt-6">
            Belum punya akun? {/* Pakai next/link agar routing berjalan dengan benar */}
            <Link
              href="/register"
              className="text-violet-600 font-semibold hover:underline transition-colors"
            >
              Buat Akun
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
