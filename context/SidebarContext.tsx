'use client';

import { createContext, useContext, useState, useCallback, useEffect } from 'react';

/* ── Types ───────────────────────────────────────────── */

interface SidebarCtx {
  open: boolean;
  toggle: () => void;
  close: () => void;
}

/* ── Context ─────────────────────────────────────────── */

const Ctx = createContext<SidebarCtx>({
  open: true,
  toggle: () => {},
  close: () => {},
});

/* ── Helpers ─────────────────────────────────────────── */

// Tentukan default state TANPA useEffect (fix eslint)
const getInitialOpen = () => {
  if (typeof window === 'undefined') return true; // SSR fallback
  return window.innerWidth >= 1024; // >= lg → open, < lg → close
};

/* ── Provider ────────────────────────────────────────── */

export function SidebarProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState<boolean>(getInitialOpen);

  /* Toggle & Close */
  const toggle = useCallback(() => {
    setOpen((prev) => !prev);
  }, []);

  const close = useCallback(() => {
    setOpen(false);
  }, []);

  /* Responsive behavior saat resize */
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setOpen(false);
      } else {
        setOpen(true);
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return <Ctx.Provider value={{ open, toggle, close }}>{children}</Ctx.Provider>;
}

/* ── Hook ────────────────────────────────────────────── */

export function useSidebar() {
  const context = useContext(Ctx);

  if (!context) {
    throw new Error('useSidebar harus digunakan dalam <SidebarProvider>');
  }

  return context;
}
