"use client";

import { useState, useEffect } from "react";
import { X, Globe, Smartphone, Cpu, Cloud, Rocket, Code2, HelpCircle, Save, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { saveService } from "./actions";

const icons = [
  { name: "Globe", icon: <Globe className="w-5 h-5" /> },
  { name: "Smartphone", icon: <Smartphone className="w-5 h-5" /> },
  { name: "Cpu", icon: <Cpu className="w-5 h-5" /> },
  { name: "Cloud", icon: <Cloud className="w-5 h-5" /> },
  { name: "Rocket", icon: <Rocket className="w-5 h-5" /> },
  { name: "Code2", icon: <Code2 className="w-5 h-5" /> },
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
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    desc: "",
    iconName: "Globe",
    color: "blue"
  });

  // Update form saat data awal berubah (untuk Edit)
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
      await saveService(formData);
      onClose();
    } catch (error) {
      console.error("Gagal menyimpan:", error);
      alert("Terjadi kesalahan saat menyimpan data.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
        />

        <motion.div 
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative bg-white w-full max-w-xl rounded-[40px] shadow-2xl overflow-hidden"
        >
          <div className="p-8 border-b border-slate-50 flex justify-between items-center">
            <div>
              <h2 className="text-xl font-black text-slate-900">{initialData ? "Edit Layanan" : "Tambah Layanan"}</h2>
              <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-1">Lengkapi data layanan Anda</p>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
              <X className="w-6 h-6 text-slate-400" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="p-8 space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Nama Layanan</label>
              <input 
                type="text" 
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                placeholder="Misal: Web Development"
                className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:outline-none focus:border-blue-600 focus:bg-white transition-all text-sm font-medium"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Deskripsi Singkat</label>
              <textarea 
                rows={3}
                value={formData.desc}
                onChange={(e) => setFormData({...formData, desc: e.target.value})}
                placeholder="Jelaskan secara singkat layanan ini..."
                className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:outline-none focus:border-blue-600 focus:bg-white transition-all text-sm font-medium resize-none"
                required
              ></textarea>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-3">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Pilih Ikon</label>
                <div className="grid grid-cols-3 gap-2">
                  {icons.map((item) => (
                    <button
                      key={item.name}
                      type="button"
                      onClick={() => setFormData({...formData, iconName: item.name})}
                      className={`p-3 rounded-xl flex items-center justify-center transition-all ${
                        formData.iconName === item.name 
                        ? "bg-blue-600 text-white shadow-lg shadow-blue-200" 
                        : "bg-slate-50 text-slate-400 hover:bg-slate-100"
                      }`}
                    >
                      {item.icon}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Warna Tema</label>
                <div className="flex gap-3 mt-1">
                  <button
                    type="button"
                    onClick={() => setFormData({...formData, color: "blue"})}
                    className={`w-10 h-10 rounded-full bg-blue-600 border-4 transition-all ${formData.color === "blue" ? "border-blue-200 scale-110" : "border-transparent opacity-50"}`}
                  />
                  <button
                    type="button"
                    onClick={() => setFormData({...formData, color: "indigo"})}
                    className={`w-10 h-10 rounded-full bg-indigo-600 border-4 transition-all ${formData.color === "indigo" ? "border-indigo-200 scale-110" : "border-transparent opacity-50"}`}
                  />
                </div>
              </div>
            </div>

            <div className="pt-4 flex gap-4">
              <button 
                type="button"
                onClick={onClose}
                className="flex-1 px-8 py-4 rounded-2xl font-bold text-sm text-slate-500 bg-slate-50 hover:bg-slate-100 transition-all"
              >
                Batal
              </button>
              <button 
                type="submit"
                disabled={loading}
                className="flex-[2] bg-slate-900 text-white px-8 py-4 rounded-2xl font-bold text-sm hover:bg-blue-600 transition-all shadow-xl flex items-center justify-center gap-2 disabled:opacity-70"
              >
                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <><Save className="w-5 h-5" /> Simpan Perubahan</>}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}