import { motion, AnimatePresence } from "motion/react";
import { ArrowRight, CheckCircle2, Loader2 } from "lucide-react";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { cmsService } from "../services/api";

export default function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [cmsData, setCmsData] = useState<{ headline: string; subheadline: string } | null>(null);
  const [loading, setLoading] = useState(true);

  const images = [
    "https://picsum.photos/seed/business1/800/1000",
    "https://picsum.photos/seed/business2/800/1000",
    "https://picsum.photos/seed/business3/800/1000",
    "https://picsum.photos/seed/business4/800/1000",
  ];

  const staticData = {
    headline: <>KHB On Clinic: <br /><span className="text-primary italic">Business Growth.</span></>,
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
              subheadline: heroBlock.data.sub_headline
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
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold mb-6">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              Keluarga Selamanya
            </div>
            
            <div className="mb-6">
              <img src="input_file_1.png" alt="KHB Klinik" className="h-20 w-auto" referrerPolicy="no-referrer" />
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold text-dark leading-[1.1] mb-6">
              {cmsData?.headline || staticData.headline}
            </h1>
            
            <p className="text-base sm:text-lg text-slate-600 mb-8 max-w-xl leading-relaxed">
              {cmsData?.subheadline || staticData.subheadline}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-12 lg:mb-0">
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
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative px-4 sm:px-0"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {/* Carousel Indicators */}
            <div className="absolute top-10 right-10 z-30 flex gap-2">
              {images.map((_, idx) => (
                <div 
                  key={idx}
                  className={`h-1.5 rounded-full transition-all duration-500 ${
                    currentIndex === idx ? "w-8 bg-primary" : "w-2 bg-white/50"
                  }`}
                />
              ))}
            </div>

            <div 
              className={`relative z-10 rounded-3xl overflow-hidden shadow-2xl transition-all duration-500 aspect-[4/5] ${isHovered ? "ring-4 ring-primary/30 scale-[1.02]" : "ring-0"}`}
            >
              <AnimatePresence mode="wait">
                <motion.img
                  key={currentIndex}
                  src={images[currentIndex]}
                  alt={`Business Growth ${currentIndex + 1}`}
                  initial={{ opacity: 0, scale: 1.1 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.8, ease: "easeInOut" }}
                  className="absolute inset-0 w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </AnimatePresence>
              <div className={`absolute inset-0 bg-primary/10 mix-blend-multiply transition-opacity duration-500 ${isHovered ? "opacity-0" : "opacity-100"}`} />
            </div>
            
            {/* Floating Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.5 }}
              className="absolute -bottom-4 -left-2 sm:-bottom-6 sm:-left-6 z-20 bg-white p-3 sm:p-4 rounded-xl sm:rounded-2xl shadow-xl flex items-center gap-3 sm:gap-4 border border-slate-100 max-w-[200px] sm:max-w-none"
            >
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary/10 rounded-lg sm:rounded-xl flex items-center justify-center text-primary shrink-0">
                <CheckCircle2 size={20} className="sm:size-[24px]" />
              </div>
              <div>
                <p className="text-[8px] sm:text-[10px] uppercase tracking-wider font-bold text-slate-400">Terverifikasi</p>
                <p className="text-sm sm:text-lg font-bold text-dark leading-tight">1,200+ Sertifikat Halal</p>
              </div>
            </motion.div>
            
            {/* Decorative elements */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary/5 rounded-full blur-3xl" />
            <div className="absolute -bottom-10 -left-10 w-60 h-60 bg-secondary/5 rounded-full blur-3xl" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}


