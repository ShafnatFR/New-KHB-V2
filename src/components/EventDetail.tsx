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
  labels?: string[];
  date: string;
  time: string;
  startTime?: string;
  endTime?: string;
  location: string;
  attendees: string;
  image: string;
  description: string;
  rundown?: { time: string; activity: string }[];
  speakers?: { name: string; position: string; bio: string; photo_url: string }[];
  gallery?: { url: string; caption: string; alt_text: string }[];
  mapUrl?: string;
  registrationLink?: string;
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
          const eventLabels = content.event_labels || [];
          const eventData: EventData = {
            id: post.id,
            title: post.title,
            category: eventLabels.length > 0 ? eventLabels[0] : post.category,
            labels: eventLabels,
            date: content.event_date || "TBA",
            time: `${content.start_time || "TBA"} - ${content.end_time || "TBA"} WIB`,
            startTime: content.start_time || "09:00",
            endTime: content.end_time || "17:00",
            location: content.location_name || "TBA",
            attendees: content.quota ? `${content.quota} Peserta` : "TBA",
            image: content.featured_image || "https://picsum.photos/seed/placeholder/1200/600",
            description: content.event_description || "",
            rundown: content.rundown || [],
            speakers: content.speakers || [],
            gallery: content.event_gallery || [],
            mapUrl: content.Maps_url || "",
            registrationLink: content.registration_link || "",
          };

          setEvent(eventData);

          const related = posts
            .filter((p: any) => p.category === "Event" && p.id !== post.id)
            .slice(0, 3)
            .map((p: any) => {
              const pContent = p.content?.[0] || {};
              const pLabels = pContent.event_labels || [];
              return {
                id: p.id,
                title: p.title,
                category: pLabels.length > 0 ? pLabels[0] : p.category,
                labels: pLabels,
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
    const [year, month, day] = event.date.split('-').map(Number);
    const [startHour, startMin] = (event.startTime || "09:00").split(':').map(Number);
    const [endHour, endMin] = (event.endTime || "17:00").split(':').map(Number);

    // Create Dates in UTC, then subtract 7 hours to convert from WIB (UTC+7) to UTC
    const startDate = new Date(Date.UTC(year, month - 1, day, startHour, startMin) - 7 * 60 * 60 * 1000);
    const endDate = new Date(Date.UTC(year, month - 1, day, endHour, endMin) - 7 * 60 * 60 * 1000);

    const toUTCString = (date: Date) => {
      const pad = (n: number) => n.toString().padStart(2, '0');
      return date.getUTCFullYear() +
             pad(date.getUTCMonth() + 1) +
             pad(date.getUTCDate()) +
             'T' +
             pad(date.getUTCHours()) +
             pad(date.getUTCMinutes()) +
             pad(date.getUTCSeconds()) +
             'Z';
    };

    const start = toUTCString(startDate);
    const end = toUTCString(endDate);

    const plainDescription = event.description
      .replace(/<\/p>/g, '\n\n')
      .replace(/<\/li>/g, '\n')
      .replace(/<br\s*\/?>/g, '\n')
      .replace(/<li>/g, '• ')
      .replace(/<strong>/g, '')
      .replace(/<\/strong>/g, '')
      .replace(/&amp;/g, '&')
      .replace(/&nbsp;/g, ' ')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'")
      .replace(/&rsquo;/g, "'")
      .replace(/&lsquo;/g, "'")
      .replace(/&ldquo;/g, '"')
      .replace(/&rdquo;/g, '"')
      .replace(/<[^>]*>?/gm, '')
      .replace(/\n{3,}/g, '\n\n')
      .trim();

    const url = `https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(event.title.replace(/&amp;/g, '&'))}&dates=${start}/${end}&details=${encodeURIComponent(plainDescription)}&location=${encodeURIComponent(event.location)}`;
    window.open(url, '_blank');
  };

  const downloadICS = () => {
    const [year, month, day] = event.date.split('-').map(Number);
    const [startHour, startMin] = (event.startTime || "09:00").split(':').map(Number);
    const [endHour, endMin] = (event.endTime || "17:00").split(':').map(Number);

    // Create Dates in UTC, then subtract 7 hours to convert from WIB (UTC+7) to UTC
    const startDate = new Date(Date.UTC(year, month - 1, day, startHour, startMin) - 7 * 60 * 60 * 1000);
    const endDate = new Date(Date.UTC(year, month - 1, day, endHour, endMin) - 7 * 60 * 60 * 1000);

    const toISOString = (date: Date) => {
      const pad = (n: number) => n.toString().padStart(2, '0');
      return date.getUTCFullYear() +
             pad(date.getUTCMonth() + 1) +
             pad(date.getUTCDate()) +
             'T' +
             pad(date.getUTCHours()) +
             pad(date.getUTCMinutes()) +
             pad(date.getUTCSeconds()) +
             'Z';
    };

    const start = toISOString(startDate);
    const end = toISOString(endDate);

    const plainDescription = event.description
      .replace(/<\/p>/g, '\\n\\n')
      .replace(/<\/li>/g, '\\n')
      .replace(/<br\s*\/?>/g, '\\n')
      .replace(/<li>/g, '• ')
      .replace(/<strong>/g, '')
      .replace(/<\/strong>/g, '')
      .replace(/&amp;/g, '&')
      .replace(/&nbsp;/g, ' ')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'")
      .replace(/&rsquo;/g, "'")
      .replace(/&lsquo;/g, "'")
      .replace(/&ldquo;/g, '"')
      .replace(/&rdquo;/g, '"')
      .replace(/<[^>]*>?/gm, '')
      .replace(/\n/g, '\\n')
      .trim();

    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Komunitas Halal Bandung//Event Calendar//EN',
      'CALSCALE:GREGORIAN',
      'METHOD:PUBLISH',
      'BEGIN:VEVENT',
      `UID:event-${event.id}-${Date.now()}@komunitashalalbandung.org`,
      `DTSTAMP:${toISOString(new Date())}`,
      `DTSTART:${start}`,
      `DTEND:${end}`,
      `SUMMARY:${event.title.replace(/&amp;/g, '&')}`,
      `DESCRIPTION:${plainDescription}`,
      `LOCATION:${event.location}`,
      'COLOR:blueberry',
      'BEGIN:VALARM',
      'TRIGGER:-P3D',
      'ACTION:DISPLAY',
      'DESCRIPTION:Reminder',
      'END:VALARM',
      'BEGIN:VALARM',
      'TRIGGER:-P3D',
      'ACTION:EMAIL',
      'DESCRIPTION:Reminder',
      'SUMMARY:Event Reminder',
      'END:VALARM',
      'END:VEVENT',
      'END:VCALENDAR'
    ].join('\r\n');

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.setAttribute('download', `${event.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
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
                  className="text-slate-600 leading-relaxed text-base text-justify [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:my-4 [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:my-4 [&_li]:mb-2 [&_p]:mb-4"
                  dangerouslySetInnerHTML={{ __html: event.description.replace(/&nbsp;/g, ' ') }}
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
              downloadICS={downloadICS}
              handleShare={handleShare} 
            />
          </div>
        </div>
      </section>

      <RelatedEvents relatedEvents={relatedEvents} />
    </div>
  );
}
