import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { uploadToCloudinary } from "@/lib/cloudinary";

export async function GET() {
  const team = await prisma.teammember.findMany({
    orderBy: { order: "asc" },
  });
  return NextResponse.json(team);
}

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const id = formData.get("id") ? Number(formData.get("id")) : undefined;
    const name = formData.get("name") as string;
    const role = formData.get("role") as string;
    const bio = formData.get("bio") as string;
    const linkedin = formData.get("linkedin") as string;
    const github = formData.get("github") as string;
    const instagram = formData.get("instagram") as string;
    const file = formData.get("image_file") as File;
    
    let imageUrl = formData.get("image_url") as string;

    // Jika ada file baru yang diupload ke Cloudinary
    if (file && file.size > 0) {
      const uploadResult = await uploadToCloudinary(file, "hexanusa/team");
      imageUrl = uploadResult.url;
    }

    const data = {
      name,
      role,
      image: imageUrl,
      bio,
      linkedin,
      github,
      instagram,
    };

    if (id) {
      await prisma.teammember.update({ where: { id }, data });
    } else {
      await prisma.teammember.create({ data: { ...data, order: 0 } });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Team API Error:", error);
    return NextResponse.json({ success: false, error: "Gagal menyimpan data tim" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ success: false, error: "ID tidak ditemukan" }, { status: 400 });
    }

    await prisma.teammember.delete({
      where: { id: Number(id) },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Team Delete API Error:", error);
    return NextResponse.json({ success: false, error: "Gagal menghapus data tim" }, { status: 500 });
  }
}
