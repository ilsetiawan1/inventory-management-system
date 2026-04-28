// components/landing/LandingCTA.tsx

import Link from 'next/link';
import { ArrowRight, LogIn, UserPlus } from 'lucide-react';

export function LandingCTA() {
  return (
    <section className="py-16 sm:py-20 px-5 sm:px-8 bg-white">
      <div className="max-w-4xl mx-auto">
        <div className="relative bg-gradient-to-br from-violet-600 to-indigo-700 rounded-3xl p-8 sm:p-14 text-center overflow-hidden shadow-2xl shadow-violet-200/50">

          {/* Deco blobs */}
          <div className="absolute top-0 right-0 w-60 h-60 rounded-full bg-white/10 -translate-y-1/3 translate-x-1/3 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full bg-white/10 translate-y-1/3 -translate-x-1/3 pointer-events-none" />
          {/* Dot pattern */}
          <div
            className="absolute inset-0 opacity-[0.08] pointer-events-none"
            style={{
              backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
              backgroundSize: '22px 22px',
            }}
          />

          <div className="relative">
            <p className="text-white/60 font-semibold text-xs uppercase tracking-widest mb-3">
              Mulai Sekarang
            </p>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight mb-4">
              Siap kelola inventaris lebih cerdas?
            </h2>
            <p className="text-white/65 mb-8 max-w-md mx-auto text-sm leading-relaxed">
              Sudah punya akun? Langsung masuk. Belum punya? Daftar sekarang dan mulai
              kelola persediaan barang Anda secara efisien.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/login"
                className="inline-flex items-center justify-center gap-2 bg-white text-violet-700 font-bold px-7 py-3.5 rounded-2xl hover:bg-gray-50 transition-all text-sm active:scale-95 shadow-lg"
              >
                <LogIn size={15} />
                Masuk ke Sistem
              </Link>
              <Link
                href="/register"
                className="inline-flex items-center justify-center gap-2 bg-white/15 hover:bg-white/25 text-white font-semibold px-7 py-3.5 rounded-2xl border border-white/25 transition-all text-sm active:scale-95"
              >
                <UserPlus size={15} />
                Daftar Akun Baru
                <ArrowRight size={14} />
              </Link>
            </div>

            <p className="mt-6 text-white/40 text-xs">
              Butuh bantuan? Hubungi administrator sistem Anda.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
