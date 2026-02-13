import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const SECRET_KEY = new TextEncoder().encode(process.env.JWT_SECRET);

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("admin_token")?.value;

  // 1. Lindungi rute admin
  if (pathname.startsWith("/admin")) {
    // Kecualikan halaman login
    if (pathname === "/admin/login") {
      // Jika sudah punya token valid, langsung lempar ke dashboard
      if (token) {
        try {
          await jwtVerify(token, SECRET_KEY);
          return NextResponse.redirect(new URL("/admin", request.url));
        } catch (e) {
          // Token tidak valid, biarkan di login
        }
      }
      return NextResponse.next();
    }

    // Jika tidak ada token, tendang ke login
    if (!token) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }

    try {
      // Verifikasi token
      await jwtVerify(token, SECRET_KEY);
      return NextResponse.next();
    } catch (error) {
      // Token expired atau palsu, hapus cookie dan tendang ke login
      const response = NextResponse.redirect(new URL("/admin/login", request.url));
      response.cookies.delete("admin_token");
      return response;
    }
  }

  return NextResponse.next();
}

// Hanya jalankan middleware di rute admin
export const config = {
  matcher: ["/admin/:path*"],
};
