// components/landing/LandingCTA.tsx

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export function LandingCTA() {
  return (
    <section className="py-16 sm:py-20 px-5 sm:px-8 bg-gradient-to-b from-white to-violet-50/40">
      <div className="max-w-3xl mx-auto">
        <div className="relative bg-gradient-to-br from-violet-600 to-indigo-600 rounded-3xl p-10 sm:p-14 text-center overflow-hidden shadow-2xl shadow-violet-200">
          {/* Deco */}
          <div className="absolute top-0 right-0 w-56 h-56 rounded-full bg-white/10 -translate-y-1/3 translate-x-1/3" />
          <div className="absolute bottom-0 left-0 w-40 h-40 rounded-full bg-white/10 translate-y-1/3 -translate-x-1/3" />
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
              backgroundSize: '24px 24px',
            }}
          />

          <div className="relative">
            <p className="text-white/60 font-semibold text-xs uppercase tracking-widest mb-3">Mulai Sekarang</p>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-3">Siap kelola inventaris lebih cerdas?</h2>
            <p className="text-white/65 mb-8 max-w-sm mx-auto text-sm leading-relaxed">Masuk ke sistem atau daftarkan akun baru. Butuh bantuan? Hubungi administrator Anda.</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/login"
                className="inline-flex items-center justify-center gap-2 bg-white text-violet-700 font-bold px-7 py-3 rounded-2xl hover:bg-gray-50 transition-all text-sm active:scale-95 shadow-lg"
              >
                Masuk ke Sistem
                <ArrowRight size={15} />
              </Link>
              <Link
                href="/register"
                className="inline-flex items-center justify-center gap-2 bg-white/15 hover:bg-white/25 text-white font-semibold px-7 py-3 rounded-2xl border border-white/25 transition-all text-sm active:scale-95"
              >
                Daftar Akun Baru
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
