import { prisma } from "@/lib/prisma";
import { Briefcase, Image as ImageIcon, Users, MessageSquare } from "lucide-react";

export default async function AdminDashboard() {
  // Ambil statistik dari database
  const stats = [
    { name: "Layanan", count: await prisma.service.count(), icon: <Briefcase />, color: "bg-blue-50 text-blue-600" },
    { name: "Portofolio", count: await prisma.portfolio.count(), icon: <ImageIcon />, color: "bg-indigo-50 text-indigo-600" },
    { name: "Anggota Tim", count: await prisma.teamMember.count(), icon: <Users />, color: "bg-emerald-50 text-emerald-600" },
    { name: "Pesan Masuk", count: await prisma.contactMessage.count(), icon: <MessageSquare />, color: "bg-amber-50 text-amber-600" },
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">Selamat Datang, Koh!</h1>
        <p className="text-slate-500 font-medium mt-1">Berikut adalah ringkasan data website Hexanusa hari ini.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.name} className="bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-slate-200/50 transition-all">
            <div className={`w-12 h-12 rounded-2xl ${stat.color} flex items-center justify-center mb-4`}>
              {stat.icon}
            </div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{stat.name}</p>
            <p className="text-3xl font-black text-slate-900 mt-1">{stat.count}</p>
          </div>
        ))}
      </div>

      {/* Info Box */}
      <div className="bg-slate-900 rounded-[40px] p-10 text-white relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-md">
            <h3 className="text-2xl font-bold mb-3">Sistem Siap Digunakan!</h3>
            <p className="text-slate-400 font-medium text-sm leading-relaxed">
              Anda dapat menambah, mengubah, atau menghapus konten website langsung dari panel ini. 
              Semua perubahan akan langsung tampil di halaman depan website Hexanusa.
            </p>
          </div>
          <button className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-4 rounded-2xl font-bold text-sm transition-all">
            Pelajari Cara Pakai
          </button>
        </div>
        {/* Dekorasi */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl -z-0" />
      </div>
    </div>
  );
}
