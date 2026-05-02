import React, { useState, useContext } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, AlertCircle, Mail, Lock, User, AtSign } from 'lucide-react';

export default function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { login, signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!email.trim() || !password.trim()) {
      setError("Please fill out all fields.");
      return;
    }
    
    setLoading(true);
    try {
      if (isLogin) {
        await login(email.trim(), password.trim());
      } else {
        if (!username.trim() || !name.trim()) {
          setError("Username and Name are required for signup.");
          setLoading(false);
          return;
        }
        await signup(email.trim(), password.trim(), username.trim(), name.trim());
      }
      navigate('/dashboard');
    } catch (e) {
      console.error(e);
      setError(e.message || "Authentication failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-80px)] md:min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white dark:bg-darkSurface p-8 rounded-3xl shadow-2xl border border-slate-200 dark:border-zinc-800 text-center relative overflow-hidden transition-all duration-300">
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary blur-[100px] opacity-20 pointer-events-none"></div>
        
        <div className="w-20 h-20 bg-indigo-50 dark:bg-indigo-900/30 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-inner border border-indigo-100 dark:border-indigo-800/50 relative z-10">
           <ShieldCheck className="w-10 h-10 text-primary" />
        </div>
        
        <h2 className="text-3xl font-black mb-2 text-slate-900 dark:text-white tracking-tight relative z-10">
          {isLogin ? "Citizen Login" : "Create Account"}
        </h2>
        
        <p className="text-slate-600 dark:text-slate-400 mb-6 relative z-10">
          {isLogin ? "Authenticate to access your dashboard." : "Join the ultimate election experience."}
        </p>

        {error && (
          <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 p-3 rounded-xl mb-6 text-sm flex items-center gap-2 text-left relative z-10 border border-red-200 dark:border-red-900/50 animate-in fade-in zoom-in duration-300">
            <AlertCircle size={16} /> {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 relative z-10 text-left">
          {!isLogin && (
            <>
              <div>
                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2 tracking-wide flex items-center gap-2">
                  <User size={14} className="text-primary" /> FULL NAME
                </label>
                <input 
                  type="text" 
                  placeholder="e.g. John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-darkBase border border-slate-300 dark:border-zinc-800 rounded-xl px-5 py-3 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2 tracking-wide flex items-center gap-2">
                  <AtSign size={14} className="text-primary" /> USERNAME
                </label>
                <input 
                  type="text" 
                  placeholder="e.g. maverick_01"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-darkBase border border-slate-300 dark:border-zinc-800 rounded-xl px-5 py-3 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                />
              </div>
            </>
          )}

          <div>
            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2 tracking-wide flex items-center gap-2">
              <Mail size={14} className="text-primary" /> EMAIL ADDRESS
            </label>
            <input 
              type="email" 
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-slate-50 dark:bg-darkBase border border-slate-300 dark:border-zinc-800 rounded-xl px-5 py-3 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary transition-all"
            />
          </div>
          
          <div>
            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2 tracking-wide flex items-center gap-2">
              <Lock size={14} className="text-primary" /> PASSWORD
            </label>
            <input 
              type="password" 
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-slate-50 dark:bg-darkBase border border-slate-300 dark:border-zinc-800 rounded-xl px-5 py-3 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary transition-all"
            />
          </div>

          <button type="submit" disabled={loading} className="w-full btn-primary py-4 text-lg rounded-xl flex items-center justify-center gap-2 mt-4 shadow-lg shadow-indigo-500/20 disabled:opacity-70">
            {loading ? "Initializing..." : isLogin ? "Access Command Center" : "Initialize Profile"}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-slate-100 dark:border-zinc-800 relative z-10">
          <p className="text-slate-600 dark:text-slate-400 text-sm">
            {isLogin ? "Don't have an account?" : "Already have an account?"} 
            <button 
              onClick={() => { setIsLogin(!isLogin); setError(''); }}
              className="ml-2 text-primary font-bold hover:underline"
            >
              {isLogin ? "Sign Up" : "Log In"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
