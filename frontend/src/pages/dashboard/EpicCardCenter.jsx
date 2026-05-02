import React, { useState, useContext, useEffect } from 'react';
import { AppContext } from '../../context/AppContext';
import { CreditCard, Download, RefreshCcw, HelpCircle, AlertTriangle, ShieldCheck, Play, CheckCircle } from 'lucide-react';
import api from '../../services/api';
import VideoModal from '../../components/VideoModal';

export default function EpicCardCenter() {
  const { userProfile, completeVideoTask } = useContext(AppContext);
  const [videos, setVideos] = useState([]);
  const [modal, setModal] = useState({ open: false, url: '', title: '' });

  useEffect(() => {
    api.get('/videos/epic').then(res => setVideos(res.data)).catch(console.error);
  }, []);

  const handleWatch = (video) => {
    if (video.url) {
      setModal({ open: true, url: video.url, title: video.title });
    }
    if (!userProfile.watched_videos?.includes(video.id)) {
      completeVideoTask(video.id, video.xp || 20);
    }
  };

  const actions = [
    { title: "Download e-EPIC", url: "https://voters.eci.gov.in/download-epic", icon: <Download size={20}/>, color: "bg-blue-500" },
    { title: "Check Delivery Status", url: "https://voters.eci.gov.in/", icon: <CreditCard size={20}/>, color: "bg-indigo-500" },
    { title: "Update Card Details", url: "https://voters.eci.gov.in/registration-form8", icon: <RefreshCcw size={20}/>, color: "bg-purple-500" },
    { title: "Lost My Card", url: "https://voters.eci.gov.in/registration-form8", icon: <AlertTriangle size={20}/>, color: "bg-amber-500" }
  ];

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-8 animate-in slide-in-from-bottom-10 duration-500 pb-24 md:pb-8">
      {/* Header */}
      <div className="bg-gradient-to-br from-indigo-900 to-slate-900 rounded-[2rem] p-8 md:p-12 text-white shadow-2xl relative overflow-hidden flex flex-col md:flex-row items-center gap-8 border border-white/5">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary blur-[120px] opacity-20"></div>
        <div className="z-10 w-24 h-24 bg-white/10 backdrop-blur-xl rounded-2xl flex items-center justify-center border border-white/10 shadow-inner">
           <CreditCard size={48} className="text-primary" />
        </div>
        <div className="z-10 flex-1 text-center md:text-left">
          <h1 className="text-4xl font-black tracking-tight mb-2 uppercase">EPIC Card Center</h1>
          <p className="text-indigo-200 text-lg font-medium italic">Electronic Photo Identity Card: Your ticket to democracy.</p>
        </div>
        <div className="z-10 bg-white/5 backdrop-blur-md p-6 rounded-3xl border border-white/10 text-center">
           <span className="block text-indigo-300 font-bold mb-1 tracking-widest text-xs">STATUS</span>
           <span className={`text-2xl font-black ${userProfile.epic_available ? 'text-emerald-400' : 'text-amber-400'}`}>
              {userProfile.epic_available ? 'ID SECURED' : 'NOT LINKED'}
           </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {actions.map((action, i) => (
          <a key={i} href={action.url} target="_blank" rel="noopener noreferrer" className="group bg-white dark:bg-darkSurface p-8 rounded-3xl border border-slate-200 dark:border-zinc-800 shadow-xl hover:-translate-y-2 transition-all flex flex-col items-center text-center gap-4">
            <div className={`${action.color} p-4 rounded-2xl text-white shadow-lg group-hover:scale-110 transition-transform`}>
              {action.icon}
            </div>
            <h3 className="font-black text-slate-800 dark:text-white uppercase tracking-tight text-sm">{action.title}</h3>
          </a>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white dark:bg-darkSurface p-8 rounded-3xl border border-slate-200 dark:border-zinc-800 shadow-xl">
             <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-8 flex items-center gap-3">
                <HelpCircle className="text-primary" size={24} /> Alternative Identifications
             </h2>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {['Aadhaar Card', 'Passport', 'Driving License', 'PAN Card', 'MNREGA Job Card'].map((id, i) => (
                  <div key={i} className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-darkBase border border-slate-100 dark:border-zinc-800">
                     <ShieldCheck size={18} className="text-emerald-500" />
                     <span className="text-sm font-bold text-slate-600 dark:text-slate-300">{id}</span>
                  </div>
                ))}
             </div>
             <p className="mt-6 text-xs text-slate-400 leading-relaxed">If you don't have an EPIC card, you can still vote by presenting any of the above government-issued photo IDs at the polling booth.</p>
          </div>

          {/* Videos */}
          <div className="bg-white dark:bg-darkSurface p-8 rounded-3xl border border-slate-200 dark:border-zinc-800 shadow-xl">
            <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-6 flex items-center gap-2">
              <Play className="text-primary" size={20} /> Help & Tutorials
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {videos.map((vid) => (
                <div key={vid.id} onClick={() => handleWatch(vid)} className="relative group rounded-2xl overflow-hidden border border-slate-200 dark:border-zinc-800 bg-slate-50 dark:bg-darkBase cursor-pointer">
                  <div className="aspect-video bg-slate-200 dark:bg-zinc-800 flex items-center justify-center relative">
                    <Play className="text-slate-400 group-hover:text-primary transition-colors" size={48} />
                    {userProfile.watched_videos?.includes(vid.id) && (
                      <div className="absolute top-2 right-2 bg-emerald-500 text-white p-1 rounded-full shadow-lg">
                        <CheckCircle size={14} />
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <h4 className="font-bold text-xs text-slate-700 dark:text-slate-300 line-clamp-1">{vid.title}</h4>
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-[10px] text-slate-400 font-bold uppercase">{vid.duration}</span>
                      <span className="text-[10px] text-primary font-bold">+{vid.xp} XP</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-slate-900 dark:bg-zinc-900 rounded-3xl p-8 text-white shadow-xl flex flex-col justify-between border border-white/5">
           <div>
              <span className="text-primary font-black uppercase tracking-[0.2em] text-[10px]">Security Notice</span>
              <h3 className="text-2xl font-black mt-4 mb-4 leading-tight tracking-tight">Voter ID Security</h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-6">Your EPIC card is a critical document. Never share your digital voter ID (e-EPIC) or sensitive OTPs with unverified sources.</p>
           </div>
           <div className="p-6 rounded-2xl bg-white/5 border border-white/10 flex flex-col items-center text-center gap-4">
              <ShieldCheck size={32} className="text-emerald-400" />
              <span className="text-xs font-bold text-slate-300 uppercase tracking-widest">e-EPIC Status</span>
              <span className="px-4 py-2 bg-emerald-500/20 text-emerald-400 rounded-xl text-[10px] font-black border border-emerald-500/30">ENCRYPTED</span>
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
