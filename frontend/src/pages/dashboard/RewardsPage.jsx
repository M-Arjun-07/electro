import React, { useContext } from 'react';
import { AppContext } from '../../context/AppContext';
import { Award, Star, Zap, Trophy, Shield, Share2, Download, CheckCircle2, ChevronRight } from 'lucide-react';

export default function RewardsPage() {
  const { userProfile, username } = useContext(AppContext);
  const xp = userProfile.points || 0;

  const levels = [
    { name: "Beginner", min: 0, icon: <Star size={24}/>, color: "text-slate-400", bg: "bg-slate-100 dark:bg-zinc-800" },
    { name: "Aware Citizen", min: 200, icon: <Shield size={24}/>, color: "text-blue-500", bg: "bg-blue-100 dark:bg-blue-900/30" },
    { name: "Smart Voter", min: 500, icon: <Zap size={24}/>, color: "text-amber-500", bg: "bg-amber-100 dark:bg-amber-900/30" },
    { name: "Democracy Hero", min: 1000, icon: <Trophy size={24}/>, color: "text-emerald-500", bg: "bg-emerald-100 dark:bg-emerald-900/30" },
    { name: "Election Legend", min: 2000, icon: <Award size={24}/>, color: "text-primary", bg: "bg-primary/10 dark:bg-primary/20" }
  ];

  const currentLevel = levels.slice().reverse().find(l => xp >= l.min) || levels[0];
  const nextLevel = levels[levels.indexOf(currentLevel) + 1] || null;
  const progressToNext = nextLevel ? Math.round(((xp - currentLevel.min) / (nextLevel.min - currentLevel.min)) * 100) : 100;

  const badges = [
    { name: "Quick Start", earned: xp > 20, desc: "Completed registration" },
    { name: "Knowledge Seeker", earned: Object.keys(userProfile.knowledge || {}).length > 0, desc: "Finished first module" },
    { name: "Booth Finder", earned: xp > 150 || userProfile.progress?.includes('booth_found'), desc: "Located polling station" },
    { name: "Quiz Master", earned: (userProfile.knowledge?.learn || 0) >= 80, desc: "Scored 80% in Learning" },
    { name: "Early Bird", earned: xp > 800, desc: "Checked all election steps" },
    { name: "True Hero", earned: xp >= 1000, desc: "Reached Hero rank" }
  ];

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-8 animate-in zoom-in-95 duration-700 pb-24 md:pb-8">
      {/* Hero Stats */}
      <div className="bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 rounded-[2.5rem] p-8 md:p-16 text-white shadow-2xl relative overflow-hidden flex flex-col items-center text-center border border-white/5">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-primary blur-[180px] opacity-10 pointer-events-none"></div>
        
        <div className={`w-32 h-32 ${currentLevel.bg} rounded-[2.5rem] flex items-center justify-center ${currentLevel.color} shadow-2xl mb-8 relative border border-white/10 group`}>
           <div className="absolute inset-0 bg-current opacity-20 blur-2xl group-hover:opacity-40 transition-opacity"></div>
           {currentLevel.icon}
           <div className="absolute -bottom-2 -right-2 bg-white dark:bg-darkSurface p-2 rounded-xl shadow-xl text-slate-800 dark:text-white border border-slate-200 dark:border-zinc-800">
              <Award size={16} className="text-primary" />
           </div>
        </div>

        <span className="text-primary font-black uppercase tracking-[0.4em] text-[10px] mb-4">Level {levels.indexOf(currentLevel) + 1}</span>
        <h1 className="text-5xl md:text-6xl font-black tracking-tighter uppercase mb-4">{currentLevel.name}</h1>
        <p className="text-indigo-200 font-medium mb-10 max-w-md">You've earned <span className="text-white font-black">{xp} XP</span> on your journey to becoming a Democracy Legend.</p>

        <div className="w-full max-w-xl space-y-3">
           <div className="flex justify-between items-end">
              <span className="text-xs font-black uppercase tracking-widest text-slate-400">{currentLevel.name}</span>
              <span className="text-xs font-black uppercase tracking-widest text-slate-400">{nextLevel ? nextLevel.name : 'MAX LEVEL'}</span>
           </div>
           <div className="h-4 w-full bg-white/5 rounded-full overflow-hidden border border-white/10 p-1">
              <div className="h-full bg-gradient-to-r from-primary to-emerald-400 rounded-full transition-all duration-1000 shadow-[0_0_20px_rgba(34,211,238,0.5)]" style={{ width: `${progressToNext}%` }}></div>
           </div>
           {nextLevel && (
             <p className="text-[10px] font-bold text-slate-600 dark:text-slate-400 uppercase tracking-widest">{nextLevel.min - xp} XP until next rank</p>
           )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Badges Grid */}
        <div className="lg:col-span-2 space-y-8">
           <div className="bg-white dark:bg-darkSurface p-8 rounded-[2rem] border border-slate-200 dark:border-zinc-800 shadow-xl">
              <h2 className="text-2xl font-black text-slate-800 dark:text-white uppercase tracking-tight mb-8 flex items-center gap-3">
                 <Award className="text-primary" size={28} /> Achievement Badges
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                 {badges.map((badge, i) => (
                   <div key={i} className={`p-6 rounded-[2rem] border-2 flex flex-col items-center text-center gap-4 transition-all ${badge.earned ? 'bg-slate-50 dark:bg-darkBase border-primary/20 shadow-lg group' : 'bg-slate-100/50 dark:bg-zinc-900/50 border-transparent opacity-40 grayscale'}`}>
                      <div className={`w-16 h-16 rounded-2xl flex items-center justify-center shadow-inner ${badge.earned ? 'bg-primary/10 text-primary group-hover:scale-110 transition-transform' : 'bg-slate-200 dark:bg-zinc-800 text-slate-400'}`}>
                         <Shield size={28} />
                      </div>
                      <div>
                         <h4 className="font-black text-[10px] uppercase tracking-widest text-slate-800 dark:text-white mb-1">{badge.name}</h4>
                         <p className="text-[10px] text-slate-400 font-medium leading-tight">{badge.desc}</p>
                      </div>
                      {badge.earned && (
                        <div className="mt-auto">
                           <CheckCircle2 size={16} className="text-emerald-500" />
                        </div>
                      )}
                   </div>
                 ))}
              </div>
           </div>
        </div>

        {/* Share & Actions */}
        <div className="space-y-6">
           <div className="bg-white dark:bg-darkSurface p-8 rounded-[2rem] border border-slate-200 dark:border-zinc-800 shadow-xl">
              <h3 className="font-black text-slate-800 dark:text-white text-xs uppercase tracking-[0.2em] mb-8">Share Progress</h3>
              <div className="space-y-4">
                 <div className="p-6 rounded-2xl bg-slate-900 text-white border border-white/10 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-primary blur-3xl opacity-20"></div>
                    <div className="flex items-center gap-4 mb-4">
                       <div className="w-10 h-10 bg-primary/20 rounded-xl flex items-center justify-center text-primary">
                          <Award size={20} />
                       </div>
                       <div>
                          <p className="text-[10px] font-black uppercase opacity-60">Citizen Profile</p>
                          <p className="text-sm font-bold">{username}</p>
                       </div>
                    </div>
                    <div className="flex justify-between items-end">
                       <div>
                          <p className="text-2xl font-black">{xp} XP</p>
                          <p className="text-[10px] font-bold uppercase text-emerald-400">{currentLevel.name}</p>
                       </div>
                       <Share2 size={20} className="text-primary cursor-pointer hover:scale-110 transition-transform" />
                    </div>
                 </div>
                 <button className="w-full bg-slate-100 dark:bg-zinc-800 hover:bg-primary hover:text-white text-slate-700 dark:text-slate-300 font-black py-4 rounded-2xl transition-all flex items-center justify-center gap-3 shadow-sm text-sm uppercase tracking-widest">
                    <Download size={18} /> Save Progress Card
                 </button>
              </div>
           </div>

           <div className="bg-emerald-600 rounded-[2rem] p-8 text-white shadow-xl relative overflow-hidden group cursor-pointer">
              <div className="absolute top-0 right-0 p-4 opacity-10 transition-transform group-hover:rotate-12">
                 <Trophy size={100} />
              </div>
              <h4 className="text-[10px] font-black uppercase tracking-widest mb-2 opacity-80">Final Goal</h4>
              <h3 className="text-2xl font-black leading-tight mb-6">Vote to become a Democracy Legend</h3>
              <div className="bg-white/20 backdrop-blur-md rounded-2xl p-4 flex justify-between items-center">
                 <span className="text-xs font-bold">LEGENDARY XP</span>
                 <span className="text-sm font-black">+1000 XP</span>
              </div>
              <ChevronRight size={24} className="absolute bottom-4 right-4 opacity-40 group-hover:translate-x-2 transition-transform" />
           </div>
        </div>
      </div>
    </div>
  );
}
