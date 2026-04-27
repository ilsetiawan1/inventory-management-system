// lib/storage/uploadImage.ts
// Upload gambar barang ke Supabase Storage bucket "barang-images"

import { createClient } from '@/lib/supabase/server';

const BUCKET = 'barang-images';

/**
 * Upload file gambar ke Supabase Storage.
 * Mengembalikan public URL gambar yang telah diupload.
 *
 * @param file     - File object dari FormData
 * @param barangCode - Kode barang, dipakai sebagai nama file agar unik & overwriteable
 */
export async function uploadBarangImage(file: File, barangCode: string): Promise<string> {
  const supabase = await createClient();

  // Validasi tipe file
  const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
  if (!allowedTypes.includes(file.type)) {
    throw new Error('Format file tidak didukung. Gunakan JPG, PNG, WEBP, atau GIF.');
  }

  // Validasi ukuran file (max 2MB sesuai bucket policy)
  const MAX_SIZE = 2 * 1024 * 1024; // 2MB
  if (file.size > MAX_SIZE) {
    throw new Error('Ukuran file terlalu besar. Maksimal 2MB.');
  }

  // Buat nama file unik berdasarkan kode barang + ekstensi asli
  const ext = file.name.split('.').pop() ?? 'jpg';
  const fileName = `${barangCode}.${ext}`;

  // Upload ke bucket (upsert: true agar bisa overwrite gambar lama)
  const { error: uploadError } = await supabase.storage.from(BUCKET).upload(fileName, file, {
    upsert: true,
    contentType: file.type,
  });

  if (uploadError) throw new Error(uploadError.message);

  // Ambil public URL
  const { data } = supabase.storage.from(BUCKET).getPublicUrl(fileName);

  return data.publicUrl;
}
