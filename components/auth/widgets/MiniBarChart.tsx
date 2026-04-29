export function MiniBarChart() {
  const bars = [60, 45, 75, 55, 90, 65, 80];

  return (
    <div
      className="pointer-events-none absolute select-none z-10"
      style={{
        bottom: "26%",
        left: "50%",
        transform: "translateX(-50%)",
        background: "rgba(255, 255, 255, 0.65)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        borderRadius: 24,
        padding: "16px 20px",
        boxShadow:
          "0 12px 40px -12px rgba(109,40,217,0.15), inset 0 0 0 1px rgba(255,255,255,0.7)",
        minWidth: 180,
      }}
    >
      <div
        style={{
          fontSize: 11,
          color: "#8b5cf6",
          fontWeight: 700,
          letterSpacing: "0.06em",
          marginBottom: 14,
          textAlign: "center",
        }}
      >
        STOK MASUK / 7 HARI
      </div>
      <div className="flex items-end gap-1.5 h-[42px] justify-center">
        {bars.map((h, i) => (
          <div
            key={i}
            className="flex-1 rounded-full"
            style={{
              height: `${h}%`,
              maxWidth: 8,
              background:
                i === 6
                  ? "linear-gradient(180deg, #7c3aed, #5b21b6)"
                  : "rgba(139,92,246,0.25)",
            }}
          />
        ))}
      </div>
    </div>
  );
}
