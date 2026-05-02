import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import AIAssistant from './components/AIAssistant';
import Login from './pages/Login';
import Profile from './pages/Profile';
import JourneyHub from './pages/JourneyHub';
import Dashboard from './pages/Dashboard';
import KnowledgeHub from './pages/KnowledgeHub';
import Quests from './pages/Quests';
import ChatPage from './pages/ChatPage';
import LandingPage from './pages/LandingPage';

// New Dashboard Pages
import RegisterCenter from './pages/dashboard/RegisterCenter';
import EpicCardCenter from './pages/dashboard/EpicCardCenter';
import BoothFinder from './pages/dashboard/BoothFinder';
import CandidateKnow from './pages/dashboard/CandidateKnow';
import LearnProcess from './pages/dashboard/LearnProcess';
import PollingChecklist from './pages/dashboard/PollingChecklist';
import RewardsPage from './pages/dashboard/RewardsPage';

import { useContext } from 'react';
import { AppContext } from './context/AppContext';
import { useAuth } from './context/AuthContext';

function ProtectedRoute({ children }) {
  const { currentUser, loading } = useAuth();
  if (loading) return null;
  if (!currentUser) return <Navigate to="/login" />;
  return children;
}

function AuthRedirect({ children }) {
  const { currentUser, loading } = useAuth();
  if (loading) return null;
  if (currentUser) return <Navigate to="/dashboard" />;
  return children;
}

function AppLayout({ children }) {
  const location = useLocation();
  const isLanding = location.pathname === '/';
  const isLogin = location.pathname === '/login';
  const showChrome = !isLanding && !isLogin;

  return (
    <div className="flex min-h-screen bg-slate-50 dark:bg-darkBase text-slate-900 dark:text-white transition-colors duration-300">
      {showChrome && <Sidebar />}
      <main className={`flex-1 min-h-screen overflow-auto relative ${showChrome ? 'pb-20 md:pb-0 md:ml-64 w-full' : 'w-full'}`}>
        {children}
        {showChrome && <AIAssistant />}
      </main>
    </div>
  );
}

function App() {
  const { loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-darkBase flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          <p className="text-slate-600 dark:text-slate-400 font-bold uppercase tracking-widest text-xs animate-pulse">Initializing Command Center...</p>
        </div>
      </div>
    );
  }

  return (
    <Router>
      <AppLayout>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<AuthRedirect><Login /></AuthRedirect>} />
          
          <Route path="/dashboard" element={
            <ProtectedRoute><Dashboard /></ProtectedRoute>
          } />
          <Route path="/journey" element={<ProtectedRoute><JourneyHub /></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          <Route path="/knowledge" element={<ProtectedRoute><KnowledgeHub /></ProtectedRoute>} />
          <Route path="/quests" element={<ProtectedRoute><Quests /></ProtectedRoute>} />
          <Route path="/chat" element={<ProtectedRoute><ChatPage /></ProtectedRoute>} />
          
          {/* New Dashboard Routes */}
          <Route path="/dashboard/register" element={<ProtectedRoute><RegisterCenter /></ProtectedRoute>} />
          <Route path="/dashboard/epic" element={<ProtectedRoute><EpicCardCenter /></ProtectedRoute>} />
          <Route path="/dashboard/booth" element={<ProtectedRoute><BoothFinder /></ProtectedRoute>} />
          <Route path="/dashboard/candidates" element={<ProtectedRoute><CandidateKnow /></ProtectedRoute>} />
          <Route path="/dashboard/learn" element={<ProtectedRoute><LearnProcess /></ProtectedRoute>} />
          <Route path="/dashboard/checklist" element={<ProtectedRoute><PollingChecklist /></ProtectedRoute>} />
          <Route path="/dashboard/rewards" element={<ProtectedRoute><RewardsPage /></ProtectedRoute>} />
        </Routes>
      </AppLayout>
    </Router>
  );
}

export default App;
