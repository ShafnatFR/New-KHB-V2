import React from "react";

interface TemplateDetailHeaderProps {
  template: any;
}

export const TemplateDetailHeader: React.FC<TemplateDetailHeaderProps> = ({ template }) => {
  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-4">
        <span className="bg-primary/10 text-primary px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider">
          Template
        </span>
        {template.detail.tags?.map((tag: string) => (
          <span key={tag} className="bg-dark/5 text-dark/60 px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider border border-dark/5">
            {tag}
          </span>
        ))}
      </div>
      <h1 className="text-4xl md:text-5xl font-extrabold text-dark mb-6 leading-tight">
        {template.title}
      </h1>
      <p className="text-lg text-slate-600 leading-relaxed whitespace-pre-line">
        {template.desc}
      </p>
    </div>
  );
};
