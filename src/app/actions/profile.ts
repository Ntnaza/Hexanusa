"use server";

import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { jwtVerify } from "jose";

const SECRET_KEY = new TextEncoder().encode(process.env.JWT_SECRET);

export async function updateProfileAction(formData: FormData) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("admin_token")?.value;

    if (!token) return { success: false, message: "Sesi berakhir. Silakan login kembali." };

    const { payload } = await jwtVerify(token, SECRET_KEY);
    const userId = payload.userId as number;

    const newUsername = formData.get("username") as string;
    const currentPassword = formData.get("currentPassword") as string;
    const newPassword = formData.get("newPassword") as string;

    // 1. Ambil data user saat ini
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) return { success: false, message: "User tidak ditemukan." };

    // 2. Validasi Password Saat Ini
    const isPasswordValid = await bcrypt.compare(currentPassword, user.password);
    if (!isPasswordValid) return { success: false, message: "Password saat ini salah." };

    // 3. Siapkan data update
    const updateData: any = { username: newUsername };
    if (newPassword && newPassword.length >= 6) {
      updateData.password = await bcrypt.hash(newPassword, 10);
    }

    // 4. Update Database
    await prisma.user.update({
      where: { id: userId },
      data: updateData
    });

    revalidatePath("/admin");
    return { success: true, message: "Profil berhasil diperbarui!" };
  } catch (error) {
    console.error(error);
    return { success: false, message: "Terjadi kesalahan sistem." };
  }
}
