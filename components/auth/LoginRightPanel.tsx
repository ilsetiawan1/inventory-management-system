import type { ReactNode } from "react";
import { StatChip } from "./widgets/StatChip";
import { MiniBarChart } from "./widgets/MiniBarChart";

interface LoginRightPanelProps {
  children: ReactNode;
}

export function LoginRightPanel({ children }: LoginRightPanelProps) {
  return (
    <div
      className="flex-1 flex items-center justify-center relative overflow-hidden bg-[#f8f7fc]"
    >
      {/* ── Decorative dot grid ── */}
      <div
        className="pointer-events-none absolute inset-0 w-full h-full opacity-[0.35]"
        style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, #c4b5fd 1px, transparent 0)',
          backgroundSize: '28px 28px',
        }}
      />

      {/* ── Top-right large blob ── */}
      <div
        className="pointer-events-none absolute"
        style={{
          top: "-15%",
          right: "-10%",
          width: "60vh",
          height: "60vh",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(124,58,237,0.08) 0%, rgba(109,40,217,0.02) 50%, transparent 75%)",
          filter: "blur(40px)",
        }}
      />

      {/* ── Bottom-left blob ── */}
      <div
        className="pointer-events-none absolute"
        style={{
          bottom: "-10%",
          left: "-5%",
          width: "50vh",
          height: "50vh",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(167,139,250,0.12) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />

      {/* ── Floating Elements Layer ── */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {/* Total Produk — top left */}
        <StatChip
          style={{ top: "15%", left: "8%" }}
          iconBg="linear-gradient(135deg, #f5f3ff, #ede9fe)"
          labelColor="#8b5cf6"
          label="TOTAL PRODUK"
          value="2.841"
          icon={
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#7c3aed" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
            </svg>
          }
        />

        {/* Transaksi Hari Ini — top right */}
        <StatChip
          style={{ top: "12%", right: "8%" }}
          iconBg="linear-gradient(135deg, #ecfdf5, #d1fae5)"
          labelColor="#059669"
          label="HARI INI"
          value="+124"
          icon={
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
              <polyline points="17 6 23 6 23 12" />
            </svg>
          }
        />

        {/* Stok Menipis — bottom left */}
        <StatChip
          style={{ bottom: "16%", left: "6%" }}
          iconBg="linear-gradient(135deg, #fffbeb, #fef3c7)"
          labelColor="#d97706"
          label="MENIPIS"
          value="18 item"
          icon={
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
              <line x1="12" y1="9" x2="12" y2="13" />
              <line x1="12" y1="17" x2="12.01" y2="17" />
            </svg>
          }
        />

        {/* Supplier Aktif — bottom right */}
        <StatChip
          style={{ bottom: "12%", right: "8%" }}
          iconBg="linear-gradient(135deg, #eff6ff, #dbeafe)"
          labelColor="#3b82f6"
          label="SUPPLIER"
          value="47"
          icon={
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
          }
        />

        {/* ── Mini bar chart ── */}
        <MiniBarChart />
      </div>

      {/* ── Form card (children) ── */}
      <div
        className="w-full max-w-105 px-6 md:px-0"
        style={{ position: "relative", zIndex: 10 }}
      >
        <div
          className="bg-white/80 backdrop-blur-xl"
          style={{
            borderRadius: 36, // iOS style roundness
            border: "1px solid rgba(255,255,255,0.9)",
            boxShadow: [
              "inset 0 0 0 1px rgba(255,255,255,1)",
              "0 12px 48px -12px rgba(109,40,217,0.15)",
            ].join(", "),
            padding: "48px 40px 40px",
          }}
        >
          {children}
        </div>

        <p
          className="absolute left-0 right-0 text-center text-[12px] font-semibold tracking-wide"
          style={{ 
            color: "rgba(0,0,0,0.3)",
            bottom: "-52px" 
          }}
        >
          © {new Date().getFullYear()} CV Akurat Sukses Sejati
        </p>
      </div>
    </div>
  );
}