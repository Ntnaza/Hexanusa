"use client";

import { useState, useEffect } from "react";
import { X, Globe, Smartphone, Cpu, Cloud, Rocket, Code2, Save, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { saveService } from "./actions";
import { useToast } from "@/components/admin/Toast";

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
      await saveService(formData);
      toast(`Layanan berhasil ${initialData ? 'diperbarui' : 'ditambahkan'}!`, "success");
      onClose();
    } catch (error) {
      toast("Gagal menyimpan data layanan.", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[300] flex items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-slate-950/60 backdrop-blur-md"
        />

        <motion.div 
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative bg-white w-full max-w-lg rounded-[32px] shadow-2xl overflow-hidden"
        >
          <div className="px-8 py-6 border-b border-slate-50 flex justify-between items-center bg-slate-50/50">
            <div>
              <h2 className="text-lg font-black text-slate-900 tracking-tight">{initialData ? "Edit Layanan" : "Tambah Layanan"}</h2>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-0.5">Konfigurasi Data Layanan</p>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-white rounded-full transition-all border border-transparent hover:border-slate-100">
              <X className="w-5 h-5 text-slate-400" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="p-8 space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Nama Layanan</label>
              <input 
                type="text" 
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                className="w-full px-5 py-3.5 rounded-xl bg-slate-50 border border-slate-100 focus:outline-none focus:border-blue-600 focus:bg-white transition-all text-sm font-bold shadow-inner"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Deskripsi Detail</label>
              <textarea 
                rows={3}
                value={formData.desc}
                onChange={(e) => setFormData({...formData, desc: e.target.value})}
                className="w-full px-5 py-3.5 rounded-xl bg-slate-50 border border-slate-100 focus:outline-none focus:border-blue-600 focus:bg-white transition-all text-sm font-medium resize-none shadow-inner"
                required
              ></textarea>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-3">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Pilih Ikon</label>
                <div className="grid grid-cols-3 gap-2">
                  {icons.map((item) => (
                    <button
                      key={item.name}
                      type="button"
                      onClick={() => setFormData({...formData, iconName: item.name})}
                      className={`p-2.5 rounded-lg flex items-center justify-center transition-all border ${
                        formData.iconName === item.name 
                        ? "bg-blue-600 text-white border-blue-600 shadow-md" 
                        : "bg-white text-slate-400 border-slate-100 hover:border-slate-300"
                      }`}
                    >
                      <div className="scale-90">{item.icon}</div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Aksen Warna</label>
                <div className="flex gap-3 mt-1 px-1">
                  <button
                    type="button"
                    onClick={() => setFormData({...formData, color: "blue"})}
                    className={`w-8 h-8 rounded-full bg-blue-600 border-4 transition-all ${formData.color === "blue" ? "border-blue-100 scale-110 shadow-lg shadow-blue-200" : "border-transparent opacity-40"}`}
                  />
                  <button
                    type="button"
                    onClick={() => setFormData({...formData, color: "indigo"})}
                    className={`w-8 h-8 rounded-full bg-indigo-600 border-4 transition-all ${formData.color === "indigo" ? "border-indigo-100 scale-110 shadow-lg shadow-indigo-200" : "border-transparent opacity-40"}`}
                  />
                </div>
              </div>
            </div>

            <div className="pt-4 flex gap-3">
              <button type="button" onClick={onClose} className="flex-1 py-4 rounded-xl font-black text-[10px] uppercase tracking-widest text-slate-400 bg-slate-50 hover:bg-slate-100 transition-all">Batal</button>
              <button 
                type="submit"
                disabled={loading}
                className="flex-[2] bg-slate-900 text-white py-4 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-blue-600 transition-all shadow-xl flex items-center justify-center gap-2 disabled:opacity-70"
              >
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <><Save className="w-4 h-4" /> Simpan Data</>}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
