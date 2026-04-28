-- =========================================
-- PHASE 1 — ROW LEVEL SECURITY (RLS)
-- Jalankan di Supabase SQL Editor
-- =========================================

-- =========================================
-- ENABLE RLS di semua tabel
-- =========================================
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE kategori_barang ENABLE ROW LEVEL SECURITY;
ALTER TABLE satuan ENABLE ROW LEVEL SECURITY;
ALTER TABLE supplier ENABLE ROW LEVEL SECURITY;
ALTER TABLE barang ENABLE ROW LEVEL SECURITY;
ALTER TABLE persediaan ENABLE ROW LEVEL SECURITY;
ALTER TABLE barang_masuk ENABLE ROW LEVEL SECURITY;
ALTER TABLE barang_keluar ENABLE ROW LEVEL SECURITY;

-- =========================================
-- POLICY: users
-- Hanya authenticated user yang bisa read/write
-- =========================================
CREATE POLICY "Authenticated can read users"
ON users FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "Authenticated can insert users"
ON users FOR INSERT
TO authenticated
WITH CHECK (true);

CREATE POLICY "Authenticated can update users"
ON users FOR UPDATE
TO authenticated
USING (true);

CREATE POLICY "Authenticated can delete users"
ON users FOR DELETE
TO authenticated
USING (true);

-- =========================================
-- POLICY: kategori_barang
-- =========================================
CREATE POLICY "Authenticated can read kategori"
ON kategori_barang FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "Authenticated can insert kategori"
ON kategori_barang FOR INSERT
TO authenticated
WITH CHECK (true);

CREATE POLICY "Authenticated can update kategori"
ON kategori_barang FOR UPDATE
TO authenticated
USING (true);

CREATE POLICY "Authenticated can delete kategori"
ON kategori_barang FOR DELETE
TO authenticated
USING (true);

-- =========================================
-- POLICY: satuan
-- =========================================
CREATE POLICY "Authenticated can read satuan"
ON satuan FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "Authenticated can insert satuan"
ON satuan FOR INSERT
TO authenticated
WITH CHECK (true);

CREATE POLICY "Authenticated can update satuan"
ON satuan FOR UPDATE
TO authenticated
USING (true);

CREATE POLICY "Authenticated can delete satuan"
ON satuan FOR DELETE
TO authenticated
USING (true);

-- =========================================
-- POLICY: supplier
-- =========================================
CREATE POLICY "Authenticated can read supplier"
ON supplier FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "Authenticated can insert supplier"
ON supplier FOR INSERT
TO authenticated
WITH CHECK (true);

CREATE POLICY "Authenticated can update supplier"
ON supplier FOR UPDATE
TO authenticated
USING (true);

CREATE POLICY "Authenticated can delete supplier"
ON supplier FOR DELETE
TO authenticated
USING (true);

-- =========================================
-- POLICY: barang
-- =========================================
CREATE POLICY "Authenticated can read barang"
ON barang FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "Authenticated can insert barang"
ON barang FOR INSERT
TO authenticated
WITH CHECK (true);

CREATE POLICY "Authenticated can update barang"
ON barang FOR UPDATE
TO authenticated
USING (true);

CREATE POLICY "Authenticated can delete barang"
ON barang FOR DELETE
TO authenticated
USING (true);

-- =========================================
-- POLICY: persediaan
-- =========================================
CREATE POLICY "Authenticated can read persediaan"
ON persediaan FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "Authenticated can insert persediaan"
ON persediaan FOR INSERT
TO authenticated
WITH CHECK (true);

CREATE POLICY "Authenticated can update persediaan"
ON persediaan FOR UPDATE
TO authenticated
USING (true);

CREATE POLICY "Authenticated can delete persediaan"
ON persediaan FOR DELETE
TO authenticated
USING (true);

-- =========================================
-- POLICY: barang_masuk
-- =========================================
CREATE POLICY "Authenticated can read barang_masuk"
ON barang_masuk FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "Authenticated can insert barang_masuk"
ON barang_masuk FOR INSERT
TO authenticated
WITH CHECK (true);

