-- =========================================
-- EXTENSION
-- =========================================
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- =========================================
-- STORAGE BUCKET
-- =========================================
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'barang-images',
  'barang-images',
  true,
  2097152,
  ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif']
);

-- =========================================
-- STORAGE POLICY
-- =========================================

-- Public read
CREATE POLICY "Public read barang images"
ON storage.objects FOR SELECT
USING (bucket_id = 'barang-images');

-- Authenticated insert
CREATE POLICY "Authenticated users can upload barang images"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'barang-images');

-- Authenticated update
CREATE POLICY "Authenticated users can update barang images"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'barang-images');

-- Authenticated delete
CREATE POLICY "Authenticated users can delete barang images"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'barang-images');

-- =========================================
-- TABLE: users
-- =========================================
CREATE TABLE users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  user_code VARCHAR(10) UNIQUE NOT NULL,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(150) UNIQUE NOT NULL,
  role VARCHAR(50) NOT NULL,
  avatar_url TEXT,
  status VARCHAR(20) DEFAULT 'Active',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =========================================
-- TABLE: kategori_barang
-- =========================================
CREATE TABLE kategori_barang (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  kode_kategori VARCHAR(20) UNIQUE NOT NULL,
  nama_kategori VARCHAR(100) NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =========================================
-- TABLE: satuan
-- =========================================
CREATE TABLE satuan (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nama_satuan VARCHAR(50) UNIQUE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =========================================
-- TABLE: supplier
-- =========================================
CREATE TABLE supplier (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  supplier_code VARCHAR(10) UNIQUE NOT NULL,
  nama_supplier VARCHAR(150) NOT NULL,
  nama_kontak VARCHAR(100),
  email VARCHAR(150),
  alamat TEXT,
  no_telepon VARCHAR(20),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =========================================
-- TABLE: barang
-- =========================================
CREATE TABLE barang (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  barang_code VARCHAR(10) UNIQUE NOT NULL,
  nama_barang VARCHAR(200) NOT NULL,
  id_kategori UUID NOT NULL REFERENCES kategori_barang(id) ON DELETE RESTRICT,
  id_satuan UUID NOT NULL REFERENCES satuan(id) ON DELETE RESTRICT,
  harga NUMERIC(15,2) NOT NULL DEFAULT 0,
  image_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =========================================
-- TABLE: persediaan
-- =========================================
CREATE TABLE persediaan (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  persediaan_code VARCHAR(15) UNIQUE NOT NULL,
  id_barang UUID NOT NULL UNIQUE REFERENCES barang(id) ON DELETE CASCADE,
  stok INTEGER NOT NULL DEFAULT 0,
  hpp NUMERIC(15,2) NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =========================================
-- TABLE: barang_masuk
-- =========================================
CREATE TABLE barang_masuk (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  barang_masuk_code VARCHAR(15) UNIQUE NOT NULL,
  id_barang UUID NOT NULL REFERENCES barang(id) ON DELETE RESTRICT,
  id_pengguna UUID NOT NULL REFERENCES users(id) ON DELETE RESTRICT,
  id_supplier UUID NOT NULL REFERENCES supplier(id) ON DELETE RESTRICT,
  jumlah_masuk INTEGER NOT NULL CHECK (jumlah_masuk > 0),
  tanggal_masuk DATE NOT NULL,
  total_harga NUMERIC(15,2) NOT NULL DEFAULT 0,
  keterangan TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =========================================
-- TABLE: barang_keluar
-- =========================================
CREATE TABLE barang_keluar (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  barang_keluar_code VARCHAR(15) UNIQUE NOT NULL,
  id_pengguna UUID NOT NULL REFERENCES users(id) ON DELETE RESTRICT,
  id_barang UUID NOT NULL REFERENCES barang(id) ON DELETE RESTRICT,
  jumlah_keluar INTEGER NOT NULL CHECK (jumlah_keluar > 0),
  tanggal_keluar DATE NOT NULL,
  hpp NUMERIC(15,2) NOT NULL DEFAULT 0,
  total_hpp NUMERIC(15,2) NOT NULL DEFAULT 0,
  keterangan TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =========================================
-- INDEXING (PERFORMANCE)
-- =========================================
CREATE INDEX idx_barang_kategori ON barang(id_kategori);
CREATE INDEX idx_barang_satuan ON barang(id_satuan);
CREATE INDEX idx_persediaan_barang ON persediaan(id_barang);
CREATE INDEX idx_barang_masuk_barang ON barang_masuk(id_barang);
CREATE INDEX idx_barang_keluar_barang ON barang_keluar(id_barang);

-- =========================================
-- TRIGGER: UPDATE TIMESTAMP
-- =========================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_timestamp_users
BEFORE UPDATE ON users
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER set_timestamp_barang
BEFORE UPDATE ON barang
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER set_timestamp_supplier
BEFORE UPDATE ON supplier
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER set_timestamp_kategori
BEFORE UPDATE ON kategori_barang
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER set_timestamp_persediaan
BEFORE UPDATE ON persediaan
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- =========================================
-- TRIGGER: AUTO INSERT PERSEDIAAN SAAT BARANG DIBUAT
-- =========================================
CREATE OR REPLACE FUNCTION create_persediaan_on_barang()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO persediaan (persediaan_code, id_barang, stok, hpp)
  VALUES (
    'PS-' || NEW.barang_code,
    NEW.id,
    0,
    0
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_create_persediaan
AFTER INSERT ON barang
FOR EACH ROW
EXECUTE FUNCTION create_persediaan_on_barang();

-- =========================================
-- TRIGGER: BARANG MASUK (TAMBAH STOK)
-- =========================================
CREATE OR REPLACE FUNCTION update_stok_masuk()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE persediaan
  SET stok = stok + NEW.jumlah_masuk
  WHERE id_barang = NEW.id_barang;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_barang_masuk
AFTER INSERT ON barang_masuk
FOR EACH ROW
EXECUTE FUNCTION update_stok_masuk();

-- =========================================
-- TRIGGER: BARANG KELUAR (KURANGI STOK)
-- =========================================
CREATE OR REPLACE FUNCTION update_stok_keluar()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE persediaan
  SET stok = stok - NEW.jumlah_keluar
  WHERE id_barang = NEW.id_barang;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_barang_keluar
AFTER INSERT ON barang_keluar
FOR EACH ROW
EXECUTE FUNCTION update_stok_keluar();


-- =========================================
-- TABLE: fitur
-- =========================================
CREATE TABLE fitur (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  kode_fitur   VARCHAR(50) UNIQUE NOT NULL,
  nama_fitur   VARCHAR(100) NOT NULL,
  kategori     VARCHAR(50) NOT NULL,
  urutan       INTEGER DEFAULT 0,
  created_at   TIMESTAMPTZ DEFAULT NOW()
);

-- =========================================
-- TABLE: user_permissions
-- =========================================
CREATE TABLE user_permissions (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  id_user      UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  id_fitur     UUID NOT NULL REFERENCES fitur(id) ON DELETE CASCADE,
  can_create   BOOLEAN DEFAULT false,
  can_read     BOOLEAN DEFAULT true,
  can_update   BOOLEAN DEFAULT false,
  can_delete   BOOLEAN DEFAULT false,
  created_at   TIMESTAMPTZ DEFAULT NOW(),
  updated_at   TIMESTAMPTZ DEFAULT NOW(),

  UNIQUE(id_user, id_fitur)
);

-- =========================================
-- INDEXING
-- =========================================
CREATE INDEX idx_user_permissions_user  ON user_permissions(id_user);
CREATE INDEX idx_user_permissions_fitur ON user_permissions(id_fitur);

-- =========================================
-- TRIGGER: UPDATE TIMESTAMP user_permissions
-- =========================================
CREATE TRIGGER set_timestamp_user_permissions
BEFORE UPDATE ON user_permissions
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- =========================================
-- SEED: DATA FITUR
-- =========================================
INSERT INTO fitur (kode_fitur, nama_fitur, kategori, urutan) VALUES
('dashboard',          'Dashboard',          'general',   1),
('hak_akses',          'Hak Akses',          'general',   2),
('data_supplier',      'Data Supplier',      'master',    3),
('data_barang',        'Data Barang',        'master',    4),
('data_persediaan',    'Data Persediaan',    'master',    5),
('data_barang_masuk',  'Data Barang Masuk',  'transaksi', 6),
('data_barang_keluar', 'Data Barang Keluar', 'transaksi', 7),
('data_pembelian',     'Data Pembelian',     'transaksi', 8),
('laporan',            'Laporan',            'laporan',   9),
('pengaturan',         'Pengaturan',         'system',    10);

-- =========================================
-- FUNCTION: AUTO PERMISSION SAAT USER BARU
-- =========================================
CREATE OR REPLACE FUNCTION create_default_permissions()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO user_permissions (id_user, id_fitur, can_create, can_read, can_update, can_delete)
  SELECT
    NEW.id,
    fitur.id,
    false,
    true,
    false,
    false
  FROM fitur;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_create_default_permissions
AFTER INSERT ON users
FOR EACH ROW
EXECUTE FUNCTION create_default_permissions();

-- =========================================
-- FUNCTION: AUTO PERMISSION SAAT FITUR BARU
-- =========================================
CREATE OR REPLACE FUNCTION create_permissions_for_new_fitur()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO user_permissions (id_user, id_fitur, can_create, can_read, can_update, can_delete)
  SELECT
    users.id,
    NEW.id,
    false,
    true,
    false,
    false
  FROM users;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_permissions_for_new_fitur
AFTER INSERT ON fitur
FOR EACH ROW
EXECUTE FUNCTION create_permissions_for_new_fitur();

-- =========================================
-- RLS: ENABLE
-- =========================================
ALTER TABLE fitur            ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_permissions ENABLE ROW LEVEL SECURITY;