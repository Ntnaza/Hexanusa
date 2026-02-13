"use client";

import { useState, useEffect } from "react";
import { Lock, User, ArrowRight, Loader2, ShieldCheck, Cpu, Globe, Code2, Orbit } from "lucide-react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { loginAction } from "@/app/actions/auth";

export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [logo, setLogo] = useState<string | null>(null);
  const router = useRouter();

  const floatingIcons = [Cpu, Globe, Code2, Orbit, ShieldCheck, Lock];

  useEffect(() => {
    async function getLogo() {
      try {
        const res = await fetch('/api/settings', { cache: 'no-store' });
        const data = await res.json();
        if (data && data.siteLogo) {
          setLogo(data.siteLogo);
        }
      } catch (error) {
        console.error("Gagal mengambil logo:", error);
      }
    }
    getLogo();
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    const formData = new FormData();
    formData.append("username", username);
    formData.append("password", password);

    const result = await loginAction(formData);

    if (result.success) {
      router.push("/admin");
    } else {
      setError(result.message || "Kredensial tidak valid.");
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 flex items-center justify-center p-4 relative overflow-hidden font-sans">
      
      {/* Background Decor - Glow yang lebih nyata */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.05),transparent_50%)]" />
        <div className="absolute top-[-10%] left-[-10%] w-[70%] h-[70%] bg-blue-100/30 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[70%] h-[70%] bg-indigo-100/30 rounded-full blur-[120px]" />
      </div>

      {/* Floating Icons - Jauh lebih terlihat */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        {[...Array(15)].map((_, i) => {
          const Icon = floatingIcons[i % floatingIcons.length];
          const startX = (i * 31) % 100;
          const startY = (i * 47) % 100;
          
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: `${startX}vw`, y: `${startY}vh` }}
              animate={{ 
                opacity: [0, 0.4, 0], 
                y: [`${startY}vh`, `${startY - 15}vh`, `${startY}vh`],
                rotate: [0, 360]
              }}
              transition={{ duration: 15 + i, repeat: Infinity, ease: "easeInOut", delay: i * 0.1 }}
              className="absolute text-blue-400/40"
              style={{ left: 0, top: 0 }}
            >
              <Icon size={30 + (i % 3) * 15} strokeWidth={1.5} />
            </motion.div>
          );
        })}
      </div>

      <div className="max-w-md w-full relative z-10">
        {/* Brand Header - Logo Otomatis dari Database */}
        <div className="text-center mb-12">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-center mb-8 h-16 items-center"
          >
            {logo ? (
              <img 
                src={logo} 
                alt="Hexanusa" 
                className="h-14 md:h-16 w-auto object-contain drop-shadow-md" 
                onError={() => setLogo(null)} // Jika gambar gagal load, pakai fallback teks
              />
            ) : (
              <div className="flex items-center gap-3">
                <div className="bg-blue-600 p-3 rounded-2xl text-white shadow-xl shadow-blue-200">
                  <Cpu className="w-8 h-8" />
                </div>
                <span className="text-3xl font-black text-slate-900 tracking-tighter uppercase">HEXANUSA</span>
              </div>
            )}
          </motion.div>
          <div className="flex items-center justify-center gap-3">
             <div className="h-[1px] w-8 bg-slate-200" />
             <p className="text-[11px] font-black text-slate-400 uppercase tracking-[0.4em]">Secure Portal</p>
             <div className="h-[1px] w-8 bg-slate-200" />
          </div>
        </div>

        {/* Login Card - Solid, Tajam, Profesional */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-10 rounded-[40px] border border-slate-100 shadow-[0_30px_70px_rgba(0,0,0,0.06)]"
        >
          <form onSubmit={handleLogin} className="space-y-7">
            <AnimatePresence>
              {error && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="bg-red-50 text-red-600 text-xs p-4 rounded-2xl border border-red-100 font-bold flex items-center gap-3 mb-2"
                >
                  <div className="w-2 h-2 rounded-full bg-red-600 animate-ping shrink-0" />
                  {error}
                </motion.div>
              )}
            </AnimatePresence>
            
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Access Identity</label>
              <div className="relative">
                <User className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input 
                  type="text" 
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Username"
                  className="w-full pl-14 pr-7 py-5 rounded-2xl bg-slate-50 border border-slate-100 focus:outline-none focus:border-blue-600 focus:bg-white transition-all text-sm font-bold text-slate-900 placeholder:text-slate-300 shadow-sm h-16"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Security Key</label>
              <div className="relative">
                <Lock className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-14 pr-7 py-5 rounded-2xl bg-slate-50 border border-slate-100 focus:outline-none focus:border-blue-600 focus:bg-white transition-all text-sm font-bold text-slate-900 placeholder:text-slate-300 shadow-sm h-16"
                  required
                />
              </div>
            </div>

            <button 
              type="submit"
              disabled={isLoading}
              className="w-full bg-slate-900 text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] hover:bg-blue-600 transition-all shadow-2xl shadow-blue-100 flex items-center justify-center gap-3 group disabled:opacity-70 h-16 active:scale-[0.98]"
            >
              {isLoading ? (
                <Loader2 className="w-6 h-6 animate-spin" />
              ) : (
                <>
                  INITIALIZE SESSION
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>
        </motion.div>

        {/* Footer Info */}
        <div className="mt-12 text-center space-y-4">
          <div className="flex items-center justify-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">End-to-End Encryption Active</span>
          </div>
          <p className="text-[9px] text-slate-300 font-bold tracking-[0.3em]">HEXANUSA TECH &bull; CORE SYSTEM 2026</p>
        </div>
      </div>
    </main>
  );
}
