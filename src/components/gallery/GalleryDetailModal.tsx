import React from "react";
import { motion, AnimatePresence } from "motion/react";
import { Maximize2, Search, Filter } from "lucide-react";

interface GalleryImage {
  id: string | number;
  src: string;
  title: string;
  category: string;
  desc: string;
  location: string;
  time: string;
}

interface GalleryDetailModalProps {
  selectedImg: GalleryImage | null;
  setSelectedImg: (img: GalleryImage | null) => void;
}

export const GalleryDetailModal: React.FC<GalleryDetailModalProps> = ({ selectedImg, setSelectedImg }) => {
  return (
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
  );
};
