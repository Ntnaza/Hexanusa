"use client";

import { useState } from "react";
import { Plus, Trash2, Edit2, User, MessageSquare, Briefcase, Camera, Loader2, Save, X, Type, AlignLeft } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useToast } from "@/components/admin/Toast";
import ConfirmModal from "@/components/admin/ConfirmModal";

export default function TestimonialsClient({ initialData }: { initialData: any[] }) {
  const { toast } = useToast();
  const [testimonials, setTestimonials] = useState(initialData);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);

  // State untuk ConfirmModal
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    role: "",
    content: "",
    order: 0,
    imageFile: null as File | null,
    imageUrl: ""
  });

  const resetForm = () => {
    setFormData({ name: "", role: "", content: "", order: 0, imageFile: null, imageUrl: "" });
    setEditingItem(null);
    setShowForm(false);
  };

  const handleEdit = (item: any) => {
    setEditingItem(item);
    setFormData({
      name: item.name,
      role: item.role,
      content: item.content,
      order: item.order,
      imageFile: null,
      imageUrl: item.image
    });
    setShowForm(true);
  };

  const handleDeleteClick = (id: number) => {
    setDeletingId(id);
    setConfirmOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!deletingId) return;
    try {
      const res = await fetch("/api/testimonials", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: deletingId }),
      });
      if (res.ok) {
        setTestimonials(testimonials.filter(t => t.id !== deletingId));
        toast("Testimonial telah dihapus secara permanen.", "success");
      }
    } catch (error) {
      toast("Gagal menghapus data testimonial.", "error");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const data = new FormData();
    if (editingItem) data.append("id", editingItem.id.toString());
    data.append("name", formData.name);
    data.append("role", formData.role);
    data.append("content", formData.content);
    data.append("order", formData.order.toString());
    if (formData.imageFile) data.append("imageFile", formData.imageFile);
    data.append("imageUrl", formData.imageUrl);

    try {
      const res = await fetch("/api/testimonials", { 
        method: "POST", 
        body: data 
      });
      
      const result = await res.json();
      
      if (result.success) {
        const updatedRes = await fetch("/api/testimonials");
        const updatedData = await updatedRes.json();
        setTestimonials(updatedData);
        
        toast(editingItem ? "Data testimonial berhasil diperbarui." : "Testimonial baru berhasil ditambahkan.", "success");
        resetForm();
      } else {
        toast(result.error || "Terjadi kesalahan saat menyimpan data.", "error");
      }
    } catch (error) {
      toast("Sistem mengalami kendala teknis.", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-10">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Testimonials</h1>
          <p className="text-slate-500 font-medium text-sm mt-1">Kelola suara kepuasan klien dan mitra Hexanusa.</p>
        </div>
        <button 
          onClick={() => setShowForm(true)}
          className="bg-slate-900 hover:bg-blue-600 text-white px-8 py-4 rounded-xl font-bold text-xs uppercase tracking-widest flex items-center gap-3 shadow-xl transition-all active:scale-95"
        >
          <Plus className="w-4 h-4" /> TAMBAH TESTI
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {testimonials.map((item) => (
          <div key={item.id} className="bg-white rounded-[32px] border border-slate-100 p-8 shadow-sm group hover:shadow-md transition-all flex flex-col h-full">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-full overflow-hidden border border-slate-100 flex items-center justify-center bg-slate-50 shadow-inner">
                {item.image ? (
                  <img src={item.image} className="w-full h-full object-cover" alt={item.name} />
                ) : (
                  <User className="w-5 h-5 text-slate-300" />
                )}
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-sm leading-tight tracking-tight">{item.name}</h3>
                <p className="text-[10px] font-bold text-blue-600 uppercase tracking-widest mt-0.5">{item.role}</p>
              </div>
            </div>
            <p className="text-sm text-slate-600 font-medium leading-relaxed italic flex-grow">
              "{item.content}"
            </p>
            <div className="flex justify-end gap-2 pt-6 mt-6 border-t border-slate-50">
              <button 
                onClick={() => handleEdit(item)}
                className="p-3 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all"
              >
                <Edit2 className="w-4 h-4" />
              </button>
              <button 
                onClick={() => handleDeleteClick(item.id)}
                className="p-3 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
        {testimonials.length === 0 && (
          <div className="lg:col-span-3 py-20 text-center bg-slate-50/50 rounded-[40px] border-2 border-dashed border-slate-100">
            <MessageSquare className="w-12 h-12 text-slate-200 mx-auto mb-4" />
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Belum ada testimonial yang dipajang</p>
          </div>
        )}
      </div>

      {/* Floating Modal Form */}
      <AnimatePresence>
        {showForm && (
          <div className="fixed inset-0 z-[999] flex items-center justify-center p-4">
            {/* Backdrop Ultra-Blur yang menutupi Navbar (Z-Index 999) */}
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }} 
              onClick={resetForm} 
              className="fixed inset-0 bg-slate-950/40 backdrop-blur-md" 
            />

            {/* Minimalist Floating Card */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }} 
              animate={{ opacity: 1, scale: 1, y: 0 }} 
              exit={{ opacity: 0, scale: 0.95, y: 20 }} 
              className="relative bg-white w-full max-w-md rounded-[28px] shadow-2xl overflow-hidden border border-slate-50 flex flex-col max-h-[90vh]"
            >
              <div className="px-8 py-5 border-b border-slate-50 flex justify-between items-center bg-slate-50/30">
                <div>
                  <h2 className="text-sm font-black text-slate-900 uppercase tracking-widest">{editingItem ? "Edit Testimonial" : "New Testimonial"}</h2>
                </div>
                <button onClick={resetForm} className="p-1.5 hover:bg-white rounded-lg transition-all border border-transparent hover:border-slate-100 text-slate-300 hover:text-slate-600">
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-8 space-y-6 overflow-y-auto custom-scrollbar">
                {/* Upload Foto */}
                <div className="space-y-2">
                  <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Client Avatar</label>
                  <div 
                    className="w-24 h-24 mx-auto rounded-full bg-slate-50 border-2 border-dashed border-slate-200 flex flex-col items-center justify-center overflow-hidden relative group cursor-pointer"
                    onClick={() => document.getElementById("file-input")?.click()}
                  >
                    {formData.imageFile || formData.imageUrl ? (
                      <img 
                        src={formData.imageFile ? URL.createObjectURL(formData.imageFile) : formData.imageUrl} 
                        className="w-full h-full object-cover" 
                        alt="Preview"
                      />
                    ) : (
                      <Camera className="w-6 h-6 text-slate-300" />
                    )}
                    <div className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center text-white">
                      <Camera className="w-4 h-4" />
                    </div>
                  </div>
                  <input id="file-input" type="file" className="hidden" accept="image/*" onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) setFormData({...formData, imageFile: file});
                  }} />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2 mb-1 ml-1">
                    <User className="w-3 h-3 text-blue-600" />
                    <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Full Name</label>
                  </div>
                  <input 
                    type="text" required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    placeholder="Contoh: Budi Santoso"
                    className="w-full px-5 py-3 rounded-xl bg-slate-50 border border-slate-100 focus:outline-none focus:border-blue-600 focus:bg-white transition-all text-xs font-bold shadow-inner"
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2 mb-1 ml-1">
                    <Briefcase className="w-3 h-3 text-blue-600" />
                    <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Role / Company</label>
                  </div>
                  <input 
                    type="text" required
                    value={formData.role}
                    onChange={(e) => setFormData({...formData, role: e.target.value})}
                    placeholder="Contoh: CEO di TechID"
                    className="w-full px-5 py-3 rounded-xl bg-slate-50 border border-slate-100 focus:outline-none focus:border-blue-600 focus:bg-white transition-all text-xs font-bold shadow-inner"
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2 mb-1 ml-1">
                    <AlignLeft className="w-3 h-3 text-blue-600" />
                    <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Feedback Content</label>
                  </div>
                  <textarea 
                    rows={4} required
                    value={formData.content}
                    onChange={(e) => setFormData({...formData, content: e.target.value})}
                    placeholder="Apa kata mereka tentang Hexanusa?"
                    className="w-full px-5 py-3 rounded-xl bg-slate-50 border border-slate-100 focus:outline-none focus:border-blue-600 focus:bg-white transition-all text-xs font-medium shadow-inner resize-none"
                  />
                </div>

                <div className="pt-4 flex gap-3">
                  <button type="button" onClick={resetForm} className="flex-1 py-3.5 rounded-xl font-black text-[9px] uppercase tracking-widest text-slate-400 bg-slate-50 hover:bg-slate-100 transition-all">Cancel</button>
                  <button 
                    type="submit"
                    disabled={loading}
                    className="flex-[2] bg-slate-900 text-white py-3.5 rounded-xl font-black text-[9px] uppercase tracking-widest hover:bg-blue-600 transition-all shadow-xl flex items-center justify-center gap-2 disabled:opacity-70"
                  >
                    {loading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <><Save className="w-3.5 h-3.5" /> Save Testi</>}
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
        title="Hapus Testimonial?"
        message="Testimonial ini akan dihilangkan secara permanen dari website. Tindakan ini tidak dapat dibatalkan."
        confirmText="Hapus Testi"
      />
    </div>
  );
}
