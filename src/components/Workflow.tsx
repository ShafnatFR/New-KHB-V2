import { motion } from "motion/react";
import { HandCoins, Handshake, ShieldCheck, Users, Award, Download } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { cmsService } from "../services/api";
import { Skeleton } from "./shared/Skeleton";
import { WorkflowSkeleton } from "./shared/CommonSkeletons";


export default function Workflow() {
  const [cmsData, setCmsData] = useState<{ title: string; items: any[] } | null>(null);
  const [loading, setLoading] = useState(true);

  const staticSteps = [
    {
      id: "01",
      title: "Pelaku Usaha",
      desc: "Pendaftaran mandiri oleh UMKM.",
      icon: <HandCoins size={24} />,
      active: false,
    },
    {
      id: "02",
      title: "Pendampingan PPH",
      desc: "Proses pendampingan produk halal.",
      icon: <Handshake size={24} />,
      active: false,
    },
    {
      id: "03",
      title: "Verifikasi BPJPH",
      desc: "Pemeriksaan dokumen oleh otoritas.",
      icon: <ShieldCheck size={24} />,
      active: false,
    },
    {
      id: "04",
      title: "Komite Fatwa",
      desc: "Sidang fatwa untuk ketetapan halal.",
      icon: <Users size={24} />,
      active: false,
    },
    {
      id: "05",
      title: "Terbit Sertifikat",
      desc: "BPJPH menerbitkan sertifikat resmi.",
      icon: <Award size={24} />,
      active: false,
    },
    {
      id: "06",
      title: "Unduh Sertifikat",
      desc: "Siap untuk digunakan pada produk Anda.",
      icon: <Download size={24} />,
      active: true,
      href: "/layanan"
    },
  ];

  useEffect(() => {
    const loadCms = async () => {
      try {
        const pages = await cmsService.getPages();
        const landingPage = pages.find((p: any) => p.slug === "landing-page");
        if (landingPage) {
          const workflowBlock = landingPage.content.find((c: any) => 
            c.type === "features" && (c.data.title?.includes("Tata Cara") || c.data.items?.length === 6)
          );
          
          if (workflowBlock && workflowBlock.data) {
            setCmsData({
              title: workflowBlock.data.title,
              items: workflowBlock.data.items
            });
          }
        }
      } catch (error) {
        console.error("Workflow CMS fetch error:", error);
      } finally {
        setLoading(false);
      }
    };
    loadCms();
  }, []);

  const steps = cmsData ? cmsData.items.map((item, index) => ({
    id: `0${index + 1}`,
    title: item.title || staticSteps[index]?.title,
    desc: item.description || staticSteps[index]?.desc,
    icon: item.icon_url ? (
      <img src={item.icon_url} alt={item.title} className="w-6 h-6 object-contain" />
    ) : (staticSteps[index]?.icon || <HandCoins size={24} />),
    active: staticSteps[index]?.active || false,
    href: staticSteps[index]?.href
  })) : staticSteps;

  if (loading) {
    return <WorkflowSkeleton />;
  }

  return (
    <section className="py-24 bg-green-50/50">
      <div className="container-custom">
        <div className="mb-10 sm:mb-16 flex justify-between items-end">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400 mb-2">Workflow</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-dark">
              {cmsData?.title || "Tata Cara Sertifikasi Halal"}
            </h2>
          </div>
          {loading && <Skeleton className="h-8 w-48" />}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4 sm:gap-6">
          {steps.map((step, index) => {
            const CardContent = (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`relative p-8 rounded-[2rem] border transition-all duration-500 group h-full overflow-hidden flex flex-col ${
                  step.active 
                    ? "bg-gradient-to-br from-primary to-primary-dark border-primary text-white shadow-2xl shadow-primary/30 scale-105 z-10" 
                    : "bg-white border-transparent shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:border-primary/20 hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] hover:-translate-y-2"
                }`}
              >
                {step.active && (
                  <>
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-16 -mt-16" />
                    <div className="absolute bottom-0 left-0 w-24 h-24 bg-black/10 rounded-full blur-xl -ml-12 -mb-12" />
                  </>
                )}

                <div className="flex justify-between items-start mb-8 relative z-10">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-transform duration-500 group-hover:scale-110 shadow-lg ${
                    step.active ? "bg-white/20 text-white" : "bg-primary/5 text-primary group-hover:bg-primary group-hover:text-white"
                  }`}>
                    {step.icon}
                  </div>
                  <span className={`text-4xl font-black italic tracking-tighter opacity-10 transition-opacity group-hover:opacity-20 ${step.active ? "text-white" : "text-dark"}`}>
                    {step.id}
                  </span>
                </div>
                
                <h3 className={`font-black text-xl mb-3 relative z-10 ${step.active ? "text-white" : "text-dark group-hover:text-primary"}`}>{step.title}</h3>
                <p className={`text-sm leading-relaxed relative z-10 ${step.active ? "text-white/80" : "text-slate-500"}`}>
                  {step.desc}
                </p>

                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-20">
                    <motion.div 
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className={`w-8 h-px ${step.active ? "bg-primary/30" : "bg-slate-200"}`} 
                    />
                  </div>
                )}
              </motion.div>
            );

            return step.href ? (
              <Link key={step.id} to={step.href}>
                {CardContent}
              </Link>
            ) : (
              <div key={step.id}>
                {CardContent}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

