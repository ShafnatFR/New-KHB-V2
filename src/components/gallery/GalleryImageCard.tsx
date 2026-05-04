import React from "react";
import { motion } from "motion/react";

interface GalleryImage {
  id: string | number;
  src: string;
  title: string;
  category: string;
  desc: string;
  location: string;
  time: string;
}

interface GalleryImageCardProps {
  img: GalleryImage;
  setSelectedImg: (img: GalleryImage) => void;
}

export const GalleryImageCard: React.FC<GalleryImageCardProps> = ({ img, setSelectedImg }) => {
  return (
    <motion.div
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
  );
};
