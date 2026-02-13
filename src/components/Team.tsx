import { prisma } from "@/lib/prisma";
import { Linkedin, Github, Instagram } from "lucide-react";

export default async function Team() {
  const members = await prisma.teammember.findMany({
    orderBy: { order: "asc" }
  });

  return (
    <section id="team" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6 animate-in fade-in slide-in-from-bottom-8 duration-700">
          <div className="max-w-xl">
            <h2 className="text-blue-600 font-bold uppercase tracking-widest text-xs mb-4">Tim Kami</h2>
            <h3 className="text-3xl md:text-4xl font-black text-slate-900 leading-tight">
              Dibalik Setiap Solusi Hebat, Ada <span className="text-blue-600">Tim Hebat.</span>
            </h3>
          </div>
          <p className="text-slate-500 font-medium max-w-xs text-sm">
            Kombinasi antara kreativitas, logika, dan pengalaman bertahun-tahun.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {members.map((member, index) => (
            <div 
              key={member.id} 
              style={{ animationDelay: `${index * 200}ms` }}
              className="group animate-in fade-in slide-in-from-bottom-8 duration-700 fill-mode-both"
            >
              <div className="relative overflow-hidden rounded-[40px] aspect-square mb-6 border-4 border-slate-50 shadow-sm">
                <img 
                  src={member.image} 
                  alt={member.name} 
                  className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-600/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-8">
                  <div className="flex gap-4">
                    {member.linkedin && (
                      <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-white hover:text-blue-600 transition-all">
                        <Linkedin className="w-5 h-5" />
                      </a>
                    )}
                    {member.github && (
                      <a href={member.github} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-white hover:text-blue-600 transition-all">
                        <Github className="w-5 h-5" />
                      </a>
                    )}
                    {member.instagram && (
                      <a href={member.instagram} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-white hover:text-blue-600 transition-all">
                        <Instagram className="w-5 h-5" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
              <h4 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors">{member.name}</h4>
              <p className="text-xs text-slate-400 font-black uppercase tracking-widest mt-1 mb-3">{member.role}</p>
              <p className="text-sm text-slate-500 font-medium leading-relaxed">{member.bio}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
