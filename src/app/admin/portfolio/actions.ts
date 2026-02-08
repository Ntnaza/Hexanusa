"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function savePortfolio(data: { id?: number, title: string, category: string, image: string, link?: string }) {
  if (data.id) {
    await prisma.portfolio.update({
      where: { id: data.id },
      data: {
        title: data.title,
        category: data.category,
        image: data.image,
        link: data.link
      }
    });
  } else {
    await prisma.portfolio.create({
      data: {
        title: data.title,
        category: data.category,
        image: data.image,
        link: data.link,
        order: 0
      }
    });
  }
  
  revalidatePath("/");
  revalidatePath("/admin/portfolio");
}

export async function deletePortfolio(id: number) {
  await prisma.portfolio.delete({
    where: { id },
  });
  revalidatePath("/");
  revalidatePath("/admin/portfolio");
}
