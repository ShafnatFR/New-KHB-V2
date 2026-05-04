import React from "react";
import { Download, Share2 } from "lucide-react";

interface TemplateActionCardProps {
  template: any;
}

export const TemplateActionCard: React.FC<TemplateActionCardProps> = ({ template }) => {
  return (
    <div className="bg-dark p-8 rounded-[2.5rem] text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-2xl shadow-dark/20">
      <div>
        <p className="text-white/50 text-xs font-bold uppercase tracking-widest mb-1">Status</p>
        <p className="text-xl font-bold capitalize">{template.status}</p>
      </div>
      <div className="flex flex-wrap gap-4 w-full sm:w-auto">
        {template.detail.cta?.map((btn: any, idx: number) => (
          <a 
            key={idx}
            href={btn.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 sm:flex-none bg-primary text-white px-8 py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-primary-dark transition-all shadow-lg shadow-primary/20"
          >
            <Download size={20} />
            {btn.text}
          </a>
        ))}
        <button className="bg-white/10 hover:bg-white/20 p-4 rounded-2xl transition-all">
          <Share2 size={20} />
        </button>
      </div>
    </div>
  );
};
