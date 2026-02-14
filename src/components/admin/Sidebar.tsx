"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { 
  LayoutDashboard, 
  Briefcase, 
  Image as ImageIcon, 
  Users, 
  MessageSquare, 
  LogOut, 
  Cpu,
  Layout,
  Menu,
  X,
  Settings2,
  ChevronLeft,
  ChevronRight,
  Info,
  Globe,
  ShieldCheck,
  User
} from "lucide-react";
import { useState, useEffect } from "react";
import { useTransition } from "@/app/admin/layout";
import { logoutAction } from "@/app/actions/auth";

const menuItems = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "Hero Section", href: "/admin/hero", icon: Layout },
  { name: "Tentang Kami", href: "/admin/about", icon: Info },
  { name: "Layanan", href: "/admin/services", icon: Briefcase },
  { name: "Portofolio", href: "/admin/portfolio", icon: ImageIcon },
  { name: "Testimonials", href: "/admin/testimonials", icon: MessageSquare },
  { name: "Tim Kami", href: "/admin/team", icon: Users },
  { name: "Pesan Masuk", href: "/admin/messages", icon: MessageSquare },
  { name: "Pengaturan Umum", href: "/admin/settings", icon: Globe },
  { name: "Log Aktivitas", href: "/admin/logs", icon: ShieldCheck },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [siteIcon, setSiteIcon] = useState<string | null>(null);
  const { targetPath, setTargetPath } = useTransition();

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  useEffect(() => {
    // Ambil icon dari database
    fetch('/api/settings')
      .then(res => res.json())
      .then(data => {
        if (data && data.siteIcon) setSiteIcon(data.siteIcon);
      })
      .catch(() => {});
  }, []);

  const handleLogout = async () => {
    await logoutAction();
    window.location.href = "/admin/login";
  };

  const iconLaneWidth = 80;

  return (
    <>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed bottom-6 right-6 z-[200] bg-blue-600 text-white p-4 rounded-full shadow-2xl"
      >
        {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="lg:hidden fixed inset-0 bg-slate-950/60 backdrop-blur-md z-[180]"
          />
        )}
      </AnimatePresence>

      <motion.aside 
        initial={false}
        animate={{ width: isCollapsed ? iconLaneWidth : 260 }}
        transition={{ type: "spring", stiffness: 400, damping: 40 }}
        className={`
          fixed lg:sticky top-0 left-0 h-screen bg-[#0F172A] border-r border-white/5 flex flex-col z-[190] shadow-2xl
          overflow-visible 
          ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
          lg:transition-none transition-transform duration-300
        `}
      >
        {/* Toggle Button - Explicitly Z-Highest and Fixed Position */}
        <button 
          onClick={(e) => {
            e.preventDefault();
            setIsCollapsed(!isCollapsed);
          }}
          className="hidden lg:flex absolute -right-3.5 top-10 w-7 h-7 bg-blue-600 rounded-full items-center justify-center text-white hover:scale-110 transition-all shadow-[0_4px_15px_rgba(0,0,0,0.5)] z-[300] border-2 border-[#0F172A]"
        >
          {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>

        {/* Brand Section */}
        <div className="h-20 flex items-center shrink-0 overflow-hidden relative z-10">
          <div style={{ width: iconLaneWidth }} className="flex justify-center shrink-0">
            <div className="w-11 h-11 flex items-center justify-center overflow-hidden">
              {siteIcon ? (
                <img src={siteIcon} alt="Icon" className="w-full h-full object-contain" />
              ) : (
                <div className="bg-gradient-to-br from-blue-500 to-indigo-600 w-11 h-11 rounded-xl flex items-center justify-center text-white shadow-lg">
                  <Cpu className="w-5 h-5" />
                </div>
              )}
            </div>
          </div>
          <motion.div 
            animate={{ opacity: isCollapsed ? 0 : 1, x: isCollapsed ? -20 : 0 }}
            className="whitespace-nowrap flex-grow"
          >
            <span className="text-lg font-black text-white tracking-tighter block leading-none">
              HEXA<span className="text-blue-500">NUSA</span>
            </span>
            <span className="text-[9px] font-bold text-slate-500 uppercase tracking-[0.2em] mt-1.5 block">Admin Core</span>
          </motion.div>
        </div>

        {/* Navigation */}
        <div className="flex-1 overflow-visible relative z-10">
           <nav className={`h-full pt-4 custom-scrollbar ${isCollapsed ? "overflow-visible" : "overflow-y-auto overflow-x-hidden"}`}>
            {menuItems.map((item) => {
              const isActive = targetPath === item.href;
              const Icon = item.icon;
              
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setTargetPath(item.href)}
                  className={`
                    relative group flex items-center transition-colors duration-200 h-12 w-full mb-1
                    ${isActive ? "text-white" : "text-slate-400 hover:text-white"}
                  `}
                >
                  {isActive && (
                    <motion.div 
                      layoutId="activeBg"
                      className={`absolute bg-blue-600 z-0 shadow-lg shadow-blue-500/20 rounded-xl
                        ${isCollapsed 
                          ? "w-12 h-12 left-4" 
                          : "inset-y-0 left-3 right-3"}
                      `}
                      transition={{ type: "spring", bounce: 0, duration: 0.3 }}
                    />
                  )}

                  <div style={{ width: iconLaneWidth }} className="relative z-10 flex justify-center shrink-0">
                    <Icon className={`w-5 h-5 transition-transform duration-300 ${isActive ? "scale-110" : "group-hover:scale-110"}`} />
                  </div>
                  
                  {!isCollapsed && (
                    <div className="flex-grow overflow-hidden whitespace-nowrap pr-6">
                      <motion.span 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="relative z-10 text-[13px] font-bold tracking-tight inline-block"
                      >
                        {item.name}
                      </motion.span>
                    </div>
                  )}

                  {isCollapsed && (
                    <div className="absolute left-[calc(100%+12px)] top-1/2 -translate-y-1/2 invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-x-2 group-hover:translate-x-0 z-[200]">
                      <div className="relative bg-white text-slate-900 text-[10px] font-black uppercase tracking-[0.15em] px-4 py-3 rounded-xl shadow-2xl whitespace-nowrap border border-slate-100">
                        {item.name}
                        <div className="absolute -left-1.5 top-1/2 -translate-y-1/2 w-3 h-3 bg-white border-l border-b border-slate-100 rotate-45"></div>
                      </div>
                    </div>
                  )}
                </Link>
              );
            })}
           </nav>
        </div>

        {/* User & Footer Section */}
        <div className="shrink-0 border-t border-white/5 bg-black/20 overflow-hidden py-4 relative z-10">
          <Link href="/admin/profile" onClick={() => setTargetPath("/admin/profile")} className="h-12 flex items-center mb-2 hover:bg-white/5 transition-colors group/user">
             <div style={{ width: iconLaneWidth }} className="flex justify-center shrink-0">
                <div className="w-8 h-8 rounded-lg overflow-hidden bg-slate-800 border border-white/10 shrink-0 group-hover/user:border-blue-500 transition-colors flex items-center justify-center text-slate-500 group-hover/user:text-blue-500">
                  <User className="w-4 h-4" />
                </div>
             </div>
             <AnimatePresence>
               {!isCollapsed && (
                 <motion.div 
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    className="ml-3 min-w-0 whitespace-nowrap"
                 >
                    <p className="text-[10px] font-black text-white truncate group-hover/user:text-blue-400 transition-colors">Administrator</p>
                    <p className="text-[8px] font-bold text-slate-500 uppercase">Manage Profile</p>
                 </motion.div>
               )}
             </AnimatePresence>
          </Link>
          
          <button 
            onClick={handleLogout}
            className="flex items-center w-full transition-colors hover:text-red-400 group h-12"
          >
            <div style={{ width: iconLaneWidth }} className="flex justify-center shrink-0">
              <LogOut className="w-5 h-5 text-slate-500 group-hover:text-red-400 transition-colors" />
            </div>
            {!isCollapsed && (
              <motion.span 
                animate={{ opacity: isCollapsed ? 0 : 1, x: isCollapsed ? -20 : 0 }}
                className="uppercase tracking-widest font-black text-[9px] text-slate-500 group-hover:text-red-400 ml-3 whitespace-nowrap"
              >
                End Session
              </motion.span>
            )}
          </button>
        </div>
      </motion.aside>
    </>
  );
}
