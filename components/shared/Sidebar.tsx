'use client';
// components/shared/Sidebar.tsx
// Sidebar navigasi utama — sesuai UI screenshot

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  ShieldCheck,
  Database,
  ArrowRightLeft,
  FileText,
  Settings,
  ChevronDown,
  ChevronRight,
  Package,
  Truck,
  PackageOpen,
  PackageMinus,
  BarChart3,
} from 'lucide-react';
import { useState } from 'react';
import type { UserRole } from '@/types';

interface NavItem {
  label: string;
  href?: string;
  icon: React.ReactNode;
  children?: { label: string; href: string; icon: React.ReactNode }[];
  roles?: UserRole[]; // jika undefined → semua role bisa akses
}

const NAV_ITEMS: NavItem[] = [
  {
    label: 'Beranda',
    href: '/dashboard',
    icon: <LayoutDashboard size={18} />,
  },
  {
    label: 'Hak Akses',
    href: '/hak-akses',
    icon: <ShieldCheck size={18} />,
    roles: ['Admin'],
  },
  {
    label: 'Data Master',
    icon: <Database size={18} />,
    children: [
      {
        label: 'Supplier',
        href: '/data-master/supplier',
        icon: <Truck size={16} />,
      },
      {
        label: 'Barang',
        href: '/data-master/barang',
        icon: <Package size={16} />,
      },
    ],
  },
  {
    label: 'Transaksi',
    icon: <ArrowRightLeft size={18} />,
    children: [
      {
        label: 'Persediaan',
        href: '/transaksi/persediaan',
        icon: <BarChart3 size={16} />,
      },
      {
        label: 'Barang Masuk',
        href: '/transaksi/barang-masuk',
        icon: <PackageOpen size={16} />,
      },
      {
        label: 'Barang Keluar',
        href: '/transaksi/barang-keluar',
        icon: <PackageMinus size={16} />,
      },
    ],
  },
  {
    label: 'Laporan',
    href: '/laporan',
    icon: <FileText size={18} />,
  },
  {
    label: 'Pengaturan',
    href: '/pengaturan',
    icon: <Settings size={18} />,
  },
];

interface SidebarProps {
  userRole: UserRole;
}

export function Sidebar({ userRole }: SidebarProps) {
  const pathname = usePathname();

  return (
    <aside className="sidebar">
      {/* Logo */}
      <div className="sidebar-logo">
        <div className="sidebar-logo-icon">
          <svg
            width="28"
            height="28"
            viewBox="0 0 40 40"
            fill="none"
          >
            <polygon
              points="20,4 36,32 4,32"
              fill="none"
              stroke="#f59e0b"
              strokeWidth="2.5"
            />
            <line
              x1="20"
              y1="4"
              x2="20"
              y2="32"
              stroke="#f59e0b"
              strokeWidth="2"
            />
            <line
              x1="12"
              y1="18"
              x2="28"
              y2="18"
              stroke="#f59e0b"
              strokeWidth="2"
            />
          </svg>
        </div>
      </div>

      {/* Search */}
      <div className="sidebar-search">
        <input
          type="text"
          placeholder="Search"
          className="sidebar-search-input"
        />
      </div>

      {/* Nav Items */}
      <nav className="sidebar-nav">
        {NAV_ITEMS.map((item) => {
          // Filter berdasarkan role
          if (item.roles && !item.roles.includes(userRole)) return null;

          if (item.children) {
            return (
              <SidebarGroup
                key={item.label}
                item={item}
                pathname={pathname}
              />
            );
          }

          const isActive = item.href ? pathname === item.href : false;
          return (
            <Link
              key={item.label}
              href={item.href!}
              className={`sidebar-item ${isActive ? 'active' : ''}`}
            >
              {item.icon}
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}

// ─── Sidebar Group (dengan sub-menu collapsible) ───────────────────────────
function SidebarGroup({ item, pathname }: { item: NavItem; pathname: string }) {
  // Auto-expand jika salah satu child aktif
  const isAnyChildActive = item.children?.some((c) => pathname.startsWith(c.href));
  const [open, setOpen] = useState(isAnyChildActive ?? false);

  return (
    <div className="sidebar-group">
      <button
        className={`sidebar-item sidebar-group-trigger ${open ? 'group-open' : ''}`}
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
      >
        {item.icon}
        <span>{item.label}</span>
        <span className="sidebar-chevron">{open ? <ChevronDown size={14} /> : <ChevronRight size={14} />}</span>
      </button>

      {open && (
        <div className="sidebar-sub">
          {item.children?.map((child) => {
            const isActive = pathname.startsWith(child.href);
            return (
              <Link
                key={child.href}
                href={child.href}
                className={`sidebar-sub-item ${isActive ? 'active' : ''}`}
              >
                {child.icon}
                <span>{child.label}</span>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
