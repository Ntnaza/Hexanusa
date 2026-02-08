import { prisma } from "@/lib/prisma";
import SettingsClient from "./SettingsClient";

export default async function AdminSettings() {
  // 1. Ambil Pengaturan Utama
  const settings = await prisma.siteSettings.findUnique({
    where: { id: 1 },
  });

  // 2. Ambil 4 Poin Keunggulan (Ini yang tadi ketinggalan!)
  const features = await prisma.aboutFeature.findMany({
    orderBy: { order: "asc" },
  });

  // Jaga-jaga kalau belum ada data (Seeding belum jalan/gagal)
  if (!settings) {
    return <div className="p-10 text-center">Data belum siap. Silakan jalankan seeder atau hubungi admin.</div>;
  }

  // Gabungkan datanya dan kirim ke form
  const combinedData = {
    ...settings,
    features: features
  };

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div>
        <h1 className="text-4xl font-black text-slate-900 tracking-tight">Pengaturan Situs</h1>
        <p className="text-slate-500 font-medium mt-2">Pusat kendali teks dan informasi dasar website Hexanusa.</p>
      </div>

      <SettingsClient initialData={combinedData} />
    </div>
  );
}