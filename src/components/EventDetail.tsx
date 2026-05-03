import { motion } from "motion/react";
import { useParams, Link } from "react-router-dom";
import { Calendar, MapPin, Users, Clock, ArrowLeft, Share2, CalendarPlus, UserCheck } from "lucide-react";
import React, { useState, useEffect } from "react";
import { cmsService } from "../services/api";
import { EventDetailSkeleton } from "./SkeletonLoader";

interface EventData {
  id: number;
  title: string;
  category: string;
  date: string;
  time: string;
  location: string;
  attendees: string;
  image: string;
  description: string; // HTML string
  rundown?: { time: string; activity: string }[];
  speakers?: { name: string; position: string; bio: string; photo_url: string }[];
  gallery?: { url: string; caption: string; alt_text: string }[];
  mapUrl?: string;
}

const SpeakerCard: React.FC<{ speaker: any }> = ({ speaker }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const isLongBio = speaker.bio && speaker.bio.length > 90;

  return (
    <div className="flex gap-4 md:gap-5 p-5 rounded-3xl border border-slate-100 bg-slate-50 items-start">
      <img 
        src={speaker.photo_url} 
        alt={speaker.name} 
        className="w-16 h-16 md:w-20 md:h-20 rounded-2xl object-cover shrink-0 bg-white"
        referrerPolicy="no-referrer"
      />
      <div className="flex-1 min-w-0">
        <h4 className="font-bold text-dark mb-1">{speaker.name}</h4>
        <p className="text-primary text-xs font-bold mb-2 uppercase tracking-wider truncate">{speaker.position}</p>
        <p className={`text-slate-500 text-xs leading-relaxed transition-all duration-300 ${isExpanded ? '' : 'line-clamp-3'}`}>
          {speaker.bio}
        </p>
        {isLongBio && (
          <button 
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-primary font-bold text-[10px] mt-2 uppercase tracking-wider hover:underline focus:outline-none flex items-center gap-1"
          >
            {isExpanded ? "Tampilkan Lebih Sedikit" : "Tampilkan Lebih Banyak"}
          </button>
        )}
      </div>
    </div>
  );
};

