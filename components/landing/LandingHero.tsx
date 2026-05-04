// components/landing/LandingHero.tsx

import Link from 'next/link';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { DashboardMockup } from './DashboardMockup';

const TRUST_POINTS = [
  'Stok terupdate otomatis real-time',
  'Kalkulasi HPP metode moving average',
  'Multi-role: Admin, Manajer, Direktur',
];

const STATS = [
  { value: '8+', label: 'Modul Fitur' },
  { value: '100%', label: 'Akurasi Stok' },
  { value: 'Real-time', label: 'Update Data' },
];

export function LandingHero() {
  return (
    <section className="relative pt-24 pb-16 sm:pt-28 sm:pb-20 lg:pt-32 lg:pb-24 px-5 sm:px-8 overflow-hidden">
      {/* Background layers */}
      <div className="absolute inset-0 bg-linear-to-br from-slate-50 via-white to-violet-50/70" />
      <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-violet-100/30 blur-3xl -translate-y-1/3 translate-x-1/4 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-indigo-100/30 blur-3xl translate-y-1/3 -translate-x-1/4 pointer-events-none" />
      {/* Dot grid */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, #7c3aed 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
      />

      <div className="relative max-w-6xl mx-auto">
        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">

          {/* ── Left: Text ── */}
          <div className="text-center lg:text-left">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-violet-100 text-violet-700 text-xs font-semibold px-3.5 py-1.5 rounded-full mb-5 border border-violet-200/50">
              <span className="w-1.5 h-1.5 rounded-full bg-violet-500 animate-pulse shrink-0" />
              Sistem Manajemen Inventaris — CV Akurat Sukses Sejati
            </div>

            {/* Headline */}
            <h1 className="text-[2.2rem] sm:text-5xl lg:text-[3.25rem] font-extrabold text-gray-950 leading-[1.1] tracking-tight mb-5">
              Kelola Inventaris{' '}
              <span className="relative inline-block text-violet-600">
                Lebih Cerdas
                <svg
                  className="absolute -bottom-1 left-0 w-full"
                  viewBox="0 0 300 10"
                  fill="none"
                >
                  <path
                    d="M2 7 C75 2, 225 2, 298 7"
                    stroke="#7c3aed"
                    strokeWidth="3"
                    strokeLinecap="round"
                    opacity="0.4"
                  />
                </svg>
              </span>
            </h1>

            {/* Description */}
            <p className="text-gray-500 text-base sm:text-lg leading-relaxed mb-7 max-w-lg mx-auto lg:mx-0">
              Platform terintegrasi untuk memantau stok barang, mencatat transaksi masuk &amp; keluar,
              mengelola supplier, dan menghasilkan laporan akurat — semuanya dalam satu sistem.
            </p>

            {/* Trust checkpoints */}
            <ul className="flex flex-col gap-2 mb-8 max-w-sm mx-auto lg:mx-0">
              {TRUST_POINTS.map((p) => (
                <li key={p} className="flex items-center gap-2.5 text-sm text-gray-600 justify-center lg:justify-start">
                  <CheckCircle2 size={16} className="text-violet-500 shrink-0" />
                  {p}
                </li>
              ))}
            </ul>

            {/* CTA buttons */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
              <Link
                href="/login"
                className="inline-flex items-center justify-center gap-2 bg-violet-600 hover:bg-violet-700 text-white font-bold px-7 py-3.5 rounded-2xl transition-all shadow-lg shadow-violet-200/80 active:scale-95 text-sm"
              >
                Masuk ke Sistem
                <ArrowRight size={15} />
              </Link>
              <Link
                href="/register"
                className="inline-flex items-center justify-center gap-2 bg-white hover:bg-gray-50 text-gray-700 font-semibold px-7 py-3.5 rounded-2xl border border-gray-200 hover:border-gray-300 transition-all text-sm active:scale-95 shadow-sm"
              >
                Daftar Akun Baru
              </Link>
            </div>

            {/* Stats strip */}
            <div className="mt-10 flex flex-wrap gap-x-8 gap-y-4 justify-center lg:justify-start border-t border-gray-100 pt-8">
              {STATS.map((s, i) => (
                <div key={s.label} className="flex items-center gap-3">
                  {i > 0 && <div className="hidden sm:block w-px h-8 bg-gray-200" />}
                  <div>
                    <p className="text-lg font-extrabold text-violet-600 leading-none">{s.value}</p>
                    <p className="text-xs text-gray-400 font-medium mt-0.5">{s.label}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── Right: Mockup ── */}
          <div className="order-1 lg:order-2 w-full">
            <DashboardMockup />
          </div>

        </div>
      </div>
    </section>
  );
}

