'use client';
// components/shared/Navbar.tsx
// Top navbar — search, avatar user, tombol logout

import { useState, useTransition } from 'react';
import { LogOut, User } from 'lucide-react';
import { toast } from 'sonner';
import { actionLogout } from '@/lib/actions/auth';
import type { User as UserType } from '@/types';

interface NavbarProps {
  user: UserType | null;
}

export function Navbar({ user }: NavbarProps) {
  const [isPending, startTransition] = useTransition();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  function handleLogout() {
    startTransition(async () => {
      toast.loading('Keluar...');
      await actionLogout();
    });
  }

  const initials = user?.name
    ? user.name
        .split(' ')
        .slice(0, 2)
        .map((n) => n[0])
        .join('')
        .toUpperCase()
    : '?';

  return (
    <header className="navbar">
      {/* Kiri: judul halaman (kosong, diisi tiap page) */}
      <div className="navbar-left" />

      {/* Kanan: avatar + dropdown */}
      <div className="navbar-right">
        <div className="navbar-user">
          <button
            className="navbar-avatar-btn"
            onClick={() => setDropdownOpen((v) => !v)}
            aria-haspopup="true"
            aria-expanded={dropdownOpen}
          >
            {user?.avatar_url ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={user.avatar_url}
                alt={user.name}
                className="navbar-avatar-img"
              />
            ) : (
              <div className="navbar-avatar-fallback">{initials}</div>
            )}
            <div className="navbar-user-info">
              <span className="navbar-user-name">{user?.name ?? 'Pengguna'}</span>
              <span className="navbar-user-role">{user?.role ?? ''}</span>
            </div>
          </button>

          {/* Dropdown */}
          {dropdownOpen && (
            <>
              {/* Backdrop untuk menutup dropdown */}
              <div
                className="navbar-dropdown-backdrop"
                onClick={() => setDropdownOpen(false)}
              />
              <div className="navbar-dropdown">
                <div className="navbar-dropdown-header">
                  <p className="navbar-dropdown-name">{user?.name}</p>
                  <p className="navbar-dropdown-email">{user?.email}</p>
                </div>
                <div className="navbar-dropdown-divider" />
                <button
                  className="navbar-dropdown-item danger"
                  onClick={handleLogout}
                  disabled={isPending}
                >
                  <LogOut size={15} />
                  <span>Keluar</span>
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
