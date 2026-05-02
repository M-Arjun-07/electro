import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ShieldCheck, Moon, Sun, LogOut, LayoutDashboard, Sword, UserCircle, Compass, BookOpen } from 'lucide-react';
import { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { useAuth } from '../context/AuthContext';

export default function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { theme, toggleTheme } = useContext(AppContext);
  const { currentUser, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const NavLink = ({ to, icon, label }) => {
    const isActive = location.pathname === to;
    return (
      <Link to={to} className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors font-bold ${isActive ? 'bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400' : 'text-slate-600 dark:text-slate-400 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-zinc-800'}`}>
        {icon}
        <span>{label}</span>
      </Link>
    );
  };

  const NavLinkMobile = ({ to, icon, label }) => {
    const isActive = location.pathname === to;
    return (
      <Link 
        to={to} 
        aria-label={label}
        className={`p-3 rounded-lg flex flex-col items-center justify-center transition-colors ${isActive ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-600 dark:text-slate-400 dark:text-slate-400'}`}
      >
        {icon}
      </Link>
    );
  };

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex w-64 h-screen fixed left-0 top-0 bg-white dark:bg-darkSurface border-r border-slate-200 dark:border-zinc-800 flex-col transition-colors z-50">
        <div className="p-6 flex items-center gap-3 border-b border-slate-200 dark:border-zinc-800">
          <ShieldCheck className="text-indigo-600 dark:text-indigo-400 h-8 w-8 flex-shrink-0" />
          <span className="font-extrabold text-2xl tracking-tight text-slate-800 dark:text-white">Voter HQ</span>
        </div>
        
        <div className="flex-1 flex flex-col gap-2 p-4 mt-4">
          {currentUser ? (
            <>
              <NavLink to="/dashboard" icon={<LayoutDashboard size={22} />} label="Dashboard" />
              <NavLink to="/journey" icon={<Compass size={22} />} label="Journey Hub" />
              <NavLink to="/knowledge" icon={<BookOpen size={22} />} label="Knowledge Hub" />
              <NavLink to="/quests" icon={<Sword size={22} />} label="Arena" />
              <NavLink to="/profile" icon={<UserCircle size={22} />} label="Profile" />
            </>
          ) : (
            <NavLink to="/login" icon={<UserCircle size={22} />} label="Login" />
          )}
        </div>

        <div className="p-4 border-t border-slate-200 dark:border-zinc-800 flex flex-col gap-2">
          <button onClick={toggleTheme} className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-zinc-800 transition-colors w-full justify-start font-bold">
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            <span>Toggle Theme</span>
          </button>
          {currentUser && (
            <button onClick={handleLogout} className="flex items-center gap-3 px-4 py-3 rounded-xl text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors w-full justify-start font-bold">
              <LogOut size={20} />
              <span>Logout</span>
            </button>
          )}
        </div>
      </aside>

      {/* Mobile Bottom Nav */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-darkSurface border-t border-slate-200 dark:border-zinc-800 flex justify-around p-1 z-50 pb-safe shadow-[0_-10px_15px_-3px_rgba(0,0,0,0.1)] dark:shadow-none">
          {currentUser ? (
            <>
               <NavLinkMobile to="/dashboard" icon={<LayoutDashboard size={26} />} label="Dashboard" />
              <NavLinkMobile to="/journey" icon={<Compass size={26} />} label="Journey Hub" />
              <NavLinkMobile to="/knowledge" icon={<BookOpen size={26} />} label="Knowledge Hub" />
              <NavLinkMobile to="/quests" icon={<Sword size={26} />} label="Arena" />
              <NavLinkMobile to="/profile" icon={<UserCircle size={26} />} label="Profile" />
            </>
          ) : (
            <NavLinkMobile to="/login" icon={<UserCircle size={26} />} label="Login" />
          )}
      </nav>
    </>
  );
}
