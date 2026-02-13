"use client";

import { useState, useEffect } from "react";
import { ChevronDown, Code2, Database, Globe2, Smartphone, Cpu, Cloud, Terminal, ShieldCheck } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Hero({ initialSlides }: { initialSlides: any[] }) {
  const [slides, setSlides] = useState<any[]>(initialSlides);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    // Logika berputar otomatis setiap 6 detik
    if (slides.length > 1) {
      const timer = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % slides.length);
      }, 6000);
      return () => clearInterval(timer);
    }
  }, [slides]);

  if (!slides || slides.length === 0) return null;

  return (
    <section id="home" className="relative pt-40 pb-20 overflow-hidden flex flex-col items-center justify-center min-h-screen">
      {/* Background Decor */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10">
        <div className="absolute top-[10%] left-[15%] w-[30%] h-[30%] bg-blue-200/20 rounded-full blur-[100px]" />
        <div className="absolute bottom-[10%] right-[15%] w-[30%] h-[30%] bg-indigo-200/20 rounded-full blur-[100px]" />
      </div>

      {/* Ikon Melayang Acak */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
        <Code2 className="absolute left-[8%] top-[20%] w-16 h-16 text-blue-400 opacity-20 blur-[1px] animate-float-random" />
        <Database className="absolute left-[15%] top-[55%] w-12 h-12 text-indigo-400 opacity-25 blur-[2px] animate-float-random-slow" />
        <Terminal className="absolute left-[5%] bottom-[30%] w-14 h-14 text-slate-400 opacity-20 blur-[1px] animate-float-random-fast" />
        <Globe2 className="absolute right-[10%] top-[15%] w-20 h-20 text-blue-500 opacity-15 blur-[2px] animate-float-random-slow" />
        <Smartphone className="absolute right-[18%] top-[50%] w-10 h-10 text-indigo-500 opacity-25 blur-[1px] animate-float-random" />
        <Cpu className="absolute right-[7%] bottom-[35%] w-16 h-16 text-blue-600 opacity-20 blur-[2px] animate-float-random-fast" />
        <Cloud className="absolute right-[25%] bottom-[20%] w-12 h-12 text-slate-400 opacity-20 blur-[1px] animate-float-random" />
        <ShieldCheck className="absolute left-[25%] top-[15%] w-10 h-10 text-blue-400 opacity-15 blur-[1px] animate-float-random-slow" />
      </div>

      <div className="max-w-5xl mx-auto px-4 text-center z-10 flex-grow flex flex-col justify-center">
        {/* Animated Text Container */}
        <div className="min-h-[300px] flex flex-col justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <h1 className="text-4xl md:text-7xl font-black text-slate-900 tracking-tight leading-[1.1] mb-8">
                {slides[currentIndex].title.split(" ").map((word: string, i: number) => (
                  word.toLowerCase() === "digital" || word.toLowerCase() === "teknologi" ? 
                  <span key={i} className="text-blue-600"> {word} </span> : ` ${word} `
                ))}
              </h1>
              
              <p className="text-lg md:text-2xl text-slate-500 mb-16 leading-relaxed font-medium max-w-3xl mx-auto">
                {slides[currentIndex].desc}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Logos Section */}
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12 opacity-80 hover:opacity-100 transition-opacity duration-300">
          <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" alt="Next.js" className="h-8 w-auto hover:scale-110 transition-transform" />
          <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/laravel/laravel-original.svg" alt="Laravel" className="h-8 w-auto hover:scale-110 transition-transform" />
          <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" alt="React" className="h-8 w-auto hover:scale-110 transition-transform" />
          <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" alt="TypeScript" className="h-7 w-auto hover:scale-110 transition-transform" />
          <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg" alt="Tailwind CSS" className="h-7 w-auto hover:scale-110 transition-transform" />
          <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" alt="Node.js" className="h-8 w-auto hover:scale-110 transition-transform" />
        </div>
      </div>

      <div className="pb-10 animate-bounce flex flex-col items-center gap-2 text-slate-400">
        <span className="text-[10px] font-bold uppercase tracking-[0.3em]">Scroll Down</span>
        <ChevronDown className="w-5 h-5" />
      </div>
    </section>
  );
}