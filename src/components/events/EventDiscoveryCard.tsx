import React from "react";
import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { Calendar, MapPin, Users, ArrowRight } from "lucide-react";

interface EventDiscoveryCardProps {
  event: any;
  idx: number;
}

export const EventDiscoveryCard: React.FC<EventDiscoveryCardProps> = ({ event, idx }) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ delay: idx * 0.05 }}
    >
      <Link
        to={`/events/${event.id}`}
        className="group bg-white rounded-[2.5rem] overflow-hidden border border-slate-100 shadow-sm hover:shadow-2xl hover:shadow-primary/5 hover:-translate-y-2 transition-all duration-500 flex flex-col h-full"
      >
        <div className="aspect-[16/10] overflow-hidden relative">
          <img
            src={event.image}
            alt={event.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            referrerPolicy="no-referrer"
          />
          <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-full text-[10px] font-bold text-primary uppercase tracking-wider shadow-sm">
            {event.category}
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-dark/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </div>

        <div className="p-6 sm:p-8 flex flex-col flex-1">
          <div className="flex items-center gap-2 text-slate-400 text-xs mb-3 sm:mb-4 font-bold uppercase tracking-widest">
            <Calendar size={14} className="text-primary" />
            {event.date}
          </div>
          
          <h3 className="text-base sm:text-xl font-bold text-dark mb-3 sm:mb-4 group-hover:text-primary transition-colors line-clamp-2 leading-tight">
            {event.title}
          </h3>
          
          <div className="space-y-2 sm:space-y-3 mt-auto">
            <div className="flex items-center gap-2 text-slate-500 text-xs sm:text-sm">
              <MapPin size={14} className="text-slate-400" />
              <span className="truncate">{event.location}</span>
            </div>
            <div className="flex items-center justify-between pt-3 sm:pt-4 border-t border-slate-50">
              <div className="flex items-center gap-2 text-slate-500 text-xs font-medium">
                <Users size={14} className="text-slate-400" />
                {event.attendees}
              </div>
              <div className="text-primary font-bold text-xs sm:text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
                Detail <ArrowRight size={14} />
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};
