"use client";

import React, { createContext, useContext, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, AlertCircle, X, Info } from "lucide-react";

type ToastType = "success" | "error" | "info";

interface Toast {
  id: string;
  message: string;
  type: ToastType;
}

interface ToastContextType {
  toast: (message: string, type?: ToastType) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) throw new Error("useToast must be used within a ToastProvider");
  return context;
};

export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const toast = useCallback((message: string, type: ToastType = "success") => {
    const id = Math.random().toString(36).substr(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => removeToast(id), 4000);
  }, [removeToast]);

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      {/* Container Pindah ke Top Right (Atas Kanan) */}
      <div className="fixed top-6 right-6 z-[2000] flex flex-col gap-3 w-full max-w-xs pointer-events-none">
        <AnimatePresence mode="popLayout">
          {toasts.map((t) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: -20, scale: 0.95, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, x: 20, scale: 0.9, filter: "blur(10px)" }}
              transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
              className="pointer-events-auto"
            >
              <div className={`
                relative overflow-hidden glass border px-5 py-4 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.15)] flex items-center gap-4
                ${t.type === "success" ? "border-emerald-500/20" : t.type === "error" ? "border-red-500/20" : "border-blue-500/20"}
              `}>
                {/* Background Glow */}
                <div className={`absolute -left-4 -top-4 w-12 h-12 blur-2xl opacity-20 rounded-full
                  ${t.type === "success" ? "bg-emerald-500" : t.type === "error" ? "bg-red-500" : "bg-blue-500"}
                `} />

                <div className={`shrink-0 p-2 rounded-xl
                  ${t.type === "success" ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/20" : 
                    t.type === "error" ? "bg-red-500 text-white shadow-lg shadow-red-500/20" : 
                    "bg-blue-600 text-white shadow-lg shadow-blue-500/20"}
                `}>
                  {t.type === "success" && <CheckCircle2 className="w-4 h-4" />}
                  {t.type === "error" && <AlertCircle className="w-4 h-4" />}
                  {t.type === "info" && <Info className="w-4 h-4" />}
                </div>

                <div className="flex-grow">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">
                    {t.type === "success" ? "Notification" : t.type === "error" ? "System Alert" : "System Info"}
                  </p>
                  <p className="text-[13px] font-bold text-slate-900 leading-tight">
                    {t.message}
                  </p>
                </div>

                <button onClick={() => removeToast(t.id)} className="text-slate-300 hover:text-slate-600 transition-colors">
                  <X className="w-4 h-4" />
                </button>

                {/* Timer Bar */}
                <motion.div 
                  initial={{ width: "100%" }}
                  animate={{ width: "0%" }}
                  transition={{ duration: 4, ease: "linear" }}
                  className={`absolute bottom-0 left-0 h-0.5 
                    ${t.type === "success" ? "bg-emerald-500" : t.type === "error" ? "bg-red-500" : "bg-blue-600"}
                  `}
                />
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
};