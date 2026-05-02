import React, { useEffect, useState, useContext } from 'react';
import { AppContext } from '../context/AppContext';
import api from '../services/api';
import { Calendar, Flag, Award } from 'lucide-react';

export default function TimelineCard() {
  const { userProfile } = useContext(AppContext);
  const [timeline, setTimeline] = useState(null);

  useEffect(() => {
    if (userProfile.state) {
      api.get(`/timeline/${userProfile.state}`)
        .then(res => setTimeline(res.data))
        .catch(err => console.error(err));
    }
  }, [userProfile.state]);

  if (!timeline) return null;

  const EventRow = ({ icon, label, date, isLast }) => (
    <div className={`flex items-start gap-4 ${isLast ? '' : 'mb-6 relative'}`}>
       {!isLast && <div className="absolute left-[1.125rem] top-10 bottom-[-1.5rem] w-0.5 bg-slate-200 dark:bg-zinc-800"></div>}
       <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-zinc-800 flex items-center justify-center flex-shrink-0 z-10 border-2 border-white dark:border-darkSurface">
         {icon}
       </div>
       <div>
         <p className="text-xs font-bold text-slate-600 dark:text-slate-400 dark:text-slate-400 uppercase tracking-wider mb-1">{label}</p>
         <p className="text-base md:text-lg font-black text-slate-800 dark:text-white">{date}</p>
       </div>
    </div>
  );

  return (
    <div className="bg-white dark:bg-darkSurface p-6 md:p-8 rounded-3xl border border-slate-200 dark:border-zinc-800 shadow-xl flex flex-col justify-center">
      <h2 className="text-xl font-bold mb-8 text-slate-800 dark:text-white flex items-center gap-2">
         <Calendar className="text-primary" /> Key Election Dates
      </h2>
      <div className="flex flex-col">
        <EventRow icon={<Calendar className="text-primary w-5 h-5" />} label="Registration Deadline" date={timeline.registration_deadline} />
        <EventRow icon={<Flag className="text-secondary w-5 h-5" />} label="Polling Day" date={timeline.polling_day} />
        <EventRow icon={<Award className="text-accent w-5 h-5" />} label="Results Declared" date={timeline.result_day} isLast={true} />
      </div>
    </div>
  );
}
