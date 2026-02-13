import React from 'react';

export default function Loading() {
  return (
    <div className="fixed inset-0 z-[9999] bg-white flex flex-col items-center justify-center">
      {/* Logo Container */}
      <div className="relative mb-8">
        <div className="w-24 h-24 relative flex items-center justify-center">
          {/* Outer Pulsing Ring */}
          <div className="absolute inset-0 border-4 border-blue-600 rounded-3xl animate-ping opacity-20"></div>
          {/* Inner Rotating Border */}
          <div className="absolute inset-0 border-t-4 border-blue-600 rounded-3xl animate-spin"></div>
          
          <img 
            src="/logo/hexa.png" 
            alt="Hexanusa Logo" 
            className="w-16 h-16 object-contain relative z-10"
          />
        </div>
      </div>

      {/* Text & Progress */}
      <div className="text-center">
        <h2 className="text-slate-900 font-black text-xl tracking-tighter mb-2">
          HEXANUSA<span className="text-blue-600">.</span>
        </h2>
        <div className="w-48 h-1 bg-slate-100 rounded-full overflow-hidden relative">
          <div className="absolute top-0 left-0 h-full bg-blue-600 w-full animate-progress origin-left"></div>
        </div>
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.3em] mt-4 animate-pulse">
          Inovasi Tanpa Batas
        </p>
      </div>
    </div>
  );
}
