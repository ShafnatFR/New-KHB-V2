import { motion, AnimatePresence } from "motion/react";
import { EventsGridSkeleton, FilterPillsSkeleton } from "./shared/EventSkeletons";
import { HeroSectionSkeleton } from "./shared/CommonSkeletons";
import { Search, Clock } from "lucide-react";
import { useState, useEffect } from "react";
import { cmsService } from "../services/api";
import { EventCard } from "./events/EventCard";

export default function EventsPage() {
  const [activeCategory, setActiveCategory] = useState("Semua");
  const [searchQuery, setSearchQuery] = useState("");
  const [cmsData, setCmsData] = useState<{ hero: any; events: any[] } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCms = async () => {
      try {
        const [pages, posts] = await Promise.all([
          cmsService.getPages(),
          cmsService.getPosts()
        ]);
        const eventPage = pages.find((p: any) => p.slug === "events");
        const events = posts.filter((p: any) => p.category === "Event").map(p => {
          const content = p.content?.[0] || {};
          return {
            id: p.id,
            title: p.title,
            category: p.category,
            date: content.event_date || "TBA",
            location: content.location_name || "TBA",
            attendees: content.quota ? `${content.quota} Peserta` : "TBA",
            image: content.featured_image || "https://picsum.photos/seed/placeholder/800/600"
          };
        });
        setCmsData({ hero: eventPage?.content.find((c: any) => c.type === "hero")?.data, events });
      } catch (error) {
        console.error("Events fetch error:", error);
      } finally {
        setLoading(false);
      }
    };
    loadCms();
  }, []);

  const categories = ["Semua", "Webinar", "Workshop", "Sertifikasi", "Community"];
  const filteredEvents = cmsData?.events.filter(event => {
    const matchesCategory = activeCategory === "Semua" || event.category === activeCategory;
    const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  }) || [];

  return (
    <div className="pt-20 bg-white min-h-screen">
      {loading ? <HeroSectionSkeleton /> : (
        <section className="py-20 bg-dark text-white relative overflow-hidden">
          <div className="container-custom relative z-10">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl">
              <p className="text-primary font-bold tracking-widest uppercase text-xs mb-4">Agenda Kegiatan</p>
              <h1 className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight">
                {cmsData?.hero?.headline || "Events & Workshop."}
              </h1>
              <p className="text-lg text-slate-400 leading-relaxed max-w-2xl">
                {cmsData?.hero?.sub_headline || "Ikuti berbagai kegiatan edukatif dan kolaboratif untuk mempercepat pertumbuhan bisnis UMKM Anda."}
              </p>
            </motion.div>
          </div>
        </section>
      )}

      <section className="sticky top-20 z-40 bg-white/80 backdrop-blur-xl border-b border-slate-100 py-6">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            {loading ? <FilterPillsSkeleton /> : (
              <div className="flex flex-wrap justify-center gap-3">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${
                      activeCategory === cat ? "bg-primary text-white shadow-lg shadow-primary/20" : "bg-slate-50 text-slate-500 hover:bg-slate-100"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            )}
            <div className="relative w-full md:w-80 group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors" size={18} />
              <input
                type="text"
                placeholder="Cari event..."
                className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all text-sm"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-slate-50/50">
        <div className="container-custom">
          {loading ? <EventsGridSkeleton /> : (
            <AnimatePresence mode="popLayout">
              {filteredEvents.length > 0 ? (
                <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredEvents.map((item) => (
                    <motion.div key={item.id} layout initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} transition={{ duration: 0.3 }}>
                      <EventCard item={item} />
                    </motion.div>
                  ))}
                </motion.div>
              ) : (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="py-20 text-center">
                  <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Search size={32} className="text-slate-300" />
                  </div>
                  <h3 className="text-xl font-bold text-dark mb-2">Event tidak ditemukan</h3>
                  <p className="text-slate-500">Coba gunakan kata kunci atau kategori lain.</p>
                </motion.div>
              )}
            </AnimatePresence>
          )}
        </div>
      </section>

      <section className="pb-24 bg-slate-50/50">
        <div className="container-custom">
          <div className="bg-white rounded-[3rem] p-10 md:p-16 border border-slate-100 flex flex-col md:flex-row items-center justify-between gap-10 shadow-xl shadow-slate-200/50">
            <div className="max-w-xl">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-6">
                <Clock size={32} />
              </div>
              <h2 className="text-3xl font-bold text-dark mb-4">Selalu Update Agenda Kami</h2>
              <p className="text-slate-500">Berlangganan kalender event kami agar Anda tidak melewatkan kesempatan pelatihan dan pendampingan UMKM terbaru.</p>
            </div>
            <button className="bg-dark text-white px-10 py-5 rounded-2xl font-bold hover:bg-slate-800 transition-all shadow-xl hover:-translate-y-1">
              Berlangganan Kalender
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
