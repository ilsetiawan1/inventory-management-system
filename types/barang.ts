// types/barang.ts

// ─── Master: Kategori Barang ───────────────────────────────────────────────
export interface KategoriBarang {
  id: string;
  kode_kategori: string; // KAT-001
  nama_kategori: string;
  created_at: string;
  updated_at: string;
}

export interface CreateKategoriPayload {
  kode_kategori: string;
  nama_kategori: string;
}

export interface UpdateKategoriPayload {
  kode_kategori?: string;
  nama_kategori?: string;
}

// ─── Master: Satuan ────────────────────────────────────────────────────────
export interface Satuan {
  id: string;
  nama_satuan: string; // PCS, UNIT, SET, KG
  created_at: string;
}

export interface CreateSatuanPayload {
  nama_satuan: string;
}

// ─── Master: Barang ────────────────────────────────────────────────────────
export interface Barang {
  id: string;
  barang_code: string; // 000001, 000002
  nama_barang: string;
  id_kategori: string;
  id_satuan: string;
  harga: number;
  image_url: string | null;
  created_at: string;
  updated_at: string;
}

// Barang dengan relasi join (untuk tampilan tabel)
export interface BarangWithRelasi extends Barang {
  kategori_barang: Pick<KategoriBarang, 'id' | 'nama_kategori' | 'kode_kategori'>;
  satuan: Pick<Satuan, 'id' | 'nama_satuan'>;
}

export interface CreateBarangPayload {
  nama_barang: string;
  id_kategori: string;
  id_satuan: string;
  harga: number;
  image_url?: string | null;
}

export interface UpdateBarangPayload {
  nama_barang?: string;
  id_kategori?: string;
  id_satuan?: string;
  harga?: number;
  image_url?: string | null;
}

// ─── Persediaan ───────────────────────────────────────────────────────────
export interface Persediaan {
  id: string;
  persediaan_code: string; // PS-000001
  id_barang: string;
  stok: number;
  hpp: number; // Harga Pokok Penjualan
  created_at: string;
  updated_at: string;
}

// Persediaan dengan relasi join barang
export interface PersediaanWithBarang extends Persediaan {
  barang: Pick<Barang, 'id' | 'barang_code' | 'nama_barang'> & {
    kategori_barang: Pick<KategoriBarang, 'nama_kategori'>;
    satuan: Pick<Satuan, 'nama_satuan'>;
  };
}

export interface UpdatePersediaanPayload {
  stok?: number;
  hpp?: number;
}
