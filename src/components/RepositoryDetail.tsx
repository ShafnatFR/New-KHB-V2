import { motion } from "motion/react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Eye, MessageCircle } from "lucide-react";
import { useState, useEffect } from "react";
import { cmsService } from "../services/api";
import { TemplateDetailHeader } from "./repository/TemplateDetailHeader";
import { TemplateTechnicalDetails } from "./repository/TemplateTechnicalDetails";
import { TemplateActionCard } from "./repository/TemplateActionCard";
import { RelatedTemplates } from "./repository/RelatedTemplates";

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
        <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }} className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full mb-4" />
        <p className="text-slate-500 font-bold">Memuat Detail Template...</p>
      </div>
    );
  }

  if (!template) return <div className="pt-40 pb-20 text-center"><h1 className="text-2xl font-bold mb-4">Template tidak ditemukan</h1><Link to="/repository" className="text-primary font-bold hover:underline">Kembali ke Repository</Link></div>;

  return (
    <div className="pt-20 bg-slate-50 min-h-screen">
      <div className="container-custom py-12">
        <Link to="/repository" className="inline-flex items-center gap-2 text-slate-500 hover:text-primary mb-8 font-bold transition-colors">
          <ArrowLeft size={20} />
          Kembali ke Repository
        </Link>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="bg-white rounded-[2.5rem] overflow-hidden shadow-xl border border-slate-100 p-4">
            <div className="aspect-[4/5] bg-slate-100 rounded-[2rem] overflow-hidden relative group">
              <img src={template.image} alt={template.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" referrerPolicy="no-referrer" />
              <div className="absolute inset-0 bg-dark/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <button className="bg-white text-dark p-4 rounded-full shadow-2xl transform scale-90 group-hover:scale-100 transition-transform"><Eye size={24} /></button>
              </div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-8">
            <TemplateDetailHeader template={template} />
            <TemplateTechnicalDetails template={template} />
            <TemplateActionCard template={template} />
            <div className="flex items-center gap-4 p-6 bg-blue-50 rounded-3xl border border-blue-100 text-blue-800">
              <MessageCircle size={24} className="shrink-0" />
              <p className="text-sm font-medium">Butuh kustomisasi desain? <Link to="/kontak" className="font-bold underline hover:text-blue-600">Hubungi tim kreatif kami</Link> untuk bantuan lebih lanjut.</p>
            </div>
          </motion.div>
        </div>

        <RelatedTemplates relatedTemplates={relatedTemplates} />
      </div>
    </div>
  );
}
