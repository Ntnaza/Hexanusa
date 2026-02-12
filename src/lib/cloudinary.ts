import { v2 as cloudinary } from 'cloudinary';

// Konfigurasi Cloudinary dengan data dari .env
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

/**
 * Fungsi untuk upload file gambar ke Cloudinary
 */
export async function uploadToCloudinary(file: File, folder: string) {
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  return new Promise<{ url: string; public_id: string }>((resolve, reject) => {
    cloudinary.uploader.upload_stream(
      {
        folder: folder, // Nama folder di Cloudinary (misal: 'hexanusa/portfolio')
        resource_type: 'auto', // Otomatis deteksi gambar/video
      },
      (error, result) => {
        if (error) {
          reject(error);
          return;
        }
        if (result) {
          resolve({
            url: result.secure_url,
            public_id: result.public_id,
          });
        }
      }
    ).end(buffer);
  });
}

/**
 * Fungsi untuk menghapus gambar dari Cloudinary (opsional untuk nanti)
 */
export async function deleteFromCloudinary(publicId: string) {
    try {
        await cloudinary.uploader.destroy(publicId);
    } catch (error) {
        console.error("Gagal hapus gambar cloudinary:", error);
    }
}