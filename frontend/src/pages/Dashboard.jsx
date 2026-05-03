import React, { useContext, useMemo } from 'react';
import SkillTree from '../components/SkillTree';
import TimelineCard from '../components/TimelineCard';
import Leaderboard from '../components/Leaderboard';
import { AppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';
import { Sword, Zap, ChevronRight } from 'lucide-react';

export default function Dashboard() {
  const { username, userProfile, getOverallKnowledge, isProfileLoading } = useContext(AppContext);
  const navigate = useNavigate();
  
  const overallKnowledge = useMemo(() => getOverallKnowledge(), [getOverallKnowledge]);

  // Loading Skeleton for a better "Fast" feel
  if (isProfileLoading) {
    return (
      <div className="p-4 md:p-8 max-w-7xl mx-auto flex flex-col gap-8 animate-pulse">
        <div className="h-32 bg-slate-200 dark:bg-zinc-800 rounded-[2.5rem]"></div>
        <div className="h-64 bg-slate-200 dark:bg-zinc-800 rounded-[2.5rem]"></div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div className="h-64 bg-slate-200 dark:bg-zinc-800 rounded-3xl"></div>
            <div className="h-96 bg-slate-200 dark:bg-zinc-800 rounded-3xl"></div>
          </div>
          <div className="lg:col-span-1 h-[600px] bg-slate-200 dark:bg-zinc-800 rounded-3xl"></div>
        </div>
      </div>
    );
  }

  if (!userProfile.state) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-100px)] p-4">
         <div className="p-8 md:p-12 text-center bg-white dark:bg-darkSurface rounded-3xl max-w-lg mx-auto shadow-2xl border border-slate-200 dark:border-zinc-800 w-full relative overflow-hidden">
           <div className="absolute top-0 right-0 w-64 h-64 bg-primary blur-[100px] opacity-10"></div>
           <Zap className="w-16 h-16 text-primary mx-auto mb-6" />
           <h2 className="text-3xl mb-4 text-slate-900 dark:text-white font-extrabold tracking-tight">Welcome, <span className="text-primary">{username}</span>!</h2>
           <p className="text-slate-600 dark:text-slate-400 mb-8 text-lg">Your election journey begins here. Configure your profile to unlock the command center.</p>
           <button onClick={() => navigate('/profile')} className="w-full btn-primary py-4 text-lg rounded-xl shadow-lg shadow-indigo-500/30">Enter Setup</button>
         </div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto flex flex-col gap-8 pb-24 md:pb-8" role="main" aria-label="User Dashboard">
      {/* Knowledge Bar */}
      <section className="bg-white dark:bg-darkSurface p-5 md:p-6 rounded-3xl border border-slate-200 dark:border-zinc-800 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 overflow-hidden relative" aria-label="Knowledge Mastery">
         <div className="absolute inset-0 bg-primary opacity-[0.03]"></div>
         <div className="flex items-center gap-4 relative z-10 w-full md:w-auto">
            <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center text-white shadow-lg shadow-indigo-500/20 shrink-0">
               <Zap size={24} />
            </div>
            <div>
               <h3 className="font-black text-slate-800 dark:text-white uppercase tracking-tight text-sm">Overall Civic Knowledge</h3>
               <p className="text-xs text-slate-600 dark:text-slate-400 font-bold">Complete modules to earn XP</p>
            </div>
         </div>
         <div className="flex-1 w-full max-w-xl relative z-10 flex flex-col md:flex-row items-center gap-4 md:gap-6">
            <div className="flex-1 w-full">
              <div className="flex justify-between mb-2">
                 <span className="text-[10px] font-black text-primary uppercase tracking-widest">{overallKnowledge}% Mastery</span>
                 <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Level {Math.floor((userProfile.points || 0) / 100) + 1}</span>
              </div>
              <div className="h-3 bg-slate-100 dark:bg-zinc-900 rounded-full overflow-hidden border border-slate-200 dark:border-zinc-800 p-0.5">
                 <div className="h-full bg-gradient-to-r from-primary to-emerald-400 rounded-full transition-all duration-1000 shadow-[0_0_15px_rgba(34,211,238,0.4)]" style={{ width: `${overallKnowledge}%` }}></div>
              </div>
            </div>
            <button 
              onClick={() => navigate('/knowledge')}
              className="w-full md:w-auto bg-primary/10 text-primary hover:bg-primary hover:text-white px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest border border-primary/20 transition-all shadow-lg shadow-primary/5 flex items-center justify-center gap-2 whitespace-nowrap"
            >
               Knowledge Hub <ChevronRight size={14} />
            </button>
         </div>
      </section>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary via-indigo-700 to-indigo-900 rounded-[2.5rem] p-6 md:p-12 text-white shadow-2xl relative overflow-hidden flex flex-col md:flex-row justify-between items-center gap-8 border border-white/10" aria-label="Profile Overview">
         <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white opacity-5 rounded-full -translate-y-1/2 translate-x-1/2 blur-[100px] pointer-events-none"></div>
         <div className="z-10 text-center md:text-left w-full md:w-auto">
            <span className="inline-block uppercase tracking-[0.3em] text-indigo-200 font-black text-[10px] bg-white/10 px-3 py-1 rounded-full backdrop-blur-md">Voter Command Center</span>
            <h1 className="text-4xl md:text-6xl font-black mt-4 mb-2 tracking-tighter uppercase break-words">{username}</h1>
            <div className="flex flex-wrap justify-center md:justify-start gap-2 md:gap-3 mt-4">
               <span className="px-3 md:px-4 py-2 bg-black/20 rounded-xl text-[10px] md:text-xs font-bold border border-white/10 backdrop-blur-sm whitespace-nowrap" aria-label={`Level ${Math.floor((userProfile.points || 0) / 100) + 1} Citizen`}>Level {Math.floor((userProfile.points || 0) / 100) + 1} Citizen</span>
               <span className="px-3 md:px-4 py-2 bg-black/20 rounded-xl text-[10px] md:text-xs font-bold border border-white/10 backdrop-blur-sm whitespace-nowrap" aria-label={`State: ${userProfile.state}`}>{userProfile.state}</span>
               <span className="px-3 md:px-4 py-2 bg-emerald-500/20 text-emerald-400 rounded-xl text-[10px] md:text-xs font-black border border-emerald-500/30 backdrop-blur-sm whitespace-nowrap">PRO VOTER</span>
            </div>
         </div>
         <div className="z-10 bg-white/5 backdrop-blur-xl p-6 md:p-8 rounded-[2rem] border border-white/10 text-center min-w-[160px] md:min-w-[200px] shadow-2xl relative group w-full md:w-auto">
            <div className="absolute inset-0 bg-primary blur-2xl opacity-0 group-hover:opacity-20 transition-opacity"></div>
            <span className="block text-indigo-200 font-black mb-1 tracking-[0.2em] text-[10px] uppercase">TOTAL XP</span>
            <span className="text-5xl md:text-6xl font-black text-white drop-shadow-lg" aria-label={`${userProfile.points || 0} Experience Points`}>{userProfile.points || 0}</span>
         </div>
      </section>

      {/* Journey Hub CTA */}
      {/* Journey Hub CTA */}
      <div className="bg-white dark:bg-darkSurface p-8 rounded-[2.5rem] border border-slate-200 dark:border-zinc-800 shadow-xl relative overflow-hidden group min-h-[160px]">
         <div className="absolute inset-0 bg-primary opacity-0 group-hover:opacity-[0.02] transition-opacity"></div>
         <div className="flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
            <div className="flex items-center gap-6 text-center md:text-left flex-col md:flex-row">
               <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
                  <Sword size={32} />
               </div>
               <div>
                  <h2 className="text-2xl font-black text-slate-800 dark:text-white uppercase tracking-tight">Your Election Journey</h2>
                  <p className="text-slate-600 dark:text-slate-400 dark:text-slate-400 font-medium">Continue your 8-stage civic mastery journey.</p>
               </div>
            </div>
            <button onClick={() => navigate('/journey')} className="btn-primary px-8 py-4 rounded-2xl flex items-center gap-3 shadow-lg shadow-indigo-500/20 group-hover:scale-105 transition-all uppercase font-black tracking-widest text-sm">
               Open Journey Hub <ChevronRight size={18} />
            </button>
         </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Secondary Dashboard Components */}
        <div className="lg:col-span-2 space-y-8">
           <div className="min-h-[300px]">
             <TimelineCard />
           </div>
           <div className="min-h-[400px]">
             <Leaderboard />
           </div>
        </div>
        <div className="lg:col-span-1 min-h-[500px]">
           <SkillTree />
        </div>
      </div>
    </div>
  );
}
