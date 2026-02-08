"use client";

import { useState } from "react";
import { Mail, Trash2, MessageSquare, Clock, User, X, ExternalLink } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { markAsRead, deleteMessage } from "./actions";

export default function MessagesClient({ initialData }: { initialData: any[] }) {
  const [messages, setMessages] = useState(initialData);
  const [selectedMessage, setSelectedData] = useState<any>(null);

  const handleOpen = async (msg: any) => {
    setSelectedData(msg);
    if (!msg.isRead) {
      await markAsRead(msg.id);
      setMessages(messages.map(m => m.id === msg.id ? { ...m, isRead: true } : m));
    }
  };

  const handleDelete = async (e: React.MouseEvent, id: number) => {
    e.stopPropagation();
    if (confirm("Hapus pesan ini?")) {
      await deleteMessage(id);
      setMessages(messages.filter(m => m.id !== id));
    }
  };

  return (
    <>
      <div className="bg-white rounded-[32px] border border-slate-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-100">
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Status</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Pengirim</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {messages.map((msg) => (
                <tr 
                  key={msg.id} 
                  onClick={() => handleOpen(msg)}
                  className={`group cursor-pointer transition-all ${msg.isRead ? "opacity-60" : "bg-blue-50/5"}`}
                >
                  <td className="px-8 py-4 text-center">
                    <div className={`w-2.5 h-2.5 rounded-full mx-auto ${msg.isRead ? "bg-emerald-500" : "bg-blue-600 animate-pulse"}`} />
                  </td>
                  <td className="px-8 py-4">
                    <p className="font-bold text-slate-900 text-sm">{msg.name}</p>
                    <p className="text-[10px] text-slate-400 font-bold uppercase truncate max-w-[150px]">{msg.email}</p>
                  </td>
                  <td className="px-8 py-4">
                    <div className="flex items-center justify-center">
                      <button onClick={(e) => handleDelete(e, msg.id)} className="p-2 rounded-lg bg-slate-50 text-slate-400 hover:bg-red-500 hover:text-white transition-all">
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

      <AnimatePresence>
        {selectedMessage && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedData(null)} className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" />
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} className="relative bg-white w-full max-w-lg rounded-[40px] shadow-2xl overflow-hidden p-8">
              <div className="flex justify-between items-start mb-8">
                <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600"><MessageSquare className="w-6 h-6" /></div>
                <button onClick={() => setSelectedData(null)} className="p-2 hover:bg-slate-50 rounded-full transition-all"><X /></button>
              </div>
              <div className="space-y-6">
                <div>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-1">Pengirim</p>
                  <p className="font-bold text-slate-900">{selectedMessage.name} <span className="text-slate-400 text-xs ml-1">({selectedMessage.email})</span></p>
                </div>
                <div>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-2">Pesan</p>
                  <div className="bg-slate-50 p-6 rounded-2xl text-slate-700 text-sm leading-relaxed font-medium">
                    {selectedMessage.message}
                  </div>
                </div>
                <div className="flex gap-3">
                  <button onClick={() => setSelectedData(null)} className="flex-1 py-4 rounded-2xl font-bold text-sm bg-slate-50 text-slate-500 transition-all">Tutup</button>
                  <a href={`mailto:${selectedMessage.email}`} className="flex-[2] py-4 rounded-2xl font-bold text-sm bg-blue-600 text-white flex items-center justify-center gap-2 hover:bg-blue-700 shadow-lg shadow-blue-100 transition-all">
                    <ExternalLink className="w-4 h-4" /> Balas Email
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
