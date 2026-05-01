import { motion } from "motion/react";
import { Link } from "react-router-dom";

export default function CTA() {
  return (
    <section className="py-24">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-dark rounded-[2.5rem] sm:rounded-[3rem] p-8 sm:p-12 md:p-20 text-center relative overflow-hidden"
        >
          {/* Decorative background patterns */}
          <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary rounded-full blur-[100px]" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-secondary rounded-full blur-[100px]" />
          </div>

          <div className="relative z-10 max-w-3xl mx-auto">
            <h2 className="text-3xl sm:text-4xl md:text-6xl font-extrabold text-white mb-6 leading-tight">
              Siap Kembangkan Bisnis Halal Anda?
            </h2>
            <p className="text-base sm:text-lg text-white/70 mb-10 leading-relaxed px-4">
              Bergabunglah bersama ribuan pengusaha lainnya di Bandung dalam ekosistem ekonomi halal yang suportif dan profesional.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/layanan" className="w-full sm:w-auto">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full bg-primary text-white px-8 sm:px-10 py-4 rounded-2xl font-bold shadow-xl shadow-primary/20 hover:bg-primary-dark transition-all text-sm sm:text-base"
                >
                  Daftar UMKM Klinik
                </motion.button>
              </Link>
              
              <Link to="/kontak" className="w-full sm:w-auto">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full bg-white text-dark px-8 sm:px-10 py-4 rounded-2xl font-bold hover:bg-slate-100 transition-all text-sm sm:text-base"
                >
                  Hubungi Komunitas
                </motion.button>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

