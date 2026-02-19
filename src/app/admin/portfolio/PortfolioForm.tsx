"use client";

import { useState, useEffect, useRef } from "react";
import { X, Save, Loader2, Image as ImageIcon, Link as LinkIcon, Upload, Camera, Type, Tag, AlignLeft } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useToast } from "@/components/admin/Toast";

export default function PortfolioForm({ 
  isOpen, 
  onClose, 
  initialData = null 
}: { 
  isOpen: boolean; 
  onClose: () => void; 
  initialData?: any 
}) {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [formData, setFormData] = useState({
    title: "",
    category: "Web Development",
    description: "",
    link: ""
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title || "",
        category: initialData.category || "Web Development",
        description: initialData.description || "",
        link: initialData.link || ""
      });
      setPreview(initialData.image || "");
    } else {
      setFormData({
        title: "",
        category: "Web Development",
        description: "",
        link: ""
      });
      setPreview("");
    }
  }, [initialData, isOpen]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    const data = new FormData();
    if (initialData?.id) data.append("id", initialData.id.toString());
    data.append("title", formData.title);
    data.append("category", formData.category);
    data.append("description", formData.description);
    data.append("link", formData.link);
    
    if (fileInputRef.current?.files?.[0]) {
      data.append("image_file", fileInputRef.current.files[0]);
    } else if (!initialData) {
      toast("Harap pilih gambar proyek!", "error");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/portfolio", {
        method: "POST",
        body: data,
      });
      const result = await res.json();

      if (result.success) {
        toast(`Karya berhasil ${initialData ? 'diperbarui' : 'ditambahkan'}!`, "success");
        onClose();
      } else {
        toast(result.error || "Gagal menyimpan portofolio.", "error");
      }
    } catch (error) {
      toast("Terjadi kesalahan sistem.", "error");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[999] flex items-center justify-center p-4">
        {/* Backdrop Ultra-Blur */}
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          exit={{ opacity: 0 }} 
          onClick={onClose} 
          className="fixed inset-0 bg-slate-950/40 backdrop-blur-md" 
        />

        {/* Minimalist Floating Card */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 20 }} 
          animate={{ opacity: 1, scale: 1, y: 0 }} 
          exit={{ opacity: 0, scale: 0.95, y: 20 }} 
          className="relative bg-white w-full max-w-md rounded-[28px] shadow-2xl overflow-hidden border border-slate-50 flex flex-col max-h-[90vh]"
        >
          {/* Compact Header */}
          <div className="px-8 py-5 border-b border-slate-50 flex justify-between items-center bg-slate-50/30">
            <div>
              <h2 className="text-sm font-black text-slate-900 uppercase tracking-widest">{initialData ? "Edit Work" : "New Work"}</h2>
            </div>
            <button onClick={onClose} className="p-1.5 hover:bg-white rounded-lg transition-all text-slate-300 hover:text-slate-600 border border-transparent hover:border-slate-100">
              <X className="w-4 h-4" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="p-8 space-y-6 overflow-y-auto custom-scrollbar">
            {/* Thumbnail Upload */}
            <div className="space-y-2">
              <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Cover Image</label>
              <div 
                onClick={() => fileInputRef.current?.click()}
                className="group relative aspect-video rounded-2xl overflow-hidden bg-slate-50 border-2 border-dashed border-slate-200 cursor-pointer hover:border-blue-400 transition-all flex items-center justify-center"
              >
                {preview ? (
                  <img src={preview} className="w-full h-full object-cover" alt="Preview" />
                ) : (
                  <div className="flex flex-col items-center justify-center text-slate-400">
                    <Upload className="w-6 h-6 mb-2" />
                    <span className="text-[9px] font-black uppercase tracking-widest">Select Artwork</span>
                  </div>
                )}
                <div className="absolute inset-0 bg-blue-600/80 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center text-white transition-all">
                  <Camera className="w-5 h-5 mb-1" />
                  <span className="font-black text-[9px] uppercase tracking-widest">Replace</span>
                </div>
              </div>
              <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleFileChange} />
            </div>

            {/* Judul */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 mb-1 ml-1">
                <Type className="w-3 h-3 text-blue-600" />
                <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Project Title</label>
              </div>
              <input 
                type="text" 
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                placeholder="Misal: Hexanusa Mobile App"
                className="w-full px-5 py-3 rounded-xl bg-slate-50 border border-slate-100 focus:outline-none focus:border-blue-600 focus:bg-white transition-all text-xs font-bold shadow-inner"
                required
              />
            </div>

            {/* Kategori */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 mb-1 ml-1">
                <Tag className="w-3 h-3 text-blue-600" />
                <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Category</label>
              </div>
              <select 
                value={formData.category}
                onChange={(e) => setFormData({...formData, category: e.target.value})}
                className="w-full px-5 py-3 rounded-xl bg-slate-50 border border-slate-100 focus:outline-none focus:border-blue-600 focus:bg-white transition-all text-xs font-bold appearance-none cursor-pointer shadow-inner"
              >
                <option value="Web Development">Web Development</option>
                <option value="Mobile Apps">Mobile Apps</option>
                <option value="Enterprise Software">Enterprise Software</option>
                <option value="Digital Innovation">Digital Innovation</option>
              </select>
            </div>

            {/* Deskripsi */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 mb-1 ml-1">
                <AlignLeft className="w-3 h-3 text-blue-600" />
                <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Description</label>
              </div>
              <textarea 
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                rows={3}
                placeholder="Ceritakan singkat mengenai proyek ini..."
                className="w-full px-5 py-3 rounded-xl bg-slate-50 border border-slate-100 focus:outline-none focus:border-blue-600 focus:bg-white transition-all text-xs font-medium shadow-inner resize-none"
              />
            </div>

            {/* Link */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 mb-1 ml-1">
                <LinkIcon className="w-3 h-3 text-blue-600" />
                <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Live Preview Link</label>
              </div>
              <input 
                type="text" 
                value={formData.link}
                onChange={(e) => setFormData({...formData, link: e.target.value})}
                placeholder="https://..."
                className="w-full px-5 py-3 rounded-xl bg-slate-50 border border-slate-100 focus:outline-none focus:border-blue-600 focus:bg-white transition-all text-xs font-medium shadow-inner"
              />
            </div>

            {/* Buttons */}
            <div className="pt-4 flex gap-3">
              <button type="button" onClick={onClose} className="flex-1 py-3.5 rounded-xl font-black text-[9px] uppercase tracking-widest text-slate-400 bg-slate-50 hover:bg-slate-100 transition-all">Cancel</button>
              <button 
                type="submit"
                disabled={loading}
                className="flex-[2] bg-slate-900 text-white py-3.5 rounded-xl font-black text-[9px] uppercase tracking-widest hover:bg-blue-600 transition-all shadow-xl flex items-center justify-center gap-2 disabled:opacity-70"
              >
                {loading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <><Save className="w-3.5 h-3.5" /> Save Work</>}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
