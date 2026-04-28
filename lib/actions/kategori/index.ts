'use server';
// lib/actions/kategori/index.ts
// Server Actions untuk Kategori Barang & Satuan (Data Master)

import { revalidatePath } from 'next/cache';
import { getAllKategori, getKategoriById, getLastKategoriCode, insertKategori, updateKategori, deleteKategori } from '@/lib/repositories/kategoriRepository';
import { getAllSatuan, insertSatuan, updateSatuan, deleteSatuan } from '@/lib/repositories/satuanRepository';
import { generateKategoriCode } from '@/lib/utils/generateCode';
import { withErrorHandler } from '@/lib/utils/response';

// ─── KATEGORI ─────────────────────────────────────────────────────────────

export async function actionGetAllKategori() {
  return withErrorHandler(getAllKategori, 'Berhasil memuat kategori');
}

export async function actionCreateKategori(nama_kategori: string) {
  return withErrorHandler(async () => {
    const lastCode = await getLastKategoriCode();
    const kode_kategori = generateKategoriCode(lastCode);
    const result = await insertKategori({ kode_kategori, nama_kategori });
    revalidatePath('/data-master/barang');
    return result;
  }, 'Kategori berhasil ditambahkan');
}

export async function actionUpdateKategori(id: string, nama_kategori: string) {
  return withErrorHandler(async () => {
    const result = await updateKategori(id, { nama_kategori });
    revalidatePath('/data-master/barang');
    return result;
  }, 'Kategori berhasil diperbarui');
}

export async function actionDeleteKategori(id: string) {
  return withErrorHandler(async () => {
    await deleteKategori(id);
    revalidatePath('/data-master/barang');
    return { id };
  }, 'Kategori berhasil dihapus');
}

// ─── SATUAN ───────────────────────────────────────────────────────────────

export async function actionGetAllSatuan() {
  return withErrorHandler(getAllSatuan, 'Berhasil memuat satuan');
}

export async function actionCreateSatuan(nama_satuan: string) {
  return withErrorHandler(async () => {
    const result = await insertSatuan({ nama_satuan });
    revalidatePath('/data-master/barang');
    return result;
  }, 'Satuan berhasil ditambahkan');
}

export async function actionUpdateSatuan(id: string, nama_satuan: string) {
  return withErrorHandler(async () => {
    const result = await updateSatuan(id, nama_satuan);
    revalidatePath('/data-master/barang');
    return result;
  }, 'Satuan berhasil diperbarui');
}

export async function actionDeleteSatuan(id: string) {
  return withErrorHandler(async () => {
    await deleteSatuan(id);
    revalidatePath('/data-master/barang');
    return { id };
  }, 'Satuan berhasil dihapus');
}
