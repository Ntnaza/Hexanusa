import { MessageCircle, ArrowRight } from "lucide-react";

export default function CTA() {
  return (
    <section className="bg-slate-950 relative overflow-hidden text-center pt-24 pb-12">
      {/* Teks Misterius di Latar Belakang */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 select-none pointer-events-none opacity-[0.02]">
        <h2 className="text-[10rem] md:text-[16rem] font-black leading-none text-white whitespace-nowrap">
          HEXANUSA TECH
        </h2>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <h2 className="text-blue-600 font-bold uppercase tracking-[0.5em] text-[10px] mb-8">Let's Connect</h2>
        <h2 className="text-4xl md:text-6xl font-black text-white mb-10 leading-[1.1] max-w-3xl mx-auto tracking-tight relative">
           Siap untuk Mendigitalisasi <br />
           Bisnis Anda Sekarang?
        </h2>
        <p className="text-slate-400 text-lg md:text-xl font-medium mb-12 max-w-xl mx-auto leading-relaxed">
          Konsultasikan ide Anda secara gratis dan dapatkan solusi teknologi 
          terbaik dari tim ahli kami di Hexanusa.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <button className="group bg-blue-600 text-white px-10 py-5 rounded-2xl font-bold text-lg hover:bg-white hover:text-blue-600 transition-all shadow-xl shadow-blue-500/10 flex items-center gap-3">
            <MessageCircle className="w-6 h-6" />
            Hubungi via WhatsApp
          </button>
          <button className="group bg-transparent text-white border border-slate-800 px-10 py-5 rounded-2xl font-bold text-lg hover:bg-slate-800 transition-all flex items-center gap-3">
            Lihat Detail Harga
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform text-slate-500" />
          </button>
        </div>
      </div>
    </section>
  );
}