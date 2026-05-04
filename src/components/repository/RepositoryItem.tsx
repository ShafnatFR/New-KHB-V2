import React from "react";
import { Download, Monitor, Printer, FileText, Video, Image as ImageIcon, CreditCard, Layout } from "lucide-react";

interface RepositoryItemProps {
  item: any;
  handleDownload: (e: React.MouseEvent, item: any) => void;
  onPreview: (item: any) => void;
}

export const RepositoryItem: React.FC<RepositoryItemProps> = ({ item, handleDownload, onPreview }) => {
  const getIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case "template": return <Layout size={18} />;
      case "video": return <Video size={18} />;
      case "image": return <ImageIcon size={18} />;
      case "document": return <FileText size={18} />;
      default: return <Monitor size={18} />;
    }
  };

  return (
    <div 
      onClick={() => onPreview(item)}
      className="group bg-white rounded-[2rem] border border-slate-100 p-6 hover:shadow-2xl hover:shadow-slate-200 transition-all duration-500 cursor-pointer"
    >
      <div className="relative aspect-video rounded-2xl overflow-hidden bg-slate-100 mb-6">
        <img 
          src={item.preview_url} 
          alt={item.title} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
          referrerPolicy="no-referrer"
        />
        <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold text-primary uppercase tracking-wider flex items-center gap-1.5 shadow-sm">
          {getIcon(item.type)}
          {item.type}
        </div>
        {item.is_premium && (
          <div className="absolute top-3 right-3 bg-amber-400 text-white p-1.5 rounded-full shadow-lg">
            <CreditCard size={12} fill="currentColor" />
          </div>
        )}
        <div className="absolute inset-0 bg-dark/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <button className="bg-white text-dark px-5 py-2 rounded-xl font-bold text-sm transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
            Preview Detail
          </button>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <h3 className="font-bold text-dark group-hover:text-primary transition-colors line-clamp-1">{item.title}</h3>
          <p className="text-xs text-slate-400 mt-1 uppercase font-bold tracking-widest">{item.category}</p>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-slate-50">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5 text-slate-400 text-[10px] font-bold">
              <Download size={12} />
              {item.downloads || 0}
            </div>
            <div className="flex items-center gap-1.5 text-slate-400 text-[10px] font-bold">
              <Printer size={12} />
              {item.prints || 0}
            </div>
          </div>
          <button 
            onClick={(e) => handleDownload(e, item)}
            className="w-10 h-10 rounded-full bg-slate-50 text-slate-400 hover:bg-primary hover:text-white flex items-center justify-center transition-all"
          >
            <Download size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};
