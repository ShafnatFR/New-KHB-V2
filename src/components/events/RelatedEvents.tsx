import React from "react";
import { Link } from "react-router-dom";
import { Calendar, ArrowLeft } from "lucide-react";

interface RelatedEventsProps {
  relatedEvents: any[];
}

export const RelatedEvents: React.FC<RelatedEventsProps> = ({ relatedEvents }) => {
  if (!relatedEvents || relatedEvents.length === 0) return null;

  return (
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
  );
};
