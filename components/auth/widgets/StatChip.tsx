import type { ReactNode } from "react";

interface StatChipProps {
  style?: React.CSSProperties;
  className?: string;
  iconBg: string;
  icon: ReactNode;
  labelColor: string;
  label: string;
  value: string;
}

export function StatChip({ style, className = "", iconBg, icon, labelColor, label, value }: StatChipProps) {
  return (
    <div
      className={`pointer-events-none absolute select-none flex items-center gap-3.5 ${className}`}
      style={{
        background: "rgba(255, 255, 255, 0.7)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        borderRadius: 20, 
        padding: "12px 18px",
        boxShadow:
          "0 8px 32px -8px rgba(0,0,0,0.06), inset 0 0 0 1px rgba(255,255,255,0.6)",
        ...style,
      }}
    >
      {/* Icon box */}
      <div
        className="flex items-center justify-center shrink-0"
        style={{
          width: 38,
          height: 38,
          borderRadius: 12,
          background: iconBg,
          boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.8)",
        }}
      >
        {icon}
      </div>

      {/* Text */}
      <div className="flex flex-col justify-center">
        <div
          style={{
            fontSize: 11,
            color: labelColor,
            fontWeight: 700,
            letterSpacing: "0.06em",
            lineHeight: 1,
            marginBottom: 4,
          }}
        >
          {label}
        </div>
        <div
          style={{
            fontSize: 18,
            fontWeight: 800,
            color: "#1c1c1e",
            letterSpacing: "-0.03em",
            lineHeight: 1.2,
            fontFamily: "var(--font-sans, sans-serif)",
          }}
        >
          {value}
        </div>
      </div>
    </div>
  );
}
