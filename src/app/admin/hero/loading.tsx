export default function HeroLoading() {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div className="space-y-3">
          <div className="h-10 w-64 bg-slate-200 rounded-xl shimmer"></div>
          <div className="h-4 w-80 bg-slate-100 rounded-lg shimmer"></div>
        </div>
        <div className="h-14 w-44 bg-slate-900 rounded-xl shimmer"></div>
      </div>

      <div className="space-y-6">
        {[1, 2, 3].map(i => (
          <div key={i} className="bg-white p-8 rounded-3xl border border-slate-100 flex flex-col md:flex-row gap-8 items-center shadow-sm">
            <div className="flex-grow space-y-4 w-full">
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 bg-slate-50 rounded-lg shimmer"></div>
                <div className="h-3 w-20 bg-slate-100 rounded-full shimmer"></div>
              </div>
              <div className="h-8 w-3/4 bg-slate-200 rounded-xl shimmer"></div>
              <div className="h-4 w-full bg-slate-100 rounded-lg shimmer"></div>
            </div>
            <div className="flex gap-3 shrink-0">
              <div className="w-12 h-12 bg-slate-50 rounded-xl shimmer"></div>
              <div className="w-12 h-12 bg-slate-50 rounded-xl shimmer"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}