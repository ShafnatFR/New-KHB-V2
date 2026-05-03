import { motion, AnimatePresence } from "motion/react";
import { GalleryPageSkeleton } from "./SkeletonLoader";
import { useState, useEffect } from "react";
import { Search, Filter, Maximize2 } from "lucide-react";
import { cmsService } from "../services/api";

interface GalleryImage {
  id: string | number;
  src: string;
  title: string;
  category: string;
  desc: string;
  location: string;
  time: string;
}

export default function GalleryPage() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [headerInfo, setHeaderInfo] = useState({ title: "Galeri Komunitas", subtitle: "" });
  const [filter, setFilter] = useState("All");
  const [selectedImg, setSelectedImg] = useState<GalleryImage | null>(null);
  
  const categories = ["All", "Profil", "Sertifikasi", "Workshop", "Kolaborasi"];

  useEffect(() => {
    const loadGallery = async () => {
      try {
        const pages = await cmsService.getPages();
        const galleryPage = pages.find((p: any) => p.slug === "galeri-komunitas");
        
        if (galleryPage) {
          const galleryBlock = galleryPage.content.find((c: any) => c.type === "gallery");
          if (galleryBlock) {
            setHeaderInfo({
              title: galleryBlock.data.title || "Galeri Komunitas",
              subtitle: galleryBlock.data.subtitle || ""
            });

            const transformedImages = galleryBlock.data.images.map((img: any, index: number) => {
              const caption = img.caption?.trim();
              const hasCaption = !!caption;
              return {
                id: index,
                src: img.url,
                title: caption || null,
                category: hasCaption ? "Umum" : null,
                desc: caption || null,
                location: hasCaption ? "Lokasi kegiatan tidak dicantumkan." : null,
                time: hasCaption ? "Waktu kegiatan bersifat internal/tidak dipublikasikan." : null
              };
            });
            setImages(transformedImages);
          }
        }
      } catch (error) {
        console.error("Failed to fetch gallery:", error);
      } finally {
        setLoading(false);
      }
    };

    loadGallery();
  }, []);

  const filteredImages = filter === "All" 
    ? images 
    : images.filter(img => img.category === filter);

  if (loading) {
    return <GalleryPageSkeleton />;
  }

  return (
    <div className="pt-20">
      <section className="py-20 bg-green-50/30">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <p className="text-primary font-bold tracking-widest uppercase text-xs mb-4">Dokumentasi</p>

            <h1 className="text-4xl sm:text-5xl font-extrabold text-dark mb-6">{headerInfo.title}</h1>
            <p className="text-lg text-slate-600">
              {headerInfo.subtitle}
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-12">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-5 sm:px-8 py-2 sm:py-3 rounded-2xl font-bold transition-all text-xs sm:text-base ${
                  filter === cat 
                    ? "bg-primary text-white shadow-lg shadow-primary/20" 
                    : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-100"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <motion.div 
            layout
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6"
          >
            <AnimatePresence mode="popLayout">
              {filteredImages.map((img) => (
                <motion.div
                  key={img.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4 }}
                  className="group bg-white rounded-[1.5rem] overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-500 cursor-pointer border border-transparent hover:border-primary/20 flex flex-col h-full"
                  onClick={() => setSelectedImg(img)}
                >
                  <div className="relative overflow-hidden aspect-[4/3] w-full">
                    <img 
                      src={img.src} 
                      alt={img.title || "Gallery Image"} 
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-dark/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  
                  {(img.title || img.desc || img.category) && (
                  <div className="p-5 flex flex-col flex-1">
                    <span className="text-primary text-[10px] font-bold uppercase tracking-wider mb-2 block">{img.category}</span>
                    <h3 className="text-dark text-sm font-bold mb-2 line-clamp-2 leading-snug group-hover:text-primary transition-colors">{img.title}</h3>
                    <p className="text-slate-500 text-[11px] leading-relaxed line-clamp-2">{img.desc}</p>
                  </div>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
          
          {filteredImages.length === 0 && (
            <div className="text-center py-20">
              <p className="text-slate-400 italic">Belum ada foto dalam kategori ini.</p>
            </div>
          )}
        </div>
      </section>

      {/* Detail Modal */}
      <AnimatePresence>
        {selectedImg && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedImg(null)}
              className="absolute inset-0 bg-dark/95 backdrop-blur-sm"
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative bg-white w-full max-w-5xl rounded-[2.5rem] overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[90vh]"
            >
              <div className="md:w-3/5 relative bg-slate-100 overflow-hidden flex items-center justify-center p-4">
                <img 
                  src={selectedImg.src} 
                  alt={selectedImg.title} 
                  className="max-w-full max-h-full object-contain rounded-2xl"
                  referrerPolicy="no-referrer"
                />
              </div>
              
              <div className="md:w-2/5 p-8 sm:p-12 flex flex-col overflow-y-auto">
                <div className="mb-8 flex justify-between items-start">
                  <span className="bg-primary/10 text-primary px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider">
                    {selectedImg.category}
                  </span>
                  <button 
                    onClick={() => setSelectedImg(null)}
                    className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-400 hover:text-dark"
                  >
                    <Maximize2 size={24} className="rotate-45" />
                  </button>
                </div>
                
                <h2 className="text-3xl font-extrabold text-dark mb-6 leading-tight">
                  {selectedImg.title}
                </h2>
                
                <div className="space-y-6 mb-10">
                  <div className="flex gap-4 items-start">
                    <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-primary shrink-0 border border-slate-100">
                      <Search size={18} />
                    </div>
                    <div>
                      <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider mb-1">Informasi</p>
                      <p className="text-slate-600 text-sm leading-relaxed">{selectedImg.desc}</p>
                    </div>
                  </div>

                  <div className="flex gap-4 items-start">
                    <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-primary shrink-0 border border-slate-100">
                      <Maximize2 size={18} />
                    </div>
                    <div>
                      <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider mb-1">Lokasi</p>
                      <p className="text-dark font-bold text-sm">{selectedImg.location}</p>
                    </div>
                  </div>

                  <div className="flex gap-4 items-start">
                    <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-primary shrink-0 border border-slate-100">
                      <Filter size={18} />
                    </div>
                    <div>
                      <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider mb-1">Waktu</p>
                      <p className="text-dark font-bold text-sm">{selectedImg.time}</p>
                    </div>
                  </div>
                </div>

                <div className="mt-auto">
                  <button 
                    onClick={() => setSelectedImg(null)}
                    className="w-full bg-dark text-white py-4 rounded-2xl font-bold hover:bg-primary transition-all shadow-lg"
                  >
                    Tutup Detail
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
