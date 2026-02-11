"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { writeFile } from "fs/promises";
import { join } from "path";

export async function savePortfolio(formData: FormData) {
  try {
    const id = formData.get("id") ? parseInt(formData.get("id") as string) : undefined;
    const title = formData.get("title") as string;
    const category = formData.get("category") as string;
    const link = formData.get("link") as string;
    const imageFile = formData.get("image_file") as File | null;

    let imagePath = undefined;

    // Proses upload jika ada file baru (Cek keberadaan file dengan aman)
    if (imageFile && typeof imageFile !== "string" && imageFile.size > 0) {
      const bytes = await imageFile.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const filename = `portfolio-${Date.now()}-${imageFile.name.replace(/\s+/g, '-')}`;
      const path = join(process.cwd(), "public/uploads", filename);
      await writeFile(path, buffer);
      imagePath = `/uploads/${filename}`;
    }

    if (id) {
      await prisma.portfolio.update({
        where: { id },
        data: {
          title,
          category,
          link,
          ...(imagePath && { image: imagePath })
        }
      });
    } else {
      if (!imagePath) throw new Error("Gambar wajib diunggah untuk proyek baru.");
      await prisma.portfolio.create({
        data: {
          title,
          category,
          link,
          image: imagePath,
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
    await prisma.portfolio.delete({
      where: { id },
    });
    revalidatePath("/");
    revalidatePath("/admin/portfolio");
    return { success: true };
  } catch (error) {
    return { success: false };
  }
}
