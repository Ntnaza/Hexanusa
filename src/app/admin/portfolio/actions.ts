"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { uploadToCloudinary } from "@/lib/cloudinary";

export async function savePortfolio(formData: FormData) {
  try {
    const id = formData.get("id") ? parseInt(formData.get("id") as string) : undefined;
    const title = formData.get("title") as string;
    const category = formData.get("category") as string;
    const description = formData.get("description") as string;
    const link = formData.get("link") as string;
    const imageFile = formData.get("image_file") as File | null;

    let imageUrl = undefined;

    // Proses upload jika ada file baru ke Cloudinary
    if (imageFile && typeof imageFile !== "string" && imageFile.size > 0) {
      const uploadResult = await uploadToCloudinary(imageFile, "hexanusa/portfolio");
      imageUrl = uploadResult.url;
    }

    if (id) {
      await prisma.portfolio.update({
        where: { id },
        data: {
          title,
          category,
          description,
          link,
          ...(imageUrl && { image: imageUrl })
        }
      });
    } else {
      if (!imageUrl) throw new Error("Gambar wajib diunggah untuk proyek baru.");
      await prisma.portfolio.create({
        data: {
          title,
          category,
          description,
          image: imageUrl,
          order: 0
        }
      });
    }
    
    revalidatePath("/");
    revalidatePath("/admin/portfolio");
    return { success: true };
  } catch (error: any) {
    console.error("Error in savePortfolio:", error);
    return { success: false, error: error.message };
  }
}

export async function deletePortfolio(id: number) {
  try {
    console.log("Menghapus portfolio dengan ID:", id);
    await prisma.portfolio.delete({
      where: { id },
    });
    revalidatePath("/");
    revalidatePath("/admin/portfolio");
    return { success: true };
  } catch (error: any) {
    console.error("Error deleting portfolio:", error);
    return { success: false, error: error.message || "Gagal menghapus portfolio" };
  }
}
