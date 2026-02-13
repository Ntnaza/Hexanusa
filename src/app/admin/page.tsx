import { prisma } from "@/lib/prisma";
import { 
  Briefcase, 
  Image as ImageIcon, 
  Users, 
  MessageSquare, 
  ArrowUpRight, 
  Activity,
  Zap,
  Globe,
  ShieldCheck,
  MousePointerClick
} from "lucide-react";
import Link from "next/link";

export default async function AdminDashboard() {
  const stats = [
    { name: "Services", count: await prisma.service.count(), icon: Briefcase, color: "blue", trend: "+2" },
    { name: "Portfolio", count: await prisma.portfolio.count(), icon: ImageIcon, color: "violet", trend: "+1" },
    { name: "Team", count: await prisma.teammember.count(), icon: Users, color: "emerald", trend: "0" },
    { name: "Messages", count: await prisma.contactmessage.count(), icon: MessageSquare, color: "amber", trend: "+5" },
  ];

  return (
    <div className="space-y-8 pb-10">
      {/* Header Section - More Compact */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 border-b border-slate-100 pb-8">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2 py-0.5 rounded-md bg-blue-50 text-blue-600 text-[9px] font-black uppercase tracking-widest border border-blue-100">
              Live Overview
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
          </div>
          <h1 className="text-3xl lg:text-4xl font-black text-slate-900 tracking-tighter mb-2">
            Welcome back, <span className="text-blue-600">Chief.</span>
          </h1>
          <p className="text-slate-500 font-medium text-sm max-w-xl">
            Sistem manajemen Hexanusa terpantau <span className="text-slate-900 font-bold">optimal</span> hari ini.
          </p>
        </div>
        
        <div className="flex items-center gap-3 bg-white border border-slate-100 p-1.5 rounded-2xl shadow-sm">
          <div className="bg-slate-900 text-white p-4 rounded-xl flex flex-col items-center justify-center min-w-[100px]">
            <Activity className="w-4 h-4 mb-1 text-blue-400" />
            <span className="text-[8px] font-bold uppercase tracking-widest text-slate-400">Uptime</span>
            <span className="text-sm font-black">99.9%</span>
          </div>
          <div className="px-4 pr-6">
            <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-0.5">Latency</p>
            <p className="text-lg font-black text-slate-900 tracking-tight">12ms</p>
          </div>
        </div>
      </div>

      {/* Stats Grid - Smaller Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Link key={stat.name} href="#" className="group">
              <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm transition-all hover:shadow-md hover:-translate-y-1 flex flex-col h-full relative overflow-hidden">
                <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center mb-4 group-hover:bg-slate-900 group-hover:text-white transition-all">
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{stat.name}</p>
                    <span className="text-[8px] font-bold text-emerald-500 bg-emerald-50 px-1.5 py-0.5 rounded-md">{stat.trend}</span>
                  </div>
                  <h3 className="text-2xl font-black text-slate-900 tracking-tight">{stat.count}</h3>
                </div>
                <ArrowUpRight className="absolute top-5 right-5 w-3.5 h-3.5 text-slate-200 group-hover:text-blue-500 transition-all" />
              </div>
            </Link>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Banner - Reduced Height & Padding */}
        <div className="lg:col-span-2 relative group overflow-hidden bg-slate-900 rounded-3xl p-8 lg:p-10 text-white">
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/10 px-3 py-1.5 rounded-lg mb-6">
              <Zap className="w-3.5 h-3.5 text-blue-400" />
              <span className="text-[8px] font-black uppercase tracking-widest text-white/80">System Intelligence</span>
            </div>
            <h3 className="text-2xl lg:text-3xl font-black mb-4 leading-tight max-w-md">
              Optimize reach with <span className="text-blue-400">Smart Analytics.</span>
            </h3>
            <p className="text-slate-400 font-medium text-sm leading-relaxed mb-8 max-w-sm">
              Pantau performa konten Anda secara real-time dengan sistem optimasi otomatis.
            </p>
            <div className="flex gap-4">
              <button className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all">
                Reports
              </button>
              <button className="bg-white/5 hover:bg-white/10 border border-white/10 text-white px-6 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all">
                Learn More
              </button>
            </div>
          </div>
        </div>

        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h4 className="font-black text-slate-900 uppercase tracking-widest text-[11px]">Security</h4>
            </div>
            <div className="space-y-4">
              {[
                { label: "SSL Protection", val: "Active", color: "text-emerald-500" },
                { label: "Encryption", val: "AES-256", color: "text-blue-500" },
                { label: "Firewall", val: "On", color: "text-emerald-500" },
              ].map(item => (
                <div key={item.label} className="flex justify-between items-center border-b border-slate-50 pb-3 last:border-0 last:pb-0">
                  <span className="text-[10px] font-bold text-slate-400">{item.label}</span>
                  <span className={`text-[9px] font-black uppercase tracking-widest ${item.color}`}>{item.val}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-indigo-600 rounded-3xl p-6 text-white shadow-lg relative overflow-hidden group">
            <div className="relative z-10">
              <p className="text-[8px] font-black uppercase tracking-widest text-white/60 mb-1">Status</p>
              <h4 className="text-xl font-black mb-4 tracking-tight">Global Reach</h4>
              <div className="inline-flex items-center gap-2 bg-white/10 px-3 py-2 rounded-xl border border-white/10 backdrop-blur-sm">
                <MousePointerClick className="w-4 h-4 text-blue-300" />
                <p className="text-[10px] font-bold">1.2k Clicks</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}