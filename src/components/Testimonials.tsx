import { prisma } from "@/lib/prisma";
import { Quote, User } from "lucide-react";

export default async function Testimonials() {
  const reviews = await prisma.testimonial.findMany({
    orderBy: { order: "asc" },
  });

  if (reviews.length === 0) return null;

  return (
    <section id="testimonials" className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-blue-600 font-bold uppercase tracking-widest text-xs mb-4">Testimonial</h2>
          <h3 className="text-3xl font-black text-slate-900">Apa Kata Mereka?</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((review) => (
            <div key={review.id} className="bg-white p-8 rounded-[32px] shadow-sm border border-slate-100 relative">
              <Quote className="absolute top-6 right-6 w-8 h-8 text-blue-100" />
              <p className="text-slate-600 font-medium italic mb-8 relative z-10">"{review.content}"</p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full border-2 border-blue-100 overflow-hidden flex items-center justify-center bg-blue-50">
                  {review.image ? (
                    <img src={review.image} alt={review.name} className="w-full h-full object-cover" />
                  ) : (
                    <User className="w-6 h-6 text-blue-300" />
                  )}
                </div>
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
