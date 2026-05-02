import React, { useState, useRef, useEffect, useContext } from 'react';
import { AppContext } from '../context/AppContext';
import api from '../services/api';
import VoiceAssistant, { speak } from './VoiceAssistant';
import { Send, Sparkles, Volume2 } from 'lucide-react';

export default function ChatBox() {
  const { userProfile, refreshUser, username } = useContext(AppContext);
  const [messages, setMessages] = useState([
    { role: 'assistant', text: 'Welcome! I am your AI Game Master. Ask me election laws or tell me when you complete a step (e.g. "I just registered!"). I will only answer election-related queries!' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async (textOverride = null) => {
    const textToSend = textOverride !== null ? textOverride : input;
    if (!textToSend.trim()) return;

    const newMsgs = [...messages, { role: 'user', text: textToSend }];
    setMessages(newMsgs);
    setInput('');
    setLoading(true);

    try {
      const stateInfo = userProfile.state || 'India';
      const res = await api.post('/chat', {
        message: textToSend,
        state: stateInfo,
        session_id: username || 'guest_user'
      });
      
      setMessages([...newMsgs, { role: 'assistant', text: res.data.reply }]);
      // We removed speak(res.data.reply) here so it doesn't auto-read!

      if (res.data.unlock) {
        refreshUser();
      }
    } catch (err) {
      setMessages([...newMsgs, { role: 'assistant', text: 'Connection error. Make sure your FastAPI backend is running properly.' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="glass-card flex flex-col h-full neon-border shadow-lg max-h-[800px]">
      <div className="p-4 border-b border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800/80 rounded-t-xl flex items-center gap-3">
        <Sparkles className="text-primary" />
        <h2 className="font-bold text-lg text-slate-800 dark:text-white">AI Game Master</h2>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-4 md:space-y-6 bg-slate-50/50 dark:bg-slate-900/40">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] p-3 md:p-4 rounded-2xl shadow-sm text-sm md:text-base leading-relaxed relative group ${msg.role === 'user' ? 'bg-primary text-slate-900 rounded-tr-none font-medium' : 'bg-white dark:bg-slate-700 text-slate-800 dark:text-white rounded-tl-none border border-slate-200 dark:border-slate-600'}`}>
              {msg.text}
              
              {/* Speaker icon for manual TTS */}
              {msg.role === 'assistant' && (
                <button 
                  onClick={() => speak(msg.text)} 
                  className="absolute -right-10 top-2 p-2 text-slate-400 hover:text-primary opacity-0 group-hover:opacity-100 transition-opacity focus:opacity-100" 
                  title="Read Aloud"
                >
                  <Volume2 size={20} />
                </button>
              )}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 p-4 rounded-2xl rounded-tl-none flex gap-1 items-center h-[48px]">
              <div className="w-2 h-2 bg-slate-400 dark:bg-slate-400 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-slate-400 dark:bg-slate-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
              <div className="w-2 h-2 bg-slate-400 dark:bg-slate-400 rounded-full animate-bounce" style={{animationDelay: '0.4s'}}></div>
            </div>
          </div>
        )}
        <div ref={endRef} />
      </div>

      <div className="p-3 md:p-4 border-t border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800/80 rounded-b-xl flex gap-2 md:gap-3">
        <input 
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          className="flex-1 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-full px-4 py-2 md:px-5 md:py-3 text-slate-800 dark:text-white focus:outline-none focus:border-primary transition-all shadow-inner text-sm md:text-base"
          placeholder="Ask me anything..."
        />
        <button onClick={() => handleSend()} className="bg-primary hover:bg-cyan-400 text-slate-900 p-2 md:p-3 rounded-full transition-all shadow-md dark:shadow-[0_0_15px_rgba(34,211,238,0.5)]">
          <Send size={20} className="md:w-6 md:h-6" />
        </button>
        <VoiceAssistant onVoiceInput={(text) => handleSend(text)} />
      </div>
    </div>
  );
}
