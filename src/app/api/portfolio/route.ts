import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { uploadToCloudinary } from "@/lib/cloudinary";

export async function GET() {
  const projects = await prisma.portfolio.findMany({
    orderBy: { order: "asc" },
  });
  return NextResponse.json(projects);
}

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const id = formData.get("id") ? Number(formData.get("id")) : undefined;
    const title = formData.get("title") as string;
    const category = formData.get("category") as string;
    const description = formData.get("description") as string;
    const link = formData.get("link") as string;
    const file = formData.get("image_file") as File;
    
    let imageUrl = "";

    // Jika update, ambil image lama dulu sebagai fallback
    if (id) {
      const existing = await prisma.portfolio.findUnique({ where: { id } });
      imageUrl = existing?.image || "";
    }

    // Jika ada file baru yang diupload ke Cloudinary
    if (file && file.size > 0) {
      const uploadResult = await uploadToCloudinary(file, "hexanusa/portfolio");
      imageUrl = uploadResult.url;
    }

    const data = {
      title,
      category,
      description,
      link,
      image: imageUrl,
    };

    if (id) {
      await prisma.portfolio.update({ where: { id }, data });
    } else {
      await prisma.portfolio.create({ data: { ...data, order: 0 } });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Portfolio API Error:", error);
    return NextResponse.json({ success: false, error: "Gagal menyimpan portofolio" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ success: false, error: "ID tidak ditemukan" }, { status: 400 });
    }

    await prisma.portfolio.delete({
      where: { id: Number(id) },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Portfolio Delete API Error:", error);
    return NextResponse.json({ success: false, error: "Gagal menghapus portofolio" }, { status: 500 });
  }
}
