"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { MoveLeft, HelpCircle, ShieldAlert, Cpu, Orbit, Globe, Code2 } from "lucide-react";

export default function NotFound() {
  const floatingIcons = [Cpu, Orbit, Globe, Code2, HelpCircle, ShieldAlert];

  return (
    <div className="fixed inset-0 z-[10000] bg-white flex items-center justify-center p-6 overflow-hidden">
      {/* Background Decor - Glow yang lebih dramatis */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-[10%] left-[10%] w-[50%] h-[50%] bg-blue-100/40 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[10%] right-[10%] w-[50%] h-[50%] bg-indigo-100/40 rounded-full blur-[120px] animate-pulse" />
      </div>

      {/* Banyak Elemen Melayang (Animated Particles/Icons) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        {[...Array(15)].map((_, i) => {
          const Icon = floatingIcons[i % floatingIcons.length];
          // Gunakan angka prima yang jauh berbeda untuk memecah pola garis
          const startX = (i * 37) % 100; 
          const startY = (i * 61) % 100;
          const colors = ["text-blue-500/60", "text-indigo-500/60", "text-blue-400/60"];
          
          return (
            <motion.div
              key={i}
              initial={{ 
                opacity: 0,
                x: `${startX}vw`,
                y: `${startY}vh`
              }}
              animate={{ 
                opacity: [0, 1, 0],
                y: [`${startY}vh`, `${startY + (i % 2 === 0 ? 10 : -10)}vh`, `${startY}vh`],
                x: [`${startX}vw`, `${startX + (i % 3 === 0 ? 8 : -8)}vw`, `${startX}vw`],
                rotate: [0, 360]
              }}
              transition={{ 
                duration: 15 + (i * 2), 
                repeat: Infinity, 
                ease: "easeInOut",
                delay: i * 0.3
              }}
              className={`absolute ${colors[i % colors.length]}`}
              style={{ left: 0, top: 0 }}
            >
              <Icon size={28 + (i % 3) * 18} strokeWidth={1.5} />
            </motion.div>
          );
        })}
      </div>

      <div className="max-w-md w-full text-center relative z-10">
        
        {/* Text 404 - Dibuat lebih ke bawah dan elegan */}
        <div className="relative mb-2">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 0.08, y: 0 }}
            transition={{ duration: 1 }}
            className="text-[10rem] md:text-[14rem] font-black text-slate-900 tracking-tighter select-none leading-none"
          >
            404
          </motion.h1>
          
          {/* Main Visual */}
          <div className="absolute inset-0 flex items-center justify-center pt-12">
            <motion.div 
              animate={{ y: [0, -10, 0], rotate: [0, 5, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="w-24 h-24 md:w-28 md:h-28 bg-white rounded-[35px] shadow-2xl shadow-blue-100 flex items-center justify-center border border-slate-50 relative"
            >
              <div className="absolute inset-0 border-2 border-dashed border-blue-100 rounded-[35px] animate-[spin_15s_linear_infinite]" />
              <ShieldAlert className="w-10 h-10 md:w-12 md:h-12 text-blue-600" />
            </motion.div>
          </div>
        </div>

        {/* Content Section */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="space-y-4 mb-10"
        >
          <h2 className="text-3xl md:text-4xl font-black text-slate-900 leading-tight">
            Oops! Halaman <br /> 
            <span className="text-blue-600">Tidak Ditemukan.</span>
          </h2>
          <p className="text-slate-500 font-medium leading-relaxed max-w-sm mx-auto text-xs md:text-sm">
            Sepertinya Anda telah melangkah terlalu jauh ke area yang belum kami petakan. 
            Mari kembali ke pusat koordinat.
          </p>
        </motion.div>

        {/* Action Button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <Link 
            href="/"
            className="inline-flex items-center gap-3 bg-slate-900 text-white px-10 py-5 rounded-2xl font-bold text-sm hover:bg-blue-600 hover:shadow-2xl hover:shadow-blue-200 transition-all active:scale-95 group"
          >
            <MoveLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            KEMBALI KE BERANDA
          </Link>
        </motion.div>

        {/* Footer Brand */}
        <div className="mt-16 pt-8 border-t border-slate-100">
          <div className="flex items-center justify-center gap-2 mb-1">
            <img src="/logo/hexa.png" alt="Hexanusa" className="h-4 w-auto grayscale opacity-40" />
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.4em]">
              Hexanusa Technology
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
