"use server";

import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { SignJWT } from "jose";
import { cookies, headers } from "next/headers";

const SECRET_KEY = new TextEncoder().encode(process.env.JWT_SECRET);

export async function loginAction(formData: FormData) {
  const username = formData.get("username") as string;
  const password = formData.get("password") as string;
  
  const headerList = await headers();
  const ip = headerList.get("x-forwarded-for") || "unknown";
  const userAgent = headerList.get("user-agent") || "unknown";

  // Proteksi Dasar
  if (!username || !password || username.length < 3 || password.length < 5) {
    return { success: false, message: "Kredensial tidak valid." };
  }

  try {
    const user = await prisma.user.findUnique({
      where: { username },
    });

    if (!user) {
      // Catat percobaan gagal meskipun user tidak ada
      await prisma.auditlog.create({
        data: { username, status: "FAILED", ipAddress: ip, userAgent }
      });
      return { success: false, message: "Kredensial tidak valid." };
    }

    // 2. Cek apakah akun sedang terkunci
    if (user.lockUntil && user.lockUntil > new Date()) {
      const remainingMinutes = Math.ceil((user.lockUntil.getTime() - Date.now()) / 60000);
      return { 
        success: false, 
        message: `Keamanan: Terlalu banyak percobaan. Coba lagi dalam ${remainingMinutes} menit.` 
      };
    }

    // 3. Cek password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    
    if (!isPasswordValid) {
      await prisma.auditlog.create({
        data: { username, status: "FAILED", ipAddress: ip, userAgent }
      });
      
      const newAttempts = user.loginAttempts + 1;
      const isLocking = newAttempts >= 5;
      
      await prisma.user.update({
        where: { id: user.id },
        data: {
          loginAttempts: isLocking ? 0 : newAttempts,
          lockUntil: isLocking ? new Date(Date.now() + 15 * 60 * 1000) : null
        }
      });

      return { success: false, message: "Kredensial tidak valid." };
    }

    // 4. Login Berhasil
    await prisma.auditlog.create({
      data: { username, status: "SUCCESS", ipAddress: ip, userAgent }
    });

    await prisma.user.update({
      where: { id: user.id },
      data: { loginAttempts: 0, lockUntil: null }
    });

    // 5. Buat JWT Token yang aman
    const token = await new SignJWT({ 
        userId: user.id, 
        username: user.username 
      })
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("2h") // Token mati dalam 2 jam
      .sign(SECRET_KEY);

    // 4. Simpan di HTTP-Only Cookie (Sangat Aman)
    const cookieStore = await cookies();
    cookieStore.set("admin_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 2, // 2 Jam
      path: "/",
    });

    return { success: true };
  } catch (error) {
    console.error("Login Error:", error);
    return { success: false, message: "Terjadi kesalahan sistem." };
  }
}

export async function logoutAction() {
    const cookieStore = await cookies();
    cookieStore.delete("admin_token");
    return { success: true };
}
