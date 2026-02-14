import { prisma } from "@/lib/prisma";
import { 
  Briefcase, 
  Image as ImageIcon, 
  Users, 
  MessageSquare, 
  ArrowUpRight, 
  Globe,
  Activity,
  ShieldCheck,
  Clock,
  Eye,
  PlusCircle,
  BarChart3,
  Cloud
} from "lucide-react";
import Link from "next/link";

export default async function AdminDashboard() {
  // 1. Fetch data dasar
  const [
    servicesCount, 
    portfolioCount, 
    teamCount, 
    messagesCount, 
    unreadMessages, 
    latestMessages,
    latestLogs,
    totalVisitors,
    uniqueVisitorsCount
  ] = await Promise.all([
    prisma.service.count(),
    prisma.portfolio.count(),
    prisma.teammember.count(),
    prisma.contactmessage.count(),
    prisma.contactmessage.count({ where: { isRead: false } }),
    prisma.contactmessage.findMany({ take: 3, orderBy: { createdAt: 'desc' } }),
    prisma.auditlog.findMany({ take: 4, orderBy: { createdAt: 'desc' } }),
    prisma.visitor.count(),
    prisma.visitor.groupBy({ by: ['ip'] }).then(res => res.length)
  ]);

  // 2. Analisis Pesan (Response Rate)
  const readMessages = messagesCount - unreadMessages;
  const responseRate = messagesCount > 0 ? Math.round((readMessages / messagesCount) * 100) : 100;

  // 3. Grafik Kunjungan 7 Hari Terakhir
  const last7Days = [...Array(7)].map((_, i) => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    d.setDate(d.getDate() - i);
    return d;
  }).reverse();

  const chartData = await Promise.all(last7Days.map(async (date) => {
    const nextDay = new Date(date);
    nextDay.setDate(date.getDate() + 1);
    
    const count = await prisma.visitor.count({
      where: {
        createdAt: {
          gte: date,
          lt: nextDay
        }
      }
    });
    
    return {
      day: date.toLocaleDateString('id-ID', { weekday: 'short' }),
      count
    };
  }));

  const maxCount = Math.max(...chartData.map(d => d.count), 1);

  const stats = [
    { name: "Services", count: servicesCount, icon: Briefcase, color: "blue", href: "/admin/services" },
    { name: "Portfolio", count: portfolioCount, icon: ImageIcon, color: "violet", href: "/admin/portfolio" },
    { name: "Team", count: teamCount, icon: Users, color: "emerald", href: "/admin/team" },
    { name: "Messages", count: messagesCount, icon: MessageSquare, color: "amber", href: "/admin/messages" },
  ];

  return (
    <div className="space-y-8 pb-10">
      {/* Header Section */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 border-b border-slate-100 pb-8">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2 py-0.5 rounded-md bg-blue-50 text-blue-600 text-[9px] font-black uppercase tracking-widest border border-blue-100">
              Live Overview
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
          </div>
          <h1 className="text-3xl lg:text-4xl font-black text-slate-900 tracking-tighter mb-2">
            Welcome back, <span className="text-blue-600">Chief.</span>
          </h1>
          <p className="text-slate-500 font-medium text-sm max-w-xl">
            Sistem terpantau <span className="text-emerald-500 font-bold">sehat</span>. {unreadMessages} pesan menunggu respon Anda.
          </p>
        </div>
        
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-3 bg-white border border-slate-100 p-1.5 rounded-2xl shadow-sm">
            <div className="bg-blue-600 text-white p-4 rounded-xl flex flex-col items-center justify-center min-w-[100px]">
              <Eye className="w-4 h-4 mb-1" />
              <span className="text-[8px] font-bold uppercase tracking-widest text-blue-100">Visitors</span>
              <span className="text-sm font-black">{uniqueVisitorsCount}</span>
            </div>
            <div className="px-4 pr-6">
              <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-0.5">Total Hits</p>
              <p className="text-lg font-black text-slate-900 tracking-tight">{totalVisitors}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 bg-white border border-slate-100 p-1.5 rounded-2xl shadow-sm">
            <div className="bg-slate-900 text-white p-4 rounded-xl flex flex-col items-center justify-center min-w-[100px]">
              <MessageSquare className="w-4 h-4 mb-1 text-blue-400" />
              <span className="text-[8px] font-bold uppercase tracking-widest text-slate-400">Response</span>
              <span className="text-sm font-black">{responseRate}%</span>
            </div>
            <div className="px-4 pr-6">
              <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-0.5">Unread</p>
              <p className="text-lg font-black text-slate-900 tracking-tight">{unreadMessages}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats & Charts Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
        {/* Left: Stats cards */}
        <div className="xl:col-span-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <Link key={stat.name} href={stat.href} className="group">
                <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm transition-all hover:shadow-md hover:-translate-y-1 flex flex-col h-full relative overflow-hidden">
                  <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center mb-4 group-hover:bg-slate-900 group-hover:text-white transition-all text-slate-600">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{stat.name}</p>
                    <h3 className="text-2xl font-black text-slate-900 tracking-tight">{stat.count}</h3>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Center: Visitor Chart */}
        <div className="xl:col-span-5 bg-white border border-slate-100 rounded-3xl p-6 shadow-sm flex flex-col">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-50 text-blue-600 rounded-xl">
                <BarChart3 className="w-4 h-4" />
              </div>
              <h3 className="font-black text-slate-900 uppercase tracking-widest text-[10px]">Kunjungan 7 Hari Terakhir</h3>
            </div>
          </div>
          
          <div className="flex-1 flex items-end justify-between gap-2 pt-10 pb-2 px-2">
            {chartData.map((data, i) => {
              // Hitung tinggi dalam % (minimal 4% jika ada data tapi kecil, maksimal 100%)
              const percentage = data.count > 0 ? Math.max((data.count / maxCount) * 100, 8) : 0;
              
              return (
                <div key={i} className="flex-1 flex flex-col items-center gap-3 group">
                  <div className="w-full relative flex flex-col items-center h-full justify-end">
                    {/* Tooltip on hover */}
                    <div className="absolute -top-8 opacity-0 group-hover:opacity-100 transition-all bg-slate-900 text-white text-[9px] font-black px-2 py-1 rounded-lg pointer-events-none whitespace-nowrap z-20">
                      {data.count} Visitors
                    </div>
                    
                    {/* Bar */}
                    <div 
                      style={{ height: `${percentage}%` }}
                      className={`w-full max-w-[28px] rounded-t-lg transition-all duration-700 relative ${i === 6 ? 'bg-blue-600 shadow-[0_0_20px_rgba(37,99,235,0.4)]' : 'bg-slate-100 group-hover:bg-blue-200'}`}
                    >
                      {/* Highlight untuk hari ini */}
                      {i === 6 && (
                        <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-blue-600 animate-ping"></div>
                      )}
                    </div>
                  </div>
                  <span className={`text-[9px] font-black uppercase tracking-tighter ${i === 6 ? 'text-blue-600' : 'text-slate-400'}`}>
                    {i === 6 ? 'Hari Ini' : data.day}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Quick Actions */}
        <div className="xl:col-span-3 bg-slate-900 rounded-3xl p-6 text-white shadow-xl">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-white/10 rounded-xl">
              <PlusCircle className="w-4 h-4 text-blue-400" />
            </div>
            <h3 className="font-black uppercase tracking-widest text-[10px]">Quick Actions</h3>
          </div>
          <div className="grid grid-cols-1 gap-3">
            <Link href="/admin/portfolio" className="flex items-center gap-3 bg-white/5 hover:bg-white/10 p-3 rounded-2xl transition-all border border-white/5 group">
              <ImageIcon className="w-4 h-4 text-blue-400" />
              <span className="text-[10px] font-bold uppercase tracking-widest">Tambah Portofolio</span>
              <ArrowUpRight className="w-3 h-3 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
            </Link>
            <Link href="/admin/services" className="flex items-center gap-3 bg-white/5 hover:bg-white/10 p-3 rounded-2xl transition-all border border-white/5 group">
              <Briefcase className="w-4 h-4 text-emerald-400" />
              <span className="text-[10px] font-bold uppercase tracking-widest">Tambah Layanan</span>
              <ArrowUpRight className="w-3 h-3 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
            </Link>
            <Link href="/admin/settings" className="flex items-center gap-3 bg-white/5 hover:bg-white/10 p-3 rounded-2xl transition-all border border-white/5 group">
              <Globe className="w-4 h-4 text-amber-400" />
              <span className="text-[10px] font-bold uppercase tracking-widest">Update Kontak</span>
              <ArrowUpRight className="w-3 h-3 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
            </Link>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Pesan Terbaru Section */}
        <div className="lg:col-span-2 bg-white border border-slate-100 rounded-3xl p-8 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-amber-50 rounded-xl text-amber-600">
                <MessageSquare className="w-5 h-5" />
              </div>
              <h3 className="font-black text-slate-900 uppercase tracking-widest text-xs">Pesan Terbaru</h3>
            </div>
            <Link href="/admin/messages" className="text-[10px] font-black text-blue-600 uppercase tracking-widest hover:underline">
              Lihat Semua
            </Link>
          </div>

          <div className="space-y-4">
            {latestMessages.length > 0 ? (
              latestMessages.map((msg) => (
                <div key={msg.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
                  <div className="flex items-center gap-4">
                    <div className={`w-2 h-2 rounded-full ${msg.isRead ? 'bg-slate-300' : 'bg-blue-600'}`}></div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">{msg.name}</h4>
                      <p className="text-xs text-slate-500 line-clamp-1">{msg.message}</p>
                    </div>
                  </div>
                  <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">
                    {new Date(msg.createdAt).toLocaleDateString('id-ID')}
                  </span>
                </div>
              ))
            ) : (
              <p className="text-sm text-slate-400 font-medium text-center py-10 italic">Belum ada pesan masuk.</p>
            )}
          </div>
        </div>

        <div className="lg:col-span-1 space-y-6">
          {/* Log Aktivitas & Storage Status Section */}
          <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center">
                  <Activity className="w-5 h-5" />
                </div>
                <h4 className="font-black text-slate-900 uppercase tracking-widest text-[11px]">System Status</h4>
              </div>
            </div>
            
            <div className="space-y-6">
              {/* Storage Status */}
              <div className="flex items-center justify-between p-3 bg-blue-50/50 rounded-2xl border border-blue-100/50">
                <div className="flex items-center gap-3">
                  <Cloud className="w-4 h-4 text-blue-600" />
                  <span className="text-[10px] font-bold text-slate-600 uppercase">Cloudinary Storage</span>
                </div>
                <span className="text-[9px] font-black text-emerald-600 uppercase tracking-widest bg-emerald-100 px-2 py-0.5 rounded">Active</span>
              </div>

              {/* Security Status */}
              <div className="flex items-center justify-between p-3 bg-indigo-50/50 rounded-2xl border border-indigo-100/50">
                <div className="flex items-center gap-3">
                  <ShieldCheck className="w-4 h-4 text-indigo-600" />
                  <span className="text-[10px] font-bold text-slate-600 uppercase">Security Scan</span>
                </div>
                <span className="text-[9px] font-black text-blue-600 uppercase tracking-widest bg-blue-100 px-2 py-0.5 rounded">Secure</span>
              </div>

              <div className="h-[1px] bg-slate-100"></div>

              {/* Log Mini */}
              <div className="space-y-4">
                <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-2">Recent Logs</p>
                {latestLogs.map((log) => (
                  <div key={log.id} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-1.5 h-1.5 rounded-full ${log.status === 'SUCCESS' ? 'bg-emerald-500' : 'bg-rose-500'}`}></div>
                      <span className="text-[10px] font-bold text-slate-700">{log.username} Login</span>
                    </div>
                    <span className="text-[8px] font-bold text-slate-400 uppercase">{new Date(log.createdAt).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
