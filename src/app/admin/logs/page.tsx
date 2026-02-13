import { prisma } from "@/lib/prisma";
import { ShieldCheck, ShieldAlert, History, Globe, Monitor, Smartphone, Laptop } from "lucide-react";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { UAParser } from "ua-parser-js";

export default async function AuditLogsPage() {
  const logs = await prisma.auditlog.findMany({
    orderBy: { createdAt: "desc" },
    take: 50,
  });

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Audit Log Keamanan</h1>
          <p className="text-slate-500 font-medium text-sm">Pantau setiap percobaan akses ke pusat kendali Hexanusa.</p>
        </div>
        <div className="bg-blue-50 text-blue-600 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest border border-blue-100 flex items-center gap-2">
          <History className="w-4 h-4" />
          Live Monitoring Active
        </div>
      </div>

      <div className="bg-white rounded-[32px] border border-slate-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-100">
                <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Waktu</th>
                <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Username</th>
                <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</th>
                <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Informasi Perangkat</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {logs.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-20 text-center text-slate-400 font-medium italic">
                    Belum ada riwayat aktivitas yang tercatat.
                  </td>
                </tr>
              ) : (
                logs.map((log) => {
                  const parser = new UAParser(log.userAgent || "");
                  const ua = parser.getResult();
                  const isMobile = ua.device.type === "mobile" || ua.device.type === "tablet";

                  return (
                    <tr key={log.id} className="hover:bg-slate-50/30 transition-colors">
                      <td className="px-6 py-4">
                        <div className="text-sm font-black text-slate-900 leading-none mb-1">
                          {format(new Date(log.createdAt), "HH:mm:ss", { locale: id })}
                        </div>
                        <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                          {format(new Date(log.createdAt), "dd MMM yyyy", { locale: id })}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className={`w-8 h-8 rounded-lg flex items-center justify-center border ${
                            log.status === "SUCCESS" ? "bg-blue-50 border-blue-100 text-blue-600" : "bg-slate-50 border-slate-100 text-slate-400"
                          }`}>
                            <ShieldCheck className="w-4 h-4" />
                          </div>
                          <span className="text-sm font-bold text-slate-700">{log.username}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        {log.status === "SUCCESS" ? (
                          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-100 text-[9px] font-black uppercase tracking-wider">
                            <ShieldCheck className="w-3.5 h-3.5" />
                            Authorized
                          </div>
                        ) : (
                          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-red-50 text-red-600 border border-red-100 text-[9px] font-black uppercase tracking-wider">
                            <ShieldAlert className="w-3.5 h-3.5" />
                            Failed Attempt
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-start gap-4">
                          <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 border border-slate-100 shrink-0">
                            {isMobile ? <Smartphone className="w-5 h-5" /> : <Laptop className="w-5 h-5" />}
                          </div>
                          <div className="space-y-1">
                            <div className="text-xs font-black text-slate-900 leading-none flex items-center gap-2">
                              {ua.os.name} {ua.os.version}
                              {ua.os.name === "Windows" && ua.os.version === "10" && (
                                <span className="text-[9px] font-bold text-blue-500/60 bg-blue-50 px-1 rounded">10/11</span>
                              )}
                            </div>
                            <div className="text-[10px] font-bold text-slate-500">
                              {ua.device.vendor ? `${ua.device.vendor} ` : ""}
                              {ua.device.model ? `${ua.device.model} ` : !isMobile ? "Desktop/Laptop PC" : "Unknown Device"}
                            </div>
                            <div className="text-[9px] font-medium text-slate-400 flex items-center gap-1.5">
                              <Monitor className="w-3 h-3" />
                              {ua.browser.name} ({ua.browser.version}) &bull; {log.ipAddress}
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
