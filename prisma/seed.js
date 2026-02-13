const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  console.log("Membersihkan data lama...");
  await prisma.service.deleteMany();
  await prisma.portfolio.deleteMany();
  await prisma.teammember.deleteMany();
  await prisma.aboutfeature.deleteMany();
  await prisma.sitesettings.deleteMany();
  await prisma.user.deleteMany();
  await prisma.heroslide.deleteMany();

  console.log("Mengisi data baru (Full Bahasa Indonesia)...");

  // 1. Data Hero Slides (Ini yang Baru!)
  await prisma.heroslide.createMany({
    data: [
      { 
        title: "Membangun Masa Depan Digital Anda dengan Presisi Tinggi.", 
        desc: "Hexanusa menghadirkan ekosistem teknologi cerdas untuk membantu transformasi digital bisnis Anda menjadi lebih efisien.",
        order: 1 
      },
      { 
        title: "Solusi Perangkat Lunak Kustom untuk Bisnis Modern.", 
        desc: "Kami menciptakan sistem yang dirancang khusus untuk menjawab tantangan unik dan mempercepat pertumbuhan perusahaan Anda.",
        order: 2 
      },
      { 
        title: "Inovasi Tanpa Batas dalam Setiap Baris Kode.", 
        desc: "Bergabunglah dengan puluhan perusahaan yang telah mempercayakan transformasi digital mereka kepada tim ahli kami.",
        order: 3 
      },
    ]
  });

  // 2. Pengaturan Umum (Site Settings)
  await prisma.sitesettings.create({
    data: {
      id: 1,
      companyName: "Hexanusa Digital",
      siteLogo: "/logo/hexa.png",
      siteIcon: "/logo/hexa.png",
      heroTitle: "Membangun Masa Depan Digital Anda dengan Presisi Tinggi.",
      heroDesc: "Hexanusa menghadirkan ekosistem teknologi cerdas untuk membantu transformasi digital bisnis Anda menjadi lebih efisien, skalabel, dan unggul dalam kompetisi global.",
      aboutTitle: "Kami Merancang dan Membangun Produk Digital yang Berdampak.",
      aboutDesc: "Hexanusa bukan sekadar vendor IT biasa. Kami adalah mitra strategis Anda dalam membangun produk digital inovatif. Dengan kombinasi keahlian teknis tingkat tinggi dan kreativitas tanpa batas, kami siap mewujudkan visi teknologi Anda menjadi kenyataan yang bernilai ekonomi tinggi.",
      aboutImage: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=1200",
      contactEmail: "halo@hexanusa.com",
      contactPhone: "+62 812 3456 7890",
      contactAddress: "Kawasan Bisnis Sudirman (SCBD), Jakarta, Indonesia",
      contactMaps: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.273831741021!2d106.8048123!3d-6.2275605!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f15050dc6001%3A0x8aa4669539519970!2sPacific%20Place!5e0!3m2!1sid!2sid!4v1700000000000!5m2!1sid!2sid",
      socialIg: "https://instagram.com/hexanusa",
      socialLi: "https://linkedin.com/company/hexanusa",
      socialGh: "https://github.com/hexanusa"
    }
  });

  // 2. Layanan
  await prisma.service.createMany({
    data: [
      { title: "Pengembangan Web", desc: "Membangun ekosistem website yang cepat, aman, dan berorientasi pada konversi penjualan.", iconName: "Globe", color: "blue", order: 1 },
      { title: "Aplikasi Mobile", desc: "Pengembangan aplikasi Android & iOS yang intuitif dengan performa tinggi dan desain modern.", iconName: "Smartphone", color: "indigo", order: 2 },
      { title: "Perangkat Lunak Bisnis", desc: "Sistem internal terpadu (ERP/CRM) yang dirancang khusus untuk efisiensi operasional perusahaan.", iconName: "Cpu", color: "blue", order: 3 },
      { title: "Solusi Cloud", desc: "Infrastruktur server awan yang skalabel untuk memastikan data bisnis Anda selalu aman dan mudah diakses.", iconName: "Cloud", color: "indigo", order: 4 },
      { title: "Inovasi Digital", desc: "Membantu bisnis tradisional beradaptasi dengan tren teknologi terbaru untuk masa depan.", iconName: "Rocket", color: "blue", order: 5 },
      { title: "Konsultasi Ahli", desc: "Konsultasi teknis mendalam untuk pemilihan teknologi yang tepat bagi setiap proyek Anda.", iconName: "Code2", color: "indigo", order: 6 },
    ]
  });

  // 3. Portofolio
  await prisma.portfolio.createMany({
    data: [
      { title: "E-Commerce Vortex", category: "Pengembangan Web", image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800", order: 1 },
      { title: "Aplikasi Finansial Nova", category: "Perangkat Lunak Bisnis", image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800", order: 2 },
      { title: "MedPlus Mobile", category: "Aplikasi Mobile", image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=800", order: 3 },
      { title: "Sistem LogiTrack", category: "Solusi Kustom", image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=800", order: 4 },
      { title: "Skyline Real Estate", category: "Pengembangan Web", image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=800", order: 5 },
      { title: "EduSmart Learning", category: "Inovasi Digital", image: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?auto=format&fit=crop&q=80&w=800", order: 6 },
    ]
  });

  // 4. Tim Inti
  await prisma.teammember.createMany({
    data: [
      { name: "Koh Engkoh", role: "Pendiri & CTO", image: "https://i.pravatar.cc/300?u=koh", bio: "Visiuner di balik arsitektur teknologi Hexanusa dengan pengalaman lebih dari 10 tahun.", order: 1, linkedin: "#", github: "#", instagram: "#" },
      { name: "Sarah Alana", role: "Ketua Desainer UI/UX", image: "https://i.pravatar.cc/300?u=sarah", bio: "Spesialis dalam menciptakan pengalaman pengguna yang estetik, modern, dan fungsional.", order: 2, linkedin: "#", github: "#", instagram: "#" },
      { name: "Taufik Hidayat", role: "Insinyur Backend Senior", image: "https://i.pravatar.cc/300?u=taufik", bio: "Ahli dalam mengoptimalkan performa database dan keamanan sistem tingkat tinggi.", order: 3, linkedin: "#", github: "#", instagram: "#" },
    ]
  });

  // 5. Fitur Keunggulan
  await prisma.aboutfeature.createMany({
    data: [
      { title: "Rekayasa Premium", desc: "Dikembangkan oleh tenaga ahli berpengalaman dengan standar pengkodean kelas dunia.", icon: "Code2", order: 1 },
      { title: "Teknologi Mutakhir", desc: "Menggunakan tumpukan teknologi terbaru seperti Next.js, Laravel, dan Cloud Native.", icon: "Zap", order: 2 },
      { title: "Keamanan Terjamin", desc: "Keamanan data adalah prioritas utama kami dengan perlindungan enkripsi berlapis.", icon: "ShieldCheck", order: 3 },
      { title: "Dukungan Dedikasi", desc: "Tim kami siap sedia membantu Anda mengatasi segala kendala teknis setiap saat.", icon: "Award", order: 4 },
    ]
  });

  // 6. User Admin (PENTING: Gunakan Hash untuk Bcrypt)
  const bcrypt = require("bcryptjs");
  const hashedPassword = await bcrypt.hash("admin123", 10);
  
  await prisma.user.upsert({
    where: { username: "admin" },
    update: {},
    create: { 
      username: "admin", 
      password: hashedPassword 
    }
  });

  console.log("Seeding selesai! User admin: admin / admin123");
}

main().finally(async () => await prisma.$disconnect());
