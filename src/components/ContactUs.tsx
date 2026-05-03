import { motion, AnimatePresence } from "motion/react";
import { Mail, Phone, MapPin, Send, MessageCircle, Clock, Loader2, X } from "lucide-react";
import React, { useState, useEffect } from "react";
import { cmsService } from "../services/api";
import { ContactSkeleton } from "./SkeletonLoader";

export default function ContactUs() {
  const [cmsData, setCmsData] = useState<{ hero: any; contacts: any; slider: any[] } | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [activeModal, setActiveModal] = useState<null | "selection" | "form-result">(null);
  const [selectedChannel, setSelectedChannel] = useState<"wa" | "email">("wa");

  const [formState, setFormState] = useState({
    name: "",
    subject: "",
    message: "",
    method: "wa" as "wa" | "email"
  });

  useEffect(() => {
    if (cmsData?.slider && cmsData.slider.length > 1) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % cmsData.slider.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [cmsData?.slider]);

  useEffect(() => {
    const loadCms = async () => {
      try {
        const pages = await cmsService.getPages();
        const contactPage = pages.find((p: any) => p.slug === "kontak");
        if (contactPage) {
          const heroBlock = contactPage.content.find((c: any) => c.type === "hero");
          const sliderBlock = contactPage.content.find((c: any) => c.type === "activity-slider");
          const contactsBlock = contactPage.content.find((c: any) => c.type === "contacts");

          setCmsData({
            hero: heroBlock?.data,
            slider: sliderBlock?.data?.activities || [],
            contacts: contactsBlock?.data
          });
        }
      } catch (error) {
        console.error("Contact CMS fetch error:", error);
      } finally {
        setLoading(false);
      }
    };
    loadCms();
  }, []);

  if (loading) {
    return <ContactSkeleton />;
  }

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSelectedChannel(formState.method);
    setActiveModal("form-result");
  };

  const getWaLink = (phone: string, isFromForm = false) => {
    const cleanPhone = phone.replace(/[^0-9]/g, "");
    let message = "";
    if (isFromForm) {
      message = encodeURIComponent(
        `📌 *PESAN BARU DARI WEBSITE KHB*\n\n*Nama:* ${formState.name}\n*Subjek:* ${formState.subject}\n\n*Pesan:*\n${formState.message}\n\n---`
      );
    } else {
      message = encodeURIComponent("Halo KHB, saya ingin berkonsultasi mengenai sertifikasi halal.");
    }
    return `https://wa.me/${cleanPhone}?text=${message}`;
  };

  const getEmailLink = (email: string, isFromForm = false) => {
    if (isFromForm) {
      const body = encodeURIComponent(
        `Halo Tim KHB,\n\nSaya ${formState.name} ingin menyampaikan pesan berikut:\n\n${formState.message}\n\nTerima kasih.`
      );
      return `mailto:${email}?subject=${encodeURIComponent("[Web Inquiry] " + formState.subject)}&body=${body}`;
    }
    return `mailto:${email}`;
  };

  const contactInfo = [
    {
      icon: <Phone className="text-primary" size={24} />,
      title: "Telepon / WhatsApp",
      details: cmsData?.contacts?.phone_numbers?.length ? cmsData.contacts.phone_numbers : ["+62 812-3456-7890", "+62 812-9876-5432"],
      action: "Hubungi Sekarang",
      onClick: () => {
        setSelectedChannel("wa");
        setActiveModal("selection");
      }
    },
    {
      icon: <Mail className="text-primary" size={24} />,
      title: "Email Resmi",
      details: cmsData?.contacts?.emails?.length ? cmsData.contacts.emails : ["info@khb-bandung.com", "support@khb-bandung.com"],
      action: "Kirim Email",
      onClick: () => {
        setSelectedChannel("email");
        setActiveModal("selection");
      }
    },
    {
      icon: <MapPin className="text-primary" size={24} />,
      title: "Lokasi Kantor",
      details: cmsData?.contacts?.addresses?.length > 0 
        ? cmsData.contacts.addresses 
        : (cmsData?.contacts?.map_location_url 
            ? [
                (() => {
                  const url = cmsData.contacts.map_location_url;
                  const match = url.match(/place\/([^\/]+)/);
                  if (match && match[1]) {
                    return decodeURIComponent(match[1].replace(/\+/g, " "));
                  }
                  return "Lokasi Komunitas";
                })(),
                "Bandung, Jawa Barat"
              ]
            : ["Bandung, Jawa Barat"]),
      action: "Lihat di Maps",
      link: cmsData?.contacts?.map_location_url || "#"
    }
  ];

  // Helper to parse working hours from "Day_Hours" format
  const workingHours = cmsData?.contacts?.working_hours?.split("_") || ["Senin - Jumat", "08:00 - 17:00"];

  return (
    <div className="pt-20">
      {/* Netflix-style Carousel Header */}
      <section className="relative h-[70vh] md:h-[85vh] w-full bg-dark overflow-hidden">
        <AnimatePresence mode="wait">
          {cmsData?.slider && cmsData.slider.length > 0 ? (
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
              className="absolute inset-0"
            >
              <img
                src={cmsData.slider[currentIndex].image}
                alt="Header"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/40 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-r from-dark/80 via-transparent to-transparent" />
            </motion.div>
          ) : (
            <div className="absolute inset-0 bg-slate-900">
               <div className="absolute inset-0 bg-gradient-to-t from-dark to-transparent" />
            </div>
          )}
        </AnimatePresence>

        <div className="container-custom relative h-full flex flex-col justify-center z-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="max-w-3xl"
          >
            <div className="flex items-center gap-4 mb-6">
              <p className="text-primary font-bold tracking-[0.3em] uppercase text-xs md:text-sm">Contact Us</p>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-black text-white mb-6 leading-tight">
              {cmsData?.hero?.headline || "Mari Berdiskusi."}
            </h1>
            
            <p className="text-lg md:text-xl text-slate-300 leading-relaxed mb-10 max-w-2xl">
              {cmsData?.hero?.sub_headline || "Punya pertanyaan tentang sertifikasi halal atau ingin bergabung dengan komunitas? Kami siap membantu pertumbuhan bisnis Anda."}
            </p>

            <div className="flex flex-wrap gap-4">
              <button 
                onClick={() => document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-primary text-white px-8 py-4 rounded-xl font-bold flex items-center gap-2 hover:bg-primary-dark transition-all shadow-lg shadow-primary/20"
              >
                <Send size={20} />
                Kirim Pesan
              </button>
              <button 
                onClick={() => {
                  setSelectedChannel("wa");
                  setActiveModal("selection");
                }}
                className="bg-white/10 backdrop-blur-md text-white border border-white/20 px-8 py-4 rounded-xl font-bold flex items-center gap-2 hover:bg-white/20 transition-all"
              >
                <MessageCircle size={20} />
                WhatsApp Kami
              </button>
            </div>
          </motion.div>

          {cmsData?.slider && cmsData.slider.length > 1 && (
            <div className="absolute bottom-10 right-10 flex gap-3">
              {cmsData.slider.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`h-1.5 rounded-full transition-all duration-500 ${
                    currentIndex === idx ? "w-10 bg-primary" : "w-4 bg-white/30"
                  }`}
                />
              ))}
            </div>
          )}
        </div>
        

      </section>

      <section id="contact-form" className="py-24 bg-slate-50">
        <div className="container-custom">
          <div className="grid lg:grid-cols-3 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-2 bg-white rounded-[2.5rem] p-8 md:p-12 border border-slate-100 shadow-xl shadow-slate-100"
            >
              <h2 className="text-3xl font-bold text-dark mb-8">Kirim Pesan</h2>
              <form onSubmit={handleFormSubmit} className="space-y-8">
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

                {/* Method Selection inside form */}
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
                    {info.details.map((detail, i) => (
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
          </div>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="container-custom">
          <div className="rounded-[3rem] overflow-hidden shadow-2xl border-8 border-white group relative">
            <div className="absolute inset-0 bg-dark/20 group-hover:bg-transparent transition-colors z-10 pointer-events-none" />
            <iframe
              src={(() => {
                const url = cmsData?.contacts?.map_location_url;
                if (!url) return "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3960.839833230495!2d107.6094!3d-6.9175!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e68e630d00f339b%3A0x401576d14fed120!2sBandung%2C%20West%20Java!5e0!3m2!1sen!2sid!4v1700000000000!5m2!1sen!2sid";
                if (url.includes("embed")) return url;
                let query = "Griya Permata Asri Bandung";
                if (url.includes("place/")) {
                  const parts = url.split("place/")[1].split("/");
                  query = decodeURIComponent(parts[0].replace(/\+/g, " "));
                }
                return `https://maps.google.com/maps?q=${encodeURIComponent(query)}&output=embed`;
              })()}
              width="100%"
              height="500"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="grayscale group-hover:grayscale-0 transition-all duration-700"
            ></iframe>
            <a 
              href={cmsData?.contacts?.map_location_url || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute bottom-6 right-6 bg-white/90 backdrop-blur-md px-6 py-3 rounded-2xl shadow-xl text-dark font-bold text-sm flex items-center gap-2 hover:bg-primary hover:text-white transition-all z-20"
            >
              <MapPin size={18} />
              Buka di Google Maps
            </a>
          </div>
        </div>
      </section>

      {/* Selection Modal */}
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
    </div>
  );
}
