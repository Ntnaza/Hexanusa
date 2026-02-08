"use client";

import { Cpu, Mail, Phone, MapPin, Github, Twitter, Linkedin } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Footer() {
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
              <Link href="/" className="flex items-center gap-2 mb-8 group">
                <div className="bg-blue-600 p-2 rounded-xl text-white">
                  <Cpu className="w-6 h-6" />
                </div>
                <span className="text-2xl font-black text-white tracking-tighter">
                  HEXA<span className="text-blue-600">NUSA</span>
                </span>
              </Link>
              <p className="text-sm leading-relaxed text-slate-500 font-medium">
                Membangun masa depan digital melalui solusi perangkat lunak yang inovatif, 
                efisien, dan berorientasi pada hasil nyata.
              </p>
            </div>

            <div>
              <h4 className="text-white font-bold mb-8 uppercase tracking-widest text-[10px]">Layanan</h4>
              <ul className="space-y-4 text-sm font-semibold">
                <li><Link href="#services" className="hover:text-blue-500 transition-colors">Web Development</Link></li>
                <li><Link href="#services" className="hover:text-blue-600 transition-colors">Mobile Apps</Link></li>
                <li><Link href="#services" className="hover:text-blue-600 transition-colors">Enterprise Software</Link></li>
                <li><Link href="#services" className="hover:text-blue-600 transition-colors">Cloud Solution</Link></li>
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
                <li className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-blue-600" />
                  <span>Jakarta, Indonesia</span>
                </li>
                <li className="flex items-center gap-3 text-white">
                  <Mail className="w-5 h-5 text-blue-600" />
                  <span>hello@hexanusa.com</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row justify-between items-center gap-8 border-t border-white/5 pt-12">
            <p className="text-[10px] text-slate-600 font-bold uppercase tracking-[0.3em]">
              &copy; {new Date().getFullYear()} Hexanusa Technology. All rights reserved.
            </p>
            <div className="flex gap-8">
              <Link href="#" className="text-slate-600 hover:text-white transition-colors"><Twitter className="w-5 h-5" /></Link>
              <Link href="#" className="text-slate-600 hover:text-white transition-colors"><Linkedin className="w-5 h-5" /></Link>
              <Link href="#" className="text-slate-600 hover:text-white transition-colors"><Github className="w-5 h-5" /></Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
