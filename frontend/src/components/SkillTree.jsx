import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { Check, Lock, Target } from 'lucide-react';

const NODES = [
  { id: 'register', label: "Registered" },
  { id: 'epic', label: "ID Ready" },
  { id: 'booth', label: "Booth Located" },
  { id: 'candidates', label: "Candidates Known" },
  { id: 'learn', label: "Process Mastered" },
  { id: 'checklist', label: "Polling Ready" },
  { id: 'rewards', label: "Rewards Unlocked" },
  { id: 'arena', label: "Citizen Rank" }
];

export default function SkillTree() {
  const { userProfile, getModuleProgress } = useContext(AppContext);

  return (
    <div className="bg-white dark:bg-darkSurface p-6 md:p-8 rounded-3xl border border-slate-200 dark:border-zinc-800 shadow-xl h-full">
      <h2 className="text-xl font-bold mb-8 text-slate-800 dark:text-white flex items-center gap-2">
        <Target className="text-primary" /> The Roadmap
      </h2>
      <div className="flex flex-col relative">
        <div className="absolute left-[1.125rem] top-4 bottom-4 w-1 bg-slate-100 dark:bg-zinc-800 rounded-full"></div>
        
        {NODES.map((node, idx) => {
          const progress = getModuleProgress(node.id);
          const isUnlocked = progress === 100;
          const isNext = !isUnlocked && (idx === 0 || getModuleProgress(NODES[idx-1].id) === 100);
          
          return (
            <div key={idx} className="flex items-center gap-6 mb-8 relative z-10 group">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300 border-4 border-white dark:border-darkSurface ${isUnlocked ? 'bg-primary text-white shadow-[0_0_15px_rgba(99,102,241,0.5)]' : isNext ? 'bg-emerald-500 text-white shadow-[0_0_15px_rgba(16,185,129,0.5)]' : 'bg-slate-200 dark:bg-zinc-800 text-slate-400'}`}>
                {isUnlocked ? <Check size={16} className="font-bold" /> : isNext ? <Target size={16} className="animate-pulse" /> : <Lock size={14} />}
              </div>
              <div className={`p-4 rounded-2xl border flex-1 transition-all duration-300 ${isUnlocked ? 'bg-indigo-50 dark:bg-indigo-900/10 border-indigo-200 dark:border-indigo-800/30' : isNext ? 'bg-white dark:bg-zinc-900 border-emerald-200 dark:border-emerald-800/50 transform scale-105 shadow-lg' : 'bg-transparent border-transparent opacity-50'}`}>
                <div className="flex justify-between items-center mb-1">
                   <h3 className={`font-bold ${isUnlocked ? 'text-indigo-700 dark:text-indigo-400' : isNext ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-600 dark:text-slate-400'}`}>{node.label}</h3>
                   <span className="text-[10px] font-black opacity-50">{progress}%</span>
                </div>
                <div className="h-1 w-full bg-slate-100 dark:bg-zinc-800 rounded-full overflow-hidden mt-2">
                   <div className="h-full bg-primary transition-all duration-500" style={{ width: `${progress}%` }}></div>
                </div>
                <p className="text-[10px] font-bold mt-2 uppercase tracking-wider opacity-70">{isUnlocked ? 'Completed' : isNext ? 'Current Stage' : 'Locked'}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
