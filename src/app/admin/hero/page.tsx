"use client";

import { useState, useEffect } from "react";
import { Plus, Pencil, Trash2, Layout, Loader2, Save, X, Type, AlignLeft } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { saveHeroSlide, deleteHeroSlide } from "./actions";
import { useToast } from "@/components/admin/Toast";
import ConfirmModal from "@/components/admin/ConfirmModal";

export default function AdminHero() {
  const { toast } = useToast();
  const [slides, setSlides] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingData, setEditingData] = useState<any>(null);
  const [formLoading, setFormLoading] = useState(false);

  // State untuk ConfirmModal
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [deletingId, setDeletingId] = useState<number | null>(null);

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
    toast("Konfigurasi hero berhasil diperbarui.", "success");
    setFormLoading(false);
    setIsModalOpen(false);
    fetchSlides();
  };

  const handleDeleteClick = (id: number) => {
    setDeletingId(id);
    setConfirmOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!deletingId) return;
    await deleteHeroSlide(deletingId); 
    toast("Slide telah dihapus secara permanen.", "success");
    fetchSlides(); 
  };

  return (
    <div className="space-y-10">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Slide Hero</h1>
          <p className="text-slate-500 font-medium text-sm mt-1">Sesuaikan narasi utama pada bagian depan website.</p>
        </div>
        <button 
          onClick={() => { setEditingData(null); setIsModalOpen(true); }} 
          className="bg-slate-900 hover:bg-blue-600 text-white px-8 py-4 rounded-xl font-bold text-xs uppercase tracking-widest flex items-center gap-3 shadow-xl transition-all active:scale-95"
        >
          <Plus className="w-4 h-4" /> TAMBAH SLIDE
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {slides.map((slide, idx) => (
          <div key={slide.id} className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-8 group transition-all hover:shadow-md">
            <div className="flex-grow space-y-3">
              <div className="flex items-center gap-3">
                <span className="text-[10px] font-black text-blue-600 uppercase tracking-[0.2em] bg-blue-50 px-2 py-1 rounded-md">Slide 0{idx + 1}</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 leading-tight tracking-tight">{slide.title}</h3>
              <p className="text-slate-500 font-medium text-sm leading-relaxed max-w-2xl">{slide.desc}</p>
            </div>
            <div className="flex gap-2 shrink-0 self-end md:self-center">
              <button onClick={() => { setEditingData(slide); setIsModalOpen(true); }} className="p-3 rounded-xl bg-slate-50 text-slate-400 hover:bg-blue-600 hover:text-white transition-all shadow-sm"><Pencil className="w-4 h-4" /></button>
              <button onClick={() => handleDeleteClick(slide.id)} className="p-3 rounded-xl bg-slate-50 text-slate-400 hover:bg-red-500 hover:text-white transition-all shadow-sm"><Trash2 className="w-4 h-4" /></button>
            </div>
          </div>
        ))}
        {slides.length === 0 && !loading && (
          <div className="bg-slate-50/50 border-2 border-dashed border-slate-100 rounded-[32px] py-20 text-center">
            <Layout className="w-12 h-12 text-slate-200 mx-auto mb-4" />
            <p className="text-slate-400 font-black uppercase tracking-widest text-[10px]">Belum ada konten hero</p>
          </div>
        )}
      </div>

      {/* Modal Form Elegant */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[999] flex items-center justify-center p-4">
            {/* Backdrop Ultra-Blur yang menutupi Navbar (Z-Index 999) */}
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }} 
              onClick={() => setIsModalOpen(false)} 
              className="fixed inset-0 bg-slate-950/40 backdrop-blur-md" 
            />

            {/* Minimalist Floating Card */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }} 
              animate={{ opacity: 1, scale: 1, y: 0 }} 
              exit={{ opacity: 0, scale: 0.95, y: 20 }} 
              className="relative bg-white w-full max-w-md rounded-[28px] shadow-2xl overflow-hidden border border-slate-50"
            >
              <div className="px-8 py-5 border-b border-slate-50 flex justify-between items-center bg-slate-50/30">
                <div>
                  <h2 className="text-sm font-black text-slate-900 uppercase tracking-widest">{editingData ? "Edit Hero" : "New Hero"}</h2>
                </div>
                <button onClick={() => setIsModalOpen(false)} className="p-1.5 hover:bg-white rounded-lg transition-all border border-transparent hover:border-slate-100 text-slate-300 hover:text-slate-600">
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-8 space-y-6">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 mb-1 ml-1">
                    <Type className="w-3 h-3 text-blue-600" />
                    <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Main Title</label>
                  </div>
                  <textarea 
                    name="title" 
                    rows={2} 
                    defaultValue={editingData?.title} 
                    placeholder="Masukkan narasi utama..."
                    className="w-full px-5 py-3 rounded-xl bg-slate-50 border border-slate-100 focus:outline-none focus:border-blue-600 focus:bg-white transition-all text-xs font-bold shadow-inner resize-none" 
                    required 
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2 mb-1 ml-1">
                    <AlignLeft className="w-3 h-3 text-blue-600" />
                    <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Description</label>
                  </div>
                  <textarea 
                    name="desc" 
                    rows={3} 
                    defaultValue={editingData?.desc} 
                    placeholder="Jelaskan detail slide ini..."
                    className="w-full px-5 py-3 rounded-xl bg-slate-50 border border-slate-100 focus:outline-none focus:border-blue-600 focus:bg-white transition-all text-xs font-medium shadow-inner resize-none" 
                    required 
                  />
                </div>

                <div className="pt-4 flex gap-3">
                  <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 py-3.5 rounded-xl font-black text-[9px] uppercase tracking-widest text-slate-400 bg-slate-50 hover:bg-slate-100 transition-all">Cancel</button>
                  <button 
                    type="submit" 
                    disabled={formLoading} 
                    className="flex-[2] bg-slate-900 text-white py-3.5 rounded-xl font-black text-[9px] uppercase tracking-widest hover:bg-blue-600 transition-all shadow-xl flex items-center justify-center gap-2 disabled:opacity-70"
                  >
                    {formLoading ? <Loader2 className="animate-spin w-3.5 h-3.5" /> : <><Save className="w-3.5 h-3.5" /> Save Hero</>}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <ConfirmModal
        isOpen={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        onConfirm={handleDeleteConfirm}
        title="Hapus Slide?"
        message="Slide ini tidak akan ditampilkan lagi di halaman depan. Aksi ini permanen."
        confirmText="Hapus Slide"
      />
    </div>
  );
}
