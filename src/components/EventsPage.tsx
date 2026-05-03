import { motion, AnimatePresence } from "motion/react";
import { EventsGridSkeleton, FilterPillsSkeleton, HeroSectionSkeleton } from "./SkeletonLoader";
import { Calendar, MapPin, Users, ArrowRight, Search, Filter, Clock, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { cmsService } from "../services/api";

interface EventPost {
  id: number;
  title: string;
  slug: string;
  category: string; // The main category
  excerpt: string | null;
  featured_image: string | null;
  event_labels: string[]; // Support for multiple categories/labels
  event_description: string;
  location_name: string;
  event_date: string;
  start_time: string;
  end_time: string;
  quota: string | number;
  status: string; // Derived status
}

export default function EventsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Semua");
  const [events, setEvents] = useState<EventPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [allLabels, setAllLabels] = useState<string[]>(["Semua"]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const posts = await cmsService.getPosts();
        
        // Filter only 'Event' category posts
        const eventPosts = posts.filter((p: any) => p.category === "Event");
        
        // Extract unique labels for the filter
        const labelsSet = new Set<string>();
        
        const transformedEvents = eventPosts.map((post: any) => {
          const content = post.content?.[0] || {};
          
          // Gap 1: Calculate Status based on date
          let derivedStatus = "Mendatang";
          if (content.event_date) {
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            const eventDate = new Date(content.event_date);
            
            if (eventDate < today) {
              derivedStatus = "Selesai";
            } else if (eventDate.getTime() === today.getTime()) {
              derivedStatus = "Berlangsung";
            }
          }

          // Gather all unique labels
          const labels = content.event_labels || [];
          labels.forEach((label: string) => labelsSet.add(label));

          return {
            id: post.id,
            title: post.title,
            slug: post.slug,
            category: post.category,
            excerpt: post.excerpt || content.excerpt || null,
            featured_image: content.featured_image || "https://picsum.photos/seed/placeholder/800/500",
            event_labels: labels,
            event_description: content.event_description || "",
            location_name: content.location_name || "TBA",
            event_date: content.event_date || "TBA",
            start_time: content.start_time || "",
            end_time: content.end_time || "",
            quota: content.quota || "0",
            status: derivedStatus
          };
        });

        setEvents(transformedEvents);
        setAllLabels(["Semua", ...Array.from(labelsSet)]);
      } catch (error) {
        console.error("Failed to fetch events:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         event.location_name.toLowerCase().includes(searchQuery.toLowerCase());
    // Support filtering by multi-category (event_labels)
    const matchesCategory = selectedCategory === "Semua" || event.event_labels.includes(selectedCategory);
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="pt-20">
      {/* Hero Section */}
      {loading ? (
        <HeroSectionSkeleton />
      ) : (
        <section className="pt-20 lg:pt-32 pb-16 bg-dark text-white relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full opacity-20">
            <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-primary rounded-full blur-[120px]" />
          </div>
          
          <div className="container-custom relative z-10">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-xl"
              >
                <p className="text-primary font-bold tracking-widest uppercase text-xs mb-4">Agenda Komunitas</p>

                <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6 leading-tight">Events & Kegiatan.</h1>
                <p className="text-base sm:text-lg text-slate-400 mb-8">
                  Jangan lewatkan kesempatan untuk belajar, berjejaring, dan mengembangkan bisnis Anda melalui berbagai agenda rutin kami.
                </p>
                <Link to="/explore-events">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-primary text-white px-8 sm:px-10 py-3 sm:py-4 rounded-2xl font-bold shadow-lg shadow-primary/20 hover:bg-primary-dark transition-all flex items-center gap-2"
                  >
                    Jelajahi Semua Event
                    <ArrowRight size={20} />
                  </motion.button>
                </Link>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white/5 backdrop-blur-md p-8 md:p-10 rounded-[2.5rem] border border-white/10"
              >
                <h3 className="text-xl font-bold mb-6">Cari Event Cepat</h3>
                <div className="relative w-full mb-6">
                  <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                  <input 
                    type="text"
                    placeholder="Cari event atau lokasi..."
                    className="w-full pl-14 pr-6 py-4 rounded-2xl bg-white/10 border border-white/20 focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all font-medium text-white placeholder:text-slate-500"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <div className="flex items-center gap-3 text-slate-400 text-sm font-bold">
                  <Filter size={18} className="text-primary" />
                  Filter aktif: <span className="text-white">{selectedCategory}</span>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      )}

      {/* Filter Section (Now Dynamic based on multi-categories) */}
      <section className="py-8 bg-slate-50 border-b border-slate-100 overflow-x-auto no-scrollbar">
        <div className="container-custom">
          {loading ? (
            <div className="py-4">
              <FilterPillsSkeleton />
            </div>
          ) : (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-wrap gap-2 sm:gap-3 items-center"
            >
              {allLabels.map(label => (
                <button
                  key={label}
                  onClick={() => setSelectedCategory(label)}
                  className={`px-4 sm:px-6 py-2 sm:py-3 rounded-xl text-[10px] sm:text-sm font-bold transition-all whitespace-nowrap shadow-sm ${
                    selectedCategory === label 
                      ? "bg-primary text-white shadow-primary/20" 
                      : "bg-white text-slate-600 hover:bg-slate-50 border border-slate-200"
                  }`}
                >
                  {label}
                </button>
              ))}
            </motion.div>
          )}
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container-custom">
          {loading ? (
            <EventsGridSkeleton />
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                <AnimatePresence mode="popLayout">
                  {filteredEvents.map((event, idx) => (
                    <motion.div
                      key={event.id}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ delay: idx * 0.1 }}
                      className="group bg-slate-50 rounded-[1.5rem] sm:rounded-[2.5rem] overflow-hidden border border-slate-100 hover:bg-white hover:shadow-2xl hover:shadow-slate-200 transition-all duration-500 flex flex-col"
                    >
                      <Link to={`/events/${event.id}`} className="flex flex-col h-full">
                        <div className="relative aspect-video overflow-hidden shrink-0">
                          <img 
                            src={event.featured_image!} 
                            alt={event.title} 
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            referrerPolicy="no-referrer"
                          />
                          
                          {/* Top Labels Container */}
                          <div className="absolute top-2 left-2 sm:top-4 sm:left-4 flex flex-wrap gap-2 max-w-[70%]">
                            {event.event_labels.slice(0, 2).map((label, i) => (
                              <span key={i} className="bg-white/90 backdrop-blur-md text-dark px-2 sm:px-3 py-1 rounded-full text-[8px] sm:text-[10px] font-bold shadow-sm border border-white/20 truncate">
                                {label}
                              </span>
                            ))}
                            {event.event_labels.length > 2 && (
                              <span className="bg-white/90 backdrop-blur-md text-dark px-2 sm:px-3 py-1 rounded-full text-[8px] sm:text-[10px] font-bold shadow-sm border border-white/20">
                                +{event.event_labels.length - 2}
                              </span>
                            )}
                          </div>
                          
                          {/* Event Status Badge */}
                          <div className="absolute top-2 right-2 sm:top-4 sm:right-4">
                            <span className={`px-2 sm:px-4 py-1 rounded-full text-[7px] sm:text-[10px] font-bold uppercase tracking-wider shadow-lg ${
                              event.status === "Mendatang" ? "bg-primary text-white shadow-primary/20" :
                              event.status === "Berlangsung" ? "bg-yellow-500 text-white shadow-yellow-500/20" :
                              "bg-slate-600 text-white shadow-slate-600/20"
                            }`}>
                              {event.status}
                            </span>
                          </div>
                        </div>

                        <div className="p-5 sm:p-8 flex flex-col flex-grow">
                          <h3 className="text-lg sm:text-xl font-bold text-dark mb-2 group-hover:text-primary transition-colors line-clamp-2">
                            {event.title}
                          </h3>
                          
                          {/* Added Excerpt */}
                          {event.excerpt && (
                            <p className="text-slate-500 text-[11px] sm:text-xs mb-4 line-clamp-2 leading-relaxed">
                              {event.excerpt}
                            </p>
                          )}
                          
                          <div className="space-y-2 sm:space-y-3 mb-6 mt-auto bg-white p-4 rounded-2xl border border-slate-100">
                            <div className="flex items-center gap-3 text-slate-600 text-[11px] sm:text-sm font-medium">
                              <Calendar size={16} className="text-primary shrink-0" />
                              <span className="truncate">{event.event_date}</span>
                            </div>
                            
                            {/* Added Start and End Time */}
                            {(event.start_time || event.end_time) && (
                              <div className="flex items-center gap-3 text-slate-600 text-[11px] sm:text-sm font-medium">
                                <Clock size={16} className="text-primary shrink-0" />
                                <span className="truncate">
                                  {event.start_time ? event.start_time : "TBA"} - {event.end_time ? event.end_time : "TBA"} WIB
                                </span>
                              </div>
                            )}

                            <div className="flex items-center gap-3 text-slate-600 text-[11px] sm:text-sm font-medium">
                              <MapPin size={16} className="text-primary shrink-0" />
                              <span className="truncate">{event.location_name}</span>
                            </div>
                            
                            {/* Formatted Quota */}
                            <div className="flex items-center gap-3 text-slate-600 text-[11px] sm:text-sm font-medium">
                              <Users size={16} className="text-primary shrink-0" />
                              <span>{event.quota} Peserta</span>
                            </div>
                          </div>

                          <div className="w-full bg-slate-100 text-dark py-3 sm:py-4 rounded-xl sm:rounded-2xl text-[11px] sm:text-sm font-bold group-hover:bg-primary group-hover:text-white transition-all text-center">
                            Lihat Detail Event
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              {filteredEvents.length === 0 && (
                <div className="text-center py-20 bg-slate-50 rounded-[2rem] border border-slate-100">
                  <p className="text-slate-500 text-lg mb-4 font-medium">Tidak ada event yang sesuai dengan pencarian Anda.</p>
                  <button 
                    onClick={() => {setSearchQuery(""); setSelectedCategory("Semua");}}
                    className="text-primary font-bold hover:underline"
                  >
                    Reset Filter
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </div>
  );
}
