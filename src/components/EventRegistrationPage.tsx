import { motion, AnimatePresence } from "motion/react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { ArrowLeft, CheckCircle, Upload, Info, QrCode, Users, UserCheck, ArrowRight } from "lucide-react";
import React, { useState, useEffect } from "react";
import { cmsService } from "../services/api";
import { RegistrationSkeleton } from "./SkeletonLoader";

interface EventData {
  id: number;
  title: string;
  category: string;
  date: string;
}

export default function EventRegistrationPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [event, setEvent] = useState<EventData | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitted, setSubmitted] = useState(false);
  const [showAdminModal, setShowAdminModal] = useState(false);

  const admins = [
    { name: "Admin 1", phone: "6281234567890" },
    { name: "Admin 2", phone: "6289876543210" }
  ];

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    whatsapp: "",
    institution: "",
  });

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const posts = await cmsService.getPosts();
        const post = posts.find((p: any) => p.id === parseInt(id || "0", 10));
        
        if (post) {
          const content = post.content?.[0] || {};
          
          const eventData: EventData = {
            id: post.id,
            title: post.title,
            category: post.category,
            date: content.event_date || "TBA",
          };
          setEvent(eventData);
        } else {
          // If event doesn't exist, go back
          navigate("/events");
        }
      } catch (error) {
        console.error("Failed to fetch event:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [id, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!event) return;
    setShowAdminModal(true);
  };

  const handleConfirmAdmin = (adminPhone: string) => {
    if (!event) return;

    // Generate WhatsApp text
    const text = `Halo Admin KHB!\n\nSaya ingin mendaftar event berikut:\n\n*Judul Event:* ${event.title}\n*Tanggal:* ${event.date}\n\n*Data Pendaftar:*\n- Nama: ${formData.name}\n- Email: ${formData.email}\n- WA: ${formData.whatsapp}\n- Instansi: ${formData.institution || "-"}\n\nBerikut saya lampirkan bukti pembayaran/transfer. Terima kasih!`;
    
    const waUrl = `https://wa.me/${adminPhone}?text=${encodeURIComponent(text)}`;
    
    // Open WA in new tab
    window.open(waUrl, "_blank");
    
    setShowAdminModal(false);
    setSubmitted(true);
  };

  if (loading) {
    return <RegistrationSkeleton />;
  }

  if (!event) return null;

  if (submitted) {
    return (
      <div className="pt-32 pb-20 container-custom min-h-screen flex items-center justify-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white p-12 rounded-[3rem] shadow-[0_4px_24px_rgb(0,0,0,0.06)] text-center max-w-lg border border-slate-100"
        >
          <div className="w-20 h-20 bg-green-100 text-green-500 rounded-full flex items-center justify-center mx-auto mb-8">
            <CheckCircle size={40} />
          </div>
          <h2 className="text-3xl font-extrabold text-dark mb-4">Membuka WhatsApp...</h2>
          <p className="text-slate-500 mb-8 leading-relaxed">
            Sistem telah mengarahkan Anda ke WhatsApp Admin. 
            <br/><br/>
            <strong className="text-dark">PENTING:</strong> Pastikan Anda mengirimkan pesan yang sudah disiapkan otomatis dan <strong>jangan lupa lampirkan gambar bukti transfer</strong> pada chat tersebut.
          </p>
          <div className="flex flex-col gap-3">
            <Link to={`/events/${id}`} className="inline-block bg-primary text-white px-10 py-4 rounded-2xl font-bold shadow-lg shadow-primary/20 hover:bg-primary-dark transition-all">
              Selesai & Kembali
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-20 bg-slate-50 min-h-screen">
      <div className="container-custom max-w-5xl">
        <Link to={`/events/${id}`} className="inline-flex items-center gap-2 text-slate-500 hover:text-primary font-bold mb-8 transition-colors">
          <ArrowLeft size={20} />
          Kembali ke Detail Event
        </Link>
        
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          
          {/* Form Section */}
          <div className="w-full lg:flex-1 bg-white rounded-[2rem] p-8 md:p-12 shadow-[0_4px_24px_rgb(0,0,0,0.06)] border border-slate-100">
            <div className="mb-10 pb-8 border-b border-slate-100">
              <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-4 inline-block">
                Pendaftaran Event
              </span>
              <h1 className="text-3xl font-extrabold text-dark mb-2">{event.title}</h1>
              <p className="text-slate-500">{event.date}</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="space-y-6">
                <h3 className="text-xl font-bold text-dark">Data Diri</h3>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-dark ml-2">Nama Lengkap *</label>
                    <input 
                      required
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      type="text" 
                      placeholder="Masukkan nama lengkap"
                      className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-dark ml-2">Email *</label>
                    <input 
                      required
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      type="email" 
                      placeholder="contoh@email.com"
                      className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-dark ml-2">Nomor WhatsApp *</label>
                    <input 
                      required
                      name="whatsapp"
                      value={formData.whatsapp}
                      onChange={handleChange}
                      type="tel" 
                      placeholder="0812xxxxxx"
                      className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-dark ml-2">Instansi/Organisasi</label>
                    <input 
                      name="institution"
                      value={formData.institution}
                      onChange={handleChange}
                      type="text" 
                      placeholder="Opsional"
                      className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all"
                    />
                  </div>
                </div>
              </div>

              {/* Pseudo File Upload UI - specifically instructing them to send via WA */}
              <div className="bg-blue-50 border border-blue-100 p-6 rounded-2xl">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center shrink-0 mt-1">
                    <Info size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-blue-900 mb-1">Upload Bukti Pembayaran</h4>
                    <p className="text-sm text-blue-800/80 leading-relaxed">
                      Sistem pendaftaran saat ini menggunakan verifikasi manual via WhatsApp. Setelah menekan tombol kirim di bawah, aplikasi WhatsApp Anda akan otomatis terbuka. 
                      <strong> Pastikan Anda melampirkan gambar bukti transfer</strong> pada ruang obrolan WhatsApp tersebut.
                    </p>
                  </div>
                </div>
              </div>

              <button type="submit" className="w-full bg-primary text-white py-5 rounded-2xl font-bold text-lg shadow-xl shadow-primary/20 hover:bg-primary-dark transition-all flex items-center justify-center gap-3">
                Kirim Pendaftaran via WhatsApp
              </button>
            </form>
          </div>

          {/* Payment Info Section */}
          <div className="w-full lg:w-[380px] shrink-0">
            <div className="bg-white rounded-[2rem] p-8 shadow-[0_4px_24px_rgb(0,0,0,0.06)] border border-slate-100 sticky top-24">
              <div className="overflow-hidden rounded-2xl border border-slate-100">
                <img src="/aset/image.png" alt="QRIS KHB" className="w-full h-auto block" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Admin Selection Modal */}
      <AnimatePresence>
        {showAdminModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowAdminModal(false)}
              className="absolute inset-0 bg-dark/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative bg-white w-full max-w-md rounded-[2.5rem] p-8 shadow-2xl overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-4">
                <button onClick={() => setShowAdminModal(false)} className="text-slate-400 hover:text-dark transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                </button>
              </div>

              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Users size={32} />
                </div>
                <h3 className="text-2xl font-extrabold text-dark mb-2">Pilih Admin WhatsApp</h3>
                <p className="text-slate-500">Silakan pilih salah satu admin untuk mengirim bukti pendaftaran</p>
              </div>

              <div className="space-y-3">
                {admins.map((admin, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleConfirmAdmin(admin.phone)}
                    className="w-full flex items-center justify-between p-5 rounded-2xl bg-slate-50 border border-slate-100 hover:border-primary hover:bg-primary/5 hover:scale-[1.02] transition-all group"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm text-slate-400 group-hover:text-primary transition-colors">
                        <UserCheck size={20} />
                      </div>
                      <span className="font-bold text-dark group-hover:text-primary transition-colors">{admin.name}</span>
                    </div>
                    <ArrowRight size={18} className="text-slate-300 group-hover:text-primary transition-colors" />
                  </button>
                ))}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
