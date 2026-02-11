export default function AboutLoading() {
  return (
    <div className="space-y-8 pb-20">
      {/* Narrative Section Skeleton */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
        <div className="xl:col-span-4 bg-white border border-slate-100 rounded-3xl p-6 shadow-sm flex flex-col gap-6">
          <div className="h-3 w-24 bg-slate-100 rounded-full shimmer"></div>
          <div className="aspect-[4/3] w-full bg-slate-50 rounded-2xl shimmer"></div>
          <div className="h-2 w-32 mx-auto bg-slate-50 rounded-full shimmer"></div>
        </div>
        <div className="xl:col-span-8 bg-white border border-slate-100 rounded-3xl p-8 shadow-sm flex flex-col gap-8">
          <div className="h-3 w-36 bg-slate-100 rounded-full shimmer pb-4 border-b border-slate-50 w-full"></div>
          <div className="space-y-6">
            <div className="space-y-3">
              <div className="h-2 w-20 bg-slate-100 rounded-full shimmer ml-1"></div>
              <div className="h-14 w-full bg-slate-50 rounded-xl shimmer"></div>
            </div>
            <div className="space-y-3">
              <div className="h-2 w-24 bg-slate-100 rounded-full shimmer ml-1"></div>
              <div className="h-48 w-full bg-slate-50 rounded-xl shimmer"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Poin Keunggulan Strategis Skeleton */}
      <div className="bg-white rounded-3xl border border-slate-100 p-8 shadow-sm space-y-10">
        <div className="flex justify-between items-center pb-4 border-b border-slate-50">
          <div className="h-4 w-48 bg-slate-200 rounded-full shimmer"></div>
          <div className="h-9 w-36 bg-slate-900 rounded-lg shimmer"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="p-8 bg-slate-50 rounded-3xl border border-slate-100 flex gap-6">
              <div className="shrink-0 space-y-4">
                <div className="w-14 h-14 bg-white rounded-2xl shimmer border border-slate-100 shadow-sm"></div>
                <div className="grid grid-cols-3 gap-1.5 p-1.5 bg-slate-100 rounded-xl">
                  {[1, 2, 3, 4, 5, 6].map(j => (
                    <div key={j} className="w-4 h-4 bg-white/50 rounded shimmer"></div>
                  ))}
                </div>
              </div>
              <div className="flex-grow space-y-6">
                <div className="space-y-2">
                  <div className="h-2 w-20 bg-slate-200 rounded-full shimmer"></div>
                  <div className="h-4 w-full bg-slate-200/50 rounded-md shimmer border-b border-slate-200"></div>
                </div>
                <div className="space-y-2">
                  <div className="h-2 w-24 bg-slate-200 rounded-full shimmer"></div>
                  <div className="h-16 w-full bg-slate-100 rounded-md shimmer"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
