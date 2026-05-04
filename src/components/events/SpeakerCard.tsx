import React, { useState } from "react";

export const SpeakerCard: React.FC<{ speaker: any }> = ({ speaker }) => {
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
