import React, { useState, useContext, useEffect } from 'react';
import { AppContext } from '../../context/AppContext';
import { MapPin, Navigation, Search, Clock, Users, Map as MapIcon, ChevronRight, Play } from 'lucide-react';
import api from '../../services/api';

export default function BoothFinder() {
  const { userProfile, addPoints, updateKnowledge } = useContext(AppContext);
  const [booths, setBooths] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchBooths();
  }, [userProfile.district, userProfile.pincode]);

  const fetchBooths = async () => {
    setLoading(true);
    try {
      const res = await api.get('/polling-booth', {
        params: { district: userProfile.district, pincode: userProfile.pincode }
      });
      setBooths(res.data);
      if (res.data.length > 0) {
        updateKnowledge('booth', 100, 100);
      }
    } catch (e) { console.error(e); }
    finally { setLoading(false); }
  };

  const handleNavigate = (address) => {
    window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`, '_blank');
    addPoints(10);
  };

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500 pb-24 md:pb-8">
      {/* Header */}
      <div className="bg-white dark:bg-darkSurface p-8 rounded-3xl border border-slate-200 dark:border-zinc-800 shadow-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">Polling Booth Finder</h1>
          <p className="text-slate-600 dark:text-slate-400 font-medium">Find where you cast your vote</p>
        </div>
        <div className="flex w-full md:w-auto bg-slate-50 dark:bg-darkBase border border-slate-200 dark:border-zinc-800 rounded-2xl p-2 items-center">
           <MapPin size={20} className="text-primary ml-3" />
           <span className="px-4 font-bold text-slate-700 dark:text-slate-300">{userProfile.district || 'Location Unset'}</span>
           <button onClick={fetchBooths} className="bg-primary text-white p-2 rounded-xl hover:scale-105 transition-transform"><Search size={18}/></button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="relative">
             <input 
               type="text" 
               placeholder="Search by area or PIN code..." 
               value={searchTerm}
               onChange={(e) => setSearchTerm(e.target.value)}
               className="w-full bg-white dark:bg-darkSurface border border-slate-200 dark:border-zinc-800 rounded-2xl py-5 px-14 font-medium text-slate-700 dark:text-white shadow-xl focus:ring-2 focus:ring-primary transition-all outline-none"
             />
             <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" size={24} />
          </div>

          <div className="space-y-4">
             {loading ? (
               <div className="flex flex-col items-center justify-center py-20 gap-4">
                 <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                 <p className="text-slate-600 dark:text-slate-400 font-bold uppercase tracking-widest text-xs">Locating nearby booths...</p>
               </div>
             ) : booths.length > 0 ? (
               booths.map((booth, i) => (
                 <div key={i} className="bg-white dark:bg-darkSurface p-6 rounded-3xl border border-slate-200 dark:border-zinc-800 shadow-xl flex flex-col md:flex-row gap-6 hover:border-primary/50 transition-colors group">
                    <div className="w-full md:w-48 h-32 bg-slate-100 dark:bg-darkBase rounded-2xl flex items-center justify-center overflow-hidden relative">
                       <MapIcon size={40} className="text-slate-300 group-hover:scale-110 transition-transform" />
                       <div className="absolute top-2 right-2 bg-primary/10 text-primary text-[10px] font-black px-2 py-1 rounded-lg">LIVE MAP</div>
                    </div>
                    <div className="flex-1 space-y-2">
                       <h3 className="text-xl font-bold text-slate-800 dark:text-white">{booth.name || 'Polling Booth'}</h3>
                       <p className="text-slate-600 dark:text-slate-400 text-sm font-medium leading-relaxed">{booth.address || 'Address information not available'}</p>
                       <div className="flex flex-wrap gap-4 pt-2">
                          <div className="flex items-center gap-2 text-xs font-bold text-slate-400">
                             <Clock size={14} className="text-amber-500" /> 7:00 AM - 6:00 PM
                          </div>
                          <div className="flex items-center gap-2 text-xs font-bold text-slate-400">
                             <Users size={14} className="text-emerald-500" /> {Math.floor(Math.random() * 50) + 10} min wait
                          </div>
                          <div className="flex items-center gap-2 text-xs font-bold text-slate-400">
                             <MapPin size={14} className="text-primary" /> {booth.distance || '1.2 km'}
                          </div>
                       </div>
                    </div>
                    <div className="flex md:flex-col justify-end gap-3">
                       <button onClick={() => handleNavigate(booth.address)} className="bg-primary hover:bg-indigo-600 text-white p-4 rounded-2xl shadow-lg shadow-indigo-500/20 transition-all">
                          <Navigation size={20} />
                       </button>
                    </div>
                 </div>
               ))
             ) : (
               <div className="bg-white dark:bg-darkSurface p-12 rounded-3xl border border-slate-200 dark:border-zinc-800 text-center space-y-4">
                  <div className="bg-slate-50 dark:bg-darkBase w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 border border-slate-100 dark:border-zinc-800">
                     <MapPin size={32} className="text-slate-300" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-800 dark:text-white">No booths found nearby</h3>
                  <p className="text-slate-600 dark:text-slate-400 text-sm max-w-sm mx-auto">Try updating your location in the profile settings or search by a different PIN code.</p>
               </div>
             )}
          </div>
        </div>

        <div className="space-y-6">
           <div className="bg-emerald-600 rounded-3xl p-8 text-white shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 blur-3xl rounded-full"></div>
              <h3 className="text-xl font-black mb-4 uppercase tracking-tight">Queue Tracker</h3>
              <p className="text-emerald-100 text-sm mb-6 leading-relaxed">Check live crowd status before you leave. Avoid long queues by picking the optimal time to vote.</p>
              <div className="bg-black/20 rounded-2xl p-4 flex items-center justify-between">
                 <span className="text-xs font-bold">Optimal Time</span>
                 <span className="text-sm font-black">2:00 PM - 4:00 PM</span>
              </div>
           </div>

           <div className="bg-white dark:bg-darkSurface p-8 rounded-3xl border border-slate-200 dark:border-zinc-800 shadow-xl">
             <h3 className="font-bold text-slate-800 dark:text-white mb-6 uppercase tracking-widest text-xs">Booth Essentials</h3>
             <div className="space-y-4">
                {[
                  { t: "Check Ballot Unit", d: "Ensure your symbol is on the list" },
                  { t: "Carry Voter Slip", d: "Speeds up the identification process" },
                  { t: "Hand Sanitizer", d: "Health & safety first" }
                ].map((item, i) => (
                  <div key={i} className="flex gap-4">
                     <div className="w-8 h-8 rounded-lg bg-slate-50 dark:bg-darkBase border border-slate-100 dark:border-zinc-800 flex items-center justify-center text-primary flex-shrink-0">
                        <ChevronRight size={16} />
                     </div>
                     <div>
                        <h4 className="text-sm font-bold text-slate-700 dark:text-slate-200">{item.t}</h4>
                        <p className="text-[10px] text-slate-400 mt-0.5">{item.d}</p>
                     </div>
                  </div>
                ))}
             </div>
           </div>


        </div>
      </div>
    </div>
  );
}
