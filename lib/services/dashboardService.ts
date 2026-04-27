// lib/services/dashboardService.ts
// Business Logic Layer — aggregasi data untuk halaman Beranda/Dashboard

import { countUsers } from '@/lib/repositories/usersRepository';
import { countSupplier } from '@/lib/repositories/supplierRepository';
import { getAllKategori } from '@/lib/repositories/kategoriRepository';
import { getTotalStokAllPersediaan } from '@/lib/repositories/persediaanRepository';
import { countBarangMasuk, countBarangMasukByMonth } from '@/lib/repositories/barangMasukRepository';
import { countBarangKeluar, countBarangKeluarByMonth } from '@/lib/repositories/barangKeluarRepository';

// ─── Tipe return dashboard ────────────────────────────────────────────────

export interface DashboardStatItem {
  label: string;
  value: number;
  percentChange: number;
  isUp: boolean;
}

export interface DashboardStats {
  kategoriBarang: DashboardStatItem;
  pengguna: DashboardStatItem;
  supplier: DashboardStatItem;
  totalBarangMasuk: DashboardStatItem;
  totalBarangKeluar: DashboardStatItem;
  totalPersediaan: DashboardStatItem;
}

// ─── Helper ────────────────────────────────────────────────────────────────

function calcPercent(current: number, previous: number): number {
  if (previous === 0) return current > 0 ? 100 : 0;
  return Math.round(((current - previous) / previous) * 100);
}

function getPrevMonthYear(): { year: number; month: number } {
  const now = new Date();
  const currentMonth = now.getMonth() + 1;
  const currentYear = now.getFullYear();
  return {
    month: currentMonth === 1 ? 12 : currentMonth - 1,
    year: currentMonth === 1 ? currentYear - 1 : currentYear,
  };
}

function getCurrentMonthYear(): { year: number; month: number } {
  const now = new Date();
  return { month: now.getMonth() + 1, year: now.getFullYear() };
}

// ─── Main Dashboard Data Fetcher ───────────────────────────────────────────

export async function getDashboardStats(): Promise<DashboardStats> {
  const { year: curYear, month: curMonth } = getCurrentMonthYear();
  const { year: prevYear, month: prevMonth } = getPrevMonthYear();

  const [totalKategori, totalPengguna, totalSupplier, totalMasukAll, totalKeluarAll, totalStok, masukCurMonth, masukPrevMonth, keluarCurMonth, keluarPrevMonth] = await Promise.all(
    [
      getAllKategori().then((k) => k.length),
      countUsers(),
      countSupplier(),
      countBarangMasuk(),
      countBarangKeluar(),
      getTotalStokAllPersediaan(),
      countBarangMasukByMonth(curYear, curMonth),
      countBarangMasukByMonth(prevYear, prevMonth),
      countBarangKeluarByMonth(curYear, curMonth),
      countBarangKeluarByMonth(prevYear, prevMonth),
    ],
  );

  return {
    kategoriBarang: {
      label: 'Kategori Barang',
      value: totalKategori,
      percentChange: 0,
      isUp: true,
    },
    pengguna: {
      label: 'Pengguna',
      value: totalPengguna,
      percentChange: 0,
      isUp: true,
    },
    supplier: {
      label: 'Supplier',
      value: totalSupplier,
      percentChange: 0,
      isUp: true,
    },
    totalBarangMasuk: {
      label: 'Total Barang Masuk',
      value: totalMasukAll,
      percentChange: calcPercent(masukCurMonth, masukPrevMonth),
      isUp: masukCurMonth >= masukPrevMonth,
    },
    totalBarangKeluar: {
      label: 'Total Barang Keluar',
      value: totalKeluarAll,
      percentChange: calcPercent(keluarCurMonth, keluarPrevMonth),
      isUp: keluarCurMonth >= keluarPrevMonth,
    },
    totalPersediaan: {
      label: 'Total Persediaan Barang',
      value: totalStok,
      percentChange: 0,
      isUp: true,
    },
  };
}

// ─── Top Barang untuk Chart ────────────────────────────────────────────────

// Definisikan shape data yang dikembalikan Supabase secara eksplisit
interface BarangKeluarRow {
  id_barang: string;
  jumlah_keluar: number;
  barang: { nama_barang: string; barang_code: string } | null;
}

export interface TopBarangItem {
  nama_barang: string;
  total_keluar: number;
}

export async function getTopBarangKeluar(limit = 7): Promise<TopBarangItem[]> {
  // Dynamic import untuk menghindari circular dependency
  const { createClient } = await import('@/lib/supabase/server');
  const supabase = await createClient();

  const { data, error } = await supabase.from('barang_keluar').select(`id_barang, jumlah_keluar, barang ( nama_barang, barang_code )`);

  if (error) throw new Error(error.message);

  // Cast via unknown karena Supabase menghasilkan union type kompleks
  // pada relasi join — shape sudah aman sesuai interface di atas
  const rows = (data ?? []) as unknown as BarangKeluarRow[];

  // Agregasi total keluar per barang
  const aggregated: Record<string, TopBarangItem> = {};

  for (const row of rows) {
    if (!row.barang) continue;
    if (!aggregated[row.id_barang]) {
      aggregated[row.id_barang] = {
        nama_barang: row.barang.nama_barang,
        total_keluar: 0,
      };
    }
    aggregated[row.id_barang].total_keluar += row.jumlah_keluar;
  }

  return Object.values(aggregated)
    .sort((a, b) => b.total_keluar - a.total_keluar)
    .slice(0, limit);
}
