// components/shared/TableSkeleton.tsx
export function TableSkeleton() {
  return (
    <div className="w-full bg-white/60 backdrop-blur-xl border border-white/80 rounded-3xl overflow-hidden shadow-[0_8px_32px_-12px_rgba(0,0,0,0.05)] animate-pulse">
      {/* Header bar */}
      <div className="h-[60px] bg-slate-50/50 border-b border-slate-100 px-6 flex items-center justify-between">
        <div className="h-5 w-1/4 bg-slate-200 rounded-lg"></div>
        <div className="h-9 w-32 bg-slate-200 rounded-xl"></div>
      </div>
      
      {/* Table rows */}
      <div className="flex flex-col">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="flex items-center px-6 py-4 border-b border-slate-50 gap-6">
            <div className="h-4 w-12 bg-slate-200 rounded-md"></div>
            <div className="h-4 w-1/4 bg-slate-200 rounded-md"></div>
            <div className="h-4 w-1/5 bg-slate-200 rounded-md"></div>
            <div className="h-4 w-1/6 bg-slate-200 rounded-md"></div>
            <div className="flex-1"></div>
            <div className="flex gap-2">
              <div className="h-8 w-8 bg-slate-200 rounded-lg"></div>
              <div className="h-8 w-8 bg-slate-200 rounded-lg"></div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Pagination footer */}
      <div className="h-[68px] bg-white/50 border-t border-slate-100 px-6 flex items-center justify-between">
        <div className="h-4 w-32 bg-slate-200 rounded-md"></div>
        <div className="h-8 w-48 bg-slate-200 rounded-xl"></div>
      </div>
    </div>
  );
}
