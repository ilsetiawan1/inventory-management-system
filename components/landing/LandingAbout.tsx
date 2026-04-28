// components/landing/LandingAbout.tsx
// Section tentang sistem — informasi domain inventory

import { Building2, MapPin, Phone } from 'lucide-react';

const MODULES = [
  { label: 'Data Barang', count: '148+' },
  { label: 'Kategori', count: '30+' },
  { label: 'Supplier', count: '20+' },
  { label: 'Pengguna', count: '3 Role' },
];

export function LandingAbout() {
  return (
    <section id="tentang" className="py-20 sm:py-28 px-5 sm:px-8 bg-gray-50/70">
      <div className="max-w-6xl mx-auto">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* Left: info */}
          <div>
            <span className="inline-block text-violet-600 font-semibold text-xs uppercase tracking-widest mb-3 bg-violet-50 px-3.5 py-1.5 rounded-full border border-violet-100">
              Tentang Sistem
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-950 tracking-tight mt-3 mb-5">
              Dibangun untuk{' '}
              <span className="text-violet-600">CV Akurat Sukses Sejati</span>
            </h2>
            <p className="text-gray-500 text-sm sm:text-base leading-relaxed mb-6">
              Sistem Informasi Persediaan ini dirancang khusus untuk mendukung operasional
              gudang dan toko CV Akurat Sukses Sejati — distributor peralatan timbangan
              dan sensor industri.
            </p>
            <p className="text-gray-500 text-sm sm:text-base leading-relaxed mb-8">
              Dengan arsitektur berbasis <strong className="text-gray-700">Supabase</strong> dan{' '}
              <strong className="text-gray-700">Next.js App Router</strong>, sistem ini mampu
              mengelola transaksi barang masuk &amp; keluar, menghitung HPP secara otomatis,
              serta menyajikan laporan persediaan secara akurat dan real-time.
            </p>

            {/* Company info */}
            <div className="space-y-3 border-t border-gray-200 pt-6">
              <div className="flex items-start gap-3 text-sm text-gray-600">
                <Building2 size={16} className="text-violet-500 mt-0.5 shrink-0" />
                <span>CV Akurat Sukses Sejati</span>
              </div>
              <div className="flex items-start gap-3 text-sm text-gray-600">
                <MapPin size={16} className="text-violet-500 mt-0.5 shrink-0" />
                <span>Indonesia</span>
              </div>
              <div className="flex items-start gap-3 text-sm text-gray-600">
                <Phone size={16} className="text-violet-500 mt-0.5 shrink-0" />
                <span>Hubungi administrator untuk info lebih lanjut</span>
              </div>
            </div>
          </div>

          {/* Right: stats cards */}
          <div className="grid grid-cols-2 gap-4">
            {MODULES.map((m) => (
              <div
                key={m.label}
                className="bg-white rounded-2xl border border-gray-100 p-6 hover:shadow-md hover:-translate-y-0.5 transition-all"
              >
                <p className="text-3xl font-extrabold text-violet-600 mb-1">{m.count}</p>
                <p className="text-sm text-gray-500 font-medium">{m.label}</p>
              </div>
            ))}

            {/* Highlight card full width */}
            <div className="col-span-2 bg-gradient-to-br from-violet-600 to-indigo-600 rounded-2xl p-6 text-white">
              <p className="text-xs font-semibold text-white/70 uppercase tracking-widest mb-2">Teknologi</p>
              <div className="flex flex-wrap gap-2">
                {['Next.js 15', 'Supabase', 'TypeScript', 'PostgreSQL', 'Row Level Security'].map((t) => (
                  <span
                    key={t}
                    className="text-xs font-semibold bg-white/15 border border-white/20 px-2.5 py-1 rounded-full"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
