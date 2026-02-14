"use client";

import { Mail, Phone, MapPin, Github, Linkedin, Instagram } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Footer({ initialSettings, initialServices }: { initialSettings: any, initialServices: any[] }) {
  const pathname = usePathname();

  // Jangan tampilkan di halaman admin
  if (pathname?.startsWith("/admin")) return null;

  return (
    <footer className="bg-slate-950 text-slate-400 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Garis pemisah tipis antara CTA dan Footer Content */}
        <div className="border-t border-white/5 pt-20">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-20">
            <div className="col-span-1 md:col-span-1">
              <Link href="/" className="flex items-center gap-4 mb-8 group">
                <img 
                  src={initialSettings?.siteIcon || "/logo/hexa.png"} 
                  alt={initialSettings?.companyName || "Hexanusa"} 
                  className="h-10 w-10 object-contain" 
                />
                <span className="text-xl font-black text-white tracking-tighter uppercase">
                  {initialSettings?.companyName || "HEXANUSA"}
                </span>
              </Link>
              <p className="text-sm leading-relaxed text-slate-500 font-medium">
                {initialSettings?.heroDesc?.substring(0, 120)}...
              </p>
            </div>

            <div>
              <h4 className="text-white font-bold mb-8 uppercase tracking-widest text-[10px]">Layanan</h4>
              <ul className="space-y-4 text-sm font-semibold">
                {initialServices?.map((service) => (
                  <li key={service.id}>
                    <Link href="#services" className="hover:text-blue-500 transition-colors">
                      {service.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold mb-8 uppercase tracking-widest text-[10px]">Perusahaan</h4>
              <ul className="space-y-4 text-sm font-semibold">
                <li><Link href="#home" className="hover:text-blue-500 transition-colors">Beranda</Link></li>
                <li><Link href="#about" className="hover:text-blue-500 transition-colors">Tentang Kami</Link></li>
                <li><Link href="#portfolio" className="hover:text-blue-500 transition-colors">Portofolio</Link></li>
                <li><Link href="#contact" className="hover:text-blue-600 transition-colors">Kontak</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold mb-8 uppercase tracking-widest text-[10px]">Kontak</h4>
              <ul className="space-y-4 text-sm font-semibold">
                <li className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                  <span className="text-xs leading-relaxed">{initialSettings?.contactAddress}</span>
                </li>
                <li className="flex items-center gap-3 text-white">
                  <Mail className="w-5 h-5 text-blue-600" />
                  <span className="text-xs">{initialSettings?.contactEmail}</span>
                </li>
                <li className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-blue-600" />
                  <span className="text-xs">{initialSettings?.contactPhone}</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row justify-between items-center gap-8 border-t border-white/5 pt-12">
            <p className="text-[10px] text-slate-600 font-bold uppercase tracking-[0.3em]">
              &copy; {new Date().getFullYear()} {initialSettings?.companyName || "Hexanusa Technology"}. All rights reserved.
            </p>
            <div className="flex gap-8">
              {initialSettings?.socialIg && (
                <a href={initialSettings.socialIg} target="_blank" rel="noopener noreferrer" className="text-slate-600 hover:text-white transition-colors">
                  <Instagram className="w-5 h-5" />
                </a>
              )}
              {initialSettings?.socialLi && (
                <a href={initialSettings.socialLi} target="_blank" rel="noopener noreferrer" className="text-slate-600 hover:text-white transition-colors">
                  <Linkedin className="w-5 h-5" />
                </a>
              )}
              {initialSettings?.socialGh && (
                <a href={initialSettings.socialGh} target="_blank" rel="noopener noreferrer" className="text-slate-600 hover:text-white transition-colors">
                  <Github className="w-5 h-5" />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
