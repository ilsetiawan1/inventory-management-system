// components/landing/LandingFeatures.tsx

import { Package, TrendingUp, ShieldCheck, BarChart3, Boxes, Truck, ClipboardList, Calculator } from 'lucide-react';

const FEATURES = [
  {
    icon: <Boxes size={20} />,
    title: 'Manajemen Barang',
    desc: 'Kelola data barang lengkap dengan kategori, satuan, harga, dan foto produk.',
    color: 'bg-violet-100 text-violet-600',
    border: 'hover:border-violet-200',
  },
  {
    icon: <Truck size={20} />,
    title: 'Barang Masuk',
    desc: 'Catat penerimaan dari supplier dengan kalkulasi HPP otomatis.',
    color: 'bg-emerald-100 text-emerald-600',
    border: 'hover:border-emerald-200',
  },
  {
    icon: <TrendingUp size={20} />,
    title: 'Barang Keluar',
    desc: 'Validasi stok otomatis sebelum pengeluaran — tidak perlu hitung manual.',
    color: 'bg-amber-100 text-amber-600',
    border: 'hover:border-amber-200',
  },
  {
    icon: <BarChart3 size={20} />,
    title: 'Laporan & Dashboard',
    desc: 'Grafik persediaan, statistik transaksi, dan laporan siap cetak.',
    color: 'bg-sky-100 text-sky-600',
    border: 'hover:border-sky-200',
  },
  {
    icon: <Package size={20} />,
    title: 'Persediaan Real-time',
    desc: 'Stok terupdate otomatis setiap transaksi via trigger database.',
    color: 'bg-pink-100 text-pink-600',
    border: 'hover:border-pink-200',
  },
  {
    icon: <ClipboardList size={20} />,
    title: 'Manajemen Supplier',
    desc: 'Data supplier lengkap dengan kode unik otomatis dan riwayat transaksi.',
    color: 'bg-indigo-100 text-indigo-600',
    border: 'hover:border-indigo-200',
  },
  {
    icon: <ShieldCheck size={20} />,
    title: 'Hak Akses',
    desc: 'Kelola pengguna dengan role Admin, Manajer, dan Direktur Utama.',
    color: 'bg-teal-100 text-teal-600',
    border: 'hover:border-teal-200',
  },
  {
    icon: <Calculator size={20} />,
    title: 'Kalkulasi HPP',
    desc: 'Harga pokok dihitung otomatis dengan metode moving average.',
    color: 'bg-orange-100 text-orange-600',
    border: 'hover:border-orange-200',
  },
];

export function LandingFeatures() {
  return (
    <section className="py-20 sm:py-28 px-5 sm:px-8 bg-white">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="inline-block text-violet-600 font-semibold text-xs uppercase tracking-widest mb-3 bg-violet-50 px-3 py-1.5 rounded-full border border-violet-100">
            Fitur Unggulan
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-950 tracking-tight mt-3">Semua yang Anda butuhkan</h2>
          <p className="text-gray-400 mt-3 max-w-md mx-auto text-sm leading-relaxed">Dirancang khusus untuk manajemen persediaan barang CV Akurat Sukses Sejati.</p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {FEATURES.map((f) => (
            <div
              key={f.title}
              className={`bg-white border border-gray-100 ${f.border} rounded-2xl p-5 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 group cursor-default`}
            >
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center mb-4 ${f.color} group-hover:scale-110 transition-transform`}>{f.icon}</div>
              <h3 className="font-bold text-gray-900 text-sm mb-1.5">{f.title}</h3>
              <p className="text-xs text-gray-400 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
