import React, { useState, useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { HelpCircle, CheckCircle2, Zap, Sparkles, RefreshCcw } from 'lucide-react';
import api from '../services/api';

export default function KnowledgeCard({ card }) {
  const { userProfile, markCardLearned, triggerConfetti } = useContext(AppContext);
  const [flipped, setFlipped] = useState(false);
  const [simplifying, setSimplifying] = useState(false);
  const [aiExplanation, setAiExplanation] = useState(null);

  const isCompleted = userProfile.learned_cards?.includes(card.id);

  const handleMarkLearned = (e) => {
    e.stopPropagation();
    if (!isCompleted) {
      markCardLearned(card.id, card.xp);
      triggerConfetti();
    }
  };

  const handleSimplify = async (e) => {
    e.stopPropagation();
    setSimplifying(true);
    try {
      const res = await api.post('/ai/simplify', { content: card.explanation });
      setAiExplanation(res.data.reply);
    } catch (e) {
      console.error(e);
      setAiExplanation("Error connecting to AI. " + card.explanation);
    }
    setSimplifying(false);
  };

  return (
    <div 
      className={`relative h-[350px] w-full perspective-1000 group cursor-pointer`}
      onClick={() => setFlipped(!flipped)}
    >
      <div className={`relative w-full h-full transition-all duration-700 preserve-3d ${flipped ? 'rotate-y-180' : ''}`}>
        
        {/* Front View */}
        <div className={`absolute inset-0 backface-hidden bg-white dark:bg-darkSurface rounded-3xl border-2 p-6 flex flex-col justify-between transition-all duration-500 shadow-xl ${isCompleted ? 'border-emerald-500 dark:border-emerald-500/50 shadow-emerald-500/10' : 'border-slate-200 dark:border-zinc-800'}`}>
          <div className="absolute top-4 right-4 opacity-10">
             {card.type === 'myth' ? <HelpCircle size={80} /> : <Zap size={80} />}
          </div>
          
          <div className="relative z-10">
            <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border mb-4 inline-block ${card.type === 'myth' ? 'bg-amber-100 text-amber-600 border-amber-200' : 'bg-blue-100 text-blue-600 border-blue-200'}`}>
              {card.type.replace('_', ' ')}
            </span>
            <h3 className="text-xl font-black text-slate-800 dark:text-white leading-tight uppercase tracking-tight">{card.title}</h3>
            <p className="text-slate-600 dark:text-slate-400 dark:text-slate-400 mt-4 font-medium italic">
               {card.type === 'myth' ? `"${card.myth}"` : card.fact}
            </p>
          </div>

          <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest text-slate-400">
             <span>Click to flip</span>
             {isCompleted && <span className="text-emerald-500 flex items-center gap-1"><CheckCircle2 size={12} /> Learned</span>}
          </div>
        </div>

        {/* Back View */}
        <div className={`absolute inset-0 backface-hidden bg-white dark:bg-darkSurface rounded-3xl border-2 p-6 flex flex-col justify-between rotate-y-180 transition-all duration-500 shadow-xl border-primary`}>
          <div className="relative z-10 space-y-4">
            <div className="flex justify-between items-start">
               <h4 className="text-xs font-black text-primary uppercase tracking-[0.2em]">The Reality</h4>
               <button 
                 onClick={handleSimplify}
                 disabled={simplifying}
                 className="flex items-center gap-1 text-[10px] font-black text-indigo-500 hover:text-indigo-400 uppercase tracking-widest bg-indigo-50 dark:bg-indigo-900/20 px-3 py-1 rounded-full transition-all"
               >
                  <Sparkles size={12} className={simplifying ? 'animate-spin' : ''} /> {simplifying ? 'Thinking...' : 'Explain Simply'}
               </button>
            </div>
            
            <p className="text-slate-800 dark:text-white font-bold leading-relaxed">
               {aiExplanation || card.explanation}
            </p>

            <div className="h-px bg-slate-100 dark:bg-zinc-800 w-full"></div>
            
            <div className="flex items-center gap-2">
               <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
               <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">+{card.xp} XP reward</span>
            </div>
          </div>

          <button 
            onClick={handleMarkLearned}
            disabled={isCompleted}
            className={`w-full py-4 rounded-2xl font-black uppercase tracking-widest text-xs transition-all ${isCompleted ? 'bg-emerald-500 text-white cursor-default' : 'bg-primary hover:bg-primary/90 text-white shadow-lg shadow-indigo-500/20'}`}
          >
             {isCompleted ? 'Completed' : 'Mark as Learned'}
          </button>
        </div>
      </div>
    </div>
  );
}
