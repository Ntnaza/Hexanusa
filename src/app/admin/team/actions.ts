"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { uploadToCloudinary } from "@/lib/cloudinary";

export async function saveTeamMember(formData: FormData) {
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
    await prisma.teamMember.update({ where: { id }, data });
  } else {
    await prisma.teamMember.create({ data: { ...data, order: 0 } });
  }
  
  revalidatePath("/");
  revalidatePath("/admin/team");
}

export async function deleteTeamMember(id: number) {
  await prisma.teamMember.delete({ where: { id } });
  revalidatePath("/");
  revalidatePath("/admin/team");
}