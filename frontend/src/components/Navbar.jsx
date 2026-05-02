import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ShieldCheck, Moon, Sun, LogOut } from 'lucide-react';
import { useContext } from 'react';
import { AppContext } from '../context/AppContext';

function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { theme, toggleTheme, username, logoutUser } = useContext(AppContext);

  const handleLogout = () => {
    logoutUser();
    navigate('/');
  };

  return (
    <nav className="glass-card m-4 p-4 flex justify-between items-center sticky top-0 z-50">
      <Link to="/" className="flex items-center gap-2 group">
        <ShieldCheck className="text-primary h-8 w-8 group-hover:scale-110 transition-transform" />
        <span className="font-bold text-xl tracking-tight text-slate-800 dark:text-white">The Voter's Campaign</span>
      </Link>
      <div className="flex items-center gap-4 md:gap-6">
        <Link to="/" className={`hidden md:block font-semibold hover:text-primary transition-colors ${location.pathname === '/' ? 'text-primary' : 'text-slate-600 dark:text-slate-300'}`}>Home</Link>
        
        {username ? (
          <>
            <Link to="/dashboard" className={`hidden md:block font-semibold hover:text-primary transition-colors ${location.pathname === '/dashboard' ? 'text-primary' : 'text-slate-600 dark:text-slate-300'}`}>Dashboard</Link>
            <Link to="/quests" className={`hidden md:block font-semibold hover:text-primary transition-colors ${location.pathname === '/quests' ? 'text-primary' : 'text-slate-600 dark:text-slate-300'}`}>Quests</Link>
            <Link to="/chat" className={`hidden md:block font-semibold hover:text-primary transition-colors ${location.pathname === '/chat' ? 'text-primary' : 'text-slate-600 dark:text-slate-300'}`}>AI Guide</Link>
            <button onClick={handleLogout} className="text-slate-600 dark:text-slate-300 hover:text-red-500 transition-colors" title="Logout">
              <LogOut size={20} />
            </button>
          </>
        ) : (
          <Link to="/login" className="btn-primary px-4 py-2 text-sm">Login</Link>
        )}
        
        <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors text-slate-800 dark:text-white">
          {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
