export default function DashboardLoading() {
  return (
    <div className="space-y-8 pb-10">
      {/* Header Section Skeleton */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 border-b border-slate-100 pb-8">
        <div className="space-y-3">
          <div className="h-4 w-24 bg-slate-100 rounded-md shimmer"></div>
          <div className="h-10 w-80 lg:w-[400px] bg-slate-200 rounded-xl shimmer"></div>
          <div className="h-4 w-64 lg:w-[350px] bg-slate-100 rounded-md shimmer"></div>
        </div>
        {/* Server Load Widget Skeleton */}
        <div className="h-[76px] w-64 bg-white border border-slate-100 rounded-2xl p-1.5 flex items-center gap-3 shadow-sm">
          <div className="h-full w-24 bg-slate-900 rounded-xl shimmer"></div>
          <div className="space-y-2 px-2">
            <div className="h-2 w-12 bg-slate-100 rounded-full shimmer"></div>
            <div className="h-6 w-16 bg-slate-200 rounded-md shimmer"></div>
          </div>
        </div>
      </div>

      {/* Stats Grid Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="bg-white p-5 rounded-2xl border border-slate-100 h-[120px] flex flex-col justify-between">
            <div className="w-10 h-10 rounded-xl bg-slate-50 shimmer"></div>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <div className="h-2 w-16 bg-slate-100 rounded-full shimmer"></div>
                <div className="h-2 w-8 bg-slate-50 rounded-full shimmer"></div>
              </div>
              <div className="h-7 w-20 bg-slate-200 rounded-lg shimmer"></div>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Layout Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Banner Skeleton */}
        <div className="lg:col-span-2 h-[380px] bg-slate-900 rounded-3xl p-10 flex flex-col justify-between">
          <div className="space-y-6">
            <div className="h-8 w-44 bg-white/10 rounded-lg shimmer"></div>
            <div className="h-20 w-3/4 bg-white/5 rounded-2xl shimmer"></div>
            <div className="h-4 w-1/2 bg-white/5 rounded-md shimmer"></div>
          </div>
          <div className="flex gap-4">
            <div className="h-12 w-32 bg-blue-600/20 rounded-xl shimmer"></div>
            <div className="h-12 w-32 bg-white/5 rounded-xl shimmer"></div>
          </div>
        </div>

        {/* Sidebar Widgets Skeleton */}
        <div className="lg:col-span-1 space-y-6">
          <div className="h-[210px] bg-white border border-slate-100 rounded-3xl p-6 space-y-6">
            <div className="flex gap-3">
              <div className="w-10 h-10 bg-slate-50 rounded-xl shimmer"></div>
              <div className="h-4 w-24 bg-slate-100 rounded-md mt-3 shimmer"></div>
            </div>
            <div className="space-y-4">
              {[1, 2, 3].map(j => (
                <div key={j} className="h-3 w-full bg-slate-50 rounded-full shimmer"></div>
              ))}
            </div>
          </div>
          <div className="h-[146px] bg-indigo-600 rounded-3xl p-6 space-y-4">
            <div className="h-3 w-12 bg-white/20 rounded-full shimmer"></div>
            <div className="h-8 w-32 bg-white/10 rounded-lg shimmer"></div>
            <div className="h-10 w-full bg-white/5 rounded-xl shimmer"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
