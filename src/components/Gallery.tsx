import { motion, AnimatePresence } from "motion/react";
import { GalleryGridSkeleton } from "./shared/GallerySkeletons";
import { ArrowUpRight, Info, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { cmsService } from "../services/api";

interface GalleryImage {
  id: string | number;
  src: string;
  title: string;
  category: string;
  desc: string;
}

export default function Gallery() {
  const [hoveredId, setHoveredId] = useState<string | number | null>(null);
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadGallery = async () => {
      try {
        const pages = await cmsService.getPages();
        const galleryPage = pages.find((p: any) => p.slug === "galeri-komunitas");
        
        if (galleryPage) {
          const galleryBlock = galleryPage.content.find((c: any) => c.type === "gallery");
          if (galleryBlock) {
            const transformedImages = galleryBlock.data.images.slice(0, 10).map((img: any, index: number) => {
              const caption = img.caption?.trim();
              const hasCaption = !!caption;
              return {
                id: index,
                src: img.url,
                title: caption || null,
                category: hasCaption ? "Umum" : null,
                desc: caption || null
              };
            });
            setImages(transformedImages);
          }
        }
      } catch (error) {
        console.error("Failed to fetch landing gallery:", error);
      } finally {
        setLoading(false);
      }
    };

    loadGallery();
  }, []);

  if (loading) {
    return (
      <section className="py-24 bg-gradient-to-b from-slate-50 to-white">
        <div className="container-custom">
          <GalleryGridSkeleton />
        </div>
      </section>
    );
  }

  return (
    <section className="py-24 bg-gradient-to-b from-slate-50 to-white">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 sm:mb-12 gap-6 sm:gap-8">
          <div className="max-w-xl">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400 mb-2">Community Moments</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-dark">Galeri Komunitas Halal Bandung</h2>
          </div>
          <Link to="/galeri" className="flex items-center gap-2 text-primary font-bold hover:gap-3 transition-all group shrink-0">
            Lihat Semua
            <ArrowUpRight size={20} className="group-hover:-translate-y-1 transition-transform" />
          </Link>
        </div>

        <motion.div 
          layout
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6"
        >
          <AnimatePresence mode="popLayout">
            {images.map((img) => (
              <Link key={img.id} to="/galeri" className="block h-full group">
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  onMouseEnter={() => setHoveredId(img.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  className={`bg-white rounded-3xl overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] relative transition-all duration-500 border border-transparent cursor-pointer h-full flex flex-col ${hoveredId === img.id ? "scale-[1.02] border-primary/20" : ""}`}
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
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-primary text-[10px] font-bold uppercase tracking-wider">{img.category}</span>
                      <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                    </div>
                    <h3 className="text-dark font-bold text-sm mb-1 line-clamp-1 group-hover:text-primary transition-colors">{img.title}</h3>
                    <p className="text-slate-500 text-[11px] line-clamp-2 leading-relaxed">{img.desc}</p>
                  </div>
                  )}
                </motion.div>
              </Link>
            ))}
          </AnimatePresence>
        </motion.div>
        
        {images.length === 0 && (
          <div className="text-center py-20 bg-slate-50 rounded-[2rem]">
            <p className="text-slate-400 italic">Dokumentasi kegiatan akan segera hadir.</p>
          </div>
        )}
      </div>
    </section>
  );
}


