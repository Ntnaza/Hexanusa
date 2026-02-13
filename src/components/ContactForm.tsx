"use client";

import { useState } from "react";
import { Send, CheckCircle2, Loader2 } from "lucide-react";
import { sendContactMessage } from "@/app/actions/contact";

export default function ContactForm() {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    const result = await sendContactMessage(formData);
    
    setLoading(false);
    if (result.success) {
      setSubmitted(true);
      setFormData({ name: "", email: "", message: "" });
      setTimeout(() => setSubmitted(false), 5000);
    } else {
      alert("Maaf, gagal mengirim pesan. Silakan coba lagi.");
    }
  };

  return (
    <div className="flex-1 bg-white p-10 rounded-[40px] shadow-2xl shadow-slate-200 border border-slate-100 relative overflow-hidden">
      {submitted ? (
        <div className="h-full flex flex-col items-center justify-center text-center animate-in zoom-in duration-500">
          <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <h4 className="text-2xl font-black text-slate-900 mb-2">Pesan Terkirim!</h4>
          <p className="text-slate-500 font-medium">Terima kasih sudah menghubungi Hexanusa. <br/> Kami akan segera membalas pesan Anda.</p>
          <button 
            onClick={() => setSubmitted(false)}
            className="mt-8 text-blue-600 font-bold text-sm hover:underline"
          >
            Kirim pesan lain
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Nama Lengkap</label>
              <input 
                type="text" 
                required
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                placeholder="Nama Anda..."
                className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:outline-none focus:border-blue-600 focus:bg-white transition-all text-sm font-medium"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Email</label>
              <input 
                type="email" 
                required
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                placeholder="Email Anda..."
                className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:outline-none focus:border-blue-600 focus:bg-white transition-all text-sm font-medium"
              />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Pesan Anda</label>
            <textarea 
              rows={4}
              required
              value={formData.message}
              onChange={(e) => setFormData({...formData, message: e.target.value})}
              placeholder="Ceritakan kebutuhan Anda..."
              className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:outline-none focus:border-blue-600 focus:bg-white transition-all text-sm font-medium resize-none"
            ></textarea>
          </div>
          <button 
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-5 rounded-2xl font-bold text-sm hover:bg-slate-900 transition-all shadow-xl shadow-blue-100 flex items-center justify-center gap-3 group disabled:opacity-70"
          >
            {loading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <>
                Kirim Pesan Sekarang
                <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </>
            )}
          </button>
        </form>
      )}
    </div>
  );
}
