'use client';
// components/landing/LandingNavbar.tsx

import Link from 'next/link';
import { useState, useEffect } from 'react';

export function LandingNavbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/90 backdrop-blur-lg shadow-sm shadow-gray-100 border-b border-gray-100' : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-5 sm:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2.5 group"
        >
          <div className="w-8 h-8 rounded-xl bg-violet-600 flex items-center justify-center shadow-md shadow-violet-200 group-hover:scale-105 transition-transform">
            <svg
              width="15"
              height="15"
              viewBox="0 0 40 40"
              fill="none"
            >
              <polygon
                points="20,5 35,30 5,30"
                fill="none"
                stroke="white"
                strokeWidth="4"
                strokeLinejoin="round"
              />
              <line
                x1="20"
                y1="5"
                x2="20"
                y2="30"
                stroke="white"
                strokeWidth="2.5"
              />
              <line
                x1="13"
                y1="19"
                x2="27"
                y2="19"
                stroke="white"
                strokeWidth="2.5"
              />
            </svg>
          </div>
          <div className="hidden sm:block">
            <p className={`font-extrabold text-sm leading-none tracking-tight transition-colors ${scrolled ? 'text-gray-900' : 'text-gray-900'}`}>CV Akurat Sukses Sejati</p>
            <p className="text-[10px] text-gray-400 leading-none mt-0.5">Sistem Informasi Persediaan</p>
          </div>
        </Link>

        {/* Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          <Link
            href="/login"
            className="text-sm font-semibold text-gray-600 hover:text-violet-600 transition-colors px-3 py-2 rounded-xl hover:bg-violet-50 hidden sm:block"
          >
            Masuk
          </Link>
          <Link
            href="/login"
            className="text-sm font-bold bg-violet-600 hover:bg-violet-700 text-white px-4 py-2 rounded-xl transition-all shadow-sm shadow-violet-200 active:scale-95"
          >
            Mulai Sekarang
          </Link>
        </div>
      </div>
    </nav>
  );
}
