"use client";

import { MessageSquare, PencilRuler, Code2, Rocket } from "lucide-react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";

export default function Process() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 40,
    damping: 20,
    restDelta: 0.0001
  });

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
    <section ref={containerRef} className="relative h-[400vh] bg-white">
      
      <div className="sticky top-0 h-screen w-full flex items-center overflow-hidden">
        
        {/* Background Decorative */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/3 left-0 w-[800px] h-[800px] bg-blue-50/20 rounded-full blur-[160px]" />
          <div className="absolute bottom-1/3 right-0 w-[800px] h-[800px] bg-indigo-50/20 rounded-full blur-[160px]" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
          
          <div className="text-center max-w-3xl mx-auto mb-24">
            <h2 className="text-blue-600 font-bold uppercase tracking-widest text-xs mb-4">Alur pegerjaan</h2>
            <h3 className="text-4xl md:text-5xl font-black text-slate-900 leading-tight tracking-tighter">
              Bagaimana Kami <span className="text-blue-600">Mewujudkannya.</span>
            </h3>
            <p className="mt-4 text-slate-500 font-medium leading-relaxed max-w-2xl mx-auto">
              Kami mengikuti alur kerja yang terstruktur dan transparan untuk memastikan setiap proyek 
              selesai dengan standar kualitas tertinggi.
            </p>
          </div>

          <div className="relative h-[400px]">
            {/* THE TRACK */}
            <svg 
              viewBox="0 0 1000 400" 
              fill="none" 
              className="absolute inset-0 w-full h-full overflow-visible pointer-events-none"
              preserveAspectRatio="none"
            >
              <defs>
                {/* Gradient untuk Jalur Garis - Efek Meteor yang disukai sebelumnya */}
                <linearGradient id="line-trail" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#3b82f6" stopOpacity="0" />
                  <stop offset="50%" stopColor="#2563eb" stopOpacity="0.5" />
                  <stop offset="100%" stopColor="#1d4ed8" stopOpacity="1" />
                </linearGradient>
              </defs>

              {/* Garis Pemandu Tipis (Background Path) */}
              <path
                d="M 0 200 C 200 0 300 400 500 200 S 800 0 1000 200"
                stroke="#f1f5f9"
                strokeWidth="2"
              />

              {/* The Animated Line */}
              <motion.path
                d="M 0 200 C 200 0 300 400 500 200 S 800 0 1000 200"
                stroke="url(#line-trail)"
                strokeWidth="3"
                strokeLinecap="round"
                style={{ pathLength }}
              />
            </svg>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12 relative z-10 pt-10">
              {steps.map((step, index) => {
                const start = 0.1 + (index * 0.2);
                
                return (
                  <motion.div 
                    key={index}
                    style={{ 
                      // Opacity: Redup (0.2) sebelum dilewati, menyala (1) setelah dilewati dan TETAP menyala
                      opacity: useTransform(smoothProgress, [start - 0.05, start], [0.2, 1]),
                      y: useTransform(smoothProgress, [start - 0.05, start], [20, 0])
                    }}
                    className="relative flex flex-col items-center text-center"
                  >
                    <div className="w-20 h-20 rounded-[28px] bg-white shadow-xl shadow-blue-900/5 border border-slate-100 flex items-center justify-center text-blue-600 mb-8 group transition-all duration-500 hover:shadow-blue-200">
                      <div className="w-14 h-14 rounded-[20px] bg-slate-50 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-all duration-500">
                        {step.icon}
                      </div>
                    </div>

                    <h4 className="text-lg font-black text-slate-900 mb-3 tracking-tight">{step.title}</h4>
                    <p className="text-xs text-slate-500 font-medium leading-relaxed px-4">
                      {step.desc}
                    </p>
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
