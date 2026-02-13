import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const services = await prisma.service.findMany({
    orderBy: { order: "asc" },
  });
  return NextResponse.json(services);
}

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const { id, title, desc, iconName, color } = data;

    if (id) {
      await prisma.service.update({
        where: { id: Number(id) },
        data: { title, desc, iconName, color },
      });
    } else {
      await prisma.service.create({
        data: { title, desc, iconName, color, order: 0 },
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Service API Error:", error);
    return NextResponse.json({ success: false, error: "Gagal menyimpan layanan" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) throw new Error("ID tidak ditemukan");

    await prisma.service.delete({
      where: { id: Number(id) },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Service API Delete Error:", error);
    return NextResponse.json({ success: false, error: "Gagal menghapus layanan" }, { status: 500 });
  }
}
