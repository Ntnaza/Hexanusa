export default function AdminLoading() {
  return (
    <div className="space-y-10 animate-pulse">
      <div className="flex justify-between items-center">
        <div className="space-y-3">
          <div className="h-10 bg-slate-200 rounded-2xl w-64"></div>
          <div className="h-4 bg-slate-100 rounded-xl w-96"></div>
        </div>
        <div className="h-14 bg-slate-200 rounded-[20px] w-48"></div>
      </div>

      <div className="bg-white rounded-[40px] border border-slate-100 h-[500px] overflow-hidden">
        <div className="h-20 bg-slate-50 border-b border-slate-100"></div>
        <div className="p-10 space-y-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex items-center gap-10">
              <div className="w-14 h-14 bg-slate-100 rounded-2xl"></div>
              <div className="flex-grow space-y-3">
                <div className="h-5 bg-slate-100 rounded-lg w-1/4"></div>
                <div className="h-4 bg-slate-50 rounded-lg w-3/4"></div>
              </div>
              <div className="w-24 h-10 bg-slate-50 rounded-xl"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
