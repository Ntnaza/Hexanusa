export default function SettingsLoading() {
  return (
    <div className="space-y-8 pb-20">
      {/* Identitas Core Skeleton */}
      <div className="bg-white rounded-3xl border border-slate-100 p-8 shadow-sm space-y-10">
        <div className="h-4 w-32 bg-slate-100 rounded-full shimmer pb-4 border-b border-slate-50 w-full"></div>
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-10">
          <div className="xl:col-span-5 space-y-4">
            <div className="h-2 w-24 bg-slate-100 rounded-full shimmer ml-1"></div>
            <div className="aspect-[3/1] w-full bg-slate-50 rounded-2xl shimmer"></div>
          </div>
          <div className="xl:col-span-3 space-y-4">
            <div className="h-2 w-24 bg-slate-100 rounded-full shimmer ml-1"></div>
            <div className="aspect-square w-full max-w-[120px] mx-auto bg-slate-50 rounded-2xl shimmer"></div>
          </div>
          <div className="xl:col-span-4 space-y-4">
            <div className="h-2 w-24 bg-slate-100 rounded-full shimmer ml-1"></div>
            <div className="h-[64px] w-full bg-slate-50 rounded-2xl shimmer"></div>
          </div>
        </div>
      </div>

      {/* Informasi Kontak Skeleton */}
      <div className="bg-white rounded-3xl border border-slate-100 p-8 shadow-sm space-y-8">
        <div className="h-4 w-32 bg-slate-100 rounded-full shimmer pb-4 border-b border-slate-50 w-full"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-3">
            <div className="h-2 w-24 bg-slate-100 rounded-full shimmer ml-1"></div>
            <div className="h-14 w-full bg-slate-50 rounded-2xl shimmer"></div>
          </div>
          <div className="space-y-3">
            <div className="h-2 w-24 bg-slate-100 rounded-full shimmer ml-1"></div>
            <div className="h-14 w-full bg-slate-50 rounded-2xl shimmer"></div>
          </div>
          <div className="md:col-span-2 space-y-3">
            <div className="h-2 w-24 bg-slate-100 rounded-full shimmer ml-1"></div>
            <div className="h-24 w-full bg-slate-50 rounded-2xl shimmer"></div>
          </div>
        </div>
      </div>

      {/* Lokasi & Maps Skeleton */}
      <div className="bg-white rounded-3xl border border-slate-100 p-8 shadow-sm space-y-6">
        <div className="h-4 w-32 bg-slate-100 rounded-full shimmer pb-4 border-b border-slate-50 w-full"></div>
        <div className="h-14 w-full bg-slate-900/50 rounded-2xl shimmer"></div>
      </div>

      {/* Sosial Media Skeleton */}
      <div className="bg-white rounded-3xl border border-slate-100 p-8 shadow-sm space-y-8">
        <div className="h-4 w-32 bg-slate-100 rounded-full shimmer pb-4 border-b border-slate-50 w-full"></div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map(i => (
            <div key={i} className="space-y-3">
              <div className="h-2 w-20 bg-slate-100 rounded-full shimmer ml-1"></div>
              <div className="h-14 w-full bg-slate-50 rounded-2xl shimmer"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}