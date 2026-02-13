"use client";

import { useState, useEffect, useRef } from "react";
import { X, Save, Loader2, Linkedin, Github, Instagram, Upload, Camera } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { saveTeamMember } from "./actions";
import { useToast } from "@/components/admin/Toast";

export default function TeamForm({ 
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
    name: "",
    role: "",
    image: "",
    bio: "",
    linkedin: "",
    github: "",
    instagram: ""
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        ...initialData,
        linkedin: initialData.linkedin || "",
        github: initialData.github || "",
        instagram: initialData.instagram || ""
      });
      setPreview(initialData.image);
    } else {
      setFormData({
        name: "",
        role: "",
        image: "",
        bio: "",
        linkedin: "",
        github: "",
        instagram: ""
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
    data.append("name", formData.name);
    data.append("role", formData.role);
    data.append("bio", formData.bio);
    data.append("linkedin", formData.linkedin);
    data.append("github", formData.github);
    data.append("instagram", formData.instagram);
    data.append("image_url", formData.image);
    
    if (fileInputRef.current?.files?.[0]) {
      data.append("image_file", fileInputRef.current.files[0]);
    }

    try {
      const res = await fetch("/api/team", {
        method: "POST",
        body: data,
      });
      const result = await res.json();
      
      if (result.success) {
        toast(`Anggota tim berhasil ${initialData ? 'diperbarui' : 'ditambahkan'}!`, "success");
        onClose();
      } else {
        throw new Error(result.error || "Gagal menyimpan");
      }
    } catch (error) {
      toast("Gagal menyimpan data tim.", "error");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[300] flex items-center justify-center p-4">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="absolute inset-0 bg-slate-950/60 backdrop-blur-md" />

        <motion.div initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 20 }} className="relative bg-white w-full max-w-2xl rounded-[32px] shadow-2xl overflow-hidden">
          <div className="px-8 py-6 border-b border-slate-50 flex justify-between items-center bg-slate-50/50">
            <div>
              <h2 className="text-lg font-black text-slate-900 tracking-tight">{initialData ? "Edit Anggota" : "Tambah Anggota"}</h2>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-0.5">Konfigurasi Data Personel</p>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-white rounded-full transition-all border border-transparent hover:border-slate-100">
              <X className="w-5 h-5 text-slate-400" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="p-8 space-y-6 max-h-[75vh] overflow-y-auto custom-scrollbar">
            <div className="flex flex-col items-center gap-4">
              <div 
                onClick={() => fileInputRef.current?.click()}
                className="w-28 h-28 rounded-3xl bg-slate-50 border-2 border-dashed border-slate-200 flex flex-col items-center justify-center cursor-pointer overflow-hidden group relative hover:border-blue-400 transition-all shadow-inner"
              >
                {preview ? (
                  <img src={preview} alt="preview" className="w-full h-full object-cover" />
                ) : (
                  <div className="flex flex-col items-center text-slate-400">
                    <Camera className="w-6 h-6 mb-1" />
                    <span className="text-[8px] font-black uppercase tracking-widest">Pilih Foto</span>
                  </div>
                )}
                <div className="absolute inset-0 bg-blue-600/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all text-white">
                  <Upload className="w-5 h-5" />
                </div>
              </div>
              <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/*" className="hidden" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Nama Lengkap</label>
                <input type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full px-5 py-3.5 rounded-xl bg-slate-50 border border-slate-100 focus:outline-none focus:border-blue-600 focus:bg-white transition-all text-sm font-bold shadow-inner" required />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Jabatan / Role</label>
                <input type="text" value={formData.role} onChange={(e) => setFormData({...formData, role: e.target.value})} className="w-full px-5 py-3.5 rounded-xl bg-slate-50 border border-slate-100 focus:outline-none focus:border-blue-600 focus:bg-white transition-all text-sm font-bold shadow-inner" required />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Biografi Singkat</label>
              <textarea rows={3} value={formData.bio} onChange={(e) => setFormData({...formData, bio: e.target.value})} className="w-full px-5 py-3.5 rounded-xl bg-slate-50 border border-slate-100 focus:outline-none focus:border-blue-600 focus:bg-white transition-all text-sm font-medium resize-none shadow-inner" required></textarea>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 flex items-center gap-2">LinkedIn</label>
                <input type="text" value={formData.linkedin} onChange={(e) => setFormData({...formData, linkedin: e.target.value})} placeholder="URL..." className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-100 focus:border-blue-600 transition-all text-[11px] font-medium shadow-inner" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 flex items-center gap-2">Github</label>
                <input type="text" value={formData.github} onChange={(e) => setFormData({...formData, github: e.target.value})} placeholder="URL..." className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-100 focus:border-blue-600 transition-all text-[11px] font-medium shadow-inner" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 flex items-center gap-2">Instagram</label>
                <input type="text" value={formData.instagram} onChange={(e) => setFormData({...formData, instagram: e.target.value})} placeholder="URL..." className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-100 focus:border-blue-600 transition-all text-[11px] font-medium shadow-inner" />
              </div>
            </div>

            <div className="pt-4 flex gap-3 pb-2">
              <button type="button" onClick={onClose} className="flex-1 py-4 rounded-xl font-black text-[10px] uppercase tracking-widest text-slate-400 bg-slate-50 hover:bg-slate-100 transition-all">Batal</button>
              <button 
                type="submit"
                disabled={loading}
                className="flex-[2] bg-slate-900 text-white py-4 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-blue-600 transition-all shadow-xl flex items-center justify-center gap-2 disabled:opacity-70"
              >
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <><Save className="w-4 h-4" /> Simpan Personel</>}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
