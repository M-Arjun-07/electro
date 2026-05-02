import React, { useState, useEffect, useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { Search, Filter, BookOpen, Zap, Award, ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import KnowledgeCard from '../components/KnowledgeCard';
import cardsData from '../data/knowledgeCards.json';

export default function KnowledgeHub() {
  const { userProfile } = useContext(AppContext);
  const navigate = useNavigate();
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [cards, setCards] = useState(cardsData);

  const completedCount = userProfile.learned_cards?.length || 0;
  const totalCount = cards.length;
  const progress = Math.round((completedCount / totalCount) * 100) || 0;
  const earnedXp = completedCount * 5;

  const filteredCards = cards.filter(card => {
    const matchesFilter = filter === 'all' || card.type === filter;
    const matchesSearch = card.title.toLowerCase().includes(search.toLowerCase()) || 
                          card.explanation.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const categories = [
    { id: 'all', label: 'All Cards' },
    { id: 'myth', label: 'Myth Busters' },
    { id: 'fact', label: 'Quick Facts' },
    { id: 'process', label: 'Voting Process' },
    { id: 'rule', label: 'Rights & Rules' }
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-darkBase pb-24 md:pb-12">
      {/* Sticky Header */}
      <div className="bg-white dark:bg-darkSurface border-b border-slate-200 dark:border-zinc-800 sticky top-0 z-30 px-4 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <button onClick={() => navigate('/dashboard')} className="flex items-center gap-2 text-slate-600 dark:text-slate-400 hover:text-primary transition-colors font-bold text-sm">
            <ChevronLeft size={20} /> Back to Dashboard
          </button>
          <div className="flex items-center gap-4">
            <div className="text-right hidden md:block">
              <span className="block text-[10px] font-black text-slate-400 uppercase tracking-widest">Total Hub XP</span>
              <span className="text-lg font-black text-primary">{earnedXp} XP</span>
            </div>
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white shadow-lg">
              <Award size={20} />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-4 md:p-8 space-y-8">
        {/* Hero Section */}
        <div className="bg-gradient-to-br from-primary via-indigo-700 to-indigo-900 rounded-[2.5rem] p-8 md:p-12 text-white shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white opacity-5 rounded-full -translate-y-1/2 translate-x-1/2 blur-[100px] pointer-events-none"></div>
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-white/20 backdrop-blur-md p-3 rounded-2xl border border-white/10">
                <BookOpen size={32} />
              </div>
              <div>
                <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tight">Knowledge Hub</h1>
                <p className="text-indigo-200 font-medium text-lg">Learn, Verify, and Become a Smart Voter</p>
              </div>
            </div>

            <div className="max-w-xl bg-black/20 backdrop-blur-xl p-6 rounded-3xl border border-white/10">
              <div className="flex justify-between mb-2">
                <span className="text-xs font-black uppercase tracking-widest text-indigo-200">Civic Knowledge Mastery</span>
                <span className="text-xs font-black uppercase tracking-widest text-white">{progress}%</span>
              </div>
              <div className="h-4 bg-white/10 rounded-full overflow-hidden p-1">
                <div 
                  className="h-full bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-full transition-all duration-1000 shadow-[0_0_15px_rgba(52,211,153,0.5)]" 
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
              <p className="mt-4 text-xs font-bold text-indigo-300 uppercase tracking-wider">
                {completedCount} of {totalCount} concepts mastered
              </p>
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="flex flex-col md:flex-row gap-6 items-center justify-between bg-white dark:bg-darkSurface p-6 rounded-3xl border border-slate-200 dark:border-zinc-800 shadow-xl">
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setFilter(cat.id)}
                className={`px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${filter === cat.id ? 'bg-primary text-white shadow-lg shadow-indigo-500/20' : 'bg-slate-50 dark:bg-darkBase text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-zinc-800'}`}
              >
                {cat.label}
              </button>
            ))}
          </div>
          
          <div className="relative w-full md:w-80">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Search concepts..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-slate-50 dark:bg-darkBase border border-slate-200 dark:border-zinc-800 rounded-2xl py-3 pl-12 pr-4 text-sm font-bold focus:outline-none focus:border-primary transition-colors"
            />
          </div>
        </div>

        {/* Card Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredCards.map(card => (
            <KnowledgeCard key={card.id} card={card} />
          ))}
        </div>

        {filteredCards.length === 0 && (
          <div className="text-center py-24 bg-white dark:bg-darkSurface rounded-[3rem] border border-dashed border-slate-200 dark:border-zinc-800">
             <Filter size={48} className="mx-auto text-slate-300 mb-4" />
             <h3 className="text-xl font-black text-slate-800 dark:text-white uppercase tracking-tight">No Cards Found</h3>
             <p className="text-slate-600 dark:text-slate-400 font-medium">Try adjusting your filters or search term.</p>
          </div>
        )}
      </div>
    </div>
  );
}
