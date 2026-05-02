import React, { useState, useEffect, useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { Zap, CheckCircle2, Info, ChevronRight, Play } from 'lucide-react';

const CANDIDATES = [
  { id: 1, name: "Arjun Kumar", party: "Digital Democracy Party", symbol: "⚡" },
  { id: 2, name: "Sara Khan", party: "Modern India Alliance", symbol: "🌐" },
  { id: 3, name: "David Wilson", party: "Civic Rights Union", symbol: "⚖️" },
  { id: 4, name: "Priya Singh", party: "Progressive Front", symbol: "🚀" },
  { id: 5, name: "NOTA", party: "None of the Above", symbol: "❌" }
];

export default function EVMSimulator({ onComplete }) {
  const { userProfile, completeTask, triggerConfetti } = useContext(AppContext);
  const [step, setStep] = useState(0); // 0: Idle, 1: Ready, 2: VVPAT, 3: Success
  const [selected, setSelected] = useState(null);
  const [isBeeping, setIsBeeping] = useState(false);

  const handleVote = (candidate) => {
    if (step !== 1) return;
    setSelected(candidate);
    setIsBeeping(true);
    setStep(2);
    
    setTimeout(() => {
      setIsBeeping(false);
      setStep(3);
      if (!userProfile.progress?.includes('evm_sim_complete')) {
        completeTask('evm_sim_complete', 50);
        onComplete && onComplete();
        triggerConfetti();
      }
    }, 3000);
  };

  return (
    <div className="bg-slate-900 rounded-[2.5rem] p-4 md:p-8 border border-white/10 shadow-2xl overflow-hidden relative">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary blur-[100px] opacity-10"></div>
      
      {/* Status Header */}
      <div className="flex items-center justify-between mb-8 px-2">
         <div className="flex items-center gap-3">
            <div className={`w-3 h-3 rounded-full ${step >= 1 ? 'bg-red-500 animate-pulse shadow-[0_0_10px_rgba(239,68,68,0.5)]' : 'bg-slate-700'}`}></div>
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Control Unit: {step === 0 ? 'Locked' : 'Ready to Vote'}</span>
         </div>
         {step === 3 && (
            <div className="bg-emerald-500/20 text-emerald-400 px-3 py-1 rounded-full text-[10px] font-black uppercase border border-emerald-500/20">
               Vote Recorded
            </div>
         )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Balloting Unit */}
        <div className="bg-slate-800 rounded-3xl p-6 border border-white/5 relative shadow-inner">
           <div className="absolute top-4 right-4 bg-slate-900 px-3 py-1 rounded-lg text-[8px] font-black text-slate-600 dark:text-slate-400 uppercase border border-white/5">Balloting Unit #001</div>
           <div className="space-y-3 mt-4">
              {CANDIDATES.map((c) => (
                <div key={c.id} className={`flex items-center justify-between p-3 rounded-2xl border-2 transition-all ${step === 1 ? 'border-slate-700 hover:border-primary cursor-pointer bg-slate-900/50' : 'border-transparent bg-slate-900/20 opacity-50'}`}
                  onClick={() => handleVote(c)}
                >
                   <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-slate-800 rounded-xl flex items-center justify-center text-xl shadow-lg">{c.symbol}</div>
                      <div>
                         <div className="text-xs font-black text-white">{c.name}</div>
                         <div className="text-[10px] text-slate-600 dark:text-slate-400 font-bold">{c.party}</div>
                      </div>
                   </div>
                   <div className={`w-8 h-8 rounded-full border-4 ${selected?.id === c.id ? 'bg-red-500 border-red-900 shadow-[0_0_10px_rgba(239,68,68,0.5)]' : 'bg-slate-800 border-slate-700'}`}></div>
                </div>
              ))}
           </div>
        </div>

        {/* VVPAT Display */}
        <div className="flex flex-col gap-6">
           <div className="bg-slate-800 rounded-3xl p-8 border border-white/5 flex flex-col items-center justify-center text-center relative h-full">
              <div className="absolute top-4 right-4 bg-slate-900 px-3 py-1 rounded-lg text-[8px] font-black text-slate-600 dark:text-slate-400 uppercase border border-white/5">VVPAT Unit</div>
              
              <div className="w-full aspect-square max-w-[200px] bg-slate-950 rounded-2xl border-8 border-slate-700 flex items-center justify-center relative overflow-hidden">
                 <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                 {step === 2 ? (
                    <div className="animate-in slide-in-from-top duration-1000 bg-white p-4 w-32 shadow-2xl border-l-4 border-dashed border-slate-200">
                       <div className="text-[10px] font-black text-slate-900 mb-2">PAPER SLIP</div>
                       <div className="text-2xl mb-1">{selected?.symbol}</div>
                       <div className="text-[8px] font-bold text-slate-600 dark:text-slate-400 uppercase leading-tight">{selected?.name}</div>
                       <div className="w-full h-2 bg-slate-100 rounded mt-2"></div>
                    </div>
                 ) : step === 3 ? (
                    <div className="text-slate-600 font-black uppercase text-[10px] tracking-widest">Slip Dropped</div>
                 ) : (
                    <div className="text-slate-800 font-black uppercase text-[10px] tracking-widest">No Activity</div>
                 )}
              </div>
              <p className="text-[10px] text-slate-600 dark:text-slate-400 font-bold mt-6 leading-relaxed max-w-[200px]">Verify your selection on the paper slip before it drops into the sealed box.</p>
           </div>

           {/* Controls */}
           <div className="bg-slate-800 rounded-3xl p-6 border border-white/5">
              {step === 0 ? (
                <button 
                  onClick={() => setStep(1)}
                  className="w-full bg-primary hover:bg-primary/90 text-white py-4 rounded-2xl font-black uppercase tracking-widest text-sm transition-all shadow-lg shadow-primary/20"
                >
                  Unlock Machine
                </button>
              ) : step === 2 || isBeeping ? (
                <div className="w-full bg-red-500/20 text-red-500 py-4 rounded-2xl font-black uppercase tracking-widest text-sm text-center animate-pulse border border-red-500/20">
                   BEEP................
                </div>
              ) : step === 3 ? (
                <button 
                  onClick={() => { setStep(0); setSelected(null); }}
                  className="w-full bg-emerald-500 hover:bg-emerald-600 text-white py-4 rounded-2xl font-black uppercase tracking-widest text-sm transition-all shadow-lg shadow-emerald-500/20"
                >
                  Start New Session
                </button>
              ) : (
                <div className="text-center py-2">
                   <p className="text-xs text-slate-400 font-bold">Select a candidate to cast your vote.</p>
                </div>
              )}
           </div>
        </div>
      </div>

      {isBeeping && (
        <div className="absolute inset-0 bg-red-500/5 pointer-events-none animate-pulse"></div>
      )}
    </div>
  );
}
