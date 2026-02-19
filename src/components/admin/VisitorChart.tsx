"use client";

import React, { useState, useMemo, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Activity, Zap, MousePointer2 } from "lucide-react";

interface VisitorChartProps {
  data: { day: string; count: number }[];
  maxCount: number;
}

export default function VisitorChart({ data, maxCount }: VisitorChartProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [panOffset, setPanOffset] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // Smart Scaling Y-Axis
  const yAxisTicks = useMemo(() => {
    const ticks = [];
    const step = maxCount / 4;
    for (let i = 0; i <= 4; i++) ticks.push(Math.round(step * i));
    return ticks.reverse();
  }, [maxCount]);

  // Zoom & Pan Logic
  const visibleDataCount = Math.max(2, Math.ceil(data.length / zoomLevel));
  const maxOffset = data.length - visibleDataCount;
  const currentOffset = Math.min(Math.max(panOffset, 0), maxOffset);
  const visibleData = data.slice(currentOffset, currentOffset + visibleDataCount);

  // Chart Dimensions (Optimized for Stability)
  const width = 800;
  const height = 200;
  const paddingRight = 60;
  const paddingLeft = 20;
  const paddingTop = 30;
  const paddingBottom = 30;
  const chartWidth = width - paddingLeft - paddingRight;
  const chartHeight = height - paddingTop - paddingBottom;

  // Points mapping
  const points = useMemo(() => visibleData.map((d, i) => ({
    x: paddingLeft + (i * chartWidth) / (visibleData.length - 1 || 1),
    y: paddingTop + chartHeight - (d.count / (maxCount || 1)) * chartHeight,
  })), [visibleData, maxCount, chartWidth, chartHeight]);

  // Scroll to Zoom Implementation
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const handleWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) > 20) {
        e.preventDefault();
        if (e.deltaY < 0) setZoomLevel(prev => Math.min(prev + 0.1, 3));
        else setZoomLevel(prev => Math.max(prev - 0.1, 1));
      }
    };
    container.addEventListener("wheel", handleWheel, { passive: false });
    return () => container.removeEventListener("wheel", handleWheel);
  }, []);

  const createSmoothPath = (pts: { x: number; y: number }[]) => {
    if (pts.length < 2) return "";
    return pts.reduce((acc, point, i, a) => {
      if (i === 0) return `M ${point.x},${point.y}`;
      const prev = a[i - 1];
      const curr = point;
      const cp1x = prev.x + (curr.x - prev.x) / 2.5;
      const cp2x = curr.x - (curr.x - prev.x) / 2.5;
      return `${acc} C ${cp1x},${prev.y} ${cp2x},${curr.y} ${curr.x},${curr.y}`;
    }, "");
  };

  const pathD = createSmoothPath(points);
  const areaD = points.length > 0 
    ? `${pathD} L ${points[points.length - 1].x},${height - paddingBottom} L ${points[0].x},${height - paddingBottom} Z`
    : "";

  return (
    <div 
      ref={containerRef}
      className="bg-white rounded-[32px] p-6 lg:p-8 shadow-sm border border-slate-100 relative overflow-hidden flex flex-col h-full group/chart select-none transition-all"
    >
      {/* Header Area */}
      <div className="flex justify-between items-start mb-6 relative z-10">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className="w-1.5 h-1.5 rounded-full bg-blue-600 shadow-[0_0_8px_rgba(37,99,235,0.5)] animate-pulse" />
            <h3 className="text-slate-900 font-black tracking-tighter text-sm uppercase">Visitor Growth</h3>
          </div>
          <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest flex items-center gap-2">
            <MousePointer2 className="w-2.5 h-2.5" /> Scroll to zoom
          </p>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className="text-[8px] text-slate-400 font-black uppercase mb-0.5 tracking-tighter">Peak</p>
            <p className="text-xs font-black text-blue-600 leading-none">{maxCount}</p>
          </div>
        </div>
      </div>

      {/* Main Chart SVG */}
      <div className="relative flex-1 w-full min-h-[160px] max-h-[200px] cursor-crosshair">
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full overflow-visible" preserveAspectRatio="none">
          <defs>
            <linearGradient id="proAreaGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#2563eb" stopOpacity="0.12" />
              <stop offset="100%" stopColor="#2563eb" stopOpacity="0" />
            </linearGradient>
            <pattern id="dottedGrid" width="40" height="40" patternUnits="userSpaceOnUse">
              <circle cx="1" cy="1" r="1" fill="#e2e8f0" />
            </pattern>
          </defs>

          {/* Grid Background */}
          <rect x={paddingLeft} y={paddingTop} width={chartWidth} height={chartHeight} fill="url(#dottedGrid)" />

          {/* Y-Axis Labels */}
          {yAxisTicks.map((tick, i) => {
            const y = paddingTop + (i * chartHeight) / 4;
            return (
              <g key={i}>
                <line x1={paddingLeft} y1={y} x2={width - paddingRight} y2={y} stroke="#f8fafc" strokeWidth="2" />
                <text x={width - paddingRight + 15} y={y + 5} className="text-[10px] fill-slate-300 font-mono font-bold">{tick.toString().padStart(3, '0')}</text>
              </g>
            );
          })}

          <motion.path d={areaD} fill="url(#proAreaGradient)" />
          <motion.path d={pathD} fill="none" stroke="#2563eb" strokeWidth="3" strokeLinecap="round" />

          {points.map((p, i) => (
            <g key={i} onMouseEnter={() => setHoveredIndex(i)} onMouseLeave={() => setHoveredIndex(null)}>
              <rect x={p.x - 20} y={paddingTop} width="40" height={chartHeight} fill="transparent" />
              {hoveredIndex === i && (
                <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <line x1={p.x} y1={paddingTop} x2={p.x} y2={height - paddingBottom} stroke="#2563eb" strokeWidth="1" strokeDasharray="4 2" />
                  <circle cx={p.x} cy={p.y} r="5" fill="#2563eb" stroke="white" strokeWidth="2" />
                </motion.g>
              )}
              {hoveredIndex !== i && <circle cx={p.x} cy={p.y} r="3" fill="white" stroke="#e2e8f0" strokeWidth="1.5" />}
            </g>
          ))}
        </svg>

        {/* Tooltip */}
        <AnimatePresence>
          {hoveredIndex !== null && points[hoveredIndex] && (
            <motion.div 
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 5, scale: 0.95 }}
              className="absolute z-30 pointer-events-none"
              style={{ 
                left: `${(points[hoveredIndex].x / width) * 100}%`, 
                top: `${(points[hoveredIndex].y / height) * 100}%`,
                transform: `translate(${hoveredIndex === visibleData.length - 1 ? '-100%' : hoveredIndex === 0 ? '0%' : '-50%'}, -130%)`
              }}
            >
              <div className="bg-white/90 backdrop-blur-md p-3 rounded-2xl shadow-xl border border-white flex flex-col gap-1 min-w-[120px]">
                <div className="flex items-center justify-between">
                  <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest">{visibleData[hoveredIndex].day}</p>
                  <Zap className="w-2.5 h-2.5 text-blue-600" />
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="text-xl font-black text-slate-900 tracking-tighter">{visibleData[hoveredIndex].count}</span>
                  <span className="text-[9px] font-bold text-slate-400 uppercase">Hits</span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Footer */}
      <div className="mt-4 flex justify-between px-4 border-t border-slate-50 pt-4">
        {visibleData.map((d, i) => (
          <span key={i} className={`text-[9px] font-black uppercase tracking-widest ${hoveredIndex === i ? 'text-blue-600' : 'text-slate-300'}`}>
            {d.day}
          </span>
        ))}
      </div>
    </div>
  );
}
