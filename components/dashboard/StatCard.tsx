import { ArrowDownRight, ArrowUpRight } from 'lucide-react';
import React from 'react';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  trend?: number; // e.g. 12.5 for +12.5%, -4.2 for -4.2%
  trendLabel?: string; // e.g. 'vs bulan lalu'
  chartData?: number[]; // Array of numbers for mini sparkline
  colorVariant?: 'purple' | 'blue' | 'emerald' | 'amber';
}

const colorVariants = {
  purple: {
    bg: 'bg-purple-50',
    iconBg: 'bg-gradient-to-br from-purple-500 to-indigo-600',
    chartLine: '#8b5cf6',
    chartFill: 'rgba(139, 92, 246, 0.2)'
  },
  blue: {
    bg: 'bg-blue-50',
    iconBg: 'bg-gradient-to-br from-blue-500 to-cyan-500',
    chartLine: '#3b82f6',
    chartFill: 'rgba(59, 130, 246, 0.2)'
  },
  emerald: {
    bg: 'bg-emerald-50',
    iconBg: 'bg-gradient-to-br from-emerald-400 to-teal-500',
    chartLine: '#10b981',
    chartFill: 'rgba(16, 185, 129, 0.2)'
  },
  amber: {
    bg: 'bg-amber-50',
    iconBg: 'bg-gradient-to-br from-amber-400 to-orange-500',
    chartLine: '#f59e0b',
    chartFill: 'rgba(245, 158, 11, 0.2)'
  }
};

export function StatCard({
  title,
  value,
  icon,
  trend,
  trendLabel = 'vs bulan lalu',
  chartData = [30, 40, 35, 50, 49, 60, 70, 91, 125],
  colorVariant = 'purple'
}: StatCardProps) {
  const isPositive = trend && trend > 0;
  const isNegative = trend && trend < 0;
  const colors = colorVariants[colorVariant];

  return (
    <div className="relative overflow-hidden bg-white/70 backdrop-blur-xl border border-white/80 rounded-3xl p-5 shadow-[0_8px_24px_-12px_rgba(0,0,0,0.05)] hover:shadow-[0_12px_32px_-12px_rgba(109,40,217,0.15)] transition-all duration-300 group cursor-default">
      
      {/* Background subtle blob */}
      <div className={`absolute -right-10 -top-10 w-32 h-32 rounded-full blur-[40px] opacity-40 transition-opacity duration-300 group-hover:opacity-60 ${colors.bg}`} />

      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex flex-col gap-1">
            <h3 className="text-[13px] font-semibold text-slate-500 uppercase tracking-wider">{title}</h3>
            <div className="text-3xl font-extrabold text-slate-800 tracking-tight">{value}</div>
          </div>
          <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-inner ${colors.iconBg}`}>
            {icon}
          </div>
        </div>

        {/* Mini Chart (CSS based sparkline approximation) */}
        {chartData && chartData.length > 0 && (
          <div className="h-10 w-full flex items-end gap-1 mb-3 opacity-80">
            {chartData.map((d, i) => {
              const max = Math.max(...chartData);
              const heightPct = Math.max((d / max) * 100, 10); // min 10%
              return (
                <div key={i} className="flex-1 flex items-end justify-center h-full">
                  <div 
                    className="w-full rounded-full transition-all duration-500 ease-out"
                    style={{ height: `${heightPct}%`, backgroundColor: i === chartData.length - 1 ? colors.chartLine : colors.chartFill }}
                  />
                </div>
              );
            })}
          </div>
        )}

        {/* Footer (Trend) */}
        {trend !== undefined && (
          <div className="flex items-center gap-2 mt-auto">
            <div className={`flex items-center gap-0.5 px-2 py-1 rounded-lg text-[12px] font-bold ${
              isPositive ? 'bg-emerald-50 text-emerald-600' : 
              isNegative ? 'bg-red-50 text-red-600' : 
              'bg-slate-100 text-slate-600'
            }`}>
              {isPositive && <ArrowUpRight size={14} />}
              {isNegative && <ArrowDownRight size={14} />}
              <span>{Math.abs(trend)}%</span>
            </div>
            <span className="text-[11px] font-medium text-slate-400">{trendLabel}</span>
          </div>
        )}
      </div>
    </div>
  );
}
