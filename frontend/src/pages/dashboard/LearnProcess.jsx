import React, { useState, useContext, useEffect } from 'react';
import { AppContext } from '../../context/AppContext';
import { BookOpen, Play, CheckCircle2, Award, Zap, ChevronRight, HelpCircle, Gamepad2 } from 'lucide-react';
import api from '../../services/api';
import VideoModal from '../../components/VideoModal';
import EVMSimulator from '../../components/EVMSimulator';

export default function LearnProcess() {
  const { userProfile, addPoints, updateKnowledge, completeVideoTask } = useContext(AppContext);
  const [activeModule, setActiveModule] = useState(0);
  const [quizStarted, setQuizStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [videos, setVideos] = useState([]);
  const [modal, setModal] = useState({ open: false, url: '', title: '' });

  useEffect(() => {
    api.get('/videos/learn').then(res => setVideos(res.data)).catch(console.error);
  }, []);

  const handleWatchCurrent = () => {
    const currentMod = modules[activeModule];
    const vid = videos.find(v => v.id.includes(currentMod.id)) || videos[activeModule];
    if (vid && vid.url) {
      setModal({ open: true, url: vid.url, title: vid.title });
      if (!userProfile.watched_videos?.includes(vid.id)) {
        completeVideoTask(vid.id, vid.xp || 20);
      }
    } else {
      addPoints(5); // Fallback XP
    }
  };

  const modules = [
    { title: "How EVM Works", desc: "Understand the Electronic Voting Machine architecture.", id: "evm", xp: 20 },
    { title: "How VVPAT Works", desc: "The Voter Verifiable Paper Audit Trail explanation.", id: "vvpat", xp: 20 },
    { title: "What is NOTA", desc: "None of the Above - your right to reject.", id: "nota", xp: 20 },
    { title: "The Voting Flow", desc: "Step-by-step process inside the polling booth.", id: "flow", xp: 20 }
  ];

  const quiz = [
    { q: "What does EVM stand for?", a: ["Election Voter Machine", "Electronic Voting Machine", "Electric Vote Monitor", "Easy Vote Method"], correct: 1 },
    { q: "VVPAT allows you to...", a: ["Vote twice", "See a paper slip of your vote", "Vote from home", "Cancel someone else's vote"], correct: 1 },
    { q: "The ink is applied on which finger?", a: ["Thumb", "Middle Finger", "Left Index Finger", "Right Little Finger"], correct: 2 },
    { q: "What is the full form of NOTA?", a: ["No One To Accept", "None Of The Above", "New Option To All", "National Option To Authorize"], correct: 1 },
    { q: "Maximum number of candidates an EVM can support?", a: ["16", "32", "64", "No limit"], correct: 2 }
  ];

  const handleAnswer = (idx) => {
    if (idx === quiz[currentQuestion].correct) setScore(score + 1);
    
    if (currentQuestion < quiz.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResult(true);
      updateKnowledge('learn', score + (idx === quiz[currentQuestion].correct ? 1 : 0), quiz.length);
    }
  };

  const resetQuiz = () => {
    setQuizStarted(false);
    setCurrentQuestion(0);
    setScore(0);
    setShowResult(false);
  };

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-8 animate-in fade-in duration-700 pb-24 md:pb-8">
      {/* Header */}
      <div className="bg-white dark:bg-darkSurface p-8 rounded-[2rem] border border-slate-200 dark:border-zinc-800 shadow-xl flex flex-col md:flex-row justify-between items-center gap-8 text-center md:text-left">
         <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center text-white shadow-lg shadow-indigo-500/30">
               <BookOpen size={32} />
            </div>
            <div>
               <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">Interactive Learning</h1>
               <p className="text-slate-600 dark:text-slate-400 font-medium">Master the election process and earn XP</p>
            </div>
         </div>
          <div className="bg-slate-50 dark:bg-darkBase px-6 py-4 rounded-2xl border border-slate-200 dark:border-zinc-800">
             <span className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Knowledge Level</span>
             <div className="flex items-center gap-3">
                <div className="h-3 w-32 bg-slate-200 dark:bg-zinc-800 rounded-full overflow-hidden">
                   <div className="h-full bg-primary" style={{ width: `${userProfile.knowledge?.learn || 0}%` }}></div>
                </div>
                <span className="text-sm font-black text-primary">{userProfile.knowledge?.learn || 0}%</span>
             </div>
          </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-12">
          {/* Tutorials Section */}
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {modules.map((mod, i) => (
                <div 
                  key={mod.id} 
                  onClick={() => { setActiveModule(i); addPoints(5); }}
                  className={`p-6 rounded-3xl border-2 transition-all cursor-pointer group ${activeModule === i ? 'bg-primary border-primary text-white shadow-xl translate-y-[-4px]' : 'bg-white dark:bg-darkSurface border-slate-200 dark:border-zinc-800 hover:border-primary/50'}`}
                >
                    <div className="flex justify-between items-start mb-4">
                      <div className={`p-3 rounded-xl ${activeModule === i ? 'bg-white/20' : 'bg-slate-50 dark:bg-darkBase'}`}>
                          <Play size={20} className={activeModule === i ? 'text-white' : 'text-primary'} />
                      </div>
                      <span className={`text-[10px] font-black uppercase tracking-widest ${activeModule === i ? 'text-indigo-200' : 'text-slate-400'}`}>+{mod.xp} XP</span>
                    </div>
                    <h3 className="font-black uppercase tracking-tight text-sm mb-2">{mod.title}</h3>
                    <p className={`text-xs leading-relaxed ${activeModule === i ? 'text-indigo-100' : 'text-slate-600 dark:text-slate-400'}`}>{mod.desc}</p>
                </div>
              ))}
            </div>

            <div className="bg-white dark:bg-darkSurface p-8 rounded-[2rem] border border-slate-200 dark:border-zinc-800 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-5">
                  <Zap size={120} className="text-primary" />
              </div>
              <div className="relative z-10 space-y-6">
                  <div className="flex items-center gap-3 text-primary uppercase font-black text-xs tracking-[0.2em]">
                    <Zap size={16} /> Now Learning
                  </div>
                  <h2 className="text-3xl font-black text-slate-800 dark:text-white uppercase tracking-tight">{modules[activeModule].title}</h2>
                  <div className="aspect-video bg-slate-900 rounded-3xl flex items-center justify-center border-4 border-slate-100 dark:border-zinc-800 shadow-2xl relative group cursor-pointer" onClick={handleWatchCurrent}>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                    <Play size={64} className="text-white relative z-10 group-hover:scale-110 transition-transform drop-shadow-2xl" />
                    <div className="absolute bottom-8 left-8 text-white z-10">
                        <p className="text-sm font-black uppercase tracking-widest mb-1 opacity-70">Video Guide</p>
                        <h4 className="text-xl font-bold">{modules[activeModule].title} (Animated)</h4>
                    </div>
                  </div>
              </div>
            </div>
          </div>

          {/* EVM Simulator Section */}
          <div className="animate-in slide-in-from-bottom duration-700">
             <div className="mb-6 flex justify-between items-end">
                <div>
                   <h2 className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tight flex items-center gap-3">
                      <Gamepad2 className="text-emerald-500" /> EVM Simulator
                   </h2>
                   <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">Practice the official voting procedure safely.</p>
                </div>
                <div className="bg-emerald-500/10 text-emerald-500 px-4 py-2 rounded-xl text-xs font-black border border-emerald-500/20">
                   +50 XP BONUS
                </div>
             </div>
             <EVMSimulator onComplete={() => updateKnowledge('learn', 100, 100)} />
          </div>
        </div>

        {/* Quiz Sidebar */}
        <div className="space-y-6">
           <div className={`bg-white dark:bg-darkSurface p-8 rounded-[2rem] border-2 shadow-xl transition-all ${quizStarted ? 'border-primary' : 'border-slate-200 dark:border-zinc-800'}`}>
              {!quizStarted ? (
                <div className="text-center py-6 space-y-6">
                   <div className="w-20 h-20 bg-amber-100 dark:bg-amber-900/20 rounded-full flex items-center justify-center mx-auto text-amber-500">
                      <HelpCircle size={40} />
                   </div>
                   <div>
                      <h3 className="text-xl font-black text-slate-800 dark:text-white uppercase tracking-tight">Voter Quiz</h3>
                      <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">Test your knowledge and earn <span className="text-primary font-bold">+40 XP</span></p>
                   </div>
                   <button 
                     onClick={() => setQuizStarted(true)}
                     className="w-full btn-primary py-4 rounded-2xl font-black uppercase tracking-widest text-sm shadow-lg shadow-indigo-500/20"
                   >
                     Start Challenge
                   </button>
                </div>
              ) : showResult ? (
                <div className="text-center py-6 space-y-6 animate-in zoom-in-95">
                   <div className="w-20 h-20 bg-emerald-100 dark:bg-emerald-900/20 rounded-full flex items-center justify-center mx-auto text-emerald-500">
                      <Award size={40} />
                   </div>
                   <div>
                      <h3 className="text-2xl font-black text-slate-800 dark:text-white uppercase">Result</h3>
                      <p className="text-slate-600 dark:text-slate-400 mt-2 font-bold text-3xl">{score} / {quiz.length}</p>
                   </div>
                   <div className="p-4 bg-slate-50 dark:bg-darkBase rounded-2xl text-xs font-bold text-slate-600 dark:text-slate-400">
                      {score >= 3 ? "Excellent! You are a Smart Voter." : "Good effort. Review the modules to improve."}
                   </div>
                   <button 
                     onClick={resetQuiz}
                     className="w-full bg-slate-800 dark:bg-zinc-800 text-white py-4 rounded-2xl font-black uppercase tracking-widest text-sm"
                   >
                     Try Again
                   </button>
                </div>
              ) : (
                <div className="space-y-6 animate-in slide-in-from-right-10">
                   <div className="flex justify-between items-center">
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Question {currentQuestion + 1}/{quiz.length}</span>
                      <div className="flex gap-1">
                         {quiz.map((_, i) => (
                           <div key={i} className={`h-1 w-4 rounded-full ${i === currentQuestion ? 'bg-primary' : i < currentQuestion ? 'bg-emerald-500' : 'bg-slate-200 dark:bg-zinc-800'}`}></div>
                         ))}
                      </div>
                   </div>
                   <h3 className="text-lg font-black text-slate-800 dark:text-white leading-tight">{quiz[currentQuestion].q}</h3>
                   <div className="space-y-3">
                      {quiz[currentQuestion].a.map((ans, i) => (
                        <button 
                          key={i}
                          onClick={() => handleAnswer(i)}
                          className="w-full p-4 rounded-2xl bg-slate-50 dark:bg-darkBase border border-slate-200 dark:border-zinc-800 text-left text-sm font-bold text-slate-600 dark:text-slate-300 hover:border-primary hover:bg-primary/5 transition-all flex justify-between items-center group"
                        >
                           {ans}
                           <ChevronRight size={16} className="text-slate-300 group-hover:text-primary transition-colors" />
                        </button>
                      ))}
                   </div>
                </div>
              )}
           </div>

           <div className="bg-slate-900 rounded-3xl p-8 text-white shadow-xl relative overflow-hidden group">
              <Zap className="absolute -bottom-4 -right-4 w-32 h-32 opacity-10" />
              <h4 className="text-xs font-black uppercase tracking-[0.2em] text-primary mb-4">Mastery Progress</h4>
              <h3 className="text-xl font-bold mb-4">Complete Your Journey</h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-6">Finish all 4 modules and the quiz to reach 100% mastery in this stage.</p>
              <div className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/10">
                 <span className="text-[10px] font-bold uppercase">Status</span>
                 <span className={`text-[10px] font-black uppercase ${userProfile.knowledge?.learn >= 100 ? 'text-emerald-400' : 'text-amber-400'}`}>
                    {userProfile.knowledge?.learn >= 100 ? '100% COMPLETE' : 'IN PROGRESS'}
                 </span>
              </div>
           </div>
        </div>
      </div>
      <VideoModal 
        isOpen={modal.open} 
        onClose={() => setModal({ ...modal, open: false })}
        videoUrl={modal.url}
        title={modal.title}
      />
    </div>
  );
}
