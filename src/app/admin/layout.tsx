"use client";

import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Sidebar from "@/components/admin/Sidebar";
import { Search, BellRing, Command } from "lucide-react";
import { useEffect, useState, createContext, useContext } from "react";
import { ToastProvider } from "@/components/admin/Toast";
import DashboardLoading from "./loading";
import HeroLoading from "./hero/loading";
import TableLoading from "./services/loading";
import SettingsLoading from "./settings/loading";
import AboutLoading from "./about/loading";

const TransitionContext = createContext({
  targetPath: "",
  setTargetPath: (path: string) => {},
});

export const useTransition = () => useContext(TransitionContext);

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [targetPath, setTargetPath] = useState(pathname);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    setTargetPath(pathname);
  }, [pathname]);

  if (pathname === "/admin/login") return <>{children}</>;

  const getSkeleton = (path: string) => {
    if (path === "/admin") return <DashboardLoading />;
    if (path === "/admin/hero") return <HeroLoading />;
    if (path === "/admin/about") return <AboutLoading />;
    if (path === "/admin/settings") return <SettingsLoading />;
    return <TableLoading />;
  };

  const isNavigating = targetPath !== pathname;

  return (
    <TransitionContext.Provider value={{ targetPath, setTargetPath }}>
      <ToastProvider>
        <div className="min-h-screen bg-[#FDFDFE] flex selection:bg-blue-600 selection:text-white overflow-hidden text-sm">
        {/* Progress Bar Atas */}
        <div className="fixed top-0 left-0 right-0 z-[200] h-0.5 pointer-events-none">
          <motion.div 
            initial={{ width: "0%" }}
            animate={{ width: isNavigating ? "70%" : "100%", opacity: isNavigating ? 1 : 0 }}
            transition={{ duration: isNavigating ? 1.5 : 0.2 }}
            className="h-full bg-blue-600 shadow-[0_0_8px_rgba(37,99,235,0.4)]"
          />
        </div>

        <Sidebar />

        <main className="flex-grow flex flex-col h-screen relative z-10">
          <header className="h-16 glass border-b border-slate-100 flex items-center justify-between px-6 lg:px-8 shrink-0 z-50">
            <div className="flex items-center gap-4">
              <div className="hidden lg:flex items-center gap-3">
                <div className="bg-slate-900 p-2 rounded-xl text-white shadow-sm">
                  <Command className="w-3.5 h-3.5" />
                </div>
                <div>
                  <nav className="flex items-center gap-1.5 text-[8px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">
                    <span>Hexanusa</span>
                    <span className="text-slate-300">/</span>
                    <span className="text-blue-600">Enterprise</span>
                  </nav>
                  <h2 className="font-black text-slate-900 text-sm tracking-tight">
                    {targetPath === "/admin" ? "Dashboard" : 
                     targetPath === "/admin/about" ? "Tentang Kami" :
                     targetPath === "/admin/settings" ? "Pengaturan Umum" :
                     targetPath.split("/").pop()?.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                  </h2>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="hidden md:flex items-center bg-white border border-slate-200 rounded-lg px-3 py-1.5 w-56 focus-within:border-blue-500 transition-all">
                <Search className="w-3.5 h-3.5 text-slate-400" />
                <input type="text" placeholder="Quick search..." className="bg-transparent border-none focus:outline-none text-[11px] font-medium px-2 w-full" />
              </div>
              <button className="p-2 rounded-lg text-slate-500 hover:bg-slate-50 border border-slate-100"><BellRing className="w-3.5 h-3.5" /></button>
            </div>
          </header>

          <div className="flex-grow overflow-y-auto overflow-x-hidden p-6 lg:p-8 custom-scrollbar relative z-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={isNavigating ? "loading-" + targetPath : pathname}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.15, ease: "easeOut" }}
                className="w-full max-w-7xl mx-auto"
              >
                {isNavigating ? getSkeleton(targetPath) : children}
              </motion.div>
            </AnimatePresence>
          </div>
        </main>
              </div>
            </ToastProvider>
          </TransitionContext.Provider>
        );
      }