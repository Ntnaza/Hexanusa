import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { uploadToCloudinary } from "@/lib/cloudinary";

export async function GET() {
  try {
    const testimonials = await prisma.testimonial.findMany({
      orderBy: { order: "asc" },
    });
    return NextResponse.json(testimonials);
  } catch (error) {
    return NextResponse.json({ error: "Gagal mengambil data" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const id = formData.get("id") as string;
    const name = formData.get("name") as string;
    const role = formData.get("role") as string;
    const content = formData.get("content") as string;
    const order = parseInt(formData.get("order") as string || "0");
    const imageFile = formData.get("imageFile") as File;

    let imageUrl = undefined;

    // Menggunakan metode yang sama dengan 'Tentang Kami'
    if (imageFile && typeof imageFile !== "string" && imageFile.size > 0) {
      const uploadResult = await uploadToCloudinary(imageFile, "hexanusa/testimonials");
      imageUrl = uploadResult.url;
    }

    if (id) {
      await prisma.testimonial.update({
        where: { id: parseInt(id) },
        data: { 
          name, 
          role, 
          content, 
          order, 
          ...(imageUrl && { image: imageUrl }) 
        },
      });
    } else {
      await prisma.testimonial.create({
        data: { 
          name, 
          role, 
          content, 
          order, 
          image: imageUrl || "" 
        },
      });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Testimonial API Error:", err);
    return NextResponse.json({ success: false, error: "Gagal menyimpan testimonial" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { id } = await req.json();
    await prisma.testimonial.delete({ where: { id: parseInt(id) } });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
