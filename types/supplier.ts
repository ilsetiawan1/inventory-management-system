// types/supplier.ts

export interface Supplier {
  id: string;
  supplier_code: string; // S001, S002
  nama_supplier: string;
  nama_kontak: string | null;
  email: string | null;
  alamat: string | null;
  no_telepon: string | null;
  created_at: string;
  updated_at: string;
}

export interface CreateSupplierPayload {
  nama_supplier: string;
  nama_kontak?: string | null;
  email?: string | null;
  alamat?: string | null;
  no_telepon?: string | null;
}

export interface UpdateSupplierPayload {
  nama_supplier?: string;
  nama_kontak?: string | null;
  email?: string | null;
  alamat?: string | null;
  no_telepon?: string | null;
}
