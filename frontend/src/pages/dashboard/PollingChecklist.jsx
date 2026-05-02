import React, { useState, useContext, useEffect } from 'react';
import { AppContext } from '../../context/AppContext';
import { ClipboardCheck, Clock, CheckSquare, Square, Zap, Info, Calendar, Bell, ChevronRight } from 'lucide-react';

export default function PollingChecklist() {
  const { userProfile, addPoints, updateKnowledge } = useContext(AppContext);
  const [tasks, setTasks] = useState([
    { id: 1, text: "Carry Original Photo ID (EPIC/Aadhaar/etc)", completed: false, xp: 10 },
    { id: 2, text: "Check your name in Voter List", completed: false, xp: 10 },
    { id: 3, text: "Locate Polling Booth address", completed: false, xp: 10 },
    { id: 4, text: "Carry Voter Information Slip", completed: false, xp: 10 },
    { id: 5, text: "Reach Polling Booth before 5 PM", completed: false, xp: 10 },
    { id: 6, text: "Verify symbol on VVPAT after voting", completed: false, xp: 10 },
    { id: 7, text: "Post your inked finger selfie!", completed: false, xp: 10 }
  ]);

  const [timeLeft, setTimeLeft] = useState({ days: 45, hours: 12, mins: 30 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.mins > 0) return { ...prev, mins: prev.mins - 1 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, mins: 59 };
        if (prev.days > 0) return { days: prev.days - 1, hours: 23, mins: 59 };
        return prev;
      });
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  const toggleTask = (id) => {
    setTasks(prev => {
      const newTasks = prev.map(t => {
        if (t.id === id && !t.completed) {
          addPoints(t.xp);
          return { ...t, completed: true };
        }
        return t;
      });
      
      const newProgress = Math.round((newTasks.filter(t => t.completed).length / newTasks.length) * 100);
      updateKnowledge('checklist', newProgress, 100);
      
      return newTasks;
    });
  };

  const progress = Math.round((tasks.filter(t => t.completed).length / tasks.length) * 100);

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-8 animate-in fade-in duration-700 pb-24 md:pb-8">
      {/* Header & Countdown */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
         <div className="lg:col-span-2 bg-white dark:bg-darkSurface p-8 rounded-[2rem] border border-slate-200 dark:border-zinc-800 shadow-xl flex flex-col md:flex-row items-center gap-8">
            <div className="w-20 h-20 bg-primary/10 rounded-3xl flex items-center justify-center text-primary">
               <ClipboardCheck size={40} />
            </div>
            <div className="flex-1 text-center md:text-left">
               <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">Polling Day Checklist</h1>
               <p className="text-slate-600 dark:text-slate-400 font-medium">Your personal roadmap for a smooth voting day</p>
               <div className="mt-6 flex items-center gap-3 justify-center md:justify-start">
                  <div className="h-2 w-48 bg-slate-100 dark:bg-darkBase rounded-full overflow-hidden border border-slate-200 dark:border-zinc-800">
                     <div className="h-full bg-primary transition-all duration-500" style={{ width: `${progress}%` }}></div>
                  </div>
                  <span className="text-xs font-black text-primary uppercase tracking-widest">{progress}% READY</span>
               </div>
            </div>
         </div>

         <div className="bg-slate-900 rounded-[2rem] p-8 text-white shadow-xl flex flex-col justify-center items-center relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10">
               <Calendar size={100} />
            </div>
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary mb-4">Election Countdown</span>
            <div className="flex gap-4">
               {[
                 { v: timeLeft.days, l: "Days" },
                 { v: timeLeft.hours, l: "Hrs" },
                 { v: timeLeft.mins, l: "Mins" }
               ].map((t, i) => (
                 <div key={i} className="text-center">
                    <div className="bg-white/5 border border-white/10 w-16 h-16 rounded-2xl flex items-center justify-center text-2xl font-black mb-1 backdrop-blur-md">
                       {t.v}
                    </div>
                    <span className="text-[10px] font-bold text-slate-600 dark:text-slate-400 uppercase">{t.l}</span>
                 </div>
               ))}
            </div>
         </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white dark:bg-darkSurface p-8 rounded-[2rem] border border-slate-200 dark:border-zinc-800 shadow-xl space-y-6">
           <h2 className="text-xl font-black text-slate-800 dark:text-white uppercase tracking-tight flex items-center gap-3">
              <CheckSquare className="text-primary" size={24} /> Mission Tasks
           </h2>
           <div className="space-y-3">
              {tasks.map(task => (
                <div 
                  key={task.id} 
                  onClick={() => toggleTask(task.id)}
                  className={`p-6 rounded-2xl border transition-all cursor-pointer flex items-center justify-between group ${task.completed ? 'bg-emerald-50 dark:bg-emerald-900/10 border-emerald-200 dark:border-emerald-900/30' : 'bg-slate-50 dark:bg-darkBase border-slate-200 dark:border-zinc-800 hover:border-primary'}`}
                >
                   <div className="flex items-center gap-4">
                      <div className={`transition-colors ${task.completed ? 'text-emerald-500' : 'text-slate-300 group-hover:text-primary'}`}>
                         {task.completed ? <CheckSquare size={24} /> : <Square size={24} />}
                      </div>
                      <span className={`font-bold text-sm ${task.completed ? 'text-emerald-700 dark:text-emerald-400 line-through opacity-60' : 'text-slate-700 dark:text-slate-200'}`}>
                         {task.text}
                      </span>
                   </div>
                   {!task.completed && (
                     <div className="flex items-center gap-2">
                        <Zap size={14} className="text-amber-500" />
                        <span className="text-[10px] font-black text-amber-600 uppercase">+{task.xp} XP</span>
                     </div>
                   )}
                </div>
              ))}
           </div>
           
           <div className="p-6 bg-slate-50 dark:bg-darkBase rounded-2xl border border-dashed border-slate-300 dark:border-zinc-700 flex items-center gap-4">
              <div className="bg-white dark:bg-darkSurface p-3 rounded-xl shadow-md">
                 <Bell size={20} className="text-primary" />
              </div>
              <div className="flex-1">
                 <h4 className="text-sm font-bold text-slate-800 dark:text-white">Enable Election Day Alerts</h4>
                 <p className="text-xs text-slate-600 dark:text-slate-400">We'll notify you 24 hours before polling starts.</p>
              </div>
              <button className="bg-primary text-white px-4 py-2 rounded-xl text-xs font-bold shadow-lg shadow-indigo-500/20">Notify Me</button>
           </div>
        </div>

        <div className="space-y-6">
           <div className="bg-white dark:bg-darkSurface p-8 rounded-3xl border border-slate-200 dark:border-zinc-800 shadow-xl">
              <h3 className="font-black text-slate-800 dark:text-white text-xs uppercase tracking-[0.2em] mb-6">Expert Tips</h3>
              <div className="space-y-6">
                 {[
                   { t: "Best Time to Vote", d: "Early morning (7 AM - 9 AM) or mid-afternoon (2 PM - 4 PM) usually has the shortest queues.", c: "text-blue-500", b: "bg-blue-50 dark:bg-blue-900/20" },
                   { t: "Digital ID", d: "Keep a digital copy of your Voter ID in Digilocker as a backup.", c: "text-purple-500", b: "bg-purple-50 dark:bg-purple-900/20" },
                   { t: "No Phones Inside", d: "Remember, mobile phones and cameras are strictly prohibited inside the voting compartment.", c: "text-red-500", b: "bg-red-50 dark:bg-red-900/20" }
                 ].map((tip, i) => (
                   <div key={i} className="flex gap-4">
                      <div className={`w-10 h-10 rounded-xl ${tip.b} flex items-center justify-center ${tip.c} flex-shrink-0 shadow-sm`}>
                         <Info size={20} />
                      </div>
                      <div>
                         <h4 className="text-sm font-bold text-slate-800 dark:text-white">{tip.t}</h4>
                         <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">{tip.d}</p>
                      </div>
                   </div>
                 ))}
              </div>
           </div>

           <div className="bg-gradient-to-br from-amber-400 to-orange-600 rounded-3xl p-8 text-white shadow-xl group cursor-pointer overflow-hidden relative" onClick={() => addPoints(50)}>
              <div className="absolute -top-4 -right-4 w-32 h-32 bg-white/20 blur-3xl rounded-full transition-transform group-hover:scale-150"></div>
              <h4 className="text-xs font-black uppercase tracking-widest mb-2">Grand Mission</h4>
              <h3 className="text-2xl font-black leading-tight mb-4 tracking-tight">Complete All Tasks</h3>
              <div className="flex items-center gap-2">
                 <Zap size={20} className="fill-white" />
                 <span className="text-sm font-black uppercase">+50 BONUS XP</span>
              </div>
              <ChevronRight size={40} className="absolute bottom-4 right-4 opacity-20 group-hover:translate-x-2 transition-transform" />
           </div>
        </div>
      </div>
    </div>
  );
}
