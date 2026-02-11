export default function TableLoading() {
  return (
    <div className="space-y-8">
      {/* Header Skeleton */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 pb-2">
        <div className="space-y-3">
          <div className="h-10 w-64 bg-slate-200 rounded-xl shimmer"></div>
          <div className="h-4 w-96 bg-slate-100 rounded-lg shimmer"></div>
        </div>
        <div className="h-12 w-44 bg-slate-100 rounded-xl shimmer"></div>
      </div>

      {/* Table Skeleton */}
      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="h-16 bg-slate-50/50 border-b border-slate-100 flex items-center px-10 gap-12">
          <div className="h-3 w-16 bg-slate-200 rounded-full shimmer"></div>
          <div className="h-3 w-32 bg-slate-200 rounded-full shimmer"></div>
          <div className="h-3 w-64 bg-slate-200 rounded-full shimmer"></div>
          <div className="h-3 w-20 bg-slate-200 rounded-full shimmer ml-auto"></div>
        </div>
        
        <div className="p-2 space-y-1">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="flex items-center px-8 py-5 gap-12 border-b border-slate-50 last:border-0">
              {/* Icon visual */}
              <div className="w-12 h-12 bg-slate-50 rounded-xl shimmer shrink-0"></div>
              {/* Name/Title */}
              <div className="w-48 space-y-2">
                <div className="h-4 w-32 bg-slate-200 rounded-md shimmer"></div>
                <div className="h-2 w-16 bg-slate-100 rounded-full shimmer"></div>
              </div>
              {/* Description */}
              <div className="flex-grow space-y-2">
                <div className="h-3 w-full bg-slate-50 rounded-md shimmer"></div>
                <div className="h-3 w-3/4 bg-slate-50 rounded-md shimmer"></div>
              </div>
              {/* Actions */}
              <div className="flex gap-2 shrink-0">
                <div className="w-10 h-10 bg-slate-50 rounded-xl shimmer"></div>
                <div className="w-10 h-10 bg-slate-50 rounded-xl shimmer"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}