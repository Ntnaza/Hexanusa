"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { 
  LayoutDashboard, 
  Briefcase, 
  Image as ImageIcon, 
  Users, 
  MessageSquare, 
  LogOut, 
  Cpu,
  ChevronRight,
  Globe,
  Layout
} from "lucide-react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    const fetchUnread = async () => {
      try {
        const response = await fetch('/api/messages');
        const data = await response.json();
        const count = data.filter((m: any) => !m.isRead).length;
        setUnreadCount(count);
      } catch (err) {}
    };
    if (pathname?.startsWith("/admin")) fetchUnread();
  }, [pathname]);

  if (pathname === "/admin/login") return <>{children}</>;

  const menuItems = [
    { name: "Dashboard", href: "/admin", icon: <LayoutDashboard className="w-5 h-5" /> },
    { name: "Hero", href: "/admin/hero", icon: <Layout className="w-5 h-5" /> },
    { name: "Layanan", href: "/admin/services", icon: <Briefcase className="w-5 h-5" /> },
    { name: "Portofolio", href: "/admin/portfolio", icon: <ImageIcon className="w-5 h-5" /> },
    { name: "Tim Kami", href: "/admin/team", icon: <Users className="w-5 h-5" /> },
    { name: "Pesan", href: "/admin/messages", icon: <MessageSquare className="w-5 h-5" />, badge: unreadCount },
    { name: "Pengaturan", href: "/admin/settings", icon: <Globe className="w-5 h-5" /> },
  ];

  const handleLogout = () => {
    document.cookie = "admin_session=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
    router.push("/admin/login");
  };

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar Mewah */}
      <aside className="w-72 bg-white border-r border-slate-200 flex flex-col hidden lg:flex fixed h-full z-40">
        <div className="p-8 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <div className="bg-blue-600 p-2 rounded-xl text-white shadow-lg shadow-blue-200">
              <Cpu className="w-6 h-6" />
            </div>
            <span className="text-xl font-black text-slate-900 tracking-tighter uppercase">
              Admin<span className="text-blue-600">Panel</span>
            </span>
          </div>
        </div>

        <nav className="flex-grow p-6 space-y-2">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center justify-between px-5 py-4 rounded-2xl transition-all font-bold text-sm ${
                  isActive 
                    ? "bg-blue-600 text-white shadow-xl shadow-blue-100 scale-[1.02]" 
                    : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                }`}
              >
                <div className="flex items-center gap-3">
                  {item.icon}
                  {item.name}
                </div>
                <div className="flex items-center gap-2">
                  {item.badge && item.badge > 0 && (
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-black ${isActive ? "bg-white text-blue-600" : "bg-blue-600 text-white"}`}>
                      {item.badge}
                    </span>
                  )}
                  {isActive && <ChevronRight className="w-4 h-4" />}
                </div>
              </Link>
            );
          })}
        </nav>

        <div className="p-6 border-t border-slate-100">
          <button onClick={handleLogout} className="flex items-center gap-3 w-full px-5 py-4 rounded-2xl text-red-500 font-bold text-sm hover:bg-red-50 transition-all">
            <LogOut className="w-5 h-5" />
            Keluar Sesi
          </button>
        </div>
      </aside>

      {/* Main Content dengan Header Detail */}
      <main className="flex-grow flex flex-col pl-72">
        <header className="h-24 bg-white border-b border-slate-100 flex items-center justify-between px-10 sticky top-0 z-30 shadow-sm shadow-slate-100/50">
          <div>
            <h2 className="font-black text-slate-900 uppercase tracking-[0.2em] text-xs">
              {menuItems.find(i => i.href === pathname)?.name || "Control Center"}
            </h2>
            <p className="text-[10px] text-slate-400 font-bold mt-1">HEXANUSA MANAGEMENT SYSTEM V1.0</p>
          </div>
          <div className="flex items-center gap-5">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-black text-slate-900">Koh Engkoh</p>
              <p className="text-[10px] text-blue-600 font-black uppercase tracking-widest">Super Administrator</p>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-slate-100 border-2 border-white shadow-md overflow-hidden">
              <img src="https://i.pravatar.cc/100?u=koh" alt="admin" />
            </div>
          </div>
        </header>
        <div className="p-10 flex-grow">{children}</div>
      </main>
    </div>
  );
}