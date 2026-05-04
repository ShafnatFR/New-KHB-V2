import { motion } from "motion/react";
import { ShieldCheck, Scale, Megaphone, Briefcase, Users, Zap, ArrowRight } from "lucide-react";
import React, { useState, useEffect } from "react";
import { cmsService } from "../services/api";
import { ServicesSkeleton } from "./shared/CommonSkeletons";
import { ServiceCard } from "./services/ServiceCard";
import { ConsultantModal } from "./services/ConsultantModal";

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

  if (loading) return <ServicesSkeleton />;

  const mainServices = cmsData?.services.length ? cmsData.services.map((s, idx) => {
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
      <section className="py-20 bg-dark text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-primary/10 blur-[120px] rounded-full" />
        <div className="container-custom relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl">
            <p className="text-primary font-bold tracking-widest uppercase text-xs mb-4">Layanan Kami</p>
            <div className="mb-10 flex justify-between items-end">
              <div className="relative group animate-float">
                <div className="absolute -inset-4 bg-gradient-to-r from-primary via-secondary to-primary rounded-full opacity-30 blur-md animate-spin-slow" />
                <div className="absolute -inset-1 bg-primary/20 rounded-full blur-2xl animate-pulse" />
                <img src="/umkmKlinik.png" alt="UMKM Klinik" className="relative h-32 w-32 md:h-40 md:w-40 rounded-full object-cover shadow-2xl border-4 border-white/20 z-10" />
              </div>
            </div>
            <h1 className="text-5xl md:text-6xl font-extrabold mb-6 leading-tight">
              {cmsData?.hero?.headline ? (
                <>{cmsData.hero.headline.split(" untuk ")[0]} untuk <br /><span className="text-primary">{cmsData.hero.headline.split(" untuk ")[1]}</span></>
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

      <section className="py-24 bg-indigo-50/30 relative overflow-hidden">
        <div className="container-custom relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold text-dark mb-4">Layanan Unggulan UMKM Klinik</h2>
            <p className="text-slate-500">Pilih program pendampingan yang paling relevan dengan fase pertumbuhan bisnis Anda saat ini.</p>
          </div>
          <div className="grid lg:grid-cols-2 gap-8">
            {mainServices.map((service, idx) => (
              <ServiceCard key={service.title} service={service} idx={idx} setShowModal={setShowModal} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-slate-50/50">
        <div className="container-custom">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-extrabold text-dark mb-4">Layanan Ekosistem Lainnya</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {additionalServices.map((service, idx) => (
              <motion.div key={service.title} className="bg-white p-8 rounded-[2rem] shadow-sm hover:shadow-xl transition-all text-center group">
                <div className="w-16 h-16 bg-slate-50 group-hover:bg-primary rounded-2xl flex items-center justify-center mx-auto mb-6 transition-colors">
                  {service.icon}
                </div>
                <h4 className="font-bold text-xl text-dark mb-3">{service.title}</h4>
                <p className="text-sm text-slate-500 leading-relaxed">{service.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="container-custom">
          <div className="bg-primary rounded-[3rem] p-12 md:p-20 text-center text-white relative overflow-hidden">
            <h2 className="text-4xl md:text-5xl font-extrabold mb-6">Butuh Arahan Khusus?</h2>
            <button onClick={() => setShowModal(true)} className="bg-white text-primary px-10 py-4 rounded-2xl font-bold">
              Hubungi Konsultan Kami
            </button>
          </div>
        </div>
      </section>

      <ConsultantModal showModal={showModal} setShowModal={setShowModal} consultants={consultants} />
    </div>
  );
}
