"use client";

import { useState, useRef } from "react";
import { Save, Loader2, Phone, Share2, Mail, MapPin, Instagram, Linkedin, Github, Globe, Map, Camera, Upload, Briefcase, Type } from "lucide-react";
import { useToast } from "@/components/admin/Toast";

export default function SettingsClient({ initialData }: { initialData: any }) {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    ...initialData,
    companyName: initialData.companyName || "",
    contactEmail: initialData.contactEmail || "",
    contactPhone: initialData.contactPhone || "",
    contactAddress: initialData.contactAddress || "",
    contactMaps: initialData.contactMaps || "",
    socialIg: initialData.socialIg || "",
    socialLi: initialData.socialLi || "",
    socialGh: initialData.socialGh || "",
  });
  const [logoPreview, setLogoPreview] = useState(initialData.siteLogo);
  const [iconPreview, setIconPreview] = useState(initialData.siteIcon);
  
  const logoInputRef = useRef<HTMLInputElement>(null);
  const iconInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    const data = new FormData();
    data.append("companyName", formData.companyName || "");
    data.append("contactEmail", formData.contactEmail || "");
    data.append("contactPhone", formData.contactPhone || "");
    data.append("contactAddress", formData.contactAddress || "");
    data.append("contactMaps", formData.contactMaps || "");
    data.append("socialIg", formData.socialIg || "");
    data.append("socialLi", formData.socialLi || "");
    data.append("socialGh", formData.socialGh || "");
    
    if (logoInputRef.current?.files?.[0]) data.append("logoFile", logoInputRef.current.files[0]);
    if (iconInputRef.current?.files?.[0]) data.append("iconFile", iconInputRef.current.files[0]);

    try {
      const res = await fetch('/api/settings', { method: 'POST', body: data });
      const result = await res.json();
      if (result.success) toast("Pengaturan umum berhasil disimpan!", "success");
    } catch (error) {
      toast("Terjadi kesalahan sistem.", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 pb-20">
      {/* Group: Identitas Perusahaan */}
      <div className="bg-white rounded-3xl border border-slate-100 p-8 shadow-sm">
        <div className="flex items-center gap-3 mb-10 pb-4 border-b border-slate-50">
          <div className="p-2 bg-blue-50 rounded-xl text-blue-600">
            <Briefcase className="w-5 h-5" />
          </div>
          <h2 className="font-black text-slate-900 uppercase tracking-widest text-xs">Identitas Core</h2>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-12 gap-10">
          {/* Logo Landscape */}
          <div className="xl:col-span-5 space-y-4">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Logo Utama (Landscape)</label>
            <div 
              onClick={() => logoInputRef.current?.click()}
              className="group relative aspect-[3/1] rounded-2xl overflow-hidden bg-slate-50 border-2 border-dashed border-slate-200 cursor-pointer hover:border-blue-400 transition-all flex items-center justify-center"
            >
              {logoPreview ? (
                <img src={logoPreview} className="max-h-[80%] max-w-[80%] object-contain" alt="Logo Landscape" />
              ) : (
                <div className="flex flex-col items-center justify-center text-slate-400">
                  <Upload className="w-6 h-6 mb-2" />
                  <span className="text-[9px] font-black uppercase tracking-widest">Full Logo</span>
                </div>
              )}
              <div className="absolute inset-0 bg-slate-900/80 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center text-white transition-all">
                <Camera className="w-5 h-5 mb-1" />
                <span className="font-black text-[8px] uppercase tracking-widest">Update Landscape</span>
              </div>
            </div>
            <input type="file" ref={logoInputRef} className="hidden" accept="image/*" onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                const r = new FileReader(); r.onloadend = () => setLogoPreview(r.result as string); r.readAsDataURL(file);
              }
            }} />
          </div>

          {/* Logo Icon 1:1 */}
          <div className="xl:col-span-3 space-y-4">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Icon Logo (1:1)</label>
            <div 
              onClick={() => iconInputRef.current?.click()}
              className="group relative aspect-square w-full max-w-[120px] mx-auto rounded-2xl overflow-hidden bg-slate-50 border-2 border-dashed border-slate-200 cursor-pointer hover:border-blue-400 transition-all flex items-center justify-center"
            >
              {iconPreview ? (
                <img src={iconPreview} className="max-h-[70%] max-w-[70%] object-contain" alt="Icon Logo" />
              ) : (
                <div className="flex flex-col items-center justify-center text-slate-400 text-center px-2">
                  <Upload className="w-5 h-5 mb-1" />
                  <span className="text-[8px] font-black uppercase tracking-tighter leading-tight">Square Icon</span>
                </div>
              )}
              <div className="absolute inset-0 bg-slate-900/80 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white transition-all">
                <Camera className="w-4 h-4" />
              </div>
            </div>
            <input type="file" ref={iconInputRef} className="hidden" accept="image/*" onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                const r = new FileReader(); r.onloadend = () => setIconPreview(r.result as string); r.readAsDataURL(file);
              }
            }} />
          </div>

          {/* Company Name */}
          <div className="xl:col-span-4 space-y-4">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Nama Perusahaan</label>
            <div className="flex items-center bg-slate-50 border border-slate-100 rounded-2xl px-5 focus-within:border-blue-500 transition-all shadow-inner">
              <Type className="w-4 h-4 text-slate-400" />
              <input 
                type="text"
                value={formData.companyName}
                onChange={(e) => setFormData({...formData, companyName: e.target.value})}
                className="w-full bg-transparent border-none py-5 px-4 outline-none font-black text-base"
                placeholder="Hexanusa Digital"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Group: Informasi Kontak */}
      <div className="bg-white rounded-3xl border border-slate-100 p-8 shadow-sm">
        <div className="flex items-center gap-3 mb-8 pb-4 border-b border-slate-50">
          <div className="p-2 bg-indigo-50 rounded-xl text-indigo-600">
            <Phone className="w-5 h-5" />
          </div>
          <h2 className="font-black text-slate-900 uppercase tracking-widest text-xs">Informasi Kontak</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Email Perusahaan</label>
            <div className="flex items-center bg-slate-50 rounded-2xl border border-slate-100 px-4 focus-within:border-blue-500 transition-all">
              <Mail className="w-4 h-4 text-slate-400" />
              <input 
                type="email"
                value={formData.contactEmail}
                onChange={(e) => setFormData({...formData, contactEmail: e.target.value})}
                className="w-full bg-transparent border-none py-4 px-3 outline-none font-bold text-sm"
              />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Nomor WhatsApp</label>
            <div className="flex items-center bg-slate-50 rounded-2xl border border-slate-100 px-4 focus-within:border-blue-500 transition-all">
              <Phone className="w-4 h-4 text-slate-400" />
              <input 
                type="text"
                value={formData.contactPhone}
                onChange={(e) => setFormData({...formData, contactPhone: e.target.value})}
                className="w-full bg-transparent border-none py-4 px-3 outline-none font-bold text-sm"
              />
            </div>
          </div>
          <div className="md:col-span-2 space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Alamat Lengkap Kantor</label>
            <textarea 
              rows={3}
              value={formData.contactAddress}
              onChange={(e) => setFormData({...formData, contactAddress: e.target.value})}
              className="w-full bg-slate-50 rounded-2xl border border-slate-100 p-5 outline-none font-medium text-sm focus:border-blue-500 transition-all resize-none"
            />
          </div>
        </div>
      </div>

      {/* Group: Lokasi & Maps */}
      <div className="bg-white rounded-3xl border border-slate-100 p-8 shadow-sm">
        <div className="flex items-center gap-3 mb-8 pb-4 border-b border-slate-50">
          <div className="p-2 bg-slate-900 rounded-xl text-white">
            <Map className="w-5 h-5" />
          </div>
          <h2 className="font-black text-slate-900 uppercase tracking-widest text-xs">Lokasi & Maps</h2>
        </div>
        <div className="space-y-4">
          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Google Maps Embed Link (URL Src)</label>
          <input 
            type="text"
            value={formData.contactMaps}
            onChange={(e) => setFormData({...formData, contactMaps: e.target.value})}
            className="w-full bg-slate-900 text-blue-300 font-mono text-[10px] p-5 rounded-2xl outline-none focus:ring-4 focus:ring-blue-500/10 transition-all"
            placeholder="https://google.com/maps/embed/..."
          />
        </div>
      </div>

      {/* Group: Sosial Media */}
      <div className="bg-white rounded-3xl border border-slate-100 p-8 shadow-sm">
        <div className="flex items-center gap-3 mb-8 pb-4 border-b border-slate-50">
          <div className="p-2 bg-rose-50 rounded-xl text-rose-600">
            <Share2 className="w-5 h-5" />
          </div>
          <h2 className="font-black text-slate-900 uppercase tracking-widest text-xs">Jejaring Sosial</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Instagram URL</label>
            <div className="flex items-center bg-slate-50 rounded-2xl border border-slate-100 px-4 focus-within:border-blue-500 transition-all">
              <Instagram className="w-4 h-4 text-pink-600" />
              <input 
                type="text"
                value={formData.socialIg}
                onChange={(e) => setFormData({...formData, socialIg: e.target.value})}
                className="w-full bg-transparent border-none py-4 px-3 outline-none font-bold text-sm"
              />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">LinkedIn URL</label>
            <div className="flex items-center bg-slate-50 rounded-2xl border border-slate-100 px-4 focus-within:border-blue-500 transition-all">
              <Linkedin className="w-4 h-4 text-blue-600" />
              <input 
                type="text"
                value={formData.socialLi}
                onChange={(e) => setFormData({...formData, socialLi: e.target.value})}
                className="w-full bg-transparent border-none py-4 px-3 outline-none font-bold text-sm"
              />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">GitHub URL</label>
            <div className="flex items-center bg-slate-50 rounded-2xl border border-slate-100 px-4 focus-within:border-blue-500 transition-all">
              <Github className="w-4 h-4 text-slate-900" />
              <input 
                type="text"
                value={formData.socialGh}
                onChange={(e) => setFormData({...formData, socialGh: e.target.value})}
                className="w-full bg-transparent border-none py-4 px-3 outline-none font-bold text-sm"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Save Button Floating */}
      <div className="flex justify-end sticky bottom-8 z-50">
        <button 
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 text-white px-12 py-5 rounded-2xl font-black text-[11px] uppercase tracking-[0.2em] shadow-[0_20px_50px_rgba(37,99,235,0.3)] transition-all flex items-center gap-4 active:scale-95 disabled:opacity-70"
        >
          {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
          Simpan Pengaturan Umum
        </button>
      </div>
    </form>
  );
}