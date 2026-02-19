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
import Link from "next/link";
import { useRouter } from "next/navigation";

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
  const router = useRouter();
  const [targetPath, setTargetPath] = useState(pathname);
  const [isMounted, setIsMounted] = useState(false);

  // Search States
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showResults, setShowResults] = useState(false);

  // Notification States
  const [notifications, setNotifications] = useState<{ unreadCount: number, latestMessages: any[] }>({ unreadCount: 0, latestMessages: [] });
  const [showNotifications, setShowNotifications] = useState(false);

  const fetchNotifications = async () => {
    try {
      const res = await fetch('/api/admin/notifications');
      const data = await res.json();
      setNotifications(data);
    } catch (error) {
      console.error("Fetch notifications error:", error);
    }
  };

  useEffect(() => {
    fetchNotifications();
    // Refresh notifikasi setiap 1 menit
    const interval = setInterval(fetchNotifications, 60000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setIsMounted(true);
    setTargetPath(pathname);
  }, [pathname]);

  // Handle Search
  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      if (searchQuery.length >= 2) {
        setIsSearching(true);
        try {
          const res = await fetch(`/api/admin/search?q=${searchQuery}`);
          const data = await res.json();
          setSearchResults(data);
          setShowResults(true);
        } catch (error) {
          console.error("Search error:", error);
        } finally {
          setIsSearching(false);
        }
      } else {
        setSearchResults([]);
        setShowResults(false);
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery]);

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

        {/* Sidebar dengan Z-Index tertinggi (1000) agar berada di atas Modal (999) */}
        <div className="relative z-[1000]">
          <Sidebar />
        </div>

        <main className="flex-grow flex flex-col h-screen relative bg-[#FDFDFE] overflow-hidden">
          {/* Navbar dengan Z-Index rendah agar bisa ditutupi backdrop modal */}
          <header className="h-16 bg-white border-b border-slate-100 flex items-center justify-between px-6 lg:px-8 shrink-0 relative z-[40]">
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

            <div className="flex items-center gap-3 relative">
              <div className="hidden md:flex items-center bg-white border border-slate-200 rounded-lg px-3 py-1.5 w-56 focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-50 transition-all">
                <Search className={`w-3.5 h-3.5 ${isSearching ? "text-blue-600 animate-pulse" : "text-slate-400"}`} />
                <input 
                  type="text" 
                  placeholder="Quick search..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => searchQuery.length >= 2 && setShowResults(true)}
                  className="bg-transparent border-none focus:outline-none text-[11px] font-medium px-2 w-full" 
                />
              </div>
              
              {/* Search Results Dropdown */}
              <AnimatePresence>
                {showResults && (
                  <>
                    <motion.div 
                      initial={{ opacity: 0 }} 
                      animate={{ opacity: 1 }} 
                      exit={{ opacity: 0 }}
                      onClick={() => setShowResults(false)}
                      className="fixed inset-0 z-[100]" 
                    />
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute top-full mt-2 left-0 w-72 bg-white rounded-2xl border border-slate-100 shadow-2xl shadow-slate-200/50 overflow-hidden py-2 z-[110]"
                    >
                      {searchResults.length > 0 ? (
                        searchResults.map((result, idx) => (
                          <button
                            key={`${result.type}-${result.id}-${idx}`}
                            onClick={() => {
                              router.push(result.link);
                              setShowResults(false);
                              setSearchQuery("");
                            }}
                            className="w-full px-4 py-3 flex items-center gap-3 hover:bg-slate-50 transition-colors text-left group"
                          >
                            <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-blue-600 group-hover:text-white transition-all">
                              <Search className="w-3.5 h-3.5" />
                            </div>
                            <div>
                              <p className="text-[11px] font-black text-slate-900 line-clamp-1">{result.title}</p>
                              <p className="text-[9px] font-bold text-blue-600 uppercase tracking-widest">{result.type}</p>
                            </div>
                          </button>
                        ))
                      ) : (
                        <div className="px-4 py-8 text-center">
                          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Tidak ada hasil ditemukan</p>
                        </div>
                      )}
                    </motion.div>
                  </>
                )}
              </AnimatePresence>

              <div className="relative z-[50]">
                <button 
                  onClick={() => setShowNotifications(!showNotifications)}
                  className={`p-2 rounded-lg transition-all border ${showNotifications ? "bg-blue-50 border-blue-100 text-blue-600" : "text-slate-500 hover:bg-slate-50 border-slate-100"}`}
                >
                  <BellRing className="w-3.5 h-3.5" />
                  {notifications.unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-[8px] font-black rounded-full flex items-center justify-center border-2 border-white animate-bounce">
                      {notifications.unreadCount}
                    </span>
                  )}
                </button>

                <AnimatePresence>
                  {showNotifications && (
                    <>
                      <motion.div 
                        initial={{ opacity: 0 }} 
                        animate={{ opacity: 1 }} 
                        exit={{ opacity: 0 }}
                        onClick={() => setShowNotifications(false)}
                        className="fixed inset-0 z-[100]" 
                      />
                      <motion.div 
                        initial={{ opacity: 0, scale: 0.95, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 10 }}
                        className="absolute top-full mt-2 right-0 w-80 bg-white rounded-[24px] border border-slate-100 shadow-2xl shadow-slate-200/50 overflow-hidden z-[110]"
                      >
                        <div className="px-5 py-4 border-b border-slate-50 flex justify-between items-center bg-slate-50/30">
                          <p className="text-[10px] font-black text-slate-900 uppercase tracking-widest">Notifikasi</p>
                          <span className="px-2 py-0.5 rounded-full bg-blue-600 text-white text-[8px] font-black">
                            {notifications.unreadCount} BARU
                          </span>
                        </div>

                        <div className="max-h-80 overflow-y-auto custom-scrollbar">
                          {notifications.latestMessages.length > 0 ? (
                            notifications.latestMessages.map((msg) => (
                              <button
                                key={msg.id}
                                onClick={() => {
                                  router.push("/admin/messages");
                                  setShowNotifications(false);
                                }}
                                className="w-full px-5 py-4 border-b border-slate-50 last:border-0 hover:bg-slate-50 transition-colors text-left flex gap-3"
                              >
                                <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 shrink-0">
                                  <Command className="w-3 h-3" />
                                </div>
                                <div className="overflow-hidden">
                                  <p className="text-[11px] font-black text-slate-900 truncate">{msg.name}</p>
                                  <p className="text-[10px] text-slate-500 line-clamp-1 mt-0.5">{msg.message}</p>
                                  <p className="text-[8px] font-bold text-slate-400 uppercase mt-1">
                                    {new Date(msg.createdAt).toLocaleDateString('id-ID', { hour: '2-digit', minute: '2-digit' })}
                                  </p>
                                </div>
                              </button>
                            ))
                          ) : (
                            <div className="px-5 py-10 text-center">
                              <BellRing className="w-8 h-8 text-slate-100 mx-auto mb-3" />
                              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Semua pesan sudah dibaca</p>
                            </div>
                          )}
                        </div>

                        <Link 
                          href="/admin/messages" 
                          onClick={() => setShowNotifications(false)}
                          className="block w-full py-3 text-center text-[9px] font-black text-blue-600 hover:bg-blue-50 transition-colors uppercase tracking-[0.2em] bg-slate-50/50 border-t border-slate-50"
                        >
                          Lihat Semua Pesan
                        </Link>
                      </motion.div>
                    </>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </header>

          {/* Area Konten (Z-Index dihapus agar tidak mengunci modal) */}
          <div className="flex-grow overflow-y-auto overflow-x-hidden custom-scrollbar relative bg-[#FDFDFE]">
            <div className="p-6 lg:p-8 min-h-full flex flex-col">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={isNavigating ? "loading-" + targetPath : pathname}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2, ease: "easeInOut" }}
                  className="w-full max-w-7xl mx-auto flex-grow"
                >
                  {isNavigating ? (
                    <div className="w-full h-full min-h-[60vh]">
                      {getSkeleton(targetPath)}
                    </div>
                  ) : (
                    children
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </main>
              </div>
            </ToastProvider>
          </TransitionContext.Provider>
        );
      }