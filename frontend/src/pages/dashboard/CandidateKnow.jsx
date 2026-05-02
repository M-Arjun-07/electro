import React, { useState, useContext, useEffect } from 'react';
import { AppContext } from '../../context/AppContext';
import { User, Briefcase, GraduationCap, Scale, DollarSign, Info, Search, Filter, CheckCircle, X, ArrowLeftRight, MapPin } from 'lucide-react';
import api from '../../services/api';

export default function CandidateKnow() {
  const { userProfile, addPoints, updateKnowledge } = useContext(AppContext);
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    fetchCandidates();
  }, [userProfile.pincode, userProfile.district]);

  const fetchCandidates = async () => {
    setLoading(true);
    try {
      // Prioritize PIN code for fetching candidates
      const res = await api.get('/candidates', { 
        params: { 
          pincode: userProfile.pincode,
          district: userProfile.district 
        } 
      });
      setCandidates(res.data);
      if (res.data.length > 0) {
        updateKnowledge('candidates', 100, 100);
      }
    } catch (e) { console.error(e); }
    finally { setLoading(false); }
  };

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-8 animate-in slide-in-from-left-10 duration-500 pb-24 md:pb-8">
      {/* Header */}
      <div className="bg-white dark:bg-darkSurface p-8 rounded-[2rem] border border-slate-200 dark:border-zinc-800 shadow-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="flex items-center gap-6">
          <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
            <User size={32} />
          </div>
          <div>
            <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">Know Your Candidates</h1>
            <p className="text-slate-600 dark:text-slate-400 font-medium italic">Make an informed choice for your constituency.</p>
          </div>
        </div>
        <div className="flex gap-2">
           <div className="bg-slate-50 dark:bg-darkBase p-4 rounded-2xl border border-slate-200 dark:border-zinc-800 flex items-center gap-3">
              <MapPin size={16} className="text-primary" />
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">PIN CODE</span>
              <span className="text-sm font-black text-slate-800 dark:text-white">{userProfile.pincode || 'Not Set'}</span>
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Candidates List */}
        <div className="lg:col-span-3 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {loading ? (
              Array(4).fill(0).map((_, i) => (
                <div key={i} className="bg-white dark:bg-darkSurface h-48 rounded-3xl animate-pulse border border-slate-200 dark:border-zinc-800"></div>
              ))
            ) : candidates.length > 0 ? (
              candidates.map((candidate, i) => (
                <div key={i} className={`group bg-white dark:bg-darkSurface p-6 rounded-3xl border ${selected?.name === candidate.name ? 'border-primary ring-4 ring-primary/10' : 'border-slate-200 dark:border-zinc-800'} shadow-xl transition-all relative`}>
                  <div className="flex gap-5 cursor-pointer" onClick={() => { setSelected(candidate); addPoints(5); }}>
                    <div className="w-20 h-20 rounded-2xl bg-slate-100 dark:bg-darkBase overflow-hidden flex items-center justify-center border border-slate-200 dark:border-zinc-800 shrink-0">
                       <User size={40} className="text-slate-300 group-hover:scale-110 transition-transform" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start">
                        <h3 className="text-xl font-black text-slate-800 dark:text-white truncate">{candidate.name}</h3>
                      </div>
                      <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">{candidate.party} • {candidate.age} Years</p>
                      <div className="flex gap-4 mt-4">
                         <div className={`flex items-center gap-1.5 text-[10px] font-black uppercase ${candidate.cases > 0 ? 'text-red-500' : 'text-emerald-500'}`}>
                            <Scale size={14} /> {candidate.cases} Cases
                         </div>
                         <div className="flex items-center gap-1.5 text-[10px] font-black uppercase text-amber-500">
                            <DollarSign size={14} /> ₹{candidate.assets}
                         </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="md:col-span-2 py-20 text-center space-y-4 bg-white dark:bg-darkSurface rounded-3xl border border-dashed border-slate-300 dark:border-zinc-700">
                 <User size={48} className="mx-auto text-slate-300" />
                 <h3 className="text-xl font-bold text-slate-700 dark:text-slate-300">No candidates listed for {userProfile.pincode}</h3>
                 <p className="text-sm text-slate-600 dark:text-slate-400">Candidate lists are usually finalized closer to the election date.</p>
              </div>
            )}
          </div>

          {/* Details Section */}
          {selected && (
            <div className="bg-white dark:bg-darkSurface p-8 rounded-[2rem] border border-slate-200 dark:border-zinc-800 shadow-2xl animate-in zoom-in-95 duration-300">
               <div className="flex justify-between items-start mb-8">
                  <h2 className="text-2xl font-black text-slate-800 dark:text-white uppercase tracking-tight">Full Dossier: {selected.name}</h2>
                  <button onClick={() => setSelected(null)} className="text-slate-400 hover:text-red-500 transition-colors"><X size={24}/></button>
               </div>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                     <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-blue-500">
                           <GraduationCap size={20} />
                        </div>
                        <div>
                           <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest">Education</span>
                           <span className="font-bold text-slate-700 dark:text-slate-200">{selected.education}</span>
                        </div>
                     </div>
                     <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-purple-50 dark:bg-purple-900/20 flex items-center justify-center text-purple-500">
                           <Briefcase size={20} />
                        </div>
                        <div>
                           <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest">Profession</span>
                           <span className="font-bold text-slate-700 dark:text-slate-200">{selected.profession}</span>
                        </div>
                     </div>
                  </div>
                  <div className="bg-slate-50 dark:bg-darkBase p-6 rounded-2xl border border-slate-100 dark:border-zinc-800">
                     <h4 className="text-sm font-black text-slate-800 dark:text-white mb-4 flex items-center gap-2">
                        <Info size={16} className="text-primary" /> AI Summary
                     </h4>
                     <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed italic">
                        "{selected.summary || `A candidate from the ${selected.party} party, focusing on local infrastructure and social welfare programs.`}"
                     </p>
                  </div>
               </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
           <div className="bg-gradient-to-br from-primary to-indigo-800 rounded-3xl p-8 text-white shadow-xl">
              <h3 className="text-xl font-black mb-4 uppercase">Voter's Guide</h3>
              <p className="text-indigo-100 text-sm leading-relaxed mb-6">Always check the affidavit filed by candidates to see their criminal background and financial assets.</p>
              <button className="w-full bg-white/20 hover:bg-white/30 backdrop-blur-md py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all">Official Affidavit Link</button>
           </div>
        </div>
      </div>
    </div>
  );
}
