import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sword, Zap, MapPin, Award, Search, BookOpen, ClipboardCheck, Compass, ChevronRight } from 'lucide-react';
import { AppContext } from '../context/AppContext';
import api from '../services/api';

export default function JourneyHub() {
  const { userProfile, getOverallKnowledge, getModuleProgress } = useContext(AppContext);
  const navigate = useNavigate();
  const overallKnowledge = getOverallKnowledge();

  const calculateProgress = () => {
    return [
      { id: 'register', title: "Registration Center", path: "/dashboard/register", icon: <ClipboardCheck size={24}/>, progress: getModuleProgress('register'), xp: 120, stats: getModuleProgress('register') === 100 ? "Verified" : "Pending Info", color: "from-blue-500 to-indigo-600" },
      { id: 'epic', title: "EPIC Card Center", path: "/dashboard/epic", icon: <Zap size={24}/>, progress: getModuleProgress('epic'), xp: 80, stats: getModuleProgress('epic') === 100 ? "Digital Ready" : "Not Linked", color: "from-purple-500 to-pink-600" },
      { id: 'booth', title: "Booth Finder", path: "/dashboard/booth", icon: <MapPin size={24}/>, progress: getModuleProgress('booth'), xp: 50, stats: getModuleProgress('booth') === 100 ? "Located" : "Search Booth", color: "from-emerald-500 to-teal-600" },
      { id: 'candidates', title: "Know Your Candidates", path: "/dashboard/candidates", icon: <Search size={24}/>, progress: getModuleProgress('candidates'), xp: 30, stats: getModuleProgress('candidates') === 100 ? "Informed" : "View List", color: "from-orange-500 to-red-600" },
      { id: 'learn', title: "Learn Voting Process", path: "/dashboard/learn", icon: <BookOpen size={24}/>, progress: getModuleProgress('learn'), xp: 150, stats: getModuleProgress('learn') === 100 ? "Expert" : `${getModuleProgress('learn')}% Score`, color: "from-cyan-500 to-blue-600" },
      { id: 'checklist', title: "Polling Day Checklist", path: "/dashboard/checklist", icon: <Sword size={24}/>, progress: getModuleProgress('checklist'), xp: 70, stats: getModuleProgress('checklist') === 100 ? "Ready" : "Review Tasks", color: "from-slate-700 to-slate-900" },
      { id: 'rewards', title: "Democracy Rewards", path: "/dashboard/rewards", icon: <Award size={24}/>, progress: getModuleProgress('rewards'), xp: 200, stats: `${userProfile.progress?.length || 0} Badges`, color: "from-amber-400 to-orange-500" },
      { id: 'arena', title: "The Arena (Quests)", path: "/quests", icon: <Sword size={24}/>, progress: getModuleProgress('arena'), xp: 500, stats: `Lvl ${Math.floor((userProfile.points || 0) / 100) + 1} Rank`, color: "from-rose-500 to-red-700" }
    ];
  };

  const journeyStages = calculateProgress();

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto flex flex-col gap-8 pb-24 md:pb-8 animate-in fade-in duration-500">
      {/* Header */}
      <div className="relative overflow-hidden bg-white dark:bg-darkSurface p-8 md:p-12 rounded-[2.5rem] border border-slate-200 dark:border-zinc-800 shadow-2xl">
         <div className="absolute top-0 right-0 w-96 h-96 bg-primary blur-[120px] opacity-10 -translate-y-1/2 translate-x-1/2"></div>
         <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="text-center md:text-left">
               <span className="uppercase tracking-[0.3em] text-primary font-black text-xs">Voter Lifecycle</span>
               <h1 className="text-4xl md:text-6xl font-black mt-4 mb-4 text-slate-900 dark:text-white tracking-tighter uppercase">Journey <span className="text-primary">Hub</span></h1>
               <p className="text-slate-600 dark:text-slate-400 dark:text-slate-400 max-w-xl text-lg font-medium">Master the democratic process through our 8-stage civic journey. Complete each module to become a certified Democracy Hero.</p>
            </div>
            <div className="bg-slate-50 dark:bg-darkBase p-8 rounded-[2rem] border border-slate-200 dark:border-zinc-800 text-center min-w-[200px] shadow-inner">
               <span className="block text-slate-400 font-black mb-1 tracking-[0.2em] text-[10px] uppercase">Mastery</span>
               <span className="text-5xl font-black text-primary">{overallKnowledge}%</span>
            </div>
         </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
         {journeyStages.map((stage, i) => (
           <div key={i} onClick={() => navigate(stage.path)} className="group bg-white dark:bg-darkSurface p-6 rounded-[2rem] border border-slate-200 dark:border-zinc-800 shadow-xl hover:-translate-y-2 transition-all cursor-pointer relative overflow-hidden flex flex-col justify-between h-[300px]">
              <div className="absolute top-0 right-0 p-6 opacity-[0.03] group-hover:opacity-[0.1] transition-opacity">
                 {stage.icon}
              </div>
              
              <div>
                 <div className={`w-14 h-14 bg-gradient-to-br ${stage.color} rounded-2xl flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform`}>
                    {stage.icon}
                 </div>
                 <h3 className="mt-6 text-xl font-black text-slate-800 dark:text-white uppercase leading-tight tracking-tight">{stage.title}</h3>
                 <p className="text-[10px] font-bold text-slate-400 mt-1 uppercase tracking-widest">{stage.stats}</p>
              </div>

              <div className="space-y-4">
                 <div className="flex justify-between items-end">
                    <span className="text-[10px] font-black text-primary">+{stage.xp} XP</span>
                    <span className="text-[10px] font-black text-slate-400">{stage.progress}%</span>
                 </div>
                 <div className="h-2 w-full bg-slate-100 dark:bg-zinc-900 rounded-full overflow-hidden p-0.5 border border-slate-200 dark:border-zinc-800">
                    <div className="h-full bg-primary rounded-full transition-all duration-1000" style={{ width: `${stage.progress}%` }}></div>
                 </div>
                 <button className="w-full bg-slate-50 dark:bg-darkBase group-hover:bg-primary group-hover:text-white text-slate-600 dark:text-slate-400 py-4 rounded-xl text-xs font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2 border border-slate-100 dark:border-zinc-800">
                    Launch Module <ChevronRight size={16} />
                 </button>
              </div>
           </div>
         ))}
      </div>
    </div>
  );
}
