"use client";

import { useState } from "react";
import { Plus, Pencil, Trash2 } from "lucide-react";
import * as LucideIcons from "lucide-react";
import TeamForm from "./TeamForm";
import { deleteTeamMember } from "./actions";

export default function TeamClient({ initialData }: { initialData: any[] }) {
  const [team, setTeam] = useState(initialData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingData, setEditingData] = useState<any>(null);

  const handleEdit = (member: any) => {
    setEditingData(member);
    setIsModalOpen(true);
  };

  const handleAdd = () => {
    setEditingData(null);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: number) => {
    if (confirm("Hapus anggota tim ini?")) {
      await deleteTeamMember(id);
      setTeam(team.filter(t => t.id !== id));
    }
  };

  return (
    <>
      <div className="bg-white rounded-[32px] border border-slate-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-100">
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Profil</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Nama & Role</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {team.map((member) => (
                <tr key={member.id} className="hover:bg-slate-50/30 transition-colors">
                  <td className="px-8 py-4">
                    <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white shadow-sm">
                      <img src={member.image} alt="" className="w-full h-full object-cover" />
                    </div>
                  </td>
                  <td className="px-8 py-4">
                    <p className="font-bold text-slate-900 text-sm">{member.name}</p>
                    <p className="text-[10px] text-blue-600 font-bold uppercase">{member.role}</p>
                  </td>
                  <td className="px-8 py-4">
                    <div className="flex items-center justify-center gap-2">
                      <button onClick={() => handleEdit(member)} className="p-2 rounded-lg bg-slate-50 text-slate-400 hover:bg-blue-600 hover:text-white transition-all">
                        <Pencil className="w-3.5 h-3.5" />
                      </button>
                      <button onClick={() => handleDelete(member.id)} className="p-2 rounded-lg bg-slate-50 text-slate-400 hover:bg-red-500 hover:text-white transition-all">
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="fixed bottom-10 right-10 z-50">
        <button onClick={handleAdd} className="bg-emerald-600 hover:bg-slate-900 text-white w-14 h-14 rounded-full flex items-center justify-center shadow-2xl shadow-emerald-200 transition-all active:scale-90">
          <Plus className="w-6 h-6" />
        </button>
      </div>

      <TeamForm 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        initialData={editingData} 
      />
    </>
  );
}
