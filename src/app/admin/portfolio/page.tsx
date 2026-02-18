"use client";

import { useState, useEffect } from "react";
import { Plus, Pencil, Trash2, ImageIcon, Loader2, ExternalLink } from "lucide-react";
import PortfolioForm from "./PortfolioForm";
import { useToast } from "@/components/admin/Toast";

export default function AdminPortfolio() {
  const { toast } = useToast();
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingData, setEditingData] = useState<any>(null);

  const fetchPortfolio = async () => {
    setLoading(true);
    const response = await fetch('/api/portfolio');
    const data = await response.json();
    setProjects(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchPortfolio();
  }, []);

  const handleEdit = (project: any) => {
    setEditingData(project);
    setIsModalOpen(true);
  };

  const handleAdd = () => {
    setEditingData(null);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: number) => {
    if (confirm("Hapus proyek ini secara permanen?")) {
      try {
        const res = await fetch(`/api/portfolio?id=${id}`, {
          method: "DELETE",
        });
        const result = await res.json();

        if (result.success) {
          toast("Proyek berhasil dihapus.", "success");
          fetchPortfolio();
        } else {
          toast(result.error || "Gagal menghapus proyek.", "error");
        }
      } catch (error) {
        console.error("Delete error:", error);
        toast("Terjadi kesalahan saat menghapus proyek.", "error");
      }
    }
  };

  return (
    <div className="space-y-10">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Manajemen Portofolio</h1>
          <p className="text-slate-500 font-medium text-sm mt-1">Kelola galeri karya terbaik Hexanusa.</p>
        </div>
        <button 
          onClick={handleAdd}
          className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-4 rounded-xl font-black text-xs uppercase tracking-widest flex items-center gap-3 shadow-xl shadow-blue-200 transition-all active:scale-95"
        >
          <Plus className="w-4 h-4" />
          TAMBAH PROYEK
        </button>
      </div>

      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden min-h-[500px]">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-100">
                <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Preview</th>
                <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Detail Proyek</th>
                <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Kategori</th>
                <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {projects.map((project) => (
                <tr key={project.id} className="hover:bg-slate-50/50 transition-all group">
                  <td className="px-10 py-6">
                    <div className="w-24 aspect-square rounded-2xl overflow-hidden border border-slate-100 shadow-sm">
                      <img src={project.image} alt="" className="w-full h-full object-cover" />
                    </div>
                  </td>
                  <td className="px-10 py-6">
                    <p className="font-black text-slate-900 text-base">{project.title}</p>
                    {project.link && (
                      <a href={project.link} target="_blank" className="flex items-center gap-2 text-[10px] text-blue-600 font-bold hover:underline mt-1 uppercase tracking-widest">
                        <ExternalLink className="w-3 h-3" /> Visit Site
                      </a>
                    )}
                  </td>
                  <td className="px-10 py-6">
                    <span className="px-3 py-1 rounded-lg bg-slate-100 text-slate-600 text-[9px] font-black uppercase tracking-widest border border-slate-200">
                      {project.category}
                    </span>
                  </td>
                  <td className="px-10 py-6">
                    <div className="flex items-center justify-center gap-2">
                      <button onClick={() => handleEdit(project)} className="p-3 rounded-xl bg-slate-50 text-slate-600 hover:bg-blue-600 hover:text-white transition-all shadow-sm">
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button onClick={() => handleDelete(project.id)} className="p-3 rounded-xl bg-slate-50 text-slate-400 hover:bg-red-500 hover:text-white transition-all shadow-sm">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {projects.length === 0 && !loading && (
            <div className="text-center py-32">
              <ImageIcon className="w-16 h-16 text-slate-100 mx-auto mb-6" />
              <p className="text-slate-400 font-black uppercase tracking-widest text-xs">Belum Ada Karya Terpajang</p>
            </div>
          )}
        </div>
      </div>

      <PortfolioForm 
        isOpen={isModalOpen} 
        onClose={() => { setIsModalOpen(false); fetchPortfolio(); }} 
        initialData={editingData} 
      />
    </div>
  );
}