'use client';
// components/landing/LandingNavbar.tsx

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

export function LandingNavbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled || mobileOpen
            ? 'bg-white/95 backdrop-blur-lg shadow-sm border-b border-gray-100'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-6xl mx-auto px-5 sm:px-8 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group shrink-0">
            <div className="w-8 h-8 rounded-xl bg-violet-600 flex items-center justify-center shadow-md shadow-violet-200 group-hover:scale-105 transition-transform">
              <LogoIcon />
            </div>
            <div className="hidden sm:block">
              <p className="font-extrabold text-gray-900 text-sm leading-none tracking-tight">
                CV Akurat Sukses Sejati
              </p>
              <p className="text-[10px] text-gray-400 leading-none mt-0.5">
                Sistem Informasi Persediaan
              </p>
            </div>
          </Link>

          {/* Desktop nav links */}
          <div className="hidden md:flex items-center gap-1 text-sm font-medium text-gray-600">
            <a href="#fitur" className="px-3 py-2 rounded-lg hover:bg-violet-50 hover:text-violet-700 transition-colors">
              Fitur
            </a>
            <a href="#tentang" className="px-3 py-2 rounded-lg hover:bg-violet-50 hover:text-violet-700 transition-colors">
              Tentang
            </a>
          </div>

          {/* Desktop actions */}
          <div className="hidden md:flex items-center gap-2">
            <Link
              href="/login"
              className="text-sm font-semibold text-gray-600 hover:text-violet-600 px-4 py-2 rounded-xl hover:bg-violet-50 transition-colors"
            >
              Masuk
            </Link>
            <Link
              href="/register"
              className="text-sm font-bold bg-violet-600 hover:bg-violet-700 text-white px-5 py-2 rounded-xl transition-all shadow-sm shadow-violet-200 active:scale-95"
            >
              Daftar Gratis
            </Link>
          </div>

          {/* Mobile: login + hamburger */}
          <div className="flex md:hidden items-center gap-2">
            <Link
              href="/login"
              className="text-xs font-semibold text-violet-600 border border-violet-200 px-3 py-1.5 rounded-lg"
            >
              Masuk
            </Link>
            <button
              onClick={() => setMobileOpen((v) => !v)}
              className="p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden border-t border-gray-100 bg-white/98 px-5 py-4 flex flex-col gap-2">
            <a
              href="#fitur"
              onClick={() => setMobileOpen(false)}
              className="px-3 py-2.5 rounded-xl text-sm font-medium text-gray-700 hover:bg-violet-50 hover:text-violet-700 transition-colors"
            >
              Fitur
            </a>
            <a
              href="#tentang"
              onClick={() => setMobileOpen(false)}
              className="px-3 py-2.5 rounded-xl text-sm font-medium text-gray-700 hover:bg-violet-50 hover:text-violet-700 transition-colors"
            >
              Tentang
            </a>
            <div className="pt-2 border-t border-gray-100 flex flex-col gap-2">
              <Link
                href="/register"
                className="w-full text-center text-sm font-bold bg-violet-600 text-white px-5 py-3 rounded-xl shadow-sm"
              >
                Daftar Gratis
              </Link>
            </div>
          </div>
        )}
      </nav>
    </>
  );
}

function LogoIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 40 40" fill="none">
      <polygon
        points="20,5 35,30 5,30"
        fill="none"
        stroke="white"
        strokeWidth="4"
        strokeLinejoin="round"
      />
      <line x1="20" y1="5" x2="20" y2="30" stroke="white" strokeWidth="2.5" />
      <line x1="13" y1="19" x2="27" y2="19" stroke="white" strokeWidth="2.5" />
    </svg>
  );
}
