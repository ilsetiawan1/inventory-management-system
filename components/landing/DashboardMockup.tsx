// components/landing/DashboardMockup.tsx

export function DashboardMockup() {
  const bars = [68, 52, 88, 42, 72, 55, 80];
  const rows = [
    { name: 'Timbangan Acis BC', stok: '45', ok: true },
    { name: 'Sensor Gea Analog', stok: '12', ok: true },
    { name: 'Kabel Power 3M', stok: '3', ok: false },
  ];

  return (
    <div className="relative w-full max-w-lg mx-auto lg:mx-0">
      {/* Glow behind */}
      <div className="absolute -inset-6 bg-violet-500/15 rounded-3xl blur-2xl" />

      {/* Card */}
      <div className="relative bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden">
        {/* Browser chrome */}
        <div className="bg-gray-50 border-b border-gray-100 px-4 py-2.5 flex items-center gap-3">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
            <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
          </div>
          <div className="flex-1 bg-white rounded-md px-3 py-1 text-[10px] text-gray-400 border border-gray-200 text-center">inventory.akuratsukses.com/dashboard</div>
        </div>

        {/* Content */}
        <div className="p-5 space-y-3.5">
          {/* Header */}
          <div className="flex items-center justify-between">
            <p className="text-xs font-bold text-gray-800">Selamat Datang, Admin! 👋</p>
            <span className="text-[10px] bg-emerald-100 text-emerald-700 font-semibold px-2 py-0.5 rounded-full">Live</span>
          </div>

          {/* Stat cards */}
          <div className="grid grid-cols-3 gap-2">
            {[
              { label: 'Kategori', value: '30', color: 'text-violet-600', bg: 'bg-violet-50', dot: 'bg-violet-400' },
              { label: 'Supplier', value: '20', color: 'text-emerald-600', bg: 'bg-emerald-50', dot: 'bg-emerald-400' },
              { label: 'Pengguna', value: '3', color: 'text-amber-600', bg: 'bg-amber-50', dot: 'bg-amber-400' },
            ].map((c) => (
              <div
                key={c.label}
                className={`${c.bg} rounded-xl p-2.5`}
              >
                <div className={`w-1.5 h-1.5 rounded-full ${c.dot} mb-1.5`} />
                <p className={`text-base font-extrabold ${c.color} leading-none`}>{c.value}</p>
                <p className="text-[10px] text-gray-500 mt-1">{c.label}</p>
              </div>
            ))}
          </div>

          {/* Bar chart */}
          <div className="bg-gray-50 rounded-xl p-3">
            <p className="text-[10px] font-semibold text-gray-400 mb-2.5 uppercase tracking-wide">Top Barang Keluar</p>
            <div className="flex items-end gap-1 h-12">
              {bars.map((h, i) => (
                <div
                  key={i}
                  className="flex-1 flex flex-col gap-1 items-center"
                >
                  <div
                    className="w-full rounded-t-sm transition-all"
                    style={{
                      height: `${h}%`,
                      background: i === 2 ? '#7c3aed' : '#ddd6fe',
                    }}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Mini table */}
          <div className="rounded-xl border border-gray-100 overflow-hidden">
            <div className="bg-gray-50 px-3 py-1.5 grid grid-cols-[1fr_auto_auto] gap-3">
              <span className="text-[9px] font-bold text-gray-400 uppercase tracking-wide">Barang</span>
              <span className="text-[9px] font-bold text-gray-400 uppercase tracking-wide">Stok</span>
              <span className="text-[9px] font-bold text-gray-400 uppercase tracking-wide">Status</span>
            </div>
            {rows.map((row) => (
              <div
                key={row.name}
                className="px-3 py-2 grid grid-cols-[1fr_auto_auto] gap-3 items-center border-t border-gray-50"
              >
                <span className="text-[10px] text-gray-700 truncate">{row.name}</span>
                <span className="text-[10px] font-bold text-gray-700">{row.stok}</span>
                <span className={`text-[9px] font-semibold px-1.5 py-0.5 rounded-full ${row.ok ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-600'}`}>
                  {row.ok ? 'Aman' : 'Kritis'}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Floating badge */}
      <div className="absolute -top-3 -right-3 bg-violet-600 text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow-lg shadow-violet-300 flex items-center gap-1">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-300 animate-pulse" />
        Live Data
      </div>
    </div>
  );
}
