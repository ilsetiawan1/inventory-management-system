// components/landing/LandingHero.tsx

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { DashboardMockup } from './DashboardMockup';

const STATS = [
  { value: 'Real-time', label: 'Update Stok' },
  { value: 'Multi-role', label: 'Hak Akses' },
  { value: 'Auto HPP', label: 'Moving Average' },
];

export function LandingHero() {
  return (
    <section className="relative pt-28 pb-20 sm:pt-32 sm:pb-24 px-5 sm:px-8 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-violet-50/60" />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-violet-100/40 blur-3xl -translate-y-1/4 translate-x-1/4" />
      <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full bg-indigo-100/40 blur-3xl translate-y-1/4 -translate-x-1/4" />
      {/* Dot grid */}
      <div
        className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage: 'radial-gradient(circle, #7c3aed 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
      />

      <div className="relative max-w-6xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* Left */}
          <div className="flex-1 text-center lg:text-left w-full">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-violet-100 text-violet-700 text-xs font-semibold px-3.5 py-1.5 rounded-full mb-6 border border-violet-200/60">
              <span className="w-1.5 h-1.5 rounded-full bg-violet-500 animate-pulse" />
              Sistem Manajemen Inventaris
            </div>

            {/* Heading */}
            <h1 className="text-[2.5rem] sm:text-5xl lg:text-[3.5rem] font-extrabold text-gray-950 leading-[1.08] tracking-tight mb-5">
              Kelola Barang{' '}
              <span className="relative inline-block text-violet-600">
                Lebih Cerdas
                <svg
                  className="absolute -bottom-1.5 left-0 w-full"
                  viewBox="0 0 300 10"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2 7 C75 2, 225 2, 298 7"
                    stroke="#7c3aed"
                    strokeWidth="3"
                    strokeLinecap="round"
                    fill="none"
                    opacity="0.35"
                  />
                </svg>
              </span>
            </h1>

            {/* Description */}
            <p className="text-gray-500 text-base sm:text-lg leading-relaxed mb-9 max-w-lg mx-auto lg:mx-0">
              Pantau persediaan barang masuk & keluar, laporan real-time, dan manajemen supplier dalam satu platform terintegrasi.
            </p>

            {/* CTA buttons */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start mb-10">
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

            {/* Stats row */}
            <div className="flex flex-wrap gap-6 sm:gap-10 justify-center lg:justify-start">
              {STATS.map((s, i) => (
                <div
                  key={s.label}
                  className="flex items-center gap-2"
                >
                  {i > 0 && <div className="hidden sm:block w-px h-6 bg-gray-200" />}
                  <div>
                    <p className="text-base font-extrabold text-violet-600 leading-none">{s.value}</p>
                    <p className="text-[11px] text-gray-400 font-medium mt-0.5">{s.label}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — Mockup */}
          <div className="flex-1 w-full lg:max-w-none">
            <DashboardMockup />
          </div>
        </div>
      </div>
    </section>
  );
}
