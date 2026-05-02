import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, ShieldCheck, Zap, Award } from 'lucide-react';

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-[90vh] flex flex-col items-center justify-center p-4 md:p-8 text-center relative">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[20%] left-[10%] w-64 h-64 md:w-96 md:h-96 bg-primary blur-[100px] md:blur-[150px] rounded-full opacity-10"></div>
        <div className="absolute bottom-[20%] right-[10%] w-64 h-64 md:w-96 md:h-96 bg-secondary blur-[100px] md:blur-[150px] rounded-full opacity-10"></div>
      </div>

      <div className="mb-6 md:mb-8 relative z-10">
        <ShieldCheck className="w-24 h-24 md:w-32 md:h-32 text-primary mx-auto drop-shadow-[0_0_25px_rgba(34,211,238,0.7)]" />
      </div>
      
      <h1 className="text-4xl md:text-7xl font-extrabold mb-4 md:mb-6 tracking-tight z-10 text-slate-800 dark:text-white">
        The <span className="neon-text-primary">Voter's</span> Campaign
      </h1>
      <p className="text-lg md:text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto mb-8 md:mb-10 leading-relaxed z-10">
        Turn confusing democratic processes into an epic, gamified quest. Guided by strict Game Master AI.
      </p>
      
      <button 
        onClick={() => navigate('/journey')}
        className="btn-primary text-lg md:text-xl px-8 py-4 md:px-10 md:py-5 flex items-center gap-3 group z-10"
      >
        Start Your Journey 
        <ChevronRight className="group-hover:translate-x-2 transition-transform" />
      </button>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mt-16 md:mt-24 max-w-5xl mx-auto z-10">
        <div className="glass-card p-6 md:p-8 flex flex-col items-center text-center hover:-translate-y-2 transition-transform duration-300 cursor-default">
          <Zap className="text-secondary w-10 h-10 md:w-12 md:h-12 mb-4" />
          <h3 className="text-lg md:text-xl font-bold mb-3 text-slate-800 dark:text-white">Powered by Gemini</h3>
          <p className="text-slate-600 dark:text-slate-400 text-sm md:text-base">Instant answers to voting laws, completely restricted to election contexts.</p>
        </div>
        <div className="glass-card p-6 md:p-8 flex flex-col items-center text-center hover:-translate-y-2 transition-transform duration-300 cursor-default">
          <Award className="text-primary w-10 h-10 md:w-12 md:h-12 mb-4" />
          <h3 className="text-lg md:text-xl font-bold mb-3 text-slate-800 dark:text-white">Skill Tree System</h3>
          <p className="text-slate-600 dark:text-slate-400 text-sm md:text-base">Play daily trivia and games to level up your voting readiness.</p>
        </div>
        <div className="glass-card p-6 md:p-8 flex flex-col items-center text-center hover:-translate-y-2 transition-transform duration-300 cursor-default">
          <ShieldCheck className="text-yellow-500 dark:text-yellow-400 w-10 h-10 md:w-12 md:h-12 mb-4" />
          <h3 className="text-lg md:text-xl font-bold mb-3 text-slate-800 dark:text-white">Interactive UI</h3>
          <p className="text-slate-600 dark:text-slate-400 text-sm md:text-base">Light/Dark modes and fully mobile responsive quests.</p>
        </div>
      </div>
    </div>
  );
}
