import React from "react";
import { FileText, Calendar } from "lucide-react";

interface TemplateTechnicalDetailsProps {
  template: any;
}

export const TemplateTechnicalDetails: React.FC<TemplateTechnicalDetailsProps> = ({ template }) => {
  return (
    <div className="grid grid-cols-2 gap-4">
      {template.detail.technical_details?.map((tech: any, idx: number) => (
        <div key={idx} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
          <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider mb-2">{tech.label}</p>
          <div className="flex items-center gap-3">
            <FileText className="text-primary" size={20} />
            <p className="font-bold text-dark">{tech.value}</p>
          </div>
        </div>
      ))}
      <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
        <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider mb-2">Tanggal Rilis</p>
        <div className="flex items-center gap-3">
          <Calendar className="text-primary" size={20} />
          <p className="font-bold text-dark">{template.date}</p>
        </div>
      </div>
    </div>
  );
};
