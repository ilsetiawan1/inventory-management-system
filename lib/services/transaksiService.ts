// lib/services/transaksiService.ts
// Business Logic Layer — logic transaksi barang masuk & keluar + kalkulasi HPP

import {
  getAllBarangMasuk,
  getBarangMasukById,
  getLastBarangMasukCode,
  insertBarangMasuk,
  updateBarangMasuk,
  deleteBarangMasuk,
  countBarangMasuk,
  countBarangMasukByMonth,
} from '@/lib/repositories/barangMasukRepository';

import {
  getAllBarangKeluar,
  getBarangKeluarById,
  getLastBarangKeluarCode,
  insertBarangKeluar,
  updateBarangKeluar,
  deleteBarangKeluar,
  countBarangKeluar,
  countBarangKeluarByMonth,
} from '@/lib/repositories/barangKeluarRepository';

import { getPersediaanByBarangId, updateHppPersediaan } from '@/lib/repositories/persediaanRepository';

import { generateBarangMasukCode, generateBarangKeluarCode } from '@/lib/utils/generateCode';

import type { CreateBarangMasukPayload, UpdateBarangMasukPayload, CreateBarangKeluarPayload, UpdateBarangKeluarPayload } from '@/types';

// ─── BARANG MASUK ─────────────────────────────────────────────────────────

export async function getBarangMasukList(params?: { search?: string; page?: number; limit?: number; startDate?: string; endDate?: string }) {
  return getAllBarangMasuk(params);
}

export async function getBarangMasukDetail(id: string) {
  return getBarangMasukById(id);
}

/**
 * Membuat transaksi barang masuk.
 * - Generate kode unik
 * - Kalkulasi total_harga = jumlah_masuk * harga_satuan
 * - Kalkulasi HPP baru dengan metode rata-rata tertimbang (moving average)
 * - Update HPP di tabel persediaan
 * - Stok auto-update via trigger Supabase
 */
export async function createBarangMasuk(payload: Omit<CreateBarangMasukPayload, 'total_harga'>, hargaSatuan: number) {
  // 1. Generate kode
  const lastCode = await getLastBarangMasukCode();
  const barang_masuk_code = generateBarangMasukCode(lastCode);

  // 2. Hitung total harga
  const total_harga = payload.jumlah_masuk * hargaSatuan;

  // 3. Ambil data persediaan saat ini untuk kalkulasi HPP
  const persediaan = await getPersediaanByBarangId(payload.id_barang);
  const stokLama = persediaan.stok;
  const hppLama = persediaan.hpp;

  // 4. Hitung HPP baru menggunakan Moving Average (rata-rata tertimbang)
  //    HPP_baru = ((stok_lama * hpp_lama) + (jumlah_masuk * harga_satuan))
  //               / (stok_lama + jumlah_masuk)
  const totalNilaiLama = stokLama * hppLama;
  const totalNilaiBaru = payload.jumlah_masuk * hargaSatuan;
  const totalStokBaru = stokLama + payload.jumlah_masuk;
  const hppBaru = totalStokBaru > 0 ? (totalNilaiLama + totalNilaiBaru) / totalStokBaru : hargaSatuan;

  // 5. Insert transaksi barang masuk (trigger akan update stok)
  const result = await insertBarangMasuk({
    ...payload,
    barang_masuk_code,
    total_harga,
  });

  // 6. Update HPP di persediaan
  await updateHppPersediaan(payload.id_barang, hppBaru);

  return result;
}

export async function editBarangMasuk(id: string, payload: UpdateBarangMasukPayload) {
  await getBarangMasukById(id); // validasi exist
  return updateBarangMasuk(id, payload);
}

export async function removeBarangMasuk(id: string) {
  await getBarangMasukById(id);
  return deleteBarangMasuk(id);
}

export async function getTotalBarangMasuk() {
  return countBarangMasuk();
}

// ─── BARANG KELUAR ────────────────────────────────────────────────────────

export async function getBarangKeluarList(params?: { search?: string; page?: number; limit?: number; startDate?: string; endDate?: string }) {
  return getAllBarangKeluar(params);
}

export async function getBarangKeluarDetail(id: string) {
  return getBarangKeluarById(id);
}

/**
 * Membuat transaksi barang keluar.
 * - Validasi stok cukup sebelum insert
 * - Generate kode unik
 * - Ambil HPP dari persediaan saat ini
 * - Kalkulasi total_hpp = jumlah_keluar * hpp
 * - Stok auto-update via trigger Supabase
 */
export async function createBarangKeluar(payload: Omit<CreateBarangKeluarPayload, 'hpp' | 'total_hpp'>) {
  // 1. Ambil data persediaan
  const persediaan = await getPersediaanByBarangId(payload.id_barang);

  // 2. Validasi stok cukup
  if (persediaan.stok < payload.jumlah_keluar) {
    throw new Error(`Stok tidak mencukupi. Stok tersedia: ${persediaan.stok}, dibutuhkan: ${payload.jumlah_keluar}`);
  }

  // 3. Generate kode
  const lastCode = await getLastBarangKeluarCode();
  const barang_keluar_code = generateBarangKeluarCode(lastCode);

  // 4. Ambil HPP saat ini dari persediaan
  const hpp = persediaan.hpp;
  const total_hpp = payload.jumlah_keluar * hpp;

  // 5. Insert transaksi keluar (trigger akan kurangi stok)
  return insertBarangKeluar({
    ...payload,
    barang_keluar_code,
    hpp,
    total_hpp,
  });
}

export async function editBarangKeluar(id: string, payload: UpdateBarangKeluarPayload) {
  await getBarangKeluarById(id);
  return updateBarangKeluar(id, payload);
}

export async function removeBarangKeluar(id: string) {
  await getBarangKeluarById(id);
  return deleteBarangKeluar(id);
}

export async function getTotalBarangKeluar() {
  return countBarangKeluar();
}

// ─── HELPER PERBANDINGAN BULAN ─────────────────────────────────────────────

/**
 * Hitung persentase perubahan vs bulan lalu
 * Return: { current, previous, percentChange, isUp }
 */
export async function getBarangMasukMonthComparison() {
  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth() + 1;

  const prevMonth = currentMonth === 1 ? 12 : currentMonth - 1;
  const prevYear = currentMonth === 1 ? currentYear - 1 : currentYear;

  const [current, previous] = await Promise.all([countBarangMasukByMonth(currentYear, currentMonth), countBarangMasukByMonth(prevYear, prevMonth)]);

  const percentChange = previous === 0 ? (current > 0 ? 100 : 0) : Math.round(((current - previous) / previous) * 100);

  return { current, previous, percentChange, isUp: percentChange >= 0 };
}

export async function getBarangKeluarMonthComparison() {
  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth() + 1;

  const prevMonth = currentMonth === 1 ? 12 : currentMonth - 1;
  const prevYear = currentMonth === 1 ? currentYear - 1 : currentYear;

  const [current, previous] = await Promise.all([countBarangKeluarByMonth(currentYear, currentMonth), countBarangKeluarByMonth(prevYear, prevMonth)]);

  const percentChange = previous === 0 ? (current > 0 ? 100 : 0) : Math.round(((current - previous) / previous) * 100);

  return { current, previous, percentChange, isUp: percentChange >= 0 };
}
