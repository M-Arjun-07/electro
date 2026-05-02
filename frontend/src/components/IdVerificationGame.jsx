import React, { useState, useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { ShieldCheck, Check, X } from 'lucide-react';

const DOCUMENTS = [
  { id: 1, name: 'Voter ID (EPIC)', valid: true },
  { id: 2, name: 'Gym Membership', valid: false },
  { id: 3, name: 'Aadhaar Card', valid: true },
  { id: 4, name: 'Supermarket Points Card', valid: false },
  { id: 5, name: 'PAN Card', valid: true },
];

export default function IdVerificationGame() {
  const [items, setItems] = useState(DOCUMENTS);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const { setUserProfile, triggerConfetti } = useContext(AppContext);

  const handleGuess = (isValidGuess) => {
    const currentItem = items[currentIndex];
    let newScore = score;
    if (currentItem.valid === isValidGuess) {
      newScore += 50;
      setScore(newScore);
    }
    
    if (currentIndex < items.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setGameOver(true);
      setUserProfile(prev => ({...prev, points: (prev.points || 0) + newScore}));
      if (newScore > 0) triggerConfetti();
    }
  };

  return (
    <div className="glass-card p-4 md:p-6 border-t-4 border-secondary mt-2 md:mt-4">
      <h2 className="text-lg md:text-xl font-bold mb-2 md:mb-4 neon-text-secondary flex items-center gap-2">
        <ShieldCheck /> Security Check Minigame
      </h2>
      <p className="text-slate-600 dark:text-slate-400 mb-4 text-xs md:text-sm">Approve valid Photo IDs for voting. Reject the fakes!</p>
      
      {!gameOver ? (
        <div className="flex flex-col items-center">
          <div className="bg-slate-100 dark:bg-slate-800 border-2 border-slate-300 dark:border-slate-600 rounded-xl p-6 md:p-8 mb-4 md:mb-6 w-full text-center transform transition-transform hover:scale-105 shadow-md">
            <h3 className="text-xl md:text-2xl font-bold text-slate-800 dark:text-white">{items[currentIndex].name}</h3>
          </div>
          <div className="flex gap-2 md:gap-4 w-full">
            <button onClick={() => handleGuess(false)} className="flex-1 bg-red-100 hover:bg-red-200 dark:bg-red-500/20 dark:hover:bg-red-500/40 border border-red-500 text-red-600 dark:text-red-400 p-2 md:p-3 rounded-xl flex items-center justify-center gap-1 md:gap-2 transition-colors text-sm md:text-base font-bold">
              <X size={20} /> Reject
            </button>
            <button onClick={() => handleGuess(true)} className="flex-1 bg-green-100 hover:bg-green-200 dark:bg-green-500/20 dark:hover:bg-green-500/40 border border-green-500 text-green-700 dark:text-green-400 p-2 md:p-3 rounded-xl flex items-center justify-center gap-1 md:gap-2 transition-colors text-sm md:text-base font-bold">
              <Check size={20} /> Approve
            </button>
          </div>
          <p className="mt-3 md:mt-4 text-slate-600 dark:text-slate-400 text-xs md:text-sm font-semibold">{currentIndex + 1} of {items.length}</p>
        </div>
      ) : (
        <div className="text-center py-2 md:py-4">
          <h3 className="text-lg md:text-xl font-bold text-slate-800 dark:text-white mb-2">Inspection Complete!</h3>
          <p className="text-primary font-bold text-lg md:text-xl mb-4">+{score} XP Earned</p>
          <button onClick={() => { setCurrentIndex(0); setScore(0); setGameOver(false); }} className="text-secondary hover:text-slate-800 dark:hover:text-white underline text-sm transition-colors">
            Play Again
          </button>
        </div>
      )}
    </div>
  );
}
