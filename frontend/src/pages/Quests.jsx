import React, { useContext } from 'react';
import QuizGame from '../components/QuizGame';
import EVMSimulator from '../components/EVMSimulator';
import { AppContext } from '../context/AppContext';

export default function Quests() {
  const { updateKnowledge } = useContext(AppContext);

  return (
    <div className="p-4 md:p-8 max-w-[1200px] mx-auto min-h-[calc(100vh-100px)] space-y-12 pb-24">
      <div>
        <h1 className="text-3xl font-black text-slate-900 dark:text-white uppercase tracking-tight mb-2">The Arena</h1>
        <p className="text-slate-600 dark:text-slate-400 font-medium italic">Master civic challenges and earn ultimate XP.</p>
      </div>

      <div className="grid grid-cols-1 gap-12">
        <section>
          <h2 className="text-xl font-black text-slate-800 dark:text-white uppercase tracking-tight mb-6 flex items-center gap-3">
             <span className="w-8 h-8 bg-emerald-500 text-white rounded-lg flex items-center justify-center text-xs">01</span>
             Electronic Voting Simulator
          </h2>
          <EVMSimulator onComplete={() => updateKnowledge('learn', 100, 100)} />
        </section>

        <section>
          <h2 className="text-xl font-black text-slate-800 dark:text-white uppercase tracking-tight mb-6 flex items-center gap-3">
             <span className="w-8 h-8 bg-primary text-white rounded-lg flex items-center justify-center text-xs">02</span>
             Civic Knowledge Quiz
          </h2>
          <div className="max-w-2xl">
            <QuizGame />
          </div>
        </section>
      </div>
    </div>
  );
}
