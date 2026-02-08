"use client";

import { useState, useEffect } from "react";
import { Mail, Trash2, Loader2, MessageSquare, Clock, User, X, ExternalLink } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { markAsRead, deleteMessage } from "./actions";

export default function AdminMessages() {
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedMessage, setSelectedData] = useState<any>(null);

  const fetchMessages = async () => {
    setLoading(true);
    const response = await fetch('/api/messages');
    const data = await response.json();
    setMessages(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const handleOpen = async (msg: any) => {
    setSelectedData(msg);
    if (!msg.isRead) {
      await markAsRead(msg.id);
      fetchMessages(); 
    }
  };

  const handleDelete = async (e: React.MouseEvent, id: number) => {
    e.stopPropagation();
    if (confirm("Hapus pesan ini secara permanen?")) {
      await deleteMessage(id);
      fetchMessages();
    }
  };

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">Pesan Masuk</h1>
          <p className="text-slate-500 font-medium mt-2">Kelola korespondensi klien Hexanusa.</p>
        </div>
        <div className="flex gap-4">
          <div className="flex items-center gap-3 bg-white px-6 py-3 rounded-2xl border border-slate-100 shadow-sm">
            <div className="w-2.5 h-2.5 rounded-full bg-blue-600 animate-pulse" />
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">New Leads</span>
          </div>
          <div className="flex items-center gap-3 bg-white px-6 py-3 rounded-2xl border border-slate-100 shadow-sm">
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Responded</span>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-[40px] border border-slate-100 shadow-2xl shadow-slate-200/50 overflow-hidden min-h-[500px]">
        {loading ? (
          <div className="flex flex-col items-center justify-center h-[500px] gap-4">
            <Loader2 className="w-10 h-10 text-amber-600 animate-spin" />
            <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">Membuka Kotak Pesan...</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50/50 border-b border-slate-100">
                  <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] text-center">Status</th>
                  <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Pengirim</th>
                  <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Isi Pesan</th>
                  <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Waktu</th>
                  <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] text-center">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {messages.map((msg) => (
                  <tr 
                    key={msg.id} 
                    onClick={() => handleOpen(msg)}
                    className={`group cursor-pointer transition-all ${msg.isRead ? "opacity-60 grayscale-[0.5]" : "bg-blue-50/10 hover:bg-blue-50/20"}`}
                  >
                    <td className="px-10 py-6 text-center">
                      <div className={`w-3.5 h-3.5 rounded-full mx-auto shadow-sm ${msg.isRead ? "bg-emerald-500" : "bg-blue-600 animate-pulse shadow-blue-400"}`} />
                    </td>
                    <td className="px-10 py-6">
                      <p className={`font-black text-lg ${msg.isRead ? "text-slate-600" : "text-slate-900"}`}>{msg.name}</p>
                      <p className="text-xs text-slate-400 font-bold mt-0.5">{msg.email}</p>
                    </td>
                    <td className="px-10 py-6">
                      <p className="text-slate-500 text-sm font-medium line-clamp-1 max-w-xs">{msg.message}</p>
                    </td>
                    <td className="px-10 py-6">
                      <div className="flex items-center gap-2 text-slate-400 font-black text-[10px] uppercase tracking-tighter">
                        <Clock className="w-3 h-3" />
                        {new Date(msg.createdAt).toLocaleString('id-ID', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' })}
                      </div>
                    </td>
                    <td className="px-10 py-6">
                      <div className="flex items-center justify-center">
                        <button 
                          onClick={(e) => handleDelete(e, msg.id)}
                          className="p-3 rounded-2xl bg-slate-100 text-slate-400 hover:bg-red-500 hover:text-white transition-all shadow-sm opacity-0 group-hover:opacity-100"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {messages.length === 0 && (
              <div className="text-center py-32">
                <div className="w-20 h-20 bg-slate-50 rounded-3xl flex items-center justify-center mx-auto mb-6">
                  <Mail className="w-10 h-10 text-slate-200" />
                </div>
                <p className="text-slate-400 font-black uppercase tracking-widest text-sm">Kotak Masuk Sepi</p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Modal Detail Pesan */}
      <AnimatePresence>
        {selectedMessage && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedData(null)} className="absolute inset-0 bg-slate-900/60 backdrop-blur-md" />
            <motion.div initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 20 }} className="relative bg-white w-full max-w-xl rounded-[50px] shadow-2xl overflow-hidden">
              <div className="p-10 border-b border-slate-50 flex justify-between items-center bg-slate-50/50">
                <div className="flex items-center gap-5">
                  <div className="w-16 h-16 rounded-[24px] bg-blue-600 flex items-center justify-center text-white shadow-xl shadow-blue-200">
                    <MessageSquare className="w-8 h-8" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-black text-slate-900">Detail Pesan</h2>
                    <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mt-1">DITERIMA PADA {new Date(selectedMessage.createdAt).toLocaleString('id-ID')}</p>
                  </div>
                </div>
                <button onClick={() => setSelectedData(null)} className="p-3 hover:bg-white rounded-full transition-all shadow-sm"><X className="w-6 h-6 text-slate-400" /></button>
              </div>
              
              <div className="p-12 space-y-10">
                <div className="grid grid-cols-2 gap-10">
                  <div>
                    <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.2em] mb-3 ml-1">Nama Pengirim</p>
                    <div className="flex items-center gap-4 bg-slate-50 p-5 rounded-3xl border border-slate-100">
                      <User className="w-5 h-5 text-blue-600" />
                      <p className="font-black text-slate-900">{selectedMessage.name}</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.2em] mb-3 ml-1">Alamat Email</p>
                    <div className="flex items-center gap-4 bg-slate-50 p-5 rounded-3xl border border-slate-100">
                      <Mail className="w-5 h-5 text-blue-600" />
                      <p className="font-black text-slate-900 truncate">{selectedMessage.email}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.2em] mb-1 ml-1">Pesan Konsultasi</p>
                  <div className="bg-slate-900 p-10 rounded-[40px] text-slate-300 leading-relaxed font-medium shadow-inner border border-slate-800 italic">
                    "{selectedMessage.message}"
                  </div>
                </div>

                <div className="flex gap-5">
                  <button onClick={() => setSelectedData(null)} className="flex-1 py-5 rounded-3xl font-black text-sm text-slate-500 bg-slate-50 hover:bg-slate-100 transition-all">TUTUP</button>
                  <a 
                    href={`mailto:${selectedMessage.email}`}
                    className="flex-[2] bg-blue-600 text-white py-5 rounded-3xl font-black text-sm hover:bg-slate-900 transition-all shadow-2xl shadow-blue-100 flex items-center justify-center gap-3"
                  >
                    <ExternalLink className="w-5 h-5" />
                    BALAS VIA EMAIL
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}