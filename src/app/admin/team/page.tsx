"use client";

import { useState, useEffect } from "react";
import { Plus, Pencil, Trash2, Users, Loader2 } from "lucide-react";
import * as LucideIcons from "lucide-react";
import TeamForm from "./TeamForm";
import { deleteTeamMember } from "./actions";

export default function AdminTeam() {
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
      await deleteTeamMember(id);
      fetchTeam();
    }
  };

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
        <div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">Manajemen Tim</h1>
          <p className="text-slate-500 font-medium mt-2">Kelola orang-orang hebat di balik Hexanusa.</p>
        </div>
        <button 
          onClick={handleAdd}
          className="bg-emerald-600 hover:bg-emerald-500 text-white px-8 py-4 rounded-[20px] font-black text-sm flex items-center gap-3 shadow-2xl shadow-emerald-200 transition-all active:scale-95"
        >
          <Plus className="w-5 h-5" />
          TAMBAH ANGGOTA
        </button>
      </div>

      <div className="bg-white rounded-[40px] border border-slate-100 shadow-2xl shadow-slate-200/50 overflow-hidden min-h-[500px]">
        {loading ? (
          <div className="flex flex-col items-center justify-center h-[500px] gap-4">
            <Loader2 className="w-10 h-10 text-emerald-600 animate-spin" />
            <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">Memanggil Tim...</p>
          </div>
        ) : (
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
                      <div className="w-16 h-16 rounded-3xl overflow-hidden border-4 border-white shadow-lg transition-transform group-hover:scale-110">
                        <img src={member.image} alt="" className="w-full h-full object-cover" />
                      </div>
                    </td>
                    <td className="px-10 py-6">
                      <p className="font-black text-slate-900 text-lg">{member.name}</p>
                      <p className="text-blue-600 font-black uppercase text-[10px] tracking-widest mt-1">{member.role}</p>
                    </td>
                    <td className="px-10 py-6">
                      <div className="flex items-center gap-3">
                        {member.linkedin ? <LucideIcons.Linkedin className="w-5 h-5 text-blue-600 shadow-sm" /> : <div className="w-5 h-5 bg-slate-100 rounded-lg" />}
                        {member.github ? <LucideIcons.Github className="w-5 h-5 text-slate-900 shadow-sm" /> : <div className="w-5 h-5 bg-slate-100 rounded-lg" />}
                        {member.instagram ? <LucideIcons.Instagram className="w-5 h-5 text-pink-600 shadow-sm" /> : <div className="w-5 h-5 bg-slate-100 rounded-lg" />}
                      </div>
                    </td>
                    <td className="px-10 py-6">
                      <div className="flex items-center justify-center gap-3">
                        <button onClick={() => handleEdit(member)} className="p-3 rounded-2xl bg-slate-50 text-slate-600 hover:bg-blue-600 hover:text-white transition-all shadow-sm">
                          <Pencil className="w-4 h-4" />
                        </button>
                        <button onClick={() => handleDelete(member.id)} className="p-3 rounded-2xl bg-slate-50 text-slate-400 hover:bg-red-500 hover:text-white transition-all shadow-sm">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {members.length === 0 && (
              <div className="text-center py-32">
                <Users className="w-16 h-16 text-slate-100 mx-auto mb-6" />
                <p className="text-slate-400 font-black uppercase tracking-widest text-sm">Tim Belum Terbentuk</p>
              </div>
            )}
          </div>
        )}
      </div>

      <TeamForm 
        isOpen={isModalOpen} 
        onClose={() => { setIsModalOpen(false); fetchTeam(); }} 
        initialData={editingData} 
      />
    </div>
  );
}
