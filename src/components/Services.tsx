import { prisma } from "@/lib/prisma";
import * as LucideIcons from "lucide-react";
import { LucideProps } from "lucide-react";

export default async function Services() {
  // Ambil data langsung dari MySQL via Prisma
  const services = await prisma.service.findMany({
    orderBy: { order: "asc" }
  });

  return (
    <section id="services" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-xl mb-16">
          <h2 className="text-blue-600 font-bold uppercase tracking-widest text-xs mb-4">Layanan</h2>
          <h3 className="text-3xl md:text-4xl font-black text-slate-900 leading-tight">
            Solusi Digital yang <span className="text-blue-600">Tepat Sasaran.</span>
          </h3>
          <p className="mt-4 text-slate-500 font-medium leading-relaxed">
            Kami menghadirkan layanan teknologi profesional untuk membantu bisnis 
            Anda tumbuh lebih efisien di era digital.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => {
            // Logika ambil ikon berdasarkan nama di database
            const IconComponent = (LucideIcons as any)[service.iconName] || LucideIcons.HelpCircle;
            
            return (
              <div 
                key={service.id}
                className="group p-8 rounded-3xl bg-slate-50/50 border border-slate-100 hover:bg-white hover:shadow-2xl hover:shadow-blue-100/50 transition-all duration-300"
              >
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110 ${
                  service.color === "blue" ? "bg-blue-600 text-white shadow-lg shadow-blue-200" : "bg-indigo-600 text-white shadow-lg shadow-indigo-200"
                }`}>
                  <IconComponent className="w-7 h-7" />
                </div>
                <h4 className="text-lg font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors">
                  {service.title}
                </h4>
                <p className="text-slate-500 leading-relaxed text-sm font-medium">
                  {service.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
