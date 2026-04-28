// components/landing/LandingFooter.tsx

export function LandingFooter() {
  return (
    <footer className="border-t border-gray-100 bg-white py-7 px-5 sm:px-8">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-lg bg-violet-600 flex items-center justify-center">
            <svg
              width="11"
              height="11"
              viewBox="0 0 40 40"
              fill="none"
            >
              <polygon
                points="20,5 35,30 5,30"
                fill="none"
                stroke="white"
                strokeWidth="4.5"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <span className="text-sm font-bold text-gray-700">CV Akurat Sukses Sejati</span>
        </div>

        <p className="text-xs text-gray-400">© {new Date().getFullYear()} Sistem Informasi Persediaan Barang</p>
      </div>
    </footer>
  );
}
