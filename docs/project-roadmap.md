# Project Roadmap - Inventory System

## Status: 🚧 In Progress (Completed up to Phase 6)

---

## Phase 0 — Setup Project ✅
* [x] Install Next.js + konfigurasi TypeScript
* [x] Setup Supabase project
* [x] Konfigurasi .env (SUPABASE_URL, SUPABASE_ANON_KEY)
* [x] Buat struktur folder

---

## Phase 1 — Database & Supabase Setup ✅
Target: Semua tabel siap di Supabase
* [x] Jalankan query buat semua tabel di Supabase SQL Editor
    * users, kategori_barang, satuan, supplier
    * barang, persediaan, barang_masuk, barang_keluar
* [x] Buat Storage Bucket barang-images + set policy
* [x] Setup RLS (Row Level Security) di setiap tabel
* [x] Insert data dummy untuk testing 
    * 3 users, 5 kategori, 3 satuan, 4 supplier, 10 barang

---

## Phase 2 — Supabase Client + Types ✅
Target: Koneksi ke Supabase siap, semua types terdefinisi
* [x] Buat `lib/supabase/client.ts` (browser client)
* [x] Buat `lib/supabase/server.ts` (server client)
* [x] Definisikan semua TypeScript types sesuai struktur tabel (`barang.ts`, `supplier.ts`, `transaksi.ts`, `users.ts`, `index.ts`)
* [x] Test koneksi: coba select sederhana dari 1 tabel

---

## Phase 3 — Repositories Layer ✅
Target: Semua fungsi query ke Supabase selesai & tested
* [x] `kategoriRepository.ts` → getAll (untuk dropdown)
* [x] `satuanRepository.ts` → getAll (untuk dropdown)
* [x] `supplierRepository.ts` → getAll, getById, insert, update, delete
* [x] `barangRepository.ts` → getAll, getById, insert, update, delete
* [x] `persediaanRepository.ts` → getAll, getById, update stok
* [x] `barangMasukRepository.ts` → getAll, getById, insert, update, delete
* [x] `barangKeluarRepository.ts` → getAll, getById, insert, update, delete
* [x] `usersRepository.ts` → getAll, getById, insert, update, delete
> *Catatan: Setiap repository hanya berisi query Supabase, tidak ada logic bisnis.*

---

## Phase 4 — Services Layer ✅
Target: Semua business logic selesai
* [x] `supplierService.ts`: createSupplier (kode S001...), update, delete, getAll
* [x] `barangService.ts`: createBarang (kode 000001...), update, delete + hapus gambar, getAll (relasi kategori & satuan)
* [x] `transaksiService.ts`: createBarangMasuk, createBarangKeluar (validasi stok), kalkulasi HPP otomatis
* [x] `dashboardService.ts`: hitung total (kategori, pengguna, supplier, transaksi) & persentase vs bulan lalu

---

## Phase 5 — Server Actions + Storage ✅
Target: Entry point dari UI siap dipanggil
* [x] Buat `utils/response.ts` → standard return `{ success, message, data?, error? }`
* [x] Buat `utils/formatter.ts` → format currency, tanggal
* [x] Buat `utils/generateCode.ts` → generate semua kode unik
* [x] Buat `storage/uploadImage.ts` + `deleteImage.ts`
* [x] Buat semua Server Actions (panggil service, return response standar)

---

## Phase 6 — Authentication ✅
Target: Login/logout berfungsi, halaman terlindungi
* [x] Aktifkan Supabase Auth di dashboard Supabase
* [x] Buat halaman `app/login/page.tsx`
* [x] Buat form login (email + password)
* [x] Buat Server Action `actions/auth/login.ts` dan `logout.ts`
* [x] Buat `middleware.ts` di root src/ untuk proteksi semua route
* [x] Test: akses /dashboard tanpa login → redirect ke /login

---

## Phase 7 — UI Components ⏳
Target: Semua komponen reusable selesai
* [ ] **Shared Components:**
    * Sidebar.tsx, Navbar.tsx
    * Pagination.tsx
    * TableSkeleton.tsx (loading state)
    * ConfirmDialog.tsx (konfirmasi hapus)
* [ ] **Per Fitur:**
    * `components/supplier/` → SupplierTable, SupplierForm
    * `components/barang/` → BarangTable, BarangForm, BarangImageUpload
    * `components/transaksi/` → semua table & form transaksi
    * `components/dashboard/` → StatCard dengan mini chart

---

## Phase 8 — Halaman (Pages) ⏳
Target: Semua halaman terhubung ke komponen & actions
* [ ] `app/dashboard/page.tsx` → tampilkan StatCard
* [ ] `app/hak-akses/page.tsx` → tabel users + CRUD
* [ ] `app/data-master/supplier/page.tsx` → tabel + CRUD
* [ ] `app/data-master/barang/page.tsx` → tabel + CRUD + upload gambar
* [ ] `app/transaksi/persediaan/page.tsx` → tabel read only
* [ ] `app/transaksi/barang-masuk/page.tsx` → tabel + tambah transaksi
* [ ] `app/transaksi/barang-keluar/page.tsx` → tabel + tambah transaksi
* [ ] `app/laporan/page.tsx`
* [ ] `app/pengaturan/page.tsx`

---

## Phase 9 — Testing & Polish ⏳
Target: Aplikasi siap digunakan
* [ ] Test semua CRUD flow dari UI
* [ ] Test upload gambar barang
* [ ] Test transaksi masuk → cek stok persediaan bertambah
* [ ] Test transaksi keluar → cek stok persediaan berkurang
* [ ] Test transaksi keluar saat stok tidak cukup → harus muncul error
* [ ] Cek semua perhitungan dashboard sudah benar
* [ ] Responsif di ukuran layar yang berbeda