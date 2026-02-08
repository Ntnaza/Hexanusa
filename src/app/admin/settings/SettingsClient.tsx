"use client";

import { useState, useRef } from "react";
import { 
  Save, Loader2, Info, Phone, Share2, Mail, MapPin, Instagram, Linkedin, Github, 
  Globe, Upload, Camera, Users2, Zap, ShieldCheck, Award, Code2, Rocket, 
  Heart, Star, Lightbulb, Target, Shield, Zap as Bolt, CheckCircle2,
  HelpCircle, MessageCircle, Gem, Crown
} from "lucide-react";

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

export default function SettingsClient({ initialData }: { initialData: any }) {
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("about");
  const [formData, setFormData] = useState(initialData);
  const [preview, setPreview] = useState(initialData.aboutImage);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    const data = new FormData();
    data.append("heroTitle", formData.heroTitle || "");
    data.append("heroDesc", formData.heroDesc || "");
    data.append("aboutTitle", formData.aboutTitle);
    data.append("aboutDesc", formData.aboutDesc);
    data.append("aboutImage", formData.aboutImage);
    data.append("contactEmail", formData.contactEmail);
    data.append("contactPhone", formData.contactPhone);
    data.append("contactAddress", formData.contactAddress);
    data.append("contactMaps", formData.contactMaps);
    data.append("socialIg", formData.socialIg || "");
    data.append("socialLi", formData.socialLi || "");
    data.append("socialGh", formData.socialGh || "");
    data.append("features", JSON.stringify(formData.features || []));
    
    if (fileInputRef.current?.files?.[0]) {
      data.append("aboutImageFile", fileInputRef.current.files[0]);
    }

    try {
      const res = await fetch('/api/settings', { method: 'POST', body: data });
      const result = await res.json();
      if (result.success) {
        alert("Pengaturan berhasil disimpan!");
      }
    } catch (error) {
      alert("Terjadi kesalahan koneksi.");
    } finally {
      setLoading(false);
    }
  };

  const updateFeature = (index: number, field: string, value: string) => {
    const newFeatures = [...formData.features];
    newFeatures[index] = { ...newFeatures[index], [field]: value };
    setFormData({ ...formData, features: newFeatures });
  };

  const tabs = [
    { id: "about", name: "Tentang Kami", icon: <Info className="w-4 h-4" /> },
    { id: "contact", name: "Kontak & Maps", icon: <Phone className="w-4 h-4" /> },
    { id: "social", name: "Sosial Media", icon: <Share2 className="w-4 h-4" /> },
  ];

  return (
    <div className="flex flex-col gap-8">
      {/* Horizontal Tabs di Atas */}
      <div className="flex flex-wrap items-center gap-3 bg-white/50 p-2 rounded-[30px] border border-slate-100 self-start">
        {tabs.map(tab => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-3 px-10 py-4 rounded-[24px] font-black text-xs uppercase tracking-[0.15em] transition-all ${
              activeTab === tab.id 
                ? "bg-blue-600 text-white shadow-xl shadow-blue-200 scale-105" 
                : "text-slate-400 hover:text-slate-600 hover:bg-white"
            }`}
          >
            {tab.icon} {tab.name}
          </button>
        ))}
      </div>

      {/* Main Content Area - Sekarang Full Width */}
      <div className="bg-slate-50 rounded-[40px] shadow-2xl shadow-slate-200/50 border border-white overflow-hidden">
        <form onSubmit={handleSubmit} className="flex flex-col h-[78vh]">
          
          <div className="flex-grow overflow-y-auto p-8 lg:p-14 space-y-16 custom-scrollbar bg-white/40 backdrop-blur-sm">
            
            {activeTab === "about" && (
              <div className="space-y-16 animate-in fade-in slide-in-from-right-4 duration-500">
                {/* Visual Header Admin */}
                <div className="flex flex-col xl:flex-row gap-16">
                  {/* Bagian Gambar (Mirroring Frontend) */}
                  <div className="xl:w-2/5 space-y-6">
                    <div>
                      <h4 className="text-blue-600 font-bold uppercase tracking-widest text-[10px] mb-4">Visual Utama</h4>
                      <div 
                        onClick={() => fileInputRef.current?.click()} 
                        className="group relative aspect-[4/3] rounded-[40px] overflow-hidden bg-slate-100 border-4 border-white shadow-xl cursor-pointer hover:scale-[1.02] transition-all duration-500"
                      >
                        {preview ? (
                          <img src={preview} className="w-full h-full object-cover" alt="Preview" />
                        ) : (
                          <div className="flex flex-col items-center justify-center h-full text-slate-400">
                            <Camera className="w-12 h-12 mb-2" />
                            <span className="text-[10px] font-black uppercase tracking-widest">Upload Foto</span>
                          </div>
                        )}
                        <div className="absolute inset-0 bg-blue-600/80 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center text-white transition-opacity duration-500">
                          <Upload className="w-8 h-8 mb-2" />
                          <span className="font-black text-xs uppercase tracking-[0.2em]">Ganti Gambar</span>
                        </div>
                      </div>
                      <input 
                        type="file" 
                        ref={fileInputRef} 
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            const reader = new FileReader();
                            reader.onloadend = () => setPreview(reader.result as string);
                            reader.readAsDataURL(file);
                          }
                        }} 
                        accept="image/*" 
                        className="hidden" 
                      />
                    </div>
                  </div>

                  {/* Bagian Teks (Mirroring Frontend) */}
                  <div className="xl:w-3/5 space-y-10">
                    <div className="space-y-4">
                      <label className="text-blue-600 font-bold uppercase tracking-widest text-[10px] block">Narasi Tentang Kami</label>
                      <input 
                        type="text" 
                        placeholder="Judul Besar (e.g. Solusi Digital Terbaik)"
                        value={formData.aboutTitle} 
                        onChange={(e) => setFormData({...formData, aboutTitle: e.target.value})} 
                        className="w-full text-2xl font-black text-slate-900 bg-transparent border-b-2 border-slate-100 focus:border-blue-600 outline-none pb-4 transition-all placeholder:text-slate-200"
                      />
                      <textarea 
                        rows={6} 
                        placeholder="Deskripsi panjang mengenai perusahaan anda..."
                        value={formData.aboutDesc} 
                        onChange={(e) => setFormData({...formData, aboutDesc: e.target.value})} 
                        className="w-full text-sm font-medium text-slate-600 bg-slate-50/50 rounded-[24px] p-6 focus:bg-white focus:ring-4 focus:ring-blue-50 outline-none transition-all leading-relaxed resize-none shadow-inner border border-white"
                      />
                    </div>
                  </div>
                </div>

                {/* Bagian Fitur Keunggulan */}
                <div className="pt-16 border-t border-slate-100">
                  <div className="mb-10">
                    <h3 className="text-blue-600 font-bold uppercase tracking-widest text-[10px] mb-2">Poin Unggulan</h3>
                    <h2 className="text-xl font-black text-slate-900 uppercase tracking-tight">4 Pilar Kekuatan Hexanusa</h2>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {(formData.features || []).map((f: any, index: number) => (
                      <div key={index} className="group p-8 bg-white rounded-[32px] border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-blue-900/5 transition-all duration-500">
                        <div className="flex gap-6">
                          {/* Ikon Selector */}
                          <div className="space-y-4">
                            <div className="w-16 h-16 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all duration-500 shadow-sm">
                              {iconOptions.find(opt => opt.name === f.icon)?.icon || <HelpCircle className="w-8 h-8" />}
                            </div>
                            <div className="grid grid-cols-4 gap-2">
                              {iconOptions.map(opt => (
                                <button
                                  key={opt.name}
                                  type="button"
                                  onClick={() => updateFeature(index, "icon", opt.name)}
                                  className={`p-1.5 rounded-lg transition-all ${f.icon === opt.name ? "bg-blue-600 text-white" : "bg-slate-50 text-slate-300 hover:bg-slate-100"}`}
                                  title={opt.name}
                                >
                                  {opt.icon}
                                </button>
                              ))}
                            </div>
                          </div>

                          {/* Konten Selector */}
                          <div className="flex-grow space-y-4">
                            <div className="space-y-2">
                              <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Judul Poin {index + 1}</label>
                              <input 
                                type="text" 
                                value={f.title} 
                                onChange={(e) => updateFeature(index, "title", e.target.value)} 
                                className="w-full text-sm font-black text-slate-900 uppercase tracking-tight bg-transparent border-b border-slate-100 focus:border-blue-600 outline-none pb-1 transition-all"
                              />
                            </div>
                            <div className="space-y-2">
                              <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Keterangan Singkat</label>
                              <textarea 
                                rows={2} 
                                value={f.desc} 
                                onChange={(e) => updateFeature(index, "desc", e.target.value)} 
                                className="w-full text-[11px] font-bold text-slate-500 bg-slate-50 rounded-xl p-3 focus:bg-white outline-none transition-all leading-relaxed resize-none border border-transparent focus:border-slate-100"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === "contact" && (
              <div className="space-y-12 animate-in fade-in slide-in-from-right-4 duration-500">
                <div className="mb-10">
                  <h3 className="text-blue-600 font-bold uppercase tracking-widest text-[10px] mb-2">Informasi Publik</h3>
                  <h2 className="text-xl font-black text-slate-900 uppercase tracking-tight">Kontak & Lokasi Kantor</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Card Email */}
                  <div className="p-8 bg-white rounded-[32px] border border-slate-100 shadow-sm flex gap-6 items-start group hover:border-blue-200 transition-all">
                    <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all duration-500 shadow-sm">
                      <Mail className="w-6 h-6" />
                    </div>
                    <div className="flex-grow space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Email Perusahaan</label>
                      <input 
                        type="email" 
                        value={formData.contactEmail} 
                        onChange={(e) => setFormData({...formData, contactEmail: e.target.value})} 
                        className="w-full text-sm font-bold text-slate-900 bg-transparent border-b border-slate-50 focus:border-blue-600 outline-none pb-1 transition-all"
                      />
                    </div>
                  </div>

                  {/* Card Telepon */}
                  <div className="p-8 bg-white rounded-[32px] border border-slate-100 shadow-sm flex gap-6 items-start group hover:border-blue-200 transition-all">
                    <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all duration-500 shadow-sm">
                      <Phone className="w-6 h-6" />
                    </div>
                    <div className="flex-grow space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Nomor WhatsApp/Telp</label>
                      <input 
                        type="text" 
                        value={formData.contactPhone} 
                        onChange={(e) => setFormData({...formData, contactPhone: e.target.value})} 
                        className="w-full text-sm font-bold text-slate-900 bg-transparent border-b border-slate-50 focus:border-blue-600 outline-none pb-1 transition-all"
                      />
                    </div>
                  </div>

                  {/* Card Alamat */}
                  <div className="md:col-span-2 p-8 bg-white rounded-[32px] border border-slate-100 shadow-sm flex gap-6 items-start group hover:border-blue-200 transition-all">
                    <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all duration-500 shadow-sm">
                      <MapPin className="w-6 h-6" />
                    </div>
                    <div className="flex-grow space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Alamat Fisik Kantor</label>
                      <textarea 
                        rows={3}
                        value={formData.contactAddress} 
                        onChange={(e) => setFormData({...formData, contactAddress: e.target.value})} 
                        className="w-full text-sm font-bold text-slate-900 bg-slate-50/50 rounded-2xl p-4 focus:bg-white focus:ring-4 focus:ring-blue-50 outline-none transition-all resize-none border border-transparent focus:border-slate-100"
                      />
                    </div>
                  </div>

                  {/* Card Maps */}
                  <div className="md:col-span-2 p-8 bg-slate-900 rounded-[32px] shadow-2xl flex gap-6 items-start group">
                    <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center text-blue-400 shadow-sm">
                      <Globe className="w-6 h-6" />
                    </div>
                    <div className="flex-grow space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Google Maps Embed Link (Src Only)</label>
                      <textarea 
                        rows={3}
                        value={formData.contactMaps} 
                        onChange={(e) => setFormData({...formData, contactMaps: e.target.value})} 
                        className="w-full text-[10px] font-mono text-blue-200 bg-white/5 rounded-2xl p-4 focus:bg-white/10 outline-none transition-all resize-none border border-white/10"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "social" && (
              <div className="space-y-12 animate-in fade-in slide-in-from-right-4 duration-500 max-w-3xl">
                <div className="mb-10">
                  <h3 className="text-blue-600 font-bold uppercase tracking-widest text-[10px] mb-2">Jejaring Sosial</h3>
                  <h2 className="text-xl font-black text-slate-900 uppercase tracking-tight">Social Media Presence</h2>
                </div>

                <div className="space-y-6">
                  {[
                    { id: 'socialIg', label: 'Instagram Profile', icon: <Instagram className="w-6 h-6" />, color: 'bg-pink-50 text-pink-600', hover: 'group-hover:bg-pink-600' },
                    { id: 'socialLi', label: 'LinkedIn Page', icon: <Linkedin className="w-6 h-6" />, color: 'bg-blue-50 text-blue-600', hover: 'group-hover:bg-blue-600' },
                    { id: 'socialGh', label: 'Github Repository', icon: <Github className="w-6 h-6" />, color: 'bg-slate-100 text-slate-900', hover: 'group-hover:bg-slate-900' }
                  ].map((item) => (
                    <div key={item.id} className="group flex items-center gap-8 p-8 bg-white rounded-[40px] border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-blue-900/5 transition-all duration-500">
                      <div className={`w-16 h-16 rounded-2xl ${item.color} flex items-center justify-center group-hover:text-white ${item.hover} transition-all duration-500 shadow-sm`}>
                        {item.icon}
                      </div>
                      <div className="flex-grow space-y-1">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{item.label}</label>
                        <input 
                          type="text" 
                          value={(formData as any)[item.id] || ""} 
                          onChange={(e) => setFormData({...formData, [item.id]: e.target.value})} 
                          className="w-full bg-transparent border-none focus:ring-0 text-base font-black text-slate-900 p-0 placeholder:text-slate-200" 
                          placeholder="https://link-akun-anda.com/username"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

          {/* Footer Save Button */}
          <div className="p-8 lg:p-10 border-t border-white bg-white/60 backdrop-blur-md flex justify-end">
            <button 
              type="submit" 
              disabled={loading} 
              className="group relative bg-slate-900 text-white px-12 py-5 rounded-full font-black text-[11px] uppercase tracking-[0.3em] overflow-hidden transition-all hover:bg-blue-600 hover:shadow-2xl hover:shadow-blue-200 active:scale-95 disabled:opacity-70"
            >
              <div className="relative z-10 flex items-center gap-4">
                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <><Save className="w-5 h-5 transition-transform group-hover:rotate-12" /> SIMPAN PERUBAHAN</>}
              </div>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
