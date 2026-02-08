"use client";

import { useState, useEffect, useRef } from "react";
import { X, Save, Loader2, User, Briefcase, Linkedin, Github, Instagram, Upload, Camera } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { saveTeamMember } from "./actions";

export default function TeamForm({ 
  isOpen, 
  onClose, 
  initialData = null 
}: { 
  isOpen: boolean; 
  onClose: () => void; 
  initialData?: any 
}) {
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
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
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
      await saveTeamMember(data);
      onClose();
    } catch (error) {
      alert("Gagal menyimpan data.");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" />

        <motion.div initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 20 }} className="relative bg-white w-full max-w-2xl rounded-[40px] shadow-2xl overflow-hidden">
          <div className="p-8 border-b border-slate-50 flex justify-between items-center bg-slate-50/50">
            <div>
              <h2 className="text-xl font-black text-slate-900">{initialData ? "Edit Anggota" : "Tambah Anggota"}</h2>
              <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-1">Update data tim Hexanusa</p>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-white rounded-full transition-colors shadow-sm">
              <X className="w-6 h-6 text-slate-400" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="p-8 space-y-6 max-h-[75vh] overflow-y-auto custom-scrollbar">
            {/* Upload Foto Section */}
            <div className="flex flex-col items-center gap-4 py-4">
              <div 
                onClick={() => fileInputRef.current?.click()}
                className="w-32 h-32 rounded-[32px] bg-slate-100 border-2 border-dashed border-slate-200 flex flex-col items-center justify-center cursor-pointer overflow-hidden group relative hover:border-blue-400 transition-all"
              >
                {preview ? (
                  <img src={preview} alt="preview" className="w-full h-full object-cover" />
                ) : (
                  <div className="flex flex-col items-center text-slate-400">
                    <Camera className="w-8 h-8 mb-1" />
                    <span className="text-[10px] font-bold">PILIH FOTO</span>
                  </div>
                )}
                <div className="absolute inset-0 bg-blue-600/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity text-white">
                  <Upload className="w-6 h-6" />
                </div>
              </div>
              <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/*" className="hidden" />
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Klik kotak untuk ganti foto</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Nama Lengkap</label>
                <input type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:outline-none focus:border-blue-600 focus:bg-white transition-all text-sm font-medium" required />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Jabatan</label>
                <input type="text" value={formData.role} onChange={(e) => setFormData({...formData, role: e.target.value})} className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:outline-none focus:border-blue-600 focus:bg-white transition-all text-sm font-medium" required />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Biografi</label>
              <textarea rows={3} value={formData.bio} onChange={(e) => setFormData({...formData, bio: e.target.value})} className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:outline-none focus:border-blue-600 focus:bg-white transition-all text-sm font-medium resize-none" required></textarea>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1 flex items-center gap-2">
                  <Linkedin className="w-3 h-3 text-blue-600" /> LinkedIn
                </label>
                <input type="text" value={formData.linkedin} onChange={(e) => setFormData({...formData, linkedin: e.target.value})} placeholder="Link..." className="w-full px-4 py-3.5 rounded-xl bg-slate-50 border border-slate-100 focus:outline-none focus:border-blue-600 transition-all text-xs font-medium" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1 flex items-center gap-2">
                  <Github className="w-3 h-3 text-slate-900" /> Github
                </label>
                <input type="text" value={formData.github} onChange={(e) => setFormData({...formData, github: e.target.value})} placeholder="Link..." className="w-full px-4 py-3.5 rounded-xl bg-slate-50 border border-slate-100 focus:outline-none focus:border-blue-600 transition-all text-xs font-medium" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1 flex items-center gap-2">
                  <Instagram className="w-3 h-3 text-pink-600" /> Instagram
                </label>
                <input type="text" value={formData.instagram} onChange={(e) => setFormData({...formData, instagram: e.target.value})} placeholder="Link..." className="w-full px-4 py-3.5 rounded-xl bg-slate-50 border border-slate-100 focus:outline-none focus:border-blue-600 transition-all text-xs font-medium" />
              </div>
            </div>

            <div className="pt-4 flex gap-4">
              <button type="button" onClick={onClose} className="flex-1 px-8 py-4 rounded-2xl font-bold text-sm text-slate-500 bg-slate-50 hover:bg-slate-100 transition-all">Batal</button>
              <button type="submit" disabled={loading} className="flex-[2] bg-slate-900 text-white px-8 py-4 rounded-2xl font-bold text-sm hover:bg-blue-600 transition-all shadow-xl flex items-center justify-center gap-2 disabled:opacity-70">
                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <><Save className="w-5 h-5" /> Simpan Perubahan</>}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}