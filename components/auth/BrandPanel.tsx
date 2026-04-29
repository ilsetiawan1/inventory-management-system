// components/auth/BrandPanel.tsx
// Left panel desktop — brand, headline, feature list, ilustrasi

import Image from 'next/image';
import { InventoryIllus } from './icons/InventoryIllus';

const FEATURES = [
  {
    icon: (
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
      >
        <path
          d="M20 7L12 3L4 7M20 7L12 11M20 7V17L12 21M12 11L4 7M12 11V21M4 7V17L12 21"
          stroke="#fbbf24"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    title: 'Manajemen Stok Real-time',
    desc: 'Update otomatis setiap transaksi masuk & keluar',
  },
  {
    icon: (
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
      >
        <path
          d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
          stroke="#fbbf24"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    title: 'Laporan & Analitik',
    desc: 'Ekspor data ke Excel & PDF dengan mudah',
  },
  {
    icon: (
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
      >
        <path
          d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"
          stroke="#fbbf24"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    title: 'Multi-user & Role Access',
    desc: 'Admin, kasir, dan staf gudang',
  },
];

export function BrandPanel() {
  return (
    <div
      className="hidden md:flex flex-col justify-between relative overflow-hidden shrink-0"
      style={{
        width: '44%',
        padding: '40px 36px 36px',
        background: 'linear-gradient(160deg, #2e0653 0%, #4c1d95 40%, #5b21b6 75%, #6d28d9 100%)',
      }}
    >
      {/* Grid overlay */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
          backgroundSize: '44px 44px',
        }}
      />

      {/* Blobs */}
      <div
        className="pointer-events-none absolute rounded-full"
        style={{ width: 400, height: 400, bottom: -130, right: -130, background: 'radial-gradient(circle, rgba(139,92,246,0.4) 0%, transparent 65%)' }}
      />
      <div
        className="pointer-events-none absolute rounded-full"
        style={{ width: 200, height: 200, top: -60, left: -60, background: 'radial-gradient(circle, rgba(196,167,255,0.18) 0%, transparent 70%)' }}
      />
      <div
        className="pointer-events-none absolute rounded-full"
        style={{ width: 140, height: 140, top: 40, right: 20, background: 'radial-gradient(circle, rgba(251,191,36,0.08) 0%, transparent 70%)' }}
      />

      {/* Accent bar */}
      <div
        className="absolute top-0 left-0 w-1 rounded-b-full"
        style={{ height: 72, background: 'linear-gradient(to bottom, #fbbf24, transparent)' }}
      />

      {/* ── Logo ── */}
      <div className="relative z-10 flex items-center gap-3">
        <div
          className="flex items-center justify-center rounded-xl border overflow-hidden flex-shrink-0"
          style={{
            width: 44,
            height: 44,
            background: 'rgba(255,255,255,0.1)',
            borderColor: 'rgba(255,255,255,0.18)',
            backdropFilter: 'blur(6px)',
          }}
        >
          <Image
            src="/images/logo-inventory-app.png"
            alt="CV Akurat Sukses Sejati"
            width={28}
            height={28}
            style={{ objectFit: 'contain' }}
          />
        </div>
        <div>
          <div
            className="text-white font-extrabold leading-tight"
            style={{ fontSize: 13, letterSpacing: '-0.01em' }}
          >
            CV Akurat Sukses Sejati
          </div>
          <div
            className="inline-flex items-center gap-1.5 mt-1 rounded px-2 py-0.5"
            style={{
              background: 'rgba(251,191,36,0.12)',
              border: '1px solid rgba(251,191,36,0.25)',
              color: '#fbbf24',
              fontSize: 10,
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 inline-block" />
            Inventory System
          </div>
        </div>
      </div>

      {/* ── Headline ── */}
      <div className="relative z-10">
        <div
          className="mb-1.5"
          style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'rgba(251,191,36,0.7)' }}
        >
          Sistem Informasi Persediaan
        </div>
        <h2
          style={{
            fontFamily: "'Syne', sans-serif",
            fontSize: 'clamp(26px, 2.4vw, 34px)',
            fontWeight: 800,
            color: '#fff',
            lineHeight: 1.12,
            letterSpacing: '-0.025em',
            margin: '0 0 14px',
          }}
        >
          Kelola <span style={{ color: '#fbbf24' }}>stok</span> &amp;
          <br />
          persediaan
          <br />
          dengan mudah
        </h2>
        <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 13, lineHeight: 1.65, margin: '0 0 24px', maxWidth: 264 }}>
          Sistem terpadu untuk memantau stok, mencatat transaksi, dan mengelola supplier secara real-time.
        </p>

        {/* Feature list */}
        <div className="flex flex-col gap-2">
          {FEATURES.map((f) => (
            <div
              key={f.title}
              className="flex items-center gap-3 rounded-xl"
              style={{
                background: 'rgba(255,255,255,0.065)',
                border: '1px solid rgba(255,255,255,0.09)',
                backdropFilter: 'blur(10px)',
                padding: '10px 13px',
              }}
            >
              <div
                className="flex items-center justify-center rounded-lg flex-shrink-0"
                style={{ width: 28, height: 28, background: 'rgba(251,191,36,0.12)', border: '1px solid rgba(251,191,36,0.18)' }}
              >
                {f.icon}
              </div>
              <div>
                <div
                  className="text-white font-semibold"
                  style={{ fontSize: 11.5 }}
                >
                  {f.title}
                </div>
                <div style={{ fontSize: 10.5, marginTop: 1.5, color: 'rgba(255,255,255,0.38)' }}>{f.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Illustration ── */}
      <div className="relative z-10 flex justify-end">
        <InventoryIllus />
      </div>
    </div>
  );
}
