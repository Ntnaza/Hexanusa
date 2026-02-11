import { prisma } from "@/lib/prisma";
import AboutClient from "./AboutClient";

export default async function AdminAbout() {
  const settings = await prisma.siteSettings.findUnique({ where: { id: 1 } });
  const features = await prisma.aboutFeature.findMany({ orderBy: { order: "asc" } });

  if (!settings) return <div className="p-10 text-center">Data belum siap.</div>;

  const combinedData = {
    aboutTitle: settings.aboutTitle,
    aboutDesc: settings.aboutDesc,
    aboutImage: settings.aboutImage,
    features: features
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">Tentang Perusahaan</h1>
        <p className="text-slate-500 font-medium mt-1">Kelola narasi, visi, dan keunggulan strategis Hexanusa.</p>
      </div>

      <AboutClient initialData={combinedData} />
    </div>
  );
}
