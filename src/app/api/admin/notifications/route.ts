import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const [unreadCount, latestMessages] = await Promise.all([
      prisma.contactmessage.count({
        where: { isRead: false }
      }),
      prisma.contactmessage.findMany({
        where: { isRead: false },
        orderBy: { createdAt: "desc" },
        take: 5,
        select: {
          id: true,
          name: true,
          message: true,
          createdAt: true
        }
      })
    ]);

    return NextResponse.json({
      unreadCount,
      latestMessages
    });
  } catch (error) {
    console.error("Notifications API Error:", error);
    return NextResponse.json({ error: "Gagal mengambil notifikasi" }, { status: 500 });
  }
}
