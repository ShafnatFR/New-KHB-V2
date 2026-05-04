import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { cmsService } from "../services/api";
import { EventDetailSkeleton } from "./shared/EventSkeletons";
import { EventHero } from "./events/EventHero";
import { SpeakerCard } from "./events/SpeakerCard";
import { EventRundown } from "./events/EventRundown";
import { EventGallery } from "./events/EventGallery";
import { EventInfoSidebar } from "./events/EventInfoSidebar";
import { RelatedEvents } from "./events/RelatedEvents";

interface EventData {
  id: number;
  title: string;
  category: string;
  date: string;
  time: string;
  location: string;
  attendees: string;
  image: string;
  description: string;
  rundown?: { time: string; activity: string }[];
  speakers?: { name: string; position: string; bio: string; photo_url: string }[];
  gallery?: { url: string; caption: string; alt_text: string }[];
  mapUrl?: string;
}

export default function EventDetail() {
  const { id } = useParams();
  const [event, setEvent] = useState<EventData | null>(null);
  const [loading, setLoading] = useState(true);
  const [relatedEvents, setRelatedEvents] = useState<EventData[]>([]);

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

  if (loading) return <EventDetailSkeleton />;

  if (!event) return <div className="text-center py-20">Event tidak ditemukan</div>;

  const addToGoogleCalendar = () => {
    const start = event.date.replace(/-/g, '') + 'T090000Z';
    const end = event.date.replace(/-/g, '') + 'T170000Z';
    const plainDescription = event.description.replace(/<[^>]*>?/gm, '');
    const url = `https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(event.title)}&dates=${start}/${end}&details=${encodeURIComponent(plainDescription)}&location=${encodeURIComponent(event.location)}`;
    window.open(url, '_blank');
  };

  const handleShare = () => {
    const shareText = `Halo! Yuk ikutan event menarik ini: ${event.title}. Info lengkap cek di sini:`;
    const shareUrl = window.location.href;
    if (navigator.share) {
      navigator.share({ title: event.title, text: shareText, url: shareUrl });
    } else {
      window.open(`https://wa.me/?text=${encodeURIComponent(shareText + ' ' + shareUrl)}`, '_blank');
    }
  };

  const isCompleted = new Date(event.date) < new Date();

  return (
    <div className="pt-20">
      <EventHero event={event} />

      <section className="py-16 bg-slate-50">
        <div className="container-custom">
          <div className="flex flex-col lg:flex-row gap-8 items-start">
            <div className="w-full lg:flex-1 space-y-8">
              <div className="bg-white rounded-[2rem] p-8 md:p-12 shadow-[0_4px_24px_rgb(0,0,0,0.06)]">
                <p className="text-primary font-bold tracking-widest uppercase text-xs mb-4">Deskripsi Kegiatan</p>
                <h2 className="text-2xl font-extrabold text-dark mb-8">Tentang Event</h2>
                <div
                  className="text-slate-600 leading-relaxed text-base text-justify"
                  dangerouslySetInnerHTML={{ __html: event.description.replace(/&nbsp;/g, ' ').replace(/<\/p>/g, '<br/>') }}
                />
              </div>

              <EventRundown rundown={event.rundown || []} />

              {(event.speakers && event.speakers.length > 0) && (
                <div className="bg-white rounded-[2rem] p-8 md:p-12 shadow-[0_4px_24px_rgb(0,0,0,0.06)]">
                  <p className="text-primary font-bold tracking-widest uppercase text-xs mb-4">Pembicara</p>
                  <h2 className="text-2xl font-extrabold text-dark mb-8">Narasumber</h2>
                  <div className="grid md:grid-cols-2 gap-6">
                    {event.speakers.map((s, idx) => <SpeakerCard key={idx} speaker={s} />)}
                  </div>
                </div>
              )}

              <EventGallery gallery={event.gallery || []} />
            </div>

            <EventInfoSidebar 
              id={id} 
              event={event} 
              isCompleted={isCompleted} 
              addToGoogleCalendar={addToGoogleCalendar} 
              handleShare={handleShare} 
            />
          </div>
        </div>
      </section>

      <RelatedEvents relatedEvents={relatedEvents} />
    </div>
  );
}
