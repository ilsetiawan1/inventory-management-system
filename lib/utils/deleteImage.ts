// lib/storage/deleteImage.ts
// Hapus gambar barang dari Supabase Storage bucket "barang-images"

import { createClient } from '@/lib/supabase/server';

const BUCKET = 'barang-images';

/**
 * Hapus gambar dari Supabase Storage berdasarkan public URL.
 * Aman dipanggil meskipun URL null/undefined (akan di-skip).
 *
 * @param imageUrl - Public URL gambar (dari kolom image_url di tabel barang)
 */
export async function deleteBarangImage(imageUrl: string | null | undefined): Promise<void> {
  if (!imageUrl) return;

  const supabase = await createClient();

  // Ekstrak nama file dari URL
  // Contoh URL: https://xxx.supabase.co/storage/v1/object/public/barang-images/000001.jpg
  // → fileName: "000001.jpg"
  const fileName = imageUrl.split(`/${BUCKET}/`).pop();
  if (!fileName) return;

  const { error } = await supabase.storage.from(BUCKET).remove([fileName]);

  // Jika file tidak ditemukan (sudah dihapus sebelumnya), abaikan error
  if (error && !error.message.includes('Not Found')) {
    throw new Error(error.message);
  }
}
