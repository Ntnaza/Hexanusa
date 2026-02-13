"use client";

import { useState } from "react";
import { Plus, Pencil, Trash2, HelpCircle, Briefcase } from "lucide-react";
import * as LucideIcons from "lucide-react";
import ServiceForm from "./ServiceForm";
import { deleteService } from "./actions";

export default function ServicesClient({ initialData }: { initialData: any[] }) {
  const [services, setServices] = useState(initialData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingData, setEditingData] = useState<any>(null);

  const handleEdit = (service: any) => {
    setEditingData(service);
    setIsModalOpen(true);
  };

  const handleAdd = () => {
    setEditingData(null);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: number) => {
    if (confirm("Hapus layanan ini?")) {
      try {
        const res = await fetch(`/api/services?id=${id}`, { method: "DELETE" });
        const result = await res.json();
        if (result.success) {
          setServices(services.filter(s => s.id !== id));
        }
      } catch (error) {
        console.error("Gagal menghapus:", error);
      }
    }
  };

  return (
    <>
      <div className="bg-white rounded-[32px] border border-slate-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-100">
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Icon</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Layanan</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {services.map((service) => {
                const IconComponent = (LucideIcons as any)[service.iconName] || HelpCircle;
                return (
                  <tr key={service.id} className="hover:bg-slate-50/30 transition-colors">
                    <td className="px-8 py-4">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                        service.color === "blue" ? "bg-blue-50 text-blue-600" : "bg-indigo-50 text-indigo-600"
                      }`}>
                        <IconComponent className="w-5 h-5" />
                      </div>
                    </td>
                    <td className="px-8 py-4">
                      <p className="font-bold text-slate-900 text-sm">{service.title}</p>
                      <p className="text-slate-400 text-[11px] line-clamp-1 max-w-[200px]">{service.desc}</p>
                    </td>
                    <td className="px-8 py-4">
                      <div className="flex items-center justify-center gap-2">
                        <button onClick={() => handleEdit(service)} className="p-2 rounded-lg bg-slate-50 text-slate-400 hover:bg-blue-600 hover:text-white transition-all">
                          <Pencil className="w-3.5 h-3.5" />
                        </button>
                        <button onClick={() => handleDelete(service.id)} className="p-2 rounded-lg bg-slate-50 text-slate-400 hover:bg-red-500 hover:text-white transition-all">
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <div className="fixed bottom-10 right-10 z-50">
        <button 
          onClick={handleAdd}
          className="bg-blue-600 hover:bg-slate-900 text-white w-14 h-14 rounded-full flex items-center justify-center shadow-2xl shadow-blue-200 transition-all active:scale-90"
        >
          <Plus className="w-6 h-6" />
        </button>
      </div>

      <ServiceForm 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        initialData={editingData} 
      />
    </>
  );
}
