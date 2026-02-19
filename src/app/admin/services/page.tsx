"use client";

import { useState, useEffect } from "react";
import { Plus, Pencil, Trash2, HelpCircle, Briefcase, Loader2 } from "lucide-react";
import * as LucideIcons from "lucide-react";
import ServiceForm from "./ServiceForm";
import { deleteService } from "./actions";
import { useToast } from "@/components/admin/Toast";
import ConfirmModal from "@/components/admin/ConfirmModal";

export default function AdminServices() {
  const { toast } = useToast();
  const [services, setServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingData, setEditingData] = useState<any>(null);

  // State untuk ConfirmModal
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const fetchServices = async () => {
    setLoading(true);
    const response = await fetch('/api/services');
    const data = await response.json();
    setServices(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const handleEdit = (service: any) => {
    setEditingData(service);
    setIsModalOpen(true);
  };

  const handleAdd = () => {
    setEditingData(null);
    setIsModalOpen(true);
  };

  const handleDeleteClick = (id: number) => {
    setDeletingId(id);
    setConfirmOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!deletingId) return;
    await deleteService(deletingId);
    toast("Layanan telah dihapus dari sistem.", "success");
    fetchServices();
  };

  return (
    <div className="space-y-10">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Layanan Teknologi</h1>
          <p className="text-slate-500 font-medium text-sm mt-1">Kelola daftar solusi dan kapabilitas digital Hexanusa.</p>
        </div>
        <button 
          onClick={handleAdd}
          className="bg-slate-900 hover:bg-blue-600 text-white px-8 py-4 rounded-xl font-bold text-xs uppercase tracking-widest flex items-center gap-3 shadow-xl transition-all active:scale-95"
        >
          <Plus className="w-4 h-4" />
          TAMBAH LAYANAN
        </button>
      </div>

      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden min-h-[500px]">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50/50 border-b border-slate-100">
                  <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Visual</th>
                  <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Nama Layanan</th>
                  <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Deskripsi Detail</th>
                  <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] text-center">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {services.map((service) => {
                  const IconComponent = (LucideIcons as any)[service.iconName] || HelpCircle;
                  return (
                    <tr key={service.id} className="hover:bg-slate-50/50 transition-all group">
                      <td className="px-10 py-6">
                        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-sm transition-transform group-hover:scale-110 ${
                          service.color === "blue" ? "bg-blue-50 text-blue-600" : "bg-indigo-50 text-indigo-600"
                        }`}>
                          <IconComponent className="w-6 h-6" />
                        </div>
                      </td>
                      <td className="px-10 py-6">
                        <p className="font-bold text-slate-900 text-base">{service.title}</p>
                        <span className="inline-block mt-1 px-2 py-0.5 rounded bg-slate-100 text-slate-400 text-[8px] font-black uppercase tracking-widest">{service.color}</span>
                      </td>
                      <td className="px-10 py-6">
                        <p className="text-slate-500 text-sm font-medium leading-relaxed max-w-sm">{service.desc}</p>
                      </td>
                      <td className="px-10 py-6">
                        <div className="flex items-center justify-center gap-2">
                          <button 
                            onClick={() => handleEdit(service)}
                            className="p-3 rounded-xl bg-slate-50 text-slate-400 hover:bg-blue-600 hover:text-white transition-all shadow-sm"
                          >
                            <Pencil className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={() => handleDeleteClick(service.id)}
                            className="p-3 rounded-xl bg-slate-50 text-slate-400 hover:bg-red-500 hover:text-white transition-all shadow-sm"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            {services.length === 0 && !loading && (
              <div className="text-center py-32">
                <Briefcase className="w-16 h-16 text-slate-100 mx-auto mb-6" />
                <p className="text-slate-400 font-black uppercase tracking-widest text-[10px]">Layanan belum terdaftar</p>
              </div>
            )}
          </div>
      </div>

      <ServiceForm 
        isOpen={isModalOpen} 
        onClose={() => { setIsModalOpen(false); fetchServices(); }} 
        initialData={editingData} 
      />

      <ConfirmModal
        isOpen={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        onConfirm={handleDeleteConfirm}
        title="Hapus Layanan?"
        message="Menghapus layanan ini akan menghilangkannya dari tampilan landing page. Anda yakin?"
        confirmText="Hapus Layanan"
      />
    </div>
  );
}