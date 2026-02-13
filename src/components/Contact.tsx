import { Mail, Phone, MapPin, Send, CheckCircle2, Loader2 } from "lucide-react";
import { prisma } from "@/lib/prisma";
import ContactForm from "./ContactForm";

export default async function Contact() {
  const settings = await prisma.sitesettings.findUnique({ where: { id: 1 } });

  if (!settings) return null;

  return (
    <section id="contact" className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-16 mb-20">
          
          {/* Info Kontak */}
          <div className="flex-1">
            <h2 className="text-blue-600 font-bold uppercase tracking-widest text-xs mb-4">Kontak Kami</h2>
            <h3 className="text-3xl md:text-4xl font-black text-slate-900 leading-tight mb-6">
              Mari Mulai <span className="text-blue-600">Bekerja Sama.</span>
            </h3>
            <p className="text-slate-600 font-medium leading-relaxed mb-10 max-w-md">
              Punya ide besar atau pertanyaan tentang layanan kami? Tim kami siap membantu mewujudkan visi teknologi Anda.
            </p>

            <div className="space-y-8">
              <div className="flex items-center gap-6 group">
                <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-blue-600 shadow-sm border border-slate-100 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">Email</p>
                  <p className="text-slate-900 font-bold text-sm">{settings.contactEmail}</p>
                </div>
              </div>

              <div className="flex items-center gap-6 group">
                <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-blue-600 shadow-sm border border-slate-100 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">Telepon</p>
                  <p className="text-slate-900 font-bold text-sm">{settings.contactPhone}</p>
                </div>
              </div>

              <div className="flex items-center gap-6 group">
                <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-blue-600 shadow-sm border border-slate-100 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">Kantor</p>
                  <p className="text-slate-900 font-bold text-sm">{settings.contactAddress}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Form Kontak - Dipindah ke Client Component terpisah */}
          <ContactForm />
        </div>

        {/* Google Maps Section - Sekarang Dinamis */}
        <div className="w-full h-[400px] rounded-[40px] overflow-hidden border-4 border-white shadow-2xl">
          <iframe 
            src={settings.contactMaps} 
            width="100%" 
            height="100%" 
            style={{ border: 0 }} 
            allowFullScreen={true} 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </section>
  );
}
