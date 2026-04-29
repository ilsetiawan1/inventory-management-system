'use client';
// components/shared/Navbar.tsx

import { useState, useTransition } from 'react';
import { LogOut, User, Bell } from 'lucide-react';
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
    <header className="h-[72px] sticky top-0 z-30 flex items-center justify-between px-8 bg-white/60 backdrop-blur-xl border-b border-white/40 shadow-[0_4px_24px_-12px_rgba(0,0,0,0.05)]">
      {/* Kiri: Search placeholder atau kosong */}
      <div className="flex-1">
        {/* Bisa diisi global search nantinya */}
      </div>

      {/* Kanan: avatar + dropdown */}
      <div className="flex items-center gap-5">
        {/* Notifikasi Icon */}
        <button className="relative p-2 text-slate-400 hover:text-purple-600 transition-colors bg-white/50 rounded-full border border-white shadow-sm">
          <Bell size={18} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
        </button>

        <div className="relative">
          <button
            className="flex items-center gap-3 p-1 pr-3 rounded-full bg-white/60 border border-white shadow-sm hover:bg-white hover:shadow-md transition-all duration-200"
            onClick={() => setDropdownOpen((v) => !v)}
          >
            {user?.avatar_url ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={user.avatar_url}
                alt={user.name}
                className="w-8 h-8 rounded-full object-cover"
              />
            ) : (
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-indigo-500 flex items-center justify-center text-white text-[11px] font-bold shadow-inner">
                {initials}
              </div>
            )}
            <div className="flex flex-col items-start leading-none gap-1">
              <span className="text-[13px] font-semibold text-slate-800">{user?.name ?? 'Pengguna'}</span>
              <span className="text-[10px] font-medium text-slate-400 uppercase tracking-wider">{user?.role ?? ''}</span>
            </div>
          </button>

          {/* Dropdown */}
          {dropdownOpen && (
            <>
              {/* Backdrop untuk menutup dropdown */}
              <div
                className="fixed inset-0 z-40"
                onClick={() => setDropdownOpen(false)}
              />
              <div className="absolute right-0 top-full mt-3 w-56 bg-white/90 backdrop-blur-xl border border-white/80 rounded-3xl shadow-[0_12px_40px_-12px_rgba(109,40,217,0.2),inset_0_0_0_1px_rgba(255,255,255,1)] z-50 overflow-hidden transform opacity-100 scale-100 transition-all origin-top-right">
                <div className="p-4 bg-slate-50/50">
                  <p className="text-[14px] font-bold text-slate-800">{user?.name}</p>
                  <p className="text-[12px] text-slate-500 mt-0.5 truncate">{user?.email}</p>
                </div>
                <div className="h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
                <div className="p-2">
                  <button
                    className="flex items-center gap-3 w-full px-3 py-2.5 rounded-2xl text-[13px] font-semibold text-red-600 hover:bg-red-50 hover:text-red-700 transition-colors"
                    onClick={handleLogout}
                    disabled={isPending}
                  >
                    <LogOut size={16} />
                    <span>Keluar dari sistem</span>
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
