import { motion } from "motion/react";
import { Scale, Megaphone, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";

export default function Ecosystem() {
  const benefits = [
    "Pendampingan One-on-One dengan Expert",
    "Audit Kesiapan Sertifikasi Halal secara Gratis",
    "Akses ke Jaringan Investor & Distribusi Halal",
  ];

  return (
    <section className="py-24 bg-slate-50">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 order-2 lg:order-1">
            <Link to="/layanan">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-white p-6 sm:p-8 rounded-3xl shadow-sm border border-slate-100 h-full hover:shadow-md transition-shadow"
              >
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-secondary/10 rounded-xl sm:rounded-2xl flex items-center justify-center text-secondary mb-4 sm:mb-6">
                  <Scale size={20} className="sm:size-[24px]" />
                </div>
                <h3 className="font-bold text-lg sm:text-xl mb-2 text-dark">Legal Aspect</h3>
                <p className="text-sm text-slate-500">NIB, IUMK, & Regulasi Bisnis</p>
              </motion.div>
            </Link>
            
            <Link to="/layanan">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="bg-indigo-50 p-6 sm:p-8 rounded-3xl shadow-sm border border-indigo-100 h-full hover:shadow-md transition-shadow"
              >
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-indigo-500/10 rounded-xl sm:rounded-2xl flex items-center justify-center text-indigo-600 mb-4 sm:mb-6">
                  <Megaphone size={20} className="sm:size-[24px]" />
                </div>
                <h3 className="font-bold text-lg sm:text-xl mb-2 text-dark">Marketing</h3>
                <p className="text-sm text-slate-500">Halal Branding & Digital Strategy</p>
              </motion.div>
            </Link>
            
            <Link to="/layanan" className="sm:col-span-2">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="bg-primary p-6 sm:p-8 rounded-3xl text-white relative overflow-hidden group"
              >
                <div className="relative z-10 flex flex-col sm:flex-row items-center gap-4 sm:gap-6 text-center sm:text-left">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white rounded-2xl flex items-center justify-center shrink-0">
                    <img src="https://picsum.photos/seed/collab/100/100" alt="Collab" className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg" referrerPolicy="no-referrer" />
                  </div>
                  <div>
                    <h3 className="font-bold text-xl sm:text-2xl mb-1 sm:mb-2">KHB × Ko+Lab Collaboration</h3>
                    <p className="text-white/80 text-xs sm:text-sm leading-relaxed">
                      Managing business ecosystems through strategic partnership.
                    </p>
                  </div>
                </div>
                
                {/* Decorative background circle */}
                <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700" />
              </motion.div>
            </Link>
          </div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="order-1 lg:order-2"
          >
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400 mb-2">Strategic Ecosystem</p>
            <div className="mb-4 sm:mb-6">
              <img src="input_file_1.png" alt="UMKM Klinik" className="h-16 sm:h-20 w-auto" referrerPolicy="no-referrer" />
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-dark leading-tight mb-6">
              UMKM Klinik: Solusi Terpadu Pertumbuhan Bisnis.
            </h2>
            
            <p className="text-base sm:text-lg text-slate-600 mb-8 leading-relaxed">
              Kami tidak hanya memberikan label halal. Melalui kolaborasi strategis dengan Ko+Lab, UMKM Klinik KHB menyediakan akses konsultasi mendalam untuk manajemen operasional, optimasi pemasaran, hingga kepatuhan hukum yang menyeluruh.
            </p>
            
            <ul className="space-y-3 sm:space-y-4">
              {benefits.map((benefit, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: 10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  className="flex items-center gap-3 text-slate-700 font-medium text-sm sm:text-base"
                >
                  <div className="text-primary shrink-0">
                    <CheckCircle2 size={18} className="sm:size-[20px]" />
                  </div>
                  {benefit}
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

