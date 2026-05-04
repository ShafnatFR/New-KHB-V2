import React from "react";

interface EventRundownProps {
  rundown: { time: string; activity: string }[];
}

export const EventRundown: React.FC<EventRundownProps> = ({ rundown }) => {
  if (!rundown || rundown.length === 0) return null;
  
  return (
    <div className="bg-white rounded-[2rem] p-8 md:p-12 shadow-[0_4px_24px_rgb(0,0,0,0.06)] overflow-hidden">
      <p className="text-primary font-bold tracking-widest uppercase text-xs mb-4">Agenda</p>
      <h2 className="text-2xl font-extrabold text-dark mb-8">Rundown Acara</h2>
      <div className="space-y-4">
        {rundown.map((item, idx) => (
          <div key={idx} className="flex gap-6 p-5 rounded-2xl bg-slate-50 border border-slate-100 items-center">
            <div className="text-primary font-bold text-lg shrink-0 w-16">
              {item.time}
            </div>
            <div className="h-8 w-px bg-slate-200" />
            <div className="font-semibold text-slate-800">
              {item.activity}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
