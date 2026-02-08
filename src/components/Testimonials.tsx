import { Quote } from "lucide-react";

export default function Testimonials() {
  const reviews = [
    {
      name: "Budi Santoso",
      role: "CEO TechStart Indonesia",
      content: "Hasil kerja Hexanusa sangat luar biasa. Sistem e-commerce kami jadi jauh lebih cepat dan stabil.",
      avatar: "https://i.pravatar.cc/150?u=budi"
    },
    {
      name: "Siska Amelia",
      role: "Marketing Director",
      content: "Proses komunikasinya sangat lancar dan tim sangat memahami kebutuhan desain kami yang spesifik.",
      avatar: "https://i.pravatar.cc/150?u=siska"
    },
    {
      name: "Andi Wijaya",
      role: "Founder WarungDigital",
      content: "Gak nyesel pilih Hexanusa. Aplikasi mobile kami dapet feedback positif banget dari user.",
      avatar: "https://i.pravatar.cc/150?u=andi"
    }
  ];

  return (
    <section className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-blue-600 font-bold uppercase tracking-widest text-xs mb-4">Testimonial</h2>
          <h3 className="text-3xl font-black text-slate-900">Apa Kata Mereka?</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((review, index) => (
            <div key={index} className="bg-white p-8 rounded-[32px] shadow-sm border border-slate-100 relative">
              <Quote className="absolute top-6 right-6 w-8 h-8 text-blue-100" />
              <p className="text-slate-600 font-medium italic mb-8 relative z-10">"{review.content}"</p>
              <div className="flex items-center gap-4">
                <img src={review.avatar} alt={review.name} className="w-12 h-12 rounded-full border-2 border-blue-100" />
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">{review.name}</h4>
                  <p className="text-xs text-slate-400 font-bold uppercase">{review.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
