'use server';
// lib/actions/dashboard/index.ts
// Server Actions untuk data Dashboard/Beranda

import { getDashboardStats, getTopBarangKeluar } from '@/lib/services/dashboardService';
import { withErrorHandler } from '@/lib/utils/response';

export async function actionGetDashboardStats() {
  return withErrorHandler(() => getDashboardStats(), 'Berhasil memuat statistik dashboard');
}

export async function actionGetTopBarangKeluar(limit = 7) {
  return withErrorHandler(() => getTopBarangKeluar(limit), 'Berhasil memuat data grafik');
}
