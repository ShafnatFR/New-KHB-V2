import React from "react";
import { motion } from "motion/react";
import { Send, MessageCircle, Mail } from "lucide-react";

interface ContactFormProps {
  formState: {
    name: string;
    subject: string;
    message: string;
    method: "wa" | "email";
  };
  setFormState: (state: any) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export const ContactForm: React.FC<ContactFormProps> = ({ formState, setFormState, onSubmit }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      className="lg:col-span-2 bg-white rounded-[2.5rem] p-8 md:p-12 border border-slate-100 shadow-xl shadow-slate-100"
    >
      <h2 className="text-3xl font-bold text-dark mb-8">Kirim Pesan</h2>
      <form onSubmit={onSubmit} className="space-y-8">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700 ml-1">Nama Lengkap</label>
            <input
              type="text"
              required
              placeholder="Masukkan nama Anda"
              className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all"
              value={formState.name}
              onChange={(e) => setFormState({ ...formState, name: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700 ml-1">Subjek</label>
            <input
              type="text"
              required
              placeholder="Apa yang ingin Anda tanyakan?"
              className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all"
              value={formState.subject}
              onChange={(e) => setFormState({ ...formState, subject: e.target.value })}
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-bold text-slate-700 ml-1">Pesan</label>
          <textarea
            required
            rows={6}
            placeholder="Tuliskan pesan Anda di sini..."
            className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all resize-none"
            value={formState.message}
            onChange={(e) => setFormState({ ...formState, message: e.target.value })}
          />
        </div>

        <div className="space-y-4">
          <label className="text-sm font-bold text-slate-700 ml-1">Pilih Metode Kontak</label>
          <div className="grid grid-cols-2 gap-4">
            <button
              type="button"
              onClick={() => setFormState({ ...formState, method: "wa" })}
              className={`py-4 rounded-2xl border-2 font-bold flex items-center justify-center gap-2 transition-all ${formState.method === "wa" ? "border-primary bg-primary/5 text-primary" : "border-slate-100 text-slate-400 hover:border-slate-200"}`}
            >
              <MessageCircle size={20} />
              WhatsApp
            </button>
            <button
              type="button"
              onClick={() => setFormState({ ...formState, method: "email" })}
              className={`py-4 rounded-2xl border-2 font-bold flex items-center justify-center gap-2 transition-all ${formState.method === "email" ? "border-primary bg-primary/5 text-primary" : "border-slate-100 text-slate-400 hover:border-slate-200"}`}
            >
              <Mail size={20} />
              Email
            </button>
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          className="w-full bg-primary text-white py-5 rounded-2xl font-bold flex items-center justify-center gap-3 shadow-lg shadow-primary/20 hover:bg-primary-dark transition-all"
        >
          <Send size={20} />
          {formState.method === "wa" ? "Kirim via WhatsApp" : "Kirim via Email"}
        </motion.button>
      </form>
    </motion.div>
  );
};
