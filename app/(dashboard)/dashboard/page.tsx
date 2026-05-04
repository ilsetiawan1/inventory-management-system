// app\dashboard\page.tsx

import React from 'react';
import { Package, TrendingUp, AlertTriangle, Users } from 'lucide-react';
import { StatCard } from '@/components/dashboard/StatCard';
// import { getDashboardStats } from '@/lib/services/dashboardService'; // Akan diaktifkan saat Phase 8

export const metadata = {
  title: 'Dashboard | Inventory System',
};

export default async function DashboardPage() {
  // TODO: Implementasi Phase 8 - Ambil data asli dari service
  // const stats = await getDashboardStats();
  
  // Dummy data sementara untuk memvalidasi UI Phase 7
  const stats = {
    totalBarang: 1248,
    stokRendah: 12,
    transaksiHariIni: 45,
    totalSupplier: 84
  };

  return (
    <div className="w-full flex flex-col gap-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight">Ringkasan Sistem</h1>
        <p className="text-slate-500 text-[14px]">Pantau aktivitas inventaris dan performa bisnis Anda hari ini.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Barang"
          value={stats.totalBarang}
          icon={<Package size={24} />}
          trend={5.2}
          colorVariant="purple"
        />
        <StatCard
          title="Stok Menipis"
          value={stats.stokRendah}
          icon={<AlertTriangle size={24} />}
          trend={-1.5}
          colorVariant="amber"
        />
        <StatCard
          title="Transaksi Hari Ini"
          value={stats.transaksiHariIni}
          icon={<TrendingUp size={24} />}
          trend={12.4}
          colorVariant="emerald"
        />
        <StatCard
          title="Total Supplier"
          value={stats.totalSupplier}
          icon={<Users size={24} />}
          trend={0}
          trendLabel="Tetap"
          colorVariant="blue"
        />
      </div>

      {/* Area untuk chart besar atau tabel recent activity nantinya */}
      <div className="w-full h-96 rounded-3xl bg-white/40 backdrop-blur-md border border-white/60 shadow-[0_8px_32px_-12px_rgba(0,0,0,0.05)] flex items-center justify-center">
        <span className="text-slate-400 font-medium">Grafik Aktivitas (Akan Datang di Phase Selanjutnya)</span>
      </div>
    </div>
  );
}
