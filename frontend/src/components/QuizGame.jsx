import React, { useState, useEffect, useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { Loader2, Award } from 'lucide-react';
import api from '../services/api';

export default function QuizGame() {
  const [dailyData, setDailyData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const { addPoints, triggerConfetti, username } = useContext(AppContext);

  const fetchContent = async () => {
    setLoading(true);
    try {
      const res = await api.get(`/api/daily-drop/${username}`);
      setDailyData(res.data);
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (username) fetchContent();
  }, [username]);

  const handleAnswer = (index) => {
    setSelected(index);
    setShowExplanation(true);
  };

  const nextQuestion = () => {
    if (currentQ < dailyData.daily_quiz.length - 1) {
      setCurrentQ(currentQ + 1);
      setSelected(null);
      setShowExplanation(false);
    } else {
      let earned = dailyData.daily_quest?.xp_reward || 100;
      addPoints(earned);
      triggerConfetti();
      setDailyData(null);
    }
  };

  if (loading) return <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 flex justify-center mt-4"><Loader2 className="animate-spin text-indigo-500 w-8 h-8" /></div>;
  if (!dailyData || !dailyData.daily_quiz || currentQ >= dailyData.daily_quiz.length) return (
      <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg border border-slate-200 dark:border-slate-700 text-center py-10 mt-4">
          <Award className="w-16 h-16 text-indigo-500 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Daily Quests Completed!</h3>
          <p className="text-slate-600 dark:text-slate-400">Come back tomorrow for new challenges.</p>
      </div>
  );

  const q = dailyData.daily_quiz[currentQ];

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg border border-slate-200 dark:border-slate-700 transition-colors duration-300 mt-4">
      <div className="flex justify-between items-center mb-4 border-b border-slate-200 dark:border-slate-700 pb-4">
          <div>
            <h4 className="font-bold text-indigo-500 text-sm tracking-wide">TODAY'S QUEST: {dailyData.daily_quest?.title || "Trivia Champion"}</h4>
            <p className="text-slate-600 dark:text-slate-400 text-xs">{dailyData.daily_quest?.description || "Complete the daily quiz"} • {dailyData.daily_quest?.xp_reward || 100} XP</p>
          </div>
      </div>
      <span className="text-xs font-bold uppercase tracking-wider text-indigo-500 dark:text-indigo-400 mb-2 block">
        Question {currentQ + 1} of {dailyData.daily_quiz.length}
      </span>
      <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-6 leading-relaxed">
        {q.question}
      </h3>

      <div className="space-y-3 mb-6">
        {q.options.map((opt, idx) => {
          let btnClass = "border-slate-200 dark:border-slate-600 hover:border-indigo-500 dark:hover:border-indigo-400 text-slate-700 dark:text-slate-200";
          
          if (showExplanation) {
            if (idx === q.correct_index) btnClass = "bg-green-100 border-green-500 text-green-800 dark:bg-green-900/30 dark:border-green-400 dark:text-green-300";
            else if (idx === selected) btnClass = "bg-red-100 border-red-500 text-red-800 dark:bg-red-900/30 dark:border-red-400 dark:text-red-300";
            else btnClass = "opacity-50 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400";
          }

          return (
            <button
              key={idx}
              disabled={showExplanation}
              onClick={() => handleAnswer(idx)}
              className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-200 ${btnClass} font-medium`}
            >
              {opt}
            </button>
          );
        })}
      </div>

      {showExplanation && (
        <div className="animate-fade-in bg-slate-50 dark:bg-slate-900 p-4 rounded-lg border border-slate-200 dark:border-slate-700 mb-4">
          <p className="text-sm text-slate-700 dark:text-slate-300"><span className="font-bold text-indigo-500">Explanation:</span> {q.explanation}</p>
        </div>
      )}

      {showExplanation && (
        <button onClick={nextQuestion} className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-xl transition-colors shadow-md">
          {currentQ < dailyData.daily_quiz.length - 1 ? "Next Question" : "Claim XP Reward"}
        </button>
      )}
    </div>
  );
}
