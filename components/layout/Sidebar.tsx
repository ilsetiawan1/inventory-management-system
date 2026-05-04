'use client';
// components/layout/Sidebar.tsx

import { LayoutDashboard, ShieldCheck, Database, ArrowRightLeft, FileText, Settings, Package, Truck, PackageOpen, PackageMinus, BarChart3, LogOut } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useTransition } from 'react';
import { toast } from 'sonner';
import { actionLogout } from '@/lib/actions/auth';
import type { UserRole } from '@/types';
import { NavItem, NavGroup } from './SidebarNav';
import { useSidebar } from '@/context/SidebarContext';
/* ── Nav definition ─────────────────────────────────────────── */
type NavDef =
  | { type: 'link'; label: string; href: string; icon: React.ReactNode; roles?: UserRole[] }
  | { type: 'group'; label: string; icon: React.ReactNode; roles?: UserRole[]; children: { label: string; href: string; icon: React.ReactNode }[] }
  | { type: 'divider'; label?: string };

const NAV: NavDef[] = [
  {
    type: 'link',
    label: 'Beranda',
    href: '/dashboard',
    icon: (
      <LayoutDashboard
        size={15}
        strokeWidth={1.8}
      />
    ),
  },
  {
    type: 'link',
    label: 'Hak Akses',
    href: '/hak-akses',
    icon: (
      <ShieldCheck
        size={15}
        strokeWidth={1.8}
      />
    ),
    roles: ['Admin'],
  },
  { type: 'divider', label: 'Manajemen' },
  {
    type: 'group',
    label: 'Data Master',
    icon: (
      <Database
        size={15}
        strokeWidth={1.8}
      />
    ),
    children: [
      {
        label: 'Supplier',
        href: '/data-master/supplier',
        icon: (
          <Truck
            size={13}
            strokeWidth={1.8}
          />
        ),
      },
      {
        label: 'Barang',
        href: '/data-master/barang',
        icon: (
          <Package
            size={13}
            strokeWidth={1.8}
          />
        ),
      },
    ],
  },
  {
    type: 'group',
    label: 'Transaksi',
    icon: (
      <ArrowRightLeft
        size={15}
        strokeWidth={1.8}
      />
    ),
    children: [
      {
        label: 'Persediaan',
        href: '/transaksi/persediaan',
        icon: (
          <BarChart3
            size={13}
            strokeWidth={1.8}
          />
        ),
      },
      {
        label: 'Barang Masuk',
        href: '/transaksi/barang-masuk',
        icon: (
          <PackageOpen
            size={13}
            strokeWidth={1.8}
          />
        ),
      },
      {
        label: 'Barang Keluar',
        href: '/transaksi/barang-keluar',
        icon: (
          <PackageMinus
            size={13}
            strokeWidth={1.8}
          />
        ),
      },
    ],
  },
  { type: 'divider', label: 'Lainnya' },
  {
    type: 'link',
    label: 'Laporan',
    href: '/laporan',
    icon: (
      <FileText
        size={15}
        strokeWidth={1.8}
      />
    ),
  },
  {
    type: 'link',
    label: 'Pengaturan',
    href: '/pengaturan',
    icon: (
      <Settings
        size={15}
        strokeWidth={1.8}
      />
    ),
  },
];

/* ── Props ───────────────────────────────────────────────────── */
interface SidebarProps {
  userRole: UserRole;
  userName: string;
  userEmail: string;
  avatarUrl: string | null;
}

