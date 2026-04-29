'use client';
// components/shared/Sidebar.tsx

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
  roles?: UserRole[];
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
    <aside className="fixed left-0 top-0 h-screen w-[260px] bg-white/70 backdrop-blur-2xl border-r border-white/40 shadow-[4px_0_24px_rgba(0,0,0,0.02)] flex flex-col z-40 overflow-y-auto overflow-x-hidden transition-all duration-300">
      {/* Logo */}
      <div className="flex items-center justify-center pt-8 pb-6 px-4">
        <div className="flex items-center gap-3 bg-white/80 border border-white/60 shadow-sm rounded-2xl p-3 w-full">
          <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-inner">
            <Package size={20} className="text-white" />
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-[14px] text-slate-800 leading-tight">Akurat Sukses</span>
            <span className="text-[11px] font-semibold text-purple-600">Inventory System</span>
          </div>
        </div>
      </div>

      {/* Nav Items */}
      <nav className="flex-1 px-4 flex flex-col gap-1.5 pb-8">
        {NAV_ITEMS.map((item) => {
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
              className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-medium text-[13px] transition-all duration-200 ${
                isActive 
                  ? 'bg-purple-600 text-white shadow-md shadow-purple-600/20' 
                  : 'text-slate-500 hover:bg-purple-50 hover:text-purple-700'
              }`}
            >
              <div className={`${isActive ? 'text-white' : 'text-slate-400'}`}>
                {item.icon}
              </div>
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
  const isAnyChildActive = item.children?.some((c) => pathname.startsWith(c.href));
  const [open, setOpen] = useState(isAnyChildActive ?? false);

  return (
    <div className="flex flex-col gap-1 mt-1">
      <button
        className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-medium text-[13px] transition-all duration-200 w-full text-left ${
          isAnyChildActive && !open
            ? 'bg-purple-50 text-purple-700'
            : 'text-slate-600 hover:bg-slate-50'
        }`}
        onClick={() => setOpen((v) => !v)}
      >
        <div className="text-slate-400">
          {item.icon}
        </div>
        <span className="flex-1">{item.label}</span>
        <div className={`transition-transform duration-200 text-slate-400 ${open ? 'rotate-90' : ''}`}>
          <ChevronRight size={14} />
        </div>
      </button>

      <div 
        className={`flex flex-col gap-1 overflow-hidden transition-all duration-300 ease-in-out ${
          open ? 'max-h-48 opacity-100 mt-1' : 'max-h-0 opacity-0'
        }`}
      >
        {item.children?.map((child) => {
          const isActive = pathname.startsWith(child.href);
          return (
            <Link
              key={child.href}
              href={child.href}
              className={`flex items-center gap-3 pl-11 pr-3 py-2 rounded-xl text-[12.5px] font-medium transition-all duration-200 ${
                isActive 
                  ? 'bg-purple-50 text-purple-700' 
                  : 'text-slate-500 hover:text-purple-600 hover:bg-slate-50'
              }`}
            >
              <div className={isActive ? 'text-purple-600' : 'text-slate-400'}>
                {child.icon}
              </div>
              <span>{child.label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
