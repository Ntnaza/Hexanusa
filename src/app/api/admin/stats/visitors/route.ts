import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { startOfDay, subDays, format } from "date-fns";

export async function GET() {
  try {
    const stats = [];
    
    // Ambil data untuk 7 hari terakhir
    for (let i = 6; i >= 0; i--) {
      const date = subDays(new Date(), i);
      const start = startOfDay(date);
      const end = new Date(start.getTime() + 24 * 60 * 60 * 1000);

      const count = await prisma.visitor.count({
        where: {
          createdAt: {
            gte: start,
            lt: end,
          },
        },
      });

      stats.push({
        day: format(date, "EEE"), // Contoh: Mon, Tue
        fullDate: format(date, "dd MMM"),
        count: count,
      });
    }

    return NextResponse.json(stats);
  } catch (error) {
    console.error("Stats API Error:", error);
    return NextResponse.json({ error: "Gagal mengambil statistik" }, { status: 500 });
  }
}
