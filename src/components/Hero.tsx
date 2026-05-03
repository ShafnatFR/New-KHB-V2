import { motion, AnimatePresence } from "motion/react";
import { ArrowRight, CheckCircle2, Loader2 } from "lucide-react";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { cmsService } from "../services/api";

export default function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cmsData, setCmsData] = useState<{ 
    headline: string; 
    subheadline: string;
    backgroundImage?: string;
    stats?: { label: string; value: string }[];
  } | null>(null);
  const [loading, setLoading] = useState(true);

  const defaultImages = [
    "https://picsum.photos/seed/business1/800/1000",
    "https://picsum.photos/seed/business2/800/1000",
    "https://picsum.photos/seed/business3/800/1000",
    "https://picsum.photos/seed/business4/800/1000",
  ];

  const images = cmsData?.backgroundImage ? [cmsData.backgroundImage] : defaultImages;

  const staticData = {
    headline: "KHB On Clinic: Business Growth",
    subheadline: "Akselerasi UMKM Anda melalui konsultasi bisnis mendalam, pendampingan legalitas NIB & PIRT, serta percepatan Sertifikasi Halal yang kredibel."
  };

  useEffect(() => {
    const loadCms = async () => {
      try {
        const pages = await cmsService.getPages();
        const landingPage = pages.find((p: any) => p.slug === "landing-page");
        if (landingPage) {
          const heroBlock = landingPage.content.find((c: any) => c.type === "hero");
          if (heroBlock && heroBlock.data) {
            setCmsData({
              headline: heroBlock.data.headline,
              subheadline: heroBlock.data.sub_headline,
              backgroundImage: heroBlock.data.background_image,
              stats: heroBlock.data.stats
            });
          }
        }
      } catch (error) {
        console.error("Hero CMS fetch error:", error);
      } finally {
        setLoading(false);
      }
    };
    loadCms();

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <section className="pt-32 pb-20 overflow-hidden bg-gradient-to-b from-slate-50 to-white">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold mb-6 w-fit">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              Keluarga Selamanya
            </div>
            
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold text-dark leading-[1.1] mb-6">
              {cmsData?.headline || staticData.headline}
            </h1>
            
            <p className="text-base sm:text-lg text-slate-600 mb-8 max-w-xl leading-relaxed">
              {cmsData?.subheadline || staticData.subheadline}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Link to="/layanan" className="w-full sm:w-auto">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full bg-primary text-white px-8 py-4 rounded-xl font-bold flex items-center justify-center sm:justify-start gap-2 shadow-lg shadow-primary/20 hover:bg-primary-dark transition-all text-sm sm:text-base"
                >
                  Konsultasi Sekarang
                  <ArrowRight size={20} />
                </motion.button>
              </Link>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full sm:w-auto bg-slate-100 text-slate-700 px-8 py-4 rounded-xl font-bold hover:bg-slate-200 transition-all text-sm sm:text-base"
              >
                Cek Legalitas
              </motion.button>
            </div>

            {/* CMS Stats */}
            {cmsData?.stats && cmsData.stats.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 pt-12 border-t border-slate-100">
                {cmsData.stats.map((stat, idx) => (
                  <div key={idx}>
                    <p className="text-3xl font-extrabold text-primary mb-1">{stat.value}</p>
                    <p className="text-sm font-bold text-slate-500 uppercase tracking-wider">{stat.label}</p>
                  </div>
                ))}
              </div>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="relative z-10 rounded-[3rem] overflow-hidden shadow-2xl aspect-[4/5] lg:aspect-auto lg:h-[600px]">
              <AnimatePresence mode="wait">
                <motion.img
                  key={currentIndex}
                  src={images[currentIndex]}
                  alt="Business Growth"
                  initial={{ opacity: 0, scale: 1.1 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.8 }}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </AnimatePresence>
              
              <div className="absolute inset-0 bg-gradient-to-t from-dark/40 to-transparent pointer-events-none" />
              
              <div className="absolute bottom-8 left-8 right-8 bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-2xl">
                <div className="flex items-center gap-4">
                  <div className="flex -space-x-3">
                    {[1, 2, 3].map((i) => (
                      <img 
                        key={i}
                        src={`https://i.pravatar.cc/100?img=${i + 10}`} 
                        alt="User" 
                        className="w-10 h-10 rounded-full border-2 border-white object-cover"
                      />
                    ))}
                  </div>
                  <div className="text-white">
                    <p className="text-sm font-bold">1,200+</p>
                    <p className="text-xs text-white/70 tracking-wide">Sertifikat Halal</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Background elements */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary/10 rounded-full blur-3xl" />
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-secondary/10 rounded-full blur-3xl" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
