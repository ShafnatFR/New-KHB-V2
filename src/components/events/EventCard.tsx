import React from "react";
import { Link } from "react-router-dom";
import { Calendar, MapPin, Users, ArrowRight } from "lucide-react";

interface EventCardProps {
  item: any;
}

export const EventCard: React.FC<EventCardProps> = ({ item }) => {
  return (
    <Link
      to={`/events/${item.id}`}
      className="group bg-white rounded-[2.5rem] overflow-hidden border border-slate-100 shadow-sm hover:shadow-2xl hover:shadow-primary/5 hover:-translate-y-2 transition-all duration-500 flex flex-col h-full"
    >
      <div className="aspect-[16/10] overflow-hidden relative">
        <img
          src={item.image}
          alt={item.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          referrerPolicy="no-referrer"
        />
        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-full text-[10px] font-bold text-primary uppercase tracking-wider shadow-sm">
          {item.category}
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-dark/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>

      <div className="p-8 flex flex-col flex-1">
        <div className="flex items-center gap-2 text-slate-400 text-xs mb-4 font-bold uppercase tracking-widest">
          <Calendar size={14} className="text-primary" />
          {item.date}
        </div>
        
        <h3 className="text-xl font-bold text-dark mb-4 group-hover:text-primary transition-colors line-clamp-2 leading-tight">
          {item.title}
        </h3>
        
        <div className="space-y-3 mt-auto">
          <div className="flex items-center gap-2 text-slate-500 text-sm">
            <MapPin size={14} className="text-slate-400" />
            <span className="truncate">{item.location}</span>
          </div>
          <div className="flex items-center justify-between pt-4 border-t border-slate-50">
            <div className="flex items-center gap-2 text-slate-500 text-xs font-medium">
              <Users size={14} className="text-slate-400" />
              {item.attendees}
            </div>
            <div className="text-primary font-bold text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
              Detail <ArrowRight size={14} />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};
