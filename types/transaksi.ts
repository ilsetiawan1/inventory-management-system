// types/transaksi.ts

import type { Barang } from './barang';
import type { Supplier } from './supplier';
import type { User } from './users';

// ─── Barang Masuk ─────────────────────────────────────────────────────────
export interface BarangMasuk {
  id: string;
  barang_masuk_code: string; // BM-2024-001
  id_barang: string;
  id_pengguna: string;
  id_supplier: string;
  jumlah_masuk: number;
  tanggal_masuk: string; // ISO date string
  total_harga: number;
  keterangan: string | null;
  created_at: string;
  updated_at: string;
}

// Barang Masuk dengan join relasi (untuk tampilan tabel)
export interface BarangMasukWithRelasi extends BarangMasuk {
  barang: Pick<Barang, 'id' | 'barang_code' | 'nama_barang' | 'harga'>;
  supplier: Pick<Supplier, 'id' | 'supplier_code' | 'nama_supplier'>;
  users: Pick<User, 'id' | 'user_code' | 'name'>;
}

export interface CreateBarangMasukPayload {
  id_barang: string;
  id_pengguna: string;
  id_supplier: string;
  jumlah_masuk: number;
  tanggal_masuk: string;
  total_harga: number;
  keterangan?: string | null;
}

export interface UpdateBarangMasukPayload {
  id_barang?: string;
  id_supplier?: string;
  jumlah_masuk?: number;
  tanggal_masuk?: string;
  total_harga?: number;
  keterangan?: string | null;
}

// ─── Barang Keluar ────────────────────────────────────────────────────────
export interface BarangKeluar {
  id: string;
  barang_keluar_code: string; // BK-2024-001
  id_pengguna: string;
  id_barang: string;
  jumlah_keluar: number;
  tanggal_keluar: string; // ISO date string
  hpp: number; // HPP per unit saat keluar
  total_hpp: number; // HPP * jumlah_keluar
  keterangan: string | null;
  created_at: string;
  updated_at: string;
}

// Barang Keluar dengan join relasi (untuk tampilan tabel)
export interface BarangKeluarWithRelasi extends BarangKeluar {
  barang: Pick<Barang, 'id' | 'barang_code' | 'nama_barang'>;
  users: Pick<User, 'id' | 'user_code' | 'name'>;
}

export interface CreateBarangKeluarPayload {
  id_barang: string;
  id_pengguna: string;
  jumlah_keluar: number;
  tanggal_keluar: string;
  hpp: number;
  total_hpp: number;
  keterangan?: string | null;
}

export interface UpdateBarangKeluarPayload {
  id_barang?: string;
  jumlah_keluar?: number;
  tanggal_keluar?: string;
  hpp?: number;
  total_hpp?: number;
  keterangan?: string | null;
}
