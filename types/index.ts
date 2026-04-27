// types/index.ts
// Barrel export — import semua types dari satu tempat

export type { User, UserRole, UserStatus, CreateUserPayload, UpdateUserPayload } from './users';

export type {
  KategoriBarang,
  CreateKategoriPayload,
  UpdateKategoriPayload,
  Satuan,
  CreateSatuanPayload,
  Barang,
  BarangWithRelasi,
  CreateBarangPayload,
  UpdateBarangPayload,
  Persediaan,
  PersediaanWithBarang,
  UpdatePersediaanPayload,
} from './barang';

export type { Supplier, CreateSupplierPayload, UpdateSupplierPayload } from './supplier';

export type {
  BarangMasuk,
  BarangMasukWithRelasi,
  CreateBarangMasukPayload,
  UpdateBarangMasukPayload,
  BarangKeluar,
  BarangKeluarWithRelasi,
  CreateBarangKeluarPayload,
  UpdateBarangKeluarPayload,
} from './transaksi';
