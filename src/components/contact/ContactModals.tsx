import React from "react";
import { motion, AnimatePresence } from "motion/react";
import { MessageCircle, Mail, X, Send } from "lucide-react";

interface ContactModalsProps {
  activeModal: "selection" | "form-result" | null;
  setActiveModal: (modal: any) => void;
  selectedChannel: "wa" | "email";
  setSelectedChannel: (channel: "wa" | "email") => void;
  cmsData: any;
  getWaLink: (phone: string, isFromForm: boolean) => string;
  getEmailLink: (email: string, isFromForm: boolean) => string;
  workingHours: string[];
}

export const ContactModals: React.FC<ContactModalsProps> = ({
  activeModal,
  setActiveModal,
  selectedChannel,
  setSelectedChannel,
  cmsData,
  getWaLink,
  getEmailLink,
  workingHours
}) => {
  return (
    <AnimatePresence>
      {activeModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveModal(null)}
            className="absolute inset-0 bg-dark/60 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-xl bg-white rounded-[3rem] shadow-2xl overflow-hidden"
          >
            <div className="p-8 md:p-12">
              <div className="flex justify-between items-center mb-8">
                <h3 className="text-2xl font-bold text-dark">
                  {activeModal === "form-result" ? "Pilih Metode Pengiriman" : "Hubungi Kami Via"}
                </h3>
                <button 
                  onClick={() => setActiveModal(null)}
                  className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:text-dark transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              {activeModal === "form-result" && (
                <div className="grid grid-cols-2 gap-4 mb-8">
                  <button
                    onClick={() => setSelectedChannel("wa")}
                    className={`p-6 rounded-3xl border-2 transition-all flex flex-col items-center gap-3 ${selectedChannel === "wa" ? "border-primary bg-primary/5 text-primary" : "border-slate-100 text-slate-400 hover:border-slate-200"}`}
                  >
                    <MessageCircle size={32} />
                    <span className="font-bold">WhatsApp</span>
                  </button>
                  <button
                    onClick={() => setSelectedChannel("email")}
                    className={`p-6 rounded-3xl border-2 transition-all flex flex-col items-center gap-3 ${selectedChannel === "email" ? "border-primary bg-primary/5 text-primary" : "border-slate-100 text-slate-400 hover:border-slate-200"}`}
                  >
                    <Mail size={32} />
                    <span className="font-bold">Email</span>
                  </button>
                </div>
              )}

              <div className="space-y-4">
                <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-2">Pilih Kontak Admin:</p>
                {selectedChannel === "wa" ? (
                  (cmsData?.contacts?.phone_numbers?.length ? cmsData.contacts.phone_numbers : ["+62 812-3456-7890", "+62 898-7654-3210"]).map((phone: string, i: number) => (
                    <a
                      key={i}
                      href={getWaLink(phone, activeModal === "form-result")}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-4 p-6 rounded-3xl border border-slate-100 hover:border-primary hover:bg-primary/5 transition-all group"
                    >
                      <div className="w-12 h-12 rounded-2xl bg-green-100 text-green-600 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all">
                        <MessageCircle size={24} />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold text-dark">Admin {i + 1}</h4>
                        <p className="text-xs text-slate-500">{phone}</p>
                      </div>
                      <Send size={18} className="text-slate-300 group-hover:text-primary transition-all" />
                    </a>
                  ))
                ) : (
                  (cmsData?.contacts?.emails?.length ? cmsData.contacts.emails : ["komunitashalalbandung@gmail.com"]).map((email: string, i: number) => (
                    <a
                      key={i}
                      href={getEmailLink(email, activeModal === "form-result")}
                      className="flex items-center gap-4 p-6 rounded-3xl border border-slate-100 hover:border-primary hover:bg-primary/5 transition-all group"
                    >
                      <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all">
                        <Mail size={24} />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold text-dark">Email Support {i + 1}</h4>
                        <p className="text-xs text-slate-500">{email}</p>
                      </div>
                      <Send size={18} className="text-slate-300 group-hover:text-primary transition-all" />
                    </a>
                  ))
                )}
              </div>

              <p className="mt-8 text-center text-xs text-slate-400">
                Layanan tersedia pada jam kerja: {workingHours[1]}
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