/* ── Component ───────────────────────────────────────────────── */
export function Sidebar({ userRole, userName, userEmail, avatarUrl }: SidebarProps) {
  const pathname = usePathname();
  const { open, close } = useSidebar();
  const [isPending, startTransition] = useTransition();

  const safeName = (userName || 'Pengguna').trim();
  const initials =
    safeName
      .split(/\s+/)
      .slice(0, 2)
      .map((n) => n[0] ?? '')
      .join('')
      .toUpperCase() || 'P';

  function handleLogout() {
    startTransition(async () => {
      toast.loading('Keluar dari sistem...');
      await actionLogout();
    });
  }

  return (
    <>
      <style>{`
        :root { --sb-w: 252px; }

        .sb {
          position: fixed; left: 0; top: 0;
          height: 100svh; width: var(--sb-w);
          display: flex; flex-direction: column;
          z-index: 40;
          background: var(--color-background);
          border-right: 1px solid var(--color-border);
          box-shadow: var(--shadow-md);
          transform: translateX(0);
          transition: transform 0.28s cubic-bezier(0.4,0,0.2,1);
          will-change: transform;
        }
        .sb.closed { transform: translateX(calc(-1 * var(--sb-w))); }

        .sb-hdr {
          display: flex; align-items: center; gap: 10px;
          padding: 20px 16px 17px;
          border-bottom: 1px solid var(--color-border);
          flex-shrink: 0;
        }
        .sb-logo-box {
          width: 34px; height: 34px; border-radius: 10px; flex-shrink: 0;
          background: linear-gradient(135deg, #7c3aed, #5b21b6);
          display: flex; align-items: center; justify-content: center;
          box-shadow: 0 2px 8px rgba(109,40,217,0.28);
        }
        .sb-logo-name { font-size: 12.5px; font-weight: 700; color: var(--color-text-primary); letter-spacing: -0.02em; line-height: 1.2; }
        .sb-logo-sub  { font-size: 10px; font-weight: 600; color: var(--color-primary); letter-spacing: 0.01em; margin-top: 1px; }

        .sb-nav {
          flex: 1; padding: 10px 10px 12px;
          display: flex; flex-direction: column; gap: 2px;
          overflow-y: auto; overflow-x: hidden; scrollbar-width: none;
        }
        .sb-nav::-webkit-scrollbar { display: none; }

        .sb-divider { display: flex; align-items: center; gap: 8px; padding: 12px 6px 5px; }
        .sb-div-txt { font-size: 9.5px; font-weight: 700; letter-spacing: 0.09em; text-transform: uppercase; color: var(--color-text-muted); white-space: nowrap; }
        .sb-div-ln  { flex: 1; height: 1px; background: var(--color-border); }

        .sb-ftr { padding: 10px; border-top: 1px solid var(--color-border); flex-shrink: 0; }
        .sb-ftr-card {
          display: flex; align-items: center; gap: 9px;
          padding: 10px 11px; border-radius: 14px;
          background: var(--color-surface); border: 1px solid var(--color-border);
        }
        .sb-avatar {
          width: 32px; height: 32px; border-radius: 10px; flex-shrink: 0;
          background: linear-gradient(135deg, #ddd6fe, #c4b5fd);
          display: flex; align-items: center; justify-content: center;
          font-size: 11px; font-weight: 700; color: #5b21b6; overflow: hidden;
        }
        .sb-avatar img { width: 100%; height: 100%; object-fit: cover; }
        .sb-uname  { font-size: 12px; font-weight: 600; color: var(--color-text-primary); line-height: 1.2; }
        .sb-uemail { font-size: 10px; color: var(--color-text-muted); margin-top: 1px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 118px; }
        .sb-logout {
          margin-left: auto; flex-shrink: 0;
          display: flex; align-items: center; justify-content: center;
          width: 28px; height: 28px; border-radius: 8px; border: none;
          background: transparent; cursor: pointer; color: var(--color-text-muted);
          transition: background 0.15s, color 0.15s;
        }
        .sb-logout:hover    { background: rgba(239,68,68,0.09); color: #ef4444; }
        .sb-logout:disabled { opacity: 0.4; cursor: not-allowed; }

        .sb-ov {
          position: fixed; inset: 0; z-index: 39;
          background: rgba(15,10,30,0.45);
          backdrop-filter: blur(2px);
          -webkit-backdrop-filter: blur(2px);
          cursor: pointer;
          animation: ovIn 0.2s ease both;
        }
        @keyframes ovIn { from { opacity: 0; } to { opacity: 1; } }

        .app-layout { display: flex; min-height: 100svh; background: var(--color-surface); }
        .app-main {
          flex: 1; min-width: 0; display: flex; flex-direction: column;
          margin-left: 0;
          transition: margin-left 0.28s cubic-bezier(0.4,0,0.2,1);
        }
        @media (min-width: 1024px) {
          .app-main.sb-open { margin-left: var(--sb-w); }
        }
        @media (max-width: 1023px) {
          .app-main { margin-left: 0 !important; }
        }
      `}</style>

      {/* Overlay mobile/tablet */}
      {open && (
        <div
          className="sb-ov lg:hidden"
          onClick={close}
          aria-hidden="true"
        />
      )}

      <aside
        className={`sb${open ? '' : ' closed'}`}
        aria-label="Sidebar"
      >
        {/* Header: logo only, NO close button */}
        <div className="sb-hdr">
          <div className="sb-logo-box">
            <Package
              size={16}
              color="white"
              strokeWidth={2}
            />
          </div>
          <div>
            <div className="sb-logo-name">Akurat Sukses</div>
            <div className="sb-logo-sub">Inventory System</div>
          </div>
        </div>

        {/* Nav */}
        <nav className="sb-nav">
          {NAV.map((item, idx) => {
            if (item.type === 'divider')
              return (
                <div
                  key={`d${idx}`}
                  className="sb-divider"
                >
                  {item.label && <span className="sb-div-txt">{item.label}</span>}
                  <div className="sb-div-ln" />
                </div>
              );
            if (item.roles && !item.roles.includes(userRole)) return null;

            // Fix: gunakan JSX children biasa, bukan children prop
            // (react/no-children-prop error)
            if (item.type === 'group')
              return (
                <NavGroup
                  key={item.label}
                  label={item.label}
                  icon={item.icon}
                >
                  {item.children}
                </NavGroup>
              );

            return (
              <NavItem
                key={item.href}
                href={item.href}
                label={item.label}
                icon={item.icon}
                isActive={pathname === item.href}
              />
            );
          })}
        </nav>

        {/* Footer */}
        <div className="sb-ftr">
          <div className="sb-ftr-card">
            <div className="sb-avatar">
              {avatarUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={avatarUrl}
                  alt={safeName}
                />
              ) : (
                initials
              )}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div className="sb-uname">{safeName}</div>
              <div className="sb-uemail">{userEmail || '—'}</div>
            </div>
            <button
              className="sb-logout"
              onClick={handleLogout}
              disabled={isPending}
              title="Keluar"
              aria-label="Keluar"
            >
              <LogOut
                size={14}
                strokeWidth={2}
              />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
