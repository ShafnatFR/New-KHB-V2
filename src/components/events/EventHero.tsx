import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

interface EventHeroProps {
  event: any;
}

export const EventHero: React.FC<EventHeroProps> = ({ event }) => {
  return (
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
  );
};
