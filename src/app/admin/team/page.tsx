"use client";

import { useState, useEffect } from "react";
import { Plus, Pencil, Trash2, Users, Loader2 } from "lucide-react";
import * as LucideIcons from "lucide-react";
import TeamForm from "./TeamForm";
import { useToast } from "@/components/admin/Toast";

export default function AdminTeam() {
  const { toast } = useToast();
  const [members, setMembers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingData, setEditingData] = useState<any>(null);

  const fetchTeam = async () => {
    setLoading(true);
    const response = await fetch('/api/team');
    const data = await response.json();
    setMembers(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchTeam();
  }, []);

  const handleEdit = (member: any) => {
    setEditingData(member);
    setIsModalOpen(true);
  };

  const handleAdd = () => {
    setEditingData(null);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: number) => {
    if (confirm("Apakah Anda yakin ingin menghapus anggota tim ini?")) {
      try {
        const res = await fetch(`/api/team?id=${id}`, {
          method: "DELETE",
        });
        const result = await res.json();

        if (result.success) {
          toast("Anggota tim berhasil dihapus.", "success");
          fetchTeam();
        } else {
          toast(result.error || "Gagal menghapus anggota tim.", "error");
        }
      } catch (error) {
        console.error("Delete error:", error);
        toast("Terjadi kesalahan saat menghapus anggota tim.", "error");
      }
    }
  };

  return (
    <div className="space-y-10">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Manajemen Tim</h1>
          <p className="text-slate-500 font-medium text-sm mt-1">Kelola orang-orang hebat di balik Hexanusa.</p>
        </div>
        <button 
          onClick={handleAdd}
          className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-4 rounded-xl font-black text-xs uppercase tracking-widest flex items-center gap-3 shadow-xl shadow-blue-200 transition-all active:scale-95"
        >
          <Plus className="w-4 h-4" />
          TAMBAH ANGGOTA
        </button>
      </div>

      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden min-h-[500px]">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-100">
                <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Profil</th>
                <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Identitas & Peran</th>
                <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Sosial Media</th>
                <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {members.map((member) => (
                <tr key={member.id} className="hover:bg-slate-50/50 transition-all group">
                  <td className="px-10 py-6">
                    <div className="w-14 h-14 rounded-2xl overflow-hidden border border-slate-100 shadow-sm transition-transform group-hover:scale-110">
                      <img src={member.image} alt="" className="w-full h-full object-cover" />
                    </div>
                  </td>
                  <td className="px-10 py-6">
                    <p className="font-black text-slate-900 text-base">{member.name}</p>
                    <p className="text-blue-600 font-black uppercase text-[9px] tracking-widest mt-1">{member.role}</p>
                  </td>
                  <td className="px-10 py-6">
                    <div className="flex items-center gap-3">
                      {member.linkedin && <LucideIcons.Linkedin className="w-4 h-4 text-blue-600" />}
                      {member.github && <LucideIcons.Github className="w-4 h-4 text-slate-900" />}
                      {member.instagram && <LucideIcons.Instagram className="w-4 h-4 text-pink-600" />}
                    </div>
                  </td>
                  <td className="px-10 py-6">
                    <div className="flex items-center justify-center gap-2">
                      <button onClick={() => handleEdit(member)} className="p-3 rounded-xl bg-slate-50 text-slate-600 hover:bg-blue-600 hover:text-white transition-all shadow-sm">
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button onClick={() => handleDelete(member.id)} className="p-3 rounded-xl bg-slate-50 text-slate-400 hover:bg-red-500 hover:text-white transition-all shadow-sm">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {members.length === 0 && !loading && (
            <div className="text-center py-32">
              <Users className="w-16 h-16 text-slate-100 mx-auto mb-6" />
              <p className="text-slate-400 font-black uppercase tracking-widest text-xs">Tim Belum Terbentuk</p>
            </div>
          )}
        </div>
      </div>

      <TeamForm 
        isOpen={isModalOpen} 
        onClose={() => { setIsModalOpen(false); fetchTeam(); }} 
        initialData={editingData} 
      />
    </div>
  );
}