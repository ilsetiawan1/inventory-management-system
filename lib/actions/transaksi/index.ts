'use server';
// lib/actions/transaksi/index.ts
// Server Actions untuk Barang Masuk & Barang Keluar

import { revalidatePath } from 'next/cache';
import {
  createBarangMasuk,
  editBarangMasuk,
  removeBarangMasuk,
  getBarangMasukList,
  getBarangMasukDetail,
  createBarangKeluar,
  editBarangKeluar,
  removeBarangKeluar,
  getBarangKeluarList,
  getBarangKeluarDetail,
} from '@/lib/services/transaksiService';
import { withErrorHandler } from '@/lib/utils/response';
import type { UpdateBarangMasukPayload, UpdateBarangKeluarPayload } from '@/types';

// ─── BARANG MASUK ─────────────────────────────────────────────────────────

export async function actionGetBarangMasukList(params?: { search?: string; page?: number; limit?: number; startDate?: string; endDate?: string }) {
  return withErrorHandler(() => getBarangMasukList(params), 'Berhasil memuat data barang masuk');
}

export async function actionGetBarangMasukDetail(id: string) {
  return withErrorHandler(() => getBarangMasukDetail(id), 'Berhasil memuat detail barang masuk');
}

export async function actionCreateBarangMasuk(formData: FormData) {
  return withErrorHandler(async () => {
    const id_barang = formData.get('id_barang') as string;
    const id_pengguna = formData.get('id_pengguna') as string;
    const id_supplier = formData.get('id_supplier') as string;
    const jumlah_masuk = parseInt(formData.get('jumlah_masuk') as string, 10);
    const tanggal_masuk = formData.get('tanggal_masuk') as string;
    const harga_satuan = parseFloat(formData.get('harga_satuan') as string);
    const keterangan = (formData.get('keterangan') as string) || null;

    if (!id_barang || !id_pengguna || !id_supplier || isNaN(jumlah_masuk) || jumlah_masuk <= 0 || !tanggal_masuk || isNaN(harga_satuan)) {
      throw new Error('Semua field wajib diisi dengan benar');
    }

    const result = await createBarangMasuk({ id_barang, id_pengguna, id_supplier, jumlah_masuk, tanggal_masuk, keterangan }, harga_satuan);

    revalidatePath('/transaksi/barang-masuk');
    revalidatePath('/transaksi/persediaan');
    revalidatePath('/dashboard');
    return result;
  }, 'Barang masuk berhasil dicatat');
}

export async function actionUpdateBarangMasuk(id: string, payload: UpdateBarangMasukPayload) {
  return withErrorHandler(async () => {
    const result = await editBarangMasuk(id, payload);
    revalidatePath('/transaksi/barang-masuk');
    return result;
  }, 'Barang masuk berhasil diperbarui');
}

export async function actionDeleteBarangMasuk(id: string) {
  return withErrorHandler(async () => {
    await removeBarangMasuk(id);
    revalidatePath('/transaksi/barang-masuk');
    revalidatePath('/transaksi/persediaan');
    return { id };
  }, 'Barang masuk berhasil dihapus');
}

// ─── BARANG KELUAR ────────────────────────────────────────────────────────

export async function actionGetBarangKeluarList(params?: { search?: string; page?: number; limit?: number; startDate?: string; endDate?: string }) {
  return withErrorHandler(() => getBarangKeluarList(params), 'Berhasil memuat data barang keluar');
}

export async function actionGetBarangKeluarDetail(id: string) {
  return withErrorHandler(() => getBarangKeluarDetail(id), 'Berhasil memuat detail barang keluar');
}

export async function actionCreateBarangKeluar(formData: FormData) {
  return withErrorHandler(async () => {
    const id_barang = formData.get('id_barang') as string;
    const id_pengguna = formData.get('id_pengguna') as string;
    const jumlah_keluar = parseInt(formData.get('jumlah_keluar') as string, 10);
    const tanggal_keluar = formData.get('tanggal_keluar') as string;
    const keterangan = (formData.get('keterangan') as string) || null;

    if (!id_barang || !id_pengguna || isNaN(jumlah_keluar) || jumlah_keluar <= 0 || !tanggal_keluar) {
      throw new Error('Semua field wajib diisi dengan benar');
    }

    const result = await createBarangKeluar({
      id_barang,
      id_pengguna,
      jumlah_keluar,
      tanggal_keluar,
      keterangan,
    });

    revalidatePath('/transaksi/barang-keluar');
    revalidatePath('/transaksi/persediaan');
    revalidatePath('/dashboard');
    return result;
  }, 'Barang keluar berhasil dicatat');
}

export async function actionUpdateBarangKeluar(id: string, payload: UpdateBarangKeluarPayload) {
  return withErrorHandler(async () => {
    const result = await editBarangKeluar(id, payload);
    revalidatePath('/transaksi/barang-keluar');
    return result;
  }, 'Barang keluar berhasil diperbarui');
}

export async function actionDeleteBarangKeluar(id: string) {
  return withErrorHandler(async () => {
    await removeBarangKeluar(id);
    revalidatePath('/transaksi/barang-keluar');
    revalidatePath('/transaksi/persediaan');
    return { id };
  }, 'Barang keluar berhasil dihapus');
}
