"use client";

import { useState, useRef } from "react";
import { 
  Save, Loader2, Image as ImageIcon, Sparkles, Plus, Trash2, Camera, Upload,
  Users2, Zap, ShieldCheck, Award, Code2, Rocket, Heart, Star, Lightbulb, Target, Gem, Crown, HelpCircle
} from "lucide-react";
import { useToast } from "@/components/admin/Toast";

const iconOptions = [
  { name: "Users2", icon: <Users2 className="w-4 h-4" /> },
  { name: "Zap", icon: <Zap className="w-4 h-4" /> },
  { name: "ShieldCheck", icon: <ShieldCheck className="w-4 h-4" /> },
  { name: "Award", icon: <Award className="w-4 h-4" /> },
  { name: "Code2", icon: <Code2 className="w-4 h-4" /> },
  { name: "Rocket", icon: <Rocket className="w-4 h-4" /> },
  { name: "Heart", icon: <Heart className="w-4 h-4" /> },
  { name: "Star", icon: <Star className="w-4 h-4" /> },
  { name: "Lightbulb", icon: <Lightbulb className="w-4 h-4" /> },
  { name: "Target", icon: <Target className="w-4 h-4" /> },
  { name: "Gem", icon: <Gem className="w-4 h-4" /> },
  { name: "Crown", icon: <Crown className="w-4 h-4" /> },
];

