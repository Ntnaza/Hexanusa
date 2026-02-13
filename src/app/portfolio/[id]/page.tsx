import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ExternalLink, Calendar, Tag, Layout } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function PortfolioDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id: idStr } = await params;
  const id = parseInt(idStr);
  
  if (isNaN(id)) return notFound();

  const project = await prisma.portfolio.findUnique({
    where: { id }
  });

  if (!project) return notFound();

  return (
    <main className="min-h-screen bg-slate-50">
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden bg-white">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-blue-50/50 -skew-x-12 translate-x-1/2" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <Link 
            href="/#portfolio" 
            className="inline-flex items-center gap-2 text-slate-500 hover:text-blue-600 font-bold text-xs uppercase tracking-widest transition-colors mb-8 group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            Kembali ke Portofolio
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-600 mb-6">
                <Tag className="w-3.5 h-3.5" />
                <span className="text-[10px] font-black uppercase tracking-widest">{project.category}</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 leading-tight mb-8">
                {project.title}
              </h1>

              <div className="flex flex-wrap gap-8 mb-10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400">
                    <Layout className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none mb-1">Tipe Proyek</p>
                    <p className="text-sm font-bold text-slate-900">Digital Solutions</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400">
                    <Calendar className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none mb-1">Selesai Pada</p>
                    <p className="text-sm font-bold text-slate-900">2024</p>
                  </div>
                </div>
              </div>

              {project.link && (
                <a 
                  href={project.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 px-8 py-4 bg-slate-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-blue-600 transition-all shadow-xl shadow-slate-200"
                >
                  Kunjungi Website <ExternalLink className="w-4 h-4" />
                </a>
              )}
            </div>

            <div className="relative group">
              <div className="absolute inset-0 bg-blue-600 rounded-[40px] rotate-3 scale-[1.02] opacity-10 group-hover:rotate-0 transition-transform duration-700" />
              <div className="relative aspect-[4/3] rounded-[40px] overflow-hidden shadow-2xl">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-[40px] p-8 md:p-16 shadow-xl shadow-slate-100 border border-slate-50">
            <h2 className="text-2xl font-black text-slate-900 mb-8 flex items-center gap-4">
              <span className="w-12 h-1 bg-blue-600 rounded-full" />
              Tentang Proyek Ini
            </h2>
            
            <div className="prose prose-slate max-w-none">
              {project.description ? (
                project.description.split('\n').map((paragraph, index) => (
                  <p key={index} className="text-slate-600 text-lg leading-relaxed mb-6 font-medium">
                    {paragraph}
                  </p>
                ))
              ) : (
                <p className="text-slate-400 italic">Belum ada deskripsi untuk proyek ini.</p>
              )}
            </div>

            {/* Placeholder for more details like features etc */}
            <div className="mt-16 pt-16 border-t border-slate-50">
              <h3 className="text-xl font-black text-slate-900 mb-8">Mengapa Proyek Ini Penting?</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="p-6 rounded-3xl bg-slate-50 border border-slate-100">
                  <h4 className="font-bold text-slate-900 mb-2">Inovasi Teknologi</h4>
                  <p className="text-sm text-slate-500 font-medium">Menggunakan stack teknologi modern untuk memastikan kecepatan dan keamanan optimal.</p>
                </div>
                <div className="p-6 rounded-3xl bg-slate-50 border border-slate-100">
                  <h4 className="font-bold text-slate-900 mb-2">Efisiensi Bisnis</h4>
                  <p className="text-sm text-slate-500 font-medium">Dirancang khusus untuk mengotomatisasi proses dan meningkatkan produktivitas tim.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}