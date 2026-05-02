import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { Trophy, Medal, Loader2 } from 'lucide-react';

export default function Leaderboard() {
  const [leaders, setLeaders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/leaderboard').then(res => {
      setLeaders(res.data);
      setLoading(false);
    }).catch(err => {
      console.error(err);
      setLoading(false);
    });
  }, []);

  if (loading) return <div className="bg-white dark:bg-darkSurface p-8 rounded-3xl border border-slate-200 dark:border-zinc-800 shadow-xl flex justify-center"><Loader2 className="animate-spin text-primary w-8 h-8" /></div>;

  return (
    <div className="bg-white dark:bg-darkSurface rounded-3xl border border-slate-200 dark:border-zinc-800 shadow-xl overflow-hidden flex flex-col">
      <div className="p-6 border-b border-slate-100 dark:border-zinc-800 flex items-center gap-3 bg-slate-50 dark:bg-darkSurface">
        <Trophy className="text-secondary w-6 h-6" />
        <h3 className="font-bold text-slate-800 dark:text-white text-xl">Top Citizens Leaderboard</h3>
      </div>
      <div className="p-4 flex-1">
        {leaders.map((user, idx) => (
          <div key={idx} className={`flex items-center justify-between p-4 rounded-2xl mb-2 transition-colors ${idx === 0 ? 'bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/30 shadow-sm' : 'hover:bg-slate-50 dark:hover:bg-zinc-800/50'}`}>
            <div className="flex items-center gap-4">
              <div className={`w-10 h-10 flex items-center justify-center font-bold rounded-full text-lg ${idx === 0 ? 'bg-amber-500 text-white shadow-lg shadow-amber-500/30' : idx === 1 ? 'bg-slate-300 text-slate-800' : idx === 2 ? 'bg-orange-400 text-white' : 'text-slate-600 dark:text-slate-400 font-medium bg-slate-100 dark:bg-zinc-800'}`}>
                {idx < 3 ? <Medal size={20} /> : idx + 1}
              </div>
              <div>
                <p className={`font-bold text-base md:text-lg ${idx === 0 ? 'text-amber-600 dark:text-amber-400' : 'text-slate-800 dark:text-white'}`}>{user.username}</p>
                <p className="text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider">Level {user.level} • {user.state}</p>
              </div>
            </div>
            <div className="font-black text-slate-900 dark:text-white bg-slate-100 dark:bg-zinc-800 px-4 py-2 rounded-xl border border-slate-200 dark:border-zinc-700">
              {user.points} <span className="text-xs font-semibold text-slate-400">XP</span>
            </div>
          </div>
        ))}
        {leaders.length === 0 && <p className="text-center text-slate-600 dark:text-slate-400 py-8 font-medium">No citizens ranked yet.</p>}
      </div>
    </div>
  );
}
