import { motion, AnimatePresence } from "motion/react";
import { ShieldCheck, Scale, Megaphone, Users, Briefcase, Zap, ArrowRight, X, MessageCircle, Phone, Loader2 } from "lucide-react";
import React, { useState, useEffect } from "react";
import { cmsService } from "../services/api";

export default function Services() {
  const [showModal, setShowModal] = useState(false);
  const [cmsData, setCmsData] = useState<{ hero: any; services: any[] } | null>(null);
  const [loading, setLoading] = useState(true);

  const consultants = [
    { name: "Admin Konsultasi 1", phone: "6281234567890", role: "Sertifikasi Halal & Legalitas" },
    { name: "Admin Konsultasi 2", phone: "6289876543210", role: "Branding & Digital Marketing" }
  ];

  const staticServices = [
    {
      title: "Sertifikasi Halal",
      desc: "Pendampingan menyeluruh mulai dari pendaftaran BPJPH, audit internal, hingga terbitnya sertifikat halal resmi.",
      icon: <ShieldCheck size={32} />,
      color: "bg-primary",
      features: ["Pendampingan PPH", "Verifikasi Dokumen", "Sidang Fatwa"]
    },
    {
      title: "Legalitas Bisnis",
      desc: "Bantuan pengurusan izin usaha legal seperti NIB, IUMK, PIRT, dan regulasi bisnis lainnya untuk UMKM.",
      icon: <Scale size={32} />,
      color: "bg-secondary",
      features: ["Pengurusan NIB", "Izin PIRT", "Konsultasi Hukum"]
    },
    {
      title: "Halal Branding",
      desc: "Strategi pemasaran dan branding khusus untuk produk halal guna meningkatkan kepercayaan konsumen.",
      icon: <Megaphone size={32} />,
      color: "bg-indigo-500",
      features: ["Digital Strategy", "Logo Design", "Market Analysis"]
    }
  ];

  useEffect(() => {
    const loadCms = async () => {
      try {
        const pages = await cmsService.getPages();
        const servicePage = pages.find((p: any) => p.slug === "layanan");
        if (servicePage) {
          const heroBlock = servicePage.content.find((c: any) => c.type === "hero");
          const featuresBlock = servicePage.content.find((c: any) => c.type === "features");

          setCmsData({
            hero: heroBlock?.data,
            services: featuresBlock?.data?.items || []
          });
        }
      } catch (error) {
        console.error("Services CMS fetch error:", error);
      } finally {
        setLoading(false);
      }
    };
    loadCms();
  }, []);

  const mainServices = cmsData?.services.length ? cmsData.services.map((s, idx) => {
    // Parse features from description if it contains bullet points (starts with -)
    const parts = s.description.split("\n- ");
    const desc = parts[0];
    const features = parts.slice(1);

    return {
      title: s.title || staticServices[idx]?.title,
      desc: desc || staticServices[idx]?.desc,
      icon: staticServices[idx]?.icon || <ShieldCheck size={32} />,
      color: staticServices[idx]?.color || "bg-primary",
      features: features.length ? features : staticServices[idx]?.features
    };
  }) : staticServices;

  const additionalServices = [
    {
      title: "Konsultasi Bisnis",
      desc: "Sesi mentoring eksklusif dengan para ahli untuk mengoptimalkan operasional dan pertumbuhan bisnis Anda.",
      icon: <Briefcase size={24} />
    },
    {
      title: "Networking",
      desc: "Akses ke komunitas pengusaha halal di Bandung untuk kolaborasi dan perluasan jaringan distribusi.",
      icon: <Users size={24} />
    },
    {
      title: "Akselerasi Digital",
      desc: "Transformasi digital untuk UMKM agar siap bersaing di pasar online dan marketplace global.",
      icon: <Zap size={24} />
    }
  ];

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="py-20 bg-dark text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-primary/10 blur-[120px] rounded-full" />
        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <p className="text-primary font-bold tracking-widest uppercase text-xs mb-4">Layanan Kami</p>
            <div className="mb-10 flex justify-between items-end">
              <div className="relative group animate-float">
                {/* Rotating Gradient Border */}
                <div className="absolute -inset-4 bg-gradient-to-r from-primary via-secondary to-primary rounded-full opacity-30 group-hover:opacity-60 blur-md animate-spin-slow" />
                
                {/* Outer Glow */}
                <div className="absolute -inset-1 bg-primary/20 rounded-full blur-2xl animate-pulse" />
                
                {/* Decorative Points */}
                <div className="absolute -top-2 -right-2 w-4 h-4 bg-secondary rounded-full animate-bounce delay-100 shadow-lg shadow-secondary/50 z-20" />
                <div className="absolute -bottom-2 -left-2 w-3 h-3 bg-primary rounded-full animate-bounce delay-300 shadow-lg shadow-primary/50 z-20" />

                <div className="relative">
                  <div className="absolute inset-0 bg-white/20 rounded-full blur-xl group-hover:bg-primary/30 transition-all duration-500" />
                  <img 
                    src="/umkmKlinik.png" 
                    alt="UMKM Klinik" 
                    className="relative h-32 w-32 md:h-40 md:w-40 rounded-full object-cover shadow-2xl border-4 border-white/20 group-hover:border-primary/50 transition-all duration-500 z-10" 
                    referrerPolicy="no-referrer" 
                  />
                </div>
              </div>

            </div>
            <h1 className="text-5xl md:text-6xl font-extrabold mb-6 leading-tight">
              {cmsData?.hero?.headline ? (
                <>
                  {cmsData.hero.headline.split(" untuk ")[0]} untuk <br />
                  <span className="text-primary">{cmsData.hero.headline.split(" untuk ")[1]}</span>
                </>
              ) : (
                <>Solusi Terpadu untuk <br /><span className="text-primary">Pertumbuhan Bisnis</span> Anda.</>
              )}
            </h1>
            <p className="text-lg text-slate-400 leading-relaxed max-w-2xl">
              {cmsData?.hero?.sub_headline || "Kami menyediakan berbagai layanan pendampingan profesional untuk memastikan bisnis UMKM Anda naik kelas, legal, dan terverifikasi halal."}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Services Grid with Varied Layout */}
      <section className="py-24 bg-indigo-50/30 relative overflow-hidden">
        <div className="absolute top-40 -left-20 w-80 h-80 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-20 -right-20 w-80 h-80 bg-secondary/5 rounded-full blur-3xl pointer-events-none" />
        
        <div className="container-custom relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold text-dark mb-4">Layanan Unggulan UMKM Klinik</h2>
            <p className="text-slate-500">Pilih program pendampingan yang paling relevan dengan fase pertumbuhan bisnis Anda saat ini.</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {mainServices.map((service, idx) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.15 }}
                className={`group rounded-[2.5rem] border border-slate-100 bg-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] hover:-translate-y-1 hover:border-primary/20 transition-all duration-500 overflow-hidden ${
                  idx === 0 
                    ? "lg:col-span-2 flex flex-col md:flex-row items-center p-8 md:p-12 gap-8 md:gap-12 bg-gradient-to-br from-white to-slate-50" 
                    : "flex flex-col p-8 md:p-10"
                }`}
              >
                {/* Icon Wrapper */}
                <div className={`shrink-0 ${idx === 0 ? "w-32 h-32" : "w-20 h-20"} ${service.color} text-white rounded-[2rem] flex items-center justify-center shadow-xl shadow-current/20 ${idx !== 0 && "mb-8"}`}>
                  {React.cloneElement(service.icon as React.ReactElement, { size: idx === 0 ? 48 : 36 })}
                </div>
                
                {/* Content */}
                <div className={idx === 0 ? "flex-1" : ""}>
                  <h3 className={`${idx === 0 ? "text-3xl md:text-4xl" : "text-2xl"} font-extrabold text-dark mb-4 group-hover:text-primary transition-colors`}>
                    {service.title}
                  </h3>
                  <p className="text-slate-500 mb-8 leading-relaxed whitespace-pre-line text-lg">
                    {service.desc}
                  </p>
                  
                  {service.features && service.features.length > 0 && (
                    <ul className={`grid ${idx === 0 ? "sm:grid-cols-2 gap-4" : "grid-cols-1 gap-3"} mb-10`}>
                      {service.features.map(f => (
                        <li key={f} className="flex items-center gap-3 text-sm font-bold text-slate-700 bg-slate-50 py-2 px-4 rounded-xl border border-slate-100">
                          <div className={`w-2 h-2 rounded-full ${service.color.replace('bg-', 'bg-')}`} />
                          {f}
                        </li>
                      ))}
                    </ul>
                  )}
                  
                  <button 
                    onClick={() => setShowModal(true)}
                    className="inline-flex items-center gap-2 text-primary font-bold group-hover:gap-3 transition-all bg-primary/5 px-6 py-3 rounded-xl hover:bg-primary hover:text-white"
                  >
                    Konsultasi {service.title}
                    <ArrowRight size={18} />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Services */}
      <section className="py-24 bg-slate-50/50">
        <div className="container-custom">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-extrabold text-dark mb-4">Layanan Ekosistem Lainnya</h2>
            <p className="text-slate-500">Selain layanan utama, kami juga menyediakan berbagai dukungan tambahan untuk ekosistem bisnis Anda.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {additionalServices.map((service, idx) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white p-8 rounded-[2rem] border border-transparent shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300 flex flex-col items-center text-center group"
              >
                <div className="w-16 h-16 bg-slate-50 group-hover:bg-primary rounded-2xl flex items-center justify-center text-slate-500 group-hover:text-white transition-colors mb-6 shadow-inner">
                  {service.icon}
                </div>
                <h4 className="font-bold text-xl text-dark mb-3">{service.title}</h4>
                <p className="text-sm text-slate-500 leading-relaxed">{service.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section for Services */}
      <section className="py-24 bg-white">
        <div className="container-custom">
          <div className="bg-primary rounded-[3rem] p-12 md:p-20 text-center text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/10 rounded-full blur-3xl" />
            <div className="relative z-10">
              <h2 className="text-4xl md:text-5xl font-extrabold mb-6">Butuh Arahan Khusus?</h2>
              <p className="text-white/90 mb-10 max-w-2xl mx-auto text-lg">Tim ahli kami siap membantu Anda menentukan layanan mana yang paling sesuai dengan kebutuhan bisnis Anda saat ini. Konsultasi awal gratis.</p>
              <button 
                onClick={() => setShowModal(true)}
                className="bg-white text-primary px-10 py-4 rounded-2xl font-bold hover:bg-slate-50 transition-all shadow-xl hover:-translate-y-1 hover:shadow-2xl"
              >
                Hubungi Konsultan Kami
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Consultant Modal */}
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
              className="relative w-full max-w-md bg-white rounded-[3rem] shadow-2xl overflow-hidden"
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
    </div>
  );
}