export default function AboutClient({ initialData }: { initialData: any }) {
  const [loading, setLoading] = useState(false);
  const [features, setFeatures] = useState(initialData.features || []);
  const [preview, setPreview] = useState(initialData.aboutImage);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { toast } = useToast();

  const addFeature = () => {
    setFeatures([...features, { title: "", desc: "", icon: "Zap" }]);
  };

  const removeFeature = (index: number) => {
    setFeatures(features.filter((_: any, i: number) => i !== index));
  };

  const updateFeature = (index: number, field: string, value: string) => {
    const newFeatures = [...features];
    newFeatures[index] = { ...newFeatures[index], [field]: value };
    setFeatures(newFeatures);
  };

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    
    const formData = new FormData(e.currentTarget);
    formData.append("features", JSON.stringify(features));
    if (fileInputRef.current?.files?.[0]) {
      formData.append("aboutImageFile", fileInputRef.current.files[0]);
    }

    try {
      const res = await fetch("/api/settings/about", {
        method: "POST",
        body: formData, // Pake FormData karena ada upload file
      });
      const result = await res.json();
      if (result.success) toast("Profil perusahaan berhasil diperbarui!", "success");
    } catch (err) {
      toast("Gagal menyimpan perubahan.", "error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8 pb-20">
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
        {/* Left: Image Upload */}
        <div className="xl:col-span-4 space-y-6">
          <div className="bg-white rounded-3xl border border-slate-100 p-6 shadow-sm">
            <h4 className="text-slate-900 font-black uppercase tracking-widest text-[10px] mb-6 flex items-center gap-2">
              <Camera className="w-3.5 h-3.5 text-blue-600" /> Visual Utama
            </h4>
            <div 
              onClick={() => fileInputRef.current?.click()}
              className="group relative aspect-[4/3] rounded-2xl overflow-hidden bg-slate-50 border-2 border-dashed border-slate-200 cursor-pointer hover:border-blue-400 transition-all"
            >
              {preview ? (
                <img src={preview} className="w-full h-full object-cover" alt="Preview" />
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-slate-400">
                  <Upload className="w-8 h-8 mb-2" />
                  <span className="text-[10px] font-black uppercase tracking-widest">Upload Foto</span>
                </div>
              )}
              <div className="absolute inset-0 bg-blue-600/80 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center text-white transition-all">
                <Camera className="w-6 h-6 mb-2" />
                <span className="font-black text-[10px] uppercase tracking-widest">Ganti Gambar</span>
              </div>
            </div>
            <input 
              type="file" 
              ref={fileInputRef} 
              className="hidden" 
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  const reader = new FileReader();
                  reader.onloadend = () => setPreview(reader.result as string);
                  reader.readAsDataURL(file);
                }
              }}
            />
            <p className="mt-4 text-[9px] text-slate-400 font-medium leading-relaxed italic text-center uppercase tracking-tighter">
              * Rekomendasi ukuran 800x600px atau aspek rasio 4:3
            </p>
          </div>
        </div>

        {/* Right: Narrative Texts */}
        <div className="xl:col-span-8 space-y-6">
          <div className="bg-white rounded-3xl border border-slate-100 p-8 shadow-sm">
            <h4 className="text-slate-900 font-black uppercase tracking-widest text-[10px] mb-8 flex items-center gap-2 pb-4 border-b border-slate-50">
              <Sparkles className="w-3.5 h-3.5 text-blue-600" /> Narasi Perusahaan
            </h4>
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Judul Utama</label>
                <input 
                  name="aboutTitle" 
                  defaultValue={initialData.aboutTitle || ""}
                  className="w-full px-5 py-4 rounded-xl bg-slate-50 border border-slate-100 focus:border-blue-500 outline-none font-bold text-sm transition-all"
                  placeholder="Contoh: Hexanusa Digital Agency"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Deskripsi Panjang</label>
                <textarea 
                  name="aboutDesc" 
                  rows={8}
                  defaultValue={initialData.aboutDesc || ""}
                  className="w-full px-5 py-4 rounded-xl bg-slate-50 border border-slate-100 focus:border-blue-500 outline-none font-medium text-sm transition-all leading-relaxed resize-none"
                  placeholder="Ceritakan tentang sejarah dan visi perusahaan..."
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom: Features with Icon Picker */}
      <div className="bg-white rounded-3xl border border-slate-100 p-8 shadow-sm">
        <div className="flex items-center justify-between mb-10 pb-4 border-b border-slate-50">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-emerald-50 rounded-xl text-emerald-600">
              <Zap className="w-5 h-5" />
            </div>
            <h2 className="font-black text-slate-900 uppercase tracking-widest text-xs">Poin Keunggulan Strategis</h2>
          </div>
          <button 
            type="button"
            onClick={addFeature}
            className="text-[9px] font-black bg-slate-900 text-white px-5 py-2.5 rounded-lg hover:bg-blue-600 transition-all flex items-center gap-2 uppercase tracking-[0.1em]"
          >
            <Plus className="w-3 h-3" /> Tambah Poin Baru
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feat: any, idx: number) => (
            <div key={idx} className="p-8 bg-slate-50 rounded-3xl border border-slate-100 relative group transition-all hover:border-blue-200 hover:bg-white hover:shadow-xl hover:shadow-blue-900/5">
              <button 
                type="button"
                onClick={() => removeFeature(idx)}
                className="absolute top-6 right-6 p-2 text-slate-300 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
              >
                <Trash2 className="w-4 h-4" />
              </button>
              
              <div className="flex gap-6">
                {/* Icon Picker Block */}
                <div className="shrink-0 space-y-4">
                  <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-blue-600 shadow-sm border border-slate-100">
                    {/* Render Icon Dinamis */}
                    {(() => {
                      const IconComp: any = iconOptions.find(o => o.name === feat.icon)?.icon || <HelpCircle className="w-6 h-6" />;
                      return IconComp;
                    })()}
                  </div>
                  <div className="grid grid-cols-3 gap-1.5 p-1.5 bg-slate-100 rounded-xl">
                    {iconOptions.map(opt => (
                      <button
                        key={opt.name}
                        type="button"
                        onClick={() => updateFeature(idx, "icon", opt.name)}
                        className={`p-1.5 rounded-md transition-all ${feat.icon === opt.name ? "bg-blue-600 text-white shadow-md" : "hover:bg-white text-slate-400"}`}
                      >
                        <div className="scale-75">{opt.icon}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Content Block */}
                <div className="flex-grow space-y-4">
                  <div className="space-y-1">
                    <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Judul Keunggulan</label>
                    <input 
                      value={feat.title}
                      onChange={(e) => updateFeature(idx, "title", e.target.value)}
                      className="w-full bg-transparent border-b border-slate-200 focus:border-blue-600 outline-none font-black text-sm pb-1 transition-all"
                      placeholder="Judul Singkat"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Penjelasan Singkat</label>
                    <textarea 
                      value={feat.desc}
                      onChange={(e) => updateFeature(idx, "desc", e.target.value)}
                      className="w-full bg-transparent outline-none text-xs font-medium text-slate-500 leading-relaxed resize-none h-20"
                      placeholder="Jelaskan mengapa poin ini penting..."
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Save Button Floating */}
      <div className="flex justify-end sticky bottom-8 z-50">
        <button 
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 text-white px-12 py-5 rounded-2xl font-black text-[11px] uppercase tracking-[0.2em] shadow-[0_20px_50px_rgba(37,99,235,0.3)] transition-all flex items-center gap-4 active:scale-95 disabled:opacity-70"
        >
          {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
          Simpan Profil Perusahaan
        </button>
      </div>
    </form>
  );
}