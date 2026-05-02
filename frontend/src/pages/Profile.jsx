import React, { useContext, useState, useEffect } from 'react';
import { AppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';
import { UserCircle, Save, LogOut, Key, AlertCircle, MapPin, ChevronRight, CheckCircle2, Moon, Sun } from 'lucide-react';
import api from '../services/api';

export default function Journey() {
  const { userProfile, saveProfile, username, logoutUser, theme, toggleTheme } = useContext(AppContext);
  const navigate = useNavigate();
  
  // State lists
  const [statesList, setStatesList] = useState([]);
  const [districtsList, setDistrictsList] = useState([]);
  
  // Local profile state
  const [localProfile, setLocalProfile] = useState({
    name: '', email: '', mobile: '',
    state: '', district: '', taluk: '', city: '', pincode: '',
    age: '', first_time_voter: false, epic_available: false, language: 'English'
  });
  
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [passMsg, setPassMsg] = useState({ type: '', text: '' });
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const isNew = !userProfile.state;

  useEffect(() => {
    setLocalProfile({
      name: userProfile.name || '', email: userProfile.email || '', mobile: userProfile.mobile || '',
      state: userProfile.state || '', district: userProfile.district || '', taluk: userProfile.taluk || '', 
      city: userProfile.city || '', pincode: userProfile.pincode || '',
      age: userProfile.age || '', first_time_voter: userProfile.first_time_voter || false, 
      epic_available: userProfile.epic_available || false, language: userProfile.language || 'English'
    });
  }, [userProfile]);

  useEffect(() => {
    api.get('/states').then(res => setStatesList(res.data)).catch(console.error);
  }, []);

  useEffect(() => {
    if (localProfile.state) {
      api.get(`/districts/${localProfile.state}`).then(res => {
        setDistrictsList(res.data);
        if (!res.data.includes(localProfile.district)) {
          setLocalProfile(prev => ({ ...prev, district: '' }));
        }
      }).catch(console.error);
    }
  }, [localProfile.state]);

  const handleSave = async () => {
    setLoading(true);
    await saveProfile({ ...userProfile, ...localProfile });
    setLoading(false);
    if (isNew) navigate('/');
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    if (!oldPassword || !newPassword) return;
    try {
      await api.post('/auth/change_password', {
        username, old_password: oldPassword, new_password: newPassword
      });
      setPassMsg({ type: 'success', text: 'Password changed successfully.' });
      setOldPassword(''); setNewPassword('');
    } catch (e) {
      setPassMsg({ type: 'error', text: e.response?.data?.detail || "Change failed" });
    }
  };

  const handleLogout = () => {
    logoutUser();
    navigate('/login');
  };

  return (
    <div className="p-4 md:p-8 max-w-5xl mx-auto flex flex-col gap-8 pb-24 md:pb-8">
      {/* Header */}
      <div className="bg-white dark:bg-darkSurface p-6 md:p-8 rounded-3xl border border-slate-200 dark:border-zinc-800 shadow-xl flex items-center gap-6">
        <div className="w-20 h-20 bg-indigo-50 dark:bg-indigo-900/30 rounded-full flex items-center justify-center flex-shrink-0 border border-indigo-100 dark:border-indigo-800/50 shadow-inner">
          <UserCircle className="w-10 h-10 text-primary" />
        </div>
        <div>
          <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">{isNew ? "Citizen Registration" : "Citizen Profile"}</h1>
          <p className="text-slate-600 dark:text-slate-400 mt-1 font-medium">{isNew ? "Complete your voter profile to unlock your dashboard." : `Gamertag: ${username}`}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Registration Steps - 2 Columns wide */}
        <div className="md:col-span-2 bg-white dark:bg-darkSurface p-6 md:p-8 rounded-3xl border border-slate-200 dark:border-zinc-800 shadow-xl flex flex-col gap-6">
          
          {/* Progress Indicator */}
          {isNew && (
            <div className="flex items-center justify-between mb-6 bg-slate-50 dark:bg-darkBase p-2 rounded-2xl border border-slate-200 dark:border-zinc-800">
              {[1, 2, 3, 4].map(num => (
                <button key={num} onClick={() => setStep(num)} className={`flex-1 flex justify-center py-2 rounded-xl text-sm font-bold transition-all ${step === num ? 'bg-primary text-white shadow-md' : step < num ? 'text-slate-400' : 'bg-indigo-100 text-primary dark:bg-indigo-900/30 dark:text-indigo-400'}`}>
                  Step {num}
                </button>
              ))}
            </div>
          )}

          {(!isNew || step === 1) && (
            <div className="space-y-4 animate-fade-in">
              <h2 className="text-xl font-bold text-slate-800 dark:text-white border-b border-slate-100 dark:border-zinc-800 pb-4">Personal Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 mb-2">FULL NAME</label>
                  <input type="text" value={localProfile.name} onChange={e => setLocalProfile({...localProfile, name: e.target.value})} className="w-full bg-slate-50 dark:bg-darkBase border border-slate-300 dark:border-zinc-800 rounded-xl px-4 py-3 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary shadow-inner" placeholder="e.g. Rahul Sharma" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 mb-2">USERNAME</label>
                  <input type="text" value={username} disabled className="w-full bg-slate-100 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-xl px-4 py-3 text-slate-600 dark:text-slate-400 cursor-not-allowed shadow-inner" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 mb-2">MOBILE NUMBER</label>
                  <input type="tel" value={localProfile.mobile} onChange={e => setLocalProfile({...localProfile, mobile: e.target.value})} className="w-full bg-slate-50 dark:bg-darkBase border border-slate-300 dark:border-zinc-800 rounded-xl px-4 py-3 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary shadow-inner" placeholder="+91 XXXXX XXXXX" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 mb-2">EMAIL ADDRESS</label>
                  <input type="email" value={localProfile.email} onChange={e => setLocalProfile({...localProfile, email: e.target.value})} className="w-full bg-slate-50 dark:bg-darkBase border border-slate-300 dark:border-zinc-800 rounded-xl px-4 py-3 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary shadow-inner" placeholder="citizen@india.gov" />
                </div>
              </div>
            </div>
          )}

          {(!isNew || step === 2) && (
            <div className="space-y-4 animate-fade-in mt-4">
              <h2 className="text-xl font-bold text-slate-800 dark:text-white border-b border-slate-100 dark:border-zinc-800 pb-4 flex items-center gap-2"><MapPin className="text-secondary w-5 h-5"/> Location Data</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 mb-2">STATE / UT</label>
                  <select value={localProfile.state} onChange={e => setLocalProfile({...localProfile, state: e.target.value})} className="w-full bg-slate-50 dark:bg-darkBase border border-slate-300 dark:border-zinc-800 rounded-xl px-4 py-3 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary shadow-inner">
                    <option value="" disabled>Select State</option>
                    {statesList.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 mb-2">DISTRICT</label>
                  <select disabled={!localProfile.state} value={localProfile.district} onChange={e => setLocalProfile({...localProfile, district: e.target.value})} className="w-full bg-slate-50 dark:bg-darkBase border border-slate-300 dark:border-zinc-800 rounded-xl px-4 py-3 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary shadow-inner disabled:opacity-50 disabled:cursor-not-allowed">
                    <option value="" disabled>Select District</option>
                    {districtsList.map(d => <option key={d} value={d}>{d}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 mb-2">TALUK / TEHSIL</label>
                  <input type="text" value={localProfile.taluk} onChange={e => setLocalProfile({...localProfile, taluk: e.target.value})} className="w-full bg-slate-50 dark:bg-darkBase border border-slate-300 dark:border-zinc-800 rounded-xl px-4 py-3 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary shadow-inner" placeholder="e.g. Andheri" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 mb-2">CITY / VILLAGE</label>
                  <input type="text" value={localProfile.city} onChange={e => setLocalProfile({...localProfile, city: e.target.value})} className="w-full bg-slate-50 dark:bg-darkBase border border-slate-300 dark:border-zinc-800 rounded-xl px-4 py-3 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary shadow-inner" placeholder="e.g. Mumbai" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 mb-2">PIN CODE</label>
                  <input type="text" value={localProfile.pincode} onChange={e => setLocalProfile({...localProfile, pincode: e.target.value})} className="w-full bg-slate-50 dark:bg-darkBase border border-slate-300 dark:border-zinc-800 rounded-xl px-4 py-3 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary shadow-inner" placeholder="XXXXXX" />
                </div>
              </div>
            </div>
          )}

          {(!isNew || step === 3) && (
            <div className="space-y-4 animate-fade-in mt-4">
              <h2 className="text-xl font-bold text-slate-800 dark:text-white border-b border-slate-100 dark:border-zinc-800 pb-4">Voter Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 mb-2">AGE GROUP</label>
                  <select value={localProfile.age} onChange={e => setLocalProfile({...localProfile, age: e.target.value})} className="w-full bg-slate-50 dark:bg-darkBase border border-slate-300 dark:border-zinc-800 rounded-xl px-4 py-3 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary shadow-inner">
                    <option value="" disabled>Select age group</option>
                    <option value="18-24">18-24 (Gen Z)</option>
                    <option value="25-34">25-34 (Millennial)</option>
                    <option value="35-50">35-50</option>
                    <option value="50+">50+</option>
                  </select>
                </div>
                <div className="flex flex-col gap-3 justify-center mt-2">
                  <label className="flex items-center gap-3 bg-slate-50 dark:bg-darkBase p-3 rounded-xl border border-slate-200 dark:border-zinc-800 cursor-pointer">
                    <input type="checkbox" checked={localProfile.first_time_voter} onChange={e => setLocalProfile({...localProfile, first_time_voter: e.target.checked})} className="w-5 h-5 accent-primary" />
                    <span className="text-sm font-bold text-slate-700 dark:text-slate-300">I am a First-Time Voter</span>
                  </label>
                  <label className="flex items-center gap-3 bg-slate-50 dark:bg-darkBase p-3 rounded-xl border border-slate-200 dark:border-zinc-800 cursor-pointer">
                    <input type="checkbox" checked={localProfile.epic_available} onChange={e => setLocalProfile({...localProfile, epic_available: e.target.checked})} className="w-5 h-5 accent-primary" />
                    <span className="text-sm font-bold text-slate-700 dark:text-slate-300">I have my EPIC (Voter ID) Card</span>
                  </label>
                </div>
              </div>
            </div>
          )}

          {(!isNew || step === 4) && (
            <div className="space-y-4 animate-fade-in mt-4 mb-4">
              <h2 className="text-xl font-bold text-slate-800 dark:text-white border-b border-slate-100 dark:border-zinc-800 pb-4">Preferences</h2>
              <div>
                  <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 mb-2">PREFERRED LANGUAGE</label>
                  <select value={localProfile.language} onChange={e => setLocalProfile({...localProfile, language: e.target.value})} className="w-full bg-slate-50 dark:bg-darkBase border border-slate-300 dark:border-zinc-800 rounded-xl px-4 py-3 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary shadow-inner">
                    <option value="English">English</option>
                    <option value="Hindi">Hindi</option>
                    <option value="Telugu">Telugu</option>
                    <option value="Tamil">Tamil</option>
                    <option value="Kannada">Kannada</option>
                    <option value="Bengali">Bengali</option>
                  </select>
              </div>
            </div>
          )}
          
          <div className="flex gap-4 mt-4 pt-4 border-t border-slate-100 dark:border-zinc-800">
             {isNew && step > 1 && (
               <button onClick={() => setStep(step - 1)} className="px-6 py-4 rounded-xl font-bold bg-slate-100 dark:bg-zinc-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-zinc-700 transition-colors">Back</button>
             )}
             {isNew && step < 4 ? (
               <button onClick={() => setStep(step + 1)} className="flex-1 btn-primary py-4 text-lg rounded-xl flex items-center justify-center gap-2">Next Step <ChevronRight size={20}/></button>
             ) : (
               <button onClick={handleSave} disabled={loading} className="flex-1 btn-primary py-4 text-lg rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-indigo-500/20 disabled:opacity-70 bg-emerald-500 hover:bg-emerald-600 dark:bg-emerald-600 dark:hover:bg-emerald-500">
                 <CheckCircle2 size={24} /> {isNew ? "Complete Registration" : "Save All Changes"}
               </button>
             )}
          </div>
        </div>

        {/* Security Column - Only show if not new */}
        {!isNew && (
          <div className="md:col-span-1 flex flex-col gap-6">
            <div className="bg-white dark:bg-darkSurface p-6 rounded-3xl border border-slate-200 dark:border-zinc-800 shadow-xl flex flex-col gap-6">
              <h2 className="text-lg font-bold text-slate-800 dark:text-white border-b border-slate-100 dark:border-zinc-800 pb-4 flex items-center gap-2"><Key className="text-primary w-5 h-5"/> Security</h2>
              <form onSubmit={handlePasswordChange} className="space-y-4">
                {passMsg.text && (
                  <div className={`p-3 rounded-xl text-xs font-medium flex items-center gap-2 ${passMsg.type === 'success' ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-400' : 'bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-400'}`}>
                    <AlertCircle size={16} className="flex-shrink-0" /> {passMsg.text}
                  </div>
                )}
                <input type="password" value={oldPassword} onChange={e => setOldPassword(e.target.value)} placeholder="Current Password" required className="w-full bg-slate-50 dark:bg-darkBase border border-slate-300 dark:border-zinc-800 rounded-xl px-4 py-3 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary shadow-inner" />
                <input type="password" value={newPassword} onChange={e => setNewPassword(e.target.value)} placeholder="New Password" required className="w-full bg-slate-50 dark:bg-darkBase border border-slate-300 dark:border-zinc-800 rounded-xl px-4 py-3 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary shadow-inner" />
                <button type="submit" className="w-full bg-slate-800 hover:bg-slate-900 dark:bg-slate-700 dark:hover:bg-slate-600 text-white font-bold py-3.5 rounded-xl transition-all shadow-md text-sm">Update Password</button>
              </form>
            </div>
            
            {/* Mobile-Only Theme Toggle */}
            <div className="md:hidden bg-white dark:bg-darkSurface p-6 rounded-3xl border border-slate-200 dark:border-zinc-800 shadow-xl flex flex-col gap-4">
               <h2 className="text-lg font-bold text-slate-800 dark:text-white border-b border-slate-100 dark:border-zinc-800 pb-4">Display</h2>
               <button onClick={toggleTheme} className="flex items-center justify-between w-full p-4 bg-slate-50 dark:bg-darkBase rounded-2xl border border-slate-100 dark:border-zinc-800 transition-all active:scale-95">
                  <div className="flex items-center gap-3">
                     {theme === 'dark' ? <Sun size={20} className="text-amber-500" /> : <Moon size={20} className="text-indigo-500" />}
                     <span className="text-sm font-bold text-slate-700 dark:text-slate-300">
                        {theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
                     </span>
                  </div>
                  <div className={`w-10 h-6 rounded-full transition-colors relative ${theme === 'dark' ? 'bg-primary' : 'bg-slate-300'}`}>
                     <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${theme === 'dark' ? 'right-1' : 'left-1'}`}></div>
                  </div>
               </button>
            </div>

            <div className="bg-red-50 dark:bg-red-900/10 p-6 rounded-3xl border border-red-200 dark:border-red-900/30 shadow-xl relative overflow-hidden">
               <h2 className="text-lg font-black text-red-600 dark:text-red-400 mb-2 relative z-10">Danger Zone</h2>
               <button onClick={handleLogout} className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-3.5 rounded-xl flex justify-center items-center gap-2 transition-all shadow-lg shadow-red-500/20 relative z-10 text-sm">
                 <LogOut size={18} /> Disconnect
               </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
