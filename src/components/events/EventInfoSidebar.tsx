import React from "react";
import { Link } from "react-router-dom";
import { Calendar, Clock, MapPin, Users, UserCheck, CalendarPlus, Share2 } from "lucide-react";

interface EventInfoSidebarProps {
  id: string | undefined;
  event: any;
  isCompleted: boolean;
  addToGoogleCalendar: () => void;
  handleShare: () => void;
}

export const EventInfoSidebar: React.FC<EventInfoSidebarProps> = ({ 
  id, 
  event, 
  isCompleted, 
  addToGoogleCalendar, 
  handleShare 
}) => {
  return (
    <div className="w-full lg:w-[360px] shrink-0">
      <div className="bg-white rounded-[2rem] p-8 shadow-[0_4px_24px_rgb(0,0,0,0.06)] sticky top-24 relative overflow-hidden">
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
  );
};
