import React from "react";
import { motion, AnimatePresence } from "motion/react";
import { Send, MessageCircle } from "lucide-react";

interface ContactHeroProps {
  cmsData: any;
  currentIndex: number;
  setCurrentIndex: (index: number) => void;
  setSelectedChannel: (channel: "wa" | "email") => void;
  setActiveModal: (modal: "selection" | "form-result" | null) => void;
}

export const ContactHero: React.FC<ContactHeroProps> = ({ 
  cmsData, 
  currentIndex, 
  setCurrentIndex,
  setSelectedChannel,
  setActiveModal
}) => {
  return (
    <section className="relative h-[70vh] md:h-[85vh] w-full bg-dark overflow-hidden">
      <AnimatePresence mode="wait">
        {cmsData?.slider && cmsData.slider.length > 0 ? (
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="absolute inset-0"
          >
            <img
              src={cmsData.slider[currentIndex].image}
              alt="Header"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/40 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-dark/80 via-transparent to-transparent" />
          </motion.div>
        ) : (
          <div className="absolute inset-0 bg-slate-900">
             <div className="absolute inset-0 bg-gradient-to-t from-dark to-transparent" />
          </div>
        )}
      </AnimatePresence>

      <div className="container-custom relative h-full flex flex-col justify-center z-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="max-w-3xl"
        >
          <div className="flex items-center gap-4 mb-6">
            <p className="text-primary font-bold tracking-[0.3em] uppercase text-xs md:text-sm">Contact Us</p>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-black text-white mb-6 leading-tight">
            {cmsData?.hero?.headline || "Mari Berdiskusi."}
          </h1>
          
          <p className="text-lg md:text-xl text-slate-300 leading-relaxed mb-10 max-w-2xl">
            {cmsData?.hero?.sub_headline || "Punya pertanyaan tentang sertifikasi halal atau ingin bergabung dengan komunitas? Kami siap membantu pertumbuhan bisnis Anda."}
          </p>


        </motion.div>

        {cmsData?.slider && cmsData.slider.length > 1 && (
          <div className="absolute bottom-10 right-10 flex gap-3">
            {cmsData.slider.map((_: any, idx: number) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`h-1.5 rounded-full transition-all duration-500 ${
                  currentIndex === idx ? "w-10 bg-primary" : "w-4 bg-white/30"
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
