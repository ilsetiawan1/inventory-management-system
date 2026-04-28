// components/landing/LandingFooter.tsx

import Link from 'next/link';

const LINKS = [
  { label: 'Fitur', href: '#fitur' },
  { label: 'Tentang', href: '#tentang' },
  { label: 'Masuk', href: '/login' },
  { label: 'Daftar', href: '/register' },
];

export function LandingFooter() {
  return (
    <footer className="border-t border-gray-100 bg-white py-8 px-5 sm:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">

          {/* Logo + brand */}
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-violet-600 flex items-center justify-center shrink-0">
              <svg width="12" height="12" viewBox="0 0 40 40" fill="none">
                <polygon
                  points="20,5 35,30 5,30"
                  fill="none"
                  stroke="white"
                  strokeWidth="4.5"
                  strokeLinejoin="round"
                />
                <line x1="20" y1="5" x2="20" y2="30" stroke="white" strokeWidth="2.5" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-bold text-gray-800 leading-none">CV Akurat Sukses Sejati</p>
              <p className="text-[10px] text-gray-400 mt-0.5">Sistem Informasi Persediaan Barang</p>
            </div>
          </div>

          {/* Nav links */}
          <nav className="flex items-center gap-1 flex-wrap justify-center">
            {LINKS.map((l) => (
              <Link
                key={l.label}
                href={l.href}
                className="text-xs text-gray-500 hover:text-violet-600 px-3 py-1.5 rounded-lg hover:bg-violet-50 transition-colors font-medium"
              >
                {l.label}
              </Link>
            ))}
          </nav>

          {/* Copyright */}
          <p className="text-xs text-gray-400 text-center sm:text-right">
            © {new Date().getFullYear()} CV Akurat Sukses Sejati
          </p>
        </div>
      </div>
    </footer>
  );
}
