"use client";

import { useState, useEffect } from "react";
import { User, Lock, ShieldCheck, Save, Loader2, KeyRound, Fingerprint } from "lucide-react";
import { motion } from "framer-motion";
import { updateProfileAction } from "@/app/actions/profile";
import { useToast } from "@/components/admin/Toast";

export default function AdminProfile() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState("");

  // Ambil username saat ini (Bisa ditambah logic fetch user jika perlu)
  useEffect(() => {
    // Simulasi atau fetch nama user
    setUsername("admin_hexa");
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const result = await updateProfileAction(formData);

    if (result.success) {
      toast(result.message, "success");
      // Reset password fields
      (e.target as HTMLFormElement).reset();
    } else {
      toast(result.message, "error");
    }
    setLoading(false);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-10 pb-20">
      <div>
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">Manajemen Akun</h1>
        <p className="text-slate-500 font-medium mt-1">Kelola identitas akses dan tingkatkan keamanan akun Anda.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Info Card */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm text-center">
            <div className="relative inline-block mb-6">
              <div className="w-24 h-24 rounded-[32px] bg-blue-600 flex items-center justify-center text-white shadow-2xl shadow-blue-200">
                <User size={40} />
              </div>
              <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-emerald-500 rounded-2xl border-4 border-white flex items-center justify-center text-white">
                <ShieldCheck size={18} />
              </div>
            </div>
            <h2 className="text-xl font-black text-slate-900 leading-none mb-1">{username}</h2>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Administrator</p>
          </div>

          <div className="bg-slate-900 p-8 rounded-[32px] text-white overflow-hidden relative group">
            <Fingerprint className="absolute -right-4 -bottom-4 w-32 h-32 text-white/5 group-hover:scale-110 transition-transform duration-700" />
            <div className="relative z-10">
              <h4 className="text-sm font-black uppercase tracking-widest text-blue-400 mb-4">Security Tip</h4>
              <p className="text-xs text-slate-400 leading-relaxed font-medium">
                Gunakan kombinasi huruf, angka, dan simbol untuk password yang lebih kuat. Jangan bagikan kredensial Anda kepada siapapun.
              </p>
            </div>
          </div>
        </div>

        {/* Form Section */}
        <div className="lg:col-span-2">
          <div className="bg-white p-10 rounded-[40px] border border-slate-100 shadow-sm relative overflow-hidden">
            <form onSubmit={handleSubmit} className="space-y-8">
              
              <div className="space-y-6">
                <div className="flex items-center gap-3 mb-2">
                   <div className="w-1.5 h-6 bg-blue-600 rounded-full" />
                   <h3 className="font-black text-slate-900 uppercase tracking-widest text-xs">Informasi Dasar</h3>
                </div>
                
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Username Baru</label>
                  <div className="relative">
                    <User className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input 
                      type="text" 
                      name="username"
                      defaultValue={username}
                      className="w-full pl-14 pr-6 py-5 rounded-3xl bg-slate-50 border border-slate-100 focus:outline-none focus:border-blue-600 focus:bg-white transition-all text-sm font-bold shadow-sm"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-6 pt-6 border-t border-slate-50">
                <div className="flex items-center gap-3 mb-2">
                   <div className="w-1.5 h-6 bg-indigo-600 rounded-full" />
                   <h3 className="font-black text-slate-900 uppercase tracking-widest text-xs">Perubahan Keamanan</h3>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Password Saat Ini</label>
                  <div className="relative">
                    <KeyRound className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input 
                      type="password" 
                      name="currentPassword"
                      placeholder="Wajib diisi untuk konfirmasi"
                      className="w-full pl-14 pr-6 py-5 rounded-3xl bg-slate-50 border border-slate-100 focus:outline-none focus:border-blue-600 focus:bg-white transition-all text-sm font-bold shadow-sm"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Password Baru (Opsional)</label>
                  <div className="relative">
                    <Lock className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input 
                      type="password" 
                      name="newPassword"
                      placeholder="Biarkan kosong jika tidak ingin mengubah"
                      className="w-full pl-14 pr-6 py-5 rounded-3xl bg-slate-50 border border-slate-100 focus:outline-none focus:border-blue-600 focus:bg-white transition-all text-sm font-bold shadow-sm"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-6">
                <button 
                  type="submit"
                  disabled={loading}
                  className="w-full bg-slate-900 text-white py-5 rounded-3xl font-black text-xs uppercase tracking-[0.2em] hover:bg-blue-600 transition-all shadow-xl shadow-blue-100 flex items-center justify-center gap-3"
                >
                  {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <><Save size={18} /> Perbarui Akun Sekarang</>}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
