'use server';
// lib/actions/barang/index.ts
// Server Actions untuk fitur Barang — termasuk upload/hapus gambar

import { revalidatePath } from 'next/cache';
import { createBarang, editBarang, removeBarang, getBarangList, getBarangDetail, getBarangFormOptions } from '@/lib/services/barangService';
import { uploadBarangImage } from '@/lib/utils/uploadImage';
import { deleteBarangImage } from '@/lib/utils/deleteImage';
import { withErrorHandler } from '@/lib/utils/response';
import type { CreateBarangPayload, UpdateBarangPayload } from '@/types';

export async function actionGetBarangList(params?: { search?: string; kategoriId?: string; page?: number; limit?: number }) {
  return withErrorHandler(() => getBarangList(params), 'Berhasil memuat data barang');
}

export async function actionGetBarangDetail(id: string) {
  return withErrorHandler(() => getBarangDetail(id), 'Berhasil memuat detail barang');
}

export async function actionGetBarangFormOptions() {
  return withErrorHandler(() => getBarangFormOptions(), 'Berhasil memuat opsi form');
}

/**
 * Create barang — terima FormData karena ada file upload
 */
export async function actionCreateBarang(formData: FormData) {
  return withErrorHandler(async () => {
    const nama_barang = formData.get('nama_barang') as string;
    const id_kategori = formData.get('id_kategori') as string;
    const id_satuan = formData.get('id_satuan') as string;
    const harga = parseFloat(formData.get('harga') as string);
    const imageFile = formData.get('image') as File | null;

    // Validasi field wajib
    if (!nama_barang || !id_kategori || !id_satuan || isNaN(harga)) {
      throw new Error('Semua field wajib diisi dengan benar');
    }

    const payload: CreateBarangPayload = {
      nama_barang,
      id_kategori,
      id_satuan,
      harga,
    };

    // Buat barang dulu untuk mendapatkan barang_code
    const barang = await createBarang(payload, null);

    // Upload gambar jika ada
    if (imageFile && imageFile.size > 0) {
      const imageUrl = await uploadBarangImage(imageFile, barang.barang_code);
      // Update image_url setelah upload sukses
      await editBarang(barang.id, {}, imageUrl);
    }

    revalidatePath('/data-master/barang');
    return barang;
  }, 'Barang berhasil ditambahkan');
}

/**
 * Update barang — terima FormData karena ada file upload opsional
 */
export async function actionUpdateBarang(id: string, formData: FormData) {
  return withErrorHandler(async () => {
    const nama_barang = formData.get('nama_barang') as string;
    const id_kategori = formData.get('id_kategori') as string;
    const id_satuan = formData.get('id_satuan') as string;
    const harga = parseFloat(formData.get('harga') as string);
    const imageFile = formData.get('image') as File | null;
    const existingImageUrl = formData.get('existing_image_url') as string | null;

    if (!nama_barang || !id_kategori || !id_satuan || isNaN(harga)) {
      throw new Error('Semua field wajib diisi dengan benar');
    }

    const payload: UpdateBarangPayload = {
      nama_barang,
      id_kategori,
      id_satuan,
      harga,
    };

    let newImageUrl: string | null | undefined = undefined;

    // Jika ada file baru yang diupload
    if (imageFile && imageFile.size > 0) {
      // Hapus gambar lama dulu kalau ada
      if (existingImageUrl) {
        await deleteBarangImage(existingImageUrl);
      }
      // Dapatkan barang_code untuk nama file
      const barang = await getBarangDetail(id);
      newImageUrl = await uploadBarangImage(imageFile, barang.barang_code);
    }

    const result = await editBarang(id, payload, newImageUrl);
    revalidatePath('/data-master/barang');
    return result;
  }, 'Barang berhasil diperbarui');
}

/**
 * Delete barang — otomatis hapus gambar dari storage juga
 */
export async function actionDeleteBarang(id: string) {
  return withErrorHandler(async () => {
    const { image_url } = await removeBarang(id);
    // Hapus gambar dari storage jika ada
    await deleteBarangImage(image_url);
    revalidatePath('/data-master/barang');
    return { id };
  }, 'Barang berhasil dihapus');
}
