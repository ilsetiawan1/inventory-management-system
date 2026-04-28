// app/page.tsx
// Landing Page — halaman awal sebelum masuk ke login

import Link from 'next/link';
import { Package, TrendingUp, ShieldCheck, BarChart3, ArrowRight, Boxes, Truck, ClipboardList } from 'lucide-react';

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-white overflow-x-hidden">
      {/* ── NAVBAR ─────────────────────────────────────────── */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-violet-600 flex items-center justify-center shadow-md shadow-violet-200">
              <svg
                width="16"
                height="16"
                viewBox="0 0 40 40"
                fill="none"
              >
                <polygon
                  points="20,5 35,30 5,30"
                  fill="none"
                  stroke="white"
                  strokeWidth="3.5"
                  strokeLinejoin="round"
                />
                <line
                  x1="20"
                  y1="5"
                  x2="20"
                  y2="30"
                  stroke="white"
                  strokeWidth="2.5"
                />
                <line
                  x1="13"
                  y1="19"
                  x2="27"
                  y2="19"
                  stroke="white"
                  strokeWidth="2.5"
                />
              </svg>
            </div>
            <div>
              <span className="font-extrabold text-gray-900 text-sm leading-none block">CV Akurat Sukses Sejati</span>
              <span className="text-[10px] text-gray-400 leading-none">Sistem Informasi Persediaan</span>
            </div>
          </div>

          {/* CTA */}
          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="text-sm font-semibold text-gray-600 hover:text-violet-600 transition-colors hidden sm:block"
            >
              Masuk
            </Link>
            <Link
              href="/login"
              className="text-sm font-semibold bg-violet-600 hover:bg-violet-700 text-white px-4 py-2 rounded-xl transition-all shadow-sm shadow-violet-200 active:scale-95"
            >
              Mulai Sekarang
            </Link>
          </div>
        </div>
      </nav>

      {/* ── HERO ───────────────────────────────────────────── */}
      <section className="relative pt-32 pb-24 px-6 overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-violet-50 via-white to-indigo-50" />
        {/* Decorative circles */}
        <div className="absolute top-20 right-10 w-72 h-72 rounded-full bg-violet-100/60 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full bg-indigo-100/50 blur-3xl" />
        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: 'radial-gradient(circle, #7c3aed 1px, transparent 1px)',
            backgroundSize: '32px 32px',
          }}
        />

        <div className="relative max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            {/* Left: Text */}
            <div className="flex-1 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 bg-violet-100 text-violet-700 text-xs font-semibold px-3 py-1.5 rounded-full mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-violet-500 animate-pulse" />
                Sistem Manajemen Inventaris
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-[1.1] tracking-tight mb-6">
                Kelola Barang{' '}
                <span className="text-violet-600 relative">
                  Lebih Cerdas
                  <svg
                    className="absolute -bottom-2 left-0 w-full"
                    viewBox="0 0 200 8"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M1 5.5 C50 1.5, 150 1.5, 199 5.5"
                      stroke="#7c3aed"
                      strokeWidth="3"
                      strokeLinecap="round"
                      fill="none"
                      opacity="0.4"
                    />
                  </svg>
                </span>
              </h1>

              <p className="text-gray-500 text-lg leading-relaxed mb-10 max-w-xl mx-auto lg:mx-0">
                Pantau persediaan barang masuk & keluar, laporan real-time, dan manajemen supplier dalam satu platform yang terintegrasi untuk CV Akurat Sukses Sejati.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
                <Link
                  href="/login"
                  className="inline-flex items-center justify-center gap-2 bg-violet-600 hover:bg-violet-700 text-white font-semibold px-7 py-3.5 rounded-2xl transition-all shadow-lg shadow-violet-200 active:scale-95 text-sm"
                >
                  Masuk ke Sistem
                  <ArrowRight size={16} />
                </Link>
                <Link
                  href="/register"
                  className="inline-flex items-center justify-center gap-2 bg-white hover:bg-gray-50 text-gray-700 font-semibold px-7 py-3.5 rounded-2xl border border-gray-200 transition-all text-sm active:scale-95"
                >
                  Daftar Akun Baru
                </Link>
              </div>

              {/* Stats */}
              <div className="flex flex-wrap gap-8 mt-12 justify-center lg:justify-start">
                {[
                  { value: 'Real-time', label: 'Update Stok' },
                  { value: 'Multi-role', label: 'Hak Akses' },
                  { value: 'Auto', label: 'Kalkulasi HPP' },
                ].map((s) => (
                  <div key={s.label}>
                    <p className="text-xl font-extrabold text-violet-600">{s.value}</p>
                    <p className="text-xs text-gray-400 font-medium mt-0.5">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Dashboard Mockup */}
            <div className="flex-1 w-full max-w-xl">
              <div className="relative">
                {/* Shadow card behind */}
                <div className="absolute -inset-4 bg-violet-600/10 rounded-3xl blur-xl" />

                {/* Main mockup card */}
                <div className="relative bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden">
                  {/* Mockup header */}
                  <div className="bg-gray-50 border-b border-gray-100 px-4 py-3 flex items-center gap-2">
                    <div className="flex gap-1.5">
                      <div className="w-3 h-3 rounded-full bg-red-400" />
                      <div className="w-3 h-3 rounded-full bg-yellow-400" />
                      <div className="w-3 h-3 rounded-full bg-green-400" />
                    </div>
                    <div className="flex-1 bg-white rounded-md px-3 py-1 text-[10px] text-gray-400 border border-gray-200 mx-4 text-center">inventory.akuratsukses.com</div>
                  </div>

                  {/* Mockup content */}
                  <div className="p-5 space-y-4">
                    <p className="text-xs font-bold text-gray-700">Selamat Datang, Admin!</p>

                    {/* Stat cards mini */}
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { label: 'Kategori', value: '30', color: 'text-violet-600', bg: 'bg-violet-50' },
                        { label: 'Supplier', value: '20', color: 'text-emerald-600', bg: 'bg-emerald-50' },
                        { label: 'Pengguna', value: '3', color: 'text-amber-600', bg: 'bg-amber-50' },
                      ].map((c) => (
                        <div
                          key={c.label}
                          className={`${c.bg} rounded-xl p-3`}
                        >
                          <p className={`text-lg font-extrabold ${c.color}`}>{c.value}</p>
                          <p className="text-[10px] text-gray-500 mt-0.5">{c.label}</p>
                        </div>
                      ))}
                    </div>

                    {/* Bar chart mini */}
                    <div className="bg-gray-50 rounded-xl p-3">
                      <p className="text-[10px] font-semibold text-gray-500 mb-3">Top Barang Keluar</p>
                      <div className="flex items-end gap-1.5 h-16">
                        {[70, 55, 85, 40, 65, 50, 75].map((h, i) => (
                          <div
                            key={i}
                            className="flex-1 flex flex-col items-center gap-1"
                          >
                            <div
                              className="w-full rounded-t-sm bg-violet-500"
                              style={{ height: `${h}%` }}
                            />
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Table mini */}
                    <div className="rounded-xl border border-gray-100 overflow-hidden">
                      <div className="bg-gray-50 px-3 py-2 flex gap-4">
                        <span className="text-[10px] font-semibold text-gray-400 flex-1">Barang</span>
                        <span className="text-[10px] font-semibold text-gray-400">Stok</span>
                        <span className="text-[10px] font-semibold text-gray-400">Status</span>
                      </div>
                      {[
                        { name: 'Timbangan Acis BC', stok: '45', status: 'Aman', ok: true },
                        { name: 'Sensor Gea Analog', stok: '12', status: 'Aman', ok: true },
                        { name: 'Kabel Power 3M', stok: '3', status: 'Kritis', ok: false },
                      ].map((row) => (
                        <div
                          key={row.name}
                          className="px-3 py-2 flex gap-4 items-center border-t border-gray-50"
                        >
                          <span className="text-[10px] text-gray-700 flex-1 truncate">{row.name}</span>
                          <span className="text-[10px] font-semibold text-gray-700">{row.stok}</span>
                          <span className={`text-[9px] font-semibold px-1.5 py-0.5 rounded-full ${row.ok ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-600'}`}>
                            {row.status}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Floating badge */}
                <div className="absolute -top-4 -right-4 bg-violet-600 text-white text-[10px] font-bold px-3 py-1.5 rounded-full shadow-lg shadow-violet-300">Live Data ✓</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FEATURES ───────────────────────────────────────── */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-violet-600 font-semibold text-sm mb-2">Fitur Unggulan</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">Semua yang Anda butuhkan</h2>
            <p className="text-gray-400 mt-3 max-w-xl mx-auto text-sm leading-relaxed">
              Dirancang khusus untuk kebutuhan manajemen persediaan barang toko CV Akurat Sukses Sejati.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              {
                icon: <Boxes size={22} />,
                title: 'Manajemen Barang',
                desc: 'Kelola data barang lengkap dengan kategori, satuan, harga, dan foto produk.',
                color: 'bg-violet-100 text-violet-600',
              },
              {
                icon: <Truck size={22} />,
                title: 'Barang Masuk',
                desc: 'Catat penerimaan barang dari supplier dengan kalkulasi HPP otomatis.',
                color: 'bg-emerald-100 text-emerald-600',
              },
              {
                icon: <TrendingUp size={22} />,
                title: 'Barang Keluar',
                desc: 'Validasi stok otomatis sebelum pengeluaran barang, tidak perlu hitung manual.',
                color: 'bg-amber-100 text-amber-600',
              },
              {
                icon: <BarChart3 size={22} />,
                title: 'Laporan & Dashboard',
                desc: 'Grafik persediaan, statistik transaksi, dan laporan siap cetak.',
                color: 'bg-blue-100 text-blue-600',
              },
              {
                icon: <Package size={22} />,
                title: 'Persediaan Real-time',
                desc: 'Stok terupdate otomatis setiap transaksi masuk & keluar via trigger database.',
                color: 'bg-pink-100 text-pink-600',
              },
              {
                icon: <ClipboardList size={22} />,
                title: 'Manajemen Supplier',
                desc: 'Data lengkap supplier dengan kode unik otomatis dan riwayat transaksi.',
                color: 'bg-indigo-100 text-indigo-600',
              },
              {
                icon: <ShieldCheck size={22} />,
                title: 'Hak Akses',
                desc: 'Kelola pengguna dengan role Admin, Manajer, dan Direktur Utama.',
                color: 'bg-teal-100 text-teal-600',
              },
              {
                icon: <TrendingUp size={22} />,
                title: 'Kalkulasi HPP',
                desc: 'Harga pokok dihitung otomatis dengan metode moving average.',
                color: 'bg-orange-100 text-orange-600',
              },
            ].map((f) => (
              <div
                key={f.title}
                className="group bg-white border border-gray-100 rounded-2xl p-5 hover:shadow-lg hover:shadow-violet-50 hover:-translate-y-1 transition-all duration-200"
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 ${f.color}`}>{f.icon}</div>
                <h3 className="font-bold text-gray-900 text-sm mb-1.5">{f.title}</h3>
                <p className="text-xs text-gray-400 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ─────────────────────────────────────── */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="relative bg-gradient-to-br from-violet-600 to-indigo-600 rounded-3xl p-10 sm:p-14 text-center overflow-hidden">
            {/* Decoration */}
            <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-white/10 -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full bg-white/10 translate-y-1/2 -translate-x-1/2" />

            <div className="relative">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">Siap mulai kelola inventaris?</h2>
              <p className="text-white/70 mb-8 max-w-md mx-auto text-sm leading-relaxed">
                Masuk ke sistem atau daftarkan akun baru untuk memulai. Butuh bantuan? Hubungi administrator Anda.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link
                  href="/login"
                  className="inline-flex items-center justify-center gap-2 bg-white text-violet-700 font-bold px-8 py-3.5 rounded-2xl hover:bg-gray-50 transition-all text-sm active:scale-95 shadow-lg"
                >
                  Masuk ke Sistem
                  <ArrowRight size={16} />
                </Link>
                <Link
                  href="/register"
                  className="inline-flex items-center justify-center gap-2 bg-white/15 hover:bg-white/25 text-white font-semibold px-8 py-3.5 rounded-2xl border border-white/30 transition-all text-sm active:scale-95"
                >
                  Daftar Akun Baru
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ─────────────────────────────────────────── */}
      <footer className="border-t border-gray-100 py-8 px-6">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-violet-600 flex items-center justify-center">
              <svg
                width="12"
                height="12"
                viewBox="0 0 40 40"
                fill="none"
              >
                <polygon
                  points="20,5 35,30 5,30"
                  fill="none"
                  stroke="white"
                  strokeWidth="4"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <span className="text-sm font-bold text-gray-700">CV Akurat Sukses Sejati</span>
          </div>
          <p className="text-xs text-gray-400">© {new Date().getFullYear()} Sistem Informasi Persediaan Barang</p>
        </div>
      </footer>
    </main>
  );
}
