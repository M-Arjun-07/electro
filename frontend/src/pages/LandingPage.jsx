import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, Zap, Sword, Star, Github, Linkedin, ChevronRight, BookOpen, MapPin, Search, Compass } from 'lucide-react';

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-darkBase text-slate-900 dark:text-white selection:bg-primary selection:text-white overflow-x-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[70%] md:w-[40%] h-[40%] bg-primary/20 blur-[80px] md:blur-[120px] rounded-full animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[70%] md:w-[40%] h-[40%] bg-indigo-500/20 blur-[80px] md:blur-[120px] rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Navigation */}
      <nav className="relative z-50 flex justify-between items-center px-4 md:px-12 py-6 md:py-8 max-w-7xl mx-auto">
        <div className="flex items-center gap-2 md:gap-3">
          <div className="w-8 h-8 md:w-10 md:h-10 bg-primary rounded-lg md:rounded-xl flex items-center justify-center text-white shadow-lg shadow-indigo-500/30">
            <ShieldCheck size={20} />
          </div>
          <span className="font-black text-xl md:text-2xl tracking-tighter uppercase">Voter <span className="text-primary">Campaign</span></span>
        </div>
        <button 
          onClick={() => navigate('/login')}
          className="btn-primary px-5 md:px-8 py-2.5 md:py-3 rounded-full font-bold text-[10px] md:text-sm uppercase tracking-widest shadow-xl shadow-indigo-500/20 hover:scale-105 transition-all"
        >
          Access HQ
        </button>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 pt-10 md:pt-20 pb-20 md:pb-32 px-4 md:px-12 max-w-7xl mx-auto text-center md:text-left flex flex-col md:flex-row items-center gap-10 md:gap-16">
        <div className="flex-1 space-y-6 md:space-y-8 animate-in slide-in-from-left duration-1000">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-primary text-[10px] font-black uppercase tracking-[0.2em]">
            <Star size={12} className="fill-primary" /> The Ultimate Civic Experience
          </div>
          <h1 className="text-5xl md:text-8xl font-black leading-[0.95] tracking-tighter uppercase">
            Empowering <br className="hidden md:block" />
            <span className="text-primary">Democracy</span> <br className="hidden md:block" />
            Through Play.
          </h1>
          <p className="text-base md:text-xl text-slate-600 dark:text-slate-300 max-w-2xl font-medium leading-relaxed">
            The Voter's Campaign is a next-gen gamified platform designed to turn the complex electoral process into an engaging journey. Learn, track, and master your voting rights with AI guidance.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 pt-4 items-center justify-center md:justify-start">
            <button 
              onClick={() => navigate('/login')}
              className="w-full sm:w-auto px-10 py-5 bg-primary text-slate-900 rounded-2xl font-black uppercase tracking-widest text-sm flex items-center justify-center gap-3 hover:bg-cyan-400 hover:shadow-[0_0_30px_rgba(34,211,238,0.4)] transition-all group"
            >
              Start Journey <ChevronRight className="group-hover:translate-x-1 transition-transform" />
            </button>
            <div className="flex items-center gap-4 px-6 py-4 bg-white dark:bg-darkSurface border border-slate-200 dark:border-zinc-800 rounded-2xl shadow-lg w-full sm:w-auto justify-center">
                <div className="flex -space-x-3">
                   {[1,2,3,4].map(i => (
                     <div key={i} className="w-8 h-8 rounded-full border-2 border-white dark:border-darkSurface bg-slate-200 dark:bg-zinc-800 flex items-center justify-center overflow-hidden">
                        <img src={`https://i.pravatar.cc/100?u=${i}`} alt="user" className="w-full h-full object-cover" />
                     </div>
                   ))}
                </div>
                <span className="text-[10px] font-bold text-slate-600 dark:text-slate-400 dark:text-slate-400 uppercase tracking-tighter">Joined by 2k+ Voters</span>
            </div>
          </div>
        </div>

        <div className="flex-1 w-full relative animate-in slide-in-from-bottom md:slide-in-from-right zoom-in-95 duration-1000">
           <div className="relative w-full aspect-square max-w-[350px] md:max-w-[500px] mx-auto">
              <div className="absolute inset-0 bg-gradient-to-br from-primary to-indigo-600 rounded-[2rem] md:rounded-[3rem] rotate-6 opacity-20 animate-pulse"></div>
              <div className="absolute inset-0 bg-white dark:bg-darkSurface rounded-[2rem] md:rounded-[3rem] border border-slate-200 dark:border-zinc-800 shadow-2xl overflow-hidden p-6 md:p-8 flex flex-col justify-between">
                  <div className="flex justify-between items-center">
                     <div className="w-10 h-10 md:w-12 md:h-12 bg-primary/10 rounded-lg md:rounded-xl flex items-center justify-center text-primary">
                        <Zap size={20} />
                     </div>
                     <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Status: Active</span>
                  </div>
                  <div className="space-y-3 md:space-y-4">
                     <div className="h-3 md:h-4 w-[80%] bg-slate-100 dark:bg-zinc-900 rounded-full"></div>
                     <div className="h-3 md:h-4 w-[60%] bg-slate-100 dark:bg-zinc-900 rounded-full"></div>
                     <div className="h-10 md:h-12 w-full bg-primary/20 rounded-xl md:rounded-2xl border-2 border-primary/30 flex items-center px-4 gap-3">
                        <div className="w-5 h-5 md:w-6 md:h-6 bg-primary rounded"></div>
                        <div className="h-1.5 md:h-2 flex-1 bg-primary/40 rounded-full"></div>
                     </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3 md:gap-4">
                     <div className="h-20 md:h-24 bg-slate-50 dark:bg-darkBase rounded-xl md:rounded-2xl border border-slate-100 dark:border-zinc-800"></div>
                     <div className="h-20 md:h-24 bg-slate-50 dark:bg-darkBase rounded-xl md:rounded-2xl border border-slate-100 dark:border-zinc-800"></div>
                  </div>
              </div>
           </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="relative z-10 py-16 md:py-32 px-4 md:px-12 max-w-7xl mx-auto bg-white/50 dark:bg-darkSurface/30 backdrop-blur-3xl rounded-[2.5rem] md:rounded-[4rem] border border-slate-200 dark:border-zinc-800">
        <div className="text-center mb-12 md:mb-20 space-y-4">
          <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight leading-tight">The <span className="text-primary">Ecosystem</span></h2>
          <p className="text-sm md:text-base text-slate-600 dark:text-slate-400 font-medium max-w-xl mx-auto px-4">Everything you need to navigate the world's largest democracy, all in one premium hub.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {[
            { icon: <Compass className="text-blue-500" />, title: "Interactive Journey", desc: "A 7-stage walkthrough from registration to rewards." },
            { icon: <Zap className="text-amber-500" />, title: "AI Game Master", desc: "Real-time guidance powered by Gemini 2.5 Flash." },
            { icon: <BookOpen className="text-emerald-500" />, title: "Knowledge Hub", desc: "Bite-sized cards to master election laws in minutes." },
            { icon: <Sword className="text-rose-500" />, title: "The Arena", desc: "Competitive quests and real-time leaderboards." }
          ].map((feat, i) => (
            <div key={i} className="p-6 md:p-8 bg-white dark:bg-darkSurface rounded-[2rem] border border-slate-200 dark:border-zinc-800 shadow-xl hover:-translate-y-2 transition-all group">
              <div className="w-12 h-12 md:w-14 md:h-14 bg-slate-50 dark:bg-darkBase rounded-xl md:rounded-2xl flex items-center justify-center mb-5 md:mb-6 group-hover:scale-110 transition-transform shadow-inner">
                {feat.icon}
              </div>
              <h3 className="text-lg md:text-xl font-black uppercase mb-2 md:mb-3 tracking-tight">{feat.title}</h3>
              <p className="text-xs md:text-sm text-slate-600 dark:text-slate-400 dark:text-slate-400 leading-relaxed">{feat.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Tech Stack */}
      <section className="py-20 md:py-32 px-4 md:px-12 max-w-7xl mx-auto text-center">
         <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-10 md:mb-12 block">Built with Cutting-Edge Tech</span>
         <div className="flex flex-wrap justify-center items-center gap-8 md:gap-20 opacity-50 grayscale hover:grayscale-0 transition-all duration-700">
            <span className="text-lg md:text-2xl font-black tracking-tighter">REACT.JS</span>
            <span className="text-lg md:text-2xl font-black tracking-tighter">FASTAPI</span>
            <span className="text-lg md:text-2xl font-black tracking-tighter">FIREBASE</span>
            <span className="text-lg md:text-2xl font-black tracking-tighter">GEMINI AI</span>
            <span className="text-lg md:text-2xl font-black tracking-tighter">TAILWIND</span>
         </div>
      </section>

      {/* Founder Section / Footer */}
      <footer className="relative z-10 py-16 md:py-20 px-4 md:px-12 border-t border-slate-200 dark:border-zinc-800 bg-white dark:bg-darkSurface overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-10 md:gap-12 text-center md:text-left">
          <div className="space-y-4">
            <div className="flex items-center gap-3 justify-center md:justify-start">
               <ShieldCheck className="text-primary" />
               <span className="font-black text-xl uppercase">Voter Campaign</span>
            </div>
            <p className="text-slate-600 dark:text-slate-400 dark:text-slate-400 text-xs md:text-sm max-w-md">The Voter's Campaign is an initiative to digitize and gamify civic awareness in India. Created for impact, designed for the future.</p>
          </div>

          <div className="flex flex-col items-center md:items-end gap-6">
            <div className="flex items-center gap-4">
              <a href="https://github.com/M-Arjun-07" target="_blank" rel="noopener noreferrer" aria-label="GitHub Profile" className="p-3 md:p-4 bg-slate-100 dark:bg-darkBase rounded-2xl hover:bg-primary hover:text-slate-900 transition-all shadow-lg border border-slate-200 dark:border-zinc-800">
                <Github size={20} />
              </a>
              <a href="https://www.linkedin.com/in/m-arjun-404er/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn Profile" className="p-3 md:p-4 bg-slate-100 dark:bg-darkBase rounded-2xl hover:bg-primary hover:text-slate-900 transition-all shadow-lg border border-slate-200 dark:border-zinc-800">
                <Linkedin size={20} />
              </a>
            </div>
            <div>
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1">Architect & Developer</span>
              <h4 className="text-lg font-black uppercase tracking-tight text-slate-800 dark:text-white">M. Arjun</h4>
            </div>
          </div>
        </div>

        <div className="mt-16 md:mt-20 text-center">
           <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">© 2026 THE VOTER'S CAMPAIGN • BUILT FOR INDIA</p>
        </div>
      </footer>
    </div>
  );
}
