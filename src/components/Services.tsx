import { motion, AnimatePresence } from "motion/react";
import { ShieldCheck, Scale, Megaphone, Users, Briefcase, Zap, ArrowRight, X, MessageCircle, Phone, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import { cmsService } from "../services/api";

export default function Services() {
  const [showModal, setShowModal] = useState(false);
  const [cmsData, setCmsData] = useState<{ hero: any; services: any[]; slider: any[] } | null>(null);
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
          const sliderBlock = servicePage.content.find((c: any) => c.type === "activity-slider");
          const featuresBlock = servicePage.content.find((c: any) => c.type === "features");

          setCmsData({
            hero: heroBlock?.data,
            slider: sliderBlock?.data?.activities || [],
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
            <div className="mb-8 flex justify-between items-end">
              <img src="input_file_1.png" alt="UMKM Klinik" className="h-32 w-auto" referrerPolicy="no-referrer" />
              {loading && <Loader2 className="w-8 h-8 text-primary animate-spin mb-4" />}
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
            <p className="text-lg text-slate-400 leading-relaxed">
              {cmsData?.hero?.sub_headline || "Kami menyediakan berbagai layanan pendampingan profesional untuk memastikan bisnis UMKM Anda naik kelas, legal, dan terverifikasi halal."}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Activity Slider Section (Dynamic from CMS) */}
      {cmsData?.slider && cmsData.slider.length > 0 && (
        <section className="py-12 bg-slate-50 overflow-hidden">
          <div className="container-custom">
            <div className="flex gap-6 overflow-x-auto pb-8 scrollbar-hide no-scrollbar">
              {cmsData.slider.map((activity: any, i: number) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="min-w-[300px] md:min-w-[400px] h-64 rounded-3xl overflow-hidden shadow-lg border border-white"
                >
                  <img 
                    src={activity.image} 
                    alt={activity.title || `Kegiatan ${i+1}`} 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Main Services Grid */}
      <section className="py-24 bg-white">
        <div className="container-custom">
          <div className="grid lg:grid-cols-3 gap-8">
            {mainServices.map((service, idx) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="group p-10 rounded-[2.5rem] border border-slate-100 bg-slate-50 hover:bg-white hover:shadow-2xl hover:shadow-slate-200 transition-all duration-500"
              >
                <div className={`w-16 h-16 ${service.color} text-white rounded-2xl flex items-center justify-center mb-8 shadow-lg shadow-current/20`}>
                  {service.icon}
                </div>
                <h3 className="text-2xl font-bold text-dark mb-4">{service.title}</h3>
                <p className="text-slate-500 mb-8 leading-relaxed whitespace-pre-line">
                  {service.desc}
                </p>
                <ul className="space-y-3 mb-8">
                  {service.features.map(f => (
                    <li key={f} className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                      {f}
                    </li>
                  ))}
                </ul>
                <button 
                  onClick={() => setShowModal(true)}
                  className="flex items-center gap-2 text-primary font-bold group-hover:gap-3 transition-all"
                >
                  Pelajari Selengkapnya
                  <ArrowRight size={18} />
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Services */}
      <section className="py-24 bg-slate-50">
        <div className="container-custom">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-extrabold text-dark mb-4">Layanan Pendukung Lainnya</h2>
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
                className="bg-white p-8 rounded-3xl border border-slate-100 flex gap-6 items-start"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary shrink-0">
                  {service.icon}
                </div>
                <div>
                  <h4 className="font-bold text-lg text-dark mb-2">{service.title}</h4>
                  <p className="text-sm text-slate-500 leading-relaxed">{service.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section for Services */}
      <section className="py-24 bg-white">
        <div className="container-custom">
          <div className="bg-primary rounded-[3rem] p-12 md:p-20 text-center text-white relative overflow-hidden">
            <div className="relative z-10">
              <h2 className="text-4xl md:text-5xl font-extrabold mb-6">Butuh Konsultasi Khusus?</h2>
              <p className="text-white/80 mb-10 max-w-2xl mx-auto">Tim ahli kami siap membantu Anda menentukan layanan mana yang paling sesuai dengan kebutuhan bisnis Anda saat ini.</p>
              <button 
                onClick={() => setShowModal(true)}
                className="bg-white text-primary px-10 py-4 rounded-2xl font-bold hover:bg-slate-100 transition-all shadow-xl"
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
