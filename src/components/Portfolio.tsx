import { prisma } from "@/lib/prisma";
import { ExternalLink, Plus } from "lucide-react";
import Link from "next/link";

export default async function Portfolio() {
  const projects = await prisma.portfolio.findMany({
    orderBy: { order: "asc" }
  });

  return (
    <section id="portfolio" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="max-w-xl mb-16 animate-in fade-in slide-in-from-bottom-8 duration-700">
          <h2 className="text-blue-600 font-bold uppercase tracking-widest text-xs mb-4">Portofolio</h2>
          <h3 className="text-3xl md:text-4xl font-black text-slate-900 leading-tight">
            Karya Terbaik Kami Untuk <span className="text-blue-600">Anda.</span>
          </h3>
          <p className="mt-4 text-slate-500 font-medium leading-relaxed">
            Intip beberapa proyek terpilih yang telah kami kerjakan dengan dedikasi 
            dan standar kualitas yang tinggi.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div 
              key={project.id} 
              style={{ 
                animationDelay: `${index * 150}ms`,
                WebkitMaskImage: "-webkit-radial-gradient(white, black)"
              }}
              className="group relative overflow-hidden rounded-[32px] aspect-[4/3] cursor-pointer shadow-xl shadow-slate-100 animate-in fade-in zoom-in-95 duration-700 fill-mode-both isolate z-0 transform-gpu"
            >
              <img 
                src={project.image} 
                alt={project.title} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8">
                <p className="text-blue-400 text-xs font-bold uppercase tracking-widest mb-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  {project.category}
                </p>
                <h4 className="text-white text-2xl font-bold mb-6 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-75">
                  {project.title}
                </h4>
                
                <div className="flex gap-3 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-150">
                  {project.link && (
                    <a href={project.link} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-blue-600 hover:border-blue-600 transition-all">
                      <ExternalLink className="w-5 h-5" />
                    </a>
                  )}
                  <Link href={`/portfolio/${project.id}`} className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-blue-600 hover:border-blue-600 transition-all">
                    <Plus className="w-5 h-5" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <button className="inline-flex items-center gap-2 text-slate-900 font-bold hover:text-blue-600 transition-colors group">
            Lihat Semua Project 
            <span className="w-8 h-[2px] bg-slate-900 group-hover:bg-blue-600 transition-all"></span>
          </button>
        </div>

      </div>
    </section>
  );
}