import React from "react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { Calendar, MapPin, ArrowRight, Star } from "lucide-react";

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
      transition={{ duration: 0.4, delay: idx * 0.05 }}
      className="group bg-white rounded-[1.5rem] sm:rounded-[2.5rem] overflow-hidden border border-slate-100 hover:shadow-2xl hover:shadow-slate-200 transition-all duration-500"
    >
      <Link to={`/events/${event.id}`}>
        <div className="relative aspect-[4/3] overflow-hidden">
          <img 
            src={event.image} 
            alt={event.title} 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            referrerPolicy="no-referrer"
          />
          <div className="absolute top-2 left-2 sm:top-4 sm:left-4">
            <span className="bg-white/90 backdrop-blur-md text-dark px-2 sm:px-4 py-1 rounded-full text-[8px] sm:text-[10px] font-bold uppercase tracking-wider shadow-sm">
              {event.category}
            </span>
          </div>
          {event.popular && (
            <div className="absolute top-2 right-2 sm:top-4 sm:right-4">
              <div className="bg-yellow-400 text-dark p-1.5 sm:p-2 rounded-full shadow-lg">
                <Star size={10} className="sm:size-[14px]" fill="currentColor" />
              </div>
            </div>
          )}
        </div>

        <div className="p-4 sm:p-8">
          <h3 className="text-sm sm:text-xl font-bold text-dark mb-3 sm:mb-4 group-hover:text-primary transition-colors line-clamp-2">
            {event.title}
          </h3>
          
          <div className="space-y-2 sm:space-y-3 mb-4 sm:mb-6">
            <div className="flex items-center gap-2 sm:gap-3 text-slate-500 text-[10px] sm:text-sm">
              <Calendar size={14} className="text-primary sm:size-[16px]" />
              <span className="truncate">{event.date}</span>
            </div>
            <div className="flex items-center gap-2 sm:gap-3 text-slate-500 text-[10px] sm:text-sm">
              <MapPin size={14} className="text-primary sm:size-[16px]" />
              <span className="truncate">{event.location}</span>
            </div>
          </div>

          <div className="flex items-center justify-between pt-3 sm:pt-6 border-t border-slate-50">
            <span className={`text-[8px] sm:text-[10px] font-bold uppercase tracking-widest ${event.type === 'Upcoming' ? 'text-green-500' : 'text-slate-400'}`}>
              {event.type}
            </span>
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-slate-50 flex items-center justify-center text-dark group-hover:bg-primary group-hover:text-white transition-all">
              <ArrowRight size={14} className="sm:size-[18px]" />
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};
