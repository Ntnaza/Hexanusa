"use client";

import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, X, Trash2 } from "lucide-react";

interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  type?: "danger" | "warning";
}

export default function ConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = "Hapus",
  type = "danger"
}: ConfirmModalProps) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[500] flex items-center justify-center p-4">
        {/* Overlay */}
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          exit={{ opacity: 0 }} 
          onClick={onClose} 
          className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm" 
        />

        {/* Modal Card */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9, y: 20 }} 
          animate={{ opacity: 1, scale: 1, y: 0 }} 
          exit={{ opacity: 0, scale: 0.9, y: 20 }} 
          className="relative bg-white w-full max-w-sm rounded-[32px] shadow-2xl overflow-hidden"
        >
          <div className="p-8 text-center">
            {/* Icon */}
            <div className={`w-20 h-20 mx-auto rounded-3xl flex items-center justify-center mb-6 ${
              type === "danger" ? "bg-red-50 text-red-500" : "bg-amber-50 text-amber-500"
            }`}>
              <AlertTriangle className="w-10 h-10" />
            </div>

            <h3 className="text-xl font-black text-slate-900 tracking-tight mb-2">{title}</h3>
            <p className="text-sm text-slate-500 font-medium leading-relaxed">
              {message}
            </p>
          </div>

          <div className="p-8 pt-0 flex gap-3">
            <button 
              onClick={onClose} 
              className="flex-1 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest text-slate-400 bg-slate-50 hover:bg-slate-100 transition-all"
            >
              Batal
            </button>
            <button 
              onClick={() => {
                onConfirm();
                onClose();
              }} 
              className={`flex-1 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest text-white shadow-lg transition-all active:scale-95 flex items-center justify-center gap-2 ${
                type === "danger" ? "bg-red-500 hover:bg-red-600 shadow-red-100" : "bg-amber-500 hover:bg-amber-600 shadow-amber-100"
              }`}
            >
              <Trash2 className="w-3.5 h-3.5" />
              {confirmText}
            </button>
          </div>

          {/* Close Button */}
          <button 
            onClick={onClose} 
            className="absolute top-6 right-6 p-2 hover:bg-slate-50 rounded-full transition-all text-slate-300 hover:text-slate-500"
          >
            <X className="w-5 h-5" />
          </button>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
