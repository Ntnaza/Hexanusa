"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function saveHeroSlide(data: { id?: number, title: string, desc: string }) {
  if (data.id) {
    await prisma.heroslide.update({
      where: { id: data.id },
      data: { title: data.title, desc: data.desc }
    });
  } else {
    await prisma.heroslide.create({
      data: { title: data.title, desc: data.desc, order: 0 }
    });
  }
  revalidatePath("/");
  revalidatePath("/admin/hero");
}

export async function deleteHeroSlide(id: number) {
  await prisma.heroslide.delete({ where: { id } });
  revalidatePath("/");
  revalidatePath("/admin/hero");
}
