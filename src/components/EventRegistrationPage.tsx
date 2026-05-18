import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, QrCode, Users, ArrowRight } from "lucide-react";
import { cmsService } from "../services/api";
import { RegistrationSkeleton } from "./shared/EventSkeletons";
import { RegistrationForm, RegistrationSuccess } from "./events/RegistrationComponents";

interface EventData {
  id: number;
  title: string;
  category: string;
  date: string;
  location: string;
  image: string;
  quota: string;
}

export default function EventRegistrationPage() {
  const { id } = useParams();
  const [event, setEvent] = useState<EventData | null>(null);
  const [loading, setLoading] = useState(true);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    phone: "",
    business: "",
    proof: null as any
  });

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const posts = await cmsService.getPosts();
        const post = posts.find((p: any) => p.id === parseInt(id || "0", 10));
        if (post) {
          const content = post.content?.[0] || {};
          setEvent({
            id: post.id,
            title: post.title,
            category: post.category,
            date: content.event_date || "TBA",
            location: content.location_name || "TBA",
            image: content.featured_image || "https://picsum.photos/seed/placeholder/800/600",
            quota: content.quota || "TBA"
          });
        }
      } catch (error) {
        console.error("Failed to fetch event for registration:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchEvent();
  }, [id]);

  if (loading) return <RegistrationSkeleton />;
  if (!event) return <div className="pt-32 text-center">Event tidak ditemukan.</div>;

  if (isSuccess) return <RegistrationSuccess event={event} />;

  return (
    <div className="pt-24 pb-24 bg-slate-50/30">
      <div className="container-custom">
        <div className="flex flex-col lg:flex-row gap-12 items-start">
          <div className="w-full lg:w-1/3">
            <Link to={`/events/${id}`} className="inline-flex items-center gap-2 text-slate-400 hover:text-primary mb-8 font-bold transition-colors">
              <ArrowLeft size={20} />
              Batal & Kembali
            </Link>
            <div className="bg-white rounded-[2.5rem] overflow-hidden border border-slate-100 shadow-xl shadow-slate-200/50">
              <img src={event.image} alt={event.title} className="w-full aspect-video object-cover" referrerPolicy="no-referrer" />
              <div className="p-8">
                <span className="bg-primary/10 text-primary px-4 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest mb-4 inline-block">
                  {event.category}
                </span>
                <h1 className="text-2xl font-bold text-dark mb-6 leading-tight">{event.title}</h1>
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-slate-500 text-sm font-medium">
                    <QrCode size={18} className="text-primary" />
                    {event.date}
                  </div>
                  <div className="flex items-center gap-3 text-slate-500 text-sm font-medium">
                    <Users size={18} className="text-primary" />
                    Kapasitas: {event.quota}
                  </div>
                </div>
                {event.id !== 24 && (
                  <div className="mt-8 pt-8 border-t border-slate-50">
                    <div className="bg-slate-50 p-6 rounded-[2rem] flex items-center justify-between">
                      <span className="font-bold text-dark">Harga Tiket:</span>
                      <span className="text-primary font-black text-xl">GRATIS</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="flex-1 w-full">
            <RegistrationForm 
              event={event} 
              formState={formState} 
              setFormState={setFormState} 
              handleSubmit={(e) => { e.preventDefault(); setIsSuccess(true); }} 
            />
          </div>
        </div>
      </div>
    </div>
  );
}