export default function EventDetail() {
  const { id } = useParams();
  const [event, setEvent] = useState<EventData | null>(null);
  const [loading, setLoading] = useState(true);
  const [relatedEvents, setRelatedEvents] = useState<EventData[]>([]);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const posts = await cmsService.getPosts();

        // Find current event
        const post = posts.find((p: any) => p.id === parseInt(id || "0", 10));

        if (post) {
          const content = post.content?.[0] || {};

          const eventData: EventData = {
            id: post.id,
            title: post.title,
            category: post.category,
            date: content.event_date || "TBA",
            time: `${content.start_time || "TBA"} - ${content.end_time || "TBA"} WIB`,
            location: content.location_name || "TBA",
            attendees: content.quota ? `${content.quota} Peserta` : "TBA",
            image: content.featured_image || "https://picsum.photos/seed/placeholder/1200/600",
            description: content.event_description || "",
            rundown: content.rundown || [],
            speakers: content.speakers || [],
            gallery: content.event_gallery || [],
            mapUrl: content.Maps_url || "",
          };

          setEvent(eventData);

          // Find related events
          const related = posts
            .filter((p: any) => p.category === "Event" && p.id !== post.id)
            .slice(0, 3)
            .map((p: any) => {
              const pContent = p.content?.[0] || {};
              return {
                id: p.id,
                title: p.title,
                category: p.category,
                date: pContent.event_date || "TBA",
                time: `${pContent.start_time || "TBA"} - ${pContent.end_time || "TBA"} WIB`,
                location: pContent.location_name || "TBA",
                attendees: pContent.quota ? `${pContent.quota} Peserta` : "TBA",
                image: pContent.featured_image || "https://picsum.photos/seed/placeholder/1200/600",
                description: pContent.event_description || "",
              };
            });

          setRelatedEvents(related);
        }
      } catch (error) {
        console.error("Failed to fetch event details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [id]);

  if (loading) {
    return <EventDetailSkeleton />;
  }

  if (!event) {
    return (
      <div className="pt-32 pb-20 text-center flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-3xl font-bold text-dark mb-4">Event tidak ditemukan</h1>
        <p className="text-slate-500 mb-6">Event yang Anda cari mungkin telah dihapus atau tidak tersedia.</p>
        <Link to="/events" className="bg-primary text-white px-6 py-3 rounded-2xl font-bold hover:bg-primary-dark transition-colors">
          Kembali ke daftar event
        </Link>
      </div>
    );
  }

  const addToGoogleCalendar = () => {
    const start = event.date.replace(/-/g, '') + 'T090000Z'; // Approximation since we don't have exact ISO time easily
    const end = event.date.replace(/-/g, '') + 'T170000Z';
    // Strip HTML tags for the calendar description
    const plainDescription = event.description.replace(/<[^>]*>?/gm, '');
    const url = `https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(event.title)}&dates=${start}/${end}&details=${encodeURIComponent(plainDescription)}&location=${encodeURIComponent(event.location)}`;
    window.open(url, '_blank');
  };

  const handleShare = () => {
    const shareText = `Halo! Yuk ikutan event menarik ini: ${event.title} pada ${event.date} di ${event.location}. Info lengkap cek di sini:`;
    const shareUrl = window.location.href;

    if (navigator.share) {
      navigator.share({
        title: event.title,
        text: shareText,
        url: shareUrl
      }).catch(err => console.log('Error sharing:', err));
    } else {
      const waText = encodeURIComponent(`${shareText} ${shareUrl}`);
      window.open(`https://wa.me/?text=${waText}`, '_blank');
    }
  };

  const isCompleted = new Date(event.date) < new Date();

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative h-[400px] md:h-[500px] overflow-hidden">
        <img
          src={event.image}
          alt={event.title}
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/40 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-16">
          <div className="container-custom">
            <Link to="/events" className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6 transition-colors">
              <ArrowLeft size={20} />
              Kembali ke Events
            </Link>
            <div className="flex flex-wrap gap-3 mb-4">
              <span className="bg-primary text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                {event.category}
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-4 leading-tight">
              {event.title}
            </h1>
          </div>
        </div>
      </section>

      <section className="py-16 bg-slate-50">
        <div className="container-custom">
          <div className="flex flex-col lg:flex-row gap-8 items-start">

            {/* LEFT COLUMN */}
            <div className="w-full lg:flex-1 space-y-8">
              
              {/* Tentang Event */}
              <div className="bg-white rounded-[2rem] p-8 md:p-12 shadow-[0_4px_24px_rgb(0,0,0,0.06)] overflow-hidden">
                <p className="text-primary font-bold tracking-widest uppercase text-xs mb-4">Deskripsi Kegiatan</p>
                <h2 className="text-2xl font-extrabold text-dark mb-8">Tentang Event</h2>
                <div
                  className="text-slate-600 leading-relaxed text-base text-justify [&>p]:mb-6 last:[&>p]:mb-0"
                  style={{ wordBreak: 'break-word', overflowWrap: 'break-word' }}
                  dangerouslySetInnerHTML={{
                    __html: event.description
                      .replace(/&nbsp;/g, ' ')
                      .replace(/<\/p>/g, '<br/>')
                  }}
                />
              </div>

              {/* Rundown Acara */}
              {(event.rundown && event.rundown.length > 0) && (
                <div className="bg-white rounded-[2rem] p-8 md:p-12 shadow-[0_4px_24px_rgb(0,0,0,0.06)] overflow-hidden">
                  <p className="text-primary font-bold tracking-widest uppercase text-xs mb-4">Agenda</p>
                  <h2 className="text-2xl font-extrabold text-dark mb-8">Rundown Acara</h2>
                  <div className="space-y-4">
                    {event.rundown.map((item, idx) => (
                      <div key={idx} className="flex gap-6 p-5 rounded-2xl bg-slate-50 border border-slate-100 items-center">
                        <div className="text-primary font-bold text-lg shrink-0 w-16">
                          {item.time}
                        </div>
                        <div className="h-8 w-px bg-slate-200" />
                        <div className="font-semibold text-slate-800">
                          {item.activity}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Narasumber */}
              {(event.speakers && event.speakers.length > 0) && (
                <div className="bg-white rounded-[2rem] p-8 md:p-12 shadow-[0_4px_24px_rgb(0,0,0,0.06)] overflow-hidden">
                  <p className="text-primary font-bold tracking-widest uppercase text-xs mb-4">Pembicara</p>
                  <h2 className="text-2xl font-extrabold text-dark mb-8">Narasumber</h2>
                  <div className="grid md:grid-cols-2 gap-6">
                    {event.speakers.map((speaker, idx) => (
                      <SpeakerCard key={idx} speaker={speaker} />
                    ))}
                  </div>
                </div>
              )}

              {/* Galeri Kegiatan */}
              {(event.gallery && event.gallery.length > 0) && (
                <div className="bg-white rounded-[2rem] p-8 md:p-12 shadow-[0_4px_24px_rgb(0,0,0,0.06)] overflow-hidden">
                  <p className="text-primary font-bold tracking-widest uppercase text-xs mb-4">Dokumentasi</p>
                  <h2 className="text-2xl font-extrabold text-dark mb-8">Galeri Kegiatan</h2>
                <div className="columns-2 gap-4 space-y-4">
                  {event.gallery.map((img, idx) => (
                    <div key={idx} className="break-inside-avoid rounded-2xl overflow-hidden bg-slate-100 mb-4 inline-block w-full group">
                      <img 
                        src={img.url} 
                        alt={img.alt_text || img.caption || 'Event Gallery'} 
                        className="w-full h-auto object-cover group-hover:scale-[1.03] transition-transform duration-500 origin-center"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                  ))}
                </div>
                </div>
              )}
            </div>

            {/* RIGHT CARD — Detail Informasi */}
            <div className="w-full lg:w-[360px] shrink-0">
              <div className="bg-white rounded-[2rem] p-8 shadow-[0_4px_24px_rgb(0,0,0,0.06)] sticky top-24 relative overflow-hidden">

                {/* Selesai Overlay */}
                {isCompleted && (
                  <div className="absolute inset-0 bg-white/80 backdrop-blur-sm z-20 flex flex-col items-center justify-center rounded-[2rem]">
                    <div className="bg-dark text-white px-8 py-5 rounded-2xl font-bold text-lg shadow-2xl flex items-center gap-3">
                      <UserCheck size={22} className="text-primary" />
                      Event Telah Selesai
                    </div>
                    <p className="text-slate-500 text-sm mt-4">Pendaftaran sudah ditutup.</p>
                  </div>
                )}

                <p className="text-primary font-bold tracking-widest uppercase text-xs mb-2">Informasi</p>
                <h3 className="text-xl font-extrabold text-dark mb-8">Detail Acara</h3>

                <div className="space-y-5 mb-8">
                  <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl">
                    <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-primary shadow-sm shrink-0">
                      <Calendar size={18} />
                    </div>
                    <div className="min-w-0">
                      <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider mb-0.5">Tanggal</p>
                      <p className="font-bold text-dark text-sm truncate">{event.date}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl">
                    <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-primary shadow-sm shrink-0">
                      <Clock size={18} />
                    </div>
                    <div className="min-w-0">
                      <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider mb-0.5">Waktu</p>
                      <p className="font-bold text-dark text-sm truncate">{event.time}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl">
                    <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-primary shadow-sm shrink-0">
                      <MapPin size={18} />
                    </div>
                    <div className="min-w-0">
                      <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider mb-0.5">Lokasi</p>
                      {event.mapUrl ? (
                        <a href={event.mapUrl} target="_blank" rel="noopener noreferrer" className="font-bold text-primary text-sm hover:underline truncate block">
                          {event.location}
                        </a>
                      ) : (
                        <p className="font-bold text-dark text-sm truncate">{event.location}</p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl">
                    <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-primary shadow-sm shrink-0">
                      <Users size={18} />
                    </div>
                    <div className="min-w-0">
                      <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider mb-0.5">Kapasitas</p>
                      <p className="font-bold text-dark text-sm">{event.attendees}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  {isCompleted ? (
                    <button disabled className="w-full bg-slate-200 text-slate-400 py-4 rounded-2xl font-bold flex items-center justify-center gap-3 text-sm cursor-not-allowed">
                      <UserCheck size={18} />
                      Pendaftaran Ditutup
                    </button>
                  ) : (
                    <Link to={`/events/${id}/register`} className="w-full bg-primary text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-3 shadow-lg shadow-primary/20 hover:bg-primary-dark transition-all text-sm">
                      <UserCheck size={18} />
                      Daftar Sekarang
                    </Link>
                  )}
                  <button
                    onClick={addToGoogleCalendar}
                    className="w-full bg-slate-50 border border-slate-200 text-dark py-4 rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-slate-100 transition-all text-sm"
                  >
                    <CalendarPlus size={18} className="text-primary" />
                    Tambah ke Kalender
                  </button>
                  <button
                    onClick={handleShare}
                    className="w-full text-slate-400 font-semibold text-sm flex items-center justify-center gap-2 hover:text-primary transition-colors py-2"
                  >
                    <Share2 size={15} />
                    Bagikan Event
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>


      {/* Related Events */}
      {relatedEvents.length > 0 && (
        <section className="pb-24 bg-white">
          <div className="container-custom border-t border-slate-100 pt-24">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-6">
              <div>
                <h2 className="text-3xl font-extrabold text-dark mb-2">Event Terkait</h2>
                <p className="text-slate-500">Jangan lewatkan agenda menarik lainnya dari kami.</p>
              </div>
              <Link to="/events" className="text-primary font-bold hover:underline flex items-center gap-2 group">
                Lihat Semua Event
                <ArrowLeft size={16} className="rotate-180 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedEvents.map((item) => (
                <Link
                  key={item.id}
                  to={`/events/${item.id}`}
                  className="group bg-white rounded-[2.5rem] overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl transition-all"
                >
                  <div className="aspect-video overflow-hidden relative">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-full text-[10px] font-bold text-primary uppercase tracking-wider">
                      {item.category}
                    </div>
                  </div>
                  <div className="p-8">
                    <div className="flex items-center gap-2 text-slate-400 text-xs mb-3 font-bold uppercase tracking-widest">
                      <Calendar size={14} className="text-primary" />
                      {item.date}
                    </div>
                    <h3 className="text-xl font-bold text-dark group-hover:text-primary transition-colors line-clamp-2">
                      {item.title}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
