"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function markAsRead(id: number) {
  await prisma.contactMessage.update({
    where: { id },
    data: { isRead: true }
  });
  revalidatePath("/admin/messages");
}

export async function deleteMessage(id: number) {
  await prisma.contactMessage.delete({
    where: { id }
  });
  revalidatePath("/admin/messages");
}
