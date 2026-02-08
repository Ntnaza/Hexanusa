"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function sendContactMessage(data: { name: string, email: string, message: string }) {
  try {
    await prisma.contactMessage.create({
      data: {
        name: data.name,
        email: data.email,
        message: data.message,
      },
    });
    revalidatePath("/admin/messages");
    return { success: true };
  } catch (error) {
    console.error("Gagal mengirim pesan:", error);
    return { success: false, error: "Terjadi kesalahan saat mengirim pesan." };
  }
}
