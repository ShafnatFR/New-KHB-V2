import React from "react";

interface EventGalleryProps {
  gallery: { url: string; caption: string; alt_text: string }[];
}

export const EventGallery: React.FC<EventGalleryProps> = ({ gallery }) => {
  if (!gallery || gallery.length === 0) return null;

  return (
    <div className="bg-white rounded-[2rem] p-8 md:p-12 shadow-[0_4px_24px_rgb(0,0,0,0.06)] overflow-hidden">
      <p className="text-primary font-bold tracking-widest uppercase text-xs mb-4">Dokumentasi</p>
      <h2 className="text-2xl font-extrabold text-dark mb-8">Galeri Kegiatan</h2>
      <div className="columns-2 gap-4 space-y-4">
        {gallery.map((img, idx) => (
          <div key={idx} className="break-inside-avoid rounded-2xl overflow-hidden bg-slate-100 mb-4 inline-block w-full group">
            <img 
              src={img.url} 
              alt={img.alt_text || img.caption || 'Event Gallery'} 
              className="w-full h-auto object-cover group-hover:scale-[1.03] transition-transform duration-500 origin-center"
              referrerPolicy="no-referrer"
            />
          </div>
        ))}
      </div>
    </div>
  );
};
