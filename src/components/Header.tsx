"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";

// Tambahkan definisi tipe untuk window.lenis
declare global {
  interface Window {
    lenis: any;
    isNavigating: boolean;
  }
}

export default function Header({ initialSettings, initialServices }: { initialSettings: any, initialServices: any[] }) {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);
  
  // Jangan tampilkan di halaman admin
  if (pathname?.startsWith("/admin")) return null;
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isManualNavigating, setIsManualNavigating] = useState(false);
  const lastScrollY = useRef(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (isManualNavigating || isMobileMenuOpen) return;

      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
        setIsCollapsed(true);
      } else if (currentScrollY < lastScrollY.current) {
        setIsCollapsed(false);
      }
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY, isManualNavigating, isMobileMenuOpen]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    setIsMobileMenuOpen(false);
    setIsManualNavigating(true);
    window.isNavigating = true;
    setIsCollapsed(false);

    // Cek jika link adalah anchor di halaman yang sama
    if (href.startsWith("/#") && pathname === "/") {
      const targetId = href.split("#")[1];
      if (window.lenis) {
        e.preventDefault();
        window.lenis.scrollTo(`#${targetId}`, {
          duration: 2, // Sedikit lebih lambat agar lebih elegan
          easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          onComplete: () => {
            setTimeout(() => {
              window.isNavigating = false;
            }, 100);
          }
        });
        // Update URL secara manual tanpa trigger scroll browser
        window.history.pushState(null, "", href);
      }
    }

    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setIsManualNavigating(false);
      window.isNavigating = false;
      lastScrollY.current = window.scrollY;
    }, 2200); // Harus lebih lama dari durasi scrollTo
  };

  const navigation = [
    { name: "Beranda", href: "/#home" },
    { name: "Layanan", href: "/#services" },
    { name: "Tentang", href: "/#about" },
    { name: "Portofolio", href: "/#portfolio" },
    { name: "Tim", href: "/#team" },
    { name: "Kontak", href: "/#contact" },
  ];

  return (
    <>
      <div className="fixed w-full z-50 flex justify-center pt-6 px-4 pointer-events-none">
        <motion.header
          layout
          transition={{
            duration: 0.6,
            ease: [0.16, 1, 0.3, 1],
          }}
          style={{
            width: isCollapsed ? "240px" : "100%",
            maxWidth: isCollapsed ? "240px" : "880px",
            borderRadius: "32px",
          }}
          className="bg-white border border-slate-200 shadow-2xl overflow-hidden pointer-events-auto h-16 flex items-center"
        >
          <div className="relative w-full h-full flex items-center px-4">
            
            {/* Spacer Kiri (Sliding Logo) */}
            <motion.div 
              layout
              className={`transition-all duration-500 ${isCollapsed ? "flex-1" : "w-0"}`} 
            />

            {/* Logo */}
            <motion.div layout className="flex-shrink-0 flex items-center justify-center">
              <Link href="/" onClick={(e) => { 
                if (pathname === "/" && window.lenis) {
                  e.preventDefault();
                  window.lenis.scrollTo(0);
                }
                setIsCollapsed(false); 
              }}>
                <img 
                  src={initialSettings?.siteLogo || "/logo/hexa.png"} 
                  alt={initialSettings?.companyName || "Hexanusa"} 
                  className="h-7 md:h-8 w-auto object-contain" 
                />
              </Link>
            </motion.div>

            {/* Spacer Tengah */}
            {!isCollapsed && <motion.div layout className="flex-1" />}

            {/* Desktop Navigasi */}
            <AnimatePresence mode="popLayout">
              {!isCollapsed && (
                <motion.div
                  key="nav-content"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.4 }}
                  className="hidden md:flex items-center gap-8 pr-2"
                >
                  <nav className="flex items-center gap-8">
                    {navigation.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        onClick={(e) => handleNavClick(e, item.href)}
                        className="text-[14px] font-bold text-slate-600 hover:text-blue-600 transition-colors whitespace-nowrap"
                      >
                        {item.name}
                      </Link>
                    ))}
                  </nav>
                  <div className="h-4 w-[1px] bg-slate-200" />
                  <Link 
                    href="/#cta" 
                    onClick={(e) => handleNavClick(e, "/#cta")}
                    className="bg-slate-900 text-white px-7 py-3 rounded-2xl text-[12px] font-black hover:bg-blue-600 transition-all shadow-sm active:scale-95"
                  >
                    Hire Us
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Hamburger Button (Hanya muncul di Mobile & saat tidak Collapse) */}
            {!isCollapsed && (
              <button 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 text-slate-600 hover:text-blue-600 transition-colors"
              >
                {isMobileMenuOpen ? <X /> : <Menu />}
              </button>
            )}

            {/* Spacer Kanan */}
            <motion.div 
              layout
              className={`transition-all duration-500 ${isCollapsed ? "flex-1" : "w-0"}`} 
            />

          </div>
        </motion.header>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 md:hidden bg-white pt-28 px-6"
          >
            <nav className="flex flex-col gap-6">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className="text-2xl font-black text-slate-900 hover:text-blue-600 transition-colors"
                >
                  {item.name}
                </Link>
              ))}
              <div className="h-[1px] bg-slate-100 w-full my-4" />
              <Link 
                href="/#cta" 
                onClick={(e) => handleNavClick(e, "/#cta")}
                className="bg-blue-600 text-white w-full py-5 rounded-3xl font-black text-lg shadow-xl shadow-blue-100 flex items-center justify-center"
              >
                Hubungi Kami Sekarang
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
