"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { uploadToCloudinary } from "@/lib/cloudinary";

export async function getSettings() {
  const settings = await prisma.sitesettings.findUnique({ where: { id: 1 } });
  const features = await prisma.aboutfeature.findMany({ orderBy: { order: "asc" } });
  return { ...settings, features };
}

export async function updateSettings(formData: FormData) {
  try {
    const file = formData.get("aboutImageFile") as File;
    let aboutImageUrl = formData.get("aboutImage") as string;

    // 1. Upload Foto jika ada ke Cloudinary
    if (file && file.size > 0) {
      const uploadResult = await uploadToCloudinary(file, "hexanusa/about");
      aboutImageUrl = uploadResult.url;
    }

    // 2. Update SiteSettings
    await prisma.sitesettings.update({
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
        await prisma.aboutfeature.update({
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
