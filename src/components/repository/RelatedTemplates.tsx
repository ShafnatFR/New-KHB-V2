import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

interface RelatedTemplatesProps {
  relatedTemplates: any[];
}

export const RelatedTemplates: React.FC<RelatedTemplatesProps> = ({ relatedTemplates }) => {
  if (relatedTemplates.length === 0) return null;

  return (
    <div className="mt-24">
      <div className="flex items-center justify-between mb-10">
        <div>
          <h2 className="text-3xl font-extrabold text-dark mb-2">Konten Terkait</h2>
          <p className="text-slate-500">Template desain lainnya untuk UMKM</p>
        </div>
        <Link to="/repository" className="text-primary font-bold hover:underline flex items-center gap-2">
          Lihat Semua
          <ArrowLeft size={16} className="rotate-180" />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {relatedTemplates.map((item) => (
          <Link 
            key={item.id} 
            to={`/repository/${item.id}`}
            className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-slate-100"
          >
            <div className="aspect-[4/3] overflow-hidden">
              <img 
                src={item.image} 
                alt={item.title} 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="p-6">
              <span className="text-[10px] font-bold text-primary uppercase tracking-widest mb-2 block">
                {item.subCategory}
              </span>
              <h3 className="font-bold text-dark group-hover:text-primary transition-colors line-clamp-1">
                {item.title}
              </h3>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
