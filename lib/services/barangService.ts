// lib/services/barangService.ts
// Business Logic Layer — memanggil repository, menangani logic bisnis

import { getAllBarang, getBarangById, getLastBarangCode, insertBarang, updateBarang, deleteBarang } from '@/lib/repositories/barangRepository';
import { getAllKategori } from '@/lib/repositories/kategoriRepository';
import { getAllSatuan } from '@/lib/repositories/satuanRepository';
import { generateBarangCode } from '@/lib/utils/generateCode';
import type { CreateBarangPayload, UpdateBarangPayload } from '@/types';

export async function getBarangList(params?: { search?: string; kategoriId?: string; page?: number; limit?: number }) {
  return getAllBarang(params);
}

export async function getBarangDetail(id: string) {
  return getBarangById(id);
}

export async function getBarangFormOptions() {
  // Fetch kategori & satuan sekaligus untuk dropdown form
  const [kategori, satuan] = await Promise.all([getAllKategori(), getAllSatuan()]);
  return { kategori, satuan };
}

export async function createBarang(payload: CreateBarangPayload, imageUrl?: string | null) {
  const lastCode = await getLastBarangCode();
  const barang_code = generateBarangCode(lastCode);

  return insertBarang({
    ...payload,
    barang_code,
    image_url: imageUrl ?? null,
  });
}

export async function editBarang(id: string, payload: UpdateBarangPayload, newImageUrl?: string | null) {
  const updatePayload: UpdateBarangPayload = { ...payload };

  // Update image_url hanya jika ada nilai baru yang diberikan (bukan undefined)
  if (newImageUrl !== undefined) {
    updatePayload.image_url = newImageUrl;
  }

  return updateBarang(id, updatePayload);
}

export async function removeBarang(id: string) {
  // Ambil image_url sebelum dihapus agar caller bisa hapus dari storage
  const barang = await getBarangById(id);
  const imageUrl = barang.image_url as string | null;

  // Hapus record (trigger cascade akan hapus persediaan juga)
  await deleteBarang(id);

  return { image_url: imageUrl };
}
