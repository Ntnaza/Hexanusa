import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get("q");

    if (!query || query.length < 2) {
      return NextResponse.json([]);
    }

    // Cari di berbagai tabel secara paralel
    const [portfolios, team, services] = await Promise.all([
      prisma.portfolio.findMany({
        where: { title: { contains: query } },
        take: 5,
        select: { id: true, title: true, category: true }
      }),
      prisma.teammember.findMany({
        where: { name: { contains: query } },
        take: 5,
        select: { id: true, name: true, role: true }
      }),
      prisma.service.findMany({
        where: { title: { contains: query } },
        take: 5,
        select: { id: true, title: true }
      })
    ]);

    // Format hasil pencarian
    const results = [
      ...portfolios.map(p => ({ id: p.id, title: p.title, type: "Portfolio", link: "/admin/portfolio" })),
      ...team.map(t => ({ id: t.id, title: t.name, type: "Team", link: "/admin/team" })),
      ...services.map(s => ({ id: s.id, title: s.title, type: "Service", link: "/admin/services" }))
    ];

    return NextResponse.json(results);
  } catch (error) {
    console.error("Global Search Error:", error);
    return NextResponse.json({ error: "Gagal melakukan pencarian" }, { status: 500 });
  }
}
