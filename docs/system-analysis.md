# 📦 Inventory Management System — System Analysis

## 🎯 Overview
Aplikasi ini adalah sistem manajemen persediaan barang yang digunakan untuk mengelola data barang, supplier, transaksi masuk & keluar, serta laporan inventaris.

---

## 🧩 Fitur Utama

### 1. Dashboard
Menampilkan ringkasan statistik utama:
- Total kategori barang
- Total pengguna
- Total supplier
- Total barang masuk
- Total barang keluar
- Total persediaan

Setiap statistik dilengkapi:
- Mini chart tren
- Perbandingan dengan bulan sebelumnya (persentase naik/turun)

---

### 2. Hak Akses (User Management)
Mengelola pengguna dan akses sistem.

Fitur:
- Daftar pengguna (nama, ID, email, status)
- Tambah / edit / hapus pengguna
- Export data
- Pencarian & pagination

---

### 3. Data Master

#### 3.1 Supplier
- Nama supplier
- ID supplier
- Kontak
- Email
- Alamat
- Telepon

Fitur:
- CRUD
- Export
- Search & pagination

---

#### 3.2 Barang
- Nama barang
- ID barang
- Kategori
- Satuan
- Harga

Fitur:
- CRUD
- Filter kategori
- Export
- Search & pagination

---

### 4. Transaksi

#### 4.1 Persediaan
Menampilkan stok saat ini:
- ID persediaan
- ID barang
- Nama barang
- Jumlah stok
- HPP

---

#### 4.2 Barang Masuk
- ID transaksi
- Barang
- Supplier
- User
- Jumlah
- Tanggal
- Total harga

Fitur:
- CRUD
- Detail transaksi
- Export
- Filter & search

---

#### 4.3 Barang Keluar
- ID transaksi
- Barang
- User
- Jumlah
- Tanggal
- HPP
- Total HPP

Fitur:
- CRUD
- Validasi stok
- Export
- Filter & search

---

### 5. Laporan
Berisi laporan:
- Barang masuk
- Barang keluar
- Persediaan
- Laporan periode

Fitur:
- Filter tanggal
- Export / print

---

### 6. Pengaturan
Konfigurasi sistem:
- Profil perusahaan
- Kategori barang
- Satuan

---

### 7. User Profile
Menampilkan:
- Nama user
- Role (Admin / Staff)
- Logout