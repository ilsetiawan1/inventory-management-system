// components/auth/LoginRightPanel.tsx
// Right panel untuk AuthSplitLayout — berisi decorative background,
// floating stat chips, mini bar chart, dan slot untuk form card (children)

import type { ReactNode } from "react";

interface LoginRightPanelProps {
  children: ReactNode;
}

// ─── Floating stat chip ────────────────────────────────────────────────────
interface StatChipProps {
  style: React.CSSProperties;
  iconBg: string;
  icon: ReactNode;
  labelColor: string;
  label: string;
  value: string;
}

function StatChip({ style, iconBg, icon, labelColor, label, value }: StatChipProps) {
  return (
    <div
      className="pointer-events-none absolute select-none"
      style={{
        background: "white",
        borderRadius: 14,
        padding: "10px 14px",
        boxShadow:
          "0 2px 12px rgba(109,40,217,0.10), 0 1px 3px rgba(0,0,0,0.05)",
        border: "1px solid rgba(124,58,237,0.10)",
        display: "flex",
        alignItems: "center",
        gap: 10,
        ...style,
      }}
    >
      {/* Icon box */}
      <div
        style={{
          width: 32,
          height: 32,
          borderRadius: 9,
          flexShrink: 0,
          background: iconBg,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {icon}
      </div>

      {/* Text */}
      <div>
        <div
          style={{
            fontSize: 10,
            color: labelColor,
            fontWeight: 600,
            letterSpacing: "0.06em",
            lineHeight: 1,
          }}
        >
          {label}
        </div>
        <div
          style={{
            fontSize: 17,
            fontWeight: 700,
            color: "#1a1625",
            letterSpacing: "-0.03em",
            lineHeight: 1.3,
            fontFamily: "var(--font-sans, sans-serif)",
          }}
        >
          {value}
        </div>
      </div>
    </div>
  );
}

// ─── Bar chart mini ────────────────────────────────────────────────────────
function MiniBarChart() {
  const bars = [60, 45, 75, 55, 90, 65, 80];

  return (
    <div
      className="pointer-events-none absolute select-none"
      style={{
        bottom: "26%",
        left: "50%",
        transform: "translateX(-50%)",
        background: "white",
        borderRadius: 16,
        padding: "12px 16px",
        boxShadow:
          "0 2px 16px rgba(109,40,217,0.09), 0 1px 3px rgba(0,0,0,0.04)",
        border: "1px solid rgba(124,58,237,0.09)",
        opacity: 0.8,
        minWidth: 160,
        zIndex: 1,
      }}
    >
      <div
        style={{
          fontSize: 10,
          color: "#a78bfa",
          fontWeight: 600,
          letterSpacing: "0.06em",
          marginBottom: 8,
        }}
      >
        STOK MASUK / 7 HARI
      </div>
      <div style={{ display: "flex", alignItems: "flex-end", gap: 5, height: 36 }}>
        {bars.map((h, i) => (
          <div
            key={i}
            style={{
              flex: 1,
              height: `${h}%`,
              borderRadius: 4,
              background:
                i === 6
                  ? "linear-gradient(180deg, #7c3aed, #5b21b6)"
                  : "rgba(167,139,250,0.25)",
            }}
          />
        ))}
      </div>
    </div>
  );
}

// ─── Main Component ────────────────────────────────────────────────────────
export function LoginRightPanel({ children }: LoginRightPanelProps) {
  return (
    <div
      className="flex-1 flex items-center justify-center relative overflow-hidden"
      style={{ background: "#f5f3fb", padding: "48px 40px" }}
    >
      {/* ── Decorative dot grid ── */}
      <svg
        className="pointer-events-none absolute inset-0 w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
        style={{ opacity: 0.45 }}
      >
        <defs>
          <pattern
            id="dot-grid"
            x="0"
            y="0"
            width="28"
            height="28"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="1" cy="1" r="1" fill="#c4b5fd" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#dot-grid)" />
      </svg>

      {/* ── Top-right large blob ── */}
      <div
        className="pointer-events-none absolute"
        style={{
          top: -120,
          right: -120,
          width: 380,
          height: 380,
          borderRadius: "50%",
          background:
            "radial-gradient(circle at 40% 40%, rgba(124,58,237,0.10) 0%, rgba(109,40,217,0.04) 50%, transparent 75%)",
        }}
      />

      {/* ── Bottom-left blob ── */}
      <div
        className="pointer-events-none absolute"
        style={{
          bottom: -80,
          left: -60,
          width: 280,
          height: 280,
          borderRadius: "50%",
          background:
            "radial-gradient(circle at 60% 60%, rgba(167,139,250,0.12) 0%, transparent 70%)",
        }}
      />

      {/* ── Stat Chips ── */}

      {/* Total Produk — top left */}
      <StatChip
        style={{ top: "14%", left: "6%", opacity: 0.9, zIndex: 1 }}
        iconBg="linear-gradient(135deg, #ede9fe, #ddd6fe)"
        labelColor="#a78bfa"
        label="TOTAL PRODUK"
        value="2.841"
        icon={
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#7c3aed" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
          </svg>
        }
      />

      {/* Transaksi Hari Ini — top right */}
      <StatChip
        style={{ top: "11%", right: "5%", opacity: 0.88, zIndex: 1 }}
        iconBg="linear-gradient(135deg, #d1fae5, #a7f3d0)"
        labelColor="#34d399"
        label="TRANSAKSI HARI INI"
        value="+124"
        icon={
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
            <polyline points="17 6 23 6 23 12" />
          </svg>
        }
      />

      {/* Stok Menipis — bottom left */}
      <StatChip
        style={{ bottom: "14%", left: "5%", opacity: 0.85, zIndex: 1 }}
        iconBg="linear-gradient(135deg, #fef3c7, #fde68a)"
        labelColor="#fbbf24"
        label="STOK MENIPIS"
        value="18 item"
        icon={
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#d97706" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
            <line x1="12" y1="9" x2="12" y2="13" />
            <line x1="12" y1="17" x2="12.01" y2="17" />
          </svg>
        }
      />

      {/* Supplier Aktif — bottom right */}
      <StatChip
        style={{ bottom: "11%", right: "5%", opacity: 0.88, zIndex: 1 }}
        iconBg="linear-gradient(135deg, #e0e7ff, #c7d2fe)"
        labelColor="#818cf8"
        label="SUPPLIER AKTIF"
        value="47"
        icon={
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#4f46e5" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
          </svg>
        }
      />

      {/* ── Mini bar chart ── */}
      <MiniBarChart />

      {/* ── Form card (children) ── */}
      <div
        className="w-full max-w-[420px]"
        style={{ position: "relative", zIndex: 10 }}
      >
        <div
          className="bg-white rounded-2xl"
          style={{
            border: "1px solid rgba(124,58,237,0.08)",
            boxShadow: [
              "0 0 0 1px rgba(109,40,217,0.03)",
              "0 4px 6px -1px rgba(0,0,0,0.04)",
              "0 12px 32px -6px rgba(0,0,0,0.08)",
              "0 28px 56px -14px rgba(109,40,217,0.10)",
            ].join(", "),
            padding: "40px 36px 32px",
          }}
        >
          {children}
        </div>

<p
  className="absolute left-0 right-0 text-center text-[11px] tracking-wide"
  style={{ 
    color: "rgba(0,0,0,0.22)",
    bottom: "-30px" // Menaruhnya 60px di bawah card
  }}
>
  © {new Date().getFullYear()} CV Akurat Sukses Sejati · Sistem Internal
</p>
      </div>
    </div>
  );
}