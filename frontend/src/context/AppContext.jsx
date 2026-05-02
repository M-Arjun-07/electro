import React, { createContext, useState, useEffect, useContext } from 'react';
import api from '../services/api';
import confetti from 'canvas-confetti';
import { useAuth } from './AuthContext';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const { currentUser, logout } = useAuth();
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark');
  const [videoConfig, setVideoConfig] = useState({});
  const [userProfile, setUserProfile] = useState({
    state: '', district: '', taluk: '', city: '', pincode: '', age: '', name: '', email: '', mobile: '', 
    first_time_voter: false, epic_available: false, language: 'English', points: 0, 
    progress: [], knowledge: {}, watched_videos: [], learned_cards: []
  });

  // Real-time listener for user data
  useEffect(() => {
    if (currentUser?.uid) {
      const unsubscribe = onSnapshot(doc(db, "users", currentUser.uid), (doc) => {
        if (doc.exists()) {
          const data = doc.data();
          // Map Firestore structure back to flat structure for UI compatibility
          setUserProfile({
            username: data.username,
            name: data.name,
            email: data.email,
            mobile: data.mobile,
            state: data.location?.state || '',
            district: data.location?.district || '',
            taluk: data.location?.taluk || '',
            city: data.location?.city || '',
            pincode: data.location?.pincode || '',
            age: data.profile?.age || '',
            first_time_voter: data.profile?.first_time_voter || false,
            epic_available: data.profile?.epic_available || false,
            language: data.profile?.language || 'English',
            points: data.gamification?.xp || 0,
            progress: data.progress?.modules || [],
            knowledge: data.progress?.knowledge || {},
            watched_videos: data.progress?.watched_videos || [],
            learned_cards: data.progress?.learned_cards || []
          });
        }
      });
      return unsubscribe;
    } else {
      setUserProfile({
        state: '', district: '', taluk: '', city: '', pincode: '', age: '', name: '', email: '', mobile: '', 
        first_time_voter: false, epic_available: false, language: 'English', points: 0, 
        progress: [], knowledge: {}, watched_videos: [], learned_cards: []
      });
    }
  }, [currentUser]);

  useEffect(() => {
    api.get('/videos/all').then(res => setVideoConfig(res.data)).catch(console.error);
  }, []);

  useEffect(() => {
    localStorage.setItem('theme', theme);
    if (theme === 'dark') document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  }, [theme]);

  const toggleTheme = () => setTheme(prev => prev === 'dark' ? 'light' : 'dark');

  const triggerConfetti = () => {
    confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 }, colors: ['#22d3ee', '#a855f7', '#facc15'] });
  };

  const loginUser = async (email, password) => {
    // Handled by AuthContext now, but keeping for compatibility if needed
    // components should use useAuth().login directly but this helps bridge
  };

  const registerUser = async (email, password, username, name) => {
    // Same as above
  };

  const logoutUser = () => {
    logout();
  };

  const saveProfile = async (newProfile) => {
    // Map flat structure back to Firestore nested structure
    const updates = {
      name: newProfile.name,
      mobile: newProfile.mobile,
      location: {
        state: newProfile.state,
        district: newProfile.district,
        taluk: newProfile.taluk,
        city: newProfile.city,
        pincode: newProfile.pincode
      },
      profile: {
        age: newProfile.age,
        first_time_voter: newProfile.first_time_voter,
        epic_available: newProfile.epic_available,
        language: newProfile.language
      }
    };
    try {
      await api.post('/user/update', updates);
    } catch (e) { console.error(e); }
  };

  const addPoints = async (pointsToAdd) => {
    try {
      await api.post('/add-xp', { points: pointsToAdd });
    } catch (e) { console.error(e); }
  };

  const updateKnowledge = async (module, score, total) => {
    try {
      await api.post('/quiz-result', { module, score, total });
    } catch (e) { console.error(e); }
  };

  const completeVideoTask = async (videoId, xp) => {
    try {
      await api.post('/complete-video', { video_id: videoId, xp });
    } catch (e) { console.error(e); }
  };

  const completeTask = async (taskId, xp) => {
    try {
      await api.post('/complete-task', { task_id: taskId, xp });
    } catch (e) { console.error(e); }
  };

  const markCardLearned = async (cardId, xp) => {
    try {
      await api.post('/mark-learned', { card_id: cardId, xp });
    } catch (e) { console.error(e); }
  };

  const getOverallKnowledge = () => {
    const modules = ['register', 'epic', 'booth', 'candidates', 'learn', 'checklist', 'rewards'];
    let completedCount = 0;
    modules.forEach(m => {
      if (getModuleProgress(m) >= 100) completedCount++;
    });
    return Math.round((completedCount / modules.length) * 100);
  };

  const getModuleProgress = (modId) => {
    const getModVideoProgress = (id) => {
      const modVideos = videoConfig[id] || [];
      if (modVideos.length === 0) return 100;
      const watchedCount = modVideos.filter(v => userProfile.watched_videos?.includes(v.id)).length;
      return (watchedCount / modVideos.length) * 100;
    };

    const applyVideoRule = (baseProgress, id) => {
      const videoProgress = getModVideoProgress(id);
      const modVideos = videoConfig[id] || [];
      if (modVideos.length === 0) return baseProgress;
      return Math.floor((baseProgress * 0.6) + (videoProgress * 0.4));
    };

    switch(modId) {
      case 'register':
        const regBase = (userProfile.name ? 20 : 0) + (userProfile.state ? 40 : 0) + (userProfile.district ? 40 : 0);
        return applyVideoRule(regBase, 'register');
      case 'epic':
        return applyVideoRule(userProfile.epic_available ? 100 : 0, 'epic');
      case 'learn':
        const quizScore = userProfile.knowledge?.learn || 0;
        const learnBase = quizScore >= 60 ? 100 : quizScore;
        return applyVideoRule(learnBase, 'learn');
      case 'booth':
        return userProfile.knowledge?.booth || (userProfile.progress?.includes('booth_found') ? 100 : 0);
      case 'candidates':
        return userProfile.knowledge?.candidates || (userProfile.progress?.includes('candidates_viewed') ? 100 : 0);
      case 'checklist':
        return userProfile.knowledge?.checklist || (userProfile.progress?.includes('checklist_completed') ? 100 : 0);
      case 'rewards':
        const earnedBadges = [
          userProfile.points > 20,
          Object.keys(userProfile.knowledge || {}).length > 0,
          userProfile.points > 150 || userProfile.progress?.includes('booth_found'),
          (userProfile.knowledge?.learn || 0) >= 80,
          userProfile.points > 800,
          userProfile.points >= 1000
        ].filter(Boolean).length;
        return Math.min(100, Math.round((earnedBadges / 6) * 100));
      case 'arena':
        return Math.min(100, Math.floor((userProfile.points || 0) / 10));
      default:
        return 0;
    }
  };

  const refreshUser = () => {
    // Firestore listener handles real-time updates now
  };

  return (
    <AppContext.Provider value={{ 
      theme, toggleTheme, username: userProfile.username, loginUser, registerUser, logoutUser, 
      userProfile, setUserProfile, saveProfile, addPoints, updateKnowledge, 
      completeVideoTask, completeTask, markCardLearned, getOverallKnowledge, getModuleProgress, refreshUser, triggerConfetti 
    }}>
      {children}
    </AppContext.Provider>
  );
};
