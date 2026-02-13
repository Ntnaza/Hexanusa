import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { uploadToCloudinary } from "@/lib/cloudinary";

export async function GET() {
  const settings = await prisma.sitesettings.findUnique({ where: { id: 1 } });
  return NextResponse.json(settings);
}

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const companyName = formData.get("companyName") as string;
    const contactEmail = formData.get("contactEmail") as string;
    const contactPhone = formData.get("contactPhone") as string;
    const contactAddress = formData.get("contactAddress") as string;
    const contactMaps = formData.get("contactMaps") as string;
    const socialIg = formData.get("socialIg") as string;
    const socialLi = formData.get("socialLi") as string;
    const socialGh = formData.get("socialGh") as string;

    const logoFile = formData.get("logoFile") as File;
    const iconFile = formData.get("iconFile") as File;

    let siteLogo = undefined;
    let siteIcon = undefined;

    // Handle Landscape Logo ke Cloudinary
    if (logoFile && logoFile.size > 0) {
      const uploadResult = await uploadToCloudinary(logoFile, "hexanusa/logo");
      siteLogo = uploadResult.url;
    }

    // Handle Square Icon ke Cloudinary
    if (iconFile && iconFile.size > 0) {
      const uploadResult = await uploadToCloudinary(iconFile, "hexanusa/icon");
      siteIcon = uploadResult.url;
    }

    await prisma.sitesettings.update({
      where: { id: 1 },
      data: {
        companyName,
        contactEmail,
        contactPhone,
        contactAddress,
        contactMaps,
        socialIg,
        socialLi,
        socialGh,
        ...(siteLogo && { siteLogo }),
        ...(siteIcon && { siteIcon })
      }
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}