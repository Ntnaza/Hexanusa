import { prisma } from "@/lib/prisma";
import * as LucideIcons from "lucide-react";

export default async function About() {
  // 1. Ambil data dari database
  const settings = await prisma.siteSettings.findUnique({ where: { id: 1 } });
  const features = await prisma.aboutFeature.findMany({ orderBy: { order: "asc" } });

  if (!settings) return null;

  return (
    <section id="about" className="py-24 bg-slate-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          
          {/* Visual Kiri - Sekarang pakai foto dari database */}
          <div className="flex-1 relative animate-in fade-in slide-in-from-left-8 duration-700">
            <div className="relative z-10 rounded-[40px] overflow-hidden shadow-2xl border-8 border-white">
              <img 
                src={settings.aboutImage || "https://images.unsplash.com/photo-1522071820081-009f0129c71c"} 
                alt="Hexanusa Workspace" 
                className="w-full h-auto object-cover aspect-[4/3]"
              />
            </div>
            {/* Dekorasi Aksen */}
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-blue-600 rounded-3xl -z-0" />
            <div className="absolute -top-6 -left-6 w-32 h-32 border-4 border-blue-200 rounded-[40px] -z-0" />
          </div>

          {/* Konten Kanan - Sekarang dinamis */}
          <div className="flex-1 animate-in fade-in slide-in-from-right-8 duration-700">
            <h2 className="text-blue-600 font-bold uppercase tracking-widest text-xs mb-4">Tentang Kami</h2>
            <h3 className="text-3xl md:text-4xl font-black text-slate-900 leading-tight mb-6">
              {settings.aboutTitle}
            </h3>
            <p className="text-slate-600 font-medium leading-relaxed mb-10 whitespace-pre-line">
              {settings.aboutDesc}
            </p>

            {/* 4 Fitur Keunggulan Dinamis */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {features.map((feature) => {
                const IconComponent = (LucideIcons as any)[feature.icon] || LucideIcons.HelpCircle;
                return (
                  <div key={feature.id} className="flex gap-4 group">
                    <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-blue-100 flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300 shadow-sm">
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="text-sm font-black text-slate-900 group-hover:text-blue-600 transition-colors uppercase tracking-tight">{feature.title}</h4>
                      <p className="text-xs text-slate-500 font-bold leading-relaxed mt-1">{feature.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}