import React, { useState, useContext, useEffect, useRef, useCallback } from 'react';
import { MessageSquare, X, Send, Bot, Sparkles, Loader2, Maximize2, Minimize2, Mic, MicOff, Volume2, VolumeX } from 'lucide-react';
import { AppContext } from '../context/AppContext';
import api from '../services/api';

export default function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeakingEnabled, setIsSpeakingEnabled] = useState(false);
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState([
    { role: 'assistant', content: "Hello! I'm your Election Guide. How can I help you today?" }
  ]);
  const [loading, setLoading] = useState(false);
  const { userProfile, username } = useContext(AppContext);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [chat]);

  const handleSend = useCallback(async (e) => {
    if (e) e.preventDefault();
    if (!message.trim() || loading) return;

    const userMsg = message;
    setMessage('');
    setChat(prev => [...prev, { role: 'user', content: userMsg }]);
    setLoading(true);

    try {
      const res = await api.post('/chat', {
        message: userMsg,
        state: userProfile.state || 'India',
        session_id: username || 'guest'
      });
      setChat(prev => [...prev, { role: 'assistant', content: res.data.reply }]);
    } catch (err) {
      setChat(prev => [...prev, { role: 'assistant', content: "Sorry, I'm having trouble connecting right now." }]);
    } finally {
      setLoading(false);
    }
  }, [message, loading, userProfile.state, username]);

  // Text to Speech
  useEffect(() => {
    const lastMsg = chat[chat.length - 1];
    if (isSpeakingEnabled && lastMsg && lastMsg.role === 'assistant' && !loading) {
      speak(lastMsg.content);
    }
  }, [chat, isSpeakingEnabled, loading]);

  const speak = useCallback((text) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 1.0;
      utterance.pitch = 1.0;
      window.speechSynthesis.speak(utterance);
    }
  }, []);

  // Speech Recognition
  const toggleListening = useCallback(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      console.error("Speech recognition is not supported in your browser.");
      return;
    }

    if (isListening) {
      setIsListening(false);
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);
    recognition.onerror = () => setIsListening(false);
    
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setMessage(transcript);
    };

    recognition.start();
  }, [isListening]);

  return (
    <div className={`fixed z-[100] transition-all duration-500 ease-in-out flex flex-col items-end gap-4 ${
      isMaximized 
      ? 'inset-0 md:inset-auto md:bottom-6 md:right-6 md:w-[800px] md:h-[calc(100vh-48px)]' 
      : 'bottom-24 right-4 md:bottom-6 md:right-6 w-auto h-auto'
    }`}>
      {/* Chat Window */}
      {isOpen && (
        <div className={`${
          isMaximized 
          ? 'w-full h-full rounded-none md:rounded-3xl' 
          : 'w-[calc(100vw-32px)] sm:w-[350px] md:w-[400px] h-[500px]'
        } bg-white dark:bg-darkSurface border border-slate-200 dark:border-zinc-800 rounded-3xl shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95 duration-300 transition-all`}>
          {/* Header */}
          <div className="bg-gradient-to-r from-primary to-indigo-600 p-5 flex justify-between items-center text-white">
            <div className="flex items-center gap-3">
              <div className="bg-white/20 p-2 rounded-xl backdrop-blur-sm">
                <Bot size={20} />
              </div>
              <div>
                <h3 className="font-bold text-sm">AI Guide</h3>
                <span className="text-[10px] opacity-80">Online | Ready to help</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button 
                onClick={() => setIsSpeakingEnabled(!isSpeakingEnabled)} 
                className={`p-2 rounded-full transition-colors ${isSpeakingEnabled ? 'bg-white/20 text-white' : 'text-white/50 hover:bg-white/10'}`}
                aria-label={isSpeakingEnabled ? "Mute AI Assistant" : "Unmute AI Assistant"}
                aria-pressed={isSpeakingEnabled}
              >
                {isSpeakingEnabled ? <Volume2 size={18} /> : <VolumeX size={18} />}
              </button>
              <button 
                onClick={() => setIsMaximized(!isMaximized)} 
                className="hover:bg-white/20 p-2 rounded-full transition-colors"
                aria-label={isMaximized ? "Minimize chat" : "Maximize chat"}
              >
                {isMaximized ? <Minimize2 size={20} /> : <Maximize2 size={20} />}
              </button>
              <button 
                onClick={() => { setIsOpen(false); setIsMaximized(false); if(isSpeakingEnabled) window.speechSynthesis.cancel(); }} 
                className="hover:bg-white/20 p-2 rounded-full transition-colors"
                aria-label="Close chat assistant"
              >
                <X size={20} />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div 
            ref={scrollRef} 
            className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/50 dark:bg-darkBase/50"
            aria-live="polite"
            aria-relevant="additions"
          >
            {chat.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-4 rounded-2xl text-sm shadow-sm ${
                  msg.role === 'user' 
                  ? 'bg-primary text-white rounded-tr-none' 
                  : 'bg-white dark:bg-zinc-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-zinc-800 rounded-tl-none'
                }`}>
                  {msg.content}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-white dark:bg-zinc-800 p-4 rounded-2xl rounded-tl-none border border-slate-200 dark:border-zinc-800 flex gap-2 items-center">
                  <Loader2 size={16} className="animate-spin text-primary" />
                  <span className="text-xs text-slate-600 dark:text-slate-400">Thinking...</span>
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <form onSubmit={handleSend} className="p-4 bg-white dark:bg-darkSurface border-t border-slate-200 dark:border-zinc-800 flex gap-2 items-center">
            <button 
              type="button"
              onClick={toggleListening}
              aria-label={isListening ? "Stop voice input" : "Start voice input"}
              aria-pressed={isListening}
              className={`p-3 rounded-xl transition-all ${isListening ? 'bg-red-500 text-white animate-pulse' : 'bg-slate-100 dark:bg-zinc-900 text-slate-600 dark:text-slate-400 hover:text-primary'}`}
            >
              {isListening ? <MicOff size={18} /> : <Mic size={18} />}
            </button>
            <input 
              type="text" 
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Ask anything..."
              className="flex-1 bg-slate-100 dark:bg-zinc-900 border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary transition-all"
            />
            <button 
              type="submit" 
              disabled={loading || !message.trim()} 
              aria-label="Send message"
              className="bg-primary hover:bg-indigo-600 text-white p-3 rounded-xl transition-all disabled:opacity-50 shadow-lg shadow-indigo-500/20"
            >
              <Send size={18} />
            </button>
          </form>
        </div>
      )}

      {/* Toggle Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? "Close AI Assistant" : "Open AI Assistant"}
        aria-expanded={isOpen}
        className={`w-14 h-14 rounded-full flex items-center justify-center text-white shadow-2xl transition-all hover:scale-110 active:scale-95 group relative ${isOpen ? 'bg-slate-800 dark:bg-zinc-800' : 'bg-primary'}`}
      >
        <div className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-white dark:border-darkBase animate-pulse" aria-hidden="true"></div>
        {isOpen ? <X size={28} /> : <MessageSquare size={28} />}
        {!isOpen && (
          <span className="absolute right-full mr-4 bg-white dark:bg-darkSurface text-slate-800 dark:text-white px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap shadow-xl opacity-0 group-hover:opacity-100 transition-opacity border border-slate-200 dark:border-zinc-800 pointer-events-none" aria-hidden="true">
            Need help? Ask me!
          </span>
        )}
      </button>
    </div>
  );
}
