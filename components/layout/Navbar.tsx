'use client';
// components/layout/Navbar.tsx

import { Menu, X, Moon, Sun } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useTheme } from 'next-themes';
import { useSidebar } from '@/context/SidebarContext';

// Fix: gunakan suppressHydrationWarning pattern via next-themes built-in,
// tidak perlu mounted state manual — next-themes sudah handle hydration mismatch.
// Cukup render icon kondisional dengan resolvedTheme.

const PAGE_TITLES: [string, string, boolean][] = [
  ['/dashboard', 'Beranda', true /* exact */],
  ['/hak-akses', 'Hak Akses', true],
  ['/data-master/supplier', 'Data Supplier', false],
  ['/data-master/barang', 'Data Barang', false],
  ['/transaksi/persediaan', 'Persediaan', false],
  ['/transaksi/barang-masuk', 'Barang Masuk', false],
  ['/transaksi/barang-keluar', 'Barang Keluar', false],
  ['/laporan', 'Laporan', false],
  ['/pengaturan', 'Pengaturan', false],
];

function getTitle(pathname: string) {
  for (const [path, label, exact] of PAGE_TITLES) {
    if (exact ? pathname === path : pathname.startsWith(path)) return label;
  }
  return 'Dashboard';
}

export function Navbar() {
  const { open, toggle } = useSidebar();
  const pathname = usePathname();

  // Fix: pakai resolvedTheme + suppressHydrationWarning,
  // tidak perlu useState(mounted) + useEffect yang sebabkan ESLint error.
  const { resolvedTheme, setTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';

  return (
    <header
      className="sticky top-0 z-30 flex items-center gap-3 px-5 shrink-0"
      style={{
        height: 60,
        background: 'var(--color-background)',
        borderBottom: '1px solid var(--color-border)',
        boxShadow: '0 1px 0 rgba(255,255,255,0.6)',
      }}
    >
      {/* Hamburger — satu-satunya toggle, icon Menu/X */}
      <button
        onClick={toggle}
        aria-label={open ? 'Tutup sidebar' : 'Buka sidebar'}
        aria-expanded={open}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: 36,
          height: 36,
          borderRadius: 10,
          flexShrink: 0,
          border: `1px solid ${open ? 'rgba(124,58,237,0.2)' : 'var(--color-border)'}`,
          background: open ? 'rgba(124,58,237,0.08)' : 'var(--color-surface)',
          cursor: 'pointer',
          color: open ? 'var(--color-primary)' : 'var(--color-text-secondary)',
          transition: 'background 0.18s, color 0.18s, border-color 0.18s',
          boxShadow: 'var(--shadow-sm)',
        }}
      >
        {open ? (
          <X
            size={16}
            strokeWidth={2.3}
          />
        ) : (
          <Menu
            size={16}
            strokeWidth={2.2}
          />
        )}
      </button>

      {/* Page title */}
      <h1
        style={{
          flex: 1,
          fontSize: 15,
          fontWeight: 700,
          color: 'var(--color-text-primary)',
          letterSpacing: '-0.02em',
          lineHeight: 1,
          margin: 0,
        }}
      >
        {getTitle(pathname)}
      </h1>

      {/* Dark mode toggle — suppressHydrationWarning agar tidak flicker */}
      <button
        onClick={() => setTheme(isDark ? 'light' : 'dark')}
        aria-label="Toggle dark mode"
        suppressHydrationWarning
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: 36,
          height: 36,
          borderRadius: 10,
          flexShrink: 0,
          border: '1px solid var(--color-border)',
          background: 'var(--color-surface)',
          cursor: 'pointer',
          color: 'var(--color-text-secondary)',
          transition: 'background 0.18s, color 0.18s',
          boxShadow: 'var(--shadow-sm)',
        }}
      >
        {/* suppressHydrationWarning pada span inner agar icon tidak mismatch */}
        <span suppressHydrationWarning>
          {isDark ? (
            <Sun
              size={16}
              strokeWidth={2.2}
            />
          ) : (
            <Moon
              size={16}
              strokeWidth={2.2}
            />
          )}
        </span>
      </button>
    </header>
  );
}
