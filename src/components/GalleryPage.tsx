import { motion, AnimatePresence } from "motion/react";
import { GalleryPageSkeleton } from "./shared/GallerySkeletons";
import React, { useState, useEffect } from "react";
import { cmsService } from "../services/api";
import { GalleryImageCard } from "./gallery/GalleryImageCard";
import { GalleryDetailModal } from "./gallery/GalleryDetailModal";

interface GalleryImage {
  id: string | number;
  src: string;
  title: string | null;
  category: string | null;
  desc: string | null;
  location: string | null;
  time: string | null;
}

export default function GalleryPage() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [headerInfo, setHeaderInfo] = useState({ title: "Galeri Komunitas", subtitle: "" });
  const [filter, setFilter] = useState("All");
  const [selectedImg, setSelectedImg] = useState<GalleryImage | null>(null);
  
  const categories = ["All", ...Array.from(new Set(
    images.map(img => img.category).filter((c): c is string => !!c)
  ))];

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
              const hasCustomData = !!img.image_title || !!img.category || !!img.description || !!img.location || !!img.time || hasCaption;

              return {
                id: index,
                src: img.url,
                title: hasCustomData ? (img.image_title || caption || `Dokumentasi #${index + 1}`) : null,
                category: hasCustomData ? (img.category || (hasCaption ? "Umum" : "Lainnya")) : null,
                desc: hasCustomData ? (img.description || caption || "Dokumentasi kebersamaan Komunitas Halal Bandung.") : null,
                location: hasCustomData ? (img.location || "Lokasi kegiatan tidak dicantumkan.") : null,
                time: hasCustomData ? (img.time || "Waktu kegiatan bersifat internal.") : null
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

  const filteredImages = filter === "All" ? images : images.filter(img => img.category === filter);

  const nextImage = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (!selectedImg || filteredImages.length <= 1) return;
    const currentIndex = filteredImages.findIndex(img => img.id === selectedImg.id);
    const nextIndex = (currentIndex + 1) % filteredImages.length;
    setSelectedImg(filteredImages[nextIndex]);
  };

  const prevImage = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (!selectedImg || filteredImages.length <= 1) return;
    const currentIndex = filteredImages.findIndex(img => img.id === selectedImg.id);
    const prevIndex = (currentIndex - 1 + filteredImages.length) % filteredImages.length;
    setSelectedImg(filteredImages[prevIndex]);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedImg) return;
      if (e.key === "ArrowRight") nextImage();
      if (e.key === "ArrowLeft") prevImage();
      if (e.key === "Escape") setSelectedImg(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedImg, filteredImages]);

  if (loading) return <GalleryPageSkeleton />;

  return (
    <div className="pt-20">
      <section className="py-20 bg-green-50/30">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <p className="text-primary font-bold tracking-widest uppercase text-xs mb-4">Dokumentasi</p>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-dark mb-6">{headerInfo.title}</h1>
            <p className="text-lg text-slate-600">{headerInfo.subtitle}</p>
          </div>

          <div className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-12">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-5 sm:px-8 py-2 sm:py-3 rounded-2xl font-bold transition-all text-xs sm:text-base ${
                  filter === cat ? "bg-primary text-white shadow-lg shadow-primary/20" : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-100"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            <AnimatePresence mode="popLayout">
              {filteredImages.map((img) => (
                <GalleryImageCard key={img.id} img={img} setSelectedImg={setSelectedImg} />
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

      <GalleryDetailModal 
        selectedImg={selectedImg} 
        setSelectedImg={setSelectedImg}
        onNext={nextImage}
        onPrev={prevImage}
        hasNextPrev={filteredImages.length > 1}
      />
    </div>
  );
}
