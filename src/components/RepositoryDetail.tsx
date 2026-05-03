import { motion } from "motion/react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Download, Eye, Share2, Calendar, Layout, FileText, Tag, MessageCircle } from "lucide-react";
import { useState, useEffect } from "react";
import { cmsService } from "../services/api";

export default function RepositoryDetail() {
  const { id } = useParams();
  const [template, setTemplate] = useState<any>(null);
  const [relatedTemplates, setRelatedTemplates] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTemplate = async () => {
      setLoading(true);
      try {
        const posts = await cmsService.getPosts();
        const data = posts.find((p: any) => p.id === parseInt(id || "0", 10));

        if (data) {
          const detail = data.content?.[0] || {};
          setTemplate({
            ...data,
            detail,
            date: new Date(data.created_at).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' }),
            image: detail.featured_image,
            desc: detail.short_description || data.excerpt || ""
          });

          // Find Related
          const related = posts
            .filter((p: any) => p.category === "Template" && p.id !== data.id)
            .slice(0, 3)
            .map((p: any) => ({
              id: p.id,
              title: p.title,
              image: p.content?.[0]?.featured_image,
              subCategory: p.content?.[0]?.tags?.[0] || "Template"
            }));
          setRelatedTemplates(related);
        }
      } catch (error) {
        console.error("Load template detail error:", error);
      } finally {
        setLoading(false);
      }
    };
    loadTemplate();
  }, [id]);

  if (loading) {
    return (
      <div className="pt-40 pb-20 flex flex-col items-center justify-center min-h-screen">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full mb-4"
        />
        <p className="text-slate-500 font-bold">Memuat Detail Template...</p>
      </div>
    );
  }

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
                  Template
                </span>
                {template.detail.tags?.map((tag: string) => (
                  <span key={tag} className="bg-dark/5 text-dark/60 px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider border border-dark/5">
                    {tag}
                  </span>
                ))}
              </div>
              <h1 className="text-4xl md:text-5xl font-extrabold text-dark mb-6 leading-tight">
                {template.title}
              </h1>
              <p className="text-lg text-slate-600 leading-relaxed whitespace-pre-line">
                {template.desc}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {template.detail.technical_details?.map((tech: any, idx: number) => (
                <div key={idx} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
                  <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider mb-2">{tech.label}</p>
                  <div className="flex items-center gap-3">
                    <FileText className="text-primary" size={20} />
                    <p className="font-bold text-dark">{tech.value}</p>
                  </div>
                </div>
              ))}
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
                <p className="text-white/50 text-xs font-bold uppercase tracking-widest mb-1">Status</p>
                <p className="text-xl font-bold capitalize">{template.status}</p>
              </div>
              <div className="flex flex-wrap gap-4 w-full sm:w-auto">
                {template.detail.cta?.map((btn: any, idx: number) => (
                  <a 
                    key={idx}
                    href={btn.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 sm:flex-none bg-primary text-white px-8 py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-primary-dark transition-all shadow-lg shadow-primary/20"
                  >
                    <Download size={20} />
                    {btn.text}
                  </a>
                ))}
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
              <p className="text-slate-500">Template desain lainnya untuk UMKM</p>
            </div>
            <Link to="/repository" className="text-primary font-bold hover:underline flex items-center gap-2">
              Lihat Semua
              <ArrowLeft size={16} className="rotate-180" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {relatedTemplates.map((item) => (
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
