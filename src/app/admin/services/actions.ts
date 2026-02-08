"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function getServices() {
  return await prisma.service.findMany({
    orderBy: { order: "asc" },
  });
}

export async function saveService(data: { id?: number, title: string, desc: string, iconName: string, color: string }) {
  if (data.id) {
    // Update data lama
    await prisma.service.update({
      where: { id: data.id },
      data: {
        title: data.title,
        desc: data.desc,
        iconName: data.iconName,
        color: data.color
      }
    });
  } else {
    // Tambah data baru
    await prisma.service.create({
      data: {
        title: data.title,
        desc: data.desc,
        iconName: data.iconName,
        color: data.color,
        order: 0 // Default order
      }
    });
  }
  
  // Beritahu Next.js untuk memperbarui tampilan halaman publik
  revalidatePath("/");
  revalidatePath("/admin/services");
}

export async function deleteService(id: number) {
  await prisma.service.delete({
    where: { id },
  });
  revalidatePath("/");
  revalidatePath("/admin/services");
}