import React, { useState, useContext, useEffect } from 'react';
import { AppContext } from '../../context/AppContext';
import { FileText, CheckCircle, ExternalLink, Play, Search, Info, ShieldCheck } from 'lucide-react';
import api from '../../services/api';
import VideoModal from '../../components/VideoModal';

export default function RegisterCenter() {
  const { userProfile, getOverallKnowledge, completeVideoTask } = useContext(AppContext);
  const [videos, setVideos] = useState([]);
  const [modal, setModal] = useState({ open: false, url: '', title: '' });

  useEffect(() => {
    api.get('/videos/register').then(res => setVideos(res.data)).catch(console.error);
  }, []);

  const handleWatch = (video) => {
    if (video.url) {
      setModal({ open: true, url: video.url, title: video.title });
    }
    if (!userProfile.watched_videos?.includes(video.id)) {
      completeVideoTask(video.id, video.xp || 20);
    }
  };

  const regLinks = [
    { title: "Check Registration Status", url: "https://voters.eci.gov.in/", icon: <Search size={20}/> },
    { title: "Register for New Voter Card", url: "https://voters.eci.gov.in/registration-form6", icon: <FileText size={20}/> },
    { title: "Update Voter Details", url: "https://voters.eci.gov.in/registration-form8", icon: <CheckCircle size={20}/> },
    { title: "Download Form 6 (PDF)", url: "https://voters.eci.gov.in/download-forms", icon: <ExternalLink size={20}/> }
  ];

  const regProgress = (userProfile.name ? 20 : 0) + (userProfile.email ? 20 : 0) + (userProfile.mobile ? 20 : 0) + (userProfile.state ? 20 : 0) + (userProfile.district ? 20 : 0);

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500 pb-24 md:pb-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center md:items-center gap-6 bg-white dark:bg-darkSurface p-6 md:p-8 rounded-3xl border border-slate-200 dark:border-zinc-800 shadow-xl text-center md:text-left">
        <div>
          <h1 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white tracking-tight">Registration Center</h1>
          <p className="text-slate-600 dark:text-slate-400 font-medium">Manage your voter registration and status</p>
        </div>
        <div className="flex items-center gap-4 bg-slate-50 dark:bg-darkBase p-4 rounded-2xl border border-slate-100 dark:border-zinc-800 w-full md:w-auto justify-center">
           <div className="text-right">
              <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest">Profile Progress</span>
              <span className="text-lg font-black text-primary">{regProgress}%</span>
           </div>
           <div className="w-12 h-12 rounded-full border-4 border-primary border-t-slate-200 dark:border-t-zinc-800 flex items-center justify-center text-[10px] font-bold">
              {regProgress}%
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Useful Links */}
        <div className="lg:col-span-2 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {regLinks.map((link, i) => (
              <a key={i} href={link.url} target="_blank" rel="noopener noreferrer" className="group bg-white dark:bg-darkSurface p-6 rounded-2xl border border-slate-200 dark:border-zinc-800 shadow-lg hover:border-primary transition-all flex items-center gap-4">
                <div className="bg-primary/10 p-3 rounded-xl text-primary group-hover:scale-110 transition-transform">
                  {link.icon}
                </div>
                <span className="font-bold text-slate-700 dark:text-slate-200">{link.title}</span>
              </a>
            ))}
          </div>

          {/* Video Section */}
          <div className="bg-white dark:bg-darkSurface p-8 rounded-3xl border border-slate-200 dark:border-zinc-800 shadow-xl">
            <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-6 flex items-center gap-2">
              <Play className="text-primary fill-primary" size={20} /> Video Tutorials
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {videos.map((vid) => (
                <div key={vid.id} className="relative group rounded-2xl overflow-hidden border border-slate-200 dark:border-zinc-800 bg-slate-50 dark:bg-darkBase">
                  <div className="aspect-video bg-slate-200 dark:bg-zinc-800 flex items-center justify-center relative">
                    <Play className="text-slate-400 group-hover:text-primary transition-colors cursor-pointer" size={48} onClick={() => handleWatch(vid)} />
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

        {/* Info & Support */}
        <div className="space-y-6">
          <div className="bg-indigo-600 rounded-3xl p-8 text-white shadow-xl relative overflow-hidden">
            <ShieldCheck className="absolute -bottom-4 -right-4 w-32 h-32 opacity-10" />
            <h3 className="text-xl font-bold mb-4 relative z-10">Did you know?</h3>
            <p className="text-indigo-100 text-sm mb-6 relative z-10">You can register to vote even if you don't have a permanent address or are currently living in a hostel.</p>
            <button className="bg-white text-indigo-600 font-bold px-6 py-3 rounded-xl text-sm hover:shadow-lg transition-all relative z-10">Learn More</button>
          </div>

          <div className="bg-white dark:bg-darkSurface p-8 rounded-3xl border border-slate-200 dark:border-zinc-800 shadow-xl">
            <h3 className="font-bold text-slate-800 dark:text-white mb-4">State Election Commissions</h3>
            <div className="space-y-3">
               <div className="p-4 rounded-xl bg-slate-50 dark:bg-darkBase border border-slate-100 dark:border-zinc-800 flex justify-between items-center">
                  <span className="text-sm font-bold text-slate-600 dark:text-slate-400">{userProfile.state || 'Maharashtra'} SEC</span>
                  <ExternalLink size={14} className="text-primary" />
               </div>
               <p className="text-xs text-slate-400">Get specific rules and local help for your state of residence.</p>
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
