import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import { join } from "path";

export async function GET() {
  const settings = await prisma.siteSettings.findUnique({ where: { id: 1 } });
  let features = await prisma.aboutFeature.findMany({ orderBy: { order: "asc" } });

  if (features.length === 0) {
    await prisma.aboutFeature.createMany({
      data: [
        { title: "Tim Profesional", desc: "Dikembangkan oleh engineer berpengalaman.", icon: "Users2", order: 1 },
        { title: "Teknologi Terbaru", desc: "Menggunakan stack teknologi modern.", icon: "Zap", order: 2 },
        { title: "Kualitas Terjamin", desc: "Standar coding tinggi dan keamanan data.", icon: "ShieldCheck", order: 3 },
        { title: "Dukungan Penuh", desc: "Layanan support yang sigap membantu.", icon: "Award", order: 4 },
      ]
    });
    features = await prisma.aboutFeature.findMany({ orderBy: { order: "asc" } });
  }

  return NextResponse.json({ ...settings, features });
}

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    
    // Logika upload foto
    const file = formData.get("aboutImageFile") as File;
    let aboutImageUrl = formData.get("aboutImage") as string;

    if (file && file.size > 0) {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const filename = `about-${Date.now()}-${file.name.replace(/\s+/g, '-')}`;
      const path = join(process.cwd(), "public/uploads", filename);
      await writeFile(path, buffer);
      aboutImageUrl = `/uploads/${filename}`;
    }

    // Update Settings
    await prisma.siteSettings.update({
      where: { id: 1 },
      data: {
        heroTitle: formData.get("heroTitle") as string,
        heroDesc: formData.get("heroDesc") as string,
        aboutTitle: formData.get("aboutTitle") as string,
        aboutDesc: formData.get("aboutDesc") as string,
        aboutImage: aboutImageUrl,
        contactEmail: formData.get("contactEmail") as string,
        contactPhone: formData.get("contactPhone") as string,
        contactAddress: formData.get("contactAddress") as string,
        contactMaps: formData.get("contactMaps") as string,
        socialIg: formData.get("socialIg") as string,
        socialLi: formData.get("socialLi") as string,
        socialGh: formData.get("socialGh") as string,
      }
    });

    // Update Features
    const features = JSON.parse(formData.get("features") as string);
    for (const f of features) {
      await prisma.aboutFeature.update({
        where: { id: f.id },
        data: { title: f.title, desc: f.desc }
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}