import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';

export default function ProgressCard() {
  const { progress, userProfile } = useContext(AppContext);
  const totalSteps = 5;
  const currentSteps = progress.length;
  const percentage = Math.round((currentSteps / totalSteps) * 100);

  return (
    <div className="glass-card p-6 text-center relative overflow-hidden group">
      <div className="absolute top-0 right-0 w-32 h-32 bg-primary blur-[80px] opacity-10 group-hover:opacity-30 transition-opacity pointer-events-none"></div>
      
      <h3 className="text-xl font-bold mb-4 text-slate-700 dark:text-slate-200">Journey Progress</h3>
      
      <div className="relative w-28 h-28 md:w-32 md:h-32 mx-auto mb-4">
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
          <path
            className="text-slate-200 dark:text-slate-700"
            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
          />
          <path
            className="text-primary transition-all duration-1000 ease-out"
            strokeDasharray={`${percentage}, 100`}
            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center flex-col">
          <span className="text-2xl md:text-3xl font-extrabold neon-text-primary">{percentage}%</span>
        </div>
      </div>
      
      <p className="text-slate-600 dark:text-slate-400 font-medium mb-4 text-sm md:text-base">
        Rank: <span className="text-slate-900 dark:text-white font-bold">{currentSteps === 0 ? "Novice Citizen" : currentSteps === 5 ? "Democracy Hero" : "Citizen in Training"}</span>
      </p>

      <div className="bg-white dark:bg-slate-800/80 rounded-xl p-3 border border-slate-300 dark:border-slate-600 inline-block px-6 shadow-md dark:shadow-[0_0_15px_rgba(168,85,247,0.3)]">
        <p className="text-secondary font-bold tracking-widest text-xs md:text-sm">TOTAL XP</p>
        <p className="text-xl md:text-2xl font-black text-slate-800 dark:text-white">{userProfile.points || 0}</p>
      </div>
    </div>
  );
}
