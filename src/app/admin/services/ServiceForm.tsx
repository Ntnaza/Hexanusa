"use client";

import { useState, useEffect } from "react";
import { X, Globe, Smartphone, Cpu, Cloud, Rocket, Code2, Save, Loader2, Type, AlignLeft, Palette, Stars } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useToast } from "@/components/admin/Toast";

const icons = [
  { name: "Globe", icon: <Globe className="w-4 h-4" /> },
  { name: "Smartphone", icon: <Smartphone className="w-4 h-4" /> },
  { name: "Cpu", icon: <Cpu className="w-4 h-4" /> },
  { name: "Cloud", icon: <Cloud className="w-4 h-4" /> },
  { name: "Rocket", icon: <Rocket className="w-4 h-4" /> },
  { name: "Code2", icon: <Code2 className="w-4 h-4" /> },
];

export default function ServiceForm({ 
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
  const [formData, setFormData] = useState({
    title: "",
    desc: "",
    iconName: "Globe",
    color: "blue"
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        ...initialData,
        title: initialData.title || "",
        desc: initialData.desc || "",
        iconName: initialData.iconName || "Globe",
        color: initialData.color || "blue"
      });
    } else {
      setFormData({
        title: "",
        desc: "",
        iconName: "Globe",
        color: "blue"
      });
    }
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/services", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const result = await res.json();
      
      if (result.success) {
        toast(`Layanan berhasil ${initialData ? 'diperbarui' : 'ditambahkan'}!`, "success");
        onClose();
      } else {
        throw new Error(result.error);
      }
    } catch (error) {
      toast("Gagal menyimpan data layanan.", "error");
    } finally {
      setLoading(false);
    }
  };

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
          className="relative bg-white w-full max-w-md rounded-[28px] shadow-2xl overflow-hidden border border-slate-50"
        >
          {/* Compact Header */}
          <div className="px-8 py-5 border-b border-slate-50 flex justify-between items-center bg-slate-50/30">
            <div>
              <h2 className="text-sm font-black text-slate-900 uppercase tracking-widest">{initialData ? "Edit Service" : "New Service"}</h2>
            </div>
            <button onClick={onClose} className="p-1.5 hover:bg-white rounded-lg transition-all text-slate-300 hover:text-slate-600 border border-transparent hover:border-slate-100">
              <X className="w-4 h-4" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="p-8 space-y-6">
            {/* Nama Layanan */}
            <div className="space-y-2">
              <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Service Title</label>
              <input 
                type="text" 
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                placeholder="Misal: Cloud Infrastructure"
                className="w-full px-5 py-3 rounded-xl bg-slate-50 border border-slate-100 focus:outline-none focus:border-blue-600 focus:bg-white transition-all text-xs font-bold shadow-inner"
                required
              />
            </div>

            {/* Deskripsi */}
            <div className="space-y-2">
              <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Brief Description</label>
              <textarea 
                rows={3}
                value={formData.desc}
                onChange={(e) => setFormData({...formData, desc: e.target.value})}
                placeholder="Jelaskan inti layanan ini..."
                className="w-full px-5 py-3 rounded-xl bg-slate-50 border border-slate-100 focus:outline-none focus:border-blue-600 focus:bg-white transition-all text-xs font-medium resize-none shadow-inner"
                required
              ></textarea>
            </div>

            {/* Ikon & Warna (Side by Side) */}
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-3">
                <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Icon Visual</label>
                <div className="grid grid-cols-3 gap-1.5">
                  {icons.map((item) => (
                    <button
                      key={item.name}
                      type="button"
                      onClick={() => setFormData({...formData, iconName: item.name})}
                      className={`p-2 rounded-lg flex items-center justify-center transition-all border ${
                        formData.iconName === item.name 
                        ? "bg-slate-900 text-white border-slate-900 shadow-md" 
                        : "bg-white text-slate-300 border-slate-100 hover:border-slate-200"
                      }`}
                    >
                      {item.icon}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Accent Theme</label>
                <div className="flex gap-2.5 pt-1">
                  <button
                    type="button"
                    onClick={() => setFormData({...formData, color: "blue"})}
                    className={`w-8 h-8 rounded-lg bg-blue-600 border-4 transition-all ${formData.color === "blue" ? "border-blue-100 shadow-lg" : "border-transparent opacity-30"}`}
                  />
                  <button
                    type="button"
                    onClick={() => setFormData({...formData, color: "indigo"})}
                    className={`w-8 h-8 rounded-lg bg-indigo-600 border-4 transition-all ${formData.color === "indigo" ? "border-indigo-100 shadow-lg" : "border-transparent opacity-30"}`}
                  />
                </div>
              </div>
            </div>

            {/* Buttons */}
            <div className="pt-4 flex gap-3">
              <button 
                type="button" 
                onClick={onClose} 
                className="flex-1 py-3.5 rounded-xl font-black text-[9px] uppercase tracking-widest text-slate-400 bg-slate-50 hover:bg-slate-100 transition-all"
              >
                Cancel
              </button>
              <button 
                type="submit"
                disabled={loading}
                className="flex-[2] bg-slate-900 text-white py-3.5 rounded-xl font-black text-[9px] uppercase tracking-widest hover:bg-blue-600 transition-all shadow-xl flex items-center justify-center gap-2 disabled:opacity-70"
              >
                {loading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <><Save className="w-3.5 h-3.5" /> Save Data</>}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
