"use client";

import { useState } from "react";
import { Plus, Trash2, Edit2, User, MessageSquare, Briefcase, Camera, Loader2, Save, X } from "lucide-react";
import { useToast } from "@/components/admin/Toast";

export default function TestimonialsClient({ initialData }: { initialData: any[] }) {
  const { toast } = useToast();
  const [testimonials, setTestimonials] = useState(initialData);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);

  const [formData, setFormData] = useState({
    name: "",
    role: "",
    content: "",
    order: 0,
    imageFile: null as File | null,
    imageUrl: ""
  });

  const resetForm = () => {
    setFormData({ name: "", role: "", content: "", order: 0, imageFile: null, imageUrl: "" });
    setEditingItem(null);
    setShowForm(false);
  };

  const handleEdit = (item: any) => {
    setEditingItem(item);
    setFormData({
      name: item.name,
      role: item.role,
      content: item.content,
      order: item.order,
      imageFile: null,
      imageUrl: item.image
    });
    setShowForm(true);
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Hapus testimonial ini?")) return;
    try {
      const res = await fetch("/api/testimonials", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      if (res.ok) {
        setTestimonials(testimonials.filter(t => t.id !== id));
        toast("Testimonial berhasil dihapus", "success");
      }
    } catch (error) {
      toast("Gagal menghapus data", "error");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const data = new FormData();
    if (editingItem) data.append("id", editingItem.id.toString());
    data.append("name", formData.name);
    data.append("role", formData.role);
    data.append("content", formData.content);
    data.append("order", formData.order.toString());
    if (formData.imageFile) data.append("imageFile", formData.imageFile);
    data.append("imageUrl", formData.imageUrl);

    try {
      const res = await fetch("/api/testimonials", { 
        method: "POST", 
        body: data 
        // Jangan set Content-Type header manual saat mengirim FormData
      });
      
      const result = await res.json();
      
      if (result.success) {
        // Ambil data terbaru
        const updatedRes = await fetch("/api/testimonials");
        const updatedData = await updatedRes.json();
        setTestimonials(updatedData);
        
        toast(editingItem ? "Berhasil diperbarui" : "Berhasil ditambah", "success");
        resetForm();
      } else {
        toast(result.error || "Gagal menyimpan data", "error");
      }
    } catch (error) {
      console.error("Submit Error:", error);
      toast("Terjadi kesalahan sistem", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8 pb-20">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Testimonials</h1>
          <p className="text-slate-500 font-medium text-sm">Kelola feedback dari klien Anda.</p>
        </div>
        <button 
          onClick={() => setShowForm(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-2xl font-black text-xs uppercase tracking-widest transition-all flex items-center gap-2 shadow-lg shadow-blue-500/20"
        >
          <Plus className="w-4 h-4" />
          Tambah Testi
        </button>
      </div>

      {showForm && (
        <div className="bg-white rounded-3xl border border-slate-100 p-8 shadow-sm animate-in fade-in slide-in-from-top-4 duration-500">
          <div className="flex justify-between items-center mb-8 pb-4 border-b border-slate-50">
            <h2 className="font-black text-slate-900 uppercase tracking-widest text-xs">
              {editingItem ? "Edit Testimonial" : "Tambah Testimonial Baru"}
            </h2>
            <button onClick={resetForm} className="text-slate-400 hover:text-slate-900"><X className="w-5 h-5" /></button>
          </div>

          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-12 gap-8">
            <div className="md:col-span-4 space-y-4">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Foto Klien</label>
              <div 
                className="aspect-square rounded-3xl bg-slate-50 border-2 border-dashed border-slate-200 flex flex-col items-center justify-center overflow-hidden relative group cursor-pointer"
                onClick={() => document.getElementById("file-input")?.click()}
              >
                {formData.imageFile || formData.imageUrl ? (
                  <img 
                    src={formData.imageFile ? URL.createObjectURL(formData.imageFile) : formData.imageUrl} 
                    className="w-full h-full object-cover" 
                    alt="Preview"
                  />
                ) : (
                  <div className="text-center p-6">
                    <Camera className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                    <span className="text-[10px] font-black text-slate-400 uppercase">Upload Foto</span>
                  </div>
                )}
                <div className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center text-white">
                  <Camera className="w-6 h-6" />
                </div>
              </div>
              <input 
                id="file-input" 
                type="file" 
                className="hidden" 
                accept="image/*"
                onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) setFormData({...formData, imageFile: file});
                }}
              />
            </div>

            <div className="md:col-span-8 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Nama Lengkap</label>
                  <div className="flex items-center bg-slate-50 rounded-2xl border border-slate-100 px-4 focus-within:border-blue-500 transition-all">
                    <User className="w-4 h-4 text-slate-400" />
                    <input 
                      type="text" required
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full bg-transparent border-none py-4 px-3 outline-none font-bold text-sm"
                      placeholder="Contoh: Budi Santoso"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Jabatan / Perusahaan</label>
                  <div className="flex items-center bg-slate-50 rounded-2xl border border-slate-100 px-4 focus-within:border-blue-500 transition-all">
                    <Briefcase className="w-4 h-4 text-slate-400" />
                    <input 
                      type="text" required
                      value={formData.role}
                      onChange={(e) => setFormData({...formData, role: e.target.value})}
                      className="w-full bg-transparent border-none py-4 px-3 outline-none font-bold text-sm"
                      placeholder="Contoh: CEO di TechID"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Isi Testimonial</label>
                <div className="flex bg-slate-50 rounded-2xl border border-slate-100 px-4 focus-within:border-blue-500 transition-all">
                  <MessageSquare className="w-4 h-4 text-slate-400 mt-5" />
                  <textarea 
                    rows={4} required
                    value={formData.content}
                    onChange={(e) => setFormData({...formData, content: e.target.value})}
                    className="w-full bg-transparent border-none py-4 px-3 outline-none font-medium text-sm resize-none"
                    placeholder="Apa kata mereka tentang Hexanusa?"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3">
                <button 
                  type="button" onClick={resetForm}
                  className="px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-widest text-slate-500 hover:bg-slate-100"
                >
                  Batal
                </button>
                <button 
                  disabled={loading}
                  className="bg-slate-900 text-white px-8 py-3 rounded-xl font-black text-xs uppercase tracking-widest flex items-center gap-2"
                >
                  {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                  Simpan Testi
                </button>
              </div>
            </div>
          </form>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {testimonials.map((item) => (
          <div key={item.id} className="bg-white rounded-3xl border border-slate-100 p-6 shadow-sm group hover:shadow-md transition-all">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-slate-50 flex items-center justify-center bg-slate-50">
                {item.image ? (
                  <img src={item.image} className="w-full h-full object-cover shadow-sm" alt={item.name} />
                ) : (
                  <User className="w-6 h-6 text-slate-300" />
                )}
              </div>
              <div>
                <h3 className="font-black text-slate-900 text-sm leading-tight">{item.name}</h3>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{item.role}</p>
              </div>
            </div>
            <p className="text-sm text-slate-600 font-medium leading-relaxed italic mb-8">
              "{item.content}"
            </p>
            <div className="flex justify-end gap-2 pt-4 border-t border-slate-50">
              <button 
                onClick={() => handleEdit(item)}
                className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
              >
                <Edit2 className="w-4 h-4" />
              </button>
              <button 
                onClick={() => handleDelete(item.id)}
                className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-all"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
