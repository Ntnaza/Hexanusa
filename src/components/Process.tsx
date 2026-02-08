import { MessageSquare, PencilRuler, Code2, Rocket } from "lucide-react";

export default function Process() {
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
    <section className="py-24 bg-white border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-blue-600 font-bold uppercase tracking-widest text-xs mb-4">Proses Kerja</h2>
          <h3 className="text-3xl font-black text-slate-900">Bagaimana Kami Bekerja</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
          {/* Garis Penghubung (Hanya Desktop) */}
          <div className="hidden md:block absolute top-12 left-0 w-full h-[2px] bg-slate-100 -z-0" />
          
          {steps.map((step, index) => (
            <div key={index} className="relative z-10 flex flex-col items-center text-center group">
              <div className="w-24 h-24 rounded-full bg-white border-4 border-slate-50 flex items-center justify-center text-blue-600 shadow-xl group-hover:border-blue-600 transition-all duration-500 mb-6">
                <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-all duration-500">
                  {step.icon}
                </div>
              </div>
              <h4 className="text-lg font-bold text-slate-900 mb-2">{step.title}</h4>
              <p className="text-sm text-slate-500 font-medium px-4">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
