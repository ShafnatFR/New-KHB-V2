import React from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, MessageCircle, Phone } from "lucide-react";

interface ConsultantModalProps {
  showModal: boolean;
  setShowModal: (show: boolean) => void;
  consultants: any[];
}

export const ConsultantModal: React.FC<ConsultantModalProps> = ({ showModal, setShowModal, consultants }) => {
  return (
    <AnimatePresence>
      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowModal(false)}
            className="absolute inset-0 bg-dark/60 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-md bg-white rounded-[3rem] shadow-2xl overflow-hidden"
          >
            <div className="p-8 md:p-10">
              <div className="flex justify-between items-center mb-8">
                <h3 className="text-2xl font-bold text-dark">Pilih Konsultan</h3>
                <button 
                  onClick={() => setShowModal(false)}
                  className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:text-dark transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="space-y-4">
                {consultants.map((c, i) => (
                  <a 
                    key={i}
                    href={`https://wa.me/${c.phone}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 p-6 rounded-3xl border border-slate-100 hover:border-primary hover:bg-primary/5 transition-all group"
                  >
                    <div className="w-12 h-12 rounded-2xl bg-green-100 text-green-600 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all">
                      <MessageCircle size={24} />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-dark">{c.name}</h4>
                      <p className="text-xs text-slate-500">{c.role}</p>
                    </div>
                    <Phone size={18} className="text-slate-300 group-hover:text-primary transition-all" />
                  </a>
                ))}
              </div>

              <p className="mt-8 text-center text-xs text-slate-400">
                Layanan konsultasi tersedia pada jam kerja <br />
                Senin - Jumat: 08:00 - 17:00 WIB
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
