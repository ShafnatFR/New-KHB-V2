import { motion } from "motion/react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Download, Eye, Share2, Calendar, Layout, FileText, Tag, MessageCircle } from "lucide-react";

const allTemplates = [
  { 
    id: 1, 
    title: "Template Poster Nuansa Ungu Buah-buahan", 
    mainCategory: "Media Cetak",
    subCategory: "Poster", 
    date: "2024-12-17",
    image: "https://picsum.photos/seed/repo1/800/1000",
    desc: "Poster ini didesain dengan tampilan modern dan elegan menggunakan nuansa ungu dan hijau. Sangat cocok untuk promosi produk UMKM berbasis buah-buahan atau makanan segar.",
    author: "KHB Creative Team",
    fileSize: "4.5 MB",
    format: "Canva / PSD",
    dimensions: "A4 (210 x 297 mm)"
  },
  { 
    id: 2, 
    title: "Template Poster Nuansa Hijau Ungu", 
    mainCategory: "Media Cetak",
    subCategory: "Poster", 
    date: "2024-12-17",
    image: "https://picsum.photos/seed/repo2/800/600",
    desc: "Desain poster informatif untuk kampanye produk halal. Menggunakan kontras warna yang menarik untuk meningkatkan awareness pelanggan.",
    author: "KHB Creative Team",
    fileSize: "3.2 MB",
    format: "Canva",
    dimensions: "A4 (210 x 297 mm)"
  },
  { 
    id: 3, 
    title: "Template Poster Landscape Nuansa Hijau Ungu", 
    mainCategory: "Media Cetak",
    subCategory: "Poster", 
    date: "2024-12-17",
    image: "https://picsum.photos/seed/repo3/800/600",
    desc: "Format landscape untuk kebutuhan display digital atau cetak lebar. Memudahkan penempatan informasi yang lebih mendetail.",
    author: "Admin KHB",
    fileSize: "5.1 MB",
    format: "PSD / AI",
    dimensions: "A3 Landscape"
  },
  { 
    id: 4, 
    title: "Template X-Banner Nuansa Biru Hijau", 
    mainCategory: "Media Cetak",
    subCategory: "X-Banner", 
    date: "2024-12-17",
    image: "https://picsum.photos/seed/repo4/800/1200",
    desc: "Banner berdiri untuk promosi di lokasi strategis seperti pameran atau depan toko UMKM.",
    author: "Design Volunteer",
    fileSize: "12 MB",
    format: "TIF / PDF",
    dimensions: "60 x 160 cm"
  },
  { 
    id: 5, 
    title: "Template Kartu Nama Nuansa Alam Modern", 
    mainCategory: "Media Cetak",
    subCategory: "Kartu Nama", 
    date: "2024-12-17",
    image: "https://picsum.photos/seed/repo5/800/500",
    desc: "Kartu nama dengan sentuhan alam yang profesional untuk membangun koneksi bisnis yang lebih baik.",
    author: "KHB Creative Team",
    fileSize: "1.5 MB",
    format: "Canva",
    dimensions: "9 x 5.5 cm"
  },
  { 
    id: 6, 
    title: "Template Feeds Instagram Nuansa Biru Langit", 
    mainCategory: "Media Elektronik",
    subCategory: "IG", 
    date: "2024-12-12",
    image: "https://picsum.photos/seed/repo6/800/800",
    desc: "Postingan feed Instagram yang cerah dan menarik untuk meningkatkan engagement di media sosial.",
    author: "Social Media Team",
    fileSize: "2.8 MB",
    format: "Canva / PNG",
    dimensions: "1080 x 1080 px"
  },
  { 
    id: 7, 
    title: "Template Flyer Nuansa Hijau Profesional", 
    mainCategory: "Media Cetak",
    subCategory: "Flyer", 
    date: "2024-12-17",
    image: "https://picsum.photos/seed/repo7/800/1100",
    desc: "Flyer informatif untuk distribusi massal guna memperkenalkan layanan atau produk baru Anda.",
    author: "Admin KHB",
    fileSize: "3.9 MB",
    format: "PDF",
    dimensions: "A5"
  },
  { 
    id: 8, 
    title: "Template Instagram Story Coklat, Krem, Dan Kopi", 
    mainCategory: "Media Elektronik",
    subCategory: "IG", 
    date: "2024-12-17",
    image: "https://picsum.photos/seed/repo8/800/1400",
    desc: "Story Instagram dengan nuansa hangat dan estetik, cocok untuk produk kuliner kopi atau kue.",
    author: "KHB Creative Team",
    fileSize: "4.2 MB",
    format: "Canva",
    dimensions: "1080 x 1920 px"
  },
  { 
    id: 9, 
    title: "Template Presentasi Bisnis Halal", 
    mainCategory: "Media Elektronik",
    subCategory: "PPT", 
    date: "2024-12-10",
    image: "https://picsum.photos/seed/repo9/800/600",
    desc: "Slide presentasi untuk kebutuhan pitching ke investor atau presentasi program kerja.",
    author: "Corporate Team",
    fileSize: "15 MB",
    format: "PPTX / Google Slides",
    dimensions: "16:9 Screen"
  },
  { 
    id: 10, 
    title: "Template Video Edukasi TikTok", 
    mainCategory: "Media Elektronik",
    subCategory: "TikTok", 
    date: "2024-12-05",
    image: "https://picsum.photos/seed/repo10/800/1400",
    desc: "Format video vertikal untuk konten edukatif guna mengedukasi masyarakat tentang pentingnya produk halal.",
    author: "Video Editor KHB",
    fileSize: "45 MB",
    format: "MP4 / CapCut Project",
    dimensions: "9:16"
  }
];

