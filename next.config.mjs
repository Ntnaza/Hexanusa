/** @type {import('next').NextConfig} */
const nextConfig = {
  // 1. Wajib untuk Shared Hosting (cPanel) agar bisa jalan tanpa Vercel
  output: "standalone", 

  // 2. Konfigurasi Gambar Cloudinary
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com', 
        pathname: '**',
      },
    ],
  },

  // 3. Settingan lama Engkoh (tetap kita pertahankan)
  experimental: {
    serverActions: {
      bodySizeLimit: '10mb',
    },
  },
};

export default nextConfig;