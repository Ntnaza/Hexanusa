"use client";

import { MessageSquare, PencilRuler, Code2, Rocket } from "lucide-react";
import { motion, useScroll, useTransform, useSpring, useMotionValueEvent } from "framer-motion";
import { useRef, useState, useEffect } from "react";

export default function Process() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isNavigating, setIsNavigating] = useState(false);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Pantau status navigasi global
  useEffect(() => {
    const checkNav = setInterval(() => {
      if (typeof window !== "undefined") {
        setIsNavigating(!!window.isNavigating);
      }
    }, 100);
    return () => clearInterval(checkNav);
  }, []);

  const springConfig = {
    stiffness: 40,
    damping: 20,
    restDelta: 0.0001
  };

  const springProgress = useSpring(scrollYProgress, springConfig);
  
  // Gunakan scrollYProgress langsung jika sedang navigasi agar tidak tertinggal oleh spring
  const smoothProgress = isNavigating ? scrollYProgress : springProgress;

  const p = useTransform(smoothProgress, [0.1, 0.9], [0, 1]);
  const pathLength = useTransform(p, [0, 1], [0, 1]);

  const steps = [
    {
      title: "Konsultasi",
      desc: "Diskusi mendalam untuk memahami visi dan kebutuhan bisnis Anda.",
      icon: <MessageSquare className="w-6 h-6" />,
    },
    {
      title: "Perancangan",
      desc: "Pembuatan konsep desain UI/UX dan arsitektur sistem yang optimal.",
      icon: <PencilRuler className="w-6 h-6" />,
    },
    {
      title: "Pengembangan",
      desc: "Proses coding menggunakan teknologi terbaru dengan standar tinggi.",
      icon: <Code2 className="w-6 h-6" />,
    },
    {
      title: "Peluncuran",
      desc: "Testing menyeluruh dan deploy produk hingga siap digunakan.",
      icon: <Rocket className="w-6 h-6" />,
    }
  ];

  return (
    <section ref={containerRef} className="relative h-[300vh] md:h-[400vh] bg-white">
      
      <div className={`${isNavigating ? "relative" : "sticky top-0"} h-screen w-full flex items-center overflow-hidden transition-all duration-300`}>
        
        {/* Background Decorative */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/3 left-0 w-[400px] md:w-[800px] h-[400px] md:h-[800px] bg-blue-50/20 rounded-full blur-[100px] md:blur-[160px]" />
          <div className="absolute bottom-1/3 right-0 w-[400px] md:w-[800px] h-[400px] md:h-[800px] bg-indigo-50/20 rounded-full blur-[100px] md:blur-[160px]" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
          
          <div className="text-center max-w-3xl mx-auto mb-12 md:mb-24">
            <h2 className="text-blue-600 font-bold uppercase tracking-widest text-[10px] md:text-xs mb-4">Alur pengerjaan</h2>
            <h3 className="text-3xl md:text-5xl font-black text-slate-900 leading-tight tracking-tighter">
              Bagaimana Kami <span className="text-blue-600">Mewujudkannya.</span>
            </h3>
            <p className="mt-4 text-slate-500 font-medium leading-relaxed max-w-2xl mx-auto text-sm md:text-base">
              Kami mengikuti alur kerja yang terstruktur dan transparan untuk memastikan setiap proyek 
              selesai dengan standar kualitas tertinggi.
            </p>
          </div>

          <div className="relative h-[450px] md:h-[400px] flex items-center justify-center">
            {/* DESKTOP TRACK (Horizontal) */}
            <svg 
              viewBox="0 0 1000 400" 
              fill="none" 
              className="hidden md:block absolute inset-0 w-full h-full overflow-visible pointer-events-none"
              preserveAspectRatio="none"
            >
              <defs>
                <linearGradient id="line-trail" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#3b82f6" stopOpacity="0" />
                  <stop offset="50%" stopColor="#2563eb" stopOpacity="0.5" />
                  <stop offset="100%" stopColor="#1d4ed8" stopOpacity="1" />
                </linearGradient>
              </defs>
              <path d="M 0 200 C 200 0 300 400 500 200 S 800 0 1000 200" stroke="#f1f5f9" strokeWidth="2" />
              <motion.path
                d="M 0 200 C 200 0 300 400 500 200 S 800 0 1000 200"
                stroke="url(#line-trail)"
                strokeWidth="3"
                strokeLinecap="round"
                style={{ pathLength }}
              />
            </svg>

            {/* MOBILE TRACK (Vertical - Elegant Snake Wave) */}
            <svg 
              viewBox="0 0 100 1000" 
              fill="none" 
              className="md:hidden absolute left-0 top-0 w-full h-full overflow-visible pointer-events-none"
              preserveAspectRatio="none"
            >
              <defs>
                <filter id="glow-mobile" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
                <linearGradient id="line-gradient-mobile" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#3b82f6" stopOpacity="0" />
                  <stop offset="50%" stopColor="#2563eb" stopOpacity="1" />
                  <stop offset="100%" stopColor="#1d4ed8" stopOpacity="0" />
                </linearGradient>
              </defs>
              
              {/* Jalur Pemandu (Background) */}
              <path 
                d="M 32 0 C 60 125 10 125 32 250 S 60 375 32 500 S 10 625 32 750 S 60 875 32 1000" 
                stroke="#f1f5f9" 
                strokeWidth="2" 
                strokeLinecap="round"
              />
              
              {/* Jalur Utama (Animated) */}
              <motion.path
                d="M 32 0 C 60 125 10 125 32 250 S 60 375 32 500 S 10 625 32 750 S 60 875 32 1000" 
                stroke="url(#line-gradient-mobile)"
                strokeWidth="4"
                strokeLinecap="round"
                style={{ pathLength, filter: 'url(#glow-mobile)' }}
              />
            </svg>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-12 relative z-10 w-full">
              {steps.map((step, index) => {
                const start = 0.1 + (index * 0.2);
                
                return (
                  <motion.div 
                    key={index}
                    style={{ 
                      opacity: useTransform(smoothProgress, [start - 0.05, start], [0.2, 1]),
                      y: useTransform(smoothProgress, [start - 0.05, start], [20, 0]),
                      scale: useTransform(smoothProgress, [start - 0.05, start], [0.95, 1])
                    }}
                    className="relative flex flex-row md:flex-col items-center md:text-center gap-6 md:gap-0"
                  >
                    <div className="w-16 h-16 md:w-20 md:h-20 flex-shrink-0 rounded-2xl md:rounded-[28px] bg-white shadow-xl shadow-blue-900/5 border border-slate-100 flex items-center justify-center text-blue-600 md:mb-8 group transition-all duration-500 hover:shadow-blue-200 relative z-20">
                      <div className="w-10 h-10 md:w-14 md:h-14 rounded-xl md:rounded-[20px] bg-slate-50 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-all duration-500">
                        {step.icon}
                      </div>
                    </div>

                    <div className="flex flex-col md:items-center">
                      <h4 className="text-base md:text-lg font-black text-slate-900 mb-1 md:mb-3 tracking-tight">{step.title}</h4>
                      <p className="text-[10px] md:text-xs text-slate-500 font-medium leading-relaxed md:px-4">
                        {step.desc}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