export default function RepositoryDetail() {
  const { id } = useParams();
  const template = allTemplates.find(t => t.id === parseInt(id || "0"));

  if (!template) {
    return (
      <div className="pt-40 pb-20 text-center">
        <h1 className="text-2xl font-bold mb-4">Template tidak ditemukan</h1>
        <Link to="/repository" className="text-primary font-bold hover:underline">Kembali ke Repository</Link>
      </div>
    );
  }

  return (
    <div className="pt-20 bg-slate-50 min-h-screen">
      <div className="container-custom py-12">
        <Link to="/repository" className="inline-flex items-center gap-2 text-slate-500 hover:text-primary mb-8 font-bold transition-colors">
          <ArrowLeft size={20} />
          Kembali ke Repository
        </Link>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Image Preview */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-[2.5rem] overflow-hidden shadow-xl border border-slate-100 p-4"
          >
            <div className="aspect-[4/5] bg-slate-100 rounded-[2rem] overflow-hidden relative group">
              <img 
                src={template.image} 
                alt={template.title} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-dark/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <button className="bg-white text-dark p-4 rounded-full shadow-2xl transform scale-90 group-hover:scale-100 transition-transform">
                  <Eye size={24} />
                </button>
              </div>
            </div>
          </motion.div>

          {/* Details */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-8"
          >
            <div>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="bg-primary/10 text-primary px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider">
                  {template.mainCategory}
                </span>
                <span className="bg-dark/5 text-dark/60 px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider border border-dark/5">
                  {template.subCategory}
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl font-extrabold text-dark mb-6 leading-tight">
                {template.title}
              </h1>
              <p className="text-lg text-slate-600 leading-relaxed">
                {template.desc}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
                <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider mb-2">Format File</p>
                <div className="flex items-center gap-3">
                  <FileText className="text-primary" size={20} />
                  <p className="font-bold text-dark">{template.format}</p>
                </div>
              </div>
              <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
                <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider mb-2">Ukuran File</p>
                <div className="flex items-center gap-3">
                  <Layout className="text-primary" size={20} />
                  <p className="font-bold text-dark">{template.fileSize}</p>
                </div>
              </div>
              <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
                <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider mb-2">Dimensi</p>
                <div className="flex items-center gap-3">
                  <Tag className="text-primary" size={20} />
                  <p className="font-bold text-dark">{template.dimensions}</p>
                </div>
              </div>
              <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
                <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider mb-2">Tanggal Rilis</p>
                <div className="flex items-center gap-3">
                  <Calendar className="text-primary" size={20} />
                  <p className="font-bold text-dark">{template.date}</p>
                </div>
              </div>
            </div>

            <div className="bg-dark p-8 rounded-[2.5rem] text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-2xl shadow-dark/20">
              <div>
                <p className="text-white/50 text-xs font-bold uppercase tracking-widest mb-1">Author</p>
                <p className="text-xl font-bold">{template.author}</p>
              </div>
              <div className="flex gap-4 w-full sm:w-auto">
                <button className="flex-1 sm:flex-none bg-primary text-white px-8 py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-primary-dark transition-all shadow-lg shadow-primary/20">
                  <Download size={20} />
                  Download
                </button>
                <button className="bg-white/10 hover:bg-white/20 p-4 rounded-2xl transition-all">
                  <Share2 size={20} />
                </button>
              </div>
            </div>

            <div className="flex items-center gap-4 p-6 bg-blue-50 rounded-3xl border border-blue-100 text-blue-800">
              <MessageCircle size={24} className="shrink-0" />
              <p className="text-sm font-medium">
                Butuh kustomisasi desain? <Link to="/kontak" className="font-bold underline hover:text-blue-600">Hubungi tim kreatif kami</Link> untuk bantuan lebih lanjut.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Related Content */}
        <div className="mt-24">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-3xl font-extrabold text-dark mb-2">Konten Terkait</h2>
              <p className="text-slate-500">Template desain lainnya dalam kategori {template.mainCategory}</p>
            </div>
            <Link to="/repository" className="text-primary font-bold hover:underline flex items-center gap-2">
              Lihat Semua
              <ArrowLeft size={16} className="rotate-180" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {allTemplates
              .filter(t => t.mainCategory === template.mainCategory && t.id !== template.id)
              .slice(0, 3)
              .map((item) => (
                <Link 
                  key={item.id} 
                  to={`/repository/${item.id}`}
                  className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-slate-100"
                >
                  <div className="aspect-[4/3] overflow-hidden">
                    <img 
                      src={item.image} 
                      alt={item.title} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="p-6">
                    <span className="text-[10px] font-bold text-primary uppercase tracking-widest mb-2 block">
                      {item.subCategory}
                    </span>
                    <h3 className="font-bold text-dark group-hover:text-primary transition-colors line-clamp-1">
                      {item.title}
                    </h3>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
