import React from 'react';
import { X } from 'lucide-react';

export default function VideoModal({ isOpen, onClose, videoUrl, title }) {
  if (!isOpen) return null;

  // Utility to convert various YouTube URL formats to embed format
  const getEmbedUrl = (url) => {
    if (!url) return "";
    let videoId = "";
    
    if (url.includes("youtu.be/")) {
      videoId = url.split("youtu.be/")[1].split("?")[0];
    } else if (url.includes("youtube.com/shorts/")) {
      videoId = url.split("youtube.com/shorts/")[1].split("?")[0];
    } else if (url.includes("watch?v=")) {
      videoId = url.split("watch?v=")[1].split("&")[0];
    } else if (url.includes("embed/")) {
      return url;
    }

    return `https://www.youtube.com/embed/${videoId}?autoplay=1`;
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-8">
      <div 
        className="absolute inset-0 bg-slate-900/90 backdrop-blur-sm animate-in fade-in duration-300" 
        onClick={onClose}
      ></div>
      
      <div className="relative w-full max-w-5xl bg-black rounded-[2rem] overflow-hidden shadow-2xl border border-white/10 animate-in zoom-in-95 duration-300">
        <div className="absolute top-4 right-4 z-10">
          <button 
            onClick={onClose}
            className="p-3 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full text-white transition-all hover:rotate-90"
          >
            <X size={24} />
          </button>
        </div>
        
        <div className="aspect-video w-full bg-zinc-900">
          <iframe
            src={getEmbedUrl(videoUrl)}
            title={title}
            className="w-full h-full border-0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
        
        <div className="p-6 bg-darkSurface border-t border-white/5">
          <h3 className="text-xl font-black text-white uppercase tracking-tight">{title}</h3>
          <p className="text-slate-400 text-sm mt-1">Voter Education Series • Secure & Verified Content</p>
        </div>
      </div>
    </div>
  );
}