CREATE POLICY "Authenticated can update barang_masuk"
ON barang_masuk FOR UPDATE
TO authenticated
USING (true);

CREATE POLICY "Authenticated can delete barang_masuk"
ON barang_masuk FOR DELETE
TO authenticated
USING (true);

-- =========================================
-- POLICY: barang_keluar
-- =========================================
CREATE POLICY "Authenticated can read barang_keluar"
ON barang_keluar FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "Authenticated can insert barang_keluar"
ON barang_keluar FOR INSERT
TO authenticated
WITH CHECK (true);

CREATE POLICY "Authenticated can update barang_keluar"
ON barang_keluar FOR UPDATE
TO authenticated
USING (true);

CREATE POLICY "Authenticated can delete barang_keluar"
ON barang_keluar FOR DELETE
TO authenticated
USING (true);


-- =========================================
-- POLICY: FITUR
-- semua user login bisa read daftar fitur
-- =========================================
CREATE POLICY "Authenticated can read fitur"
ON fitur FOR SELECT
TO authenticated
USING (true);

-- =========================================
-- POLICY: USER PERMISSIONS — SELECT
-- user biasa hanya baca milik sendiri
-- admin bisa baca semua
-- =========================================
CREATE POLICY "Read own or admin read all permissions"
ON user_permissions FOR SELECT
TO authenticated
USING (
  id_user = auth.uid()
  OR
  EXISTS (
    SELECT 1 FROM users
    WHERE users.id = auth.uid()
    AND users.role = 'admin'
  )
);

-- =========================================
-- POLICY: USER PERMISSIONS — INSERT
-- hanya admin yang bisa insert permission
-- =========================================
CREATE POLICY "Admin can insert user_permissions"
ON user_permissions FOR INSERT
TO authenticated
WITH CHECK (
  EXISTS (
    SELECT 1 FROM users
    WHERE users.id = auth.uid()
    AND users.role = 'admin'
  )
);

-- =========================================
-- POLICY: USER PERMISSIONS — UPDATE
-- hanya admin yang bisa update permission
-- =========================================
CREATE POLICY "Admin can update user_permissions"
ON user_permissions FOR UPDATE
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM users
    WHERE users.id = auth.uid()
    AND users.role = 'admin'
  )
)
WITH CHECK (
  EXISTS (
    SELECT 1 FROM users
    WHERE users.id = auth.uid()
    AND users.role = 'admin'
  )
);

-- =========================================
-- POLICY: USER PERMISSIONS — DELETE
-- hanya admin yang bisa delete permission
-- =========================================
CREATE POLICY "Admin can delete user_permissions"
ON user_permissions FOR DELETE
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM users
    WHERE users.id = auth.uid()
    AND users.role = 'admin'
  )
);

-- =========================================
-- VIEW: v_user_permissions
-- memudahkan query di Next.js tanpa manual join
-- =========================================
CREATE OR REPLACE VIEW v_user_permissions AS
SELECT
  up.id           AS permission_id,
  up.id_user,
  u.name          AS nama_user,
  u.user_code,
  u.role,
  f.id            AS id_fitur,
  f.kode_fitur,
  f.nama_fitur,
  f.kategori,
  f.urutan,
  up.can_create,
  up.can_read,
  up.can_update,
  up.can_delete
FROM user_permissions up
JOIN users u ON u.id = up.id_user
JOIN fitur f ON f.id = up.id_fitur
ORDER BY f.urutan;

-- =========================================
-- BACKFILL: generate permission untuk
-- user yang sudah ada sebelum trigger dibuat
-- =========================================
INSERT INTO user_permissions (id_user, id_fitur, can_create, can_read, can_update, can_delete)
SELECT
  u.id,
  f.id,
  false,
  true,
  false,
  false
FROM users u
CROSS JOIN fitur f
ON CONFLICT (id_user, id_fitur) DO NOTHING;