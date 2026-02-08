"use client";

import { useState, useEffect } from "react";
import { Plus, Pencil, Trash2, HelpCircle, Briefcase, Loader2 } from "lucide-react";
import * as LucideIcons from "lucide-react";
import ServiceForm from "./ServiceForm";
import { deleteService } from "./actions";

export default function AdminServices() {
  const [services, setServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingData, setEditingData] = useState<any>(null);

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

  const handleDelete = async (id: number) => {
    if (confirm("Apakah Anda yakin ingin menghapus layanan ini?")) {
      await deleteService(id);
      fetchServices();
    }
  };

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
        <div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">Manajemen Layanan</h1>
          <p className="text-slate-500 font-medium mt-2">Kelola daftar layanan teknologi yang tampil di halaman depan.</p>
        </div>
        <button 
          onClick={handleAdd}
          className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-4 rounded-[20px] font-black text-sm flex items-center gap-3 shadow-2xl shadow-blue-200 transition-all active:scale-95"
        >
          <Plus className="w-5 h-5" />
          TAMBAH LAYANAN
        </button>
      </div>

      <div className="bg-white rounded-[40px] border border-slate-100 shadow-2xl shadow-slate-200/50 overflow-hidden min-h-[500px]">
        {loading ? (
          <div className="flex flex-col items-center justify-center h-[500px] gap-4">
            <Loader2 className="w-10 h-10 text-blue-600 animate-spin" />
            <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">Menyiapkan Data...</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50/50 border-b border-slate-100">
                  <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Visual</th>
                  <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Nama Layanan</th>
                  <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Deskripsi Detail</th>
                  <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] text-center">Kontrol</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {services.map((service) => {
                  const IconComponent = (LucideIcons as any)[service.iconName] || HelpCircle;
                  return (
                    <tr key={service.id} className="hover:bg-slate-50/50 transition-all group">
                      <td className="px-10 py-6">
                        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg transition-transform group-hover:scale-110 ${
                          service.color === "blue" ? "bg-blue-50 text-blue-600 shadow-blue-100" : "bg-indigo-50 text-indigo-600 shadow-indigo-100"
                        }`}>
                          <IconComponent className="w-7 h-7" />
                        </div>
                      </td>
                      <td className="px-10 py-6">
                        <p className="font-black text-slate-900 text-lg">{service.title}</p>
                        <span className="inline-block mt-1 px-2 py-0.5 rounded-md bg-slate-100 text-slate-400 text-[9px] font-black uppercase tracking-widest">{service.color} THEME</span>
                      </td>
                      <td className="px-10 py-6">
                        <p className="text-slate-500 text-sm font-medium leading-relaxed max-w-sm">{service.desc}</p>
                      </td>
                      <td className="px-10 py-6">
                        <div className="flex items-center justify-center gap-3">
                          <button 
                            onClick={() => handleEdit(service)}
                            className="p-3 rounded-2xl bg-slate-50 text-slate-600 hover:bg-blue-600 hover:text-white transition-all shadow-sm hover:shadow-blue-200"
                          >
                            <Pencil className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={() => handleDelete(service.id)}
                            className="p-3 rounded-2xl bg-slate-50 text-slate-400 hover:bg-red-500 hover:text-white transition-all shadow-sm hover:shadow-red-200"
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
            {services.length === 0 && (
              <div className="text-center py-32">
                <Briefcase className="w-16 h-16 text-slate-100 mx-auto mb-6" />
                <p className="text-slate-400 font-black uppercase tracking-widest text-sm">Gudang Layanan Kosong</p>
              </div>
            )}
          </div>
        )}
      </div>

      <ServiceForm 
        isOpen={isModalOpen} 
        onClose={() => { setIsModalOpen(false); fetchServices(); }} 
        initialData={editingData} 
      />
    </div>
  );
}