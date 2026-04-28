// components/landing/LandingFeatures.tsx

import {
  Package,
  TrendingUp,
  ShieldCheck,
  BarChart3,
  Boxes,
  Truck,
  ClipboardList,
  Calculator,
} from 'lucide-react';

const FEATURES = [
  {
    icon: Boxes,
    title: 'Manajemen Barang',
    desc: 'Kelola data barang lengkap dengan kategori, satuan, harga beli/jual, dan foto produk.',
    color: 'text-violet-600',
    bg: 'bg-violet-50',
    border: 'hover:border-violet-200 hover:bg-violet-50/50',
  },
  {
    icon: Truck,
    title: 'Barang Masuk',
    desc: 'Catat penerimaan dari supplier dengan kalkulasi HPP moving average otomatis.',
    color: 'text-emerald-600',
    bg: 'bg-emerald-50',
    border: 'hover:border-emerald-200 hover:bg-emerald-50/50',
  },
  {
    icon: TrendingUp,
    title: 'Barang Keluar',
    desc: 'Validasi stok otomatis sebelum pengeluaran — tidak perlu hitung manual lagi.',
    color: 'text-amber-600',
    bg: 'bg-amber-50',
    border: 'hover:border-amber-200 hover:bg-amber-50/50',
  },
  {
    icon: BarChart3,
    title: 'Laporan & Dashboard',
    desc: 'Grafik transaksi, statistik persediaan, dan laporan siap cetak kapan saja.',
    color: 'text-sky-600',
    bg: 'bg-sky-50',
    border: 'hover:border-sky-200 hover:bg-sky-50/50',
  },
  {
    icon: Package,
    title: 'Persediaan Real-time',
    desc: 'Stok terupdate otomatis setiap ada transaksi masuk & keluar via trigger database.',
    color: 'text-pink-600',
    bg: 'bg-pink-50',
    border: 'hover:border-pink-200 hover:bg-pink-50/50',
  },
  {
    icon: ClipboardList,
    title: 'Manajemen Supplier',
    desc: 'Data supplier lengkap dengan kode unik otomatis dan riwayat pengiriman.',
    color: 'text-indigo-600',
    bg: 'bg-indigo-50',
    border: 'hover:border-indigo-200 hover:bg-indigo-50/50',
  },
  {
    icon: ShieldCheck,
    title: 'Hak Akses',
    desc: 'Kontrol akses berbasis peran: Admin, Manajer, dan Direktur Utama.',
    color: 'text-teal-600',
    bg: 'bg-teal-50',
    border: 'hover:border-teal-200 hover:bg-teal-50/50',
  },
  {
    icon: Calculator,
    title: 'Kalkulasi HPP',
    desc: 'Harga pokok penjualan dihitung otomatis dengan metode rata-rata bergerak.',
    color: 'text-orange-600',
    bg: 'bg-orange-50',
    border: 'hover:border-orange-200 hover:bg-orange-50/50',
  },
];

export function LandingFeatures() {
  return (
    <section id="fitur" className="py-20 sm:py-28 px-5 sm:px-8 bg-white">
      <div className="max-w-6xl mx-auto">

        {/* Section header */}
        <div className="text-center mb-14">
          <span className="inline-block text-violet-600 font-semibold text-xs uppercase tracking-widest mb-3 bg-violet-50 px-3.5 py-1.5 rounded-full border border-violet-100">
            Fitur Unggulan
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-950 tracking-tight mt-3">
            Semua yang Anda butuhkan
          </h2>
          <p className="text-gray-400 mt-3 max-w-md mx-auto text-sm leading-relaxed">
            Dirancang khusus untuk manajemen persediaan barang CV Akurat Sukses Sejati
            — efisien, akurat, dan mudah digunakan.
          </p>
        </div>

        {/* Feature grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {FEATURES.map((f) => {
            const Icon = f.icon;
            return (
              <div
                key={f.title}
                className={`group bg-white border border-gray-150 shadow-[0_1px_3px_rgba(0,0,0,0.06)] ${f.border} rounded-2xl p-5 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 cursor-default`}
                style={{ borderColor: '#e8e8e8' }}
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 ${f.bg} group-hover:scale-110 transition-transform shrink-0`}>
                  <Icon size={20} className={f.color} />
                </div>
                <h3 className="font-bold text-gray-900 text-sm mb-2">{f.title}</h3>
                <p className="text-xs text-gray-500 leading-relaxed">{f.desc}</p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
