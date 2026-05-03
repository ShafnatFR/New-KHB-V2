import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { Download, Monitor, Printer, Phone, Instagram, FileText, Video, MessageCircle, Layout, Image as ImageIcon, CreditCard, ChevronDown, Search, Plus, Upload } from "lucide-react";
import { cmsService } from "../services/api";
import { RepositorySkeleton } from "./SkeletonLoader";


export default function RepositoryPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState("");
  const [cmsData, setCmsData] = useState<{ headline: string; subheadline: string } | null>(null);
  const [templates, setTemplates] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [allTags, setAllTags] = useState<string[]>(["Semua"]);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        // Fetch Pages for Hero Section
        const pages = await cmsService.getPages();
        const repoPage = pages.find((p: any) => p.slug === "repository");
        if (repoPage) {
          const heroBlock = repoPage.content.find((c: any) => c.type === "hero");
          if (heroBlock && heroBlock.data) {
            setCmsData({
              headline: heroBlock.data.headline,
              subheadline: heroBlock.data.sub_headline
            });
          }
        }

        // Fetch Templates from Posts
        const posts = await cmsService.getPosts();
        const tagsSet = new Set<string>();

        const fetchedTemplates = posts
          .filter((p: any) => p.category === "Template")
          .map((p: any) => {
            const detail = p.content?.[0] || {};
            const tags = detail.tags || [];
            tags.forEach((t: string) => tagsSet.add(t));

            return {
              id: p.id,
              title: p.title,
              slug: p.slug,
              tags: tags,
              date: new Date(p.created_at).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' }),
              image: detail.featured_image || "https://picsum.photos/seed/placeholder/800/1000",
              desc: detail.short_description || p.excerpt || ""
            };
          });

        setTemplates(fetchedTemplates);
        setAllTags(["Semua", ...Array.from(tagsSet)]);
      } catch (error) {
        console.error("Repository load error:", error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  const activeTag = searchParams.get("tag") || "Semua";
  const currentPage = parseInt(searchParams.get("page") || "1");
  const itemsPerPage = 10;

  const filteredTemplates = templates.filter(item => {
    const matchesTag = activeTag === "Semua" || item.tags.includes(activeTag);
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTag && matchesSearch;
  });

  // Pagination Logic
  const totalPages = Math.ceil(filteredTemplates.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentTemplates = filteredTemplates.slice(startIndex, startIndex + itemsPerPage);

  const handleTagChange = (tag: string) => {
    setSearchParams({ tag, page: "1" });
  };

  const handlePageChange = (page: number) => {
    setSearchParams({ tag: activeTag, page: page.toString() });
    window.scrollTo({ top: 400, behavior: "smooth" });
  };

  if (loading) {
    return <RepositorySkeleton />;
  }

  return (
    <div className="pt-20 min-h-screen bg-white">
      {/* Hero Section */}
      <section className="py-20 bg-dark text-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-20">
          <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary rounded-full blur-[120px]" />
        </div>
        
        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <p className="text-primary font-bold tracking-widest uppercase text-xs mb-4">Design Resources</p>
            <div className="mb-8">
              <img src="/repoKHB.png" alt="KHB Repo" className="h-24 w-auto" referrerPolicy="no-referrer" />
            </div>
            <h1 className="text-5xl md:text-6xl font-extrabold mb-6">
              {cmsData?.headline || "Repository Desain."}
            </h1>
            <p className="text-lg text-slate-400 mb-10">
              {cmsData?.subheadline || "Kumpulan aset desain gratis untuk membantu branding dan pemasaran produk halal Anda. Siap pakai dan mudah disesuaikan."}
            </p>

            <div className="flex flex-wrap gap-4">
              <Link to="/repository/request" className="bg-primary text-white px-8 py-4 rounded-2xl font-bold shadow-lg shadow-primary/20 hover:bg-primary-dark transition-all flex items-center gap-2">
                <Plus size={20} />
                Req Template
              </Link>
              <Link to="/repository/submit" className="bg-white/10 backdrop-blur-md text-white border border-white/20 px-8 py-4 rounded-2xl font-bold hover:bg-white/20 transition-all flex items-center gap-2">
                <Upload size={20} />
                Ajukan Template
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Filter Navigation Area */}
      <section className="bg-white border-b border-slate-100 sticky top-20 z-40 shadow-sm">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 py-6">
            <div className="flex flex-wrap gap-2">
              {allTags.map(tag => (
                <button
                  key={tag}
                  onClick={() => handleTagChange(tag)}
                  className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${activeTag === tag ? "bg-primary text-white shadow-lg shadow-primary/20" : "bg-slate-50 text-slate-500 hover:bg-slate-100 border border-slate-100"}`}
                >
                  {tag}
                </button>
              ))}
            </div>

            <div className="relative w-full md:w-64">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <input 
                type="text"
                placeholder="Cari template..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 border border-slate-100 focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all text-sm"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Grid */}
      <section className="py-12 bg-gradient-to-b from-white to-slate-50">
        <div className="container-custom">
          {/* Active Filter Indicator */}
          <div className="mb-8 flex items-center justify-between">
            <div className="flex items-center gap-2 text-slate-400 text-sm">
              <span>Repository</span>
              <span>/</span>
              <span className={`font-bold ${activeTag === "Semua" ? "text-dark" : "text-primary"}`}>{activeTag}</span>
            </div>
            <p className="text-sm text-slate-500 font-medium">
              {filteredTemplates.length > 0 ? (
                `Menampilkan ${startIndex + 1}-${Math.min(startIndex + itemsPerPage, filteredTemplates.length)} dari ${filteredTemplates.length} template`
              ) : (
                "0 template ditemukan"
              )}
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6 min-h-[600px] items-start">
            <AnimatePresence mode="popLayout">
              {currentTemplates.map((item, idx) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4, delay: idx * 0.05 }}
                  className="group relative rounded-2xl overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-500 aspect-[3/4.5]"
                >
                  <Link to={`/repository/${item.id}`}>
                    <img 
                      src={item.image} 
                      alt={item.title} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      referrerPolicy="no-referrer"
                    />
                    
                    {/* Overlay Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-dark/90 via-dark/20 to-transparent opacity-100" />
                    
                    {/* Content Overlay */}
                    <div className="absolute inset-0 p-4 sm:p-6 flex flex-col justify-end">
                      <div className="mb-2 sm:mb-4">
                        <span className="text-[8px] sm:text-[10px] font-bold text-white/60 uppercase tracking-widest block mb-0.5 sm:mb-1">
                          {item.date}
                        </span>
                        <h3 className="text-xs sm:text-base font-bold text-white leading-tight group-hover:text-primary transition-colors line-clamp-2">
                          {item.title}
                        </h3>
                      </div>
                      
                      <div className="h-0 group-hover:h-auto overflow-hidden transition-all duration-500 opacity-0 group-hover:opacity-100">
                        <p className="text-white/70 text-[10px] sm:text-xs mb-4 sm:mb-6 line-clamp-2">
                          {item.desc}
                        </p>
                        <button 
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            // Handle download
                          }}
                          className="flex items-center justify-center gap-2 bg-primary text-white w-full py-2 sm:py-3 rounded-lg sm:rounded-xl font-bold text-[10px] sm:text-xs shadow-lg shadow-primary/20 hover:bg-primary-dark transition-all"
                        >
                          <Download size={14} />
                          Download
                        </button>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {currentTemplates.length === 0 && (
            <div className="text-center py-32">
              <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-300">
                <Search size={32} />
              </div>
              <h3 className="text-xl font-bold text-dark mb-2">Template tidak ditemukan</h3>
              <p className="text-slate-500">Coba gunakan kata kunci lain atau ganti filter kategori.</p>
            </div>
          )}
        </div>
      </section>

      {/* Dynamic Pagination */}
      {totalPages > 1 && (
        <section className="pb-24 bg-slate-50">
          <div className="container-custom flex justify-center">
            <div className="flex gap-2">
              <button 
                onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="w-10 h-10 rounded-xl bg-white border border-slate-200 text-slate-400 hover:bg-slate-50 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronDown size={16} className="rotate-90" />
              </button>

              {Array.from({ length: totalPages }).map((_, i) => (
                <button 
                  key={i + 1}
                  onClick={() => handlePageChange(i + 1)}
                  className={`w-10 h-10 rounded-xl font-bold text-sm transition-all ${currentPage === i + 1 ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'bg-white border border-slate-200 text-slate-400 hover:bg-slate-50'}`}
                >
                  {i + 1}
                </button>
              ))}

              <button 
                onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className="w-10 h-10 rounded-xl bg-white border border-slate-200 text-slate-400 hover:bg-slate-50 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronDown size={16} className="-rotate-90" />
              </button>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

