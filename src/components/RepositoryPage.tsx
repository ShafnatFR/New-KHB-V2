import React, { useState, useEffect } from "react";
import { useSearchParams, Link, useNavigate } from "react-router-dom";
import { ChevronDown, Search, Plus } from "lucide-react";
import { cmsService } from "../services/api";
import { RepositorySkeleton } from "./shared/RepositorySkeletons";
import { RepositoryItem } from "./repository/RepositoryItem";

export default function RepositoryPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState(searchParams.get("tab") || "Semua");
  const [searchQuery, setSearchQuery] = useState("");
  const [cmsData, setCmsData] = useState<any[] | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const loadCms = async () => {
      try {
        const posts = await cmsService.getPosts();
        const repoItems = posts
          .filter((p: any) => p.category === "Digital Library" || p.category === "Template")
          .map(p => {
            const content = p.content?.[0] || {};
            
            let itemType = "Other";
            if (p.category === "Template") {
              itemType = "Template";
            } else {
              const fmt = content.format || "File";
              itemType = fmt.charAt(0).toUpperCase() + fmt.slice(1).toLowerCase();
            }

            return {
              id: p.id,
              title: p.title,
              category: p.category,
              type: itemType,
              preview_url: content.featured_image || "https://picsum.photos/seed/repo/600/400",
              download_url: content.cta?.[0]?.url || content.file_url || "#",
              downloads: content.download_count || 0,
              prints: content.print_count || 0,
            };
          })
          .sort((a, b) => a.id - b.id);
        setCmsData(repoItems);
      } catch (error) {
        console.error("Repository fetch error:", error);
      } finally {
        setLoading(false);
      }
    };
    loadCms();
  }, []);

  const tabs: string[] = ["Semua", ...Array.from(new Set<string>(
    cmsData?.map(item => item.type as string).filter(Boolean) || []
  ))];
  const filteredItems = cmsData?.filter(item => {
    const matchesTab = activeTab === "Semua" || item.type.toLowerCase() === activeTab.toLowerCase();
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  }) || [];

  if (loading) return <RepositorySkeleton />;

  return (
    <div className="pt-20 bg-slate-50 min-h-screen">
      <section className="py-20 bg-dark text-white relative overflow-hidden">
        <div className="container-custom relative z-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
            <div className="max-w-2xl">
              <p className="text-primary font-bold tracking-widest uppercase text-xs mb-4">Digital Assets</p>
              <h1 className="text-5xl md:text-6xl font-extrabold mb-6 leading-tight">Digital Library.</h1>
              <p className="text-lg text-slate-400">Pusat sumber daya digital KHB untuk mendukung pertumbuhan bisnis Anda.</p>
            </div>
            <div className="flex gap-4">
              <Link to="/request-template" className="bg-primary text-white px-8 py-4 rounded-2xl font-bold flex items-center gap-2 hover:bg-primary-dark transition-all shadow-lg shadow-primary/20">
                <Plus size={20} /> Request Template
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="sticky top-20 z-40 bg-white/80 backdrop-blur-xl border-b border-slate-100 py-6">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex gap-2 overflow-x-auto no-scrollbar w-full md:w-auto pb-2 md:pb-0">
              {tabs.map(tab => (
                <button
                  key={tab}
                  onClick={() => { setActiveTab(tab); setSearchParams({ tab }); }}
                  className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all whitespace-nowrap ${
                    activeTab.toLowerCase() === tab.toLowerCase() ? "bg-primary text-white shadow-lg shadow-primary/20" : "text-slate-500 hover:bg-slate-50"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
            <div className="relative w-full md:w-80">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input
                type="text"
                placeholder="Cari aset digital..."
                className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl focus:border-primary outline-none transition-all text-sm"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredItems.map(item => (
              <RepositoryItem 
                key={item.id} 
                item={item} 
                handleDownload={(e, i) => { e.stopPropagation(); window.open(i.download_url, "_blank"); }} 
                onPreview={(i) => navigate(`/repository/${i.id}`)} 
              />
            ))}
          </div>
          {filteredItems.length === 0 && (
            <div className="text-center py-20">
              <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-300">
                <Search size={32} />
              </div>
              <h3 className="text-xl font-bold text-dark mb-2">Aset tidak ditemukan</h3>
              <p className="text-slate-500">Coba gunakan kata kunci atau filter lain.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
