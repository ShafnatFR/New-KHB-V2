import React from "react";
import { motion } from "motion/react";
import { Clock, MessageCircle, Send } from "lucide-react";

interface ContactInfoProps {
  contactInfo: any[];
  workingHours: string[];
  setSelectedChannel: (channel: "wa" | "email") => void;
  setActiveModal: (modal: "selection" | "form-result" | null) => void;
}

export const ContactInfo: React.FC<ContactInfoProps> = ({ 
  contactInfo, 
  workingHours,
  setSelectedChannel,
  setActiveModal
}) => {
  return (
    <div className="space-y-8">
      {contactInfo.map((info, idx) => (
        <motion.div
          key={info.title}
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: idx * 0.1 }}
          className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm group hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-500"
        >
          <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm mb-6 group-hover:scale-110 transition-transform">
            {info.icon}
          </div>
          <h3 className="text-xl font-bold text-dark mb-4">{info.title}</h3>
          <div className="space-y-1 mb-6">
            {info.details.map((detail: string, i: number) => (
              <p key={i} className="text-slate-500 font-medium">{detail}</p>
            ))}
          </div>
          {info.onClick ? (
            <button 
              onClick={info.onClick}
              className="text-primary font-bold text-sm flex items-center gap-2 hover:gap-3 transition-all"
            >
              {info.action}
              <Send size={16} />
            </button>
          ) : (
            <a 
              href={info.link} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-primary font-bold text-sm flex items-center gap-2 hover:gap-3 transition-all"
            >
              {info.action}
              <Send size={16} />
            </a>
          )}
        </motion.div>
      ))}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="bg-dark text-white p-8 rounded-[2rem] relative overflow-hidden"
      >
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-6">
            <Clock size={24} className="text-primary" />
            <h3 className="text-xl font-bold">Jam Operasional</h3>
          </div>
          <div className="space-y-3 text-slate-400 text-sm">
            <div className="flex justify-between border-b border-white/10 pb-2">
              <span>{workingHours[0]}</span>
              <span className="text-white font-bold">{workingHours[1]}</span>
            </div>
            <div className="flex justify-between border-b border-white/10 pb-2">
              <span>Sabtu</span>
              <span className="text-white font-bold">09:00 - 14:00</span>
            </div>
            <div className="flex justify-between">
              <span>Minggu</span>
              <span className="text-primary font-bold">Tutup</span>
            </div>
          </div>
          <button 
            onClick={() => {
              setSelectedChannel("wa");
              setActiveModal("selection");
            }}
            className="w-full mt-8 bg-primary/20 hover:bg-primary/30 text-primary py-3 rounded-xl font-bold transition-all flex items-center justify-center gap-2"
          >
            <MessageCircle size={18} />
            Chat WhatsApp
          </button>
        </div>
        <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-primary/20 rounded-full blur-2xl" />
      </motion.div>
    </div>
  );
};
