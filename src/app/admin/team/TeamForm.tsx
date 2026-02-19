"use client";

import { useState, useEffect, useRef } from "react";
import { X, Save, Loader2, Linkedin, Github, Instagram, Upload, Camera, User, Briefcase, AlignLeft, Link as LinkIcon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
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
        toast(`Personel berhasil ${initialData ? 'diperbarui' : 'ditambahkan'}!`, "success");
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
      <div className="fixed inset-0 z-[999] flex items-center justify-center p-4">
        {/* Backdrop Ultra-Blur yang menutupi Navbar (Z-Index 999) */}
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
              <h2 className="text-sm font-black text-slate-900 uppercase tracking-widest">{initialData ? "Edit Member" : "New Member"}</h2>
            </div>
            <button onClick={onClose} className="p-1.5 hover:bg-white rounded-lg transition-all border border-transparent hover:border-slate-100 text-slate-300 hover:text-slate-600">
              <X className="w-4 h-4" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="p-8 space-y-6 overflow-y-auto custom-scrollbar">
            {/* Portrait Upload */}
            <div className="space-y-2">
              <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Member Portrait</label>
              <div 
                onClick={() => fileInputRef.current?.click()}
                className="w-24 h-24 mx-auto rounded-3xl bg-slate-50 border-2 border-dashed border-slate-200 flex flex-col items-center justify-center cursor-pointer overflow-hidden group relative hover:border-blue-400 transition-all shadow-inner"
              >
                {preview ? (
                  <img src={preview} alt="preview" className="w-full h-full object-cover" />
                ) : (
                  <div className="flex flex-col items-center text-slate-400">
                    <Camera className="w-5 h-5 mb-1" />
                    <span className="text-[8px] font-black uppercase tracking-widest text-center">Upload</span>
                  </div>
                )}
                <div className="absolute inset-0 bg-blue-600/80 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all text-white">
                  <Upload className="w-4 h-4" />
                </div>
              </div>
              <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/*" className="hidden" />
            </div>

            {/* Identitas */}
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2 mb-1 ml-1">
                  <User className="w-3 h-3 text-blue-600" />
                  <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Full Name</label>
                </div>
                <input 
                  type="text" 
                  value={formData.name} 
                  onChange={(e) => setFormData({...formData, name: e.target.value})} 
                  placeholder="John Doe"
                  className="w-full px-5 py-3 rounded-xl bg-slate-50 border border-slate-100 focus:outline-none focus:border-blue-600 focus:bg-white transition-all text-xs font-bold shadow-inner" 
                  required 
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 mb-1 ml-1">
                  <Briefcase className="w-3 h-3 text-blue-600" />
                  <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Job Role</label>
                </div>
                <input 
                  type="text" 
                  value={formData.role} 
                  onChange={(e) => setFormData({...formData, role: e.target.value})} 
                  placeholder="Creative Director"
                  className="w-full px-5 py-3 rounded-xl bg-slate-50 border border-slate-100 focus:outline-none focus:border-blue-600 focus:bg-white transition-all text-xs font-bold shadow-inner" 
                  required 
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 mb-1 ml-1">
                  <AlignLeft className="w-3 h-3 text-blue-600" />
                  <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Short Bio</label>
                </div>
                <textarea 
                  rows={2} 
                  value={formData.bio} 
                  onChange={(e) => setFormData({...formData, bio: e.target.value})} 
                  placeholder="Tell us about this member..."
                  className="w-full px-5 py-3 rounded-xl bg-slate-50 border border-slate-100 focus:outline-none focus:border-blue-600 focus:bg-white transition-all text-xs font-medium resize-none shadow-inner" 
                  required 
                />
              </div>
            </div>

            {/* Social Connect */}
            <div className="space-y-3 pt-2">
              <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Social Networks</label>
              <div className="grid grid-cols-1 gap-2">
                <div className="flex items-center bg-slate-50 rounded-xl border border-slate-100 px-4 focus-within:border-blue-600 transition-all">
                  <Linkedin className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                  <input 
                    type="text" 
                    value={formData.linkedin} 
                    onChange={(e) => setFormData({...formData, linkedin: e.target.value})} 
                    placeholder="LinkedIn URL"
                    className="w-full bg-transparent border-none py-2.5 px-3 outline-none text-[10px] font-bold" 
                  />
                </div>
                <div className="flex items-center bg-slate-50 rounded-xl border border-slate-100 px-4 focus-within:border-blue-600 transition-all">
                  <Instagram className="w-3.5 h-3.5 text-pink-600 shrink-0" />
                  <input 
                    type="text" 
                    value={formData.instagram} 
                    onChange={(e) => setFormData({...formData, instagram: e.target.value})} 
                    placeholder="Instagram URL"
                    className="w-full bg-transparent border-none py-2.5 px-3 outline-none text-[10px] font-bold" 
                  />
                </div>
                <div className="flex items-center bg-slate-50 rounded-xl border border-slate-100 px-4 focus-within:border-blue-600 transition-all">
                  <Github className="w-3.5 h-3.5 text-slate-900 shrink-0" />
                  <input 
                    type="text" 
                    value={formData.github} 
                    onChange={(e) => setFormData({...formData, github: e.target.value})} 
                    placeholder="GitHub URL"
                    className="w-full bg-transparent border-none py-2.5 px-3 outline-none text-[10px] font-bold" 
                  />
                </div>
              </div>
            </div>

            {/* Buttons */}
            <div className="pt-4 flex gap-3">
              <button type="button" onClick={onClose} className="flex-1 py-3.5 rounded-xl font-black text-[9px] uppercase tracking-widest text-slate-400 bg-slate-50 hover:bg-slate-100 transition-all">Cancel</button>
              <button 
                type="submit"
                disabled={loading}
                className="flex-[2] bg-slate-900 text-white py-3.5 rounded-xl font-black text-[9px] uppercase tracking-widest hover:bg-blue-600 transition-all shadow-xl flex items-center justify-center gap-2 disabled:opacity-70"
              >
                {loading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <><Save className="w-3.5 h-3.5" /> Save Member</>}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
