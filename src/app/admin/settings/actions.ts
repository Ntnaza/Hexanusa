"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { writeFile } from "fs/promises";
import { join } from "path";

export async function getSettings() {
  const settings = await prisma.siteSettings.findUnique({ where: { id: 1 } });
  const features = await prisma.aboutFeature.findMany({ orderBy: { order: "asc" } });
  return { ...settings, features };
}

export async function updateSettings(formData: FormData) {
  try {
    const file = formData.get("aboutImageFile") as File;
    let aboutImageUrl = formData.get("aboutImage") as string;

    // 1. Upload Foto jika ada
    if (file && file.size > 0) {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const filename = `about-${Date.now()}-${file.name.replace(/\s+/g, '-')}`;
      const path = join(process.cwd(), "public/uploads", filename);
      await writeFile(path, buffer);
      aboutImageUrl = `/uploads/${filename}`;
    }

    // 2. Update SiteSettings
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

    // 3. Update 4 Fitur Keunggulan
    const features = JSON.parse(formData.get("features") as string);
    for (const f of features) {
      if (f.id) {
        await prisma.aboutFeature.update({
          where: { id: Number(f.id) },
          data: { title: f.title, desc: f.desc, icon: f.icon }
        });
      }
    }

    revalidatePath("/");
    revalidatePath("/admin/settings");
    return { success: true };
  } catch (error) {
    console.error("Gagal update settings:", error);
    return { success: false };
  }
}
