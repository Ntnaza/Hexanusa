"use client";

import { useState, useEffect } from "react";
import { Plus, Pencil, Trash2, Layout, Loader2, Save, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { saveHeroSlide, deleteHeroSlide } from "./actions";

export default function AdminHero() {
  const [slides, setSlides] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingData, setEditingData] = useState<any>(null);
  const [formLoading, setFormLoading] = useState(false);

  const fetchSlides = async () => {
    setLoading(true);
    const res = await fetch('/api/hero');
    const data = await res.json();
    setSlides(data);
    setLoading(false);
  };

  useEffect(() => { fetchSlides(); }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormLoading(true);
    const formData = new FormData(e.target as HTMLFormElement);
    const data = {
      id: editingData?.id,
      title: formData.get("title") as string,
      desc: formData.get("desc") as string,
    };
    await saveHeroSlide(data);
    setFormLoading(false);
    setIsModalOpen(false);
    fetchSlides();
  };

  return (
    <div className="space-y-10">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">Manajemen Hero</h1>
          <p className="text-slate-500 font-medium mt-2">Kelola teks intro yang berganti-ganti di Beranda.</p>
        </div>
        <button onClick={() => { setEditingData(null); setIsModalOpen(true); }} className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-4 rounded-[20px] font-black text-sm flex items-center gap-3 shadow-2xl transition-all">
          <Plus className="w-5 h-5" /> TAMBAH SLIDE
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {loading ? (
          <div className="h-64 flex items-center justify-center"><Loader2 className="animate-spin text-blue-600" /></div>
        ) : slides.map((slide, idx) => (
          <div key={slide.id} className="bg-white p-10 rounded-[40px] border border-slate-100 shadow-xl shadow-slate-200/50 flex flex-col md:flex-row justify-between items-center gap-8 group transition-all hover:border-blue-200">
            <div className="flex-grow space-y-4">
              <div className="flex items-center gap-3 text-[10px] font-black text-blue-600 uppercase tracking-widest">
                <span className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center">0{idx + 1}</span>
                Slide Teks
              </div>
              <h3 className="text-2xl font-black text-slate-900 leading-tight">{slide.title}</h3>
              <p className="text-slate-500 font-medium text-sm leading-relaxed">{slide.desc}</p>
            </div>
            <div className="flex gap-3 shrink-0">
              <button onClick={() => { setEditingData(slide); setIsModalOpen(true); }} className="p-4 rounded-2xl bg-slate-50 text-slate-600 hover:bg-blue-600 hover:text-white transition-all"><Pencil className="w-5 h-5" /></button>
              <button onClick={async () => { if(confirm("Hapus slide ini?")) { await deleteHeroSlide(slide.id); fetchSlides(); } }} className="p-4 rounded-2xl bg-slate-50 text-slate-400 hover:bg-red-500 hover:text-white transition-all"><Trash2 className="w-5 h-5" /></button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal Form */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsModalOpen(false)} className="absolute inset-0 bg-slate-900/60 backdrop-blur-md" />
            <motion.div initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 20 }} className="relative bg-white w-full max-w-xl rounded-[50px] shadow-2xl p-12">
              <h2 className="text-2xl font-black text-slate-900 mb-8">{editingData ? "Edit Slide Hero" : "Tambah Slide Baru"}</h2>
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Judul Slide</label>
                  <textarea name="title" rows={3} defaultValue={editingData?.title} className="w-full px-8 py-6 rounded-[30px] bg-slate-50 border border-slate-100 focus:outline-none focus:border-blue-600 text-sm font-bold resize-none shadow-inner" required />
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Deskripsi Slide</label>
                  <textarea name="desc" rows={4} defaultValue={editingData?.desc} className="w-full px-8 py-6 rounded-[30px] bg-slate-50 border border-slate-100 focus:outline-none focus:border-blue-600 text-sm font-bold resize-none shadow-inner" required />
                </div>
                <div className="flex gap-4">
                  <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 py-5 rounded-3xl font-black text-xs uppercase tracking-widest text-slate-400">Batal</button>
                  <button type="submit" disabled={formLoading} className="flex-[2] bg-slate-900 text-white py-5 rounded-3xl font-black text-xs uppercase tracking-widest hover:bg-blue-600 shadow-xl flex items-center justify-center gap-2">
                    {formLoading ? <Loader2 className="animate-spin w-4 h-4" /> : <><Save className="w-4 h-4" /> Simpan Slide</>}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
